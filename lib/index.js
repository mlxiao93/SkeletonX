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
  var SplitSymbol = '|';
  function parseStringToRenderDesc(str) {
    var values = str.split(SplitSymbol);
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
  function parseRenderString(renderString) {
    var _renderString$split = renderString.split('::'),
        _renderString$split2 = _slicedToArray(_renderString$split, 2),
        dataString = _renderString$split2[0],
        moduleString = _renderString$split2[1];

    var data = dataString.split(',').map(function (str) {
      return parseStringToRenderDesc(str);
    });
    var moduleMap = moduleString ? JSON.parse(moduleString) : undefined;
    return {
      data: data,
      moduleMap: moduleMap
    };
  }

  /**
   * 元素是否出现在视口
   * 只要有一部分在视口返回true
   */
  /**
   * @param size calc(100vw + 100px) - calc(50vw + 60px)
   * @return calc(50vw - 40px)
   */

  function countCss(size) {
    // 去掉calc
    size = size.replace(/calc\((.+?)\)/g, '($1)'); // 去括号

    var bracketReg = /-\s?\((.+?)\)/;
    var bracketsMatch = size.match(bracketReg);

    while (bracketsMatch) {
      var strArr = bracketsMatch[1].split('');

      for (var i = 0; i < strArr.length; i++) {
        if (strArr[i] === '-') {
          strArr[i] = '+';
        } else if (strArr[i] === '+') {
          strArr[i] = '-';
        }
      }

      var str = strArr.join('');
      size = size.replace(bracketReg, '- ' + str);
      bracketsMatch = size.match(bracketReg);
    }

    size = size.replace(/\((.+?)\)/g, '$1');
    var pxList = size.match(/[+-]?\s?(\d+\.)?\d+px/g);
    var vwList = size.match(/[+-]?\s?(\d+\.)?\d+vw/g);
    var vhList = size.match(/[+-]?\s?(\d+\.)?\d+vh/g);
    var px = pxList && new Function('return ' + pxList.join('').replace(/px/g, ''))();
    var vw = vwList && new Function('return ' + vwList.join('').replace(/vw/g, ''))();
    var vh = vhList && new Function('return ' + vhList.join('').replace(/vh/g, ''))();
    var res = px + 'px' || vw + 'vw' || vh + 'vh';

    if (vw && px) {
      res = "calc(".concat(vw, "vw + ").concat(px, "px)");
    } else if (vh && px) {
      res = "calc(".concat(vh, "vh + ").concat(px, "px)");
    }

    res = res.replace(/\+\s-/g, '- ').replace(/\+\s\+/g, '+ ').replace(/$\+/, '');
    return res;
  }

  function getModuleSize(renderString, moduleId) {
    var _renderString, _moduleMap$moduleId;

    renderString = (_renderString = renderString) !== null && _renderString !== void 0 ? _renderString : window.__skeleton__x__lib.getData();
    var size = {
      height: '0px'
    };
    if (!renderString || !moduleId) return size;

    var _parseRenderString = parseRenderString(renderString),
        data = _parseRenderString.data,
        moduleMap = _parseRenderString.moduleMap;

    var moduleRootIndex = (_moduleMap$moduleId = moduleMap[moduleId]) === null || _moduleMap$moduleId === void 0 ? void 0 : _moduleMap$moduleId[0];
    if (moduleRootIndex === undefined) return size;
    var desc = data[moduleRootIndex];
    if (!desc) return size;
    var renderProps = transforRenderDescToRenderProps(desc);

    if (renderProps.height) {
      size.height = renderProps.height;
    } else {
      size.height = countCss("100vh - ".concat(renderProps.bottom, " - ").concat(renderProps.top));
    }

    return size;
  }
  function toModuleRelativeDesc(desc, moduleRootDesc) {
    desc = JSON.parse(JSON.stringify(desc));

    if (moduleRootDesc) {
      desc.left = countCss("".concat(desc.left, " - ").concat(moduleRootDesc.left));
      if (desc.right && moduleRootDesc.right) desc.right = countCss("".concat(desc.right, " - ").concat(moduleRootDesc.right));
      desc.top = countCss("".concat(desc.top, " - ").concat(moduleRootDesc.top));
      if (desc.bottom && moduleRootDesc.bottom) desc.bottom = countCss("".concat(desc.bottom, " - ").concat(moduleRootDesc.bottom));
    }
    return desc;
  }

  /**
   * @param desc 
   * @param moduleRootDesc 如果传递了moduleRootDesc，则骨架基于moduleRootDesc定位
   */

  function descToHtml(desc, index, moduleRootDesc) {
    desc = toModuleRelativeDesc(desc, moduleRootDesc);
    var renderProps = transforRenderDescToRenderProps(desc);
    var style = 'z-index:9999999;position:absolute;';

    for (var key in renderProps) {
      var value = renderProps[key];
      if (!value) continue;
      style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';';
    }
    return '<div id="' + index + '" class="skeleton-x-node" style="' + style + '"></div>';
  }

  function renderToHtml(renderString, moduleId) {
    var _renderString;

    renderString = (_renderString = renderString) !== null && _renderString !== void 0 ? _renderString : window.__skeleton__x__lib.getData();
    if (!renderString) return '';

    var _parseRenderString = parseRenderString(renderString),
        data = _parseRenderString.data,
        moduleMap = _parseRenderString.moduleMap; // 渲染模块骨架的情况


    var moduleRootDesc;

    if (moduleId !== undefined) {
      var _moduleMap$moduleId, _moduleMap$moduleId2;

      var moduleRootIndex = (_moduleMap$moduleId = moduleMap[moduleId]) === null || _moduleMap$moduleId === void 0 ? void 0 : _moduleMap$moduleId[0];
      var moduleLastIndex = (_moduleMap$moduleId2 = moduleMap[moduleId]) === null || _moduleMap$moduleId2 === void 0 ? void 0 : _moduleMap$moduleId2[1];

      if (moduleRootIndex !== undefined) {
        moduleRootDesc = data[moduleRootIndex];
        data = data.slice(moduleRootIndex, moduleLastIndex + 1);
      }
    }

    var html = '';

    for (var i = 0; i < data.length; i++) {
      html += descToHtml(data[i], i, moduleRootDesc);
    }
    return html;
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
