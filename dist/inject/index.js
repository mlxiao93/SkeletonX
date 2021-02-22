function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
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

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function nodeNeedBg(node) {
  return node.backgroundColor !== 'rgba(0, 0, 0, 0)' || ['img', 'svg'].includes(node.tagName.toLowerCase()) || node.backgroundImage !== 'none' || node.containTextNode || node.boxShadow !== 'none';
}
function nodeNeedBorder(node) {
  return node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth !== '0px0px0px0px';
} // 两个元素是否有重叠部分

function isIntersect(node1, node2) {
  var x1 = node1.x;
  var y1 = node1.y;
  var w1 = node1.width;
  var h1 = node1.height;
  var x2 = node2.x;
  var y2 = node2.y;
  var w2 = node2.width;
  var h2 = node2.height;
  if (x1 + w1 <= x2) return false;
  if (x1 >= x2 + w2) return false;
  if (y1 + h1 <= y2) return false;
  if (y1 >= y2 + h2) return false;
  return true;
} // 节点是否被覆盖

function isCovered(list, targetIndex) {
  var target = list[targetIndex];

  for (var i = targetIndex + 1; i < list.length; i++) {
    var node = list[i];
    if (!nodeNeedBg(node)) continue;

    if (node.x <= target.x && node.y <= target.y && node.x + node.width >= target.x + target.width && node.y + node.height >= target.y + target.height) {
      return true;
    }
  }

  return false;
}
/**
 * 重叠元素色差处理
 * 初始颜色级别都为0
 * 位于重叠下一层的元素，颜色级别+1
 * 
 * descList
 */

function getColorLevelList(descList, maxLevel) {
  // 初始级别都为0
  var colorLevelList = Array(descList.length).fill(0); // 按照是否相交

  for (var i = descList.length - 1; i > 0; i--) {
    var nodeI = descList[i];

    for (var j = i - 1; j >= 0; j--) {
      var nodeJ = descList[j];
      if (!nodeNeedBg(nodeJ)) continue;

      if (isIntersect(nodeI, nodeJ)) {
        var adjustLevel = Math.min(maxLevel, colorLevelList[i] + 1); // 最大level限制

        colorLevelList[j] = Math.max(adjustLevel, colorLevelList[j]);
      }
    }
  } // 按照父子关系
  // for (const index in descList) {
  //   const node = descList[index];
  //   const isLeaf = descList.every(item => item.parentId !== node.id);
  //   if (!isLeaf) continue;
  //   let parentIndex = descList.findIndex(item => item.id === node.parentId);
  //   let count = 1;
  //   while (parentIndex >= 0) {
  //     const parent = descList[parentIndex];
  //     if (!nodeNeedBg(parent)) {
  //       parentIndex = descList.findIndex(item => item.id === parent.parentId);
  //       continue;
  //     }
  //     const colorLevel = Math.min(maxLevel, count);
  //     colorLevelList[parentIndex] = Math.max(colorLevel, colorLevelList[parentIndex]);
  //     parentIndex = descList.findIndex(item => item.id === parent.parentId);
  //     count++;
  //   }
  // }


  return colorLevelList;
}

/**
 * 元素是否出现在视口
 * 只要有一部分在视口返回true
 */
function isPartInViewPort(element) {
  var viewWidth = window.innerWidth || document.documentElement.clientWidth;
  var viewHeight = window.innerHeight || document.documentElement.clientHeight;

  var _element$getBoundingC = element.getBoundingClientRect(),
      top = _element$getBoundingC.top,
      right = _element$getBoundingC.right,
      bottom = _element$getBoundingC.bottom,
      left = _element$getBoundingC.left;

  if (top > viewHeight) return false;
  if (left > viewWidth) return false;
  if (bottom < 0) return false;
  if (right < 0) return false;
  return true;
}

/** 骨架元素描述 */

/**
 * 获取骨架节点描述扁平数据
 * @param root 根元素
 */
