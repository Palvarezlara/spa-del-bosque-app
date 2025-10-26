import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

// ---- Mocks
const mockLogin = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoggedIn: false,
    user: null,
    logout: vi.fn(),
  }),
}))

import LoginForm from '../src/components/auth/LoginForm'

const renderWithRouter = (ui, { initialEntries = ['/login'] } = {}) =>
  render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>)

// helper para obtener el input de contraseña desde el botón del input-group
function getPasswordInput() {
  const toggleBtn = screen.getByRole('button', { name: /mostrar u ocultar contraseña/i })
  // sube al contenedor del grupo y busca el input (password o text si se mostró)
  const group = toggleBtn.closest('.input-group')
  const input = group?.querySelector('input[type="password"], input[type="text"]')
  if (!input) throw new Error('No se encontró el input de contraseña')
  return input
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    sessionStorage.clear()
    localStorage.clear()
  })

  it('permite escribir y al fallar el login muestra error (state + evento + mock)', async () => {
    mockLogin.mockResolvedValueOnce({ ok: false })

    renderWithRouter(<LoginForm />)

    const email = screen.getByPlaceholderText(/nombre@correo\.com/i)
    await userEvent.type(email, 'p@duoc.cl')

    const passwordBox = getPasswordInput()
    await userEvent.type(passwordBox, 'mala')

    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(mockLogin).toHaveBeenCalledWith('p@duoc.cl', 'mala', false)
    expect(screen.getByText(/correo o contraseña incorrectos/i)).toBeInTheDocument()
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('login exitoso navega a returnTo (evento + router real + mock navigate)', async () => {
    mockLogin.mockResolvedValueOnce({ ok: true })

    renderWithRouter(<LoginForm />, { initialEntries: ['/login?returnTo=%2Fperfil'] })

    const email = screen.getByPlaceholderText(/nombre@correo\.com/i)
    await userEvent.type(email, 'pamela@example.com')

    const passwordBox = getPasswordInput()
    await userEvent.type(passwordBox, 'Secreta123')

    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))

    expect(mockLogin).toHaveBeenCalledWith('pamela@example.com', 'Secreta123', false)
    expect(mockNavigate).toHaveBeenCalledWith('/perfil', { replace: true })
  })
})
