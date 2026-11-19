import { Link } from 'react-router-dom'
import Layout from '../Layout'
import Section from '../../components/Section/Section'
import { products, filterGroups } from '../../data/product'
import './CategoriesPage.css'

// Categorias reais dos produtos (as mesmas do filtro da listagem)
const categories = filterGroups
  .find((group) => group.key === 'category')
  .options.map(({ text }) => {
    const inCategory = products.filter((product) => product.category === text)
    return { name: text, count: inCategory.length, image: inCategory[0]?.image }
  })

export default function CategoriesPage() {
  return (
    <Layout>
      <div className="container categories">
        <Section title="Categorias" titleAlign="left">
          <ul className="categories__grid">
            {categories.map(({ name, count, image }) => (
              <li key={name}>
                {/* a listagem lê ?categoria= e já marca o filtro correspondente */}
                <Link to={`/produtos?categoria=${encodeURIComponent(name)}`} className="category-card">
                  <img src={image} alt="" width="292" height="321" />
                  <span className="category-card__name">{name}</span>
                  <span className="category-card__count">
                    {count} {count === 1 ? 'produto' : 'produtos'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </Layout>
  )
}