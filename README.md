<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#071d37">
<title>중고 재고관리 Pro</title>
<style>
:root{--navy:#071d37;--blue:#2f73e8;--bg:#f4f7fb;--card:#fff;--text:#15243a;--muted:#748197;--line:#e1e7ef;--danger:#d94d57}
*{box-sizing:border-box}
html,body{margin:0;padding:0;min-height:100%;background:var(--bg);color:var(--text);font-family:Arial,"Noto Sans KR","Malgun Gothic",sans-serif}
body{font-size:16px}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
h1,h2,h3,h4,p{margin:0}
.hidden{display:none!important}
#root{min-height:100vh}

/* Login */
.login-page{min-height:100vh;background:linear-gradient(180deg,#071d37 0%,#163a62 100%);display:flex;align-items:center;justify-content:center;padding:18px}
.login-card{width:min(430px,96vw);background:#fff;border-radius:26px;padding:25px;box-shadow:0 25px 80px rgba(0,0,0,.28)}
.logo-big{width:68px;height:68px;border-radius:20px;background:linear-gradient(135deg,#2f73e8,#7d8df7);color:#fff;display:grid;place-items:center;font-weight:900;font-size:24px;margin-bottom:14px}
.login-title{font-size:30px;font-weight:900;color:#0b1f38;line-height:1.2}
.login-sub{margin-top:5px;color:#7a8699}
.field{display:grid;gap:7px;margin:13px 0}
.field label{font-size:14px;font-weight:800}
.field input,.field select,.field textarea{width:100%;min-height:50px;border:1px solid #d4dce8;border-radius:13px;background:#fff;padding:11px 13px;outline:0}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(47,115,232,.12)}
.btn{min-height:46px;border:0;border-radius:12px;padding:10px 15px;background:#edf1f7;color:#25344d;font-weight:800}
.btn.primary{background:var(--blue);color:#fff}
.btn.danger{background:var(--danger);color:#fff}
.btn.outline{background:#fff;border:1px solid #cad4e1}
.full{width:100%}
.notice{margin-top:12px;background:#f1f5fb;border-radius:12px;padding:11px 12px;color:#50607a;font-size:12px;line-height:1.5}

/* App */
.app-head{height:68px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 17px;position:sticky;top:0;z-index:30}
.app-brand{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:900}
.logo{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#2f73e8,#7d8df7);display:grid;place-items:center;color:#fff;font-weight:900}
.admin{color:var(--blue);font-weight:800}
.content{max-width:1280px;margin:0 auto;padding:17px 16px 100px}
.page-title{font-size:26px;font-weight:900;margin-bottom:5px}
.page-sub{font-size:13px;color:var(--muted);margin-bottom:13px}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.card{background:#fff;border:1px solid #edf1f6;border-radius:18px;padding:16px;box-shadow:0 10px 28px rgba(20,34,58,.06)}
.metric-label{font-size:14px;color:#67738a}
.metric-value{font-size:30px;font-weight:900;margin-top:6px}
.panel{margin-top:14px}
.toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.table-wrap{overflow:auto;border:1px solid #edf0f5;border-radius:16px;background:#fff}
table{width:100%;min-width:760px;border-collapse:collapse}
th,td{padding:10px;border-bottom:1px solid #edf0f5;text-align:left;white-space:nowrap}
th{font-size:13px;background:#fafbfd;color:#657188}
td{font-size:14px}
.badge{display:inline-block;padding:4px 9px;border-radius:999px;background:#eef4ff;color:var(--blue);font-size:12px;font-weight:800}
.barcode-row{display:grid;grid-template-columns:1fr auto;gap:8px}
.barcode-btn{min-width:96px}
.form-actions{display:grid;gap:9px;margin-top:10px}
.bottom-nav{position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--navy);display:grid;grid-template-columns:repeat(8,1fr);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
.nav-btn{border:0;background:transparent;color:#d7dfec;min-width:0;padding:6px 2px;display:flex;flex-direction:column;align-items:center;gap:3px}
.nav-btn.active{color:#5ea0ff}
.nav-i{font-size:20px;line-height:20px}
.nav-t{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.empty{padding:34px;text-align:center;color:#8b95a7}
.stats-3{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.small-stat{background:#f7f9fc;border-radius:12px;padding:12px}
.small-stat b{display:block;font-size:22px;margin-top:3px}

/* Modal / Barcode */
.overlay{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.63);display:flex;align-items:center;justify-content:center;padding:12px}
.modal{width:min(560px,96vw);max-height:92vh;overflow:auto;background:#fff;border-radius:20px;padding:16px;box-shadow:0 24px 90px rgba(0,0,0,.32)}
.camera{background:#101521;position:relative;aspect-ratio:4/3;border-radius:15px;overflow:hidden}
.camera video{display:block;width:100%;height:100%;object-fit:cover}
.frame{position:absolute;left:9%;right:9%;top:23%;bottom:23%;border:2px solid #fff;border-radius:10px;box-shadow:0 0 0 9999px rgba(0,0,0,.12)}
.modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:11px}
.small-note{font-size:12px;color:#68768b;line-height:1.5;margin-top:8px}

@media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){
  .app-head{height:62px;padding:0 11px}.app-brand{font-size:15px}.logo{width:34px;height:34px}
  .content{padding:12px 10px 94px}.page-title{font-size:22px}
  .card{padding:13px;border-radius:15px}.metric-value{font-size:25px}
  .nav-i{font-size:18px}.nav-t{font-size:9px}
  .barcode-btn{min-width:84px;padding-left:10px;padding-right:10px}
}
@media(max-width:390px){
  .bottom-nav{grid-template-columns:repeat(4,1fr);grid-auto-rows:50px}
}
</style>
</head>
<body>
<div id="root"></div>

<script>
"use strict";

/*
  공용 서버 사용:
  아래 두 값에 본인 Supabase의 URL과 Publishable Key를 입력하면 됩니다.
  Secret / Service Role Key는 입력하면 안 됩니다.
*/
const APP_CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_PUBLISHABLE_KEY: ""
};

const DEMO_USERS = {
  admin: { password:"admin1234", name:"관리자", role:"admin" },
  staff: { password:"staff1234", name:"직원", role:"user" }
};

const NAV = [
  ["dashboard","⌂","대시보드"],
  ["inventory","▣","중고재고"],
  ["inbound","↓","입고"],
  ["outbound","↑","출고"],
  ["reentry","↻","재입고"],
  ["history","▤","입·출고"],
  ["analytics","▥","분석"],
  ["settings","⚙","관리자"]
];

const $ = (s,root=document) => root.querySelector(s);
const esc = v => String(v ?? "").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const now = () => new Date().toISOString();
const uid = () => (crypto && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()+Math.random());

const APP = {
  user:null, view:"dashboard", shared:false, sb:null, realtime:null,
  inventory:[], history:[], disposals:[]
};

function saveLocal(){
  localStorage.setItem("uip-web-final-data",JSON.stringify({
    inventory:APP.inventory,history:APP.history,disposals:APP.disposals
  }));
}
function loadLocal(){
  try{
    const d=JSON.parse(localStorage.getItem("uip-web-final-data")||"{}");
    APP.inventory=Array.isArray(d.inventory)?d.inventory:[];
    APP.history=Array.isArray(d.history)?d.history:[];
    APP.disposals=Array.isArray(d.disposals)?d.disposals:[];
  }catch(e){APP.inventory=[];APP.history=[];APP.disposals=[]}
}

function renderLogin(){
  document.body.innerHTML = `
    <div class="login-page">
      <div class="login-card">
        <div class="logo-big">IP</div>
        <div class="login-title">중고 재고관리 Pro</div>
        <div class="login-sub">휴대폰 · PC 공동사용 재고관리</div>
        <div class="field"><label>아이디</label><input id="login-id" autocomplete="username" placeholder="아이디"></div>
        <div class="field"><label>비밀번호</label><input id="login-pw" type="password" autocomplete="current-password" placeholder="비밀번호"></div>
        <button class="btn primary full" id="login-btn">로그인</button>
        <div class="notice">공용 서버가 아직 연결되지 않은 경우 데모 모드입니다.<br>관리자: <b>admin / admin1234</b><br>사용자: <b>staff / staff1234</b></div>
        <div class="small-note">바코드 촬영은 HTTPS 웹주소와 카메라 권한이 필요합니다.</div>
      </div>
    </div>`;
  $("#login-btn").onclick=login;
}

function renderShell(){
  document.body.innerHTML = `
    <div class="app-shell">
      <header class="app-head">
        <div class="app-brand"><div class="logo">IP</div><div>중고 재고관리 Pro</div></div>
        <div class="admin">● ${esc(APP.user?.name||"사용자")}</div>
      </header>
      <main class="content"><div id="content"></div></main>
      <nav class="bottom-nav">${NAV.map(n=>`
        <button class="nav-btn ${APP.view===n[0]?"active":""}" data-nav="${n[0]}">
          <span class="nav-i">${n[1]}</span><span class="nav-t">${n[2]}</span>
        </button>`).join("")}</nav>
    </div>`;
  document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{APP.view=b.dataset.nav;render()});
  render();
}

function render(){
  const pages={dashboard,inventory,inbound,outbound,reentry,history,analytics,settings,disposal};
  $("#content").innerHTML=(pages[APP.view]||dashboard)();
  bind();
}

function dashboard(){
  const total=APP.inventory.reduce((a,x)=>a+Number(x.qty||0),0);
  const inbound=APP.history.filter(x=>x.kind==="입고").reduce((a,x)=>a+Number(x.qty||0),0);
  const outbound=APP.history.filter(x=>x.kind==="출고").reduce((a,x)=>a+Number(x.qty||0),0);
  const reentry=APP.history.filter(x=>x.kind==="재입고").reduce((a,x)=>a+Number(x.qty||0),0);
  return `<div class="page-title">대시보드</div><div class="page-sub">공유형 중고재고관리</div>
    <div class="cards">
      <div class="stat-card card"><div class="metric-label">전체 재고</div><div class="metric-value">${total} 개</div><div class="muted">현재 보유 수량</div></div>
      <div class="stat-card card"><div class="metric-label">총 입고</div><div class="metric-value">${inbound} 개</div><div class="muted">누적 입고</div></div>
      <div class="stat-card card"><div class="metric-label">총 출고</div><div class="metric-value">${outbound} 개</div><div class="muted">누적 출고</div></div>
      <div class="stat-card card"><div class="metric-label">재입고</div><div class="metric-value">${reentry} 개</div><div class="muted">누적 재입고</div></div>
    </div>
    <div class="panel card"><h3>최근 입·출고 현황</h3>${historyTable(APP.history.slice().reverse().slice(0,8))}</div>`;
}

function inventory(){
  return `<div class="page-title">중고재고</div>
    <div class="toolbar"><button class="btn primary" id="go-inbound">입고 등록</button><button class="btn" id="go-disposal">폐기 제품 보기</button></div>
    <div class="table-wrap"><table><thead><tr><th>모델명</th><th>바코드번호</th><th>수량</th><th>상태</th><th>수정</th></tr></thead><tbody>
    ${APP.inventory.length?APP.inventory.map((x,i)=>`<tr><td>${esc(x.model)}</td><td>${esc(x.serial)}</td><td>${x.qty}</td><td><span class="badge">${esc(x.status||"정상")}</span></td><td><button class="btn edit" data-i="${i}">수정</button></td></tr>`).join(""):"<tr><td colspan='5' class='empty'>등록된 재고가 없습니다.</td></tr>"}
    </tbody></table></div>`;
}

function txForm(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  return `<div class="page-title">${kind}</div>
    <div class="card">
      <div class="field"><label>모델명</label><input id="${p}-model" placeholder="모델명"></div>
      <div class="field"><label>바코드번호</label><div class="barcode-row">
        <input id="${p}-serial" placeholder="바코드번호 입력 또는 촬영" autocomplete="off">
        <button class="btn barcode-btn" id="scan-${p}" type="button">📷 촬영</button>
      </div></div>
      <div class="field"><label>수량</label><input id="${p}-qty" type="number" min="1" value="1"></div>
      ${kind!=="입고"?`<div class="field"><label>가맹점</label><input id="${p}-store" placeholder="가맹점명"></div>`:""}
      ${kind==="입고"?`
        <div class="field"><label>입고내용</label><select id="in-type"><option>A/S 입고</option><option>수리입고</option><option>폐기</option></select></div>
        <div class="field hidden" id="reason-box"><label>폐기 사유</label><textarea id="in-reason" rows="3" placeholder="폐기 이유"></textarea></div>
        <div class="form-actions"><button class="btn outline" id="view-disposal">폐기 제품 보기</button><button class="btn primary" id="save-in">입고 저장</button></div>
      `:`<div class="form-actions"><button class="btn primary" id="save-${p}">${kind} 저장</button></div>`}
    </div>`;
}
function inbound(){return txForm("입고")}
function outbound(){return txForm("출고")}
function reentry(){return txForm("재입고")}

function historyTable(rows){
  if(!rows.length)return `<div class="empty">내역이 없습니다.</div>`;
  return `<div class="table-wrap"><table><thead><tr><th>일시</th><th>구분</th><th>모델명</th><th>바코드</th><th>수량</th><th>가맹점</th><th>내용</th></tr></thead><tbody>
    ${rows.map(x=>`<tr><td>${esc(new Date(x.at).toLocaleString("ko-KR"))}</td><td>${esc(x.kind)}</td><td>${esc(x.model)}</td><td>${esc(x.serial)}</td><td>${Number(x.qty||0)}</td><td>${esc(x.store)}</td><td>${esc(x.note||x.reason||"")}</td></tr>`).join("")}
  </tbody></table></div>`;
}
function history(){return `<div class="page-title">입·출고 내역</div><div class="toolbar"><button class="btn primary" id="export">전체 자료 내보내기</button></div><div class="panel card">${historyTable(APP.history.slice().reverse())}</div>`}
function disposal(){return `<div class="page-title">폐기 제품</div><div class="page-sub">폐기 사유까지 확인할 수 있습니다.</div><div class="panel card">${historyTable(APP.disposals.slice().reverse())}</div>`}

function analytics(){
  const y=new Date().getFullYear(), months=Array.from({length:12},(_,i)=>i+1);
  const sum=(m,k)=>APP.history.filter(x=>{const d=new Date(x.at);return d.getFullYear()===y&&d.getMonth()+1===m&&x.kind===k}).reduce((a,x)=>a+Number(x.qty||0),0);
  const max=Math.max(1,...months.flatMap(m=>[sum(m,"입고"),sum(m,"출고"),sum(m,"재입고")]));
  return `<div class="page-title">월간 / 연간 분석</div>
    <div class="panel card"><h3>${y}년 월간 그래프</h3>
      <div style="height:245px;display:flex;align-items:flex-end;gap:5px;padding:17px 4px 34px;border-bottom:1px solid #dfe5ed;margin-top:12px">
        ${months.map(m=>`<div style="flex:1;height:100%;display:flex;align-items:flex-end;gap:2px;position:relative">
          <div style="height:${Math.max(3,sum(m,"입고")/max*180)}px;flex:1;background:#2f73e8;border-radius:5px 5px 0 0" title="입고 ${sum(m,"입고")}"></div>
          <div style="height:${Math.max(3,sum(m,"출고")/max*180)}px;flex:1;background:#6c788c;border-radius:5px 5px 0 0" title="출고 ${sum(m,"출고")}"></div>
          <div style="height:${Math.max(3,sum(m,"재입고")/max*180)}px;flex:1;background:#7c89ef;border-radius:5px 5px 0 0" title="재입고 ${sum(m,"재입고")}"></div>
          <span style="position:absolute;left:50%;bottom:-23px;transform:translateX(-50%);font-size:10px">${m}월</span>
        </div>`).join("")}
      </div>
    </div>
    <div class="panel card"><h3>연간 내역</h3>${annual()}</div>`;
}
function annual(){
  const ys=[...new Set(APP.history.map(x=>new Date(x.at).getFullYear()))].sort((a,b)=>b-a);
  if(!ys.length)return `<div class="empty">아직 데이터가 없습니다.</div>`;
  const sum=(y,k)=>APP.history.filter(x=>new Date(x.at).getFullYear()===y&&x.kind===k).reduce((a,x)=>a+Number(x.qty||0),0);
  return `<div class="table-wrap"><table><thead><tr><th>연도</th><th>입고</th><th>출고</th><th>재입고</th><th>폐기</th></tr></thead><tbody>${ys.map(y=>`<tr><td>${y}</td><td>${sum(y,"입고")}</td><td>${sum(y,"출고")}</td><td>${sum(y,"재입고")}</td><td>${sum(y,"폐기")}</td></tr>`).join("")}</tbody></table></div>`;
}
function settings(){
  return `<div class="page-title">관리자 설정</div>
    <div class="panel card"><h3>공용 서버 연결 상태</h3><div class="notice">${APP.shared?"Supabase 공유 모드":"현재 기기 로컬 데모 모드"}</div></div>
    <div class="panel card"><h3>전체 초기화</h3><button class="btn danger" id="reset">전체 초기화</button></div>
    <div class="panel card"><button class="btn" id="logout">로그아웃</button></div>`;
}

function bind(){
  [["#scan-in","#in-serial"],["#scan-out","#out-serial"],["#scan-re","#re-serial"]].forEach(([b,t])=>{
    if($(b))$(b).onclick=()=>openScanner(t);
    if($(t))$(t).onclick=()=>openScanner(t);
  });
  if($("#in-type"))$("#in-type").onchange=e=>$("#reason-box").classList.toggle("hidden",e.target.value!=="폐기");
  if($("#save-in"))$("#save-in").onclick=()=>saveTx("입고");
  if($("#save-out"))$("#save-out").onclick=()=>saveTx("출고");
  if($("#save-re"))$("#save-re").onclick=()=>saveTx("재입고");
  if($("#view-disposal"))$("#view-disposal").onclick=()=>{APP.view="disposal";render()};
  if($("#go-inbound"))$("#go-inbound").onclick=()=>{APP.view="inbound";render()};
  if($("#go-disposal"))$("#go-disposal").onclick=()=>{APP.view="disposal";render()};
  if($("#export"))$("#export").onclick=exportAll;
  if($("#reset"))$("#reset").onclick=resetAll;
  if($("#logout"))$("#logout").onclick=logout;
  document.querySelectorAll(".edit").forEach(b=>b.onclick=()=>editStock(Number(b.dataset.i)));
}

function saveTx(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  const model=$("#"+p+"-model").value.trim(),serial=$("#"+p+"-serial").value.trim(),qty=Number($("#"+p+"-qty").value||0);
  if(!model||!serial||qty<=0)return alert("모델명, 바코드번호, 수량을 입력하세요.");
  const store=kind==="입고"?"":$("#"+p+"-store").value.trim();
  let note="",reason="";
  if(kind==="입고"){note=$("#in-type").value;if(note==="폐기"){reason=$("#in-reason").value.trim();if(!reason)return alert("폐기 사유를 입력하세요.");}}
  let inv=APP.inventory.find(x=>x.model===model&&x.serial===serial);
  if(kind==="출고"){if(!inv||Number(inv.qty)<qty)return alert("재고가 부족합니다.");inv.qty-=qty}
  else if(kind==="재입고"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};APP.inventory.push(inv)}}
  else if(note!=="폐기"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};APP.inventory.push(inv)}}
  const x={id:uid(),kind:note==="폐기"?"폐기":kind,model,serial,qty,store,note,reason,at:now(),actor:APP.user?.username||"local"};
  APP.history.push(x);if(x.kind==="폐기")APP.disposals.push(x);saveLocal();alert(kind+" 저장 완료");render();
}
function editStock(i){
  const x=APP.inventory[i];if(!x)return;
  const q=prompt("수정할 재고 수량",String(x.qty));if(q===null)return;
  const n=Number(q);if(!Number.isFinite(n)||n<0)return alert("올바른 수량을 입력하세요.");
  x.qty=n;saveLocal();render();
}
function resetAll(){
  const p=prompt("관리자 비밀번호를 다시 입력하세요.");
  if(p!=="admin1234")return alert("관리자 비밀번호가 맞지 않습니다.");
  if(!confirm("전체 재고와 내역을 초기화하시겠습니까?"))return;
  APP.inventory=[];APP.history=[];APP.disposals=[];saveLocal();render();alert("초기화되었습니다.");
}
function exportAll(){
  const rows=[
    ["중고재고"],["모델명","바코드번호","수량","상태"],
    ...APP.inventory.map(x=>[x.model,x.serial,x.qty,x.status||"정상"]),[],
    ["전체 내역"],["구분","일시","모델명","바코드","수량","가맹점","입고내용","폐기사유"],
    ...APP.history.map(x=>[x.kind,x.at,x.model,x.serial,x.qty,x.store,x.note,x.reason])
  ];
  const cell=v=>`"${String(v??"").replaceAll('"','""')}"`;
  const blob=new Blob(["\uFEFF"+rows.map(r=>r.map(cell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a"),u=URL.createObjectURL(blob);a.href=u;a.download="중고재고관리_전체분석.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
}
function openScanner(target){
  const el=$(target);if(!el)return;
  const back=document.createElement("div");back.className="overlay";
  back.innerHTML=`<div class="modal"><h3>바코드 촬영</h3><div class="camera"><video id="cam" autoplay muted playsinline></video><div class="frame"></div></div><div class="small-note" id="camera-note">카메라 권한을 허용하고 바코드를 중앙에 맞춘 뒤 촬영하세요.</div><div class="modal-actions"><button class="btn primary" id="shot">촬영</button><button class="btn" id="close">닫기</button></div></div>`;
  document.body.appendChild(back);let stream=null;
  const close=()=>{if(stream)stream.getTracks().forEach(t=>t.stop());back.remove()};
  $("#close",back).onclick=close;
  (async()=>{
    try{
      if(!navigator.mediaDevices?.getUserMedia)throw new Error("camera");
      stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});
      $("#cam",back).srcObject=stream;await $("#cam",back).play();
    }catch(e){$("#camera-note",back).textContent="카메라를 열 수 없습니다. HTTPS 주소와 카메라 권한을 확인하세요."}
  })();
  $("#shot",back).onclick=async()=>{
    try{
      if("BarcodeDetector" in window){
        const d=new BarcodeDetector({formats:["code_128","code_39","code_93","ean_13","ean_8","upc_a","upc_e","itf_14","codabar"]});
        const rs=await d.detect($("#cam",back));
        if(rs?.length){el.value=rs[0].rawValue;close();return;}
      }
    }catch(e){}
    const manual=prompt("자동으로 인식하지 못했습니다. 바코드번호를 직접 입력하세요.");
    if(manual!==null){el.value=manual.trim();close();}
  };
}
async function login(){
  const id=$("#login-id").value.trim(),pw=$("#login-pw").value;
  if(!id||!pw)return alert("아이디와 비밀번호를 입력하세요.");
  if(!APP_CONFIG.SUPABASE_URL||!APP_CONFIG.SUPABASE_PUBLISHABLE_KEY){
    const d=DEMO_USERS[id];if(!d||d.password!==pw)return alert("로그인 실패\n관리자: admin / admin1234\n사용자: staff / staff1234");
    APP.user={username:id,name:d.name,role:d.role};APP.shared=false;loadLocal();APP.view="dashboard";renderShell();return;
  }
  if(!window.supabase)return alert("Supabase 라이브러리를 불러오지 못했습니다.");
  try{
    const sb=window.supabase.createClient(APP_CONFIG.SUPABASE_URL,APP_CONFIG.SUPABASE_PUBLISHABLE_KEY);APP.sb=sb;
    const email=id.includes("@")?id:id+"@usedinventory.local";
    const r=await sb.auth.signInWithPassword({email,password:pw});if(r.error)throw r.error;
    APP.user={username:id,name:id,role:"user"};APP.shared=true;
    await loadRemote();subscribe();APP.view="dashboard";renderShell();
  }catch(e){alert("로그인 실패: "+(e.message||"알 수 없는 오류"))}
}
async function loadRemote(){
  if(!APP.sb)return;
  const i=await APP.sb.from("inventory").select("*").order("model",{ascending:true});
  const h=await APP.sb.from("history").select("*").order("at",{ascending:true});
  if(!i.error)APP.inventory=i.data||[];
  if(!h.error){APP.history=h.data||[];APP.disposals=APP.history.filter(x=>x.kind==="폐기")}
}
function subscribe(){
  if(!APP.sb)return;
  if(APP.realtime)APP.sb.removeChannel(APP.realtime);
  APP.realtime=APP.sb.channel("uip-shared-data")
    .on("postgres_changes",{event:"*",schema:"public",table:"inventory"},async()=>{await loadRemote();render()})
    .on("postgres_changes",{event:"*",schema:"public",table:"history"},async()=>{await loadRemote();render()})
    .subscribe();
}
async function logout(){
  if(APP.realtime&&APP.sb)await APP.sb.removeChannel(APP.realtime);
  if(APP.sb)await APP.sb.auth.signOut();
  APP.user=null;APP.view="dashboard";renderLogin();
}
loadLocal();renderLogin();
</script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</body>
</html>