function getSkeletonDescList(root) {
  var list = generateSkeletonDescList({
    node: root
  });
  list = clipSkeletonDescList(list);
  list = reduceSkeletonDescList(list);
  return list;
}
/**
 * 提取骨架描述
 */

function getSkeletonDesc(opt) {
  var _element$getAttribute, _parentDesc$moduleId, _moduleId;

  var node = opt.node,
      index = opt.index,
      parentDesc = opt.parentDesc;

  if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType)) {
    // 只处理元素节点和文本节点
    return null;
  }

  var element = node;
  /** 
   * 文本节点处理
   */

  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.textContent.replace(/↵|\s/g, '')) {
      // 过滤无内容的文本节点
      return null;
    }

    parentDesc.containTextNode = true;
    return null;
  }

  if (element.getAttribute('skeletonx-ignore') !== null) return null; // skeletonx-ignore

  var style = getComputedStyle(element);
  /** 过滤不可见元素 */

  var ignore = false;
  if (style.display === 'none') ignore = true;else if (style.visibility === 'hidden') ignore = true;else if (!isPartInViewPort(element)) ignore = true;

  if (ignore) {
    return null;
  }

  var clientRect = element.getBoundingClientRect();
  var moduleId = undefined;
  var nodeSkltId = (_element$getAttribute = element.getAttribute('skeletonx-module-id')) !== null && _element$getAttribute !== void 0 ? _element$getAttribute : undefined;
  var parentModuleId = (_parentDesc$moduleId = parentDesc === null || parentDesc === void 0 ? void 0 : parentDesc.moduleId) !== null && _parentDesc$moduleId !== void 0 ? _parentDesc$moduleId : [];

  if (nodeSkltId || parentModuleId !== null && parentModuleId !== void 0 && parentModuleId.length) {
    moduleId = [].concat(_toConsumableArray(parentModuleId), [nodeSkltId]).filter(function (i) {
      return i;
    });
  }

  if (!((_moduleId = moduleId) !== null && _moduleId !== void 0 && _moduleId.length)) moduleId = undefined;
  return {
    parentId: parentDesc ? parentDesc.id : null,
    id: parentDesc ? "".concat(parentDesc.id, "[").concat(index, "]") : '',
    moduleRoot: nodeSkltId ? true : undefined,
    moduleId: moduleId,
    tagName: element.tagName,
    // nodeType: node.nodeType,
    x: clientRect.left,
    y: clientRect.top,
    height: clientRect.height,
    width: clientRect.width,
    borderBottomWidth: style.borderBottomWidth,
    borderLeftWidth: style.borderLeftWidth,
    borderRightWidth: style.borderRightWidth,
    borderTopWidth: style.borderTopWidth,
    borderRadius: style.borderRadius,
    boxShadow: style.boxShadow,
    backgroundColor: style.backgroundColor,
    backgroundImage: style.backgroundImage,
    overflowX: style.overflowX,
    overflowY: style.overflowY,
    position: style.position,
    // @ts-ignore
    $node: node // for debug TODO delete 

  };
}
/**
 * 递归生成骨架元素扁平数据
 */

function generateSkeletonDescList(opt) {
  var node = opt.node,
      parentDesc = opt.parentDesc,
      _opt$index = opt.index,
      index = _opt$index === void 0 ? 0 : _opt$index,
      _opt$list = opt.list,
      list = _opt$list === void 0 ? [] : _opt$list;
  var skeletonDesc = getSkeletonDesc({
    node: node,
    index: index,
    parentDesc: parentDesc
  });
  if (!skeletonDesc) return;
  list.push(skeletonDesc);
  if (skeletonDesc.tagName.toLowerCase() === 'svg') return list;

  if (node.hasChildNodes()) {
    for (var i = 0; i < node.childNodes.length; i++) {
      generateSkeletonDescList({
        node: node.childNodes[i],
        parentDesc: skeletonDesc,
        index: i,
        list: list
      });
    }
  }

  return list;
}
/**
 * 裁剪骨架节点
 * 
 * 子元素不是absolute和fixed
 * 且子元素尺寸大于父元素
 * 且父元素overflow不为visible
 */

