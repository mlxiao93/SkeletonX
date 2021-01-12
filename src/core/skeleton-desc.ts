/** 骨架元素描述 */
export interface SkeletonDesc {

  /** 基础属性 */
  id: string,     // json path
  parentId?: string,
  level: number,

  /** 节点类型 */
  nodeType: Node['ELEMENT_NODE'] | Node['TEXT_NODE']

  /** 定位 */
  x: number
  y: number

  /** 尺寸 */
  offsetHeight: number
  offsetWidth: number

  /** 边框 */
  border: CSSStyleDeclaration['border']
  borderLeft: CSSStyleDeclaration['borderLeft']
  borderRight: CSSStyleDeclaration['borderRight']
  borderTop: CSSStyleDeclaration['borderTop']
  borderBottom: CSSStyleDeclaration['borderBottom']
  borderRadius: CSSStyleDeclaration['borderRadius']
  boxShadow: CSSStyleDeclaration['boxShadow']

  /** 背景色 */
  background: CSSStyleDeclaration['background'];
}

/**
 * 提取骨架描述
 */
export function getSkeletonDesc(opt: {
  node: Node,
  index: number,
  level: number
  parentDesc?: SkeletonDesc
}): SkeletonDesc | null {
  const { node, level, index, parentDesc} = opt;
  if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType)) {   // 只处理元素节点和文本节点
    return null
  }

  let element = node as HTMLElement;

  /** 处理文本节点 */
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.textContent.replace(/↵|\s/g, '')) {    // 过滤无内容的文本节点
      return null
    }
    element = node.parentElement;   
  }
  
  const style = getComputedStyle(element);

  /** 过滤不可见元素 */
  let ignore = false;
  if (style.display === 'none') ignore = true;
  else if (style.visibility === 'hidden') ignore = true;
  else if (style.overflow === 'hidden' && (element.offsetHeight * element.offsetWidth === 0)) ignore = true
  if (ignore) {
    return null;
  }

  const clientRect = element.getBoundingClientRect();

  return {
    parentId: parentDesc?.id,
    id: parentDesc ? `${parentDesc.id}[${index}]` : '',
    level,
    nodeType: node.nodeType,
    x: clientRect.left,
    y: clientRect.top,

    offsetHeight: element.offsetHeight,
    offsetWidth: element.offsetWidth,

    border: style.border,
    borderBottom: style.borderBottom,
    borderLeft: style.borderLeft,
    borderRight: style.borderRight,
    borderTop: style.borderTop,
    borderRadius: style.borderRadius,
    boxShadow: style.boxShadow,

    background: style.background,

    // $node: node,    // for debug
  }
}

/**
 * 生成骨架元素扁平数据
 */
export function generateSkeletonDescList(opt: {
  node: Node
  parentDesc?: SkeletonDesc,
  level: number,
  index: number,
  list: SkeletonDesc[]
}): SkeletonDesc[] {
  const { node, parentDesc, level = 0, index = 0, list = [] } = opt
  
  const skeletonDesc = getSkeletonDesc({node, level, index, parentDesc})
  if (!skeletonDesc) return;

  list.push(skeletonDesc);

  if (node.hasChildNodes()) {
    for ( let i = 0; i < node.childNodes.length; i++ ) {
      generateSkeletonDescList({
        node: node.childNodes[i],
        parentDesc: skeletonDesc,
        level: level + 1,
        index: i,
        list
      });
    }
  }

  return list;
}
/**
 * 精简骨架节点
 */
export function reduceSkeletonDescList(list: SkeletonDesc[]) {
  // 同级文本节点合并为一个
  return list;
}