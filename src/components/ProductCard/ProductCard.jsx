import { Link } from 'react-router-dom'
import { formatBRL } from '../../utils/format'
import './ProductCard.css'

// Cartão do produto. Se `id` existir, o cartão vira link para /product/:id.
export default function ProductCard({ id, image, name, type, price, priceDiscount }) {
  const discount = priceDiscount ? Math.round((1 - priceDiscount / price) * 100) : 0
  const Wrapper = id ? Link : 'div'
  const wrapperProps = id ? { to: `/product/${id}` } : {}

  return (
    <Wrapper className="product-card" {...wrapperProps}>
      <div className="product-card__image">
        {discount > 0 && <span className="product-card__badge">{discount}% OFF</span>}
        <img src={image} alt={name} width="292" height="321" loading="lazy" />
      </div>
      {type && <span className="product-card__type">{type}</span>}
      <h3 className="product-card__name">{name}</h3>
      <p className="product-card__prices">
        {priceDiscount ? (
          <>
            <s className="product-card__price product-card__price--old">{formatBRL(price)}</s>
            <strong className="product-card__price">{formatBRL(priceDiscount)}</strong>
          </>
        ) : (
          <strong className="product-card__price">{formatBRL(price)}</strong>
        )}
      </p>
    </Wrapper>
  )
}
