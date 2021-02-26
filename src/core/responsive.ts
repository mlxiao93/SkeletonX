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
  list.map((item, index) => {
    const refItem = refList.find(i => i.id === item.id);
    res.push(getComputedSize(item, refItem, index));
  })
  return res;
}

export function getComputedSize(item: SkeletonDesc, refItem?: SkeletonDesc, index?: number): ComputedSize {
  const itemSize = getSkeletonDescSize(item);

  const computedSize: ComputedSize = {
    left: `${itemSize.pLeft}vw`,
    top: `${itemSize.top}px`,
    width: `${itemSize.pWidth}vw`,
    height: `${itemSize.height}px`
  }

  if (!refItem) return computedSize;
  const refItemSize = getSkeletonDescSize(refItem);

  const _widthEqual = widthEqual(itemSize, refItemSize);
  const _leftEqual = leftEqual(itemSize, refItemSize);
  const _rightEqual = rightEqual(itemSize, refItemSize);

  const _heightEqual = heightEqual(itemSize, refItemSize);
  const _topEqual = topEqual(itemSize, refItemSize);
  const _bottomEqual = bottomEqual(itemSize, refItemSize);

  /** 计算水平方向的尺寸 */
  if (_widthEqual + _leftEqual + _rightEqual === 0) {
    // 三个值都不等的情况不会出现
  } else if (_widthEqual + _leftEqual + _rightEqual >= 30) { 
    // 三个值相等取左右vw
    delete computedSize.width;
    computedSize.left = `${itemSize.pLeft}vw`;
    computedSize.right = `${itemSize.pRight}vw`;
  } else if (_widthEqual + _leftEqual + _rightEqual >= 20) {
    // 两个值相等的情况，哪个不等，取另外两个
    computedSize.width = _widthEqual === 10 ? `${itemSize.width}px` : `${itemSize.pWidth}vw`
    computedSize.left = _leftEqual === 10 ? `${itemSize.left}px` : `${itemSize.pLeft}vw`;
    computedSize.right = _rightEqual === 10 ? `${itemSize.right}px` : `${itemSize.pRight}vw`;
    if (!_widthEqual) {
      delete computedSize.width;
    } else if (!_leftEqual) {
      delete computedSize.left;
    } else {
      delete computedSize.right;
    }
  } else {
    // 只有一个值相等的情况
    // 这种情况只可能是width相等（元素居中的情况）
    // TODO 还有情况是改变视口计算的误差需要处理
    delete computedSize.right;
    computedSize.width = _widthEqual === 10 ? `${itemSize.width}px` : `${itemSize.pWidth}vw`
    const midOffset = document.documentElement.clientWidth * 0.5 - itemSize.left;
    computedSize.left = midOffset > 0 ? `calc(50vw - ${midOffset}px)` : `calc(50vw + ${-midOffset}px)`
  }

  /** 计算垂直方向的尺寸 */
  if (_heightEqual + _topEqual + _bottomEqual === 0) {
    // 三个值都不等的情况不会出现
  } else if (_heightEqual + _topEqual + _bottomEqual >= 30) {
    // 三个值相等取上下vh
    delete computedSize.height;
    computedSize.top = `${itemSize.pTop}vh`;
    computedSize.bottom = `${itemSize.pBottom}vh`
  } else if (_heightEqual + _topEqual + _bottomEqual >= 20) {
    // 两个值相等的情况，哪个不等，取另外两个
    computedSize.height = _heightEqual === 10 ? `${itemSize.height}px` : `${itemSize.pHeight}vh`
    computedSize.top = _topEqual === 10 ? `${itemSize.top}px` : `${itemSize.pTop}vh`;
    computedSize.bottom = _bottomEqual === 10 ? `${itemSize.bottom}px` : `${itemSize.pBottom}vh`
    if (!_heightEqual) {
      delete computedSize.height
    } else if (!topEqual) {
      delete computedSize.top
    } else {
      delete computedSize.bottom
    }
  } else {
    // 只有一个值相等的情况
    // 这种情况只可能是height相等（元素居中的情况）
    // TODO 还有情况是改变视口计算的误差需要处理
    delete computedSize.bottom;
    computedSize.height = _heightEqual === 10 ? `${itemSize.height}px` : `${itemSize.pHeight}vw`
    const midOffset = document.documentElement.clientHeight * 0.5 - itemSize.top;
    computedSize.left = midOffset > 0 ? `calc(50vh - ${midOffset}px)` : `calc(50vh + ${-midOffset}px)`
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

/**
 * 0代表不相等
 * 10代表px相等
 * 11代表vw相等
 */
function widthEqual(size1: DescSize, size2: DescSize): 0 | 10 | 11 {
  if (size1.width === size2.width) return 10;
  if (Math.abs(size1.pWidth - size2.pWidth) < 0.1) return 11;
  return 0;
}

function heightEqual(size1: DescSize, size2: DescSize): 0 | 10 | 11 {
  if (size1.height === size2.height) return 10;
  if (Math.abs(size1.pHeight - size2.pHeight) < 0.1 ) return 11;
  return 0;
}

function topEqual(size1: DescSize, size2: DescSize): 0 | 10 | 11 {
  if (size1.top === size2.top) return 10;
  if (Math.abs(size1.pTop - size2.pTop) < 0.1) return 11;
  return 0;
}

function bottomEqual(size1: DescSize, size2: DescSize): 0 | 10 | 11 {
  if (size1.bottom === size2.bottom) return 10;
  if (Math.abs(size1.pBottom - size2.pBottom) < 0.1) return 11;
  return 0;
}

function leftEqual(size1: DescSize, size2: DescSize): 0 | 10 | 11 {
  if (size1.left === size2.left) return 10;
  if (Math.abs(size1.pLeft - size2.pLeft) < 0.1) return 11;
  return 0;
}

function rightEqual(size1: DescSize, size2: DescSize): 0 | 10 | 11 {
  if (size1.right === size2.right) return 10;
  if (Math.abs(size1.pRight - size2.pRight) < 0.1) return 11;
  return 0;
}
