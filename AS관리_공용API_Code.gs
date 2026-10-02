/**
 * AS 관리 공용 API - Google Apps Script
 *
 * 사용법
 * 1) AS 관리용 Google Sheet를 하나 만든다.
 * 2) 확장 프로그램 > Apps Script에서 이 코드를 Code.gs에 붙여넣는다.
 * 3) SPREADSHEET_ID를 해당 시트 ID로 입력한다.
 * 4) 배포 > 새 배포 > 웹 앱 > 실행 사용자: 나 / 액세스: 모든 사용자 로 배포한다.
 * 5) 생성된 /exec URL을 AS관리_공용공유 HTML의 공용 API 주소에 넣는다.
 */
const SPREADSHEET_ID = '여기에_AS관리_스프레드시트_ID_입력';
const ACCESS_KEY = ''; // 필요하면 공용 비밀코드 입력. HTML에서도 같은 값을 입력.
const TZ = 'Asia/Seoul';

const SHEETS = {
  tickets: 'AS접수',
  history: 'AS처리이력',
  codes: 'AS코드'
};

const TICKET_HEADERS = ['AS번호','접수일시','접수경로','가맹명','사업자번호','지역','업태','연락처','증상카테고리','증상상세','우선순위','상태','담당기사','예정일','처리일시','처리유형','처리내용','교체부품','종결자','종결일시','비고','갱신일시'];
const HISTORY_HEADERS = ['일시','AS번호','처리자','액션','내용'];
const CODES_HEADERS = ['구분','값'];
const STATUS = ['접수','배정','처리중','보류','완료','취소'];
const PRIORITIES = ['긴급','보통','낮음'];
const CATEGORIES = ['네트워크','전원/배선','장비불량','자재부족','현장환경','프로그램·설정·사용법','기타'];

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function checkKey_(e) {
  if (!ACCESS_KEY) return true;
  const got = (e && e.parameter && e.parameter.accessKey) || '';
  return got === ACCESS_KEY;
}

function ss_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID.indexOf('여기에_') === 0) {
    throw new Error('SPREADSHEET_ID를 먼저 설정하세요.');
  }
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function ensureSheet_(name, headers) {
  const ss = ss_();
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.getRange(1, 1, 1, headers.length).setValues([headers]);
  return sh;
}

function setup_() {
  ensureSheet_(SHEETS.tickets, TICKET_HEADERS);
  ensureSheet_(SHEETS.history, HISTORY_HEADERS);
  const code = ensureSheet_(SHEETS.codes, CODES_HEADERS);
  if (code.getLastRow() <= 1) {
    const rows = [
      ...CATEGORIES.map(v => ['카테고리', v]),
      ...PRIORITIES.map(v => ['우선순위', v]),
      ...STATUS.map(v => ['상태', v])
    ];
    code.getRange(2,1,rows.length,2).setValues(rows);
  }
}

function doGet(e) {
  try {
    if (!checkKey_(e)) return json_({ok:false,error:'ACCESS_DENIED'});
    setup_();
    const action = (e && e.parameter && e.parameter.action) || 'health';
    if (action === 'health') return json_({ok:true,shared:true,service:'AS관리',version:'1.0'});
    if (action === 'list') return json_(listTickets_(e.parameter || {}));
    if (action === 'get') return json_(getTicket_(e.parameter.id || ''));
    return json_({ok:false,error:'UNKNOWN_ACTION'});
  } catch (err) {
    console.error(err);
    return json_({ok:false,error:String(err && err.message || err)});
  }
}

function doPost(e) {
  try {
    if (!checkKey_(e)) return json_({ok:false,error:'ACCESS_DENIED'});
    setup_();
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const action = body.action || (e && e.parameter && e.parameter.action) || '';
    if (action === 'create') return json_(createTicket_(body));
    if (action === 'patch') return json_(patchTicket_(body));
    return json_({ok:false,error:'UNKNOWN_ACTION'});
  } catch (err) {
    console.error(err);
    return json_({ok:false,error:String(err && err.message || err)});
  }
}

function fmtKst_(d) {
  return Utilities.formatDate(d, TZ, 'yyyy-MM-dd HH:mm');
}
function todayKey_() {
  return Utilities.formatDate(new Date(), TZ, 'yyyyMMdd');
}

function rowsToObjects_(values) {
  if (!values || values.length <= 1) return [];
  return values.slice(1).map(row => {
    const o = {};
    TICKET_HEADERS.forEach((h,i) => o[h] = row[i] == null ? '' : String(row[i]));
    return o;
  });
}

