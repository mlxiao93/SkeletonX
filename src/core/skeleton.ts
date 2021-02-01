/**
 * TODO 
 * 1. 文本节点精细化处理
 * 2. 响应式
 * 3. 节点层级太深处理
 * 4. overflow裁剪bug(阿里内外可发现)
 */

import { isPartInViewPort } from "./dom";

/** 骨架元素描述 */
export interface SkeletonDesc {

  /** 基础属性 */
  id: string,     // json path
  parentId?: string,

  /** 标签名 */
  tagName: string,

  /** 节点类型 */
  // nodeType: Node['ELEMENT_NODE'] | Node['TEXT_NODE'],

  /** 是否包含文本节点 */
  containTextNode?: boolean;

  /** 定位 */
  x: number
  y: number

  /** 尺寸 */
  height: number
  width: number

  /** 边框 */
  borderLeftWidth: CSSStyleDeclaration['borderWidth']
  borderRightWidth: CSSStyleDeclaration['borderWidth']
  borderTopWidth: CSSStyleDeclaration['borderWidth']
  borderBottomWidth: CSSStyleDeclaration['borderWidth']
  borderRadius: CSSStyleDeclaration['borderRadius']
  boxShadow: CSSStyleDeclaration['boxShadow']

  /** 背景 */
  backgroundColor: CSSStyleDeclaration['backgroundColor'];
  backgroundImage: CSSStyleDeclaration['backgroundImage'];

  /** 其它 */
  overflowX: CSSStyleDeclaration['overflowX'];
  overflowY: CSSStyleDeclaration['overflowY'];
  position: CSSStyleDeclaration['position'];
}

/**
 * 获取骨架节点描述扁平数据
 * @param root 根元素
 */
export function getSkeletonDescList(root: Node): SkeletonDesc[] {
  let list = generateSkeletonDescList({ node: root });
  list = clipSkeletonDescList(list);
  list = reduceSkeletonDescList(list);
  return list;
}

/**
 * 提取骨架描述
 */
export function getSkeletonDesc(opt: {
  node: Node,
  index: number,
  parentDesc?: SkeletonDesc
}): SkeletonDesc | null {
  const { node, index, parentDesc } = opt;

  if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType)) {   // 只处理元素节点和文本节点
    return null
  }

  let element = node as HTMLElement;

  /** 
   * 文本节点处理
   */
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.textContent.replace(/↵|\s/g, '')) {    // 过滤无内容的文本节点
      return null
    }
    parentDesc.containTextNode = true;
    return null;
  }

  if (element.getAttribute('skeletonx-ignore') !== null) return null;   // skeletonx-ignore

  const style = getComputedStyle(element);

  /** 过滤不可见元素 */
  let ignore = false;
  if (style.display === 'none') ignore = true;
  else if (style.visibility === 'hidden') ignore = true;
  else if (!isPartInViewPort(element)) ignore = true;

  if (ignore) {
    return null;
  }

  const clientRect = element.getBoundingClientRect();

  return {
    parentId: parentDesc ? parentDesc.id : null,
    id: parentDesc ? `${parentDesc.id}[${index}]` : '',

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
    $node: node,    // for debug TODO delete 
  }
}

/**
 * 递归生成骨架元素扁平数据
 */
