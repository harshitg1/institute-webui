import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[13px] text-zinc-900 placeholder:text-zinc-400 transition-colors outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        "focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200",
        "aria-invalid:border-red-400 aria-invalid:ring-red-100",
        className
      )}
      {...props}
    />
  )
}

export { Input }
