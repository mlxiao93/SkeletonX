console.log('exec devtools.ts');
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {// console.log(request)
});
chrome.devtools.panels.create("SkeletonX", '', // panel icon
"panel-app/index.html", function (panel) {});
