import { Navigate } from "react-router"

import { LoginForm } from "@/features/auth/components/login-form"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { getToken } from "@/lib/auth/token"

export function LoginPage() {
  if (getToken()) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="bg-muted/50 relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 transition-colors">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle variant="pill" />
      </div>
      <div className="w-full max-w-sm space-y-4">
        <LoginForm />
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Appearance:</span>
          <ThemeToggle variant="pill" />
        </div>
      </div>
    </div>
  )
}
