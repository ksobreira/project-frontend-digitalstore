import starIcon from '../../assets/star-icon.svg'
import { formatBRL } from '../../utils/format'
import './BuyBox.css'

export default function BuyBox({ name, reference, stars, rating, price, priceDiscount, description, children, onBuy }) {
  return (
    <div className="buy-box">
      <h1 className="buy-box__name">{name}</h1>
      <p className="buy-box__reference">{reference}</p>

      <div className="buy-box__rating">
        <span className="buy-box__stars">
          {stars} <img src={starIcon} alt="estrelas" width="16" height="16" />
        </span>
        <span className="buy-box__reviews">({rating} avaliações)</span>
      </div>

      <p className="buy-box__prices">
        {priceDiscount ? (
          <>
            <strong className="buy-box__price">{formatBRL(priceDiscount)}</strong>
            <s className="buy-box__price buy-box__price--old">{formatBRL(price)}</s>
          </>
        ) : (
          <strong className="buy-box__price">{formatBRL(price)}</strong>
        )}
      </p>

      <h2 className="buy-box__label">Descrição do produto</h2>
      <p className="buy-box__description">{description}</p>

      {children}

      <button type="button" className="buy-box__cta" onClick={onBuy}>COMPRAR</button>
    </div>
  )
}
