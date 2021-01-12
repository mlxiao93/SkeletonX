import './index.scss'
import Skeletion from '../../core'

(function () {
  let skltContainer: HTMLDivElement;

  window.addEventListener('load', () => {  
    console.log('onload');
  
    skltContainer = document.createElement('div');
    skltContainer.id = 'skelentonx-container'
  
    
    // 
    document.body.appendChild(skltContainer);
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'generate-skeleton') {
      const skeletion = new Skeletion(document.body);
      skltContainer.innerHTML = skeletion.renderToHtml();
    }
    if (request.action === 'clear-skeleton') {
      skltContainer.innerHTML = '';
    }
    if (request.action === 'set-skeleton-container-opcity') {
      skltContainer.style.opacity = request.data;
    }
  });
})()



