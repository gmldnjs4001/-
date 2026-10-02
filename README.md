<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#081d36">
<title>중고 재고관리 Pro</title>
<style>
:root{--navy:#081d36;--blue:#2f73e8;--bg:#f4f7fb;--text:#132238;--muted:#758197;--card:#fff;--line:#e3e8f0;--danger:#d94d57}
*{box-sizing:border-box}
html,body{margin:0;padding:0;min-height:100%;font-family:Arial,"Noto Sans KR","Malgun Gothic",sans-serif;background:var(--bg);color:var(--text)}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
.page{min-height:100vh}
.login-wrap{min-height:100vh;display:flex;justify-content:center;align-items:center;padding:18px;background:linear-gradient(180deg,#081d36,#163d65)}
.login-card{width:min(430px,94vw);background:#fff;border-radius:26px;padding:26px;box-shadow:0 24px 80px #00000044}
.logo{width:66px;height:66px;border-radius:19px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#2f73e8,#7a8cf5);font-weight:900;font-size:22px;margin-bottom:15px}
.login-title{font-size:30px;font-weight:900;line-height:1.2;color:#0b1f37}
.login-sub{margin-top:6px;color:#7c8799;font-size:14px}
.field{display:grid;gap:7px;margin:14px 0}
.field label{font-size:14px;font-weight:800}
.field input,.field select,.field textarea{width:100%;min-height:50px;border:1px solid #d3dbe7;border-radius:13px;padding:0 13px;background:#fff;color:var(--text);font-size:16px;outline:none}
.field textarea{padding:11px 13px}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px #2f73e81e}
.btn{min-height:46px;border:0;border-radius:12px;padding:10px 15px;background:#edf1f7;color:#2c3951;font-weight:800}
.primary{background:var(--blue);color:#fff}.danger{background:var(--danger);color:#fff}.outline{background:#fff;border:1px solid #cbd5e3}
.notice{margin-top:12px;padding:11px 12px;border-radius:12px;background:#f1f5fb;color:#50617a;font-size:12px;line-height:1.5}
.top{height:66px;background:#fff;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 16px;position:sticky;top:0;z-index:20}
.brand{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:900}.brand .logo{width:38px;height:38px;border-radius:11px;font-size:13px;margin:0}
.user{color:var(--blue);font-weight:800}
.main{max-width:1280px;margin:0 auto;padding:16px 14px 100px}
.title{font-size:26px;font-weight:900;margin-bottom:6px}.sub{color:var(--muted);font-size:13px;margin-bottom:13px}
.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px}
.stat{background:#fff;border:1px solid #edf1f6;border-radius:18px;padding:16px;box-shadow:0 9px 28px #14223a12}
.stat small{color:#68748a}.stat b{display:block;font-size:30px;margin-top:6px}.stat em{font-style:normal;color:#8791a2;font-size:12px}
.panel{background:#fff;border:1px solid #edf1f6;border-radius:18px;padding:15px;margin-top:13px;box-shadow:0 9px 28px #14223a0e}
.toolbar{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 12px}
.table-box{overflow:auto;border:1px solid #edf0f5;border-radius:15px}
table{width:100%;min-width:720px;border-collapse:collapse}th,td{padding:10px;border-bottom:1px solid #edf0f5;text-align:left;white-space:nowrap}th{background:#fafbfd;color:#647087;font-size:13px}td{font-size:14px}
.badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#eef4ff;color:#2f73e8;font-size:12px;font-weight:800}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.full-col{grid-column:1/-1}
.bottom{position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--navy);display:grid;grid-template-columns:repeat(8,1fr);padding:6px 4px calc(6px + env(safe-area-inset-bottom))}
.nav{border:0;background:transparent;color:#d7dfeb;display:flex;flex-direction:column;align-items:center;gap:2px;padding:5px 2px;min-width:0}.nav.active{color:#5ea0ff}.nav span:first-child{font-size:19px;line-height:19px}.nav span:last-child{font-size:9px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.overlay{position:fixed;inset:0;z-index:100;background:#000000a6;display:flex;justify-content:center;align-items:center;padding:12px}
.modal{width:min(560px,96vw);max-height:92vh;overflow:auto;background:#fff;border-radius:20px;padding:15px}
.camera{position:relative;aspect-ratio:4/3;background:#10151f;border-radius:14px;overflow:hidden}.camera video{width:100%;height:100%;object-fit:cover;display:block}.frame{position:absolute;left:9%;right:9%;top:23%;bottom:23%;border:2px solid #fff;border-radius:10px}
.actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.small{font-size:12px;color:#68768a;line-height:1.5;margin-top:8px}
@media(max-width:900px){.cards{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.top{height:62px;padding:0 11px}.brand{font-size:15px}.brand .logo{width:34px;height:34px}.main{padding:12px 10px 95px}.title{font-size:22px}.cards{gap:8px}.stat{padding:13px;border-radius:15px}.stat b{font-size:25px}.form-grid{grid-template-columns:1fr}.full-col{grid-column:auto}.nav span:first-child{font-size:17px}.nav span:last-child{font-size:8px}}
@media(max-width:390px){.bottom{grid-template-columns:repeat(4,1fr);grid-auto-rows:49px}}
</style>
</head>
<body>

<div id="login-screen" class="login-wrap">
  <div class="login-card">
    <div class="logo">IP</div>
    <div class="login-title">중고 재고관리 Pro</div>
    <div class="login-sub">휴대폰 · PC 공동사용 재고관리</div>
    <div class="field"><label>아이디</label><input id="login-id" autocomplete="username" placeholder="아이디"></div>
    <div class="field"><label>비밀번호</label><input id="login-pw" type="password" autocomplete="current-password" placeholder="비밀번호"></div>
    <button id="login-btn" class="btn primary" style="width:100%">로그인</button>
    <div class="notice">데모 관리자: <b>admin / admin1234</b><br>데모 사용자: <b>staff / staff1234</b></div>
    <div class="small">※ 여러 기기에서 같은 재고를 사용하려면 Supabase 서버 연결이 추가로 필요합니다.</div>
  </div>
</div>

<div id="app" class="page" style="display:none">
  <header class="top">
    <div class="brand"><div class="logo">IP</div><div>중고 재고관리 Pro</div></div>
    <div class="user">● <span id="user-name">관리자</span></div>
  </header>
  <main id="main" class="main"></main>
  <nav class="bottom">
    <button class="nav" data-view="dashboard"><span>⌂</span><span>대시보드</span></button>
    <button class="nav" data-view="inventory"><span>▣</span><span>중고재고</span></button>
    <button class="nav" data-view="inbound"><span>↓</span><span>입고</span></button>
    <button class="nav" data-view="outbound"><span>↑</span><span>출고</span></button>
    <button class="nav" data-view="reentry"><span>↻</span><span>재입고</span></button>
    <button class="nav" data-view="history"><span>▤</span><span>입·출고</span></button>
    <button class="nav" data-view="analytics"><span>▥</span><span>분석</span></button>
    <button class="nav" data-view="settings"><span>⚙</span><span>관리자</span></button>
  </nav>
</div>

<script>
"use strict";
const data={inventory:[],history:[],disposals:[]};
let user=null,view="dashboard",scannerStream=null;

function load(){try{Object.assign(data,JSON.parse(localStorage.getItem("uip-final-static")||"{}"))}catch(e){}}
function save(){localStorage.setItem("uip-final-static",JSON.stringify(data))}
function e(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function uid(){return crypto?.randomUUID?crypto.randomUUID():String(Date.now()+Math.random())}

function setView(v){view=v;document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===v));render()}
document.querySelectorAll(".nav").forEach(x=>x.onclick=()=>setView(x.dataset.view));

function table(rows){
  if(!rows.length)return '<div class="small" style="text-align:center;padding:25px">내역이 없습니다.</div>';
  return '<div class="table-box"><table><thead><tr><th>일시</th><th>구분</th><th>모델명</th><th>바코드</th><th>수량</th><th>가맹점</th><th>내용</th></tr></thead><tbody>'+
  rows.map(x=>'<tr><td>'+e(new Date(x.at).toLocaleString("ko-KR"))+'</td><td>'+e(x.kind)+'</td><td>'+e(x.model)+'</td><td>'+e(x.serial)+'</td><td>'+Number(x.qty||0)+'</td><td>'+e(x.store)+'</td><td>'+e(x.note||x.reason||"")+'</td></tr>').join("")+
  '</tbody></table></div>';
}

function dashboard(){
  const qty=data.inventory.reduce((a,x)=>a+Number(x.qty||0),0);
  const inn=data.history.filter(x=>x.kind==="입고").reduce((a,x)=>a+Number(x.qty||0),0);
  const out=data.history.filter(x=>x.kind==="출고").reduce((a,x)=>a+Number(x.qty||0),0);
  const re=data.history.filter(x=>x.kind==="재입고").reduce((a,x)=>a+Number(x.qty||0),0);
  return '<div class="title">대시보드</div><div class="sub">재고 현황과 최근 작업을 확인합니다.</div>'+
  '<div class="cards"><div class="stat"><small>전체 재고</small><b>'+qty+' 개</b><em>현재 보유 수량</em></div><div class="stat"><small>입고</small><b>'+inn+' 개</b><em>누적 입고</em></div><div class="stat"><small>출고</small><b>'+out+' 개</b><em>누적 출고</em></div><div class="stat"><small>재입고</small><b>'+re+' 개</b><em>누적 재입고</em></div></div>'+
  '<div class="panel"><h3>최근 입·출고 현황</h3>'+table(data.history.slice().reverse().slice(0,8))+'</div>';
}

function inventory(){
  return '<div class="title">중고재고</div><div class="toolbar"><button class="btn primary" id="go-in">입고 등록</button><button class="btn" id="go-disposal">폐기 제품</button></div>'+
  (data.inventory.length?'<div class="table-box"><table><thead><tr><th>모델명</th><th>바코드번호</th><th>수량</th><th>상태</th><th>수정</th></tr></thead><tbody>'+data.inventory.map((x,i)=>'<tr><td>'+e(x.model)+'</td><td>'+e(x.serial)+'</td><td>'+x.qty+'</td><td><span class="badge">'+e(x.status||"정상")+'</span></td><td><button class="btn edit-stock" data-i="'+i+'">수정</button></td></tr>').join("")+'</tbody></table></div>':'<div class="panel" style="text-align:center;color:#8994a6">등록된 재고가 없습니다.</div>');
}

function tx(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re";
  return '<div class="title">'+kind+'</div><div class="panel"><div class="field"><label>모델명</label><input id="'+p+'-model" placeholder="모델명"></div>'+
  '<div class="field"><label>바코드번호</label><div class="barcode-row"><input id="'+p+'-serial" placeholder="입력 또는 촬영" autocomplete="off"><button class="btn" id="scan-'+p+'">📷 촬영</button></div></div>'+
  '<div class="field"><label>수량</label><input id="'+p+'-qty" type="number" min="1" value="1"></div>'+
  (kind!=="입고"?'<div class="field"><label>가맹점</label><input id="'+p+'-store" placeholder="가맹점명"></div>':'')+
  (kind==="입고"?'<div class="field"><label>입고내용</label><select id="in-type"><option>A/S 입고</option><option>수리입고</option><option>폐기</option></select></div><div class="field" id="reason-box" style="display:none"><label>폐기 사유</label><textarea id="in-reason" rows="3"></textarea></div>':'')+
  '<div class="form-actions">'+(kind==="입고"?'<button class="btn outline" id="go-disposal2">폐기 제품 보기</button>':'')+'<button class="btn primary" id="save-'+p+'">'+kind+' 저장</button></div></div>';
}

function history(){return '<div class="title">입·출고 내역</div><div class="toolbar"><button class="btn primary" id="export">전체 자료 내보내기</button></div><div class="panel">'+table(data.history.slice().reverse())+'</div>'}
function disposal(){return '<div class="title">폐기 제품</div><div class="sub">폐기 사유까지 확인합니다.</div><div class="panel">'+table(data.disposals.slice().reverse())+'</div>'}

function analytics(){
  const y=new Date().getFullYear(),months=[1,2,3,4,5,6,7,8,9,10,11,12];
  const sum=(m,k)=>data.history.filter(x=>{const d=new Date(x.at);return d.getFullYear()===y&&d.getMonth()+1===m&&x.kind===k}).reduce((a,x)=>a+Number(x.qty||0),0);
  const max=Math.max(1,...months.flatMap(m=>[sum(m,"입고"),sum(m,"출고"),sum(m,"재입고")]));
  return '<div class="title">월간 / 연간 분석</div><div class="panel"><h3>'+y+'년 월간 그래프</h3><div style="height:235px;display:flex;align-items:flex-end;gap:4px;padding:15px 2px 33px;border-bottom:1px solid #dfe5ed">'+months.map(m=>'<div style="flex:1;height:100%;display:flex;gap:2px;align-items:flex-end;position:relative"><div title="입고 '+sum(m,"입고")+'" style="height:'+Math.max(3,sum(m,"입고")/max*175)+'px;flex:1;background:#2f73e8;border-radius:4px 4px 0 0"></div><div title="출고 '+sum(m,"출고")+'" style="height:'+Math.max(3,sum(m,"출고")/max*175)+'px;flex:1;background:#66748a;border-radius:4px 4px 0 0"></div><div title="재입고 '+sum(m,"재입고")+'" style="height:'+Math.max(3,sum(m,"재입고")/max*175)+'px;flex:1;background:#7d89ef;border-radius:4px 4px 0 0"></div><span style="position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);font-size:9px">'+m+'월</span></div>').join("")+'</div></div>'+
  '<div class="panel"><h3>연간 내역</h3>'+annual()+'</div>';
}
function annual(){
  const ys=[...new Set(data.history.map(x=>new Date(x.at).getFullYear()))].sort((a,b)=>b-a);if(!ys.length)return '<div class="small">아직 데이터가 없습니다.</div>';
  const s=(y,k)=>data.history.filter(x=>new Date(x.at).getFullYear()===y&&x.kind===k).reduce((a,x)=>a+Number(x.qty||0),0);
  return '<div class="table-box"><table><thead><tr><th>연도</th><th>입고</th><th>출고</th><th>재입고</th><th>폐기</th></tr></thead><tbody>'+ys.map(y=>'<tr><td>'+y+'</td><td>'+s(y,"입고")+'</td><td>'+s(y,"출고")+'</td><td>'+s(y,"재입고")+'</td><td>'+s(y,"폐기")+'</td></tr>').join("")+'</tbody></table></div>';
}
function settings(){return '<div class="title">관리자 설정</div><div class="panel"><h3>공용 서버</h3><div class="notice">현재 HTML은 로컬 데모 모드입니다. Supabase URL과 Publishable Key를 연결하면 여러 기기에서 공용 데이터를 사용할 수 있습니다.</div></div><div class="panel"><h3>전체 초기화</h3><button class="btn danger" id="reset">전체 초기화</button></div><div class="panel"><button class="btn" id="logout">로그아웃</button></div>'}

function render(){
  const pages={dashboard,inventory,inbound:()=>tx("입고"),outbound:()=>tx("출고"),reentry:()=>tx("재입고"),history,disposal,analytics,settings};
  document.getElementById("main").innerHTML=(pages[view]||dashboard)();
  document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===view));
  bind();
}
function bind(){
  [["#scan-in","#in-serial"],["#scan-out","#out-serial"],["#scan-re","#re-serial"]].forEach(([b,t])=>{if($(b))$(b).onclick=()=>scanner(t);if($(t))$(t).onclick=()=>scanner(t)});
  if($("#in-type"))$("#in-type").onchange=e=>$("#reason-box").style.display=e.target.value==="폐기"?"block":"none";
  if($("#save-in"))$("#save-in").onclick=()=>saveTx("입고");if($("#save-out"))$("#save-out").onclick=()=>saveTx("출고");if($("#save-re"))$("#save-re").onclick=()=>saveTx("재입고");
  if($("#go-in"))$("#go-in").onclick=()=>{view="inbound";render()};if($("#go-disposal"))$("#go-disposal").onclick=()=>{view="disposal";render()};if($("#go-disposal2"))$("#go-disposal2").onclick=()=>{view="disposal";render()};
  if($("#export"))$("#export").onclick=exportData;if($("#reset"))$("#reset").onclick=resetAll;if($("#logout"))$("#logout").onclick=logout;
  document.querySelectorAll(".edit-stock").forEach(b=>b.onclick=()=>{const x=data.inventory[Number(b.dataset.i)],q=prompt("수정할 수량",x.qty);if(q!==null&&Number(q)>=0){x.qty=Number(q);save();render()}});
}
function $(s){return document.querySelector(s)}
function saveTx(kind){
  const p=kind==="입고"?"in":kind==="출고"?"out":"re",model=$("#"+p+"-model").value.trim(),serial=$("#"+p+"-serial").value.trim(),qty=Number($("#"+p+"-qty").value||0);
  if(!model||!serial||qty<=0)return alert("모델명, 바코드번호, 수량을 입력하세요.");
  const store=kind==="입고"?"":$("#"+p+"-store").value.trim();let note="",reason="";
  if(kind==="입고"){note=$("#in-type").value;if(note==="폐기"){reason=$("#in-reason").value.trim();if(!reason)return alert("폐기 사유를 입력하세요.")}}
  let inv=data.inventory.find(x=>x.model===model&&x.serial===serial);
  if(kind==="출고"){if(!inv||inv.qty<qty)return alert("재고가 부족합니다.");inv.qty-=qty}
  else if(kind==="재입고"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};data.inventory.push(inv)}}
  else if(note!=="폐기"){if(inv)inv.qty+=qty;else{inv={id:uid(),model,serial,qty,status:"정상"};data.inventory.push(inv)}}
  const x={id:uid(),kind:note==="폐기"?"폐기":kind,model,serial,qty,store,note,reason,at:now(),actor:user?.id||"local"};
  data.history.push(x);if(x.kind==="폐기")data.disposals.push(x);save();alert(kind+" 저장 완료");render();
}
function exportData(){
  const rows=[["중고재고"],["모델명","바코드번호","수량","상태"],...data.inventory.map(x=>[x.model,x.serial,x.qty,x.status||"정상"]),[],["전체 내역"],["구분","일시","모델명","바코드","수량","가맹점","입고내용","폐기사유"],...data.history.map(x=>[x.kind,x.at,x.model,x.serial,x.qty,x.store,x.note,x.reason])];
  const c=v=>'"'+String(v??"").replaceAll('"','""')+'"',blob=new Blob(["\uFEFF"+rows.map(r=>r.map(c).join(",")).join("\r\n")],{type:"text/csv;charset=utf-8"}),u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download="중고재고관리_전체분석.csv";document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(u);
}
function resetAll(){const p=prompt("관리자 비밀번호를 다시 입력하세요.");if(p!=="admin1234")return alert("관리자 비밀번호가 맞지 않습니다.");if(!confirm("전체 데이터를 초기화하시겠습니까?"))return;data.inventory=[];data.history=[];data.disposals=[];save();render();alert("초기화되었습니다.")}
function scanner(target){
  const el=$(target),box=document.createElement("div");box.className="overlay";box.innerHTML='<div class="modal"><h3>바코드 촬영</h3><div class="camera"><video id="vid" autoplay muted playsinline></video><div class="frame"></div></div><div class="small" id="cam-msg">카메라 권한을 허용한 뒤 촬영 버튼을 누르세요.</div><div class="actions"><button class="btn primary" id="shot">촬영</button><button class="btn" id="close">닫기</button></div></div>';document.body.appendChild(box);
  const close=()=>{if(scannerStream)scannerStream.getTracks().forEach(t=>t.stop());scannerStream=null;box.remove()};$("#close").onclick=close;
  (async()=>{try{scannerStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});$("#vid").srcObject=scannerStream;await $("#vid").play()}catch(e){$("#cam-msg").textContent="카메라를 열 수 없습니다. HTTPS 주소와 카메라 권한을 확인하세요."}})();
  $("#shot").onclick=async()=>{let value="";
    try{if("BarcodeDetector" in window){const d=new BarcodeDetector({formats:["code_128","code_39","code_93","ean_13","ean_8","upc_a","upc_e","itf_14","codabar"]}),r=await d.detect($("#vid"));if(r?.length)value=r[0].rawValue}}catch(e){}
    if(!value){const m=prompt("자동 인식에 실패했습니다. 바코드번호를 직접 입력하세요.");if(m!==null)value=m.trim()}
    if(value){el.value=value;close()}
  };
}
function login(){
  const id=$("#login-id").value.trim(),pw=$("#login-pw").value,d={admin:{password:"admin1234",name:"관리자",role:"admin"},staff:{password:"staff1234",name:"직원",role:"user"}}[id];
  if(!d||d.password!==pw)return alert("아이디 또는 비밀번호가 맞지 않습니다.\n관리자: admin / admin1234\n사용자: staff / staff1234");
  user={id,name:d.name,role:d.role};$("#login-screen").style.display="none";$("#app").style.display="block";$("#user-name").textContent=d.name;load();render();
}
$("#login-btn").onclick=login;
$("#login-pw").addEventListener("keydown",e=>{if(e.key==="Enter")login()});
load();
</script>
</body>
</html>
