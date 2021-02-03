export {renderToHtml, getModuleSize} from './core/render';

export function setData(data: string) {
  (window as any).__skeleton__x__data = data;
}

