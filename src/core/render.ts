import { parseRenderString, RenderDesc } from './data-transform'
import { transforRenderDescToRenderProps } from './data-transform'
import { countCss, cssToPx, cutHeight } from './dom';
import { toModuleRelativeDesc } from './module'

/**
 * @param desc 
 * @param moduleRootDesc 如果传递了moduleRootDesc，则骨架基于moduleRootDesc定位
 */
function descToHtml(desc: RenderDesc, index: number, moduleRootDesc?: RenderDesc) {
  desc = JSON.parse(JSON.stringify(desc));
  desc.height = cutHeight(desc);

  if (moduleRootDesc) {
    moduleRootDesc = JSON.parse(JSON.stringify(moduleRootDesc));
    moduleRootDesc.height = cutHeight(moduleRootDesc);
  }

  desc = toModuleRelativeDesc(desc, moduleRootDesc);
  let renderProps = transforRenderDescToRenderProps(desc)
  let style = `z-index:9999999;position:absolute;`;
  if (moduleRootDesc) {
    style = 'position:absolute;'
  }
  for (let key in renderProps) {
    if (key === 'background') continue;
    const value = renderProps[key];
    if (!value) continue;
    style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';'
  };
  return `<div id="${index}" ${renderProps.background ? 'bg' : ''} class="skeleton-x-node" style="${style}"></div>`
}

export function renderToHtml(renderString?: string, moduleId?: string): string {
  
  renderString = renderString ?? (window as any).__skeleton__x__lib.getData();

  if (!renderString) return '';

  let { data, moduleMap } = parseRenderString(renderString);

  // 渲染模块骨架的情况
  let moduleRootDesc: RenderDesc;
  if (moduleId !== undefined && moduleMap !== undefined) {
    const moduleRootIndex = moduleMap[moduleId]?.[0];
    const moduleLastIndex = moduleMap[moduleId]?.[1];
    if (moduleRootIndex !== undefined) {
      moduleRootDesc = data[moduleRootIndex];
      data = data.slice(moduleRootIndex, moduleLastIndex + 1);
    }
  }

  let html = '';
  for (let i = 0; i < data.length; i++) {
    html += descToHtml(data[i], i, moduleRootDesc);
  };
  return html;
}