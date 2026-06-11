/* eslint-disable @typescript-eslint/no-explicit-any */
// @vitest-environment jsdom
import { renderHook, waitFor } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { useSignIn } from "./useSignIn"
import { useAuth } from "@/app/hooks/useAuth"
import { authService } from "@/app/services/authServices"
import { toast } from "sonner"

vi.mock("@/app/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}))

vi.mock("sonner", () => ({
  toast: { error: vi.fn() },
}))

vi.mock("@/app/services/authServices", () => ({
  authService: { signIn: vi.fn() },
}))

let mockSubmitData = { email: "", password: "" }
vi.mock("react-hook-form", async () => {
  const actual = await vi.importActual<typeof import("react-hook-form")>("react-hook-form")
  return {
    ...actual,
    useForm: () => ({
      register: vi.fn(),
      formState: { errors: {} },
      handleSubmit: (callbackFn: any) => (e: any) => callbackFn(mockSubmitData),
    }),
  }
})

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe("Custom Hook: useSignIn", () => {
  const mockSignIn = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useAuth).mockImplementation((selector) => selector({ signIn: mockSignIn }))
  })

  it("Should authenticate successfully when the service responds correctly", async () => {

    mockSubmitData = { email: "teste@exemplo.com", password: "senha-valida-123" }

    vi.mocked(authService.signIn).mockResolvedValue({
      accessToken: "vitest-token-sucesso",
      refreshToken: "vitest-refresh-sucesso",
    })

    const { result } = renderHook(() => useSignIn(), { wrapper: createWrapper() })

    result.current.handleSubmit({ preventDefault: vi.fn() })

    await waitFor(() => {
      expect(authService.signIn).toHaveBeenCalledWith({
        email: "teste@exemplo.com",
        password: "senha-valida-123",
      })
      expect(mockSignIn).toHaveBeenCalledWith("vitest-token-sucesso", "vitest-refresh-sucesso")
    })
  })

  it("Should display error toast when the service fails (rejecting the Promise)", async () => {
    mockSubmitData = { email: "errado@exemplo.com", password: "senha-errada-123" }

    vi.mocked(authService.signIn).mockRejectedValue(new Error("Erro de autenticação"))

    const { result } = renderHook(() => useSignIn(), { wrapper: createWrapper() })

    result.current.handleSubmit({ preventDefault: vi.fn() })

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Credenciais inválidas", expect.any(Object))
    })
  })
})
