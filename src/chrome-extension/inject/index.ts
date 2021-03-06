import './index.scss'
import Skeleton from '../../core'
import { IgnoreAttrName, SkeletonRootId } from '../../core/consts'
import { copyData, download, getDemo } from './utils';

(function () {
  let _skltContainer: HTMLDivElement;
  let mutationObserver: MutationObserver;
  let skeleton: Skeleton;
  let tabId: number;

  const mutationObserverCb: MutationCallback = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {

        if (mutation.addedNodes?.length > 1
          || mutation.removedNodes?.length > 1) {
          alert('目前仅支持每次增删一个元素');  // TODO 多个元素，基准id还需要处理
          renderSkeleton();
          return;
        }
        if (mutation.addedNodes?.length && mutation.removedNodes?.length) {
          alert('暂不支持移动元素');
          renderSkeleton();
          return;
        }

        let addedList: number[];
        let removedList: number[];
        if (mutation.addedNodes) {
          addedList = [];
          Array.from(mutation.addedNodes).map(node => {
            addedList.push(Number((node.previousSibling as HTMLDivElement).id || -1))
          })
        }
        if (mutation.removedNodes) {
          removedList = [];
          Array.from(mutation.removedNodes).map(node => {
            removedList.push(Number((node as HTMLDivElement).id))
          })
        }

        skeleton.updateModuleMap({addedList, removedList});
        skeleton.saveRenderData(document.querySelector(`#${SkeletonRootId}`));
        renderSkeleton();
      }
    }
  }

  function getSkltContainer() {
    if (_skltContainer) return _skltContainer;
    _skltContainer = document.createElement('div');
    _skltContainer.id = SkeletonRootId

    document.body.appendChild(_skltContainer);

    mutationObserver = new MutationObserver(mutationObserverCb);

    return _skltContainer;
  }

  function clearSkltContainer() {
    if (_skltContainer) {
      document.body.removeChild(_skltContainer);
      _skltContainer = undefined;
    }
    mutationObserver && mutationObserver.disconnect();
    mutationObserver = undefined;
  }

  async function copySkeletonData() {
    if (!skeleton) return alert('请先生成骨架屏');
    const data = await skeleton.getDataString();
    if (!data) return alert('请先生成骨架屏');
    copyData(data);
    alert('骨架屏数据已拷贝到剪切板');
    console.log(data);
  }

  function saveSkeletonData() {
    const root = document.querySelector(`#${SkeletonRootId}`);
      if (root && skeleton) {
        skeleton.saveRenderData(root);
      }
  }

  async function generateSkeleton() {
    skeleton = new Skeleton()
    await renderSkeleton();
    cancleLoading();
  }

  async function renderSkeleton() {
    mutationObserver && mutationObserver.disconnect();
    getSkltContainer().innerHTML = `<div class="skeleton-x-mask"></div>`
      + await skeleton.getHtml();
    mutationObserver.observe(_skltContainer, {
      childList: true
    })
  }

  function sendMessage(message) {
    chrome.runtime.sendMessage({
      tag: 'content',
      tabId,
      ...message
    });
  }

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request?.tag === 'content') return;

    if (request.action === 'set-tab-id') { 
      tabId = request.tabId;
    }

    if (request.action === 'set-loading') {
      request.loading ? loading(true) : cancleLoading(true);
    }

    if (request.action === 'import-data') {
      skeleton = new Skeleton();
      if (skeleton.importRenderString(request.data)) {
        renderSkeleton();
      } else {
        alert('数据解析失败');
      }
    }
    if (request.action === 'generate-skeleton') {
      generateSkeleton();
    }
    if (request.action === 'clear-skeleton') {
      clearSkltContainer();
    }
    if (request.action === 'set-skeleton-container-opcity') {
      getSkltContainer().style.opacity = request.value;
    }
    if (request.action === 'export-data') {
      saveSkeletonData();
      copySkeletonData();
    }
    if (request.action === 'export-demo') {
      saveSkeletonData();

      if (!skeleton) return alert('请先生成骨架屏');

      const data = await skeleton.getDataString();
      
      if (!data) return alert('请先生成骨架屏');

      download({
        data: getDemo({ data }),
        filename: 'skeleton-demo.html'
      });
      copySkeletonData();
    }
  });

  let loadingEl: HTMLDivElement;

  function loading(fromMessage?: boolean) {
    if (!fromMessage) { sendMessage({action: 'set-loading', loading: true})}
    
    if (!loadingEl) {
      loadingEl = document.createElement('div');
      loadingEl.className = 'skeleton-x-loading'
      loadingEl.setAttribute(IgnoreAttrName, '');
      loadingEl.innerHTML = `<div class="lds-dual-ring"></div>`
    }
    if (!document.body.contains(loadingEl)) document.body.appendChild(loadingEl);
  }
  
  function cancleLoading(fromMessage?: boolean) {
    if (!fromMessage) {sendMessage({action: 'set-loading', loading: false})}
    loadingEl && document.body.removeChild(loadingEl);
  }
})()



