import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-[#0a0a0f] focus-visible:ring-[#7c3aed]"
    
    const variants = {
      default: "bg-[#f0f0f5] text-[#0a0a0f] hover:bg-[#d0d0d5]",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-[#22223a] bg-transparent hover:bg-[#12121a] text-[#f0f0f5]",
      secondary: "bg-[#12121a] text-[#f0f0f5] hover:bg-[#22223a]",
      ghost: "hover:bg-[#12121a] text-[#f0f0f5]",
      link: "text-[#6366f1] underline-offset-4 hover:underline",
      glow: "btn-glow text-white font-semibold",
    }
    
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
