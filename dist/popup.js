const createBtn = document.querySelector('#btn-create');
const rangeInput = document.querySelector('#input-range');
const clearBtn = document.querySelector('#btn-clear');
const copyBtn = document.querySelector('#btn-copy');
let currentTabId;
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function ([tab]) {
  currentTabId = tab.id;
});

createBtn.onclick = () => {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'generate-skeleton'
  });
};

clearBtn.onclick = () => {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'clear-skeleton'
  });
};

copyBtn.onclick = () => {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'copy-skeleton'
  });
};

rangeInput.onchange = e => {
  console.log(rangeInput.value);
  chrome.tabs.sendMessage(currentTabId, {
    action: 'set-skeleton-container-opcity',
    data: Number(rangeInput.value) / 100
  });
};
