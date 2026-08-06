import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartDrawer from './components/cartDrawer'
import Home from './pages/Home'
import useTheme from './hooks/useTheme'
import { useCart } from './context/CartContext'
import './App.css'

function OnlineMall() {
  const { theme, toggleTheme } = useTheme()
  const { cartCount } = useCart()

  return (
    <>
      <Navbar cartCount={cartCount} theme={theme} onThemeToggle={toggleTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDrawer />} />
      </Routes>
    </>
  )
}

export default OnlineMall
