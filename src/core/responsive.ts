import {SkeletonDesc} from './skeleton'

export const RefViewportRatio = 0.95;

/**
 * 响应式处理
 * @param list  骨架数据
 * @param refList 改变视口尺寸后的骨架数据
 */
export function setResponsive(list: SkeletonDesc[], refList: SkeletonDesc[]) {
  
  list.map(item => {
    const refItem = refList.find(i => i.id === item.id);
    if (!refItem) return;
    if (Math.abs(item.width - refItem.width) >= 0.5) {
      // 标记出响应式节点
      item.responsive = true;  

      /**
       * 计算响应式宽度
       * 两种形式
       * 1.完全缩放的： xx vw
       * 2.固定左右边距缩放的：calc(100vw - xx)
       */
      const ratio = item.width / window.innerWidth;
      const _refItemWidth = window.innerWidth * RefViewportRatio * ratio;
      if (Math.abs(_refItemWidth - refItem.width) <= 0.1) {
        // 完全缩放
        item.responsiveWidth = `${ratio.toFixed(2)}vw`
      } else {
        // 固定左右边距缩放
        item.responsiveWidth = `calc(100vw - ${window.innerWidth - item.width}px)`
      }
    }
  });
}