export function generateSkeletonDescList(opt: {
  node: Node
  parentDesc?: SkeletonDesc,
  index?: number,
  list?: SkeletonDesc[]
}): SkeletonDesc[] {
  const { node, parentDesc, index = 0, list = [] } = opt

  const skeletonDesc = getSkeletonDesc({ node, index, parentDesc })
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
export function clipSkeletonDescList(list: SkeletonDesc[]): SkeletonDesc[] {
  for (const node of list) {
    const childNodes = list.filter(item => item.parentId === node.id);
    if (!childNodes?.length) continue;
    if (node.overflowX === 'visible' && node.overflowY === 'visible') continue;

    // 裁剪所有子孙节点
    const nodesQueue: SkeletonDesc[] = childNodes;

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
        if (child.y + child.height > node.y + node.height) child.height = node.height - (child.y - node.y)
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
export function reduceSkeletonDescList(list: SkeletonDesc[]): SkeletonDesc[] {

  // {被删除的节点id: 被删除节点的parentId}
  const IdMap: { [key: string]: string } = {}

  const res = list.filter((node, index) => {
    if (['img', 'svg'].includes(node.tagName.toLowerCase())) {
      return true
    }

    // 无背景色
    const noBg = node.backgroundColor === 'rgba(0, 0, 0, 0)' && node.backgroundImage === 'none';
    // 无文本
    const noText = !node.containTextNode;
    // 无边框
    const noBorder = node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth === '0px0px0px0px';
    // 无阴影
    const noShadow = node.boxShadow === 'none';
    // 无尺寸
    const noSize = node.width * node.height <= 0;

    // 删掉节点
    if ((noBg && noText && noBorder && noShadow)
      || noSize
      || isCovered(list, index)/*被覆盖*/
    ) {
      // 保存id -> parentId
      IdMap[node.id] = node.parentId
      return false;
    }

    return true;
  }).map(node => {
    let newParentId = IdMap[node.parentId];
    while (IdMap[newParentId] !== undefined) { newParentId = IdMap[newParentId] }
    if (newParentId !== undefined) node.parentId = newParentId;     // 重新连接parentId
    return node;
  });

  console.log('reduce', res);
  return res;
}

function nodeNeedBg(node: SkeletonDesc) {
  return node.backgroundColor !== 'rgba(0, 0, 0, 0)'
    || ['img', 'svg'].includes(node.tagName.toLowerCase())
    || node.backgroundImage !== 'none'
    || node.containTextNode
    || node.boxShadow !== 'none';
}

function nodeNeedBorder(node: SkeletonDesc) {
  return node.borderTopWidth + node.borderTopWidth + node.borderBottomWidth + node.borderLeftWidth !== '0px0px0px0px'
}

// 两个元素是否有重叠部分
function isIntersect(node1: SkeletonDesc, node2: SkeletonDesc): boolean {
  const x1 = node1.x;
  const y1 = node1.y;
  const w1 = node1.width;
  const h1 = node1.height;
  const x2 = node2.x;
  const y2 = node2.y;
  const w2 = node2.width;
  const h2 = node2.height;
  if (x1 + w1 < x2) return false;
  if (x1 > x2 + w2) return false;
  if (y1 + h1 < y2) return false;
  if (y1 > y2 + h2) return false;
  return true;
}

// 节点是否被覆盖
function isCovered(list: SkeletonDesc[], targetIndex: number): boolean {
  const target = list[targetIndex];
  for (let i = targetIndex + 1; i < list.length; i++) {
    const node = list[i];
    if (!nodeNeedBg(node)) continue;
    if (node.x <= target.x
      && node.y <= target.y
      && node.x + node.width >= target.x + target.width
      && node.y + node.height >= target.y + target.height) {
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
function getColorLevelList(descList: SkeletonDesc[], maxLevel: number): number[] {
  // 初始级别都为0
  const colorLevelList = Array(descList.length).fill(0);

  // 按照是否相交
  for (let i = descList.length - 1; i > 0; i--) {
    const nodeI = descList[i];
    for (let j = i - 1; j >= 0; j--) {
      const nodeJ = descList[j];
      if (!nodeNeedBg(nodeJ)) continue;
      if (isIntersect(nodeI, nodeJ)) {
        const adjustLevel = Math.min(maxLevel, colorLevelList[i] + 1)   // 最大level限制
        colorLevelList[j] = Math.max(adjustLevel, colorLevelList[j]);
      }
    }
  }

  // 按照父子关系
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

export interface RenderDesc {
  top: number,
  left: number,
  height: number,
  width: number,

  borderTopWidth?: number,
  borderRightWidth?: number,
  borderBottomWidth?: number,
  borderLeftWidth?: number,
  borderRadius?: number,
  borderColor?: number,

  backgroundColor?: number,
}



/**
 * 骨架描述转为骨架渲染描述
 */
export function toRenderDescList(descList: SkeletonDesc[]): RenderDesc[] {
  const res: RenderDesc[] = [];

  // borderColor:  #8e9097

  const ColorLevelMap = [
    '#D3D4D7',
    '#E9EAEB',
    '#F4F4F5',
    '#FFF'
  ]

  const colorLevelList = getColorLevelList(descList, ColorLevelMap.length - 1);

  console.log('colorLevelList', colorLevelList);

  for (const index in descList) {
    const node = descList[index];
    const renderDesc: RenderDesc = {
      left: node.x,
      top: node.y,
      height: node.height,
      width: node.width,
    }
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
    res.push(renderDesc)
  }
  return res;
}

export function getSkeletonRenderList(root: Node): RenderDesc[] {
  const descList = getSkeletonDescList(root);
  const renderList = toRenderDescList(descList);
  console.log('render', renderList);
  return renderList;
}

export interface RenderProps {
  top: CSSStyleDeclaration['top'],
  left: CSSStyleDeclaration['left'],
  height: CSSStyleDeclaration['height'],
  width: CSSStyleDeclaration['width'],

  backgroundColor?: CSSStyleDeclaration['backgroundColor']
  borderColor?: CSSStyleDeclaration['borderColor']
  borderRadius?: CSSStyleDeclaration['borderRadius'],

  borderTopWidth?: CSSStyleDeclaration['borderWidth'],
  borderRightWidth?: CSSStyleDeclaration['borderWidth'],
  borderBottomWidth?: CSSStyleDeclaration['borderWidth'],
  borderLeftWidth?: CSSStyleDeclaration['borderWidth'],
}

/**
 * 骨架渲染描述转为骨架节点render props
 */
export function transforRenderDescToRenderProps(desc: RenderDesc): RenderProps {
  const BorderColor = '#8e9097';
  const ColorLevelMap = [
    '#D3D4D7',
    '#E9EAEB',
    '#F4F4F5',
    '#FFF'
  ];
  const props: RenderProps = {
    top: desc.top + 'px',
    left: desc.left + 'px',
    height: desc.height + 'px',
    width: desc.width + 'px',
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
 * 使用'|'分隔RenderDesc的属性值，固化属性的顺序
 * @return top|left|height|width|borderTopWidth|borderRightWidth|borderBottomWidth|borderLeftWidth|borderRadius|borderColor|backgroundColor|
 */
export function renderDescToString(desc: RenderDesc): string {
  return [
    desc.top, 
    desc.left, 
    desc.height, 
    desc.width,
    desc.borderTopWidth,
    desc.borderRightWidth,
    desc.borderBottomWidth,
    desc.borderLeftWidth,
    desc.borderRadius,
    desc.borderColor,
    desc.backgroundColor
  ].join('|');
}

export function parseStringToRenderDesc(str: string): RenderDesc {
  const values: any[] = str.split('|');
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
  }
}