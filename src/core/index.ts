import {SkelentonDesc, generateSkeletonDescList } from './skelenton-desc'
import { renderToHtml } from './render'

export default class Skeletion {

  private root: Node

  private skelentonDescList: SkelentonDesc[];

  constructor (root: Node) {
    this.root = root
    this.skelentonDescList = generateSkeletonDescList({node: root, list: [], level: 0, index: 0});
  }

  public renderToHtml(): string {
    return renderToHtml(this.skelentonDescList);
  }
}