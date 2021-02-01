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

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generate-skeleton') {
      const skeleton = new Skeleton(document.body);
      getSkltContainer().innerHTML = skeleton.getHtml();
    }
    if (request.action === 'clear-skeleton') {
      clearSkltContainer();
    }
    if (request.action === 'set-skeleton-container-opcity') {
      getSkltContainer().style.opacity = request.data;
    }
  });
})()



