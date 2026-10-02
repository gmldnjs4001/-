<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#071d37">
<title>중고 재고관리 Pro</title>
</head>
<body style="margin:0;background:#f4f7fb;color:#15243a;font-family:Arial,'Noto Sans KR','Malgun Gothic',sans-serif;">
<div id="root"></div>

<script>
"use strict";

/* ===== 공용 서버 연결 설정 =====
   Supabase를 연결할 때 아래 두 값을 입력합니다.
   Secret/Service Role Key는 절대 넣지 마세요.
*/
const CONFIG = {
  SUPABASE_URL: "",
  SUPABASE_PUBLISHABLE_KEY: ""
};

const DEMO = {
  admin:{password:"admin1234",name:"관리자",role:"admin"},
  staff:{password:"staff1234",name:"직원",role:"user"}
};

const A = {
  user:null,view:"dashboard",shared:false,sb:null,realtime:null,
  inventory:[],history:[],disposals:[]
};

const NAV = [
  ["dashboard","⌂","대시보드"],["inventory","▣","중고재고"],["inbound","↓","입고"],
  ["outbound","↑","출고"],["reentry","↻","재입고"],["history","▤","입·출고"],
  ["analytics","▥","분석"],["settings","⚙","관리자"]
];

const esc = v => String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const $ = (s,r=document)=>r.querySelector(s);
const now = ()=>new Date().toISOString();
const uid = ()=>crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()+Math.random());

function loadLocal(){
  try{
    const d=JSON.parse(localStorage.getItem("uip-web-data-final")||"{}");
    A.inventory=Array.isArray(d.inventory)?d.inventory:[];
    A.history=Array.isArray(d.history)?d.history:[];
    A.disposals=Array.isArray(d.disposals)?d.disposals:[];
  }catch(e){A.inventory=[];A.history=[];A.disposals=[];}
}
function saveLocal(){
  localStorage.setItem("uip-web-data-final",JSON.stringify({
    inventory:A.inventory,history:A.history,disposals:A.disposals
  }));
}

function loginScreen(){
  document.body.innerHTML = `
  <div style="min-height:100vh;background:linear-gradient(180deg,#071d37 0%,#183f69 100%);display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box">
    <div style="width:min(430px,94vw);background:#fff;border-radius:26px;padding:25px;box-sizing:border-box;box-shadow:0 25px 80px rgba(0,0,0,.28)">
      <div style="width:68px;height:68px;border-radius:20px;background:linear-gradient(135deg,#2f73e8,#7d8df7);color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;margin-bottom:14px;box-shadow:0 7px 20px rgba(47,115,232,.25)">IP</div>
      <div style="font-size:30px;line-height:1.2;font-weight:900;color:#0a1d35">중고 재고관리 Pro</div>
      <div style="margin-top:5px;color:#7b8799;font-size:14px">휴대폰 · PC 공동사용 재고관리</div>
      <div style="margin-top:14px">
        <label style="display:block;font-size:14px;font-weight:800;margin-bottom:7px">아이디</label>
        <input id="login-id" autocomplete="username" placeholder="아이디"
          style="width:100%;height:50px;padding:0 13px;border:1px solid #d4dce8;border-radius:13px;box-sizing:border-box;font-size:16px;background:#fff">
      </div>
      <div style="margin-top:13px">
        <label style="display:block;font-size:14px;font-weight:800;margin-bottom:7px">비밀번호</label>
        <input id="login-pw" type="password" autocomplete="current-password" placeholder="비밀번호"
          style="width:100%;height:50px;padding:0 13px;border:1px solid #d4dce8;border-radius:13px;box-sizing:border-box;font-size:16px;background:#fff">
      </div>
      <button id="login-btn" style="margin-top:14px;width:100%;height:48px;border:0;border-radius:12px;background:#2f73e8;color:#fff;font-size:16px;font-weight:800">로그인</button>
      <div style="margin-top:12px;background:#f1f5fb;color:#50617a;border-radius:12px;padding:11px 12px;font-size:12px;line-height:1.55">
        데모 관리자: <b>admin / admin1234</b><br>
        데모 사용자: <b>staff / staff1234</b>
      </div>
      <div style="margin-top:8px;color:#68768b;font-size:12px;line-height:1.45">바코드 촬영은 HTTPS 웹주소와 카메라 권한이 필요합니다.</div>
    </div>
  </div>`;
  $("#login-btn").onclick=login;
}

