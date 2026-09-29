import type { TextField } from 'payload'

type SingleTextField = Extract<TextField, { hasMany?: false }>

export function validateHttpsUrl(value: string | null | undefined): true | string {
  if (!value) return true
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? true : 'Use an https:// URL.'
  } catch {
    return 'Enter a valid URL, e.g. https://dev.to/you/post.'
  }
}

export const urlField = (
  overrides: Partial<Omit<SingleTextField, 'type' | 'validate'>> & { name: string },
): SingleTextField => ({
  ...overrides,
  type: 'text',
  validate: (value: string | null | undefined, { required }: { required?: boolean }) =>
    !value && required ? 'This field is required.' : validateHttpsUrl(value),
})
