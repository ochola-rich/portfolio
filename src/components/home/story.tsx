import { RichText } from '@payloadcms/richtext-lexical/react'
import { FileText } from 'lucide-react'
import Image from 'next/image'

import { ExternalLink } from '@/components/shared/external-link'
import { Button } from '@/components/ui/button'
import { asMedia } from '@/lib/cms'
import { cn } from '@/lib/utils'
import type { Profile } from '@/payload-types'

// Bold runs read as full-colour lead-ins; everything else is muted (see design).
const storyText =
  'space-y-6 text-lg leading-relaxed text-muted-foreground [&_strong]:font-normal [&_strong]:text-foreground'

function Polaroids({ photos }: { photos: NonNullable<Profile['storyPhotos']> }) {
  const tilts = ['-rotate-6 translate-y-6', 'rotate-3 -ml-10']
  const media = photos.map(asMedia).filter((photo) => photo?.url)
  if (media.length === 0) return null

  return (
    <div className="flex justify-center py-6">
      {media.map((photo, i) => (
        <figure
          key={photo!.id}
          className={cn(
            'relative w-56 bg-white p-3 pb-10 shadow-xl sm:w-64 dark:bg-neutral-200',
            tilts[i],
          )}
        >
          <span
            aria-hidden="true"
            className="absolute -top-2 left-1/2 size-6 -translate-x-1/2 rounded-full bg-neutral-800 shadow-md ring-2 ring-neutral-600"
          />
          <div className="relative aspect-[4/5]">
            <Image
              src={photo!.url!}
              alt={photo!.alt}
              fill
              sizes="256px"
              className="object-cover grayscale"
            />
          </div>
        </figure>
      ))}
    </div>
  )
}

export function Story({ profile }: { profile: Profile }) {
  const resume = asMedia(profile.resume)

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {profile.story && <RichText data={profile.story} className={storyText} />}
      {profile.storyPhotos && <Polaroids photos={profile.storyPhotos} />}
      {resume?.url && (
        <Button asChild size="lg">
          <ExternalLink href={resume.url}>
            View My Resume <FileText aria-hidden="true" />
          </ExternalLink>
        </Button>
      )}
    </div>
  )
}
