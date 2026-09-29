// Builds Lexical editor JSON from plain paragraphs. "**text**" becomes bold.
type TextNode = {
  type: 'text'
  text: string
  format: number
  version: 1
  detail: 0
  mode: 'normal'
  style: ''
}

function textNodes(paragraph: string): TextNode[] {
  return paragraph
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) => {
      const bold = part.startsWith('**') && part.endsWith('**')
      return {
        type: 'text',
        text: bold ? part.slice(2, -2) : part,
        format: bold ? 1 : 0,
        version: 1,
        detail: 0,
        mode: 'normal',
        style: '',
      }
    })
}

export function richText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map((paragraph) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        children: textNodes(paragraph),
      })),
    },
  }
}
