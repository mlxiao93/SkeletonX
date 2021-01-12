import React from 'preact/compat'
import { renderToStaticMarkup } from 'preact/compat/server'
import { SkelentonDesc } from './skelenton-desc'


function renderNode(params: {node: SkelentonDesc, list: SkelentonDesc[]}) {
  const { node, list } = params;
  const isLeaf = !list.find(item => item.parentId === node.id);

  const hasBackground = node.background && !node.background.startsWith('rgba(0, 0, 0, 0)')

  return <div style={{
    zIndex: 9999999,
    position: 'absolute',
    left: node.x,
    top: node.y,
    width: node.offsetWidth,
    height: node.offsetHeight,
    border: node.border,
    borderLeft: node.borderLeft,
    borderRight: node.borderRight,
    borderBottom: node.borderBottom,
    borderTop: node.borderTop,
    borderRadius: node.borderRadius,
    background: hasBackground ? node.background : isLeaf ? '#D3D4D7' : undefined
  }}>
  </div>
}

export function renderToHtml(list: SkelentonDesc[]) {
  // console.log(list);
  // console.log(list.filter(item => item.$node.nodeName === 'NAV'));
  // const root = list.find(item => !item.parentId);
  // return renderToStaticMarkup(<>
  //   {renderNode({node: root, list})}
  // </>)
  return renderToStaticMarkup(<>
    {list.map(node => renderNode({node, list}))}
  </>)
}