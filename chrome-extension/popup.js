function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var createBtn = document.querySelector('#btn-create');
var rangeInput = document.querySelector('#input-range');
var clearBtn = document.querySelector('#btn-clear');
var copyBtn = document.querySelector('#btn-copy');
var saveBtn = document.querySelector('#btn-save');
var currentTabId;
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      tab = _ref2[0];

  currentTabId = tab.id;
});

createBtn.onclick = function () {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'generate-skeleton'
  });
};

clearBtn.onclick = function () {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'clear-skeleton'
  });
};

copyBtn.onclick = function () {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'copy-skeleton'
  });
};

rangeInput.onchange = function (e) {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'set-skeleton-container-opcity',
    data: Number(rangeInput.value) / 100
  });
};

saveBtn.onclick = function () {
  chrome.tabs.sendMessage(currentTabId, {
    action: 'save-skeleton',
    data: Number(rangeInput.value) / 100
  });
};