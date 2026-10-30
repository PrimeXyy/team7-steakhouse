import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface ThemeToggleProps {
  className?: string
  variant?: "icon" | "pill"
}

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const themeContext = useTheme()
  const theme = themeContext?.theme
  const setTheme = themeContext?.setTheme ?? (() => {})
  const resolvedTheme = themeContext?.resolvedTheme

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark before mount to match initial server/index.html state
  const isDark = mounted
    ? (resolvedTheme === "dark" || theme === "dark")
    : (resolvedTheme ? resolvedTheme === "dark" : theme ? theme === "dark" : typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : true)

  if (variant === "pill") {
    return (
      <div
        role="radiogroup"
        aria-label="Theme selection"
        className={cn(
          "bg-muted/80 inline-flex items-center rounded-full p-0.5 text-xs font-semibold select-none border border-border/60 shadow-xs",
          className
        )}
      >
        <button
          type="button"
          role="radio"
          aria-checked={!isDark}
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all cursor-pointer",
            !isDark
              ? "bg-background text-foreground shadow-xs font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
          title="Light mode"
        >
          <Sun className="size-3.5 text-amber-500" />
          <span>Light</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={isDark}
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all cursor-pointer",
            isDark
              ? "bg-background text-foreground shadow-xs font-medium"
              : "text-muted-foreground hover:text-foreground"
          )}
          title="Dark mode"
        >
          <Moon className="size-3.5 text-amber-400" />
          <span>Dark</span>
        </button>
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "size-9 rounded-full border border-border/60 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors shadow-xs",
        className
      )}
      title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
      aria-label={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
    >
      {isDark ? (
        <Sun className="size-4 text-amber-400 transition-all hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-amber-600 transition-all hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
