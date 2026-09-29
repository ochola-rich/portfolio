import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

// Content is small, so revalidating the whole site on any edit keeps every
// page consistent without tracking which routes read which documents.
function revalidateAll(context: Record<string, unknown>) {
  if (context.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
  } catch (error) {
    // revalidatePath throws outside a Next.js request (e.g. the seed script).
    if (!(error instanceof Error && error.message.includes('static generation store'))) {
      throw error
    }
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateAll(req.context)
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateAll(req.context)
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateAll(req.context)
  return doc
}