function appShell(){
  document.body.innerHTML=`
  <div style="min-height:100vh;background:#f4f7fb">
    <header style="height:64px;background:#fff;border-bottom:1px solid #e3e8ef;display:flex;align-items:center;justify-content:space-between;padding:0 13px;box-sizing:border-box;position:sticky;top:0;z-index:30">
      <div style="display:flex;align-items:center;gap:9px;font-size:17px;font-weight:900">
        <div style="width:36px;height:36px;border-radius:11px;background:linear-gradient(135deg,#2f73e8,#7d8df7);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900">IP</div>
        <div>중고 재고관리 Pro</div>
      </div>
      <div style="font-size:14px;font-weight:800;color:#2f73e8">● ${esc(A.user?.name||"사용자")}</div>
    </header>
    <main id="main" style="max-width:1280px;margin:0 auto;padding:14px 12px 96px;box-sizing:border-box"></main>
    <nav id="bottom" style="position:fixed;left:0;right:0;bottom:0;z-index:50;background:#071d37;padding:6px 4px calc(6px + env(safe-area-inset-bottom));display:grid;grid-template-columns:repeat(8,minmax(0,1fr));box-sizing:border-box">
      ${NAV.map(n=>`<button class="nav-item" data-nav="${n[0]}" style="border:0;background:transparent;color:${A.view===n[0]?"#5ea0ff":"#d7dfeb"};min-width:0;padding:5px 2px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px"><span style="font-size:18px;line-height:18px">${n[1]}</span><span style="font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%">${n[2]}</span></button>`).join("")}
    </nav>
  </div>`;
  document.querySelectorAll(".nav-item").forEach(b=>b.onclick=()=>{A.view=b.dataset.nav;render();});
  render();
}

function statCard(label,value,sub){
  return `<div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:14px;box-shadow:0 8px 25px rgba(20,34,58,.06)"><div style="font-size:13px;color:#68748b">${label}</div><div style="font-size:28px;font-weight:900;margin-top:5px">${value}</div><div style="font-size:12px;color:#8791a1;margin-top:3px">${sub}</div></div>`;
}

function dashboard(){
  const total=A.inventory.reduce((a,x)=>a+Number(x.qty||0),0);
  const inn=A.history.filter(x=>x.kind==="입고").reduce((a,x)=>a+Number(x.qty||0),0);
  const out=A.history.filter(x=>x.kind==="출고").reduce((a,x)=>a+Number(x.qty||0),0);
  const re=A.history.filter(x=>x.kind==="재입고").reduce((a,x)=>a+Number(x.qty||0),0);
  return `<div style="font-size:25px;font-weight:900;margin-bottom:5px">대시보드</div>
  <div style="font-size:13px;color:#748197;margin-bottom:13px">공유형 중고재고관리</div>
  <div id="stats" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px">${statCard("전체 재고",total+" 개","현재 보유 수량")}${statCard("입고",inn+" 개","누적 입고")}${statCard("출고",out+" 개","누적 출고")}${statCard("재입고",re+" 개","누적 재입고")}</div>
  <div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:14px;margin-top:13px;box-shadow:0 8px 25px rgba(20,34,58,.06)"><div style="font-size:17px;font-weight:800;margin-bottom:9px">최근 입·출고 현황</div>${historyTable(A.history.slice().reverse().slice(0,8))}</div>`;
}