function listTickets_(p) {
  const sh = ensureSheet_(SHEETS.tickets, TICKET_HEADERS);
  const h = ensureSheet_(SHEETS.history, HISTORY_HEADERS);
  const last = sh.getLastRow();
  const values = last > 1 ? sh.getRange(1,1,last,TICKET_HEADERS.length).getDisplayValues() : [TICKET_HEADERS];
  let tickets = rowsToObjects_(values);
  if (p.status) tickets = tickets.filter(t => t.상태 === p.status);
  if (p.mine === '1' && p.workerName) tickets = tickets.filter(t => t.담당기사 === p.workerName);
  tickets.sort((a,b) => String(b.접수일시).localeCompare(String(a.접수일시)));
  const hl = h.getLastRow();
  const hv = hl > 1 ? h.getRange(1,1,hl,HISTORY_HEADERS.length).getDisplayValues() : [HISTORY_HEADERS];
  const history = hv.slice(1).map(r => ({일시:r[0]||'',AS번호:r[1]||'',처리자:r[2]||'',액션:r[3]||'',내용:r[4]||''}));
  return {ok:true,tickets,history};
}

function getRowById_(id) {
  const sh = ensureSheet_(SHEETS.tickets, TICKET_HEADERS);
  const last = sh.getLastRow();
  if (last < 2) return null;
  const ids = sh.getRange(2,1,last-1,1).getDisplayValues().flat();
  const idx = ids.indexOf(id);
  return idx < 0 ? null : {sh,row:idx+2};
}

function objectAtRow_(sh,row) {
  const vals = sh.getRange(row,1,1,TICKET_HEADERS.length).getDisplayValues()[0];
  const o = {};
  TICKET_HEADERS.forEach((h,i)=>o[h]=vals[i]||'');
  return o;
}

function nextId_() {
  const sh = ensureSheet_(SHEETS.tickets, TICKET_HEADERS);
  const prefix = 'AS-' + todayKey_() + '-';
  const last = sh.getLastRow();
  let max = 0;
  if (last > 1) {
    const ids = sh.getRange(2,1,last-1,1).getDisplayValues().flat();
    ids.forEach(id => {
      if (id.indexOf(prefix) === 0) {
        const n = Number(id.slice(prefix.length));
        if (Number.isFinite(n)) max = Math.max(max,n);
      }
    });
  }
  return prefix + String(max + 1).padStart(4,'0');
}

function createTicket_(body) {
  const input = body.ticket || {};
  const by = body.by || '현재 작업자';
  const sh = ensureSheet_(SHEETS.tickets, TICKET_HEADERS);
  const now = fmtKst_(new Date());
  let id = nextId_();
  let values = [
    id,now,input.접수경로||'기타',input.가맹명||'',input.사업자번호||'',input.지역||'',input.업태||'',input.연락처||'',
    input.증상카테고리||'기타',input.증상상세||'',input.우선순위||'보통','접수','',input.예정일||'', '', '', '', '', '', '', '', now
  ];
  sh.getRange(sh.getLastRow()+1,1,1,TICKET_HEADERS.length).setValues([values]);
  const hist = ensureSheet_(SHEETS.history, HISTORY_HEADERS);
  hist.getRange(hist.getLastRow()+1,1,1,HISTORY_HEADERS.length).setValues([[now,id,by,'접수',input.증상상세||'']]);
  return {ok:true,ticket:objectAtRow_(sh,sh.getLastRow())};
}

function patchTicket_(body) {
  const id = body.id || '';
  const patch = body.patch || {};
  const by = body.by || patch.by || '현재 작업자';
  const found = getRowById_(id);
  if (!found) throw new Error('AS번호를 찾을 수 없습니다.');
  const sh = found.sh;
  const before = objectAtRow_(sh,found.row);
  const now = fmtKst_(new Date());
  const currentVersion = String(before.갱신일시 || '');
  if (body.version && body.version !== currentVersion) return {ok:false,conflict:true,error:'다른 사용자가 먼저 변경했습니다.'};
  const merged = Object.assign({},before,patch); delete merged.action; delete merged.by;
  merged.갱신일시 = now;
  const row = TICKET_HEADERS.map(h => merged[h] == null ? '' : merged[h]);
  sh.getRange(found.row,1,1,TICKET_HEADERS.length).setValues([row]);
  const hist = ensureSheet_(SHEETS.history, HISTORY_HEADERS);
  const action = patch.action || before.상태;
  const content = patch.처리내용 || patch.비고 || '';
  hist.getRange(hist.getLastRow()+1,1,1,HISTORY_HEADERS.length).setValues([[now,id,by,action,content]]);
  return {ok:true,ticket:objectAtRow_(sh,found.row)};
}
