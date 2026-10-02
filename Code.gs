/**
 * AS 관리 공용 서버 — Google Sheets 바운드 Apps Script 버전
 *
 * 사용 방법
 * 1) 공용으로 사용할 Google Sheets를 엽니다.
 * 2) 확장 프로그램 > Apps Script를 선택합니다.
 * 3) 이 파일 전체를 Code.gs에 붙여 넣습니다.
 * 4) 같은 프로젝트에 HTML 파일을 만들고 파일명은 Index.html로 합니다.
 *    다운로드한 AS관리_공용앱.html 내용을 그대로 넣습니다.
 * 5) 배포 > 새 배포 > 웹 앱
 *    - 실행 사용자: 나
 *    - 액세스 권한: 모든 사용자(익명 포함)
 * 6) 생성된 웹 앱 주소 하나만 모든 사람에게 공유합니다.
 */

const CFG = {
  ticketSheet: 'AS접수',
  historySheet: 'AS처리이력',
  codeSheet: 'AS코드',
  storeSheet: '가맹점'
};

const HEADERS = [
  'AS번호','접수일시','접수경로','가맹명','사업자번호','지역','업태','연락처',
  '증상카테고리','증상상세','우선순위','상태','담당기사','예정일','처리일시',
  '처리유형','처리내용','교체부품','종결자','종결일시','비고','갱신일시'
];
const HISTORY_HEADERS = ['일시','AS번호','처리자','액션','내용'];
const CODE_HEADERS = ['종류','값'];
const STATUS = ['접수','배정','처리중','보류','완료','취소'];
const CATEGORIES = ['네트워크','전원/배선','장비불량','자재부족','현장환경','프로그램·설정·사용법','기타'];
const PRIORITIES = ['긴급','보통','낮음'];

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('AS 관리')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function api(action, payload) {
  const started = Date.now();
  try {
    setup_();
    payload = payload || {};
    let result;
    switch (String(action || '')) {
      case 'health': result = { shared: true, mode: 'google-sheets' }; break;
      case 'list': result = listTickets_(payload); break;
      case 'history': result = { history: readHistory_(payload.AS번호 || '') }; break;
      case 'create': result = createTicket_(payload); break;
      case 'patch': result = patchTicket_(payload); break;
      default: throw new Error('지원하지 않는 요청입니다: ' + action);
    }
    console.log(JSON.stringify({tag:'as', action:action, ok:true, ms:Date.now()-started}));
    return result;
  } catch (err) {
    console.log(JSON.stringify({tag:'as', action:action, ok:false, ms:Date.now()-started, error:String(err && err.message || err)}));
    throw err;
  }
}

function getBook_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('이 Code.gs를 공용 Google Sheets에서 확장 프로그램 > Apps Script로 열어 주세요.');
  return ss;
}

function setup_() {
  const ss = getBook_();
  const t = getOrCreate_(ss, CFG.ticketSheet, HEADERS);
  const h = getOrCreate_(ss, CFG.historySheet, HISTORY_HEADERS);
  const c = getOrCreate_(ss, CFG.codeSheet, CODE_HEADERS);
  if (c.getLastRow() < 2) {
    const rows = [];
    CATEGORIES.forEach(v => rows.push(['카테고리', v]));
    PRIORITIES.forEach(v => rows.push(['우선순위', v]));
    STATUS.forEach(v => rows.push(['상태', v]));
    c.getRange(2,1,rows.length,2).setValues(rows);
  }
  if (t.getFrozenRows() !== 1) t.setFrozenRows(1);
  if (h.getFrozenRows() !== 1) h.setFrozenRows(1);
}

function getOrCreate_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) sh.getRange(1,1,1,headers.length).setValues([headers]);
  else {
    const current = sh.getRange(1,1,1,headers.length).getValues()[0].map(String);
    let need = false;
    headers.forEach((h,i) => { if (current[i] !== h) need = true; });
    if (need) sh.getRange(1,1,1,headers.length).setValues([headers]);
  }
  return sh;
}

function rowToObj_(row) {
  const o = {};
  HEADERS.forEach((h,i) => o[h] = row[i] == null ? '' : String(row[i]));
  return o;
}

function allTickets_() {
  const sh = getBook_().getSheetByName(CFG.ticketSheet);
  if (!sh || sh.getLastRow() < 2) return [];
  const values = sh.getRange(2,1,sh.getLastRow()-1,HEADERS.length).getDisplayValues();
  return values.map(rowToObj_).filter(t => t.AS번호);
}

function listTickets_(p) {
  let tickets = allTickets_();
  if (p.status) tickets = tickets.filter(t => t.상태 === p.status);
  if (p.mine === '1') tickets = tickets.filter(t => t.담당기사 === (p.workerName || ''));
  tickets.sort((a,b) => String(b.접수일시).localeCompare(String(a.접수일시)));
  return { tickets: tickets, history: readHistory_(''), stores: readStores_() };
}

