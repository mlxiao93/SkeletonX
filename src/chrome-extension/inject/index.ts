import './index.scss'
import Skeleton from '../../core'
import { SkeletonRootId } from '../../core/consts'
import { copyData } from './utils';

(function () {
  let _skltContainer: HTMLDivElement;
  let mutationObserver: MutationObserver;
  let skeleton: Skeleton;

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
    const data = await skeleton.getDataString();
    copyData(data);
    alert('骨架屏数据已拷贝到剪切板');
    console.log(data);
  }

  async function generateSkeleton() {
    skeleton = new Skeleton()
    await renderSkeleton();
  }

  async function renderSkeleton() {
    mutationObserver && mutationObserver.disconnect();
    getSkltContainer().innerHTML = `<div style="position: absolute; z-index: 9999998; background: #fff; left: 0; right: 0; top: 0; bottom: 0;"></div>`
      + await skeleton.getHtml();
    mutationObserver.observe(_skltContainer, {
      childList: true
    })
  }

  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'generate-skeleton') {
      generateSkeleton();
    }
    if (request.action === 'clear-skeleton') {
      clearSkltContainer();
    }
    if (request.action === 'set-skeleton-container-opcity') {
      getSkltContainer().style.opacity = request.data;
    }
    if (request.action === 'copy-skeleton') {
      const root = document.querySelector(`#${SkeletonRootId}`);
      if (root) {
        skeleton.saveRenderData(root);
      }
      copySkeletonData();
    }
  });
})()



