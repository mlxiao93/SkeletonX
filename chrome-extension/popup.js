function t(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function e(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var n=[],r=!0,o=!1,c=void 0;try{for(var i,a=t[Symbol.iterator]();!(r=(i=a.next()).done)&&(n.push(i.value),!e||n.length!==e);r=!0);}catch(t){o=!0,c=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw c}}return n}(t,e)||function(t,e){if(!t)return;if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var o,c=document.querySelector("#btn-create"),i=document.querySelector("#btn-clear"),a=document.querySelector("#btn-export-data"),u=document.querySelector("#btn-import-data"),l=document.querySelector("#btn-export-demo"),f=document.querySelector(".loading"),d=document.querySelector("#opcity-select");function s(n){chrome.tabs.sendMessage(o,function(n){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{};r%2?e(Object(o),!0).forEach((function(e){t(n,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t))}))}return n}({tag:"popup"},n))}function y(t){t||s({action:"set-loading",loading:!0}),f.style.display="flex"}chrome.tabs.query({active:!0,currentWindow:!0},(function(t){var e=n(t,1)[0];s({action:"set-tab-id",tabId:o=e.id})})),chrome.runtime.onMessage.addListener((function(t){"topup"!==(null==t?void 0:t.tag)&&(null==t?void 0:t.tabId)===o&&"set-loading"===t.action&&(t.loading?y(!0):function(t){t||s({action:"set-loading",loading:!1});f.style.display="none"}(!0))})),c.onclick=function(){y(),s({action:"generate-skeleton"})},i.onclick=function(){s({action:"clear-skeleton"})},a.onclick=function(){s({action:"export-data"})},l.onclick=function(){s({action:"export-demo"})},d.onchange=function(t){s({action:"set-skeleton-container-opcity",value:Number(d.value)})},u.onclick=function(t){var e=prompt("请输入数据进行二次编辑 (和导出的数据一致)");console.log(e),s({action:"import-data",data:e})};
