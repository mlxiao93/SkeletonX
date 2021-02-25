// SkeletonDesc -> RenderDesc
// RenderDesc -> RenderProps
// RenderDesc <-> RenderString

import { SkeletonDesc } from './skeleton'
import { nodeNeedBg, nodeNeedBorder } from './utils';

export interface RenderDesc {
  top: number,
  left: number,
  height: number,
  width: number,

  borderTopWidth?: number,
  borderRightWidth?: number,
  borderBottomWidth?: number,
  borderLeftWidth?: number,
  borderRadius?: number,
  borderColor?: number,

  backgroundColor?: number,
}

/**
 * 骨架描述转为骨架渲染描述
 */
export function toRenderDescList(descList: SkeletonDesc[]): RenderDesc[] {
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
    const renderDesc: RenderDesc = {
      left: node.x,
      top: node.y,
      height: node.height,
      width: node.width,
    }
    if (node.borderLeftWidth !== '0px') renderDesc.borderLeftWidth = Number(node.borderLeftWidth.replace('px', ''));
    if (node.borderRightWidth !== '0px') renderDesc.borderRightWidth = Number(node.borderRightWidth.replace('px', ''));
    if (node.borderTopWidth !== '0px') renderDesc.borderTopWidth = Number(node.borderTopWidth.replace('px', ''));
    if (node.borderBottomWidth !== '0px') renderDesc.borderBottomWidth = Number(node.borderBottomWidth.replace('px', ''));
    if (node.borderRadius !== '0px') renderDesc.borderRadius = Number(node.borderRadius.replace('px', ''));
    if (nodeNeedBorder(node)) {
      renderDesc.borderColor = 0;
    }
    if (nodeNeedBg(node)) {
      // renderDesc.backgroundColor = colorLevelList[index];
      renderDesc.backgroundColor = 1;
    }
    res.push(renderDesc)
  }
  return res;
}
export interface RenderProps {
  top: CSSStyleDeclaration['top'],
  left: CSSStyleDeclaration['left'],
  height: CSSStyleDeclaration['height'],
  width: CSSStyleDeclaration['width'],

  background?: CSSStyleDeclaration['backgroundColor']
  borderColor?: CSSStyleDeclaration['borderColor']
  borderRadius?: CSSStyleDeclaration['borderRadius'],

  borderTopWidth?: CSSStyleDeclaration['borderWidth'],
  borderRightWidth?: CSSStyleDeclaration['borderWidth'],
  borderBottomWidth?: CSSStyleDeclaration['borderWidth'],
  borderLeftWidth?: CSSStyleDeclaration['borderWidth'],
}

/**
 * 骨架渲染描述转为骨架节点render props
 */
export function transforRenderDescToRenderProps(desc: RenderDesc): RenderProps {
  const BorderColor = '#8e9097';
  // const ColorLevelMap = [
  //   '#D3D4D7',
  //   '#E9EAEB',
  //   '#F4F4F5',
  //   '#FFF'
  // ];
  const props: RenderProps = {
    top: desc.top + 'px',
    left: desc.left + 'px',
    height: desc.height + 'px',
    width: desc.width + 'px',
  };
  if (desc.backgroundColor !== undefined) props.background = 'linear-gradient(90deg,rgb(190 190 190 / 20%) 25%,hsla(0,0%,50.6%,.24) 37%,hsla(0,0%,74.5%,.2) 63%); background-size: 400% 100%;';
  if (desc.borderColor !== undefined) props.borderColor = BorderColor;
  if (desc.borderRadius !== undefined) props.borderRadius = desc.borderRadius + 'px';
  if (desc.borderBottomWidth !== undefined) props.borderBottomWidth = desc.borderBottomWidth + 'px';
  if (desc.borderTopWidth !== undefined) props.borderTopWidth = desc.borderTopWidth + 'px';
  if (desc.borderRightWidth !== undefined) props.borderRightWidth = desc.borderRightWidth + 'px';
  if (desc.borderLeftWidth !== undefined) props.borderLeftWidth = desc.borderLeftWidth + 'px';
  return props;
}

/**
 * 使用'|'分隔RenderDesc的属性值，固化属性的顺序
 * @return top|left|height|width|borderTopWidth|borderRightWidth|borderBottomWidth|borderLeftWidth|borderRadius|borderColor|backgroundColor|
 */
export function renderDescToString(desc: RenderDesc): string {
  return [
    desc.top, 
    desc.left, 
    desc.height, 
    desc.width,
    desc.borderTopWidth,
    desc.borderRightWidth,
    desc.borderBottomWidth,
    desc.borderLeftWidth,
    desc.borderRadius,
    desc.borderColor,
    desc.backgroundColor
  ].join('|');
}

export function parseStringToRenderDesc(str: string): RenderDesc {
  const values: any[] = str.split('|');
  return {
    top: values[0] || undefined,
    left: values[1] || undefined,
    height: values[2] || undefined,
    width: values[3] || undefined,
    borderTopWidth: values[4] || undefined,
    borderRightWidth: values[5] || undefined,
    borderBottomWidth: values[6] || undefined,
    borderLeftWidth: values[7] || undefined,
    borderRadius: values[8] || undefined,
    borderColor: values[9] || undefined,
    backgroundColor: values[10] || undefined
  }
}