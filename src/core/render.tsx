import { parseStringToRenderDesc, RenderDesc, renderDescToString, transforRenderDescToRenderProps } from './skeleton'

export function renderToHtml(descString: string): string {
  const html = new Function(`return ${getRenderToHtmlCode(descString)}`)();
  return html;
}

export function getRenderToHtmlCode(descString: string): string {
  const code = `(function() {
    ${parseStringToRenderDesc.toString()};
    ${transforRenderDescToRenderProps.toString()};
    var descString = '${descString}';
    var renderDescList = descString.split(',').map(str => {
      return parseStringToRenderDesc(str);
    });
    var html = '';
    for (var i = 0; i < renderDescList.length; i++) {
      var renderProps = transforRenderDescToRenderProps(renderDescList[i]);
      var style = 'z-index:9999999;position:absolute;';
      for (var key in renderProps) {
        style += key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() + ':' + renderProps[key] + ';'
      };
      html += '<div style="' + style + '"></div>';
    };
    return '<div skeletonx-ignore>' + html + '</div>';
  })()`;
  return code; 
}