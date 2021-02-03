function nodeNeedBg(node) {
  return node.backgroundColor !== 'rgba(0, 0, 0, 0)' || ['img', 'svg'].includes(node.tagName.toLowerCase()) || node.backgroundImage !== 'none' || node.containTextNode || node.boxShadow !== 'none';
}
function nodeNeedBorder(node) {
  return node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth !== '0px0px0px0px';
} // 两个元素是否有重叠部分

function isIntersect(node1, node2) {
  const x1 = node1.x;
  const y1 = node1.y;
  const w1 = node1.width;
  const h1 = node1.height;
  const x2 = node2.x;
  const y2 = node2.y;
  const w2 = node2.width;
  const h2 = node2.height;
  if (x1 + w1 <= x2) return false;
  if (x1 >= x2 + w2) return false;
  if (y1 + h1 <= y2) return false;
  if (y1 >= y2 + h2) return false;
  return true;
} // 节点是否被覆盖

function isCovered(list, targetIndex) {
  const target = list[targetIndex];

  for (let i = targetIndex + 1; i < list.length; i++) {
    const node = list[i];
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
  const colorLevelList = Array(descList.length).fill(0); // 按照是否相交

  for (let i = descList.length - 1; i > 0; i--) {
    const nodeI = descList[i];

    for (let j = i - 1; j >= 0; j--) {
      const nodeJ = descList[j];
      if (!nodeNeedBg(nodeJ)) continue;

      if (isIntersect(nodeI, nodeJ)) {
        const adjustLevel = Math.min(maxLevel, colorLevelList[i] + 1); // 最大level限制

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
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left
  } = element.getBoundingClientRect();
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
  let list = generateSkeletonDescList({
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
  const {
    node,
    index,
    parentDesc
  } = opt;

  if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType)) {
    // 只处理元素节点和文本节点
    return null;
  }

  let element = node;
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

  const style = getComputedStyle(element);
  /** 过滤不可见元素 */

  let ignore = false;
  if (style.display === 'none') ignore = true;else if (style.visibility === 'hidden') ignore = true;else if (!isPartInViewPort(element)) ignore = true;

  if (ignore) {
    return null;
  }

  const clientRect = element.getBoundingClientRect();
  let moduleId = undefined;
  const nodeSkltId = element.getAttribute('skeletonx-module-id') ?? undefined;
  const parentModuleId = parentDesc?.moduleId ?? [];

  if (nodeSkltId || parentModuleId?.length) {
    moduleId = [...parentModuleId, nodeSkltId].filter(i => i);
  }

  if (!moduleId?.length) moduleId = undefined;
  return {
    parentId: parentDesc ? parentDesc.id : null,
    id: parentDesc ? `${parentDesc.id}[${index}]` : '',
    moduleRoot: nodeSkltId ? true : undefined,
    moduleId,
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
  const {
    node,
    parentDesc,
    index = 0,
    list = []
  } = opt;
  const skeletonDesc = getSkeletonDesc({
    node,
    index,
    parentDesc
  });
  if (!skeletonDesc) return;
  list.push(skeletonDesc);
  if (skeletonDesc.tagName.toLowerCase() === 'svg') return list;

  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      generateSkeletonDescList({
        node: node.childNodes[i],
        parentDesc: skeletonDesc,
        index: i,
        list
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
  for (const node of list) {
    const childNodes = list.filter(item => item.parentId === node.id);
    if (!childNodes?.length) continue;
    if (node.overflowX === 'visible' && node.overflowY === 'visible') continue; // 裁剪所有子孙节点

    const nodesQueue = childNodes;

    while (nodesQueue.length > 0) {
      const child = nodesQueue.shift();
      if (child.position === 'absolute' || child.position === 'fixed') continue;

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

      const grandChildren = list.filter(item => item.parentId === child.id);
      nodesQueue.push(...grandChildren);
    }
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
  const IdMap = {};
  const res = list.filter((node, index) => {
    if (['img', 'svg'].includes(node.tagName.toLowerCase())) {
      return true;
    }

    if (node.moduleRoot) {
      return true;
    } // 无背景色


    const noBg = node.backgroundColor === 'rgba(0, 0, 0, 0)' && node.backgroundImage === 'none'; // 无文本

    const noText = !node.containTextNode; // 无边框

    const noBorder = node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth === '0px0px0px0px'; // 无阴影

    const noShadow = node.boxShadow === 'none'; // 无尺寸

    const noSize = node.width * node.height <= 0; // 删掉节点

    if (noBg && noText && noBorder && noShadow || noSize || isCovered(list, index)
    /*被覆盖*/
    ) {
        // 保存id -> parentId
        IdMap[node.id] = node.parentId;
        return false;
      }

    return true;
  }).map(node => {
    let newParentId = IdMap[node.parentId];

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
  let ModuleMap;

  for (const i in descList) {
    const desc = descList[i];
    const moduleId = desc.moduleId;

    if (moduleId?.length) {
      ModuleMap = ModuleMap || {};

      for (const id of moduleId) {
        if (!ModuleMap[id]) {
          ModuleMap[id] = [Number(i), Number(i)];
        } else {
          ModuleMap[id][1] = Number(i);
        }
      }
    }
  }
  return ModuleMap;
}
/**
 * 骨架描述转为骨架渲染描述
 */

function toRenderDescList(descList) {
  const res = []; // borderColor:  #8e9097

  const ColorLevelMap = ['#D3D4D7', '#E9EAEB', '#F4F4F5', '#FFF'];
  const colorLevelList = getColorLevelList(descList, ColorLevelMap.length - 1);
  console.log('colorLevelList', colorLevelList);

  for (const index in descList) {
    const node = descList[index];
    const renderDesc = {
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
  const descList = getSkeletonDescList(root);
  const renderList = toRenderDescList(descList);
  const moduleMap = getModuleMap(descList);
  console.log('render data', renderList);
  console.log('module map', moduleMap);
  return {
    data: renderList,
    moduleMap
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
  const values = str.split('|');
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
  const BorderColor = '#8e9097';
  const ColorLevelMap = ['#D3D4D7', '#E9EAEB', '#F4F4F5', '#FFF'];
  const props = {
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

class Skeleton {
  constructor(root) {
    this.root = root;
    const {
      data,
      moduleMap
    } = getRenderData(root);
    this.renderData = data;
    this.renderString = this.renderData.map(item => renderDescToString(item)).join(',');
    this.moduleMap = moduleMap;
    this.moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined;
  }

  getHtml() {
    return renderToHtml(this.renderString);
  }

  getDataString() {
    if (this.moduleString) {
      return this.renderString + '::' + this.moduleString;
    }
    return this.renderString;
  }

}

(function () {
  let _skltContainer;

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

  window.addEventListener('load', () => {// console.log('onload');
  });
  let skeleton;
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
      const textarea = document.createElement('textarea');
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
