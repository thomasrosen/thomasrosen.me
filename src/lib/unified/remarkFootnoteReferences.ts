import type { FootnoteDefinition, FootnoteReference, Text } from 'mdast'
import type { Plugin } from 'unified'
import { map } from 'unist-util-map'

function findFirstNodeWithType(node: any, nodeType: string): any | null {
  if (node.type === nodeType) {
    return node
  }

  if (node.children) {
    for (const child of node.children) {
      const found = findFirstNodeWithType(child, nodeType)
      if (found) {
        return found
      }
    }
  }

  return null
}

function isFootnoteDefinition(node: any): node is FootnoteDefinition {
  return node?.type === 'footnoteDefinition'
}

function isFootnoteReference(node: any): node is FootnoteReference {
  return node?.type === 'footnoteReference'
}

function isText(node: any): node is Text {
  return node?.type === 'text'
}

export const remarkFootnoteReferences: Plugin = function () {
  return function (tree: any) {
    if (tree?.type === 'root' && tree?.children) {
      const footnoteDefinitions = tree.children
        .filter(isFootnoteDefinition)
        .map((definition: FootnoteDefinition) => ({
          definition,
          link: findFirstNodeWithType(definition, 'link'),
        }))

      const newTree = map(tree, function (node) {
        if (isFootnoteReference(node)) {
          const identifier = node.identifier
          const footnoteDefinition = footnoteDefinitions.find(
            (definition: { definition: FootnoteDefinition; link: any }) =>
              definition.definition.identifier === identifier
          )

          if (!footnoteDefinition || !footnoteDefinition.link) {
            return node
          }

          const domain = new URL(
            footnoteDefinition?.link?.url
          )?.hostname?.replace(/^www\./, '')
          let label = footnoteDefinition.definition.label

          const label_matcher = /^[0-9]\^$/
          if (!label || label_matcher.test(label)) {
            const textNode = findFirstNodeWithType(
              footnoteDefinition.link,
              'text'
            )
            if (isText(textNode)) {
              label = textNode.value
            }
          }

          return {
            ...footnoteDefinition.link,
            type: 'footnoteReferenceLink',
            children: [
              {
                type: 'text',
                value: domain,
              },
            ],
            label,
          }
        }
        return node
      })

      return newTree
    }
  }
}
