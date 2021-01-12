import {SkeletonDesc, generateSkeletonDescList } from './skeleton-desc'
import { renderToHtml } from './render'

export default class Skeletion {

  private root: Node

  private skeletonDescList: SkeletonDesc[];

  constructor (root: Node) {
    this.root = root
    this.skeletonDescList = generateSkeletonDescList({node: root, list: [], level: 0, index: 0});
  }

  public renderToHtml(): string {
    return renderToHtml(this.skeletonDescList);
  }
}