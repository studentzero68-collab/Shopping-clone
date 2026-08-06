import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartDrawer from './components/cartDrawer'
import Home from './pages/Home'
import useTheme from './hooks/useTheme'
import { useProducts } from './context/ProductsContext'
import { useCart } from './context/CartContext'
import './App.css'

function OnlineMall() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { setSearchTerm, setActiveCategory } = useProducts()
  const { cartCount } = useCart()

  function handleSearch(query) {
    setSearchTerm(query)
  }

  function handleCategorySelect(category) {
    setActiveCategory(category)
  }

  function handleCartNavigation(e) {
    e.preventDefault()
    navigate('/cart')
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        theme={theme}
        onThemeToggle={toggleTheme}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        onCartClick={handleCartNavigation}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartDrawer />} />
      </Routes>
    </>
  )
}

export default OnlineMall