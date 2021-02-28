// SkeletonDesc -> RenderDesc
// RenderDesc -> RenderProps
// RenderDesc <-> RenderString

import { RenderData, SkeletonDesc } from './skeleton'
import { nodeNeedBg, needBorder } from './utils';
import { ComputedSize } from './responsive'
import { ModuleMap } from './module';

export interface RenderDesc {
  width?: string,
  height?: string,
  top?: string,
  right?: string,
  bottom?: string
  left?: string,

  borderRadius?: string,

  borderWidth?: string

  backgroundColor?: number,
}

/**
 * 骨架描述转为骨架渲染描述
 */
export function toRenderDescList(descList: SkeletonDesc[], computedSizeList: ComputedSize[]): RenderDesc[] {
  const res: RenderDesc[] = [];

  // borderColor:  #8e9097
  // const ColorLevelMap = [
  //   '#D3D4D7',
  //   '#E9EAEB',
  //   '#F4F4F5',
  //   '#FFF'
  // ]
  // const colorLevelList = getColorLevelList(descList, ColorLevelMap.length - 1);

  // console.log('colorLevelList', colorLevelList);

  for (const index in descList) {
    const node = descList[index];
    const computedSize = computedSizeList[index];
    const renderDesc: RenderDesc = {
      width: computedSize.width,
      height: computedSize.height,
      top: computedSize.top,
      right: computedSize.right,
      bottom: computedSize.bottom,
      left: computedSize.left,
      borderWidth: needBorder(node.borderWidth) ? node.borderWidth : undefined,
      borderRadius: node.borderRadius === '0px' ? undefined : node.borderRadius,
    }

    if (nodeNeedBg(node)) {
      // renderDesc.backgroundColor = colorLevelList[index];
      renderDesc.backgroundColor = 1;
    }
    res.push(renderDesc)
  }
  return res;
}

export interface RenderProps extends Partial<Pick<CSSStyleDeclaration,
  'width' |
  'height' |
  'top' | 'right' | 'bottom' | 'left' |
  'background' |
  'borderColor' | 'borderWidth' | 'borderRadius'
>> {
}

/**
 * 骨架渲染描述转为骨架节点render props
 */
export function transforRenderDescToRenderProps(desc: RenderDesc): RenderProps {
  // const ColorLevelMap = [
  //   '#D3D4D7',
  //   '#E9EAEB',
  //   '#F4F4F5',
  //   '#FFF'
  // ];
  const props: RenderProps = {
    top: desc.top,
    left: desc.left,
    height: desc.height,
    width: desc.width,
    bottom: desc.bottom,
    right: desc.right,
    borderRadius: desc.borderRadius,
    borderWidth: desc.borderWidth
  };
  if (desc.backgroundColor !== undefined) props.background = 'linear-gradient(90deg,rgb(190 190 190 / 20%) 25%,hsla(0,0%,50.6%,.24) 37%,hsla(0,0%,74.5%,.2) 63%); background-size: 400% 100%;';
  if (desc.borderWidth !== undefined) props.borderColor = 'rgb(190 190 190 / 20%)';
  return props;
}

const SplitSymbol = '|'

/**
 * 使用SplitSymbol分隔RenderDesc的属性值，固化属性的顺序
 * @return string
 */
export function renderDescToString(desc: RenderDesc): string {
  return [
    desc.width,
    desc.height,
    desc.top,
    desc.right,
    desc.bottom,
    desc.left,
    desc.borderRadius,
    desc.borderWidth,
    desc.backgroundColor
  ].join(SplitSymbol);
}

export function parseStringToRenderDesc(str: string): RenderDesc {
  const values: any[] = str.split(SplitSymbol);
  return {
    width: values[0] || undefined,
    height: values[1] || undefined,
    top: values[2] || undefined,
    right: values[3] || undefined,
    bottom: values[4] || undefined,
    left: values[5] || undefined,
    borderRadius: values[6] || undefined,
    borderWidth: values[7] || undefined,
    backgroundColor: values[8] || undefined,
  }
}

export function getRenderDescFromSkeletonDom(root: Element): RenderDesc[] {
  const nodeList = root.querySelectorAll('.skeleton-x-node');

  const descList: RenderDesc[] = []

  nodeList.forEach(node => {
    const style = (node as HTMLDivElement).style;
    const desc: RenderDesc = {
      width: style.width || undefined,
      height: style.height || undefined,
      top: style.top || undefined,
      right: style.right || undefined,
      bottom: style.bottom || undefined,
      left: style.left || undefined
    };
    if (style.borderRadius) {
      desc.borderRadius = style.borderRadius;
    }
    if (style.borderWidth) {
      desc.borderWidth = style.borderWidth;
    }
    if (style.background) {
      desc.backgroundColor = 1;
    }
    descList.push(desc);
  });

  return descList;
}


export function joinRenderString(renderData: RenderData): string {
  const {data, moduleMap} = renderData;
  const dataString = data.map(item => renderDescToString(item)).join(',');
  const moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined;
  let res = dataString;
  if (moduleString) {
    res = dataString + '::' + moduleString;
  };
  return res;
}

export function parseRenderString(renderString: string): RenderData {
  const [ dataString, moduleString ] = renderString.split('::');
  let data = dataString.split(',').map(str => {
    return parseStringToRenderDesc(str);
  });
  let moduleMap = moduleString ? JSON.parse(moduleString) as ModuleMap : undefined;
  return {
    data,
    moduleMap
  }
}