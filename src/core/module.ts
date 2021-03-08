import { RenderData, SkeletonDesc } from './skeleton'
import { parseRenderString, RenderDesc, renderDescToString, RenderProps, transforRenderDescToRenderProps } from './data-transform'
import { cssToPx, countCss, cutHeight } from './dom';

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

export function getModuleSize(renderString?: string, moduleId?: string): {height: string} {
  renderString = renderString ?? (window as any).__skeleton__x__lib.getData();
  const size = {
    height: '0px'
  };
  if (!renderString || !moduleId) return size;
  let { data, moduleMap } = parseRenderString(renderString);
  const moduleRootIndex = moduleMap[moduleId]?.[0];
  if (moduleRootIndex === undefined) return size;
  const desc = data[moduleRootIndex];
  if (!desc) return size;
  desc.height = cutHeight(desc);
  let renderProps = transforRenderDescToRenderProps(desc);
  if (renderProps.height) {
    size.height = renderProps.height
  } else {
    size.height = countCss(`100vh - ${renderProps.bottom} - ${renderProps.top}`)
  }
  
  return size;
}

export function toModuleRelativeDesc(desc: RenderDesc, moduleRootDesc?: RenderDesc): RenderDesc {
  desc = JSON.parse(JSON.stringify(desc));
  if (moduleRootDesc) {
    if (desc.left) desc.left = countCss(`${desc.left} - ${moduleRootDesc.left}`);
    if (desc.right && moduleRootDesc.right) desc.right = countCss(`${desc.right} - ${moduleRootDesc.right}`);
    if (desc.top) desc.top = countCss(`${desc.top} - ${moduleRootDesc.top}`);
    if (desc.bottom && moduleRootDesc.bottom) desc.bottom = countCss(`${desc.bottom} - ${moduleRootDesc.bottom}`);
  };
  return desc;
}

export function updateModuleMap(opt: {
  moduleMap: ModuleMap,
  addedList?: number[],
  removedList?: number[]
}): ModuleMap {
  const {moduleMap, addedList, removedList} = opt;

  removedList?.map(id => {
    Object.values(moduleMap).map(item => {
      if (id <= item[1]) item[1]--;
      if (id <= item[0]) item[0]--; 
    });
  });

  addedList?.map(id => {
    Object.values(moduleMap).map(item => {
      if (id < item[1]) item[1]++;
      if (id < item[0]) item[0]++;
    });
  });

  return moduleMap;
}