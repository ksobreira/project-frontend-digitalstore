import { Link } from 'react-router-dom'
import Logo from '../../components/Logo/Logo'
import './Auth.css'

// Moldura das telas de login e cadastro: foto à esquerda, card à direita, rodapé simples.
export default function AuthLayout({ slogan, children }) {
  return (
    <div className="auth">
      <div className="auth__left">
        <div className="auth__overlay" />
      </div>

      <div className="auth__right">
        <div className="auth__card">
          <div className="auth__brand">
            <Link to="/" aria-label="Voltar para a loja">
              <Logo width={180} height={31} />
            </Link>
            <p className="auth__slogan">{slogan}</p>
          </div>
          {children}
        </div>
      </div>

      <footer className="auth__bottom">
        <p className="auth__copy">© {new Date().getFullYear()} Digital Store</p>
        <Link to="/" className="auth__back">
          Voltar para a loja
        </Link>
      </footer>
    </div>
  )
}