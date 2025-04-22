import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const rehypePreElements: Plugin = function () {
  return function (tree: any) {
    visit(tree, (node) => {
      if (node?.type === 'element' && node?.tagName === 'pre') {
        const [codeEl] = node.children
        if (codeEl?.type !== 'element' || codeEl?.tagName !== 'code') return
        ;(node as any).raw = codeEl.children?.[0]?.value
      }
    })
  }
}
