import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'focus-visible:-outline-offset-3 inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap border transition-[color,box-shadow] focus-visible:outline-[3px] focus-visible:outline-ring focus-visible:outline-solid aria-invalid:border-destructive aria-invalid:outline-destructive/20 dark:aria-invalid:outline-destructive/40 [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a>&]:hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a>&]:hover:bg-secondary/80',
        accent: 'border-transparent bg-accent text-accent-foreground [a>&]:hover:bg-accent/80',
        destructive:
          'border-transparent bg-destructive text-white focus-visible:outline-destructive/20 dark:bg-destructive/60 dark:focus-visible:outline-destructive/40 [a>&]:hover:bg-destructive/80',
        outline: 'text-foreground [a>&]:hover:bg-accent [a>&]:hover:text-accent-foreground',
      },
      size: {
        sm: 'smooth-rounded-md gap-1 px-2 py-0.5 font-medium text-xs [&>svg]:size-3',
        md: 'smooth-rounded-lg gap-1.5 px-3 py-1 font-bold text-sm',
        lg: 'smooth-rounded-2xl gap-2 px-4 py-2.5 font-[900] text-md',
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
