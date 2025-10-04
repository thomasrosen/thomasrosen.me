import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/80',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        accent: 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/80',
        ghost: 'text-accent-foreground hover:bg-accent dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        glass:
          'smooth-border smooth-border-foreground/10 bg-background/60 text-accent-foreground drop-shadow-2xl/10 backdrop-blur-sm backdrop-saturate-200 hover:bg-accent/60',
      },
      size: {
        default: 'smooth-rounded-xl h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'smooth-rounded-xl h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'smooth-rounded-3xl h-12 gap-3 px-6 font-bold text-xl has-[>svg]:px-4',
        icon: 'smooth-rounded-full size-9',
        'icon-lg': 'smooth-rounded-full size-12 gap-3 font-bold text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        data-slot="button"
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
