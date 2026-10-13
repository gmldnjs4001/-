const APP_DEFAULT_CATEGORIES = ["포스","백업","멀티패드","프린트","태블릿","토스프론트"];
const ITEM_HEADERS = ["id","category","barcode","model","maker","store","channel","stock","repair","vendor","product","shipped","disposal","note","updatedAt"];
const TX_HEADERS = ["id","date","type","category","qty","itemId","barcode","model","partner","store","reason","note","updatedAt"];
const META_HEADERS = ["key","value"];

function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("WAREHOUSE CONTROL")
    .addMetaTag("viewport", "width=device-width, initial-scale=1, viewport-fit=cover");
}

// Run this once from the Apps Script editor. It creates the shared-data tabs.
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("먼저 대상 Google 스프레드시트에서 확장 프로그램 > Apps Script를 눌러 프로젝트를 만드세요.");
  PropertiesService.getScriptProperties().setProperty("WAREHOUSE_CONTROL_SPREADSHEET_ID", ss.getId());
  ensureAllSheets_(ss);
  const result = {spreadsheetName:ss.getName(), spreadsheetUrl:ss.getUrl()};
  console.log(JSON.stringify(result));
  return result;
}

function getAppData() {
  const ss = getSpreadsheet_();
  ensureAllSheets_(ss);
  return readDb_(ss);
}

function applyDelta(delta) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const ss = getSpreadsheet_();
    ensureAllSheets_(ss);
    const current = readDb_(ss);
    const conflicts = [];
    checkConflicts_(current.items, delta.itemsUpsert || [], "재고", conflicts);
    checkConflicts_(current.transactions, delta.transactionsUpsert || [], "이력", conflicts);
    if (conflicts.length) return {
      ok:false,
      message:"다른 사용자가 같은 항목을 먼저 수정했습니다. 최신 서버 데이터로 갱신했습니다. 내용을 확인하고 다시 입력해 주세요.",
      conflicts:conflicts,
      data:current
    };
    current.items = applyRecords_(current.items, delta.itemsDelete || [], delta.itemsUpsert || []);
    current.transactions = applyRecords_(current.transactions, delta.transactionsDelete || [], delta.transactionsUpsert || []);
    if (delta.categoriesChanged) current.categories = cleanCategories_(delta.categories);
    if (delta.settingsChanged) current.settings = cleanSettings_(delta.settings);
    writeDb_(ss, current);
    return {ok:true, data:readDb_(ss)};
  } finally { lock.releaseLock(); }
}

