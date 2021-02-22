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

  let skeleton: Skeleton;
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'generate-skeleton') {
      skeleton = new Skeleton();
      getSkltContainer().innerHTML = await skeleton.getHtml();
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



