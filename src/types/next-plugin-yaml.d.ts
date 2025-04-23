declare module 'next-plugin-yaml' {
  import type { NextConfig } from 'next'
  export default function withYaml(config: NextConfig): NextConfig
}
