import React, { useRef } from 'react';

if (!window.__skeleton__x__lib) {
  console.warn('未引入SkeletonX js lib');
}

export const SkeletonContainer: React.FC<{
  children?: React.ReactNode
  moduleId?: string
  showSkeleton?: boolean
  className?: string
  style?: React.CSSProperties
}> = (props) => {
  if (window.__skeleton__x__lib && props.showSkeleton) {
    const innerHtml = window.__skeleton__x__lib.renderToHtml(undefined, props.moduleId);
    const size = window.__skeleton__x__lib.getModuleSize(undefined, props.moduleId);

    return <div className={props.className} style={{ ...props.style, padding: 0 }}>
      <div style={{ position: 'relative', background: '#fff', ...size }} dangerouslySetInnerHTML={{ __html: innerHtml }} />
    </div>
  }
  return <div className={props.className} style={props.style} skeletonx-module-id={props.moduleId}>
    {props.children}
  </div>
}

export const SkeletonSupspense: React.FC<{
  moduleId: string,
  style?: React.CSSProperties
}> = (props) => {
  const { moduleId, style } = props;

  const rootRef = useRef<HTMLDivElement>(null);

  if (!window.__skeleton__x__lib) return null

  const innerHtml = window.__skeleton__x__lib.renderToHtml(undefined, moduleId);
  const size = window.__skeleton__x__lib.getModuleSize(undefined, moduleId);

  if (!innerHtml) return null;
  return <div style={{position: 'relative', ...size, ...style}}
    ref={rootRef}
    dangerouslySetInnerHTML={{ __html: innerHtml }} />
}