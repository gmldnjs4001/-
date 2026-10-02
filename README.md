<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#071d37">
<title>중고 재고관리 Pro</title>
<style>
:root{--navy:#071d37;--blue:#2f73e8;--bg:#f5f7fb;--text:#16233a;--muted:#718097;--card:#fff;--line:#e5e9f0;--danger:#d94b55;--ok:#2e9d70}
*{box-sizing:border-box}
html,body{margin:0;min-height:100%;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans KR","Malgun Gothic",sans-serif;background:var(--bg);color:var(--text)}
button,input,select,textarea{font:inherit}button{cursor:pointer}
button:disabled{opacity:.55;cursor:not-allowed}
.hidden{display:none!important}
.app{min-height:100vh}
.header{position:sticky;top:0;z-index:30;height:66px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 16px}
.brand{display:flex;align-items:center;gap:10px;font-weight:850}
.logo{width:38px;height:38px;border-radius:12px;background:linear-gradient(135deg,#2f73e8,#738cff);color:#fff;display:grid;place-items:center;font-weight:900;box-shadow:0 7px 18px rgba(47,115,232,.22)}
.header-user{font-weight:750;color:var(--blue)}
.body{padding:16px 16px 96px;max-width:1280px;margin:0 auto}
.section-title{font-size:25px;font-weight:900;margin-bottom:12px}
.muted{color:var(--muted)}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.card{background:var(--card);border:1px solid #eef1f6;border-radius:18px;padding:16px;box-shadow:0 10px 30px rgba(20,34,58,.07)}
.metric-label{font-size:14px;color:#667288}.metric-value{font-size:30px;font-weight:900;margin-top:6px}
.panel{margin-top:14px}
.toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.btn{min-height:44px;border:0;border-radius:12px;padding:10px 15px;background:#edf1f7;color:#2b3750;font-weight:750}
.btn-primary{background:var(--blue);color:#fff}.btn-danger{background:var(--danger);color:#fff}.btn-outline{background:#fff;border:1px solid #cfd7e5}
.field{display:grid;gap:7px;margin:11px 0}.field label{font-size:14px;font-weight:750}
.field input,.field select,.field textarea{width:100%;min-height:48px;border:1px solid #d7deea;border-radius:12px;background:#fff;padding:10px 13px;outline:none}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(47,115,232,.12)}
.barcode-row{display:grid;grid-template-columns:1fr auto;gap:8px}.barcode-btn{min-width:96px}
.form-actions{display:grid;gap:9px;margin-top:12px}
.table-wrap{overflow:auto;background:#fff;border:1px solid #eef1f6;border-radius:18px}
table{width:100%;min-width:760px;border-collapse:collapse}
th,td{padding:11px 10px;border-bottom:1px solid #edf0f5;text-align:left;white-space:nowrap}
th{background:#fafbfd;color:#647188;font-size:13px}td{font-size:14px}
.badge{display:inline-flex;align-items:center;padding:4px 9px;border-radius:99px;background:#eef4ff;color:var(--blue);font-size:12px;font-weight:800}
.empty{padding:38px;text-align:center;color:#8a94a7}
.bottom-nav{position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--navy);display:grid;grid-template-columns:repeat(8,minmax(0,1fr));padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
.nav-item{border:0;background:transparent;color:#d9e0ec;display:flex;flex-direction:column;align-items:center;gap:3px;padding:5px 2px;min-width:0}
.nav-item.active{color:#5ea0ff}.nav-icon{font-size:20px;line-height:20px}.nav-label{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.modal-backdrop{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.62);display:grid;place-items:center;padding:12px}
.modal{width:min(560px,96vw);max-height:92vh;overflow:auto;background:#fff;border-radius:20px;padding:16px;box-shadow:0 24px 90px rgba(0,0,0,.3)}
.modal h3{margin:0 0 10px;font-size:20px}
.camera{position:relative;background:#101521;border-radius:16px;overflow:hidden;aspect-ratio:4/3}
.camera video{width:100%;height:100%;object-fit:cover;display:block}
.camera-frame{position:absolute;left:10%;right:10%;top:24%;bottom:24%;border:2px solid rgba(255,255,255,.95);border-radius:10px}
.modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px}
.note{font-size:12px;color:#69768a;line-height:1.5;margin-top:8px}
.login-screen{min-height:100vh;display:grid;place-items:center;padding:18px;background:linear-gradient(180deg,#071d37,#153c66)}
.login-card{width:min(430px,94vw);background:#fff;border-radius:24px;padding:24px;box-shadow:0 20px 70px rgba(0,0,0,.28)}
.login-title{font-size:30px;font-weight:900;color:var(--navy)}
.login-sub{margin-top:4px;color:#7a8699}.login-card .logo{width:62px;height:62px;border-radius:18px;margin-bottom:15px}
.alert{margin-top:12px;padding:11px 12px;border-radius:12px;background:#fff4f4;color:#a6363f;font-size:13px}
.statline{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.small-stat{background:#f7f9fc;border-radius:12px;padding:12px}.small-stat b{font-size:22px}
@media(max-width:920px){.cards{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:600px){.header{height:62px;padding:0 12px}.body{padding:12px 10px 94px}.section-title{font-size:22px}.cards{gap:8px}.card{padding:13px;border-radius:15px}.metric-value{font-size:25px}.bottom-nav{grid-template-columns:repeat(8,minmax(0,1fr))}.nav-icon{font-size:18px}.nav-label{font-size:9px}.modal-actions{grid-template-columns:1fr}}
@media(max-width:390px){.bottom-nav{grid-template-columns:repeat(4,1fr);grid-auto-rows:52px}}
</style>
</head>
<body>
<div id="root"></div>

<script>
"use strict";

const CONFIG = { SUPABASE_URL:"", SUPABASE_PUBLISHABLE_KEY:"" };
const DEMO_USERS = {
  admin:{password:"admin1234",name:"관리자",role:"admin"},
  staff:{password:"staff1234",name:"직원",role:"user"}
};

const state = {
  user:null, view:"dashboard", local:true, sb:null, realtime:null,
  inventory:[], history:[], disposals:[]
};

const NAV = [
  ["dashboard","⌂","대시보드"],["inventory","▣","중고재고"],["inbound","↓","입고"],
  ["outbound","↑","출고"],["reentry","↻","재입고"],["history","▤","입·출고"],
  ["analytics","▥","분석"],["settings","⚙","관리자"]
];

const $ = (s,root=document)=>root.querySelector(s);
const esc = v => String(v ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const now = ()=>new Date().toISOString();
const uid = ()=>crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()+Math.random());

function saveLocal(){
  localStorage.setItem("uip-shared-data-v5",JSON.stringify({
    inventory:state.inventory,history:state.history,disposals:state.disposals
  }));
}
function loadLocal(){
  try{
    const d=JSON.parse(localStorage.getItem("uip-shared-data-v5")||"{}");
    state.inventory=Array.isArray(d.inventory)?d.inventory:[];
    state.history=Array.isArray(d.history)?d.history:[];
    state.disposals=Array.isArray(d.disposals)?d.disposals:[];
  }catch(e){state.inventory=[];state.history=[];state.disposals=[]}
}

function renderLogin(){
  document.body.innerHTML=`
  <div class="login-screen">
    <div class="login-card">
      <div class="logo">IP</div>
      <div class="login-title">중고 재고관리 Pro</div>
      <div class="login-sub">휴대폰 · PC 공동사용 재고관리</div>
      <div class="field"><label>아이디</label><input id="login-id" autocomplete="username" placeholder="아이디"></div>
      <div class="field"><label>비밀번호</label><input id="login-pw" type="password" autocomplete="current-password" placeholder="비밀번호"></div>
      <button class="btn btn-primary" id="login-btn" style="width:100%">로그인</button>
      ${state.local?'<div class="alert">현재 로컬 데모 모드입니다. 여러 기기에서 같은 데이터를 쓰려면 Supabase를 연결해야 합니다.<br>데모: admin / admin1234</div>':""}
      <div class="note">바코드 촬영은 HTTPS 주소에서 카메라 권한을 허용해야 합니다.</div>
    </div>
  </div>`;
  $("#login-btn").onclick=login;
}

function shell(){
  document.body.innerHTML=`
  <div class="app">
    <header class="header">
      <div class="brand"><div class="logo">IP</div><div>중고 재고관리 Pro</div></div>
      <div class="header-user">● ${esc(state.user?.name||"사용자")}</div>
    </header>
    <main class="body"><div id="content"></div></main>
    <nav class="bottom-nav">${NAV.map(([k,i,n])=>`
      <button class="nav-item ${state.view===k?"active":""}" data-nav="${k}">
        <span class="nav-icon">${i}</span><span class="nav-label">${n}</span>
      </button>`).join("")}</nav>
  </div>`;
  document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{state.view=b.dataset.nav;render()});
  render();
}

function render(){
  const f={dashboard,inventoryView,inboundView,outboundView,reentryView,historyView,analyticsView,settingsView}[state.view]||dashboard;
  $("#content").innerHTML=f();
  bindView();
}

function dashboard(){
  const qty=state.inventory.reduce((a,x)=>a+Number(x.qty||0),0);
  const inc=state.history.filter(x=>x.kind==="입고").reduce((a,x)=>a+Number(x.qty||0),0);
  const out=state.history.filter(x=>x.kind==="출고").reduce((a,x)=>a+Number(x.qty||0),0);
  const re=state.history.filter(x=>x.kind==="재입고").reduce((a,x)=>a+Number(x.qty||0),0);
  return `<div class="section-title">대시보드</div>
  <div class="cards">
    <div class="card"><div class="metric-label">전체 재고</div><div class="metric-value">${qty} 개</div><div class="muted">현재 보유 수량</div></div>
    <div class="card"><div class="metric-label">입고</div><div class="metric-value">${inc} 개</div><div class="muted">누적 입고</div></div>
    <div class="card"><div class="metric-label">출고</div><div class="metric-value">${out} 개</div><div class="muted">누적 출고</div></div>
    <div class="card"><div class="metric-label">재입고</div><div class="metric-value">${re} 개</div><div class="muted">누적 재입고</div></div>
  </div>
  <div class="card panel"><h3>최근 작업</h3>${historyTable(state.history.slice().reverse().slice(0,8))}</div>`;
}

function inventoryView(){
  return `<div class="section-title">중고재고</div>
  <div class="toolbar">
    <button class="btn btn-primary" id="go-in">입고 등록</button>
    <button class="btn" id="go-disposal">폐기 내역</button>
  </div>
  <div class="table-wrap"><table>
    <thead><tr><th>모델명</th><th>바코드번호</th><th>수량</th><th>상태</th><th>수정</th></tr></thead>
    <tbody>${state.inventory.length?state.inventory.map((x,i)=>`
      <tr><td>${esc(x.model)}</td><td>${esc(x.serial)}</td><td>${x.qty}</td><td><span class="badge">${esc(x.status||"정상")}</span></td>
      <td><button class="btn edit-stock" data-i="${i}">수정</button></td></tr>`).join(""):`<tr><td colspan="5" class="empty">등록된 재고가 없습니다.</td></tr>`}</tbody>
  </table></div>`;
}

function transactionForm(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  return `<div class="section-title">${kind}</div>
  <div class="card">
    <div class="field"><label>모델명</label><input id="${p}-model" placeholder="모델명"></div>
    <div class="field"><label>바코드번호</label><div class="barcode-row">
      <input id="${p}-serial" placeholder="입력 또는 촬영" autocomplete="off">
      <button class="btn barcode-btn" id="scan-${p}" type="button">📷 촬영</button>
    </div></div>
    <div class="field"><label>수량</label><input id="${p}-qty" type="number" min="1" value="1"></div>
    ${kind!=="입고"?`<div class="field"><label>가맹점</label><input id="${p}-store" placeholder="가맹점명"></div>`:""}
    ${kind==="입고"?`
      <div class="field"><label>입고내용</label><select id="in-type"><option>A/S 입고</option><option>수리입고</option><option>폐기</option></select></div>
      <div class="field hidden" id="reason-box"><label>폐기 사유</label><textarea id="in-reason" rows="3" placeholder="폐기 이유"></textarea></div>
      <div class="form-actions"><button class="btn btn-outline" id="view-disposals">폐기 제품 보기</button><button class="btn btn-primary" id="save-in">입고 저장</button></div>`
      :`<div class="form-actions"><button class="btn btn-primary" id="save-${p}">${kind} 저장</button></div>`}
  </div>`;
}
function inboundView(){return transactionForm("입고")}
function outboundView(){return transactionForm("출고")}
function reentryView(){return transactionForm("재입고")}

function historyTable(rows){
  if(!rows.length)return `<div class="empty">내역이 없습니다.</div>`;
  return `<div class="table-wrap"><table><thead><tr><th>일시</th><th>구분</th><th>모델명</th><th>바코드</th><th>수량</th><th>가맹점</th><th>내용</th></tr></thead><tbody>
  ${rows.map(x=>`<tr><td>${esc(new Date(x.at).toLocaleString("ko-KR"))}</td><td>${esc(x.kind)}</td><td>${esc(x.model)}</td><td>${esc(x.serial)}</td><td>${Number(x.qty||0)}</td><td>${esc(x.store)}</td><td>${esc(x.note||x.reason||"")}</td></tr>`).join("")}
  </tbody></table></div>`;
}
function historyView(){return `<div class="section-title">입·출고 내역</div><div class="toolbar"><button class="btn btn-primary" id="export-btn">전체 자료 내보내기</button></div><div class="card">${historyTable(state.history.slice().reverse())}</div>`}
function disposalView(){return `<div class="section-title">폐기 내역</div><div class="card">${historyTable(state.disposals.slice().reverse())}</div>`}

function analyticsView(){
  const y=new Date().getFullYear();
  const ms=Array.from({length:12},(_,i)=>i+1).map(m=>{
    const total=k=>state.history.filter(x=>{const d=new Date(x.at);return d.getFullYear()===y&&d.getMonth()+1===m&&x.kind===k}).reduce((a,x)=>a+Number(x.qty||0),0);
    return {m,in:total("입고"),out:total("출고"),re:total("재입고")};
  });
  const max=Math.max(1,...ms.flatMap(x=>[x.in,x.out,x.re]));
  return `<div class="section-title">월간 / 연간 분석</div>
  <div class="card">
    <h3>${y}년 월간 추이</h3>
    <div style="height:260px;display:flex;align-items:flex-end;gap:6px;padding:18px 8px 35px;border-bottom:1px solid #dfe4ec">
      ${ms.map(x=>`<div style="flex:1;height:100%;display:flex;align-items:flex-end;gap:2px;position:relative">
        <div title="입고 ${x.in}" style="height:${Math.max(3,x.in/max*185)}px;flex:1;background:#2f73e8;border-radius:5px 5px 0 0"></div>
        <div title="출고 ${x.out}" style="height:${Math.max(3,x.out/max*185)}px;flex:1;background:#6c788d;border-radius:5px 5px 0 0"></div>
        <div title="재입고 ${x.re}" style="height:${Math.max(3,x.re/max*185)}px;flex:1;background:#7f8cff;border-radius:5px 5px 0 0"></div>
        <span style="position:absolute;left:50%;bottom:-26px;transform:translateX(-50%);font-size:10px">${x.m}월</span>
      </div>`).join("")}
    </div>
    <div class="toolbar" style="margin-top:12px"><span class="badge">파랑: 입고</span><span class="badge" style="background:#eef0f4;color:#5e687a">회색: 출고</span><span class="badge" style="background:#f0f0ff;color:#626fe7">보라: 재입고</span></div>
  </div>
  <div class="card panel"><h3>연간 내역</h3>${annualTable()}</div>`;
}
function annualTable(){
  const ys=[...new Set(state.history.map(x=>new Date(x.at).getFullYear()))].sort((a,b)=>b-a);
  if(!ys.length)return `<div class="empty">아직 데이터가 없습니다.</div>`;
  const sum=(y,k)=>state.history.filter(x=>new Date(x.at).getFullYear()===y&&x.kind===k).reduce((a,x)=>a+Number(x.qty||0),0);
  return `<div class="table-wrap"><table><thead><tr><th>연도</th><th>입고</th><th>출고</th><th>재입고</th><th>폐기</th></tr></thead><tbody>${ys.map(y=>`<tr><td>${y}</td><td>${sum(y,"입고")}</td><td>${sum(y,"출고")}</td><td>${sum(y,"재입고")}</td><td>${sum(y,"폐기")}</td></tr>`).join("")}</tbody></table></div>`;
}
function settingsView(){
  return `<div class="section-title">관리자 설정</div>
  <div class="card"><h3>계정</h3><div class="muted" style="margin:7px 0 12px">관리자 기능은 서버 연결 후 계정별 권한을 적용합니다.</div><button class="btn" id="show-account">계정 안내</button></div>
  <div class="card panel"><h3>전체 초기화</h3><div class="muted" style="margin:7px 0 12px">관리자 비밀번호를 다시 확인한 후 현재 저장 데이터를 초기화합니다.</div><button class="btn btn-danger" id="reset-btn">전체 초기화</button></div>`;
}

function bindView(){
  const scans=[["#scan-in","#in-serial"],["#scan-out","#out-serial"],["#scan-re","#re-serial"]];
  scans.forEach(([b,t])=>{if($(b))$(b).onclick=()=>openScanner(t);if($(t))$(t).onclick=()=>openScanner(t)});
  if($("#in-type"))$("#in-type").onchange=e=>$("#reason-box").classList.toggle("hidden",e.target.value!=="폐기");
  if($("#save-in"))$("#save-in").onclick=()=>saveTransaction("입고");
  if($("#save-out"))$("#save-out").onclick=()=>saveTransaction("출고");
  if($("#save-re"))$("#save-re").onclick=()=>saveTransaction("재입고");
  if($("#view-disposals"))$("#view-disposals").onclick=()=>{state.view="disposal";render()};
  if($("#go-in"))$("#go-in").onclick=()=>{state.view="inbound";render()};
  if($("#go-disposal"))$("#go-disposal").onclick=()=>{state.view="disposal";render()};
  if($("#export-btn"))$("#export-btn").onclick=exportAll;
  if($("#reset-btn"))$("#reset-btn").onclick=resetAll;
  if($("#show-account"))$("#show-account").onclick=()=>alert("데모 관리자: admin / admin1234\\n데모 사용자: staff / staff1234");
  document.querySelectorAll(".edit-stock").forEach(b=>b.onclick=()=>editStock(Number(b.dataset.i)));
}
async function saveTransaction(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  const model=$(`#${p}-model`).value.trim(),serial=$(`#${p}-serial`).value.trim(),qty=Number($(`#${p}-qty`).value||0);
  const store=kind==="입고"?"":$(`#${p}-store`).value.trim();
  if(!model||!serial||qty<=0)return alert("모델명, 바코드번호, 수량을 입력하세요.");
  let note="",reason="";
  if(kind==="입고"){
    note=$("#in-type").value;
    if(note==="폐기"){
      reason=$("#in-reason").value.trim();
      if(!reason)return alert("폐기 사유를 입력하세요.");
    }
  }
  let inv=state.inventory.find(x=>x.model===model&&x.serial===serial);
  if(kind==="출고"){
    if(!inv||Number(inv.qty)<qty)return alert("재고가 부족합니다.");
    inv.qty-=qty;
  }else if(kind==="재입고"){
    if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};state.inventory.push(inv);}
  }else if(note!=="폐기"){
    if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};state.inventory.push(inv);}
  }
  const x={id:uid(),kind:note==="폐기"?"폐기":kind,model,serial,qty,store,note,reason,at:now(),actor:state.user?.username||"local"};
  state.history.push(x);if(x.kind==="폐기")state.disposals.push(x);
  saveLocal();
  if(!state.local){try{if(x.kind!=="폐기"&&inv)await remoteUpsertInventory(inv);if(x.kind==="폐기"&&inv)await remoteUpsertInventory(inv);await remoteInsertHistory(x)}catch(e){console.warn(e)}}
  alert(kind+" 저장 완료");render();
}
function editStock(i){
  const x=state.inventory[i];if(!x)return;
  const q=prompt("수정할 재고 수량",String(x.qty));if(q===null)return;
  const n=Number(q);if(!Number.isFinite(n)||n<0)return alert("올바른 수량을 입력하세요.");
  x.qty=n;saveLocal();if(!state.local)remoteUpsertInventory(x).catch(console.warn);render();
}
function resetAll(){
  const p=prompt("관리자 비밀번호를 다시 입력하세요.");
  if(p===null)return;if(p!=="admin1234")return alert("관리자 비밀번호가 맞지 않습니다.");
  if(!confirm("전체 재고와 전체 내역을 삭제하시겠습니까?"))return;
  state.inventory=[];state.history=[];state.disposals=[];saveLocal();render();alert("초기화되었습니다.");
}
function csvCell(v){return `"${String(v??"").replaceAll('"','""')}"`}
function exportAll(){
  const rows=[
    ["중고재고"],["모델명","바코드번호","수량","상태"],
    ...state.inventory.map(x=>[x.model,x.serial,x.qty,x.status||"정상"]),[],
    ["전체 내역"],["구분","일시","모델명","바코드","수량","가맹점","입고내용","폐기사유"],
    ...state.history.map(x=>[x.kind,x.at,x.model,x.serial,x.qty,x.store,x.note,x.reason]),[],
    ["연간 요약"],["연도","입고","출고","재입고","폐기"]
  ];
  const years=[...new Set(state.history.map(x=>new Date(x.at).getFullYear()))].sort((a,b)=>a-b);
  const sum=(y,k)=>state.history.filter(x=>new Date(x.at).getFullYear()===y&&x.kind===k).reduce((a,x)=>a+Number(x.qty||0),0);
  years.forEach(y=>rows.push([y,sum(y,"입고"),sum(y,"출고"),sum(y,"재입고"),sum(y,"폐기")]));
  const blob=new Blob(["\uFEFF"+rows.map(r=>r.map(csvCell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`중고재고관리_전체분석_${new Date().toISOString().slice(0,10)}.csv`;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);
  setTimeout(()=>{const email=prompt("받을 이메일 주소를 입력하세요. (선택)");if(email)location.href="mailto:"+encodeURIComponent(email)+"?subject="+encodeURIComponent("중고재고관리 분석자료")+"&body="+encodeURIComponent("다운로드한 분석파일을 이메일에 첨부해 주세요.");},250);
}
function openScanner(targetSelector){
  const target=$(targetSelector);if(!target)return;
  const back=document.createElement("div");back.className="modal-backdrop";
  back.innerHTML=`<div class="modal"><h3>바코드 촬영</h3><div class="camera"><video id="scan-video" autoplay muted playsinline></video><div class="camera-frame"></div></div><div class="note" id="scan-note">카메라 권한을 허용하고 바코드를 화면 중앙에 맞춘 후 촬영하세요.<br>촬영은 HTTPS 웹주소에서 사용하는 것을 권장합니다.</div><div class="modal-actions"><button class="btn btn-primary" id="take-shot">촬영</button><button class="btn" id="close-shot">닫기</button></div></div>`;
  document.body.appendChild(back);const video=$("#scan-video",back);let stream=null;
  const close=()=>{if(stream)stream.getTracks().forEach(t=>t.stop());back.remove()};
  $("#close-shot",back).onclick=close;
  (async()=>{try{if(!navigator.mediaDevices?.getUserMedia)throw new Error("no camera");stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});video.srcObject=stream;await video.play()}catch(e){$("#scan-note",back).innerHTML="카메라를 열 수 없습니다.<br>HTTPS 주소와 브라우저의 카메라 권한을 확인하세요."}})();
  $("#take-shot",back).onclick=async()=>{
    try{
      if("BarcodeDetector" in window){
        const detector=new BarcodeDetector({formats:["code_128","code_39","code_93","ean_13","ean_8","upc_a","upc_e","itf_14","codabar"]});
        const r=await detector.detect(video);if(r?.length){target.value=r[0].rawValue;target.dispatchEvent(new Event("input",{bubbles:true}));close();return}
      }
    }catch(e){}
    const manual=prompt("바코드를 자동 인식하지 못했습니다.\\n바코드번호를 직접 입력하세요.");
    if(manual!==null){target.value=manual.trim();close()}
  };
}
async function remoteUpsertInventory(inv){
  if(!state.sb)return;
  const q=await state.sb.from("inventory").select("id").eq("model",inv.model).eq("serial",inv.serial).maybeSingle();
  if(q.error)throw q.error;
  if(q.data)return state.sb.from("inventory").update({qty:inv.qty,status:inv.status}).eq("id",q.data.id);
  return state.sb.from("inventory").insert({model:inv.model,serial:inv.serial,qty:inv.qty,status:inv.status});
}
async function remoteInsertHistory(x){
  if(!state.sb)return;
  return state.sb.from("history").insert([{kind:x.kind,model:x.model,serial:x.serial,qty:x.qty,store:x.store,note:x.note,reason:x.reason,at:x.at,actor:x.actor}]);
}
async function loadRemote(){
  if(!state.sb)return;
  const i=await state.sb.from("inventory").select("*").order("model",{ascending:true});
  const h=await state.sb.from("history").select("*").order("at",{ascending:true});
  if(!i.error)state.inventory=i.data||[];if(!h.error){state.history=h.data||[];state.disposals=state.history.filter(x=>x.kind==="폐기")}
}
function subscribeRealtime(){
  if(!state.sb)return;
  if(state.realtime)state.sb.removeChannel(state.realtime);
  state.realtime=state.sb.channel("uip-shared")
  .on("postgres_changes",{event:"*",schema:"public",table:"inventory"},async()=>{await loadRemote();render()})
  .on("postgres_changes",{event:"*",schema:"public",table:"history"},async()=>{await loadRemote();render()})
  .subscribe();
}
async function login(){
  const id=$("#login-id").value.trim(),pw=$("#login-pw").value;
  if(!id||!pw)return alert("아이디와 비밀번호를 입력하세요.");
  if(state.local){
    const d=DEMO_USERS[id];
    if(!d||d.password!==pw)return alert("로그인 실패\\n관리자: admin / admin1234\\n사용자: staff / staff1234");
    state.user={username:id,name:d.name,role:d.role};loadLocal();state.view="dashboard";shell();return;
  }
  try{
    const email=id.includes("@")?id:`${id}@usedinventory.local`;
    const r=await state.sb.auth.signInWithPassword({email,password:pw});
    if(r.error)throw r.error;
    state.user={username:id,name:id,role:"user"};await loadRemote();subscribeRealtime();state.view="dashboard";shell();
  }catch(e){alert("로그인 실패: "+(e.message||"알 수 없는 오류"))}
}
async function logout(){
  if(state.realtime&&state.sb)await state.sb.removeChannel(state.realtime);
  if(state.sb)await state.sb.auth.signOut();
  state.user=null;state.view="dashboard";renderLogin();
}

async function init(){
  loadLocal();
  if(CONFIG.SUPABASE_URL&&CONFIG.SUPABASE_PUBLISHABLE_KEY&&window.supabase){
    state.sb=window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_PUBLISHABLE_KEY);
    state.local=false;
  }
  renderLogin();
}
init();
</script>
</body>
</html>
