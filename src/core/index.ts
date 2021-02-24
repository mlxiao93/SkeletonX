import 'regenerator-runtime/runtime';
import { RenderDesc, getRenderData, renderDescToString, ModuleMap } from './skeleton'
import { renderToHtml } from './render'
import { RefViewportRatio } from './responsive';


export default class Skeleton {

  private dataString?: string;

  public async getHtml(): Promise<string> {
    const dataString = await this.getDataString()
    return renderToHtml(dataString);
  }

  public async getDataString(): Promise<string> {
    if (this.dataString) return this.dataString;

    console.log('do get date string');

    const iframe = document.createElement('iframe');
    const innerHtml = document.body.innerHTML.replace(/<script\s.*?src=".+?"/, "<script")
    const {
      body: body2,
      window: window2,
    } = await new Promise<{
      body: typeof document.body,
      window: Window
    }>((resolve) => {
      iframe.style.width = `${RefViewportRatio * 100}vw`;
      iframe.style.height = '100vh';
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

    const { data, moduleMap } = getRenderData(document.body, body2, window2);
    const renderData = data;
    const renderString = renderData.map(item => renderDescToString(item)).join(',');
    const moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined

    document.body.removeChild(iframe);

    let res = renderString

    if (moduleString) {
      res = renderString + '::' + moduleString;
    };

    this.dataString = res;

    return res;
  }
}