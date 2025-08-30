
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "md-button",
  {
    variants: {
      variant: {
        default: "md-button-filled",
        destructive: "md-button-filled bg-error text-on-error hover:bg-error/90",
        outline: "md-button-outlined",
        secondary: "md-button-filled bg-secondary text-on-secondary hover:bg-secondary/90",
        ghost: "md-button-text",
        link: "text-primary underline-offset-4 hover:underline h-auto p-0",
        fab: "md-button-fab",
      },
      size: {
        default: "h-10 px-6 py-0",
        sm: "h-8 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-base",
        icon: "h-10 w-10 rounded-full",
        fab: "w-14 h-14 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onClick, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Create ripple effect for Material Design
      if (variant !== 'link' && !props.disabled) {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        const ripple = document.createElement('span')
        const size = Math.max(rect.width, rect.height)
        const x = e.clientX - rect.left - size / 2
        const y = e.clientY - rect.top - size / 2
        
        ripple.style.width = ripple.style.height = `${size}px`
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
        ripple.className = 'ripple'
        
        button.appendChild(ripple)
        
        setTimeout(() => {
          ripple.remove()
        }, 600)
      }
      
      if (onClick) {
        onClick(e)
      }
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
