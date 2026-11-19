import ProductCard from '../ProductCard/ProductCard'
import './ProductListing.css'

// Encapsula vários <ProductCard /> numa grade responsiva.
export default function ProductListing({ products = [] }) {
  if (products.length === 0) {
    return <p className="product-listing__empty">Nenhum produto encontrado.</p>
  }

  return (
    <ul className="product-listing">
      {products.map((product) => (
        <li key={product.id ?? product.name}>
          <ProductCard {...product} />
        </li>
      ))}
    </ul>
  )
}
