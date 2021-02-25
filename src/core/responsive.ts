import {SkeletonDesc} from './skeleton'

export const RefViewportRatio = 0.95;
export interface ComputedSize {
  width?: string
  height?: string
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export function getComputedSizeList(list: SkeletonDesc[], refList: SkeletonDesc[]): ComputedSize[] {
  const res: ComputedSize[] = [];
  list.map(item => {
    const refItem = refList.find(i => i.id === item.id);
    res.push(getComputedSize(item, refItem));
  })
  return res;
}

export function getComputedSize(item: SkeletonDesc, refItem?: SkeletonDesc): ComputedSize {
  const itemSize = getSkeletonDescSize(item);

  const defaultComputedSize: ComputedSize = {
    left: `${itemSize.pLeft}vw`,
    // left: `${itemSize.left}px`,
    top: `${itemSize.top}px`,
    width: `${itemSize.pWidth}vw`,
    // width: `${itemSize.width}px`,
    height: `${itemSize.height}px`
  }

  return defaultComputedSize;
  let computedSize: ComputedSize = {}

  if (!refItem) {   // 没找到refItem，很有可能该元素被设置了media query并且刚好触发了临界值
    return defaultComputedSize;
  }

  const refItemSize = getSkeletonDescSize(refItem);

  const _widthEqual = widthEqual(itemSize, refItemSize);
  const _leftEqual = leftEqual(itemSize, refItemSize);
  const _rightEqual = rightEqual(itemSize, refItemSize);

  const _height = heightEqual(itemSize, refItemSize);
  const _top = topEqual(itemSize, refItemSize);
  const _bottom = bottomEqual(itemSize, refItemSize);

  // 三个值相等取左右
  if (_widthEqual && _leftEqual && _rightEqual) {
    
  }

  return computedSize
}

interface DescSize {
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,
  pWidth: number,
  pHeight: number,
  pLeft: number,
  pRight: number,
  pTop: number,
  pBottom: number,
}

function getSkeletonDescSize(item: SkeletonDesc): DescSize {
  return {
    width: item.width,
    height: item.height,
    left: item.left,
    right: item.right,
    top: item.top,
    bottom: item.bottom,
    pWidth: +(item.width / item.vw * 100).toFixed(2),
    pHeight: +(item.height / item.vh * 100).toFixed(2),
    pLeft: +(item.left / item.vw * 100).toFixed(2),
    pRight: +(item.right / item.vw * 100).toFixed(2),
    pTop: +(item.top / item.vh * 100).toFixed(2),
    pBottom: +(item.bottom / item.vh * 100).toFixed(2)
  }
}

function widthEqual(size1: DescSize, size2: DescSize): 0 | 1 | 2 {
  if (size1.width === size2.width) return 1;
  if (Math.abs(size1.pWidth - size2.pWidth) < 0.1) return 2;
  return 0;
}

function heightEqual(size1: DescSize, size2: DescSize): 0 | 1 | 2 {
  if (size1.height === size2.height) return 1;
  if (Math.abs(size1.pHeight - size2.pHeight) < 0.1 ) return 2;
  return 0;
}

function topEqual(size1: DescSize, size2: DescSize): 0 | 1 | 2 {
  if (size1.top === size2.top) return 1;
  if (Math.abs(size1.pTop - size2.pTop) < 0.1) return 2;
  return 0;
}

function bottomEqual(size1: DescSize, size2: DescSize): 0 | 1 | 2 {
  if (size1.bottom === size2.bottom) return 1;
  if (Math.abs(size1.pBottom - size2.pBottom) < 0.1) return 2;
  return 0;
}

function leftEqual(size1: DescSize, size2: DescSize): 0 | 1 | 2 {
  if (size1.left === size2.left) return 1;
  if (Math.abs(size1.pLeft - size2.pLeft) < 0.1) return 2;
  return 0;
}

function rightEqual(size1: DescSize, size2: DescSize): 0 | 1 | 2 {
  if (size1.right === size2.right) return 1;
  if (Math.abs(size1.pRight - size2.pRight) < 0.1) return 2;
  return 0;
}
