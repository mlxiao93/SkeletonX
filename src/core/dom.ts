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

export function cssToPx(size: string, viewport: Window = window): number {
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

/**
 * @param size calc(100vw + 100px) - calc(50vw + 60px)
 * @return calc(50vw - 40px)
 */
export function countCss(size: string): string {
  // 去掉calc
  size = size.replace(/calc\((.+?)\)/g, '($1)');   

  // 去括号
  const bracketReg = /-\s?\((.+?)\)/
  let bracketsMatch = size.match(bracketReg);
  while (bracketsMatch) {
    const strArr = bracketsMatch[1].split('');
    for (let i = 0; i < strArr.length; i++) {
      if (strArr[i] === '-') {
        strArr[i] = '+';
      } else if (strArr[i] === '+') {
        strArr[i] = '-';
      }
    }
    const str = strArr.join('')
    size = size.replace(bracketReg, '- ' + str);
    bracketsMatch = size.match(bracketReg);
  }
  size = size.replace(/\((.+?)\)/g, '$1');

  const pxList = size.match(/[+-]?\s?(\d+\.)?\d+px/g);
  const vwList = size.match(/[+-]?\s?(\d+\.)?\d+vw/g);
  const vhList = size.match(/[+-]?\s?(\d+\.)?\d+vh/g);

  const px = pxList && (new Function('return ' + pxList.join('').replace(/px/g, ''))());
  const vw = vwList && (new Function('return ' + vwList.join('').replace(/vw/g, ''))());
  const vh = vhList && (new Function('return ' + vhList.join('').replace(/vh/g, ''))());

  let res = px + 'px' || vw + 'vw' || vh + 'vh';
  if (vw && px) {
    res = `calc(${vw}vw + ${px}px)`
  } else if (vh && px) {
    res = `calc(${vh}vh + ${px}px)`
  }

  res = res.replace(/\+\s-/g, '- ').replace(/\+\s\+/g, '+ ').replace(/$\+/, '');
  return res;
}