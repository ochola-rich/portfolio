import type { Access } from 'payload'

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

// Visitors only see published documents; logged-in editors see drafts too.
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { status: { equals: 'published' } }
}
