import { Link, useParams } from 'react-router-dom'
import Layout from '../Layout'
import Gallery from '../../components/Gallery/Gallery'
import BuyBox from '../../components/BuyBox/BuyBox'
import ProductOptions from '../../components/ProductOptions/ProductOptions'
import Section from '../../components/Section/Section'
import ProductListing from '../../components/ProductListing/ProductListing'
import { products } from '../../data/product'
import './ProductViewPage.css'

export default function ProductViewPage() {
  const { id } = useParams() // rota /product/:id
  const product = products.find((p) => String(p.id) === id)

  if (!product) {
    return (
      <Layout>
        <div className="container not-found">
          <h1>Produto não encontrado</h1>
          <Link to="/produtos">Ver todos os produtos</Link>
        </div>
      </Layout>
    )
  }

  const recommended = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <Layout>
      <div className="container product-view" key={product.id}>
        <nav className="breadcrumb" aria-label="Você está em">
          <Link to="/">Home</Link> / <Link to="/produtos">Produtos</Link> / <Link to="/produtos">{product.type}</Link> /{' '}
          <Link to={`/produtos?filter=${product.brand}`}>{product.brand}</Link> / <span>{product.name}</span>
        </nav>

        <div className="product-view__main">
          <Gallery images={product.images} width="700px" height="570px" radius="4px" showThumbs />

          <BuyBox
            name={product.name}
            reference={product.reference}
            stars={product.stars}
            rating={product.rating}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description={product.description}
          >
            <ProductOptions title="Tamanho" options={product.sizes} shape="square" radius="4px" type="text" />
            <ProductOptions title="Cor" options={product.colors} shape="circle" type="color" />
          </BuyBox>
        </div>

        <Section title="Produtos recomendados" titleAlign="left" link={{ text: 'Ver todos', href: '/produtos' }}>
          <ProductListing products={recommended} />
        </Section>
      </div>
    </Layout>
  )
}
