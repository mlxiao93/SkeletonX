import React from 'react';

export default function SkeletonContainer(props: {
  children?: React.ReactNode
  moduleId: string
  showSkeleton?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  if (props.showSkeleton) {
    const innerHtml = window.__skeleton__x__lib.renderToHtml(undefined, props.moduleId);
    const size = window.__skeleton__x__lib.getModuleSize(undefined, props.moduleId);

    return <div className={props.className} style={{...props.style, padding: '0!important'/*把之前的padding去掉，消除影响*/ }}>
      <div style={{position: 'relative', ...size}} dangerouslySetInnerHTML={{__html: innerHtml}} />
    </div>
  }
  return <div className={props.className} style={props.style} skeletonx-module-id={props.moduleId}>
    {props.children}
  </div>
}