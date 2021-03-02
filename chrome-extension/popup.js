function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

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
document.querySelector('#input-range');
var clearBtn = document.querySelector('#btn-clear');
var exportDataBtn = document.querySelector('#btn-export-data');
var exportDemoBtn = document.querySelector('#btn-export-demo');
var loadingEl = document.querySelector('.loading');
var opcitySelect = document.querySelector('#opcity-select');
var tabId;
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      tab = _ref2[0];

  tabId = tab.id;
  sendMessage({
    action: 'set-tab-id',
    tabId: tabId
  });
});

function sendMessage(messsage) {
  chrome.tabs.sendMessage(tabId, _objectSpread2({
    tag: 'popup'
  }, messsage));
}

chrome.runtime.onMessage.addListener(function (request) {
  if ((request === null || request === void 0 ? void 0 : request.tag) === 'topup') return;
  if ((request === null || request === void 0 ? void 0 : request.tabId) !== tabId) return;

  if (request.action === 'set-loading') {
    request.loading ? loading(true) : cancleLoading(true);
  }
});

function loading(fromMessage) {
  if (!fromMessage) {
    sendMessage({
      action: 'set-loading',
      loading: true
    });
  }

  loadingEl.style.display = 'flex';
}

function cancleLoading(fromMessage) {
  if (!fromMessage) {
    sendMessage({
      action: 'set-loading',
      loading: false
    });
  }

  loadingEl.style.display = 'none';
}

createBtn.onclick = function () {
  loading();
  sendMessage({
    action: 'generate-skeleton'
  });
};

clearBtn.onclick = function () {
  sendMessage({
    action: 'clear-skeleton'
  });
};

exportDataBtn.onclick = function () {
  sendMessage({
    action: 'export-data'
  });
};

exportDemoBtn.onclick = function () {
  sendMessage({
    action: 'export-demo'
  });
};

opcitySelect.onchange = function (e) {
  sendMessage({
    action: 'set-skeleton-container-opcity',
    value: Number(opcitySelect.value)
  });
};
