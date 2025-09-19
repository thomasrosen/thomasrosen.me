import { cva, type VariantProps } from 'class-variance-authority'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type TypoVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'code' | 'small'

const typoVariants = cva('text-pretty', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-balance font-extrabold text-4xl leading-tight tracking-tight lg:text-5xl',
      h2: 'mb-[10px] scroll-m-20 text-balance font-semibold text-[42px] leading-tight tracking-tight',
      h3: 'mb-[10px] scroll-m-20 text-balance font-semibold text-[32px] leading-tight tracking-tight',
      h4: 'scroll-m-20 text-balance font-semibold text-xl leading-tight tracking-tight',
      h5: 'scroll-m-20 text-balance font-semibold text-lg leading-tight tracking-tight',
      h6: 'scroll-m-20 text-balance font-semibold text-base leading-tight tracking-tight',
      p: 'text-pretty leading-7 [&:not(:last-child)]:mb-6',
      span: 'text-base',
      div: 'text-base',
      blockquote: 'mb-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mb-2',
      inline_code:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
      lead: 'text-foreground/60 text-xl',
      large: 'font-semibold text-lg',
      small: 'font-medium text-sm leading-tight',
      muted: 'text-foreground/30 text-sm',
    },
  },
  defaultVariants: {
    variant: 'h2',
  },
})

interface TypoProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof typoVariants> {
  as?: TypoVariant | ElementType
  children?: ReactNode
}

export function Typo({ as: Component, variant, className, ...props }: TypoProps) {
  if (!variant) {
    switch (Component) {
      case 'h1':
        variant = 'h1'
        break
      case 'h2':
        variant = 'h2'
        break
      case 'h3':
        variant = 'h3'
        break
      case 'h4':
        variant = 'h4'
        break
      case 'h5':
        variant = 'h5'
        break
      case 'h6':
        variant = 'h6'
        break
      case 'p':
        variant = 'p'
        break
      case 'span':
        variant = 'span'
        break
      case 'div':
        variant = 'div'
        break
      case 'code':
        variant = 'inline_code'
        break
      case 'small':
        variant = 'small'
        break
      default:
        variant = 'div'
    }
  }

  if (!Component) {
    switch (variant) {
      case 'inline_code':
        Component = 'code'
        break
      case 'lead':
        Component = 'p'
        break
      case 'large':
        Component = 'div'
        break
      case 'small':
        Component = 'small'
        break
      case 'muted':
        Component = 'p'
        break
      default:
        Component = 'div'
    }
  }

  return <Component className={cn(typoVariants({ variant }), className)} {...props} />
}
