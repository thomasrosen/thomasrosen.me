export function correctMarkdownTextForRender(text: string) {
  // prevent the markdown parser from replacing *innen with <em>innen</em>
  return text
    .replaceAll('\\*innen', '&#42;innen')
    .replaceAll('*innen', '&#42;innen')
    .replaceAll('\\*in ', '&#42;in ')
    .replaceAll('*in ', '&#42;in ')
    .replaceAll(/\`excel\b(?!-formula)/g, '`excel-formula')
}
