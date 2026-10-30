import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { LoginPage } from "./login"

vi.mock("@/lib/auth/token", () => ({
  getToken: () => null,
}))

vi.mock("@/features/auth/components/login-form", () => ({
  LoginForm: () => <div data-testid="login-form">Login Form Mock</div>,
}))

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    setTheme: vi.fn(),
    resolvedTheme: "dark",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe("LoginPage", () => {
  it("renders login form and theme toggles", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    expect(screen.getByTestId("login-form")).toBeInTheDocument()
    const radios = screen.getAllByRole("radio")
    expect(radios.length).toBeGreaterThanOrEqual(2)
  })
})
