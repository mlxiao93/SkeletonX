import './popup.scss'

const createBtn = document.querySelector('#btn-create') as HTMLButtonElement;
const clearBtn = document.querySelector('#btn-clear') as HTMLButtonElement;
const exportDataBtn = document.querySelector('#btn-export-data') as HTMLButtonElement;
const importDataBtn = document.querySelector('#btn-import-data') as HTMLButtonElement;
const exportDemoBtn = document.querySelector('#btn-export-demo') as HTMLButtonElement;
const loadingEl = document.querySelector('.loading') as HTMLButtonElement;
const opcitySelect = document.querySelector('#opcity-select') as HTMLSelectElement;

let tabId: number;
chrome.tabs.query({active: true, currentWindow: true}, function([tab]) {
  tabId = tab.id;
  sendMessage({
    action: 'set-tab-id',
    tabId
  })
});

function sendMessage(messsage) {
  chrome.tabs.sendMessage(tabId, {
    tag: 'popup',
    ...messsage
  })
}

chrome.runtime.onMessage.addListener((request) => {
  if (request?.tag === 'topup') return;
  if (request?.tabId !== tabId) return;
  if (request.action === 'set-loading') {
    request.loading ? loading(true) : cancleLoading(true);
  }
});


function loading(fromMessage?: boolean) {
  if (!fromMessage) { sendMessage({action: 'set-loading', loading: true})}
  loadingEl.style.display = 'flex';
}

function cancleLoading(fromMessage?: boolean) {
  if (!fromMessage) {sendMessage({action: 'set-loading', loading: false})}
  loadingEl.style.display = 'none';
}

createBtn.onclick = () => {
  loading();
  sendMessage({
    action: 'generate-skeleton',
  })
}

clearBtn.onclick = () => {
  sendMessage({
    action: 'clear-skeleton'
  })
}

exportDataBtn.onclick = () => {
  sendMessage({
    action: 'export-data'
  })
}

exportDemoBtn.onclick = () => {
  sendMessage({
    action: 'export-demo'
  })
}

opcitySelect.onchange = (e) => {
  
  sendMessage({
    action: 'set-skeleton-container-opcity',
    value: Number(opcitySelect.value)
  })
}

importDataBtn.onclick = (e) => {
  const data = prompt('请输入数据进行二次编辑 (和导出的数据一致)');
  console.log(data);
  sendMessage({
    action: 'import-data',
    data
  })
} 