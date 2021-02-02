import {RenderDesc, getSkeletonRenderList, renderDescToString } from './skeleton'
import { getRenderToHtmlCode, renderToHtml } from './render'

export default class Skeleton {

  private root: Node

  private renderList: RenderDesc[];
  private descString: string;

  constructor (root: Node) {
    this.root = root
    this.renderList = getSkeletonRenderList(root);
    this.descString = this.renderList.map(item => renderDescToString(item)).join(',')
  }

  public getHtml(): string {
    return renderToHtml(this.descString);
  }

  public getRenderToHtmlCode(): string {
    return getRenderToHtmlCode(this.descString);
  }

  public getScript(): string {
    return '<script>document.write(' + this.getRenderToHtmlCode() + ')</script>';
  }
}