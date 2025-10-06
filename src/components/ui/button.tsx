import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary-color)] text-white shadow-xs hover:bg-[#0e5cb3] focus:ring-[var(--primary-color)]",
        destructive:
          "bg-red-600 text-white shadow-xs hover:bg-red-700 focus:ring-red-500",
        outline:
          "border-2 border-[var(--primary-color)] text-[var(--primary-color)] bg-transparent hover:bg-[var(--primary-color)] hover:text-white focus:ring-[var(--primary-color)]",
        secondary:
          "bg-gray-700 text-white shadow-xs hover:bg-gray-600 focus:ring-gray-500",
        ghost:
          "text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-gray-500",
        link: "text-[var(--primary-color)] underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  disabled,
  loading,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </Comp>
  )
}

// Icon Button Component
interface IconButtonProps extends React.ComponentProps<"button"> {
  icon: React.ReactNode;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  tooltip?: string;
}

function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  loading = false,
  disabled,
  className,
  tooltip,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  }

  return (
    <button
      type="button"
      disabled={disabled || loading}
      title={tooltip}
      className={cn(
        buttonVariants({ variant, size: 'icon' }),
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}
    </button>
  )
}

export { Button, IconButton, buttonVariants }
