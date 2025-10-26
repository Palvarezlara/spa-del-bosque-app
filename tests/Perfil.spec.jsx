import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (orig) => {
  const actual = await orig()
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Estado mutable que el mock devolverá
const authState = {
  isLoggedIn: true,
  user: {
    nombre: 'Pamela',
    apellido: 'Álvarez',
    email: 'pame@duoc.cl',
    telefono: '987654321',
    region: 'Valparaíso',
    comuna: 'Viña del Mar',
  },
  logout: vi.fn(),
}

vi.mock('../src/context/AuthContext', () => ({
  useAuth: () => authState,
}))

import Perfil from '../src/pages/Perfil'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Perfil', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Resetea estado "logueado"
    authState.isLoggedIn = true
    authState.user = {
      nombre: 'Pamela',
      apellido: 'Álvarez',
      email: 'pame@duoc.cl',
      telefono: '987654321',
      region: 'Valparaíso',
      comuna: 'Viña del Mar',
    }
  })

  it('si no está logueado, navega a /login', () => {
    authState.isLoggedIn = false
    authState.user = null
    renderWithRouter(<Perfil />)
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('con usuario, renderiza datos y permite cerrar sesión', async () => {
    renderWithRouter(<Perfil />)
    expect(screen.getByRole('heading', { name: /mi perfil/i })).toBeInTheDocument()
    expect(screen.getByDisplayValue('Pamela')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Álvarez')).toBeInTheDocument()
    expect(screen.getByDisplayValue('pame@duoc.cl')).toBeInTheDocument()

    const btnLogout = screen.getByRole('button', { name: /cerrar sesión/i })
    await userEvent.click(btnLogout)
    expect(authState.logout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
