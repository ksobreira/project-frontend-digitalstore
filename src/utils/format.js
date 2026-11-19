// Formata número como moeda brasileira: 149.9 -> "R$ 149,90"
export const formatBRL = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Remove acentos e caixa para comparar textos na busca
export const normalize = (text = '') =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