function readHistory_(asNo) {
  const sh = getBook_().getSheetByName(CFG.historySheet);
  if (!sh || sh.getLastRow() < 2) return [];
  const values = sh.getRange(2,1,sh.getLastRow()-1,HISTORY_HEADERS.length).getDisplayValues();
  let rows = values.map(r => ({일시:String(r[0]||''),AS번호:String(r[1]||''),처리자:String(r[2]||''),액션:String(r[3]||''),내용:String(r[4]||'')})).filter(x => x.AS번호);
  if (asNo) rows = rows.filter(x => x.AS번호 === asNo);
  rows.sort((a,b) => String(b.일시).localeCompare(String(a.일시)));
  return rows;
}

function readStores_() {
  const ss = getBook_();
  const sh = ss.getSheetByName(CFG.storeSheet);
  if (!sh || sh.getLastRow() < 2) return [];
  const values = sh.getDataRange().getDisplayValues();
  const heads = values[0].map(String);
  const idx = k => heads.indexOf(k);
  return values.slice(1).map(r => ({
    사업자번호: idx('사업자번호')>=0?String(r[idx('사업자번호')]||''):'',
    가맹명: idx('가맹명')>=0?String(r[idx('가맹명')]||''):'',
    지역: idx('지역')>=0?String(r[idx('지역')]||''):'',
    업태: idx('업태')>=0?String(r[idx('업태')]||''):''
  })).filter(s => s.가맹명 || s.사업자번호);
}

function kst_() {
  return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
}
function today_() { return Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyyMMdd'); }

function nextAsNo_() {
  const prefix = 'AS-' + today_() + '-';
  const tickets = allTickets_();
  let max = 0;
  tickets.forEach(t => {
    if (String(t.AS번호).indexOf(prefix) === 0) {
      const m = String(t.AS번호).match(/^AS-\d{8}-(\d{4})$/);
      if (m) max = Math.max(max, Number(m[1]));
    }
  });
  return prefix + String(max + 1).padStart(4,'0');
}

function createTicket_(p) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(10000);
  try {
    const ticket = p.ticket || {};
    const now = kst_();
    const asNo = nextAsNo_();
    const sh = getBook_().getSheetByName(CFG.ticketSheet);
    const row = [
      asNo, now, String(ticket.접수경로||'기타'), String(ticket.가맹명||''), String(ticket.사업자번호||''),
      String(ticket.지역||''), String(ticket.업태||''), String(ticket.연락처||''), String(ticket.증상카테고리||'기타'),
      String(ticket.증상상세||''), String(ticket.우선순위||'보통'), '접수', '', '', '', '', '', '', '', '', '', now
    ];
    sh.getRange(sh.getLastRow()+1,1,1,HEADERS.length).setValues([row]);
    appendHistory_([now,asNo,String(p.by||'현재 작업자'),'접수',String(ticket.증상상세||'')]);
    return { ticket: rowToObj_(row) };
  } finally { lock.releaseLock(); }
}

function canTransition_(from,to) {
  const map = {
    '접수':['배정','취소','보류'],
    '배정':['처리중','취소','보류'],
    '처리중':['완료','보류'],
    '보류':['배정'],
    '완료':[],
    '취소':[]
  };
  return (map[from]||[]).indexOf(to)>=0;
}

function patchTicket_(p) {
  const id = String(p.id||'');
  const patch = p.patch || {};
  const sh = getBook_().getSheetByName(CFG.ticketSheet);
  if (!sh || sh.getLastRow() < 2) throw new Error('AS 데이터를 찾을 수 없습니다.');
  const values = sh.getRange(2,1,sh.getLastRow()-1,HEADERS.length).getDisplayValues();
  let rowIdx = -1;
  let current = null;
  for (let i=0;i<values.length;i++) {
    if (String(values[i][0]) === id) { rowIdx = i+2; current = rowToObj_(values[i]); break; }
  }
  if (rowIdx < 0) throw new Error('AS번호를 찾을 수 없습니다: '+id);
  if (patch.상태 && patch.상태 !== '처리' && !canTransition_(current.상태, patch.상태)) throw new Error('현재 상태에서는 해당 작업을 할 수 없습니다.');
  const updated = Object.assign({}, current, patch, {갱신일시:kst_()});
  const row = HEADERS.map(h => updated[h] == null ? '' : updated[h]);
  sh.getRange(rowIdx,1,1,HEADERS.length).setValues([row]);
  const action = String(patch.action || '메모');
  const content = String(patch.처리내용 || patch.비고 || '');
  appendHistory_([kst_(),id,String(patch.by||'현재 작업자'),action,content]);
  return { ticket: updated };
}

function appendHistory_(row) {
  const sh = getBook_().getSheetByName(CFG.historySheet);
  sh.getRange(sh.getLastRow()+1,1,1,HISTORY_HEADERS.length).setValues([row]);
}
