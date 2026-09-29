import type { Profile } from '@/payload-types'

export function bookingHref(profile: Pick<Profile, 'bookingUrl' | 'email'>): string {
  return profile.bookingUrl || `mailto:${profile.email}`
}
