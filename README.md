<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WAREHOUSE STOCK CONTROL</title>
<style>
:root{
  --bg:#f5f6f8; --panel:#fff; --ink:#172033; --muted:#6f7785; --line:#dde2e8;
  --accent:#1d4ed8; --accent2:#0f766e; --danger:#b42318; --amber:#9a6700;
  --sidebar:#111827; --sidebar2:#1f2937; --white:#fff;
}
*{box-sizing:border-box}
body{margin:0;font-family:"Malgun Gothic","Noto Sans KR",Arial,sans-serif;background:var(--bg);color:var(--ink)}
button,input,select,textarea{font:inherit}
button{cursor:pointer}
.app{display:flex;min-height:100vh}
.sidebar{width:250px;background:linear-gradient(180deg,var(--sidebar),#0b1220);color:#dbe4ef;padding:22px 16px;position:sticky;top:0;height:100vh}
.brand{font-size:18px;font-weight:800;letter-spacing:.04em;margin:0 8px 5px}
.brand-sub{font-size:11px;color:#94a3b8;margin:0 8px 22px}
.nav button{width:100%;border:0;background:transparent;color:#cbd5e1;text-align:left;padding:12px 13px;border-radius:9px;margin:3px 0}
.nav button.active,.nav button:hover{background:#243044;color:#fff}
.sidebar-bottom{position:absolute;bottom:16px;left:16px;right:16px}
.user-chip{font-size:12px;color:#94a3b8;border-top:1px solid #273244;padding-top:15px}
.main{flex:1;min-width:0}
.topbar{height:70px;background:rgba(255,255,255,.94);backdrop-filter:blur(8px);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:sticky;top:0;z-index:5}
.top-title{font-size:15px;font-weight:700}
.top-actions{display:flex;gap:8px}
.container{padding:28px 30px 44px}
.page{display:none}.page.active{display:block}
h1{font-size:27px;letter-spacing:-.03em;margin:0 0 6px}
.subtitle{color:var(--muted);margin-bottom:24px;font-size:13px}
.kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-bottom:22px}
.kpi{background:var(--panel);border:1px solid var(--line);padding:18px;border-radius:12px}
.kpi .label{font-size:12px;color:var(--muted);margin-bottom:10px}.kpi .value{font-size:28px;font-weight:800;letter-spacing:-.03em}
.grid2{display:grid;grid-template-columns:1.5fr 1fr;gap:16px}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px}
.panel-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.panel-title h3{margin:0;font-size:14px}.muted{color:var(--muted);font-size:12px}
.toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:13px}
.toolbar .grow{flex:1}
.btn{border:1px solid var(--line);background:#fff;color:var(--ink);padding:8px 12px;border-radius:8px;font-weight:700;font-size:12px}
.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}.btn.dark{background:#172033;border-color:#172033;color:#fff}.btn.danger{color:var(--danger);border-color:#efc6c3}.btn.ghost{background:#f8fafc}
input,select,textarea{width:100%;border:1px solid #cfd6df;background:#fff;border-radius:8px;padding:9px 10px;outline:none}
input:focus,select:focus,textarea:focus{border-color:#8aa7e8;box-shadow:0 0 0 3px rgba(29,78,216,.08)}
.search{max-width:330px}
.table-wrap{overflow:auto;border:1px solid var(--line);border-radius:10px}
table{width:100%;border-collapse:collapse;min-width:900px}
th,td{padding:10px 11px;border-bottom:1px solid var(--line);font-size:12px;vertical-align:middle;white-space:nowrap}
th{background:#f7f8fa;color:#4b5563;text-align:left;font-size:11px;position:sticky;top:0}
td.right,th.right{text-align:right}
tr:last-child td{border-bottom:0}
.badge{display:inline-flex;align-items:center;padding:4px 7px;border-radius:999px;font-size:10px;font-weight:800}
.badge.stock{background:#e8f0ff;color:#1d4ed8}.badge.repair{background:#fff3df;color:#9a6700}
.badge.shop{background:#efe8ff;color:#6d28d9}.badge.product{background:#e7f7f1;color:#0f766e}
.badge.disposal{background:#fdecec;color:#b42318}.badge.ship{background:#eef2f7;color:#475569}
.form-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.form-grid .span2{grid-column:span 2}.form-grid .span4{grid-column:1/-1}
.form-label{font-size:11px;color:#667085;margin:0 0 5px}
.modal-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.45);display:none;align-items:center;justify-content:center;z-index:30;padding:18px}
.modal-backdrop.open{display:flex}.modal{width:min(920px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:14px;border:1px solid var(--line);padding:20px}
.modal h2{margin:0 0 16px;font-size:18px}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:18px}
.chart{height:260px;display:flex;align-items:flex-end;gap:14px;padding:10px 6px 22px}
.bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end}
.bar-stack{width:72%;max-width:65px;display:flex;flex-direction:column;justify-content:flex-end;height:190px;border-bottom:1px solid #cbd5e1}
.seg{min-height:3px}.seg.in{background:#1d4ed8}.seg.out{background:#64748b}.seg.rep{background:#d97706}.seg.disp{background:#b42318}.seg.prod{background:#0f766e}
.bar-label{font-size:10px;color:#667085;text-align:center}.bar-total{font-size:10px;font-weight:800}
.notice{padding:12px 14px;border:1px solid #dbe5f7;background:#f8fbff;border-radius:9px;color:#41556f;font-size:12px;margin-top:12px}
.empty{padding:32px;text-align:center;color:#7a8492;font-size:12px}
.footer-note{color:#8b95a3;font-size:11px;margin-top:14px}
/* A4 print / PDF report */
.pdf-report{display:none}
@media print{
  @page{size:A4;margin:12mm 11mm 14mm}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  html,body{background:#fff !important}
  body.pdf-print-mode>*:not(#pdfReportRoot){display:none !important}
  body.pdf-print-mode #pdfReportRoot{display:block !important}
}
#pdfReportRoot{font-family:"Malgun Gothic","Noto Sans KR",Arial,sans-serif;color:#152033;background:#fff}
.pdf-shell{width:100%;max-width:190mm;margin:0 auto;padding:2mm 0}
.pdf-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;border-bottom:2px solid #18212f;padding-bottom:12px;margin-bottom:14px}
.pdf-kicker{font-size:9px;letter-spacing:.18em;color:#607086;font-weight:800;margin-bottom:5px}
.pdf-title{font-size:24px;line-height:1.18;font-weight:900;letter-spacing:-.03em;margin:0}
.pdf-subtitle{font-size:11px;color:#667085;margin-top:6px}
.pdf-meta{text-align:right;font-size:10px;line-height:1.7;color:#596579;min-width:48mm}
.pdf-meta b{color:#1f2937}
.pdf-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0 14px}
.pdf-kpi{border:1px solid #dce2ea;background:#f8fafc;border-radius:8px;padding:10px 11px}
.pdf-kpi-label{font-size:8px;color:#6b7280;font-weight:700;margin-bottom:5px}
.pdf-kpi-value{font-size:18px;font-weight:900;letter-spacing:-.02em}
.pdf-section{margin-top:15px;break-inside:avoid}
.pdf-section-title{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid #cfd6df;padding-bottom:6px;margin-bottom:8px}
.pdf-section-title h3{font-size:12px;margin:0;font-weight:900}
.pdf-section-title span{font-size:9px;color:#7a8492}
.pdf-table{width:100%;border-collapse:collapse;font-size:8.3px;table-layout:auto}
.pdf-table th{background:#1b2432;color:#fff;padding:7px 4px;text-align:center;font-size:7.7px;border:1px solid #1b2432;white-space:nowrap}
.pdf-table td{padding:6px 4px;border:1px solid #e0e5eb;text-align:right;white-space:nowrap}
.pdf-table td:first-child{text-align:left;font-weight:800}
.pdf-table tr:nth-child(even) td{background:#fafbfc}
.pdf-total td{background:#eef2f6 !important;font-weight:900;border-top:1.5px solid #9da8b7}
.pdf-chart-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pdf-chart-box{border:1px solid #e0e5eb;border-radius:8px;padding:9px 10px;break-inside:avoid}
.pdf-chart-title{font-size:9px;font-weight:900;margin-bottom:8px}
.pdf-bar-row{display:grid;grid-template-columns:72px 1fr 34px;gap:6px;align-items:center;margin:5px 0}
.pdf-bar-label{font-size:8px;color:#4b5563;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pdf-bar-track{height:7px;background:#edf1f5;border-radius:999px;overflow:hidden}
.pdf-bar{height:100%;background:#253b68;border-radius:999px}
.pdf-bar-value{text-align:right;font-size:8px;font-weight:800}
.pdf-foot{margin-top:17px;padding-top:8px;border-top:1px solid #dfe4ea;display:flex;justify-content:space-between;font-size:8px;color:#7b8492}
.pdf-note{padding:8px 9px;background:#f8fafc;border:1px solid #e3e7ed;border-radius:8px;font-size:8.5px;color:#647084;line-height:1.6}
.pdf-page-break{break-before:page}
@media (max-width:1100px){.kpis{grid-template-columns:repeat(3,minmax(0,1fr))}.grid2{grid-template-columns:1fr}.form-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:760px){.app{display:block}.sidebar{width:100%;height:auto;position:static;padding:12px}.brand,.brand-sub,.sidebar-bottom{display:none}.nav{display:flex;overflow:auto;gap:4px}.nav button{width:auto;white-space:nowrap;margin:0}.topbar{padding:0 16px}.container{padding:20px 14px 30px}.kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.form-grid{grid-template-columns:1fr}.form-grid .span2,.form-grid .span4{grid-column:auto}}
</style>
</head>
<body>
<div class="app">
  <aside class="sidebar">
    <div class="brand" id="brandName">WAREHOUSE CONTROL</div>
    <div class="brand-sub">PRO INVENTORY MANAGEMENT</div>
    <nav class="nav">
      <button data-page="dashboard" class="active">대시보드</button>
      <button data-page="inventory">재고관리</button>
      <button data-page="transactions">입·출고 이력</button>
      <button data-page="repair">수리관리</button>
      <button data-page="reports">월간·연간 보고서</button>
      <button data-page="settings">설정</button>
    </nav>
    <div class="sidebar-bottom"><div class="user-chip">이 초기화본은 새 데이터로 시작합니다.<br>백업 파일을 직접 불러오기 전까지 기존 데이터가 없습니다.</div></div>
  </aside>

  <main class="main">
    <header class="topbar">
      <div class="top-title" id="topTitle">재고 운영 대시보드</div>
      <div class="top-actions">
        <button class="btn" onclick="openItemModal()">+ 재고 등록</button>
        <button class="btn primary" onclick="openTxModal()">+ 입·출고 등록</button>
      </div>
    </header>

    <section class="container">
      <div id="page-dashboard" class="page active">
        <h1>재고 운영 대시보드</h1>
        <div class="subtitle">현재 재고와 수리·상품화 흐름을 한 화면에서 관리합니다.</div>
        <div class="kpis" id="kpiArea"></div>
        <div class="grid2">
          <div class="panel">
            <div class="panel-title"><h3>품목별 현재 현황</h3><span class="muted">수량 기준</span></div>
            <div class="table-wrap"><table id="dashTable"></table></div>
          </div>
          <div class="panel">
            <div class="panel-title"><h3>이번 달 처리 현황</h3><span class="muted" id="dashMonth"></span></div>
            <div id="monthlyChart" class="chart"></div>
            <div class="footer-note">막대는 입고·출고·수리·폐기·상품화 건수를 품목별로 비교합니다.</div>
          </div>
        </div>
        <div class="notice">권장 업무 흐름: <b>A/S입고 → 수리기 창고입고 → 수리기 업체발송 → 수리완료/재입고 → 상품화완료 → 가맹점 출고</b>. 폐기 대상은 폐기 등록으로 별도 추적합니다.</div>
      </div>

      <div id="page-inventory" class="page">
        <h1>재고관리</h1><div class="subtitle">품목·바코드·모델·가맹점 등 모든 내용을 직접 편집할 수 있습니다.</div>
        <div class="toolbar">
          <input class="search" id="invSearch" placeholder="품목 / 바코드 / 모델 / 제조사 검색" oninput="renderInventory()">
          <select id="invStatus" onchange="renderInventory()"><option value="">전체 상태</option><option value="stock">일반재고</option><option value="repair">수리기 창고</option><option value="shop">수리업체</option><option value="product">상품화완료</option><option value="ship">출고</option><option value="disposal">폐기</option></select>
          <div class="grow"></div><button class="btn" onclick="exportCSV('inventory')">재고 CSV</button><button class="btn primary" onclick="openItemModal()">+ 재고 등록</button>
        </div>
        <div class="table-wrap"><table id="inventoryTable"></table></div>
      </div>

      <div id="page-transactions" class="page">
        <h1>입·출고 이력</h1><div class="subtitle">등록된 모든 변동내역을 수정하거나 삭제할 수 있습니다.</div>
        <div class="toolbar">
          <input class="search" id="txSearch" placeholder="검색" oninput="renderTransactions()">
          <select id="txMonth" onchange="renderTransactions()"></select>
          <div class="grow"></div><button class="btn" onclick="exportCSV('transactions')">이력 CSV</button><button class="btn primary" onclick="openTxModal()">+ 입·출고 등록</button>
        </div>
        <div class="table-wrap"><table id="txTable"></table></div>
      </div>

      <div id="page-repair" class="page">
        <h1>수리관리</h1><div class="subtitle">수리기 창고 → 업체발송 → 수리완료/재입고 흐름을 별도 관리합니다.</div>
        <div class="kpis" id="repairKpi"></div>
        <div class="panel">
          <div class="panel-title"><h3>수리 진행 품목</h3><span class="muted">수리기 창고 / 수리업체</span></div>
          <div class="table-wrap"><table id="repairTable"></table></div>
        </div>
      </div>

      <div id="page-reports" class="page">
        <h1>월간·연간 보고서</h1><div class="subtitle">거래 이력을 기준으로 자동 집계하며, 표의 원자료는 언제든 수정할 수 있습니다.</div>
        <div class="toolbar">
          <select id="reportYear" onchange="renderReports()"></select>
          <select id="reportMonth" onchange="renderReports()"><option value="">연간</option></select>
          <div class="grow"></div><button class="btn primary" onclick="downloadReportPDF()">PDF 다운로드</button>
        </div>
        <div class="panel"><div class="panel-title"><h3 id="reportTitle">분석 결과</h3></div><div class="table-wrap"><table id="reportTable"></table></div></div>
      </div>

      <div id="page-settings" class="page">
        <h1>설정</h1><div class="subtitle">프로그램의 제목, 품목, 데이터 백업을 직접 관리합니다.</div>
        <div class="grid2">
          <div class="panel">
            <div class="panel-title"><h3>기본 설정</h3></div>
            <div class="form-grid">
              <div class="span2"><div class="form-label">프로그램 명칭</div><input id="setTitle"></div>
              <div class="span2"><div class="form-label">회사/창고 명칭</div><input id="setSite"></div>
            </div>
            <div class="modal-actions"><button class="btn primary" onclick="saveSettings()">저장</button></div>
          </div>
          <div class="panel">
            <div class="panel-title"><h3>데이터 백업 / 복원</h3></div>
            <div class="toolbar"><button class="btn dark" onclick="backupJSON()">전체 데이터 백업</button><label class="btn">백업 파일 불러오기<input type="file" id="restoreFile" accept=".json" style="display:none" onchange="restoreJSON(event)"></label></div>
            <div class="notice">새로 받은 프로그램은 이전 프로그램의 재고/이력 데이터를 불러오지 않습니다. 필요한 경우에만 백업 파일을 직접 복원하세요.</div>
          </div>
        </div>
        <div class="panel" style="margin-top:16px">
          <div class="panel-title"><h3>품목 관리</h3><button class="btn" onclick="addCategory()">+ 품목 추가</button></div>
          <div class="table-wrap"><table id="catTable"></table></div>
        </div>
        <div class="panel" style="margin-top:16px">
          <div class="panel-title"><h3>초기화</h3><span class="muted">실수 방지를 위해 2단계 확인</span></div>
          <button class="btn danger" onclick="resetAll()">전체 데이터 삭제</button>
        </div>
      </div>
    </section>
  </main>
</div>

<div class="modal-backdrop" id="itemModal">
  <div class="modal">
    <h2 id="itemModalTitle">재고 등록</h2>
    <input type="hidden" id="itemId">
    <div class="form-grid">
      <div><div class="form-label">품목</div><select id="itemCategory"></select></div>
      <div><div class="form-label">바코드번호</div><input id="itemBarcode" placeholder="예: 880001234"></div>
      <div><div class="form-label">모델명</div><input id="itemModel"></div>
      <div><div class="form-label">제조사</div><input id="itemMaker"></div>
      <div><div class="form-label">가맹점</div><input id="itemFranchise"></div>
      <div><div class="form-label">채널</div><input id="itemChannel"></div>
      <div><div class="form-label">기본 재고</div><input id="itemStock" type="number" min="0" value="0"></div>
      <div><div class="form-label">수리기 창고</div><input id="itemRepair" type="number" min="0" value="0"></div>
      <div><div class="form-label">수리업체</div><input id="itemShop" type="number" min="0" value="0"></div>
      <div><div class="form-label">상품화완료</div><input id="itemProduct" type="number" min="0" value="0"></div>
      <div><div class="form-label">출고</div><input id="itemShipped" type="number" min="0" value="0"></div>
      <div><div class="form-label">폐기</div><input id="itemDisposed" type="number" min="0" value="0"></div>
      <div class="span4"><div class="form-label">비고</div><textarea id="itemNotes" rows="3"></textarea></div>
    </div>
    <div class="modal-actions"><button class="btn" onclick="closeModal('itemModal')">취소</button><button class="btn primary" onclick="saveItem()">저장</button></div>
  </div>
</div>

<div class="modal-backdrop" id="txModal">
  <div class="modal">
    <h2 id="txModalTitle">입·출고 등록</h2>
    <input type="hidden" id="txId">
    <div class="form-grid">
      <div><div class="form-label">일자</div><input id="txDate" type="date"></div>
      <div><div class="form-label">처리구분</div>
        <select id="txType">
          <option>A/S입고</option><option>수리기 창고입고</option><option>수리기 업체발송</option><option>수리완료/재입고</option><option>상품화완료</option><option>가맹점 출고</option><option>재입고</option><option>폐기</option><option>기초재고 조정</option>
        </select>
      </div>
      <div><div class="form-label">품목</div><select id="txCategory" onchange="syncTxItemOptions()">
          <option value="포스">포스</option>
          <option value="백업">백업</option>
          <option value="멀티패드">멀티패드</option>
          <option value="프린트">프린트</option>
          <option value="태블릿">태블릿</option>
          <option value="토스프론트">토스프론트</option>
        </select></div>
      <div><div class="form-label">수량</div><input id="txQty" type="number" min="1" value="1"></div>
      <div><div class="form-label">대상 품목</div><select id="txItem" onchange="onTxItemChange()"></select></div>
      <div><div class="form-label">바코드번호</div><input id="txBarcode" placeholder="직접 입력 가능"></div>
      <div><div class="form-label">모델명</div><input id="txModel" placeholder="직접 입력 가능"></div>
      <div><div class="form-label">업체/창고</div><input id="txPartner"></div>
      <div><div class="form-label">가맹점</div><input id="txFranchise"></div>
      <div class="span2"><div class="form-label">사유 / 처리내용</div><input id="txReason"></div>
      <div class="span2"><div class="form-label">비고</div><input id="txNotes"></div>
    </div>
    <div class="modal-actions"><button class="btn" onclick="closeModal('txModal')">취소</button><button class="btn primary" onclick="saveTx()">저장</button></div>
    <div class="notice"><b>품목 칸에서 포스 / 백업 / 멀티패드 / 프린트 / 태블릿 / 토스프론트를 바로 선택할 수 있습니다.</b> 초기화 상태에서도 표시되며, 모델명·바코드번호를 입력해 바로 등록할 수 있습니다.</div>
  </div>
</div>

<script>
const KEY="warehouse_control_clean_model_edit_v6_20260925";
const DEFAULT={
  settings:{title:"WAREHOUSE CONTROL",site:"중고장비 창고",categoryModels:{}},
  categories:["포스","백업","멀티패드","프린트","태블릿","토스프론트"],
  items:[],
  tx:[]
};
let db=loadDB();
if(!db || !Array.isArray(db.items) || !Array.isArray(db.tx) || !Array.isArray(db.categories)){
  db=structuredClone(DEFAULT);
  localStorage.setItem(KEY,JSON.stringify(db));
}
if(!db.settings.categoryModels) db.settings.categoryModels={};
if(!db || !Array.isArray(db.items) || !Array.isArray(db.tx) || !Array.isArray(db.categories)){
  db=structuredClone(DEFAULT);
  localStorage.setItem(KEY,JSON.stringify(db));
}

function loadDB(){try{return JSON.parse(localStorage.getItem(KEY))||structuredClone(DEFAULT)}catch(e){return structuredClone(DEFAULT)}}
function saveDB(){localStorage.setItem(KEY,JSON.stringify(db)); renderAll()}
function uid(p="id"){return p+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,7)}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function today(){return new Date().toISOString().slice(0,10)}
function monthKey(d){return d?.slice(0,7)||""}
function fmt(n){return Number(n||0).toLocaleString("ko-KR")}

function itemLabel(i){return `${i.category||""} | ${i.model||"모델 미입력"} | ${i.barcode||"바코드 없음"}`}
function ensureItemFields(i){["stock","repair","shop","product","shipped","disposed"].forEach(k=>i[k]=Number(i[k]||0)); return i}
function catTotal(cat,key){return db.items.filter(i=>i.category===cat).reduce((s,i)=>s+Number(i[key]||0),0)}

function txEffect(type,qty){
  // source -> target movement, represented as [fromKey,toKey]
  const map={
    "A/S입고":[null,"stock"],"수리기 창고입고":["stock","repair"],"수리기 업체발송":["repair","shop"],
    "수리완료/재입고":["shop","stock"],"상품화완료":["stock","product"],"가맹점 출고":["product","shipped"],
    "재입고":["shipped","stock"],"폐기":["stock","disposed"],"기초재고 조정":[null,"stock"]
  };
  return map[type]||[null,null]
}
function applyTx(item,type,qty,sign=1){
  const [from,to]=txEffect(type,qty); qty=Number(qty||0)*sign;
  if(from) item[from]-=qty;
  if(to) item[to]+=qty;
  ["stock","repair","shop","product","shipped","disposed"].forEach(k=>{if(item[k]<0)item[k]=0});
}

function openItemModal(id){
  document.getElementById("itemModal").classList.add("open");
  document.getElementById("itemModalTitle").textContent=id?"재고 정보 수정":"재고 등록";
  document.getElementById("itemId").value=id||"";
  const item=id?db.items.find(x=>x.id===id):null;
  fillCategorySelect(document.getElementById("itemCategory"), item?.category);
  const m=document.getElementById;
  ["itemBarcode","itemModel","itemMaker","itemFranchise","itemChannel","itemNotes"].forEach(k=>m(k).value=item?.[k]||"");
  m("itemStock").value=item?.stock??0; m("itemRepair").value=item?.repair??0; m("itemShop").value=item?.shop??0;
  m("itemProduct").value=item?.product??0; m("itemShipped").value=item?.shipped??0; m("itemDisposed").value=item?.disposed??0;
}
function saveItem(){
  const m=id=>document.getElementById(id);
  const id=m("itemId").value;
  const data={id:id||uid("item"),category:m("itemCategory").value,barcode:m("itemBarcode").value.trim(),model:m("itemModel").value.trim(),maker:m("itemMaker").value.trim(),franchise:m("itemFranchise").value.trim(),channel:m("itemChannel").value.trim(),stock:+m("itemStock").value||0,repair:+m("itemRepair").value||0,shop:+m("itemShop").value||0,product:+m("itemProduct").value||0,shipped:+m("itemShipped").value||0,disposed:+m("itemDisposed").value||0,notes:m("itemNotes").value.trim(),updatedAt:new Date().toISOString()};
  const idx=db.items.findIndex(x=>x.id===id); if(idx>=0) db.items[idx]=data; else db.items.push(data);
  closeModal("itemModal"); saveDB();
}
function openTxModal(id){
  document.getElementById("txModal").classList.add("open");
  document.getElementById("txModalTitle").textContent=id?"이력 수정":"입·출고 등록";
  const m=document.getElementById, t=id?db.tx.find(x=>x.id===id):null;
  const item=t?db.items.find(x=>x.id===t.itemId):null;

  m("txId").value=id||"";
  m("txDate").value=t?.date||today();
  m("txQty").value=t?.qty||1;
  m("txType").value=t?.type||"A/S입고";

  const category=t?.category||item?.category||"포스";
  m("txCategory").value=category;
  syncTxItemOptions(t?.itemId);

  m("txBarcode").value=item?.barcode||"";
  m("txModel").value=item?.model||"";
  m("txPartner").value=t?.partner||"";
  m("txFranchise").value=t?.franchise||"";
  m("txReason").value=t?.reason||"";
  m("txNotes").value=t?.notes||"";
}

function syncTxItemOptions(selected){
  const cat=document.getElementById("txCategory").value;
  const sel=document.getElementById("txItem");
  const arr=db.items.filter(i=>i.category===cat);

  // Always-visible direct category options. This is the main fix.
  const allCats=["포스","백업","멀티패드","프린트","태블릿","토스프론트"];
  let options = allCats.map(c =>
    `<option value="__category__${esc(c)}">${esc(c)}</option>`
  ).join("");

  // Existing model/barcode records for the selected category are added below.
  if(arr.length){
    options += `<optgroup label="${esc(cat)} 등록품목">`;
    options += arr.map(i =>
      `<option value="${i.id}">${esc((i.model||"모델 미입력")+" | "+(i.barcode||"바코드 없음"))}</option>`
    ).join("");
    options += `</optgroup>`;
  }

  sel.innerHTML=options;

  if(selected && arr.some(i=>i.id===selected)){
    sel.value=selected;
  }else{
    sel.value="__category__"+cat;
  }
  onTxItemChange();
}

function onTxItemChange(){
  const id=document.getElementById("txItem").value;
  const barcode=document.getElementById("txBarcode");
  const model=document.getElementById("txModel");

  if(id && !id.startsWith("__category__")){
    const item=db.items.find(i=>i.id===id);
    if(item){
      barcode.value=item.barcode||"";
      model.value=item.model||"";
      return;
    }
  }

  barcode.value="";
  model.value="";
}

function saveTx(){
  const m=id=>document.getElementById(id);
  const txId=m("txId").value;
  let itemId=m("txItem").value;
  let item=db.items.find(x=>x.id===itemId);

  let category=m("txCategory").value;
  const qty=Number(m("txQty").value||0);
  const barcode=m("txBarcode").value.trim();
  const model=m("txModel").value.trim();

  if(itemId.startsWith("__category__")){
    category=itemId.replace("__category__","");
  }

  if(!category){
    alert("품목을 선택해 주세요.");
    return;
  }
  if(!model){
    alert("모델명을 입력해 주세요.");
    m("txModel").focus();
    return;
  }
  if(qty<=0){
    alert("수량을 1 이상 입력해 주세요.");
    m("txQty").focus();
    return;
  }

  // New item from direct category selection.
  if(!item && itemId.startsWith("__category__")){
    item={
      id:uid("item"),
      category,
      barcode,
      model,
      maker:"",
      franchise:m("txFranchise").value.trim(),
      channel:"",
      stock:0, repair:0, shop:0, product:0, shipped:0, disposed:0,
      notes:m("txReason").value.trim()||m("txNotes").value.trim(),
      updatedAt:new Date().toISOString()
    };
    db.items.push(item);
    itemId=item.id;
  }

  if(!item){
    alert("선택한 품목을 찾을 수 없습니다.");
    return;
  }

  item.category=category;
  item.barcode=barcode;
  item.model=model;
  item.franchise=m("txFranchise").value.trim() || item.franchise || "";
  item.updatedAt=new Date().toISOString();

  const data={
    id:txId||uid("tx"),
    date:m("txDate").value||today(),
    type:m("txType").value,
    category,
    qty,
    itemId,
    partner:m("txPartner").value.trim(),
    franchise:m("txFranchise").value.trim(),
    reason:m("txReason").value.trim(),
    notes:m("txNotes").value.trim()
  };

  if(txId){
    const old=db.tx.find(x=>x.id===txId);
    const oldItem=old?db.items.find(x=>x.id===old.itemId):null;
    if(oldItem) applyTx(oldItem,old.type,old.qty,-1);
    const idx=db.tx.findIndex(x=>x.id===txId);
    if(idx>=0) db.tx[idx]=data;
  }else{
    db.tx.push(data);
  }

  applyTx(item,data.type,data.qty,1);
  closeModal("txModal");
  saveDB();
}

function deleteTx(id){
  const t=db.tx.find(x=>x.id===id); if(!t)return;
  if(!confirm("이 이력을 삭제하고 재고 변동도 되돌릴까요?"))return;
  const item=db.items.find(x=>x.id===t.itemId); if(item)applyTx(item,t.type,t.qty,-1);
  db.tx=db.tx.filter(x=>x.id!==id); saveDB();
}
function deleteItem(id){
  if(!confirm("재고 품목을 삭제할까요? 이 품목의 거래이력은 유지됩니다."))return;
  db.items=db.items.filter(x=>x.id!==id); saveDB();
}

function fillCategorySelect(sel,val){
  sel.innerHTML=db.categories.map(c=>`<option ${c===val?"selected":""}>${esc(c)}</option>`).join("");
}
function badge(k,label){
  return `<span class="badge ${k}">${label}</span>`
}
function statusSummary(i){
  const parts=[]; if(i.stock)parts.push(badge("stock","일반 "+fmt(i.stock))); if(i.repair)parts.push(badge("repair","수리기 "+fmt(i.repair)));
  if(i.shop)parts.push(badge("shop","업체 "+fmt(i.shop))); if(i.product)parts.push(badge("product","상품화 "+fmt(i.product)));
  if(i.shipped)parts.push(badge("ship","출고 "+fmt(i.shipped))); if(i.disposed)parts.push(badge("disposal","폐기 "+fmt(i.disposed)));
  return parts.join(" ");
}
function renderDashboard(){
  const total=k=>db.items.reduce((s,i)=>s+Number(i[k]||0),0);
  const vals=[["총 보유재고",total("stock")],["수리기 창고",total("repair")],["수리업체",total("shop")],["상품화완료",total("product")],["누적 폐기",total("disposed")]];
  document.getElementById("kpiArea").innerHTML=vals.map(([l,v])=>`<div class="kpi"><div class="label">${l}</div><div class="value">${fmt(v)}</div></div>`).join("");
  document.getElementById("dashMonth").textContent=new Date().toISOString().slice(0,7);
  let h="<tr><th>품목</th><th class='right'>일반재고</th><th class='right'>수리기</th><th class='right'>업체</th><th class='right'>상품화</th><th class='right'>출고</th><th class='right'>폐기</th></tr>";
  db.categories.forEach(c=>{h+=`<tr><td><b>${esc(c)}</b></td><td class="right">${fmt(catTotal(c,"stock"))}</td><td class="right">${fmt(catTotal(c,"repair"))}</td><td class="right">${fmt(catTotal(c,"shop"))}</td><td class="right">${fmt(catTotal(c,"product"))}</td><td class="right">${fmt(catTotal(c,"shipped"))}</td><td class="right">${fmt(catTotal(c,"disposed"))}</td></tr>`});
  document.getElementById("dashTable").innerHTML=h;
  renderMonthlyChart();
}
function renderMonthlyChart(){
  const ym=new Date().toISOString().slice(0,7), types=["A/S입고","가맹점 출고","수리기 업체발송","폐기","상품화완료"];
  const cols=db.categories.map(c=>{
    const vals=types.map(t=>db.tx.filter(x=>monthKey(x.date)===ym&&x.category===c&&x.type===t).reduce((s,x)=>s+x.qty,0));
    return {c,vals,total:vals.reduce((a,b)=>a+b,0)}
  });
  const max=Math.max(1,...cols.map(x=>x.total));
  document.getElementById("monthlyChart").innerHTML=cols.map(x=>{
    const [a,b,c,d,e]=x.vals, pieces=[["in",a],["out",b],["rep",c],["disp",d],["prod",e]];
    return `<div class="bar-col"><div class="bar-total">${fmt(x.total)}</div><div class="bar-stack">${pieces.map(([cl,v])=>`<div class="seg ${cl}" style="height:${Math.max(3,v/max*180)}px;opacity:${v?1:.12}"></div>`).join("")}</div><div class="bar-label">${esc(x.c)}</div></div>`
  }).join("");
}
function renderInventory(){
  const q=(document.getElementById("invSearch").value||"").toLowerCase(), st=document.getElementById("invStatus").value;
  const arr=db.items.filter(i=>{
    const hit=[i.category,i.barcode,i.model,i.maker,i.franchise,i.channel,i.notes].join(" ").toLowerCase().includes(q);
    const ok=!st || (i[st]||0)>0;
    return hit&&ok;
  });
  let h="<tr><th>품목</th><th>바코드</th><th>모델</th><th>제조사</th><th>가맹점</th><th>상태 수량</th><th>수정</th></tr>";
  h+=arr.map(i=>`<tr><td><b>${esc(i.category)}</b></td><td>${esc(i.barcode)}</td><td>${esc(i.model)}</td><td>${esc(i.maker)}</td><td>${esc(i.franchise)}</td><td>${statusSummary(i)}</td><td><button class="btn" onclick="openItemModal('${i.id}')">수정</button> <button class="btn danger" onclick="deleteItem('${i.id}')">삭제</button></td></tr>`).join("");
  document.getElementById("inventoryTable").innerHTML=h;
}
function renderTransactions(){
  const q=(document.getElementById("txSearch").value||"").toLowerCase(), mk=document.getElementById("txMonth").value;
  const arr=[...db.tx].sort((a,b)=>b.date.localeCompare(a.date)).filter(t=>{
    const item=db.items.find(i=>i.id===t.itemId), txt=[t.date,t.type,t.category,t.partner,t.franchise,t.reason,t.notes,item?.barcode,item?.model].join(" ").toLowerCase();
    return txt.includes(q)&&(!mk||monthKey(t.date)===mk);
  });
  let h="<tr><th>일자</th><th>구분</th><th>품목</th><th class='right'>수량</th><th>업체/창고</th><th>가맹점</th><th>처리내용</th><th>수정</th></tr>";
  h+=arr.map(t=>{const i=db.items.find(x=>x.id===t.itemId); return `<tr><td>${esc(t.date)}</td><td><b>${esc(t.type)}</b></td><td>${esc(t.category)} / ${esc(i?.model||"")}</td><td class="right">${fmt(t.qty)}</td><td>${esc(t.partner)}</td><td>${esc(t.franchise)}</td><td>${esc(t.reason||t.notes)}</td><td><button class="btn" onclick="openTxModal('${t.id}')">수정</button> <button class="btn danger" onclick="deleteTx('${t.id}')">삭제</button></td></tr>`}).join("");
  document.getElementById("txTable").innerHTML=h;
}
function renderRepair(){
  const repair=db.items.reduce((s,i)=>s+i.repair,0), shop=db.items.reduce((s,i)=>s+i.shop,0), complete=db.items.reduce((s,i)=>s+i.product,0);
  document.getElementById("repairKpi").innerHTML=[["수리기 창고",repair],["수리업체",shop],["상품화완료",complete]].map(([l,v])=>`<div class="kpi"><div class="label">${l}</div><div class="value">${fmt(v)}</div></div>`).join("");
  const arr=db.items.filter(i=>i.repair||i.shop);
  let h="<tr><th>품목</th><th>바코드</th><th>모델</th><th class='right'>수리기 창고</th><th class='right'>수리업체</th><th>빠른처리</th></tr>";
  h+=arr.map(i=>`<tr><td>${esc(i.category)}</td><td>${esc(i.barcode)}</td><td>${esc(i.model)}</td><td class="right">${fmt(i.repair)}</td><td class="right">${fmt(i.shop)}</td><td><button class="btn" onclick="openQuickTx('${i.id}','수리기 업체발송')">업체발송</button> <button class="btn" onclick="openQuickTx('${i.id}','수리완료/재입고')">재입고</button></td></tr>`).join("");
  document.getElementById("repairTable").innerHTML=h;
}
function openQuickTx(itemId,type){openTxModal();document.getElementById("txCategory").value=db.items.find(i=>i.id===itemId)?.category;syncTxItemOptions(itemId);document.getElementById("txType").value=type}
function buildMonths(){
  const months=[...new Set(db.tx.map(t=>monthKey(t.date)).filter(Boolean))].sort().reverse(); const sel=document.getElementById("txMonth");
  sel.innerHTML=`<option value="">전체 기간</option>`+months.map(m=>`<option>${m}</option>`).join("");
  const years=[...new Set(db.tx.map(t=>t.date?.slice(0,4)).filter(Boolean))].sort().reverse(); const rs=document.getElementById("reportYear");
  rs.innerHTML=(years.length?years:[""+new Date().getFullYear()]).map(y=>`<option>${y}</option>`).join("");
  const rm=document.getElementById("reportMonth");
  const prev=rm.value;
  rm.innerHTML=`<option value="">연간</option>`+Array.from({length:12},(_,i)=>{const m=String(i+1).padStart(2,"0"); return `<option value="${m}">${m}월</option>`}).join("");
  if(prev) rm.value=prev;
}
function renderReports(){
  buildMonths();
  const y=document.getElementById("reportYear").value, m=document.getElementById("reportMonth").value;
  const title=m?`${y}년 ${String(m).padStart(2,"0")}월 월간 보고서`:`${y}년 연간 보고서`;
  document.getElementById("reportTitle").textContent=title;
  const arr=db.tx.filter(t=>t.date?.slice(0,4)===y&&(!m||t.date?.slice(5,7)===String(m).padStart(2,"0")));
  const types=["A/S입고","수리기 창고입고","수리기 업체발송","수리완료/재입고","상품화완료","가맹점 출고","재입고","폐기"];
  let h="<tr><th>품목</th>"+types.map(x=>`<th class='right'>${x}</th>`).join("")+"<th class='right'>총 처리량</th></tr>";
  db.categories.forEach(c=>{let row=types.map(t=>arr.filter(x=>x.category===c&&x.type===t).reduce((s,x)=>s+x.qty,0)); h+=`<tr><td><b>${esc(c)}</b></td>`+row.map(v=>`<td class="right">${fmt(v)}</td>`).join("")+`<td class="right"><b>${fmt(row.reduce((a,b)=>a+b,0))}</b></td></tr>`});
  h+=`<tr><td><b>합계</b></td>`; types.forEach(t=>h+=`<td class="right"><b>${fmt(arr.filter(x=>x.type===t).reduce((s,x)=>s+x.qty,0))}</b></td>`); h+=`<td class="right"><b>${fmt(arr.reduce((s,x)=>s+x.qty,0))}</b></td></tr>`;
  document.getElementById("reportTable").innerHTML=h;
}
function renderSettings(){
  document.getElementById("setTitle").value=db.settings.title; document.getElementById("setSite").value=db.settings.site;
  let h="<tr><th>품목명</th><th>기본 모델명</th><th>처리</th></tr>";
  h+=db.categories.map((c,i)=>`<tr>
    <td><input value="${esc(c)}" onchange="renameCategory(${i},this.value)"></td>
    <td><input value="${esc(db.settings.categoryModels[c]||"")}" placeholder="기본 모델명 입력" onchange="saveCategoryModel(${i},this.value)"></td>
    <td><button class="btn danger" onclick="removeCategory(${i})">삭제</button></td>
  </tr>`).join("");
  document.getElementById("catTable").innerHTML=h;
}
function saveSettings(){db.settings.title=document.getElementById("setTitle").value.trim()||"WAREHOUSE CONTROL";db.settings.site=document.getElementById("setSite").value.trim();saveDB();alert("설정이 저장되었습니다.")}
function saveCategoryModel(i,v){
  const category=db.categories[i];
  if(!db.settings.categoryModels) db.settings.categoryModels={};
  db.settings.categoryModels[category]=String(v||"").trim();
  localStorage.setItem(KEY,JSON.stringify(db));
  renderSettings();
}
function addCategory(){
  const n=prompt("새 품목명을 입력하세요.\n예: 모니터");
  if(!n)return;
  const category=n.trim();
  if(!category)return;
  if(db.categories.includes(category))return alert("이미 존재하는 품목입니다.");

  const model=prompt("기본 모델명을 입력하세요.\n예: XYZ-1000");
  if(model===null)return;
  const modelName=model.trim();

  db.categories.push(category);
  if(!db.settings.categoryModels) db.settings.categoryModels={};
  db.settings.categoryModels[category]=modelName;
  saveDB();
  alert(`품목 "${category}"가 추가되었습니다.\n기본 모델명: ${modelName||"미입력"}`);
}
function renameCategory(i,v){
  v=v.trim();
  if(!v)return;
  const old=db.categories[i];
  if(v!==old && db.categories.includes(v))return alert("이미 존재하는 품목명입니다.");
  db.categories[i]=v;
  db.items.forEach(x=>{if(x.category===old)x.category=v});
  db.tx.forEach(x=>{if(x.category===old)x.category=v});
  if(!db.settings.categoryModels) db.settings.categoryModels={};
  if(db.settings.categoryModels[old]!==undefined){
    db.settings.categoryModels[v]=db.settings.categoryModels[old];
    delete db.settings.categoryModels[old];
  }
  saveDB();
}
function removeCategory(i){
  if(db.categories.length<=1)return alert("최소 1개의 품목은 남겨야 합니다.");
  const c=db.categories[i];
  if(db.items.some(x=>x.category===c))return alert("재고 데이터가 있는 품목은 먼저 재고를 다른 품목으로 변경하세요.");
  db.categories.splice(i,1);
  delete db.settings.categoryModels[c];
  saveDB();
}
function backupJSON(){const blob=new Blob([JSON.stringify(db,null,2)],{type:"application/json"}), a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`warehouse_backup_${today()}.json`;a.click();URL.revokeObjectURL(a.href)}
function restoreJSON(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const obj=JSON.parse(r.result);if(!obj.items||!obj.tx||!obj.categories)throw Error();db=obj;saveDB();alert("백업을 복원했습니다.")}catch(_){alert("올바른 백업 파일이 아닙니다.")}};r.readAsText(f)}
function exportCSV(kind){
  let rows=[];
  if(kind==="inventory"){rows=[["품목","바코드번호","모델","제조사","가맹점","채널","일반재고","수리기창고","수리업체","상품화완료","출고","폐기","비고"],...db.items.map(i=>[i.category,i.barcode,i.model,i.maker,i.franchise,i.channel,i.stock,i.repair,i.shop,i.product,i.shipped,i.disposed,i.notes])];}
  else if(kind==="transactions"){rows=[["일자","구분","품목","바코드","모델","수량","업체/창고","가맹점","처리내용","비고"],...db.tx.map(t=>{const i=db.items.find(x=>x.id===t.itemId)||{};return[t.date,t.type,t.category,i.barcode,i.model,t.qty,t.partner,t.franchise,t.reason,t.notes]})]}
  else {const table=document.getElementById("reportTable"); rows=[...table.rows].map(r=>[...r.cells].map(c=>c.innerText));}
  const csv="\ufeff"+rows.map(r=>r.map(v=>`"${String(v??"").replace(/"/g,'""')}"`).join(",")).join("\r\n");
  const blob=new Blob([csv],{type:"text/csv;charset=utf-8"}), a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`${kind}_${today()}.csv`;a.click();URL.revokeObjectURL(a.href)
}
function reportContext(){
  const y=document.getElementById("reportYear").value||String(new Date().getFullYear());
  const m=document.getElementById("reportMonth").value||"";
  const label=m?`${y}년 ${m}월`:`${y}년 연간`;
  const arr=db.tx.filter(t=>t.date?.slice(0,4)===y&&(!m||t.date?.slice(5,7)===m));
  return {y,m,label,arr};
}
function buildPDFReportHTML(){
  const {label,arr}=reportContext();
  const title=db.settings.title||"WAREHOUSE CONTROL";
  const site=db.settings.site||"중고장비 창고";
  const types=["A/S입고","수리기 창고입고","수리기 업체발송","수리완료/재입고","상품화완료","가맹점 출고","재입고","폐기"];
  const totals=types.map(t=>[t,arr.filter(x=>x.type===t).reduce((s,x)=>s+Number(x.qty||0),0)]);
  const totalProcessed=totals.reduce((s,x)=>s+x[1],0);
  const disposal=totals.find(x=>x[0]==="폐기")?.[1]||0;
  const shipped=totals.find(x=>x[0]==="가맹점 출고")?.[1]||0;
  const restock=totals.find(x=>x[0]==="재입고")?.[1]||0;
  const max=Math.max(1,...totals.map(x=>x[1]));
  const bars=totals.map(([t,v])=>`<div class="pdf-bar-row"><div class="pdf-bar-label">${esc(t)}</div><div class="pdf-bar-track"><div class="pdf-bar" style="width:${(v/max*100).toFixed(1)}%"></div></div><div class="pdf-bar-value">${fmt(v)}</div></div>`).join("");
  let rows="";
  db.categories.forEach(c=>{
    const vals=types.map(t=>arr.filter(x=>x.category===c&&x.type===t).reduce((s,x)=>s+Number(x.qty||0),0));
    const sum=vals.reduce((a,b)=>a+b,0);
    rows+=`<tr><td>${esc(c)}</td>${vals.map(v=>`<td>${fmt(v)}</td>`).join("")}<td>${fmt(sum)}</td></tr>`;
  });
  rows+=`<tr class="pdf-total"><td>합계</td>${totals.map(([,v])=>`<td>${fmt(v)}</td>`).join("")}<td>${fmt(totalProcessed)}</td></tr>`;
  let stockRows="";
  db.categories.forEach(c=>{
    const stock=catTotal(c,"stock"), repair=catTotal(c,"repair"), shop=catTotal(c,"shop"), product=catTotal(c,"product"), shippedStock=catTotal(c,"shipped"), disposed=catTotal(c,"disposed");
    const op=stock+repair+shop+product;
    stockRows+=`<tr><td>${esc(c)}</td><td>${fmt(stock)}</td><td>${fmt(repair)}</td><td>${fmt(shop)}</td><td>${fmt(product)}</td><td>${fmt(shippedStock)}</td><td>${fmt(disposed)}</td><td>${fmt(op)}</td></tr>`;
  });
  return `<div class="pdf-shell">
    <div class="pdf-head">
      <div><div class="pdf-kicker">INVENTORY OPERATIONS REPORT</div><h1 class="pdf-title">${esc(title)}</h1><div class="pdf-subtitle">${esc(site)} · ${esc(label)} 재고 운영 및 처리 실적</div></div>
      <div class="pdf-meta"><div><b>보고기간</b> ${esc(label)}</div><div><b>작성일</b> ${today()}</div><div><b>대상</b> 중고 재고 운영 데이터</div></div>
    </div>
    <div class="pdf-kpis">
      <div class="pdf-kpi"><div class="pdf-kpi-label">총 처리량</div><div class="pdf-kpi-value">${fmt(totalProcessed)}</div></div>
      <div class="pdf-kpi"><div class="pdf-kpi-label">가맹점 출고</div><div class="pdf-kpi-value">${fmt(shipped)}</div></div>
      <div class="pdf-kpi"><div class="pdf-kpi-label">재입고</div><div class="pdf-kpi-value">${fmt(restock)}</div></div>
      <div class="pdf-kpi"><div class="pdf-kpi-label">폐기</div><div class="pdf-kpi-value">${fmt(disposal)}</div></div>
    </div>
    <div class="pdf-chart-grid">
      <div class="pdf-chart-box"><div class="pdf-chart-title">처리 유형별 실적</div>${bars}</div>
      <div class="pdf-chart-box"><div class="pdf-chart-title">보고서 기준 안내</div><div class="pdf-note">거래 이력에 등록된 ${esc(label)} 기간의 처리량을 기준으로 집계했습니다. 재고 현황은 보고서 생성 시점의 현재 재고를 표시합니다. 원자료가 수정되면 PDF를 다시 다운로드하여 최신 상태를 반영할 수 있습니다.</div></div>
    </div>
    <div class="pdf-section">
      <div class="pdf-section-title"><h3>1. 품목별 처리 실적</h3><span>${fmt(totalProcessed)} 건</span></div>
      <table class="pdf-table"><thead><tr><th>품목</th>${types.map(t=>`<th>${esc(t)}</th>`).join("")}<th>총 처리량</th></tr></thead><tbody>${rows}</tbody></table>
    </div>
    <div class="pdf-section pdf-page-break">
      <div class="pdf-section-title"><h3>2. 현재 재고 현황</h3><span>보고서 생성 시점</span></div>
      <table class="pdf-table"><thead><tr><th>품목</th><th>일반재고</th><th>수리기</th><th>수리업체</th><th>상품화</th><th>출고</th><th>폐기</th><th>운영재고</th></tr></thead><tbody>${stockRows}</tbody></table>
    </div>
    <div class="pdf-foot"><span>${esc(title)} · ${esc(site)}</span><span>자동 생성 보고서</span></div>
  </div>`;
}
function downloadReportPDF(){
  const root=document.createElement("div"); root.id="pdfReportRoot"; root.className="pdf-report"; root.innerHTML=buildPDFReportHTML(); document.body.appendChild(root);
  const styles=Array.from(document.querySelectorAll("style")).map(x=>x.textContent).join("\n");
  const ctx=reportContext();
  const w=window.open("", "_blank", "width=1100,height=900");
  if(!w){root.remove(); alert("팝업이 차단되었습니다. 브라우저의 팝업 허용 후 다시 눌러주세요."); return;}
  w.document.open();
  w.document.write(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>${esc(db.settings.title||"창고재고관리")} - ${esc(ctx.label)} 보고서</title><style>${styles}\n#pdfReportRoot{display:block!important}.pdf-report{display:block!important}</style></head><body>${root.innerHTML}</body></html>`);
  w.document.close();
  setTimeout(()=>{w.focus();w.print();},500);
  root.remove();
}
function resetAll(){if(prompt("초기화 확인을 위해 DELETE를 입력하세요.")!=="DELETE")return;localStorage.removeItem(KEY);db=loadDB();renderAll();alert("초기화되었습니다.")}
function closeModal(id){document.getElementById(id).classList.remove("open")}

document.querySelectorAll(".nav button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".nav button").forEach(x=>x.classList.remove("active")); b.classList.add("active");
  document.querySelectorAll(".page").forEach(x=>x.classList.remove("active")); document.getElementById("page-"+b.dataset.page).classList.add("active");
  document.getElementById("topTitle").textContent=b.textContent;
  if(b.dataset.page==="inventory")renderInventory(); if(b.dataset.page==="transactions")renderTransactions(); if(b.dataset.page==="repair")renderRepair(); if(b.dataset.page==="reports")renderReports(); if(b.dataset.page==="settings")renderSettings();
}));


function renderAll(){
  document.title=db.settings.title; document.getElementById("brandName").textContent=db.settings.title;
  renderDashboard(); renderInventory(); renderTransactions(); renderRepair(); renderReports(); renderSettings();
}
renderAll();
</script>
</body>
</html>
