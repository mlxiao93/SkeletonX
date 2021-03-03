import { SkeletonDesc } from './skeleton'

export function nodeNeedBg(node: SkeletonDesc) {
  return node.backgroundColor !== 'rgba(0, 0, 0, 0)'
    || ['img', 'svg'].includes(node.tagName.toLowerCase())
    || node.backgroundImage !== 'none'
    || node.containTextNode
    || node.boxShadow !== 'none';
}

export function needBorder(borderWidth: string) {
  return borderWidth !== '0px 0px 0px 0px' && borderWidth !== '0px';
}

// 两个元素是否有重叠部分
export function isIntersect(node1: SkeletonDesc, node2: SkeletonDesc): boolean {
  const x1 = node1.left;
  const y1 = node1.top;
  const w1 = node1.width;
  const h1 = node1.height;
  const x2 = node2.left;
  const y2 = node2.top;
  const w2 = node2.width;
  const h2 = node2.height;
  if (x1 + w1 <= x2) return false;
  if (x1 >= x2 + w2) return false;
  if (y1 + h1 <= y2) return false;
  if (y1 >= y2 + h2) return false;
  return true;
}

/**
 * index对应的node是否parentIndex对应node的子孙节点
 * @param list 
 * @param parentIndex
 * @param index 
 */
function isChildren(list: SkeletonDesc[], parentIndex: number, index: number): boolean {

  const node = list[index];
  const parentId = list[parentIndex].id;
  let parent = list.find(item => item.id === node.parentId);
  while (parent) {
    if (parent.id === parentId) return true;
    parent = list.find(item => item.id === parent.parentId);
  }

  return false;
}

// 父节点是否被子节点覆盖
export function isCovered(list: SkeletonDesc[], targetIndex: number): boolean {
  const target = list[targetIndex];
  for (let i = targetIndex + 1; i < list.length; i++) {

    if (!isChildren(list, targetIndex, i)) {return false}

    const node = list[i];
    if (!nodeNeedBg(node)) continue;
    if (node.left <= target.left
      && node.top <= target.top
      && node.left + node.width >= target.left + target.width
      && node.top + node.height >= target.top + target.height) {
      return true;
    }
  }
  return false;
}

/**
 * 重叠元素色差处理
 * 初始颜色级别都为1
 * 上次颜色级别+1
 * 
 * descList
 */
export function getColorLevelList(descList: SkeletonDesc[]): number[] {
  // 初始级别都为0
  const colorLevelList = Array(descList.length).fill(1);

  // 按照是否相交
  for (let i = 0; i < descList.length; i++) {
    const nodeI = descList[i];
    for (let j = i + 1; j < descList.length; j++) {
      const nodeJ = descList[j];
      if (!nodeNeedBg(nodeJ)) continue;
      if (isIntersect(nodeI, nodeJ)) {
        colorLevelList[j] = colorLevelList[i] + 1;
      }
    }
  }

  return colorLevelList;
}

/**
 * 保留n为小数
 * @param num 
 * @param bit 
 */
export function keepDecimals(num: number, n: number = 2): number {
  return +num.toFixed(n)
}