function clipSkeletonDescList(list) {
  var _iterator = _createForOfIteratorHelper(list),
      _step;

  try {
    var _loop = function _loop() {
      var node = _step.value;
      var childNodes = list.filter(function (item) {
        return item.parentId === node.id;
      });
      if (!(childNodes !== null && childNodes !== void 0 && childNodes.length)) return "continue";
      if (node.overflowX === 'visible' && node.overflowY === 'visible') return "continue"; // 裁剪所有子孙节点

      var nodesQueue = childNodes;

      var _loop2 = function _loop2() {
        var child = nodesQueue.shift();
        if (child.position === 'absolute' || child.position === 'fixed') return "continue";

        if (node.overflowX !== 'visible') {
          // 横向被裁剪
          if (child.x < node.x) child.x = node.x;
          if (child.x + child.width > node.x + node.width) child.width = node.width - (child.x - node.x);
        }

        if (node.overflowY !== 'visible') {
          // 纵向被裁剪
          //   child.height = node.height;
          if (child.y < node.y) child.y = node.y;
          if (child.y + child.height > node.y + node.height) child.height = node.height - (child.y - node.y);
        }

        var grandChildren = list.filter(function (item) {
          return item.parentId === child.id;
        });
        nodesQueue.push.apply(nodesQueue, _toConsumableArray(grandChildren));
      };

      while (nodesQueue.length > 0) {
        var _ret2 = _loop2();

        if (_ret2 === "continue") continue;
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _ret = _loop();

      if (_ret === "continue") continue;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  console.log('clip', list);
  return list;
}
/**
 * 精简骨架节点
 * 1. 无背景 & 无文本 & 无边框的节点过滤掉
 */

function reduceSkeletonDescList(list) {
  // {被删除的节点id: 被删除节点的parentId}
  var IdMap = {};
  var res = list.filter(function (node, index) {
    if (['img', 'svg'].includes(node.tagName.toLowerCase())) {
      return true;
    }

    if (node.moduleRoot) {
      return true;
    } // 无背景色


    var noBg = /rgba\((\d+,\s*){3}0\)/.test(node.backgroundColor) && node.backgroundImage === 'none'; // 无文本

    var noText = !node.containTextNode; // 无边框

    var noBorder = node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth === '0px0px0px0px'; // 无阴影

    var noShadow = node.boxShadow === 'none'; // 无尺寸

    var noSize = node.width * node.height <= 0; // 删掉节点

    if (noBg && noText && noBorder && noShadow || noSize || isCovered(list, index)
    /*被覆盖*/
    ) {
        // 保存id -> parentId
        IdMap[node.id] = node.parentId;
        return false;
      }

    return true;
  }).map(function (node) {
    var newParentId = IdMap[node.parentId];

    while (IdMap[newParentId] !== undefined) {
      newParentId = IdMap[newParentId];
    }

    if (newParentId !== undefined) node.parentId = newParentId; // 重新连接parentId

    return node;
  });
  console.log('reduce', res);
  return res;
}
function getModuleMap(descList) {
  var ModuleMap;

  for (var i in descList) {
    var desc = descList[i];
    var moduleId = desc.moduleId;

    if (moduleId !== null && moduleId !== void 0 && moduleId.length) {
      ModuleMap = ModuleMap || {};

      var _iterator2 = _createForOfIteratorHelper(moduleId),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var id = _step2.value;

          if (!ModuleMap[id]) {
            ModuleMap[id] = [Number(i), Number(i)];
          } else {
            ModuleMap[id][1] = Number(i);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }
  return ModuleMap;
}
/**
 * 骨架描述转为骨架渲染描述
 */

function toRenderDescList(descList) {
  var res = []; // borderColor:  #8e9097

  var ColorLevelMap = ['#D3D4D7', '#E9EAEB', '#F4F4F5', '#FFF'];
  var colorLevelList = getColorLevelList(descList, ColorLevelMap.length - 1);
  console.log('colorLevelList', colorLevelList);

  for (var index in descList) {
    var node = descList[index];
    var renderDesc = {
      left: node.x,
      top: node.y,
      height: node.height,
      width: node.width
    };
    if (node.borderLeftWidth !== '0px') renderDesc.borderLeftWidth = Number(node.borderLeftWidth.replace('px', ''));
    if (node.borderRightWidth !== '0px') renderDesc.borderRightWidth = Number(node.borderRightWidth.replace('px', ''));
    if (node.borderTopWidth !== '0px') renderDesc.borderTopWidth = Number(node.borderTopWidth.replace('px', ''));
    if (node.borderBottomWidth !== '0px') renderDesc.borderBottomWidth = Number(node.borderBottomWidth.replace('px', ''));
    if (node.borderRadius !== '0px') renderDesc.borderRadius = Number(node.borderRadius.replace('px', ''));

    if (nodeNeedBorder(node)) {
      renderDesc.borderColor = 0;
    }

    if (nodeNeedBg(node)) {
      renderDesc.backgroundColor = colorLevelList[index];
    }

    res.push(renderDesc);
  }

  return res;
}
function getRenderData(root) {
  var descList = getSkeletonDescList(root);
  var renderList = toRenderDescList(descList);
  var moduleMap = getModuleMap(descList);
  console.log('render data', renderList);
  console.log('module map', moduleMap);
  return {
    data: renderList,
    moduleMap: moduleMap
  };
}
/**
 * 使用'|'分隔RenderDesc的属性值，固化属性的顺序
 * @return top|left|height|width|borderTopWidth|borderRightWidth|borderBottomWidth|borderLeftWidth|borderRadius|borderColor|backgroundColor|
 */

function renderDescToString(desc) {
  return [desc.top, desc.left, desc.height, desc.width, desc.borderTopWidth, desc.borderRightWidth, desc.borderBottomWidth, desc.borderLeftWidth, desc.borderRadius, desc.borderColor, desc.backgroundColor].join('|');
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
  desc = JSON.parse(JSON.stringify(desc));

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

var Skeleton = /*#__PURE__*/function () {
  function Skeleton(root) {
    _classCallCheck(this, Skeleton);

    this.root = root;

    var _getRenderData = getRenderData(root),
        data = _getRenderData.data,
        moduleMap = _getRenderData.moduleMap;

    this.renderData = data;
    this.renderString = this.renderData.map(function (item) {
      return renderDescToString(item);
    }).join(',');
    this.moduleMap = moduleMap;
    this.moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined;
  }

  _createClass(Skeleton, [{
    key: "getHtml",
    value: function getHtml() {
      return renderToHtml(this.renderString);
    }
  }, {
    key: "getDataString",
    value: function getDataString() {
      if (this.moduleString) {
        return this.renderString + '::' + this.moduleString;
      }
      return this.renderString;
    }
  }]);

  return Skeleton;
}();

(function () {
  var _skltContainer;

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

  window.addEventListener('load', function () {// console.log('onload');
  });
  var skeleton;
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'generate-skeleton') {
      skeleton = new Skeleton(document.body);
      getSkltContainer().innerHTML = skeleton.getHtml();
    }

    if (request.action === 'clear-skeleton') {
      clearSkltContainer();
    }

    if (request.action === 'set-skeleton-container-opcity') {
      getSkltContainer().style.opacity = request.data;
    }

    if (request.action === 'copy-skeleton') {
      var textarea = document.createElement('textarea');
      textarea.style.position = 'fixed';
      textarea.style.top = '-200px';
      document.body.appendChild(textarea);
      textarea.value = skeleton.getDataString();
      textarea.select(); // 选中文本

      document.execCommand("copy");
      alert('骨架代码已拷贝到剪切板');
      document.body.removeChild(textarea);
    }
  });
})();
