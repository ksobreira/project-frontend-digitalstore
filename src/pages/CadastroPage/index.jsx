import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../Auth/AuthLayout'
import { useAuth } from '../../context/AuthContext'

// Mantém só dígitos e limita o tamanho (CPF e telefone digitados como números)
const somenteNumeros = (value, max = 11) => value.replace(/\D/g, '').slice(0, max)

export default function CadastroPage() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    cidade: '',
    senha: '',
    confirmarSenha: '',
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  // Atualiza um campo do formulário pelo atributo name do input
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleNumber = (e) => setForm((prev) => ({ ...prev, [e.target.name]: somenteNumeros(e.target.value) }))

  const handleCadastro = async (e) => {
    e.preventDefault()
    setErro('')

    if (form.cpf.length !== 11) return setErro('O CPF deve ter 11 números.')
    if (form.telefone.length < 10) return setErro('Informe um telefone válido com DDD.')
    if (form.senha.length < 6) return setErro('A senha deve ter pelo menos 6 caracteres.')
    if (form.senha !== form.confirmarSenha) return setErro('As senhas não conferem.')

    try {
      setLoading(true)
      await register(form)
      navigate('/login', { state: { cadastrado: true } })
    } catch (error) {
      setErro(error.message || 'Não foi possível realizar o cadastro.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout slogan="Crie sua conta e aproveite as melhores ofertas">
      <form onSubmit={handleCadastro} className="auth-form">
        <div className="auth-form__grid">
          <div className="auth-form__group auth-form__group--full">
            <label htmlFor="nome">NOME COMPLETO</label>
            <input id="nome" name="nome" type="text" placeholder="Seu nome completo" value={form.nome} onChange={handleChange} required />
          </div>

          <div className="auth-form__group auth-form__group--full">
            <label htmlFor="email">E-MAIL</label>
            <input id="email" name="email" type="email" placeholder="seu@email.com" value={form.email} onChange={handleChange} required />
          </div>

          <div className="auth-form__group">
            <label htmlFor="cpf">CPF</label>
            <input id="cpf" name="cpf" type="text" inputMode="numeric" placeholder="00000000000" value={form.cpf} onChange={handleNumber} required />
          </div>

          <div className="auth-form__group">
            <label htmlFor="telefone">TELEFONE</label>
            <input id="telefone" name="telefone" type="text" inputMode="numeric" placeholder="85999999999" value={form.telefone} onChange={handleNumber} required />
          </div>

          <div className="auth-form__group auth-form__group--full">
            <label htmlFor="cidade">CIDADE</label>
            <input id="cidade" name="cidade" type="text" placeholder="Sua cidade" value={form.cidade} onChange={handleChange} required />
          </div>

          <div className="auth-form__group">
            <label htmlFor="senha">SENHA</label>
            <input id="senha" name="senha" type="password" placeholder="Mínimo 6 caracteres" value={form.senha} onChange={handleChange} required />
          </div>

          <div className="auth-form__group">
            <label htmlFor="confirmarSenha">CONFIRMAR SENHA</label>
            <input id="confirmarSenha" name="confirmarSenha" type="password" placeholder="Repita a senha" value={form.confirmarSenha} onChange={handleChange} required />
          </div>
        </div>

        {erro && (
          <p className="auth-form__error" role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="auth-form__button" disabled={loading}>
          {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
        </button>
      </form>

      <div className="auth-form__footer">
        <p>
          Já possui uma conta?{' '}
          <Link to="/login" className="auth-form__link">
            Faça login
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}