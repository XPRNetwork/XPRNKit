import * as React from "react"

import { cn } from "./../../lib/utils"

export interface BaseInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

type InputProps = BaseInputProps 

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div >
      <input
          type={type}
          className={cn(
            "border border-input bg-transparent h-9 w-full rounded-md px-3 py-1 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )} 
        
        ref={ref}
        {...props}
        />
        
        </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
