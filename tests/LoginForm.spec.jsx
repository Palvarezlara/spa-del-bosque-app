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

    it('muestra/oculta contraseña (cubre rama de show)', async () => {
    renderWithRouter(<LoginForm />)
    const toggleBtn = screen.getByRole('button', { name: /mostrar u ocultar contraseña/i })
    const group = toggleBtn.closest('.input-group')
    const input = group.querySelector('input')

    expect(input).toHaveAttribute('type', 'password')
    await userEvent.click(toggleBtn)
    expect(input).toHaveAttribute('type', 'text')
  })

  it('envía remember=true cuando se marca Recordarme', async () => {
  mockLogin.mockResolvedValueOnce({ ok: false }) // no navega, solo verificamos args
  renderWithRouter(<LoginForm />)

  const email = screen.getByPlaceholderText(/nombre@correo\.com/i)
  await userEvent.type(email, 'p@duoc.cl')

  const toggleBtn = screen.getByRole('button', { name: /mostrar u ocultar contraseña/i })
  const inputPass = toggleBtn.closest('.input-group').querySelector('input')
  await userEvent.type(inputPass, '1234')

  const remember = screen.getByRole('checkbox', { name: /recordarme/i })
  await userEvent.click(remember)

  await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))
  expect(mockLogin).toHaveBeenCalledWith('p@duoc.cl', '1234', true)
})

  it('muestra banner de registro exitoso con ?registered=1', async () => {
    renderWithRouter(<LoginForm />, { initialEntries: ['/login?registered=1'] })
    expect(screen.getByText(/registro exitoso/i)).toBeInTheDocument()
  })


})
