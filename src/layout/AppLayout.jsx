import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function AppLayout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <main className="container py-4 flex-grow-1">{children}</main>
      <Footer />
    </div>
  )
}