import {isCovered} from './utils'

/**
 * TODO 
 * 1. 文本节点精细化处理
 * 2. 响应式
 * 3. 节点层级太深处理
 * 4. overflow裁剪bug(阿里内外可发现)
 */

import { getFixedPosition, isPartInViewPort } from "./dom";
import { getComputedSizeList } from './responsive';
import { RenderDesc, toRenderDescList } from './data-transform';
import { getModuleId, getModuleMap, ModuleMap } from './module';
import { IgnoreAttrName, SkeletonRootId } from './consts';

/** 骨架元素描述 */
export interface SkeletonDesc {

  /** 基础属性 */
  id: string,     // json path
  parentId?: string,

  moduleId?: string[], // 模块id，用于局部骨架
  moduleRoot?: boolean,

  /** 标签名 */
  tagName: string,

  /** 节点类型 */
  // nodeType: Node['ELEMENT_NODE'] | Node['TEXT_NODE'],

  /** 是否包含文本节点 */
  containTextNode?: boolean;

  /** 定位 */
  left: number,
  right: number,
  top: number,
  bottom: number,
  vw: number,    // 屏宽
  vh: number,    // 屏高

  /** 尺寸 */
  height: number
  width: number

  /** 响应式 */
  // responsive?: boolean   // 是否响应式
  // responsiveWidth?: string    // 做响应式转换之后的width

  /** 边框 */
  borderWidth: CSSStyleDeclaration['borderWidth']
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
export function getSkeletonDescList(root: Node, viewport: Window = window): SkeletonDesc[] {
  let list = generateSkeletonDescList({ node: root, viewport });

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
  parentDesc?: SkeletonDesc,
  viewport?: Window
}): SkeletonDesc | null {
  const { node, index, parentDesc, viewport = window } = opt;

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

  if (element.id === SkeletonRootId || element.parentElement?.id === SkeletonRootId) return null;
  if (element.getAttribute(IgnoreAttrName) !== null) return null;   // skeletonx-ignore

  const style = getComputedStyle(element);

  /** 过滤不可见元素 */
  let ignore = false;
  if (style.display === 'none') ignore = true;
  else if (style.visibility === 'hidden') ignore = true;
  else if (!isPartInViewPort(element)) ignore = true;

  if (ignore) {
    return null;
  }

  const nodeSkltModuleId = element.getAttribute('skeletonx-module-id') ?? undefined;

  return {
    parentId: parentDesc ? parentDesc.id : null,
    id: parentDesc ? `${parentDesc.id}[${index}]` : '',

    moduleRoot: nodeSkltModuleId ? true : undefined,
    moduleId: getModuleId(nodeSkltModuleId, parentDesc),

    tagName: element.tagName,

    ...getFixedPosition(element, viewport),

    borderWidth: style.borderWidth,
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
  list?: SkeletonDesc[],
  viewport?: Window
}): SkeletonDesc[] {
  const { node, parentDesc, index = 0, list = [], viewport = window } = opt

  const skeletonDesc = getSkeletonDesc({ node, index, parentDesc, viewport})
  if (!skeletonDesc) return;

  list.push(skeletonDesc);

  if (skeletonDesc.tagName.toLowerCase() === 'svg') return list;

  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      generateSkeletonDescList({
        node: node.childNodes[i],
        parentDesc: skeletonDesc,
        index: i,
        list,
        viewport
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
        if (child.left < node.left) child.left = node.left;
        if (child.left + child.width > node.left + node.width) child.width = node.width - (child.left - node.left);
      }
      if (node.overflowY !== 'visible') {
        // 纵向被裁剪
        //   child.height = node.height;
        if (child.top < node.top) child.top = node.top;
        if (child.top + child.height > node.top + node.height) child.height = node.height - (child.top - node.top)
      }

      const grandChildren = list.filter(item => item.parentId === child.id);
      nodesQueue.push(...grandChildren);
    }
  }
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

    if (node.moduleRoot) {
      return true;
    }
    
    // 无背景色
    const noBg = /rgba\((\d+,\s*){3}0\)/.test(node.backgroundColor) && node.backgroundImage === 'none';
    // 无文本
    const noText = !node.containTextNode;
    // 无边框
    const noBorder = node.borderWidth === '0px 0px 0px 0px' || node.borderWidth === '0px';
    // 无阴影
    const noShadow = node.boxShadow === 'none';
    // 无尺寸
    const noSize = node.width * node.height <= 0;

    /** 白色body */
    let whiteBody = node.tagName.toLowerCase() === 'body' && node.backgroundColor === 'rgb(255, 255, 255)';

    // 删掉节点
    if ((noBg && noText && noBorder && noShadow && whiteBody)
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

  return res;
}

export interface RenderData {
  data: RenderDesc[],
  moduleMap?: ModuleMap
}

export function getRenderData(root: Node, root2: Node, viewport2: Window): RenderData {
  const descList = getSkeletonDescList(root, window);
  const descList2 = root2 ? getSkeletonDescList(root2, viewport2) : [];

  console.log('desclist', descList);
  console.log('desclist2', descList2);
  const computedSizeList = getComputedSizeList(descList, descList2);

  console.log('computedSizeList', computedSizeList);

  const renderList = toRenderDescList(descList, computedSizeList);
  const moduleMap = getModuleMap(descList);
  console.log('render data', renderList);
  console.log('module map', moduleMap);

  return {
    data: renderList,
    moduleMap
  }
}