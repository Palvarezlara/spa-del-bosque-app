import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import{ Outlet } from 'react-router-dom';
import { CartProvider } from '../context/CartContext'; 

export default function AppLayout(){
  return (
    <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="container py-4 flex-grow-1"><Outlet /></main>
        
      <Footer />
      <div id="toastArea" className="toast-container position-fixed bottom-0 end-0 p-3" />
      </div>
    </CartProvider>
    
  );
}