function inventory(){
  return `<div style="font-size:25px;font-weight:900;margin-bottom:12px">중고재고</div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><button class="btn-in" style="height:44px;border:0;border-radius:12px;background:#2f73e8;color:#fff;padding:0 15px;font-weight:800">입고 등록</button><button class="btn-disposal" style="height:44px;border:0;border-radius:12px;background:#edf1f7;color:#2b3750;padding:0 15px;font-weight:800">폐기 제품 보기</button></div>
  <div class="table-wrap">${inventoryTable()}</div>`;
}
function inventoryTable(){
  if(!A.inventory.length)return `<div style="background:#fff;border:1px solid #edf1f6;border-radius:16px;padding:35px;text-align:center;color:#8b95a7">등록된 재고가 없습니다.</div>`;
  return `<div style="overflow:auto"><table style="width:100%;min-width:700px;border-collapse:collapse;background:#fff"><thead><tr><th style="padding:10px;background:#fafbfd;text-align:left">모델명</th><th style="padding:10px;background:#fafbfd;text-align:left">바코드번호</th><th style="padding:10px;background:#fafbfd;text-align:left">수량</th><th style="padding:10px;background:#fafbfd;text-align:left">상태</th><th style="padding:10px;background:#fafbfd;text-align:left">수정</th></tr></thead><tbody>${A.inventory.map((x,i)=>`<tr><td style="padding:10px;border-top:1px solid #edf0f5">${esc(x.model)}</td><td style="padding:10px;border-top:1px solid #edf0f5">${esc(x.serial)}</td><td style="padding:10px;border-top:1px solid #edf0f5">${x.qty}</td><td style="padding:10px;border-top:1px solid #edf0f5"><span style="display:inline-block;padding:4px 8px;border-radius:999px;background:#eef4ff;color:#2f73e8;font-size:12px">${esc(x.status||"정상")}</span></td><td style="padding:10px;border-top:1px solid #edf0f5"><button class="edit-stock" data-i="${i}" style="height:38px;border:0;border-radius:10px;background:#edf1f7;padding:0 12px">수정</button></td></tr>`).join("")}</tbody></table></div>`;
}

function txPage(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  return `<div style="font-size:25px;font-weight:900;margin-bottom:12px">${kind}</div>
  <div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:15px;box-shadow:0 8px 25px rgba(20,34,58,.06)">
    <label style="display:block;font-size:14px;font-weight:800;margin-bottom:7px">모델명</label>
    <input id="${p}-model" style="width:100%;height:50px;border:1px solid #d4dce8;border-radius:13px;padding:0 12px;box-sizing:border-box;font-size:16px">
    <label style="display:block;font-size:14px;font-weight:800;margin:13px 0 7px">바코드번호</label>
    <div style="display:grid;grid-template-columns:1fr auto;gap:8px">
      <input id="${p}-serial" placeholder="입력 또는 촬영" autocomplete="off" style="width:100%;height:50px;border:1px solid #d4dce8;border-radius:13px;padding:0 12px;box-sizing:border-box;font-size:16px">
      <button id="scan-${p}" style="height:50px;border:0;border-radius:13px;background:#edf1f7;padding:0 12px;font-weight:800">📷 촬영</button>
    </div>
    <label style="display:block;font-size:14px;font-weight:800;margin:13px 0 7px">수량</label>
    <input id="${p}-qty" type="number" min="1" value="1" style="width:100%;height:50px;border:1px solid #d4dce8;border-radius:13px;padding:0 12px;box-sizing:border-box;font-size:16px">
    ${kind!=="입고"?`<label style="display:block;font-size:14px;font-weight:800;margin:13px 0 7px">가맹점</label><input id="${p}-store" style="width:100%;height:50px;border:1px solid #d4dce8;border-radius:13px;padding:0 12px;box-sizing:border-box;font-size:16px">`:""}
    ${kind==="입고"?`<label style="display:block;font-size:14px;font-weight:800;margin:13px 0 7px">입고내용</label><select id="in-type" style="width:100%;height:50px;border:1px solid #d4dce8;border-radius:13px;padding:0 12px;box-sizing:border-box;font-size:16px"><option>A/S 입고</option><option>수리입고</option><option>폐기</option></select>
    <div id="reason-box" style="display:none;margin-top:13px"><label style="display:block;font-size:14px;font-weight:800;margin-bottom:7px">폐기 사유</label><textarea id="in-reason" rows="3" style="width:100%;border:1px solid #d4dce8;border-radius:13px;padding:11px 12px;box-sizing:border-box;font-size:16px"></textarea></div>`:""}
    <div style="display:grid;gap:9px;margin-top:14px">${kind==="입고"?'<button id="go-disposal" style="height:46px;border:0;border-radius:12px;background:#edf1f7;font-weight:800">폐기 제품 보기</button>':""}<button id="save-${p}" style="height:48px;border:0;border-radius:12px;background:#2f73e8;color:#fff;font-weight:800">${kind} 저장</button></div>
  </div>`;
}
function inbound(){return txPage("입고")} function outbound(){return txPage("출고")} function reentry(){return txPage("재입고")}