function getSpreadsheet_() {
  const savedId = PropertiesService.getScriptProperties().getProperty("WAREHOUSE_CONTROL_SPREADSHEET_ID");
  if (savedId) return SpreadsheetApp.openById(savedId);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("연결된 Google 시트를 찾지 못했습니다. 대상 시트의 확장 프로그램 > Apps Script에서 프로젝트를 열고 setup()을 실행해 주세요.");
  PropertiesService.getScriptProperties().setProperty("WAREHOUSE_CONTROL_SPREADSHEET_ID", ss.getId());
  return ss;
}
function ensureAllSheets_(ss) {
  ensureSheet_(ss, "Items", ITEM_HEADERS);
  ensureSheet_(ss, "Transactions", TX_HEADERS);
  const meta = ensureSheet_(ss, "Meta", META_HEADERS);
  if (meta.getLastRow() < 2) meta.getRange(2,1,4,2).setValues([
    ["categories", JSON.stringify(APP_DEFAULT_CATEGORIES)],
    ["settings", JSON.stringify({title:"WAREHOUSE CONTROL",site:""})],
    ["nextId", "1"], ["formatVersion", "1"]
  ]);
}
function ensureSheet_(ss, name, headers) {
  let sh=ss.getSheetByName(name);
  if(!sh) sh=ss.insertSheet(name);
  if(sh.getLastRow()===0) sh.getRange(1,1,1,headers.length).setValues([headers]);
  else {
    const row=sh.getRange(1,1,1,Math.max(sh.getLastColumn(),headers.length)).getValues()[0];
    const actual=row.slice(0,headers.length).map(String);
    if(headers.some((h,i)=>actual[i]!==h)){sh.clearContents();sh.getRange(1,1,1,headers.length).setValues([headers]);}
  }
  sh.setFrozenRows(1);sh.getRange(1,1,1,headers.length).setFontWeight("bold").setBackground("#e8eef8");
  return sh;
}
function readDb_(ss) {
  const items=readObjects_(ss.getSheetByName("Items"),ITEM_HEADERS);
  const transactions=readObjects_(ss.getSheetByName("Transactions"),TX_HEADERS);
  const rows=ss.getSheetByName("Meta").getDataRange().getValues(),meta={};
  rows.slice(1).forEach(r=>{if(r[0])meta[String(r[0])]=r[1];});
  let categories=APP_DEFAULT_CATEGORIES.slice(),settings={title:"WAREHOUSE CONTROL",site:""};
  try{if(meta.categories)categories=JSON.parse(String(meta.categories));}catch(e){}
  try{if(meta.settings)settings=Object.assign(settings,JSON.parse(String(meta.settings)));}catch(e){}
  return {items:items,transactions:transactions,categories:cleanCategories_(categories),settings:cleanSettings_(settings),nextId:Number(meta.nextId)||1};
}
function readObjects_(sheet,headers) {
  if(!sheet||sheet.getLastRow()<2)return [];
  return sheet.getRange(2,1,sheet.getLastRow()-1,headers.length).getValues().filter(r=>r[0]!==""&&r[0]!==null).map(r=>{
    const o={};headers.forEach((h,i)=>o[h]=r[i]);o.id=String(o.id);
    if(headers.indexOf("itemId")>=0)o.itemId=o.itemId?String(o.itemId):"";
    ["stock","repair","vendor","product","shipped","disposal","qty"].forEach(k=>{if(o[k]!==undefined)o[k]=Number(o[k])||0;});
    o.updatedAt=String(o.updatedAt||"");return o;
  });
}
function checkConflicts_(currentRows,incomingRows,kind,conflicts){
  const map=new Map(currentRows.map(r=>[String(r.id),r]));
  incomingRows.forEach(r=>{const existing=map.get(String(r.id));const expected=String(r._expectedUpdatedAt||"");const actual=existing?String(existing.updatedAt||""):"";if((existing&&actual!==expected)||(!existing&&expected!==""))conflicts.push({kind:kind,id:String(r.id)});});
}
function applyRecords_(currentRows,deleteIds,upserts){
  const deleted=new Set(deleteIds.map(String)),map=new Map();
  currentRows.forEach(r=>{if(!deleted.has(String(r.id)))map.set(String(r.id),r);});
  upserts.forEach(input=>{const r=Object.assign({},input);delete r._expectedUpdatedAt;r.id=String(r.id);if(r.itemId!==undefined)r.itemId=r.itemId?String(r.itemId):"";map.set(r.id,r);});
  return Array.from(map.values());
}
function writeDb_(ss,db){
  writeObjects_(ss.getSheetByName("Items"),ITEM_HEADERS,db.items);
  writeObjects_(ss.getSheetByName("Transactions"),TX_HEADERS,db.transactions);
  const sh=ss.getSheetByName("Meta"),values=[["key","value"],["categories",JSON.stringify(cleanCategories_(db.categories))],["settings",JSON.stringify(cleanSettings_(db.settings))],["nextId",String(db.nextId||1)],["formatVersion","1"]];
  sh.clearContents();sh.getRange(1,1,values.length,2).setValues(values);sh.setFrozenRows(1);sh.getRange(1,1,1,2).setFontWeight("bold").setBackground("#e8eef8");
}
function writeObjects_(sheet,headers,records){
  sheet.clearContents();sheet.getRange(1,1,1,headers.length).setValues([headers]);
  if(records.length){const values=records.map(r=>headers.map(h=>{const v=r[h];if(v===undefined||v===null)return "";if(typeof v==="object")return JSON.stringify(v);return v;}));sheet.getRange(2,1,values.length,headers.length).setValues(values);}
  sheet.setFrozenRows(1);sheet.getRange(1,1,1,headers.length).setFontWeight("bold").setBackground("#e8eef8");
}
function cleanCategories_(value){if(!Array.isArray(value))return APP_DEFAULT_CATEGORIES.slice();const a=value.map(v=>String(v||"").trim()).filter(Boolean);return a.length?Array.from(new Set(a)): ["기타"];}
function cleanSettings_(value){const s=value&&typeof value==="object"?value:{};return {title:String(s.title||"WAREHOUSE CONTROL"),site:String(s.site||"")};}
