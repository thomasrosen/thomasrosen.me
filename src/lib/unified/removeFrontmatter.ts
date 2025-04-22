import { visit } from 'unist-util-visit'

// Custom plugin to remove frontmatter
export function removeFrontmatter() {
  return (tree: any) => {
    visit(tree, 'yaml', (node: any) => {
      node.type = 'text'
      node.value = ''
    })
  }
}