function historyTable(rows){
  if(!rows.length)return `<div style="padding:32px;text-align:center;color:#8b95a7">내역이 없습니다.</div>`;
  return `<div style="overflow:auto"><table style="width:100%;min-width:760px;border-collapse:collapse;background:#fff"><thead><tr><th style="padding:10px;background:#fafbfd;text-align:left">일시</th><th style="padding:10px;background:#fafbfd;text-align:left">구분</th><th style="padding:10px;background:#fafbfd;text-align:left">모델명</th><th style="padding:10px;background:#fafbfd;text-align:left">바코드</th><th style="padding:10px;background:#fafbfd;text-align:left">수량</th><th style="padding:10px;background:#fafbfd;text-align:left">가맹점</th><th style="padding:10px;background:#fafbfd;text-align:left">내용</th></tr></thead><tbody>${rows.map(x=>`<tr><td style="padding:10px;border-top:1px solid #edf0f5">${esc(new Date(x.at).toLocaleString("ko-KR"))}</td><td style="padding:10px;border-top:1px solid #edf0f5">${esc(x.kind)}</td><td style="padding:10px;border-top:1px solid #edf0f5">${esc(x.model)}</td><td style="padding:10px;border-top:1px solid #edf0f5">${esc(x.serial)}</td><td style="padding:10px;border-top:1px solid #edf0f5">${Number(x.qty||0)}</td><td style="padding:10px;border-top:1px solid #edf0f5">${esc(x.store)}</td><td style="padding:10px;border-top:1px solid #edf0f5">${esc(x.note||x.reason||"")}</td></tr>`).join("")}</tbody></table></div>`;
}
function history(){return `<div style="font-size:25px;font-weight:900;margin-bottom:12px">입·출고 내역</div><button id="export" style="height:44px;border:0;border-radius:12px;background:#2f73e8;color:#fff;padding:0 15px;font-weight:800;margin-bottom:12px">전체 자료 내보내기</button><div class="panel" style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:12px">${historyTable(A.history.slice().reverse())}</div>`}

