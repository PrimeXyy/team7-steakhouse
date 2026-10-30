import { LogOut } from "lucide-react"
import { NavLink, Outlet, useNavigate } from "react-router"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { clearToken, getUsername } from "@/lib/auth/token"

export function CashierLayout() {
  const navigate = useNavigate()
  const username = getUsername() ?? "Cashier"

  function logout() {
    clearToken()
    navigate("/login", { replace: true })
  }

  return (
    <div className="flex min-h-svh flex-col">
      <header className="bg-background sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
        <NavLink to="/cashier" className="flex items-center gap-2.5">
          <img
            src="/logo_concept.jpg"
            alt="Team 7"
            className="size-8 rounded-lg object-cover border border-amber-500/40 shadow-sm shrink-0"
          />
          <div className="grid text-left text-sm leading-tight">
            <span className="font-heading tracking-wider uppercase text-amber-600 dark:text-amber-400 font-bold">
              Team 7 Steak House
            </span>
            <span className="text-muted-foreground text-xs font-medium">Cashier &amp; Till</span>
          </div>
        </NavLink>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg uppercase">
                    {username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={logout}>
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  )
}
