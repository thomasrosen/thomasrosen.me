import { embed_texts } from '@/lib/embedding/models/snowflake-arctic-embed-xs'
import { dot } from '@xenova/transformers'
import type { Embedding } from './types'

const embedding_cache: Map<string, Embedding> = new Map()

function get_cached_embedding(text: string): Embedding | null {
  const cached = embedding_cache.get(text)
  if (cached) {
    return cached
  }

  return null
}

function set_cached_embedding({ text, embedding }: Embedding): void {
  embedding_cache.set(text, { text, embedding })
}

export async function getEmbeddings(texts: string[]): Promise<Embedding[]> {
  // get cached embeddings
  const texts_to_embed: string[] = []

  const embeddings = texts.flatMap((text): Embedding[] => {
    const cached = get_cached_embedding(text)

    if (cached) {
      return [cached]
    }

    texts_to_embed.push(text)
    return []
  })

  // Generate text embeddings
  const output = await embed_texts(texts)
  const new_embeddings = output.map((embedding: number[], index: number) => {
    return {
      embedding,
      text: texts[index],
    }
  })

  // cache new embeddings
  for (const emb of new_embeddings) {
    set_cached_embedding(emb)
  }

  return [...embeddings, ...new_embeddings]
}

export function rank_documents(source_embedding: Embedding, document_embeddings: Embedding[]) {
  // Compute similarity scores
  const similarities = document_embeddings
    .map((x) => {
      return {
        similarity: dot(source_embedding.embedding, x.embedding),
        text: x.text,
      }
    })
    .sort((a, b) => b.similarity - a.similarity)

  return similarities
}
