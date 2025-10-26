import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

// Mocks
const { mockAddItem, mockShowToast } = vi.hoisted(() => ({
  mockAddItem: vi.fn(),
  mockShowToast: vi.fn(),
}))

vi.mock('../src/context/CartContext', () => ({
  useCart: () => ({ addItem: mockAddItem }),
}))

vi.mock('../src/utils/toast', () => ({
  showToast: mockShowToast,
}))

import CardServicio from '../src/components/CardServicio'

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('CardServicio', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza nombre y link al detalle (render + props)', () => {
    const servicio = { sku: 'SKU123', nombre: 'Masaje Relax', precio: 29990, img: '' }
    renderWithRouter(<CardServicio servicio={servicio} />)

    expect(screen.getByText(/masaje relax/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver detalle/i })).toHaveAttribute('href', '/servicio/SKU123')
  })

  it('clic en "Agregar" llama addItem y showToast (evento + mocks)', async () => {
    const servicio = { sku: 'SKU999', nombre: 'Spa Día', precio: 49990, img: '', categoria: 'Spa', duracionMin: 60 }
    renderWithRouter(<CardServicio servicio={servicio} />)

    await userEvent.click(screen.getByRole('button', { name: /agregar/i }))

    expect(mockAddItem).toHaveBeenCalledWith({
      sku: 'SKU999',
      nombre: 'Spa Día',
      precio: 49990,
      img: '',
      categoria: 'Spa',
      duracionMin: 60,
      qty: 1,
    })
    expect(mockShowToast).toHaveBeenCalledWith('Agregado: Spa Día', 'success')
  })
})
