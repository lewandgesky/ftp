import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-[#f5f0eb] focus-visible:ring-[#c8944e]"
    
    const variants = {
      default: "bg-[#1e2d3d] text-[#f5f0eb] hover:bg-[#2a3f52]",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-[#d4cdc5] bg-transparent hover:bg-[#ebe5de] text-[#1e2d3d]",
      secondary: "bg-[#ebe5de] text-[#1e2d3d] hover:bg-[#d4cdc5]",
      ghost: "hover:bg-[#ebe5de] text-[#1e2d3d]",
      link: "text-[#c8944e] underline-offset-4 hover:underline",
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
