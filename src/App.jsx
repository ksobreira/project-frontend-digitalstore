import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import ProductListingPage from './pages/ProductListingPage/ProductListingPage'
import ProductViewPage from './pages/ProductViewPage/ProductViewPage'
import LoginPage from './pages/LoginPage/index'
import CadastroPage from './pages/CadastroPage'
import CategoriesPage from './pages/CategoriesPage/index'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* A busca do header usa /products; o menu usa /produtos. Ambas abrem a listagem. */}
        <Route path="/produtos" element={<ProductListingPage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/product/:id" element={<ProductViewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}