function analytics(){
  const y=new Date().getFullYear();
  const months=Array.from({length:12},(_,i)=>i+1);
  const sum=(m,k)=>A.history.filter(x=>{const d=new Date(x.at);return d.getFullYear()===y&&d.getMonth()+1===m&&x.kind===k}).reduce((a,x)=>a+Number(x.qty||0),0);
  const max=Math.max(1,...months.flatMap(m=>[sum(m,"입고"),sum(m,"출고"),sum(m,"재입고")]));
  return `<div style="font-size:25px;font-weight:900;margin-bottom:12px">월간 / 연간 분석</div>
  <div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:14px;box-shadow:0 8px 25px rgba(20,34,58,.06)"><div style="font-size:17px;font-weight:800;margin-bottom:10px">${y}년 월간 그래프</div>
    <div style="height:245px;display:flex;align-items:flex-end;gap:4px;padding:16px 3px 33px;border-bottom:1px solid #dfe5ed">
    ${months.map(m=>`<div style="flex:1;height:100%;display:flex;gap:2px;align-items:flex-end;position:relative"><div title="입고 ${sum(m,"입고")}" style="height:${Math.max(3,sum(m,"입고")/max*180)}px;flex:1;background:#2f73e8;border-radius:4px 4px 0 0"></div><div title="출고 ${sum(m,"출고")}" style="height:${Math.max(3,sum(m,"출고")/max*180)}px;flex:1;background:#68758a;border-radius:4px 4px 0 0"></div><div title="재입고 ${sum(m,"재입고")}" style="height:${Math.max(3,sum(m,"재입고")/max*180)}px;flex:1;background:#7d89ee;border-radius:4px 4px 0 0"></div><span style="position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);font-size:9px">${m}월</span></div>`).join("")}
    </div>
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:12px"><span class="badge" style="display:inline-block;padding:4px 8px;border-radius:999px;background:#eef4ff;color:#2f73e8;font-size:12px">파랑: 입고</span><span style="display:inline-block;padding:4px 8px;border-radius:999px;background:#eef0f4;color:#5f6b7d;font-size:12px">회색: 출고</span><span style="display:inline-block;padding:4px 8px;border-radius:999px;background:#f0f0ff;color:#626fe7;font-size:12px">보라: 재입고</span></div>
  </div>
  <div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:14px;margin-top:13px">${annual()}</div>`;
}
function annual(){
  const ys=[...new Set(A.history.map(x=>new Date(x.at).getFullYear()))].sort((a,b)=>b-a);
  if(!ys.length)return `<div style="padding:30px;text-align:center;color:#8b95a7">아직 데이터가 없습니다.</div>`;
  const sum=(y,k)=>A.history.filter(x=>new Date(x.at).getFullYear()===y&&x.kind===k).reduce((a,x)=>a+Number(x.qty||0),0);
  return `<div style="font-size:17px;font-weight:800;margin-bottom:9px">연간 내역</div><div style="overflow:auto"><table style="width:100%;min-width:520px;border-collapse:collapse"><thead><tr><th style="padding:10px;background:#fafbfd;text-align:left">연도</th><th style="padding:10px;background:#fafbfd;text-align:left">입고</th><th style="padding:10px;background:#fafbfd;text-align:left">출고</th><th style="padding:10px;background:#fafbfd;text-align:left">재입고</th><th style="padding:10px;background:#fafbfd;text-align:left">폐기</th></tr></thead><tbody>${ys.map(y=>`<tr><td style="padding:10px;border-top:1px solid #edf0f5">${y}</td><td style="padding:10px;border-top:1px solid #edf0f5">${sum(y,"입고")}</td><td style="padding:10px;border-top:1px solid #edf0f5">${sum(y,"출고")}</td><td style="padding:10px;border-top:1px solid #edf0f5">${sum(y,"재입고")}</td><td style="padding:10px;border-top:1px solid #edf0f5">${sum(y,"폐기")}</td></tr>`).join("")}</tbody></table></div>`;
}
function settings(){
  return `<div style="font-size:25px;font-weight:900;margin-bottom:12px">관리자 설정</div><div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:14px"><div style="font-size:17px;font-weight:800">공용 서버 연결</div><div style="margin-top:9px;padding:10px 12px;border-radius:11px;background:#f1f5fb;color:#50617a;font-size:13px">${A.shared?"Supabase 공유 모드":"현재 기기 로컬 데모 모드"}</div></div><div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:14px;margin-top:13px"><div style="font-size:17px;font-weight:800">전체 초기화</div><button id="reset" style="margin-top:10px;height:45px;border:0;border-radius:12px;background:#d94d57;color:#fff;padding:0 15px;font-weight:800">전체 초기화</button></div><div style="background:#fff;border:1px solid #edf1f6;border-radius:17px;padding:14px;margin-top:13px"><button id="logout" style="height:45px;border:0;border-radius:12px;background:#edf1f7;padding:0 15px;font-weight:800">로그아웃</button></div>`;
}

