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