import 'regenerator-runtime/runtime';
import { RenderDesc, getRenderData, renderDescToString, ModuleMap } from './skeleton'
import { renderToHtml } from './render'

export default class Skeleton {

  public async getHtml(): Promise<string> {
    const dataString = await this.getDataString()
    return renderToHtml(dataString);
  }

  public async getDataString(): Promise<string> {

    const iframe = document.createElement('iframe');
    const innerHtml = document.body.innerHTML.replace(/<script\s.*?src=".+?"/, "<script")
    const {
      body: body2,
      window: window2,
    } = await new Promise<{
      body: typeof document.body,
      window: Window
    }>((resolve) => {
      iframe.style.width = '96vw';
      iframe.style.height = '96vh';
      iframe.style.position = 'fixed';
      iframe.style.zIndex = '-1';
      iframe.style.top = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
      iframe.src = location.href;  
      iframe.onload = function () {
        iframe.contentDocument.body.innerHTML = innerHtml;
        resolve({
          body: iframe.contentDocument.body,
          window: iframe.contentWindow
        });
      }
    })

    const { data, moduleMap } = getRenderData(document.body, body2);
    const renderData = data;
    const renderString = renderData.map(item => renderDescToString(item)).join(',');
    const moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined

    document.body.removeChild(iframe);

    if (moduleString) {
      return renderString + '::' + moduleString;
    };
    return renderString;
  }
}