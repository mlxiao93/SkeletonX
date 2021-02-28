/**
 * 元素是否出现在视口
 * 只要有一部分在视口返回true
 */
export function isPartInViewPort(element: Element) {
  const viewWidth = document.documentElement.clientWidth;
  const viewHeight = document.documentElement.clientHeight;
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

export function getFixedPosition(element: Element, viewport: Window = window): {
  left: number,
  top: number,
  right: number,
  bottom: number,
  width: number,
  height: number,
  vw: number,
  vh: number
} {

  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = element.getBoundingClientRect();

  // const viewportWidth = viewport.innerWidth;
  const viewportWidth = viewport.document.documentElement.clientWidth;
  const viewportHeight = viewport.document.documentElement.clientHeight;

  return {
    left,
    top,
    right: viewportWidth - right,
    bottom: viewportHeight - bottom,
    width,
    height,
    vw: viewportWidth,
    vh: viewportHeight
  }
}

export function countCss(size: string, viewport: Window = window): number {
  if (!size) return 0;
  
  const vw = viewport.document.documentElement.clientWidth;
  const vh = viewport.document.documentElement.clientHeight;

  const match = size.match(/calc\((.+?)\)/) 
  if (match?.[1]) {
    size = match?.[1]
  };

  size = size.replace(/calc\((.+?)\)/g, '($1)')
          .replace(/vw/g, ` * ${vw / 100}`)
          .replace(/vh/g, ` * ${vh / 100}`)
          .replace(/px/g, '');

  const count = new Function(`return ${size}`)

  return count();
}