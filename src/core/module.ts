import { RenderDesc, SkeletonDesc } from './skeleton'

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

export function toModuleRelativeDesc(desc: RenderDesc, moduleRootDesc?: RenderDesc): RenderDesc {
  desc = JSON.parse(JSON.stringify(desc));
  if (moduleRootDesc) {
    desc.left = desc.left - moduleRootDesc.left;
    desc.top = desc.top - moduleRootDesc.top;
  };
  return desc;
}

