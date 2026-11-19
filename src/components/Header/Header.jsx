import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from '../Logo/Logo'
import { MenuIcon, CloseIcon, SearchIcon } from '../Icons'
import miniCart from '../../assets/mini-cart.svg'
import './Header.css'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/produtos', label: 'Produtos' },
  { to: '/categorias', label: 'Categorias' },
  { to: '/meus-pedidos', label: 'Meus Pedidos' },
]

// Navegação principal: NavLink aplica a classe "active" na rota atual
function MainNav({ onNavigate }) {
  return (
    <nav className="main-nav" aria-label="Principal">
      {links.map(({ to, label, end }) => (
        <NavLink key={to} to={to} end={end} className="main-nav__link" onClick={onNavigate}>
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function AuthLinks({ onNavigate }) {
  return (
    <div className="auth-links">
      <Link to="/cadastro" className="auth-links__signup" onClick={onNavigate}>Cadastre-se</Link>
      <Link to="/login" className="auth-links__login" onClick={onNavigate}>Entrar</Link>
    </div>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  // Enter no input ou clique na lupa disparam o submit do form
  const handleSearch = (event) => {
    event.preventDefault()
    const term = query.trim()
    navigate(term ? `/products?filter=${encodeURIComponent(term)}` : '/products')
    setSearchOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="container header__top">
        <button type="button" className="header__icon-btn header__menu-btn" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <MenuIcon />
        </button>

        <Link to="/" className="header__logo"><Logo /></Link>

        <form className={`header__search${searchOpen ? ' header__search--open' : ''}`} role="search" onSubmit={handleSearch}>
          <input type="search" placeholder="Pesquisar produto..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Pesquisar produto" />
          <button type="submit" aria-label="Pesquisar"><SearchIcon /></button>
        </form>

        <div className="header__desktop-auth"><AuthLinks /></div>

        <button type="button" className="header__icon-btn header__search-toggle" onClick={() => setSearchOpen((o) => !o)} aria-label="Abrir pesquisa" aria-expanded={searchOpen}>
          <SearchIcon />
        </button>

        <span className="header__cart" role="img" aria-label="Carrinho com 2 itens">
          <img src={miniCart} alt="" width="24" height="24" />
          <span className="header__badge">2</span>
        </span>
      </div>

      <div className="container header__nav"><MainNav /></div>

      {/* Menu lateral (mobile) */}
      {menuOpen && <div className="drawer-overlay" onClick={closeMenu} />}
      <aside className={`drawer${menuOpen ? ' drawer--open' : ''}`} aria-hidden={!menuOpen}>
        <button type="button" className="header__icon-btn drawer__close" onClick={closeMenu} aria-label="Fechar menu"><CloseIcon /></button>
        <p className="drawer__title">Páginas</p>
        <MainNav onNavigate={closeMenu} />
        <div className="drawer__footer"><AuthLinks onNavigate={closeMenu} /></div>
      </aside>
    </header>
  )
}
