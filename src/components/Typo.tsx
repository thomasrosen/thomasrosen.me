import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, type ReactNode } from 'react'

type TypoVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'code'
  | 'small'

const typoVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      span: 'text-base',
      div: 'text-base',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      inline_code:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'h2',
  },
})

interface TypoProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typoVariants> {
  as?: TypoVariant
  children: ReactNode
}

export function Typo({
  as: Component,
  variant,
  className,
  children,
  ...props
}: TypoProps) {
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

  return (
    <Component className={cn(typoVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  )
}
