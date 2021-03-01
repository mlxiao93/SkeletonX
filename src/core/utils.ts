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
}

// 节点是否被覆盖
export function isCovered(list: SkeletonDesc[], targetIndex: number): boolean {
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
export function getColorLevelList(descList: SkeletonDesc[], maxLevel: number): number[] {
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