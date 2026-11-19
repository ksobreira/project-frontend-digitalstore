import Layout from '../Layout'
import Gallery from '../../components/Gallery/Gallery'
import Section from '../../components/Section/Section'
import ProductListing from '../../components/ProductListing/ProductListing'
import { products } from '../../data/product'
import './HomePage.css'

const slides = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ src: `/home-slide-${n}.jpeg` }))
const collections = [1, 2, 3]

export default function HomePage() {
  return (
    <Layout>
      <Gallery images={slides} width={1440} height={681} showDots />

      <div className="container">
        <Section title="Coleções em destaque" titleAlign="center">
          <ul className="collections">
            {collections.map((n) => (
              <li key={n}><img src={`/collection-${n}.png`} alt={`Coleção ${n}`} width="405" height="251" /></li>
            ))}
          </ul>
        </Section>

        <Section title="Produtos em alta" titleAlign="left" link={{ text: 'Ver todos', href: '/produtos' }}>
          <ProductListing products={products.slice(0, 8)} />
        </Section>
      </div>
    </Layout>
  )
}
