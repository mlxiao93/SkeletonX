const createBtn = document.querySelector('#btn-create') as HTMLButtonElement;
const rangeInput = document.querySelector('#input-range') as HTMLInputElement;
const clearBtn = document.querySelector('#btn-clear') as HTMLButtonElement
const copyBtn = document.querySelector('#btn-copy') as HTMLButtonElement

let currentTabId: number;

chrome.tabs.query({active: true, currentWindow: true}, function([tab]) {
  currentTabId = tab.id;
});

createBtn.onclick = () => {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'generate-skeleton'
  })
}

clearBtn.onclick = () => {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'clear-skeleton'
  })
}

copyBtn.onclick = () => {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'copy-skeleton'
  })
}

rangeInput.onchange = (e) => {
  console.log(rangeInput.value);

  chrome.tabs.sendMessage(currentTabId, {
    action: 'set-skeleton-container-opcity',
    data: Number(rangeInput.value) / 100
  })
}