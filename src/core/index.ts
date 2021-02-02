import {RenderDesc, getRenderData, renderDescToString, ModuleMap } from './skeleton'
import { getRenderToHtmlCode, renderToHtml } from './render'

export default class Skeleton {

  private root: Node

  private renderData: RenderDesc[];
  private renderString: string;
  private moduleMap?: ModuleMap;
  private moduleString?: string;


  constructor (root: Node) {
    this.root = root
    const { data, moduleMap } = getRenderData(root);
    this.renderData = data;
    this.renderString = this.renderData.map(item => renderDescToString(item)).join(',');
    this.moduleMap = moduleMap;
    this.moduleString = moduleMap ? JSON.stringify(moduleMap) : undefined
  }

  public getHtml(): string {
    return renderToHtml(this.renderString);
  }

  public getRenderToHtmlCode(): string {
    return getRenderToHtmlCode(this.renderString);
  }

  public getScript(): string {
    return '<script>document.write(' + this.getRenderToHtmlCode() + ')</script>';
  }
}