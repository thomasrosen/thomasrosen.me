import { pipeline } from '@xenova/transformers'

export async function embed_texts(texts: string[]) {
  const extractor = await pipeline('feature-extraction', 'Snowflake/snowflake-arctic-embed-xs', {
    quantized: true,
  })

  // Generate text embeddings
  const output = await extractor(texts, { normalize: true, pooling: 'cls' })

  return output.tolist()
}
