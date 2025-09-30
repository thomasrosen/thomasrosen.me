import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap border transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a>&]:hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a>&]:hover:bg-secondary/80',
        accent: 'border-transparent bg-accent text-accent-foreground [a>&]:hover:bg-accent/80',
        destructive:
          'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a>&]:hover:bg-destructive/80',
        outline: 'text-foreground [a>&]:hover:bg-accent [a>&]:hover:text-accent-foreground',
      },
      size: {
        md: 'gap-1 rounded-md px-2 py-0.5 font-medium text-xs [&>svg]:size-3',
        lg: 'gap-3 rounded-2xl px-3 py-1.5 font-[900] text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface BadgeProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span'

    return (
      <Comp
        className={cn(badgeVariants({ variant, size }), className)}
        data-slot="badge"
        ref={ref}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
