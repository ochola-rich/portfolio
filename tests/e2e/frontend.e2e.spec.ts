import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('renders the homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Portfolio/)
    await expect(page.locator('h1').first()).toHaveText('Portfolio')
  })
})
