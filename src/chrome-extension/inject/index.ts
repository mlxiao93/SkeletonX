import './index.scss'
import Skeleton from '../../core'

(function () {
  let _skltContainer: HTMLDivElement;

  function getSkltContainer() {
    if (_skltContainer) return _skltContainer;
    _skltContainer = document.createElement('div');
    document.body.appendChild(_skltContainer);
    return _skltContainer;
  }

  function clearSkltContainer() {
    if (_skltContainer) {
      document.body.removeChild(_skltContainer);
      _skltContainer = undefined;
    }
  }

  window.addEventListener('load', () => {  
    // console.log('onload');
  });

  const skeleton: Skeleton = new Skeleton();
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'generate-skeleton') {
      getSkltContainer().innerHTML =  `<div style="position: absolute; z-index: 9999998; background: #fff; left: 0; right: 0; top: 0; bottom: 0"></div>` 
        + await skeleton.getHtml();
    }
    if (request.action === 'clear-skeleton') {
      clearSkltContainer();
    }
    if (request.action === 'set-skeleton-container-opcity') {
      getSkltContainer().style.opacity = request.data;
    }
    if (request.action === 'copy-skeleton') {
      const textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.top = '-200px';
      document.body.appendChild(textarea);
      textarea.value = await skeleton.getDataString();
      textarea.select(); // 选中文本
      document.execCommand("copy");
      alert('骨架代码已拷贝到剪切板');
      document.body.removeChild(textarea);
    }
  });
})()



