'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      role="alert"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <h1 className="font-display text-4xl font-medium">Something went wrong</h1>
      <p className="text-muted-foreground">This page could not be loaded. Please try again.</p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}