function render(){
  const map={dashboard,inventory,inbound,outbound,reentry,history,analytics,settings,disposal};
  $("#main").innerHTML=(map[A.view]||dashboard)();
  bind();
}

function bind(){
  const scans=[["#scan-in","#in-serial"],["#scan-out","#out-serial"],["#scan-re","#re-serial"]];
  scans.forEach(([b,t])=>{if($(b))$(b).onclick=()=>openScanner(t);if($(t))$(t).onclick=()=>openScanner(t)});
  if($("#in-type"))$("#in-type").onchange=e=>$("#reason-box").style.display=e.target.value==="폐기"?"block":"none";
  if($("#save-in"))$("#save-in").onclick=()=>saveTx("입고");
  if($("#save-out"))$("#save-out").onclick=()=>saveTx("출고");
  if($("#save-re"))$("#save-re").onclick=()=>saveTx("재입고");
  if($("#go-disposal"))$("#go-disposal").onclick=()=>{A.view="disposal";render()};
  if($("#view-disposal"))$("#view-disposal").onclick=()=>{A.view="disposal";render()};
  if($("#go-inbound"))$("#go-inbound").onclick=()=>{A.view="inbound";render()};
  if($("#export"))$("#export").onclick=exportAll;
  if($("#reset"))$("#reset").onclick=resetAll;
  if($("#logout"))$("#logout").onclick=logout;
  document.querySelectorAll(".btn-in").forEach(b=>b.onclick=()=>{A.view="inbound";render()});
  document.querySelectorAll(".btn-disposal").forEach(b=>b.onclick=()=>{A.view="disposal";render()});
  document.querySelectorAll(".edit-stock").forEach(b=>b.onclick=()=>editStock(Number(b.dataset.i)));
}

