import { Button } from "@/components/ui/button"
import { AlertCircle, RotateCcw, Home } from "lucide-react"

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-8 rounded-full bg-red-100 p-4 dark:bg-red-900/20">
        <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-500" />
      </div>
      <h1 className="mb-4 text-3xl font-bold tracking-tight">Something went wrong</h1>
      <p className="mb-8 max-w-[500px] text-muted-foreground">
        We apologize for the inconvenience. An unexpected error has occurred.
        <br />
        <span className="mt-2 block rounded bg-muted/50 p-2 font-mono text-xs text-red-600 dark:text-red-400">
          {error.message}
        </span>
      </p>
      <div className="flex gap-4">
        <Button onClick={resetErrorBoundary} className="gap-2" size="lg">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'} className="gap-2" size="lg">
          <Home className="h-4 w-4" />
          Go Home
        </Button>
      </div>
    </div>
  )
}
