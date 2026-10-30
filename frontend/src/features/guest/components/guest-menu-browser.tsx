import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ImageOff, UtensilsCrossed, X } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { resolveItemImage } from "@/features/menu/lib/food-image"
import { formatPrice } from "@/lib/format"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { useGuestCategories, useGuestMenuItems } from "../hooks/use-guest-menu"
import type { MenuItem } from "../types"
import { useActivePromo } from "@/features/promo/hooks"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { assetUrl } from "@/lib/api/client"

interface GuestMenuBrowserProps {
  onPick: (item: MenuItem) => void
}

function PromoPopup() {
  const { data: promo } = useActivePromo()
  const [showPromo, setShowPromo] = useState(false)

  useEffect(() => {
    if (promo?.active && promo.id) {
      try {
        const sessionKey = `promo_dismissed_${promo.id}`
        if (!sessionStorage.getItem(sessionKey)) {
          setShowPromo(true)
        }
      } catch {
        setShowPromo(true)
      }
    }
  }, [promo?.id, promo?.active])

  if (!promo || !promo.active || !showPromo) return null

  const handleDismiss = () => {
    if (promo?.id) {
      try {
        sessionStorage.setItem(`promo_dismissed_${promo.id}`, "true")
      } catch {
        // ignore storage error
      }
    }
    setShowPromo(false)
  }

  return (
    <Dialog
      open={showPromo}
      onOpenChange={(open) => {
        if (!open) {
          handleDismiss()
        } else {
          setShowPromo(true)
        }
      }}
    >
      <DialogContent showCloseButton={false} className="max-w-sm border-0 p-0 overflow-hidden bg-transparent shadow-none">
        <div className="relative overflow-hidden rounded-3xl bg-background shadow-2xl ring-1 ring-black/5">
          <DialogHeader className="sr-only">
            <DialogTitle>{promo.title}</DialogTitle>
            <DialogDescription>{promo.description}</DialogDescription>
          </DialogHeader>

          {promo.imageUrl && (
            <div className="relative aspect-[2/3] w-full">
              <img
                src={assetUrl(resolveItemImage(undefined, promo.imageUrl, "hero") || promo.imageUrl) || ""}
                className="absolute inset-0 h-full w-full object-cover"
                alt={promo.title || "Promotion"}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-white shadow-md backdrop-blur-md transition-colors hover:bg-black/60 active:scale-95"
          >
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function GuestMenuBrowser({ onPick }: GuestMenuBrowserProps) {
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(0)

  const categories = useGuestCategories()
  const { data, isPending, isError, error, refetch } = useGuestMenuItems({
    page,
    categoryId,
  })
  const { language, t } = useLanguage()
  const isKhmer = language === "km"

  const items = data?.content ?? []
  const totalPages = data?.totalPages ?? 0
  const totalElements = data?.totalElements ?? 0

  useEffect(() => {
    if (data && page > 0 && page >= totalPages) {
      setPage(Math.max(0, totalPages - 1))
    }
  }, [data, page, totalPages])

  function pickCategory(id: string | undefined) {
    setCategoryId(id)
    setPage(0)
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <PromoPopup />
      <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
        <Badge
          asChild
          variant={categoryId === undefined ? "default" : "outline"}
          className={cn(
            "h-8 px-3.5 text-xs font-heading tracking-wider uppercase font-semibold transition-all shrink-0 cursor-pointer",
            categoryId === undefined
              ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 hover:bg-amber-400"
              : "border-border bg-card text-muted-foreground hover:border-amber-500/50 hover:text-foreground dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-300 dark:hover:text-amber-300"
          )}
        >
          <button type="button" onClick={() => pickCategory(undefined)}>
            {t("all")}
          </button>
        </Badge>
        {categories.data?.map((category) => (
          <Badge
            key={category.id}
            asChild
            variant={categoryId === category.id ? "default" : "outline"}
            className={cn(
              "h-8 px-3.5 text-xs font-heading tracking-wider uppercase font-semibold transition-all shrink-0 cursor-pointer",
              categoryId === category.id
                ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 hover:bg-amber-400"
                : "border-border bg-card text-muted-foreground hover:border-amber-500/50 hover:text-foreground dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-300 dark:hover:text-amber-300"
            )}
          >
            <button type="button" onClick={() => pickCategory(category.id)}>
              {isKhmer ? (category.nameKm || category.nameEn) : category.nameEn}
            </button>
          </Badge>
        ))}
      </div>

      <div className="text-muted-foreground text-right text-xs">
        {t("pricesBeforeVat")}
      </div>

      {isPending || (totalElements > 0 && items.length === 0) ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <Alert variant="destructive">
          <AlertTitle>Couldn&apos;t load the menu</AlertTitle>
          <AlertDescription>
            <p>{error.message}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      ) : totalElements === 0 ? (
        <Empty className="border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UtensilsCrossed />
            </EmptyMedia>
            <EmptyTitle>{t("nothingAvailable")}</EmptyTitle>
            <EmptyDescription>
              {t("noAvailableItems")}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((item) => {
            const image = resolveItemImage(item.nameEn, item.imageUrl, "card")
            const primaryName = isKhmer ? (item.nameKm || item.nameEn) : item.nameEn
            const secondaryName = isKhmer ? item.nameEn : item.nameKm
            const isPrimeCut = /ribeye|tomahawk|wagyu|filet|prime/i.test(item.nameEn || "")
            const isDrink = /bourbon|martini|cabernet|pinot|wine|cocktail/i.test(item.nameEn || "")

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onPick(item)}
                disabled={!item.available}
                className={cn(
                  "group bg-card hover:border-amber-500/60 flex flex-col overflow-hidden rounded-xl border border-border dark:border-stone-800/80 text-left relative",
                  "transition-all duration-300 hover:shadow-lg hover:shadow-amber-950/10 dark:hover:shadow-xl dark:hover:shadow-amber-950/25 hover:-translate-y-0.5",
                  !item.available && "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none"
                )}
              >
                <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden">
                  {isPrimeCut && (
                    <div className="absolute top-2 left-2 z-10 rounded-sm bg-black/80 px-1.5 py-0.5 text-[9px] font-heading font-semibold uppercase tracking-wider text-amber-400 backdrop-blur-sm border border-amber-500/40">
                      ★ Prime Cut
                    </div>
                  )}
                  {isDrink && (
                    <div className="absolute top-2 left-2 z-10 rounded-sm bg-black/80 px-1.5 py-0.5 text-[9px] font-heading font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-sm border border-amber-500/30">
                      Cellar
                    </div>
                  )}
                  {image ? (
                    <img
                      src={image}
                      alt={item.nameEn}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-muted-foreground/50 flex size-full items-center justify-center">
                      <ImageOff className="size-6" />
                    </div>
                  )}
                  {!item.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                      <Badge variant="destructive" className="font-semibold pointer-events-none">{t("soldOut")}</Badge>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-2.5">
                  <span className="line-clamp-2 text-sm font-serif font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                    {primaryName}
                  </span>
                  {secondaryName && (
                    <span className="text-muted-foreground line-clamp-1 text-xs">
                      {secondaryName}
                    </span>
                  )}
                  <span className="text-amber-600 dark:text-amber-400 mt-auto text-sm font-mono font-semibold tabular-nums">
                    {formatPrice(item.price, item.currencyCode)}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft />
            {t("previous")}
          </Button>
          <span className="text-muted-foreground text-sm tabular-nums">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            {t("next")}
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}
