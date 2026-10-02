<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#071d37">
<title>중고 재고관리 Pro</title>
<style>
:root{--navy:#071d37;--navy2:#102a4a;--blue:#2f73e8;--bg:#f5f7fb;--card:#fff;--text:#16233a;--muted:#718097;--line:#e4e9f1;--danger:#d94b55}
*{box-sizing:border-box}
html,body{margin:0;padding:0;width:100%;min-height:100%;font-family:Arial,"Noto Sans KR","Malgun Gothic",sans-serif;background:var(--bg);color:var(--text)}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
h1,h2,h3,p{margin:0}
.hidden{display:none!important}

#root{min-height:100vh}
.login-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(180deg,var(--navy),var(--navy2))}
.login-card{width:min(440px,94vw);background:#fff;border-radius:26px;padding:26px;box-shadow:0 25px 80px rgba(0,0,0,.25)}
.brand-logo{width:68px;height:68px;border-radius:20px;background:linear-gradient(135deg,#2f73e8,#788cf8);display:grid;place-items:center;color:#fff;font-weight:900;font-size:22px;margin-bottom:14px}
.login-title{font-size:30px;font-weight:900;color:var(--navy)}
.login-sub{margin-top:5px;color:#7b879a;font-size:14px}
.field{display:grid;gap:7px;margin:13px 0}
.field label{font-size:14px;font-weight:800}
.field input,.field select,.field textarea{width:100%;min-height:50px;padding:11px 13px;border:1px solid #d5ddea;border-radius:13px;background:#fff;color:var(--text);outline:0}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(47,115,232,.12)}
.btn{min-height:46px;border:0;border-radius:12px;padding:10px 15px;background:#edf1f7;color:#2b3750;font-weight:800}
.btn-primary{background:var(--blue);color:#fff}
.btn-danger{background:var(--danger);color:#fff}
.btn-outline{background:#fff;border:1px solid #ccd5e4}
.full{width:100%}
.notice{margin-top:12px;padding:11px 12px;border-radius:12px;background:#f0f5ff;color:#41597d;font-size:12px;line-height:1.5}
.app-shell{min-height:100vh}
.header{height:68px;position:sticky;top:0;z-index:30;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 18px}
.header-brand{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:900}
.header-logo{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#2f73e8,#788cf8);display:grid;place-items:center;color:#fff;font-weight:900}
.user-badge{color:var(--blue);font-weight:800}
.main{max-width:1280px;margin:0 auto;padding:17px 16px 100px}
.title{font-size:26px;font-weight:900;margin-bottom:12px}
.subtitle{color:var(--muted);font-size:13px;margin-top:-6px;margin-bottom:12px}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.stat-card{background:#fff;border:1px solid #eef1f6;border-radius:19px;padding:17px;box-shadow:0 10px 28px rgba(20,34,58,.07)}
.stat-label{font-size:14px;color:#67738a}
.stat-value{font-size:31px;font-weight:900;margin-top:5px}
.panel{background:#fff;border:1px solid #eef1f6;border-radius:18px;padding:16px;margin-top:14px;box-shadow:0 10px 28px rgba(20,34,58,.06)}
.panel h3{font-size:18px;margin-bottom:10px}
.toolbar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.table-wrap{overflow:auto;border:1px solid #edf0f5;border-radius:16px;background:#fff}
table{width:100%;min-width:720px;border-collapse:collapse}
th,td{padding:10px;border-bottom:1px solid #edf0f5;text-align:left;white-space:nowrap}
th{background:#fafbfd;color:#647087;font-size:13px}
td{font-size:14px}
.badge{display:inline-flex;align-items:center;padding:4px 9px;border-radius:999px;background:#eef4ff;color:var(--blue);font-size:12px;font-weight:800}
.barcode-row{display:grid;grid-template-columns:1fr auto;gap:8px}
.barcode-btn{min-width:96px}
.form-actions{display:grid;gap:9px;margin-top:10px}
.bottom{position:fixed;left:0;right:0;bottom:0;z-index:40;background:var(--navy);display:grid;grid-template-columns:repeat(8,minmax(0,1fr));padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
.nav{border:0;background:transparent;color:#d7dfeb;min-width:0;padding:6px 2px;display:flex;flex-direction:column;align-items:center;gap:3px}
.nav.active{color:#5ea0ff}
.nav-icon{font-size:20px;line-height:20px}
.nav-label{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.modal-back{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.62);display:flex;align-items:center;justify-content:center;padding:12px}
.modal{width:min(560px,96vw);max-height:92vh;overflow:auto;background:#fff;border-radius:20px;padding:16px;box-shadow:0 24px 90px rgba(0,0,0,.3)}
.camera{position:relative;aspect-ratio:4/3;background:#101521;border-radius:15px;overflow:hidden}
.camera video{width:100%;height:100%;object-fit:cover;display:block}
.camera-frame{position:absolute;left:10%;right:10%;top:24%;bottom:24%;border:2px solid rgba(255,255,255,.95);border-radius:10px;box-shadow:0 0 0 9999px rgba(0,0,0,.12)}
.modal-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:11px}
.small{font-size:12px;color:#6c788b;line-height:1.5;margin-top:7px}
.empty{text-align:center;color:#8a95a7;padding:32px}
@media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.header{height:62px;padding:0 12px}.header-brand{font-size:15px}.header-logo{width:34px;height:34px}.main{padding:12px 10px 96px}.title{font-size:22px}.cards{gap:8px}.stat-card{padding:13px;border-radius:15px}.stat-value{font-size:25px}.panel{padding:13px;border-radius:15px}.nav-icon{font-size:18px}.nav-label{font-size:9px}.barcode-row{grid-template-columns:1fr auto}.barcode-btn{min-width:84px}}
@media(max-width:390px){.bottom{grid-template-columns:repeat(4,1fr);grid-auto-rows:50px}}
</style>
</head>
<body>
<div id="root"></div>
<script>
"use strict";
const CONFIG={SUPABASE_URL:"",SUPABASE_PUBLISHABLE_KEY:""};
const DEMO={admin:{pw:"admin1234",name:"관리자",role:"admin"},staff:{pw:"staff1234",name:"직원",role:"user"}};
const S={user:null,view:"dashboard",inventory:[],history:[],disposals:[],sb:null,realtime:null,shared:false};
const NAV=[["dashboard","⌂","대시보드"],["inventory","▣","중고재고"],["inbound","↓","입고"],["outbound","↑","출고"],["reentry","↻","재입고"],["history","▤","입·출고"],["analytics","▥","분석"],["settings","⚙","관리자"]];
const $=(s,r=document)=>r.querySelector(s);
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const uid=()=>crypto?.randomUUID?crypto.randomUUID():String(Date.now()+Math.random());
const now=()=>new Date().toISOString();

function load(){try{const d=JSON.parse(localStorage.getItem("uip-final-v1")||"{}");S.inventory=d.inventory||[];S.history=d.history||[];S.disposals=d.disposals||[]}catch(e){}}
function save(){localStorage.setItem("uip-final-v1",JSON.stringify({inventory:S.inventory,history:S.history,disposals:S.disposals}))}

function loginScreen(){
  document.body.innerHTML='<div class="login-screen"><div class="login-card">'+
  '<div class="brand-logo">IP</div><div class="login-title">중고 재고관리 Pro</div>'+
  '<div class="login-sub">휴대폰 · PC 공동사용 재고관리</div>'+
  '<div class="field"><label>아이디</label><input id="login-id" autocomplete="username" placeholder="아이디"></div>'+
  '<div class="field"><label>비밀번호</label><input id="login-pw" type="password" autocomplete="current-password" placeholder="비밀번호"></div>'+
  '<button class="btn btn-primary full" id="login">로그인</button>'+
  '<div class="notice">공용 서버를 연결하지 않은 상태에서는 이 기기에서만 데모 데이터가 저장됩니다.<br>데모 관리자: <b>admin / admin1234</b><br>데모 사용자: <b>staff / staff1234</b></div>'+
  '<div class="small">바코드 촬영은 HTTPS 주소에서 카메라 권한을 허용해야 사용할 수 있습니다.</div></div></div>';
  $("#login").onclick=doLogin;
}
function shell(){
  document.body.innerHTML='<div class="app-shell"><header class="header"><div class="header-brand"><div class="header-logo">IP</div><div>중고 재고관리 Pro</div></div><div class="user-badge">● '+esc(S.user?.name||"사용자")+'</div></header><main class="main"><div id="content"></div></main><nav class="bottom">'+NAV.map(n=>'<button class="nav '+(S.view===n[0]?"active":"")+'" data-nav="'+n[0]+'"><span class="nav-icon">'+n[1]+'</span><span class="nav-label">'+n[2]+'</span></button>').join("")+'</nav></div>';
  document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{S.view=b.dataset.nav;render()});
  render();
}
function render(){
  const f={dashboard,inventory,inbound,outbound,reentry,history,analytics,settings}[S.view]||dashboard;
  $("#content").innerHTML=f();bind();
}
function dashboard(){
  const total=S.inventory.reduce((a,x)=>a+Number(x.qty||0),0);
  const inn=S.history.filter(x=>x.kind==="입고").reduce((a,x)=>a+Number(x.qty||0),0);
  const out=S.history.filter(x=>x.kind==="출고").reduce((a,x)=>a+Number(x.qty||0),0);
  return '<div class="title">대시보드</div><div class="subtitle">모든 사용자가 같은 서버 데이터를 공유하도록 연결할 수 있습니다.</div>'+
  '<div class="cards"><div class="stat-card"><div class="stat-label">전체 재고</div><div class="stat-value">'+total+' 개</div><div class="muted">현재 보유 수량</div></div>'+
  '<div class="stat-card"><div class="stat-label">총 입고</div><div class="stat-value">'+inn+' 개</div><div class="muted">누적 입고</div></div>'+
  '<div class="stat-card"><div class="stat-label">총 출고</div><div class="stat-value">'+out+' 개</div><div class="muted">누적 출고</div></div>'+
  '<div class="stat-card"><div class="stat-label">폐기</div><div class="stat-value">'+S.disposals.reduce((a,x)=>a+Number(x.qty||0),0)+' 개</div><div class="muted">폐기 수량</div></div></div>'+
  '<div class="panel"><h3>최근 입·출고 현황</h3>'+table(S.history.slice().reverse().slice(0,8))+'</div>';
}
function inventory(){
  return '<div class="title">중고재고</div><div class="toolbar"><button class="btn btn-primary" id="go-in">입고 등록</button><button class="btn" id="go-disposal">폐기 제품 보기</button></div>'+
  '<div class="table-wrap"><table><thead><tr><th>모델명</th><th>바코드번호</th><th>수량</th><th>상태</th><th>수정</th></tr></thead><tbody>'+
  (S.inventory.length?S.inventory.map((x,i)=>'<tr><td>'+esc(x.model)+'</td><td>'+esc(x.serial)+'</td><td>'+x.qty+'</td><td><span class="badge">'+esc(x.status||"정상")+'</span></td><td><button class="btn edit" data-i="'+i+'">수정</button></td></tr>').join(""):'<tr><td colspan="5" class="empty">등록된 재고가 없습니다.</td></tr>')+
  '</tbody></table></div>';
}
function txn(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  return '<div class="title">'+kind+'</div><div class="panel">'+
  '<div class="field"><label>모델명</label><input id="'+p+'-model" placeholder="모델명"></div>'+
  '<div class="field"><label>바코드번호</label><div class="barcode-row"><input id="'+p+'-serial" placeholder="바코드번호 입력 또는 촬영"><button class="btn barcode-btn" id="scan-'+p+'">📷 촬영</button></div></div>'+
  '<div class="field"><label>수량</label><input id="'+p+'-qty" type="number" min="1" value="1"></div>'+
  (kind!=="입고"?'<div class="field"><label>가맹점</label><input id="'+p+'-store" placeholder="가맹점명"></div>':'')+
  (kind==="입고"?'<div class="field"><label>입고내용</label><select id="in-type"><option>A/S 입고</option><option>수리입고</option><option>폐기</option></select></div><div class="field hidden" id="reason-box"><label>폐기 사유</label><textarea id="in-reason" rows="3" placeholder="폐기 이유"></textarea></div><div class="form-actions"><button class="btn btn-outline" id="view-d">폐기 제품 보기</button><button class="btn btn-primary" id="save-in">입고 저장</button></div>'
  :'<div class="form-actions"><button class="btn btn-primary" id="save-'+p+'">'+kind+' 저장</button></div>')+
  '</div>';
}
function inbound(){return txn("입고")} function outbound(){return txn("출고")} function reentry(){return txn("재입고")}
function table(rows){
  if(!rows.length)return '<div class="empty">내역이 없습니다.</div>';
  return '<div class="table-wrap"><table><thead><tr><th>일시</th><th>구분</th><th>모델명</th><th>바코드</th><th>수량</th><th>가맹점</th><th>내용</th></tr></thead><tbody>'+
  rows.map(x=>'<tr><td>'+esc(new Date(x.at).toLocaleString("ko-KR"))+'</td><td>'+esc(x.kind)+'</td><td>'+esc(x.model)+'</td><td>'+esc(x.serial)+'</td><td>'+Number(x.qty||0)+'</td><td>'+esc(x.store)+'</td><td>'+esc(x.note||x.reason||"")+'</td></tr>').join("")+
  '</tbody></table></div>';
}
function history(){return '<div class="title">입·출고 내역</div><div class="toolbar"><button class="btn btn-primary" id="export">전체 자료 내보내기</button></div><div class="panel">'+table(S.history.slice().reverse())+'</div>'}
function analytics(){
  const y=new Date().getFullYear(),ms=Array.from({length:12},(_,i)=>i+1);
  const val=(m,k)=>S.history.filter(x=>{const d=new Date(x.at);return d.getFullYear()===y&&d.getMonth()+1===m&&x.kind===k}).reduce((a,x)=>a+Number(x.qty||0),0);
  const max=Math.max(1,...ms.flatMap(m=>[val(m,"입고"),val(m,"출고"),val(m,"재입고")]));
  return '<div class="title">월간 / 연간 분석</div><div class="panel"><h3>'+y+'년 월간 그래프</h3>'+
  '<div style="height:250px;display:flex;align-items:flex-end;gap:5px;padding:18px 4px 34px;border-bottom:1px solid #dfe4ec">'+
  ms.map(m=>'<div style="flex:1;height:100%;display:flex;gap:2px;align-items:flex-end;position:relative"><div title="입고 '+val(m,"입고")+'" style="height:'+Math.max(3,val(m,"입고")/max*180)+'px;flex:1;background:#2f73e8;border-radius:5px 5px 0 0"></div><div title="출고 '+val(m,"출고")+'" style="height:'+Math.max(3,val(m,"출고")/max*180)+'px;flex:1;background:#67748a;border-radius:5px 5px 0 0"></div><div title="재입고 '+val(m,"재입고")+'" style="height:'+Math.max(3,val(m,"재입고")/max*180)+'px;flex:1;background:#7f8cff;border-radius:5px 5px 0 0"></div><span style="position:absolute;left:50%;bottom:-24px;transform:translateX(-50%);font-size:10px">'+m+'월</span></div>').join("")+
  '</div><div class="toolbar" style="margin-top:12px"><span class="badge">파랑: 입고</span><span class="badge" style="background:#eef0f4;color:#5e687a">회색: 출고</span><span class="badge" style="background:#f0f0ff;color:#626fe7">보라: 재입고</span></div></div>'+
  '<div class="panel"><h3>연간 내역</h3>'+annual()+'</div>';
}
function annual(){
  const ys=[...new Set(S.history.map(x=>new Date(x.at).getFullYear()))].sort((a,b)=>b-a);
  if(!ys.length)return '<div class="empty">아직 데이터가 없습니다.</div>';
  const sum=(y,k)=>S.history.filter(x=>new Date(x.at).getFullYear()===y&&x.kind===k).reduce((a,x)=>a+Number(x.qty||0),0);
  return '<div class="table-wrap"><table><thead><tr><th>연도</th><th>입고</th><th>출고</th><th>재입고</th><th>폐기</th></tr></thead><tbody>'+ys.map(y=>'<tr><td>'+y+'</td><td>'+sum(y,"입고")+'</td><td>'+sum(y,"출고")+'</td><td>'+sum(y,"재입고")+'</td><td>'+sum(y,"폐기")+'</td></tr>').join("")+'</tbody></table></div>';
}
function settings(){return '<div class="title">관리자 설정</div><div class="panel"><h3>공용 서버</h3><div class="notice">'+(S.shared?"Supabase 공유 모드":"현재 이 기기에서만 저장되는 데모 모드")+'</div></div><div class="panel"><h3>전체 초기화</h3><button class="btn btn-danger" id="reset">전체 초기화</button></div><div class="panel"><button class="btn" id="logout">로그아웃</button></div>'}
function bind(){
  [["#scan-in","#in-serial"],["#scan-out","#out-serial"],["#scan-re","#re-serial"]].forEach(x=>{if($(x[0]))$(x[0]).onclick=()=>scanner(x[1]);if($(x[1]))$(x[1]).onclick=()=>scanner(x[1])});
  if($("#in-type"))$("#in-type").onchange=e=>$("#reason-box").classList.toggle("hidden",e.target.value!=="폐기");
  if($("#save-in"))$("#save-in").onclick=()=>saveTxn("입고");
  if($("#save-out"))$("#save-out").onclick=()=>saveTxn("출고");
  if($("#save-re"))$("#save-re").onclick=()=>saveTxn("재입고");
  if($("#view-d"))$("#view-d").onclick=()=>{S.view="disposal";render()};
  if($("#go-in"))$("#go-in").onclick=()=>{S.view="inbound";render()};
  if($("#go-disposal"))$("#go-disposal").onclick=()=>{S.view="disposal";render()};
  if($("#export"))$("#export").onclick=exportData;
  if($("#reset"))$("#reset").onclick=reset;
  if($("#logout"))$("#logout").onclick=logout;
  document.querySelectorAll(".edit").forEach(b=>b.onclick=()=>{const x=S.inventory[Number(b.dataset.i)];const n=prompt("수정할 수량",x.qty);if(n!==null&&Number(n)>=0){x.qty=Number(n);save();render()}})
}
function disposal(){return '<div class="title">폐기 제품</div><div class="panel">'+table(S.disposals.slice().reverse())+'</div>'}
function saveTxn(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re",model=$("#"+p+"-model").value.trim(),serial=$("#"+p+"-serial").value.trim(),qty=Number($("#"+p+"-qty").value||0);
  if(!model||!serial||qty<=0)return alert("모델명, 바코드번호, 수량을 입력하세요.");
  const store=kind==="입고"?"":$("#"+p+"-store").value.trim();let note="",reason="";
  if(kind==="입고"){note=$("#in-type").value;if(note==="폐기"){reason=$("#in-reason").value.trim();if(!reason)return alert("폐기 사유를 입력하세요.")}}
  let inv=S.inventory.find(x=>x.model===model&&x.serial===serial);
  if(kind==="출고"){if(!inv||Number(inv.qty)<qty)return alert("재고가 부족합니다.");inv.qty-=qty}
  else if(kind==="재입고"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};S.inventory.push(inv)}}
  else if(note!=="폐기"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};S.inventory.push(inv)}}
  const x={id:uid(),kind:note==="폐기"?"폐기":kind,model,serial,qty,store,note,reason,at:now(),actor:S.user?.username||"local"};
  S.history.push(x);if(x.kind==="폐기")S.disposals.push(x);save();alert(kind+" 저장 완료");render();
}
function reset(){const p=prompt("관리자 비밀번호를 다시 입력하세요.");if(p!=="admin1234")return alert("관리자 비밀번호가 맞지 않습니다.");if(!confirm("전체 재고와 내역을 초기화할까요?"))return;S.inventory=[];S.history=[];S.disposals=[];save();render();alert("초기화되었습니다.")}
function exportData(){
  const rows=[["중고재고"],["모델명","바코드번호","수량","상태"],...S.inventory.map(x=>[x.model,x.serial,x.qty,x.status||"정상"]),[],["전체 내역"],["구분","일시","모델명","바코드","수량","가맹점","입고내용","폐기사유"],...S.history.map(x=>[x.kind,x.at,x.model,x.serial,x.qty,x.store,x.note,x.reason])];
  const cell=v=>'"'+String(v??"").replaceAll('"','""')+'"';
  const blob=new Blob(["\uFEFF"+rows.map(r=>r.map(cell).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a"),u=URL.createObjectURL(blob);a.href=u;a.download="중고재고관리_전체분석.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
}
function scanner(target){
  const el=$(target);if(!el)return;
  const back=document.createElement("div");back.className="modal-back";
  back.innerHTML='<div class="modal"><h3>바코드 촬영</h3><div class="camera"><video id="cam" autoplay muted playsinline></video><div class="camera-frame"></div></div><div class="small" id="cam-note">카메라 권한을 허용한 뒤 바코드를 중앙에 맞추고 촬영하세요.</div><div class="modal-actions"><button class="btn btn-primary" id="shot">촬영</button><button class="btn" id="close">닫기</button></div></div>';
  document.body.appendChild(back);let stream=null;
  const close=()=>{if(stream)stream.getTracks().forEach(t=>t.stop());back.remove()};$("#close",back).onclick=close;
  (async()=>{try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});$("#cam",back).srcObject=stream;await $("#cam",back).play()}catch(e){$("#cam-note",back).textContent="카메라를 열 수 없습니다. HTTPS와 카메라 권한을 확인하세요."}})();
  $("#shot",back).onclick=async()=>{
    try{
      if("BarcodeDetector" in window){
        const d=new BarcodeDetector({formats:["code_128","code_39","code_93","ean_13","ean_8","upc_a","upc_e","itf_14","codabar"]});
        const rs=await d.detect($("#cam",back));if(rs?.length){el.value=rs[0].rawValue;close();return}
      }
    }catch(e){}
    const manual=prompt("바코드를 자동 인식하지 못했습니다. 바코드번호를 직접 입력하세요.");if(manual!==null){el.value=manual.trim();close()}
  };
}
async function doLogin(){
  const id=$("#login-id").value.trim(),pw=$("#login-pw").value;
  if(!id||!pw)return alert("아이디와 비밀번호를 입력하세요.");
  if(!CONFIG.SUPABASE_URL||!CONFIG.SUPABASE_PUBLISHABLE_KEY){
    const d=DEMO[id];if(!d||d.pw!==pw)return alert("로그인 실패\\n관리자: admin / admin1234\\n사용자: staff / staff1234");
    S.user={username:id,name:d.name,role:d.role};S.view="dashboard";load();shell();return;
  }
  try{
    const email=id.includes("@")?id:id+"@usedinventory.local";
    const r=await S.sb.auth.signInWithPassword({email,password:pw});if(r.error)throw r.error;
    S.user={username:id,name:id,role:"user"};S.shared=true;await loadRemote();shell();
  }catch(e){alert("로그인 실패: "+(e.message||"알 수 없는 오류"))}
}
async function loadRemote(){
  if(!S.sb)return;
  const i=await S.sb.from("inventory").select("*").order("model",{ascending:true});
  const h=await S.sb.from("history").select("*").order("at",{ascending:true});
  if(!i.error)S.inventory=i.data||[];if(!h.error){S.history=h.data||[];S.disposals=S.history.filter(x=>x.kind==="폐기")}
}
async function logout(){if(S.realtime&&S.sb)await S.sb.removeChannel(S.realtime);if(S.sb)await S.sb.auth.signOut();S.user=null;S.view="dashboard";loginScreen()}
load();if(CONFIG.SUPABASE_URL&&CONFIG.SUPABASE_PUBLISHABLE_KEY&&window.supabase){S.sb=window.supabase.createClient(CONFIG.SUPABASE_URL,CONFIG.SUPABASE_PUBLISHABLE_KEY);S.shared=true}
loginScreen();
</script>
</body>
</html>
