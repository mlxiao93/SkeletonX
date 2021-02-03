var __skeleton__x__lib = (function (exports) {
  'use strict';

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

  function parseStringToRenderDesc(str) {
    var values = str.split('|');
    return {
      top: values[0] || undefined,
      left: values[1] || undefined,
      height: values[2] || undefined,
      width: values[3] || undefined,
      borderTopWidth: values[4] || undefined,
      borderRightWidth: values[5] || undefined,
      borderBottomWidth: values[6] || undefined,
      borderLeftWidth: values[7] || undefined,
      borderRadius: values[8] || undefined,
      borderColor: values[9] || undefined,
      backgroundColor: values[10] || undefined
    };
  }

  /**
   * 骨架渲染描述转为骨架节点render props
   */
  function transforRenderDescToRenderProps(desc) {
    var BorderColor = '#8e9097';
    var ColorLevelMap = ['#D3D4D7', '#E9EAEB', '#F4F4F5', '#FFF'];
    var props = {
      top: desc.top + 'px',
      left: desc.left + 'px',
      height: desc.height + 'px',
      width: desc.width + 'px'
    };
    if (desc.backgroundColor !== undefined) props.backgroundColor = ColorLevelMap[desc.backgroundColor];
    if (desc.borderColor !== undefined) props.borderColor = BorderColor;
    if (desc.borderBottomWidth !== undefined) props.borderBottomWidth = desc.borderBottomWidth + 'px';
    if (desc.borderTopWidth !== undefined) props.borderTopWidth = desc.borderTopWidth + 'px';
    if (desc.borderRightWidth !== undefined) props.borderRightWidth = desc.borderRightWidth + 'px';
    if (desc.borderLeftWidth !== undefined) props.borderLeftWidth = desc.borderLeftWidth + 'px';
    return props;
  }

  /**
   * @param desc 
   * @param moduleRootDesc 如果传递了moduleRootDesc，则骨架基于moduleRootDesc定位
   */

  function descToHtml(desc, moduleRootDesc) {
    desc = _objectSpread2({}, desc); // TODO 

    if (moduleRootDesc) {
      desc.left = desc.left - moduleRootDesc.left;
      desc.top = desc.top - moduleRootDesc.top;
    }

    var renderProps = transforRenderDescToRenderProps(desc);
    var style = 'z-index:9999999;position:absolute;';

    for (var key in renderProps) {
      style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';';
    }
    return '<div style="' + style + '"></div>';
  }

  function renderToHtml() {
    var dataString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.__skeleton__x__data;
    var moduleId = arguments.length > 1 ? arguments[1] : undefined;
    if (!dataString) return '';

    var _dataString$split = dataString.split('::'),
        _dataString$split2 = _slicedToArray(_dataString$split, 2),
        renderString = _dataString$split2[0],
        moduleString = _dataString$split2[1];

    var renderDescList = renderString.split(',').map(function (str) {
      return parseStringToRenderDesc(str);
    }); // 渲染模块骨架的情况

    var moduleRootDesc;

    if (moduleId !== undefined) {
      var _moduleMap$moduleId, _moduleMap$moduleId2;

      var moduleMap = moduleString ? JSON.parse(moduleString) : undefined;
      var moduleRootIndex = (_moduleMap$moduleId = moduleMap[moduleId]) === null || _moduleMap$moduleId === void 0 ? void 0 : _moduleMap$moduleId[0];
      var moduleLastIndex = (_moduleMap$moduleId2 = moduleMap[moduleId]) === null || _moduleMap$moduleId2 === void 0 ? void 0 : _moduleMap$moduleId2[1];

      if (moduleRootIndex !== undefined) {
        moduleRootDesc = renderDescList[moduleRootIndex];
        renderDescList = renderDescList.slice(moduleRootIndex, moduleLastIndex + 1);
      }
    }

    var html = '';

    for (var i = 0; i < renderDescList.length; i++) {
      html += descToHtml(renderDescList[i], moduleRootDesc);
    }
    return html;
  }
  function getModuleSize() {
    var _moduleMap$moduleId3;

    var dataString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.__skeleton__x__data;
    var moduleId = arguments.length > 1 ? arguments[1] : undefined;
    var size = {
      width: '0px',
      height: '0px'
    };

    var _dataString$split3 = dataString.split('::'),
        _dataString$split4 = _slicedToArray(_dataString$split3, 2),
        renderString = _dataString$split4[0],
        moduleString = _dataString$split4[1];

    var renderDescList = renderString.split(',').map(function (str) {
      return parseStringToRenderDesc(str);
    });
    var moduleMap = JSON.parse(moduleString);
    var moduleRootIndex = (_moduleMap$moduleId3 = moduleMap[moduleId]) === null || _moduleMap$moduleId3 === void 0 ? void 0 : _moduleMap$moduleId3[0];
    if (moduleRootIndex === undefined) return size;
    var desc = renderDescList[moduleRootIndex];
    if (!desc) return size;
    var renderProps = transforRenderDescToRenderProps(desc);
    size.width = renderProps.width;
    size.height = renderProps.height;
    return size;
  }

  function setData(data) {
    window.__skeleton__x__data = data;
  }

  exports.getModuleSize = getModuleSize;
  exports.renderToHtml = renderToHtml;
  exports.setData = setData;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
