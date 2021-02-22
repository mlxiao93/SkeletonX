/**
 * 元素是否出现在视口
 * 只要有一部分在视口返回true
 */
export function isPartInViewPort(element: Element) {
  const viewWidth = window.innerWidth;
  const viewHeight = window.innerHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();
  if (top > viewHeight) return false;
  if (left > viewWidth) return false;
  if (bottom < 0) return false;
  if (right < 0) return false;
  return true;
}