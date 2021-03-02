//@ts-ignore
import template from './templates/demo.html';
//@ts-ignore
import cssLib from '../../../lib/global.css';
//@ts-ignore
import jsLib from '../../../lib/global.js';

export function copyData(data: string) {
  const textarea = document.createElement('textarea');
  textarea.style.position = 'fixed';
  textarea.style.top = '-200px';
  document.body.appendChild(textarea);
  textarea.value = data;
  textarea.select(); // 选中文本
  document.execCommand("copy");
  document.body.removeChild(textarea);
  return data;
}

export function download(opt: {
  data: string,
  filename: string
}) {
  const { data, filename } = opt;
  const url = URL.createObjectURL(new Blob([data]));
  const aTag = document.createElement('a');
  aTag.download = filename;
  aTag.href = url;
  aTag.click();
}

export function getDemo(opt: {
  data: string
}): string {
  const { data } = opt;
  const templateData = {
    data,
    cssLib,
    jsLib,
  }
  return tmpl(template, templateData);
}

function tmpl(input, data) {
  let code = `const result = [];`;

  code += `result.push(\`${
    input.replace(/<%=(.+?)%>/g, '`); result.push($1); result.push(`')
      .replace(/<%(.+?)%>/g, '`); $1 result.push(`')
  }\`);` 

  code += `return result.join('');`;

  return new Function('data', code)(data);
}