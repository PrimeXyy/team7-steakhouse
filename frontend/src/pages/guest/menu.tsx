import { useState } from "react"
import { Link } from "react-router"
import { ShoppingCart, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GuestItemDialog } from "@/features/guest/components/guest-item-dialog"
import { GuestMenuBrowser } from "@/features/guest/components/guest-menu-browser"
import { useGuestCart } from "@/features/guest/hooks/use-guest-cart"
import { useLanguage } from "@/lib/language-context"
import { formatPrice } from "@/lib/format"
import type { MenuItem } from "@/features/guest/types"

export function GuestMenuPage() {
  const [picked, setPicked] = useState<MenuItem | null>(null)
  const { t } = useLanguage()
  const { data: cart } = useGuestCart()

  const cartItemCount = cart?.lines?.reduce((acc, line) => acc + (line.quantity || 1), 0) || 0
  const cartTotal = cart?.grandTotal ?? 0
  const currencyCode = cart?.currencyCode ?? "USD"

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-heading tracking-wide text-foreground">{t("menu")}</h1>
        <Button variant="outline" size="sm" asChild className="border-amber-500/30 hover:border-amber-500/60">
          <Link to="/guest/cart" className="flex items-center gap-2">
            <ShoppingCart className="size-4 text-amber-600 dark:text-amber-400" />
            <span className="font-medium">{t("cart")}</span>
          </Link>
        </Button>
      </div>

      {/* Atmospheric Steakhouse Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100/70 via-stone-100 to-amber-50/50 dark:from-stone-900 dark:via-stone-900 dark:to-amber-950/40 p-4 border border-amber-500/30 dark:border-amber-500/25 shadow-sm dark:shadow-lg dark:shadow-black/40">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
                USDA Prime Cuts &amp; Fire Grill
              </span>
            </div>
            <h2 className="text-lg font-heading font-bold tracking-wide text-amber-950 dark:text-amber-100">
              Team 7 Steak House
            </h2>
            <p className="text-xs text-amber-900/80 dark:text-amber-200/70 font-medium dark:font-light">
              45-Day Dry Aged · Artisan Butters · Cellar Wine
            </p>
          </div>
          <div className="size-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            🥩
          </div>
        </div>
      </div>

      <GuestMenuBrowser onPick={setPicked} />

      {picked && (
        <GuestItemDialog
          key={picked.id}
          item={picked}
          onOpenChange={(open) => !open && setPicked(null)}
        />
      )}

      {cartItemCount > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 mx-4 flex justify-center pb-safe">
          <Button
            asChild
            size="lg"
            className="w-full max-w-sm h-14 rounded-full shadow-lg text-base font-semibold"
          >
            <Link to="/guest/cart" className="flex items-center justify-between px-6">
              <span className="flex items-center gap-2">
                <ShoppingCart className="size-5" />
                <span>
                  {cartItemCount} {cartItemCount === 1 ? t("item") : t("items", { defaultValue: "items" })} · {formatPrice(cartTotal, currencyCode)}
                </span>
              </span>
              <span className="flex items-center gap-2">
                Review & Send Order <ArrowRight className="size-5" />
              </span>
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