function saveTx(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  const model=$("#"+p+"-model").value.trim(), serial=$("#"+p+"-serial").value.trim(), qty=Number($("#"+p+"-qty").value||0);
  if(!model||!serial||qty<=0)return alert("모델명, 바코드번호, 수량을 입력하세요.");
  const store=kind==="입고"?"":$("#"+p+"-store").value.trim();let note="",reason="";
  if(kind==="입고"){note=$("#in-type").value;if(note==="폐기"){reason=$("#in-reason").value.trim();if(!reason)return alert("폐기 사유를 입력하세요.");}}
  let inv=A.inventory.find(x=>x.model===model&&x.serial===serial);
  if(kind==="출고"){if(!inv||Number(inv.qty)<qty)return alert("재고가 부족합니다.");inv.qty-=qty}
  else if(kind==="재입고"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};A.inventory.push(inv)}}
  else if(note!=="폐기"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};A.inventory.push(inv)}}
  const x={id:uid(),kind:note==="폐기"?"폐기":kind,model,serial,qty,store,note,reason,at:now(),actor:A.user?.username||"local"};
  A.history.push(x);if(x.kind==="폐기")A.disposals.push(x);saveLocal();alert(kind+" 저장 완료");render();
}
function editStock(i){
  const x=A.inventory[i];if(!x)return;const q=prompt("수정할 재고 수량",String(x.qty));if(q===null)return;
  const n=Number(q);if(!Number.isFinite(n)||n<0)return alert("올바른 수량을 입력하세요.");
  x.qty=n;saveLocal();render();
}
function resetAll(){
  const p=prompt("관리자 비밀번호를 다시 입력하세요.");
  if(p!=="admin1234")return alert("관리자 비밀번호가 맞지 않습니다.");
  if(!confirm("전체 재고와 내역을 초기화하시겠습니까?"))return;
  A.inventory=[];A.history=[];A.disposals=[];saveLocal();render();alert("초기화되었습니다.");
}
function exportAll(){
  const rows=[["중고재고"],["모델명","바코드번호","수량","상태"],...A.inventory.map(x=>[x.model,x.serial,x.qty,x.status||"정상"]),[],["전체 내역"],["구분","일시","모델명","바코드","수량","가맹점","입고내용","폐기사유"],...A.history.map(x=>[x.kind,x.at,x.model,x.serial,x.qty,x.store,x.note,x.reason])];
  const cell=v=>`"${String(v??"").replaceAll('"','""')}"`;const blob=new Blob(["\uFEFF"+rows.map(r=>r.map(cell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"});
  const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="중고재고관리_전체분석.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
}
function openScanner(targetSelector){
  const el=$(targetSelector);if(!el)return;
  const box=document.createElement("div");box.style.cssText="position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:12px";
  box.innerHTML='<div style="width:min(560px,96vw);background:#fff;border-radius:20px;padding:15px;box-sizing:border-box"><div style="font-size:20px;font-weight:900;margin-bottom:10px">바코드 촬영</div><div style="position:relative;aspect-ratio:4/3;background:#101521;border-radius:15px;overflow:hidden"><video id="camera" autoplay muted playsinline style="width:100%;height:100%;object-fit:cover;display:block"></video><div style="position:absolute;left:9%;right:9%;top:23%;bottom:23%;border:2px solid #fff;border-radius:10px"></div></div><div id="camera-note" style="font-size:12px;color:#657188;line-height:1.5;margin-top:8px">카메라 권한을 허용한 뒤 바코드를 중앙에 맞추고 촬영하세요.</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:11px"><button id="shot" style="height:46px;border:0;border-radius:12px;background:#2f73e8;color:#fff;font-weight:800">촬영</button><button id="close" style="height:46px;border:0;border-radius:12px;background:#edf1f7;font-weight:800">닫기</button></div></div>';
  document.body.appendChild(box);let stream=null;
  const close=()=>{if(stream)stream.getTracks().forEach(t=>t.stop());box.remove()};$("#close",box).onclick=close;
  (async()=>{try{if(!navigator.mediaDevices?.getUserMedia)throw new Error("camera");stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});$("#camera",box).srcObject=stream;await $("#camera",box).play()}catch(e){$("#camera-note",box).textContent="카메라를 열 수 없습니다. HTTPS 주소와 카메라 권한을 확인하세요."}})();
  $("#shot",box).onclick=async()=>{
    try{if("BarcodeDetector" in window){const d=new BarcodeDetector({formats:["code_128","code_39","code_93","ean_13","ean_8","upc_a","upc_e","itf_14","codabar"]});const r=await d.detect($("#camera",box));if(r?.length){el.value=r[0].rawValue;close();return}}}catch(e){}
    const manual=prompt("자동 인식에 실패했습니다. 바코드번호를 직접 입력하세요.");if(manual!==null){el.value=manual.trim();close();}
  };
}
async function login(){
  const id=$("#login-id").value.trim(),pw=$("#login-pw").value;
  if(!id||!pw)return alert("아이디와 비밀번호를 입력하세요.");
  const d=DEMO[id];if(d&&d.password===pw){A.user={username:id,name:d.name,role:d.role};A.shared=false;loadLocal();appShell();return;}
  alert("로그인 실패\n관리자: admin / admin1234\n사용자: staff / staff1234");
}
async function logout(){A.user=null;A.view="dashboard";loginScreen();}

function applyMobileLayout(){
  // Inline styles are used deliberately so the UI still renders even if a host strips CSS blocks.
  const nav=document.getElementById("bottom");
  const stats=document.getElementById("stats");
  if(window.innerWidth<=700 && nav) nav.style.gridTemplateColumns="repeat(4,1fr)";
  if(window.innerWidth<=700 && stats) stats.style.gridTemplateColumns="repeat(2,1fr)";
}
loadLocal();loginScreen();window.addEventListener("resize",applyMobileLayout);
</script>

<!-- Supabase is optional. The page remains fully styled and usable in demo mode without it. -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
</body>
</html>
