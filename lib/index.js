var __skeleton__x__lib = (function (exports) {
  'use strict';

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

  // SkeletonDesc -> RenderDesc

  /**
   * 骨架渲染描述转为骨架节点render props
   */
  function transforRenderDescToRenderProps(desc) {
    // const ColorLevelMap = [
    //   '#D3D4D7',
    //   '#E9EAEB',
    //   '#F4F4F5',
    //   '#FFF'
    // ];
    var props = {
      top: desc.top,
      left: desc.left,
      height: desc.height,
      width: desc.width,
      bottom: desc.bottom,
      right: desc.right,
      borderRadius: desc.borderRadius,
      borderWidth: desc.borderWidth
    };
    if (desc.backgroundColor !== undefined) props.background = 'linear-gradient(90deg,rgb(190 190 190 / 20%) 25%,hsla(0,0%,50.6%,.24) 37%,hsla(0,0%,74.5%,.2) 63%); background-size: 400% 100%;';
    if (desc.borderWidth !== undefined) props.borderColor = 'rgb(190 190 190 / 20%)';
    return props;
  }
  function parseStringToRenderDesc(str) {
    var values = str.split('|');
    return {
      width: values[0] || undefined,
      height: values[1] || undefined,
      top: values[2] || undefined,
      right: values[3] || undefined,
      bottom: values[4] || undefined,
      left: values[5] || undefined,
      borderRadius: values[6] || undefined,
      borderWidth: values[7] || undefined,
      backgroundColor: values[8] || undefined
    };
  }

  function toModuleRelativeDesc(desc, moduleRootDesc) {
    desc = JSON.parse(JSON.stringify(desc));

    if (moduleRootDesc) {
      desc.left = desc.left - moduleRootDesc.left;
      desc.top = desc.top - moduleRootDesc.top;
    }
    return desc;
  }

  /**
   * @param desc 
   * @param moduleRootDesc 如果传递了moduleRootDesc，则骨架基于moduleRootDesc定位
   */

  function descToHtml(desc, moduleRootDesc) {
    desc = toModuleRelativeDesc(desc, moduleRootDesc);
    var renderProps = transforRenderDescToRenderProps(desc);
    var style = 'z-index:9999999;position:absolute;';

    for (var key in renderProps) {
      var value = renderProps[key];
      if (!value) continue;
      style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';';
    }
    return '<div class="skeleton-x-node" style="' + style + '"></div>';
  }

  function renderToHtml(dataString, moduleId) {
    var _dataString;

    dataString = (_dataString = dataString) !== null && _dataString !== void 0 ? _dataString : window.__skeleton__x__lib.getData();
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
  function getModuleSize(dataString, moduleId) {
    var _dataString2, _moduleMap$moduleId3;

    dataString = (_dataString2 = dataString) !== null && _dataString2 !== void 0 ? _dataString2 : window.__skeleton__x__lib.getData();
    var size = {
      width: '0px',
      height: '0px'
    };
    if (!dataString || !moduleId) return size;

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

  function getData() {
    return undefined;
  }

  exports.getData = getData;
  exports.getModuleSize = getModuleSize;
  exports.renderToHtml = renderToHtml;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
