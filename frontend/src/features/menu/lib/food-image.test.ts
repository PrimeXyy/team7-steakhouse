import { describe, it, expect } from 'vitest'
import { resolveItemImage } from './food-image'

describe('resolveItemImage', () => {
  it('returns null when neither nameEn nor customImageUrl is provided', () => {
    expect(resolveItemImage(null, null)).toBeNull()
    expect(resolveItemImage('', undefined)).toBeNull()
  })

  it('resolves customImageUrl with size variant for food-images path', () => {
    expect(
      resolveItemImage(null, '/food-images/diy-malatang.jpg', 'card')
    ).toBe('/food-images/card/diy-malatang.jpg')

    expect(
      resolveItemImage(null, '/food-images/diy-malatang.jpg', 'thumb')
    ).toBe('/food-images/thumb/diy-malatang.jpg')

    expect(
      resolveItemImage(null, '/food-images/diy-malatang.jpg', 'hero')
    ).toBe('/food-images/diy-malatang.jpg')
  })

  it('preserves external custom image URLs untouched across all sizes', () => {
    const url = 'https://images.unsplash.com/photo-1'
    expect(resolveItemImage('Any Name', url, 'thumb')).toBe(url)
    expect(resolveItemImage('Any Name', url, 'hero')).toBe(url)
  })

  it('matches known food image by exact name (case-insensitive)', () => {
    expect(resolveItemImage('USDA Prime Ribeye (16oz)', null, 'hero')).toBe(
      '/food-images/prime-ribeye.jpg'
    )
    expect(resolveItemImage('usda prime ribeye (16oz)', null, 'card')).toBe(
      '/food-images/card/prime-ribeye.jpg'
    )
    expect(resolveItemImage('JUMBO LUMP CRAB CAKE', null, 'thumb')).toBe(
      '/food-images/thumb/crab-cake.jpg'
    )
  })

  it('matches known food image by substring/partial name', () => {
    expect(
      resolveItemImage('Special Dry-Aged Tomahawk (32oz) Plate', null, 'hero')
    ).toBe('/food-images/tomahawk-steak.jpg')
  })

  it('returns null when item name has no matching known food image', () => {
    expect(resolveItemImage('Completely Unknown Food Item XYZ')).toBeNull()
  })
})
