import { assetUrl } from "@/lib/api/client"

const KNOWN_FOOD_IMAGES: Record<string, string> = {
  // Team 7 Steak House Menu
  "usda prime ribeye (16oz)": "/food-images/prime-ribeye.jpg",
  "center-cut filet mignon (8oz)": "/food-images/filet-mignon.jpg",
  "dry-aged tomahawk (32oz)": "/food-images/tomahawk-steak.jpg",
  "wagyu new york strip (12oz)": "/food-images/wagyu-ny-strip.jpg",
  "slow-roasted prime rib (14oz)": "/food-images/prime-rib.jpg",
  "jumbo lump crab cake": "/food-images/crab-cake.jpg",
  "seared diver scallops": "/food-images/diver-scallops.jpg",
  "wagyu beef tartare": "/food-images/beef-tartare.jpg",
  "classic caesar salad": "/food-images/caesar-salad.jpg",
  "french onion soup gratinée": "/food-images/french-onion-soup.jpg",
  "french onion soup": "/food-images/french-onion-soup.jpg",
  "yukon gold truffle mashed potatoes": "/food-images/truffle-mashed-potatoes.jpg",
  "creamed spinach & parmigiano": "/food-images/creamed-spinach.jpg",
  "creamed spinach": "/food-images/creamed-spinach.jpg",
  "grilled jumbo asparagus": "/food-images/grilled-asparagus.jpg",
  "lobster mac & cheese": "/food-images/lobster-mac-cheese.jpg",
  "loaded idaho baked potato": "/food-images/loaded-baked-potato.jpg",
  "smoked bourbon old fashioned": "/food-images/smoked-old-fashioned.jpg",
  "classic dry gin martini": "/food-images/dry-gin-martini.jpg",
  "napa valley cabernet sauvignon (glass)": "/food-images/cabernet-sauvignon.jpg",
  "willamette valley pinot noir (glass)": "/food-images/pinot-noir.jpg",
  "artisan spiced ginger beer": "/food-images/artisan-ginger-beer.jpg",
  "sparkling san pellegrino (750ml)": "/food-images/san-pellegrino.jpg",
  "warm molten chocolate lava cake": "/food-images/molten-lava-cake.jpg",
  "new york style cheesecake": "/food-images/ny-cheesecake.jpg",
  "vanilla bean crème brûlée": "/food-images/creme-brulee.jpg",
  "vanilla bean creme brulee": "/food-images/creme-brulee.jpg",
}

/**
 * The rendered sizes `scripts/generate-food-images.py` produces:
 *   hero  — 800px, dialog headers
 *   card  — 512px, menu grid cards
 *   thumb —  96px, modifier option rows
 */
export type FoodImageSize = "hero" | "card" | "thumb"

const BARE_FOOD_IMAGE = /^((?:https?:\/\/[^/]+)?)\/((?:food-images|uploads).*)\/([^/]+)$/

/**
 * Points a bare `/food-images/x.jpg` or `/uploads/x.jpg` at the variant for `size`. Hero is served
 * at the bare path, so it needs no rewrite; matching on the bare form also
 * keeps this idempotent. Anything else — an absolute URL — has no variants and is returned untouched.
 */
function sizedFoodImage(path: string, size: FoodImageSize): string {
  if (size === "hero") return path
  return path.replace(BARE_FOOD_IMAGE, `$1/$2/${size}/$3`)
}

/**
 * Resolves a displayable image URL for a food item or modifier option, at the
 * variant matching how the caller renders it.
 *
 * If a custom image exists it resolves via assetUrl — which passes
 * `/food-images/` paths (what migrations V11-V13 store) straight through, so
 * those still get sized. Otherwise it matches the known food image library.
 *
 * `size` defaults to hero because that is the bare path: a caller that forgets
 * to pick gets an oversized image, never a missing one.
 */
export function resolveItemImage(
  nameEn?: string | null,
  customImageUrl?: string | null,
  size: FoodImageSize = "hero"
): string | null {
  if (customImageUrl) {
    const resolved = assetUrl(customImageUrl)
    return resolved && sizedFoodImage(resolved, size)
  }
  if (!nameEn) return null
  const normalized = nameEn.trim().toLowerCase()
  const exact = KNOWN_FOOD_IMAGES[normalized]
  if (exact) return sizedFoodImage(exact, size)

  for (const [key, value] of Object.entries(KNOWN_FOOD_IMAGES)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return sizedFoodImage(value, size)
    }
  }
  return null
}
