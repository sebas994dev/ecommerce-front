import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import ProductDetail from './pages/ProductDetail'
import Footer from './components/Footer'
import CategoryPage from './pages/CategoryPage'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/categoria/:idCategoria" element={<CategoryPage />} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
