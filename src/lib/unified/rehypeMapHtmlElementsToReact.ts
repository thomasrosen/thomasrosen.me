import { visit } from 'unist-util-visit'

export const rehypeMapHtmlElementsToReact = () => (tree: any) => {
  visit(tree, 'mdxJsxFlowElement', (node: any) => {
    if (node.name === 'audio') {
      node.name = 'Audio'
    }
    if (node.name === 'iframe') {
      node.name = 'Iframe'
    }
  })
}
