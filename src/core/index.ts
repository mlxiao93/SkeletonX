import { SkeletonRootId } from './consts';
import 'regenerator-runtime/runtime';
import { getRenderData, RenderData } from './skeleton'
import { getRenderDescFromSkeletonDom, RenderDesc, renderDescToString } from './data-transform'
import { renderToHtml } from './render'
import { RefViewportRatio } from './responsive';
import { joinRenderString } from './data-transform';

export default class Skeleton {


  private renderData: RenderData

  // private dataString?: string;

  public async getRenderData(): Promise<RenderData> {
    if (this.renderData) return this.renderData;
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
      iframe.style.height = `${RefViewportRatio * 100}vh`;
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

    const renderData = getRenderData(document.body, body2, window2);

    document.body.removeChild(iframe);

    this.renderData = renderData;
    return renderData;
  }

  public async getDataString(): Promise<string> {
    const renderData = await this.getRenderData();
    return joinRenderString(renderData);
  }

  public async getHtml(): Promise<string> {
    const dataString = await this.getDataString()
    return renderToHtml(dataString);
  }

  public saveRenderData(root: Element): boolean {
    if (!root) return false;
    this.renderData.data = getRenderDescFromSkeletonDom(root);
    return true;
  }
}