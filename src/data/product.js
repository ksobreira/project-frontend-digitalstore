const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'


const detail = {
  description: LOREM,
  stars: 4.7,
  rating: 90,
  sizes: ['39', '40', '41', '42', '43'],
  colors: ['#6FEEFF', '#FF6B6B', '#5E5E5E', '#6D70B7'],
  images: [1, 2, 3, 4, 5].map((n) => ({ src: `/produc-image-${n}.jpeg` })),
}

const raw = [
  ['Tênis Nike Revolution 6 Next Nature Masculino', 'Nike', 'Casual', 'Masculino', 'Novo', 219, null],
  ['K-Swiss V8 - Masculino', 'K-Swiss', 'Esporte e lazer', 'Masculino', 'Novo', 200, 100],
  ['Tênis Adidas Runfalcon Feminino', 'Adiddas', 'Corrida', 'Feminino', 'Novo', 299, 239.9],
  ['Tênis Puma Smash Unissex', 'Puma', 'Casual', 'Unisex', 'Usado', 189.9, null],
  ['K-Swiss Classic VN Feminino', 'K-Swiss', 'Casual', 'Feminino', 'Novo', 249, 199],
  ['Tênis Nike Air Max Masculino', 'Nike', 'Esporte e lazer', 'Masculino', 'Novo', 599, 449.9],
  ['Tênis Calenciaga Triple S', 'Calenciaga', 'Utilitário', 'Unisex', 'Usado', 350, 280],
  ['Tênis Adidas Ultraboost Masculino', 'Adiddas', 'Corrida', 'Masculino', 'Novo', 699, null],
  ['Tênis Puma RS-X Feminino', 'Puma', 'Esporte e lazer', 'Feminino', 'Novo', 429, 329.9],
  ['K-Swiss V8 - Feminino', 'K-Swiss', 'Esporte e lazer', 'Feminino', 'Usado', 200, 100],
  ['Tênis Nike Court Vision Masculino', 'Nike', 'Utilitário', 'Masculino', 'Novo', 379, 299],
  ['Tênis Calenciaga Runner Unissex', 'Calenciaga', 'Corrida', 'Unisex', 'Novo', 520, null],
]

export const products = raw.map(
  ([name, brand, category, gender, state, price, priceDiscount], i) => ({
    id: i + 1,
    name,
    type: 'Tênis',
    brand,
    category,
    gender,
    state,
    image: `/product-thumb-${(i % 5) + 1}.jpeg`,
    price,
    ...(priceDiscount ? { priceDiscount } : {}),
    reference: `${category} | ${brand} | REF:${38416700 + i + 1}`,
    ...detail,
    images: [{ src: `/product-thumb-${(i % 5) + 1}.jpeg` }, ...detail.images],
  })
)

// Grupos exibidos no painel "Filtrar por"
export const filterGroups = [
  { key: 'brand', title: 'Marca', inputType: 'checkbox',
    options: ['Adiddas', 'Calenciaga', 'K-Swiss', 'Nike', 'Puma'].map((text) => ({ text })) },
  { key: 'category', title: 'Categoria', inputType: 'checkbox',
    options: ['Esporte e lazer', 'Casual', 'Utilitário', 'Corrida'].map((text) => ({ text })) },
  { key: 'gender', title: 'Gênero', inputType: 'checkbox',
    options: [{ text: 'Masculino' }, { text: 'Feminino' }, { text: 'Unisex' }] },
  { key: 'state', title: 'Estado', inputType: 'radio',
    options: [{ text: 'Novo' }, { text: 'Usado' }] },
]
