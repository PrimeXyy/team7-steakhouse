import { Outlet } from "react-router"

import { LanguageToggle } from "@/components/shared/language-toggle"
import { useGuestSession } from "@/features/guest/hooks/use-guest-session"
import { useLanguage } from "@/lib/language-context"

export function GuestLayout() {
  const session = useGuestSession()
  const { t, language } = useLanguage()
  const tableNumber =
    session.status === "browsing" || session.status === "spent"
      ? session.tableNumber
      : null

  return (
    <div className="bg-muted/30 flex min-h-svh flex-col">
      <header className="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo_concept.jpg"
            alt="Team 7 Steak House"
            className="size-8 rounded-lg object-cover border border-amber-500/40 shadow-sm shrink-0"
          />
          <div className="grid text-left text-sm leading-tight">
            <span className="font-heading tracking-wider uppercase text-amber-500 dark:text-amber-400 font-bold">
              Team 7 Steak House
            </span>
            <span className="text-muted-foreground text-xs font-medium">
              {tableNumber
                ? `${language === "km" ? "តុ" : "Table"} ${tableNumber}`
                : t("orderAhead")}
            </span>
          </div>
        </div>

        <LanguageToggle />
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-4 p-4">
        <Outlet />
      </main>
    </div>
  )
}
