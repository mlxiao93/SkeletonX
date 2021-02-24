import * as React from 'react';
import React, { useEffect, useRef, useState } from 'react';

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

    return <div className={props.className} style={{ ...props.style, padding: '0!important'/*把之前的padding去掉，消除影响*/ }}>
      <div style={{ position: 'relative', background: '#fff', ...size }} dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </div>
  }
  return <div className={props.className} style={props.style} skeletonx-module-id={props.moduleId}>
    {props.children}
  </div>
}

export function SkeletonSupspense(props: {
  moduleId: string,
  style?: React.CSSProperties
}) {
  const { moduleId, style } = props;

  const [offsetStyle, setOffsetStyle] = useState<React.CSSProperties>();    // 抵消父元素影响

  const rootRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const parentNode = rootRef.current?.parentNode;
  //   if (!parentNode) return;
  //   const computedStyle = getComputedStyle(parentNode as Element);
  //   console.log(computedStyle.paddingTop);
  //   setOffsetStyle({
  //     top: '-' + computedStyle.paddingTop,
  //     left: '-' + computedStyle.paddingLeft,
  //   })
  // }, [])

  const innerHtml = window.__skeleton__x__lib.renderToHtml(undefined, moduleId);
  const size = window.__skeleton__x__lib.getModuleSize(undefined, moduleId);

  if (!innerHtml) return null;
  return <div style={{position: 'relative', ...offsetStyle, ...size, ...style}}
    ref={rootRef}
    dangerouslySetInnerHTML={{ __html: innerHtml }} />
}