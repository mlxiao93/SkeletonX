import { RenderData, SkeletonDesc } from './skeleton'
import { parseRenderString, RenderDesc, renderDescToString, transforRenderDescToRenderProps } from './data-transform'
import { countCss } from './dom';

export interface ModuleMap {
  [key: string/*module id*/]: [number/*start index*/, number/*end index*/]
}

// 提取moduleId
export function getModuleId(nodeSkltModuleId?: string, parentDesc?: SkeletonDesc): string[] | undefined {
  let moduleId = undefined;
  const parentModuleId = parentDesc?.moduleId ?? [];
  if (nodeSkltModuleId || parentModuleId?.length) {
    moduleId = [...parentModuleId, nodeSkltModuleId].filter(i => i)
  }
  if (!moduleId?.length) moduleId = undefined;
  return moduleId;
}

export function getModuleMap(descList: SkeletonDesc[]): ModuleMap | undefined {
  let ModuleMap: ModuleMap;
  for (const i in descList) {
    const desc = descList[i];
    const moduleId = desc.moduleId;
    if (moduleId?.length) {
      ModuleMap = ModuleMap || {};
      for (const id of moduleId) {
        if (!ModuleMap[id]) {
          ModuleMap[id] = [Number(i), Number(i)];
        } else {
          ModuleMap[id][1] = Number(i);
        }
      }
    }
  };

  return ModuleMap;
}

export function getModuleSize(renderString?: string, moduleId?: string): {width: string, height: string} {
  renderString = renderString ?? (window as any).__skeleton__x__lib.getData();
  const size = {
    width: '0px',
    height: '0px'
  }
  if (!renderString || !moduleId) return size;
  let { data, moduleMap } = parseRenderString(renderString);
  const moduleRootIndex = moduleMap[moduleId]?.[0];
  if (moduleRootIndex === undefined) return size;
  const desc = data[moduleRootIndex];
  if (!desc) return size;
  let renderProps = transforRenderDescToRenderProps(desc);
  size.width = renderProps.width;
  size.height = renderProps.height;
  return size;
}

export function toModuleRelativeDesc(desc: RenderDesc, moduleRootDesc?: RenderDesc): RenderDesc {
  desc = JSON.parse(JSON.stringify(desc));
  if (moduleRootDesc) {
    desc.left = countCss(`${desc.left} - ${moduleRootDesc.left}`) + 'px';
    desc.top = countCss(`${desc.top} - ${moduleRootDesc.top}`) + 'px';
  };
  return desc;
}