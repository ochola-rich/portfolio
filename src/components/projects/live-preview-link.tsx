import { ArrowUpRight } from 'lucide-react'
import type { ComponentProps } from 'react'

import { ExternalLink } from '@/components/shared/external-link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Sits above the card's stretched link (relative z-10) so it stays clickable.
export function LivePreviewLink({
  url,
  title,
  className,
  size,
}: {
  url: string
  title: string
  className?: string
  size?: ComponentProps<typeof Button>['size']
}) {
  return (
    <Button asChild size={size} className={cn('relative z-10 w-fit', className)}>
      <ExternalLink href={url}>
        Live preview <ArrowUpRight aria-hidden="true" />
        <span className="sr-only"> of {title}</span>
      </ExternalLink>
    </Button>
  )
}
