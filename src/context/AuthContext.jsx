import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const USERS_KEY = 'drip-users'
const SESSION_KEY = 'drip-session'

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

// Guarda a senha como hash SHA-256 (nunca em texto puro).
// Atenção: isto é uma SIMULAÇÃO de login para o front-end; segurança real exige um backend.
async function hash(text) {
  if (!globalThis.crypto?.subtle) return btoa(unescape(encodeURIComponent(text))) // fallback (http fora do localhost)
  const data = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read(SESSION_KEY, null))

  const register = async ({ nome, email, cpf, telefone, cidade, senha }) => {
    const users = read(USERS_KEY, [])
    const emailNorm = email.trim().toLowerCase()

    if (users.some((u) => u.email === emailNorm)) {
      throw new Error('Já existe uma conta com este e-mail.')
    }

    users.push({ nome: nome.trim(), email: emailNorm, cpf, telefone, cidade: cidade.trim(), senhaHash: await hash(senha) })
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }

  const login = async (email, senha) => {
    const emailNorm = email.trim().toLowerCase()
    const found = read(USERS_KEY, []).find((u) => u.email === emailNorm)

    // mesma mensagem para e-mail inexistente e senha errada (não revela qual dos dois falhou)
    if (!found || found.senhaHash !== (await hash(senha))) {
      throw new Error('E-mail ou senha incorretos.')
    }

    const session = { nome: found.nome, email: found.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setUser(session)
    return session
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, register, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}