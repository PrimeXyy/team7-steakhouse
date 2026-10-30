import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ThemeToggle } from "./theme-toggle"

const mockSetTheme = vi.fn()
let mockTheme = "dark"
let mockResolvedTheme = "dark"

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme,
    setTheme: mockSetTheme,
    resolvedTheme: mockResolvedTheme,
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockTheme = "dark"
    mockResolvedTheme = "dark"
  })

  it("renders icon toggle button and switches theme on click", async () => {
    const user = userEvent.setup()
    render(<ThemeToggle variant="icon" />)

    const button = screen.getByRole("button", { name: /toggle theme|switch to/i })
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith("light")
  })

  it("renders pill variant with Light and Dark options", async () => {
    const user = userEvent.setup()
    render(<ThemeToggle variant="pill" />)

    const lightBtn = screen.getByRole("radio", { name: /light/i })
    const darkBtn = screen.getByRole("radio", { name: /dark/i })

    expect(lightBtn).toBeInTheDocument()
    expect(darkBtn).toBeInTheDocument()

    await user.click(lightBtn)
    expect(mockSetTheme).toHaveBeenCalledWith("light")

    await user.click(darkBtn)
    expect(mockSetTheme).toHaveBeenCalledWith("dark")
  })

  it("handles light theme state correctly", async () => {
    mockTheme = "light"
    mockResolvedTheme = "light"

    const user = userEvent.setup()
    render(<ThemeToggle variant="icon" />)

    const button = screen.getByRole("button", { name: /toggle theme|switch to dark mode/i })
    expect(button).toBeInTheDocument()

    await user.click(button)
    expect(mockSetTheme).toHaveBeenCalledWith("dark")
  })
})
