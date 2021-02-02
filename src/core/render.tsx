import { parseStringToRenderDesc, RenderDesc, renderDescToString, transforRenderDescToRenderProps, ModuleMap } from './skeleton'

/**
 * @param desc 
 * @param moduleRootDesc 如果传递了moduleRootDesc，则骨架基于moduleRootDesc定位
 */
function descToHtml(desc: RenderDesc, moduleRootDesc?: RenderDesc) {
  desc =  {...desc};
  if (moduleRootDesc) {
    desc.left = desc.left - moduleRootDesc.left;
    desc.top = desc.top = moduleRootDesc.top;
  }
  let renderProps = transforRenderDescToRenderProps(desc)

  let style = 'z-index:9999999;position:absolute;';
  for (let key in renderProps) {
    style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';'
  };
  return '<div style="' + style + '"></div>';
}

export function renderToHtml(dataString: string, moduleId?: string): string {
  
  const [ renderString, moduleString ] = dataString.split('::');
  let renderDescList = renderString.split(',').map(str => {
    return parseStringToRenderDesc(str);
  });

  // 渲染模块骨架的情况
  let moduleRootDesc: RenderDesc;
  if (moduleId !== undefined) {
    const moduleMap = moduleString ? JSON.parse(moduleString) as ModuleMap : undefined;
    const moduleRootIndex = moduleMap[moduleId]?.[0];
    const moduleLastIndex = moduleMap[moduleId]?.[1];
    if (moduleRootIndex !== undefined) {
      moduleRootDesc = renderDescList[moduleRootIndex];
      renderDescList = renderDescList.slice(moduleRootIndex, moduleLastIndex + 1);
    }
  }

  let html = '';
  for (let i = 0; i < renderDescList.length; i++) {
    html += descToHtml(renderDescList[i], moduleRootDesc);
  };
  return html;
}

export function getModuleSize(dataString: string, moduleId: string): {width: string, height: string} {
  const size = {
    width: '0px',
    height: '0px'
  }
  const [ renderString, moduleString ] = dataString.split('::');
  const renderDescList = renderString.split(',').map(str => {
    return parseStringToRenderDesc(str);
  });
  const moduleMap = JSON.parse(moduleString);
  const moduleRootIndex = moduleMap[moduleId]?.[0];
  if (moduleRootIndex === undefined) return size;
  const desc = renderDescList[moduleRootIndex];
  if (!desc) return size;
  let renderProps = transforRenderDescToRenderProps(desc);
  size.width = renderProps.width;
  size.height = renderProps.height;
  return size;
}

