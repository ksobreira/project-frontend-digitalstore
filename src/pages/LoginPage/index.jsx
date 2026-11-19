import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../Auth/AuthLayout'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  // O cadastro redireciona para cá com { cadastrado: true }
  const acabouDeCadastrar = location.state?.cadastrado

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    try {
      await login(email, senha)
      navigate('/')
    } catch (error) {
      setErro(error.message || 'Não foi possível entrar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout slogan="Acesse sua conta para continuar comprando">
      <form onSubmit={handleLogin} className="auth-form">
        <div className="auth-form__grid">
          <div className="auth-form__group auth-form__group--full">
            <label htmlFor="email">E-MAIL</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-form__group auth-form__group--full">
            <label htmlFor="senha">SENHA</label>
            <input
              id="senha"
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
        </div>

        {acabouDeCadastrar && !erro && <p className="auth-form__success">Conta criada! Entre para continuar.</p>}
        {erro && (
          <p className="auth-form__error" role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="auth-form__button" disabled={loading}>
          {loading ? 'ENTRANDO...' : 'ENTRAR'}
        </button>
      </form>

      <div className="auth-form__footer">
        <p>
          Não possui conta?{' '}
          <Link to="/cadastro" className="auth-form__link">
            Cadastre-se
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}