import { useState } from 'react'
import './ProductOptions.css'

// shape: "square" | "circle"   type: "text" | "color"
export default function ProductOptions({ title, options = [], shape = 'square', radius = '4px', type = 'text', onChange }) {
  const [selected, setSelected] = useState(null)

  const choose = (option) => {
    setSelected(option)
    onChange?.(option)
  }

  return (
    <div className="product-options">
      {title && <p className="product-options__title">{title}</p>}
      <div className="product-options__list" role="group" aria-label={title}>
        {options.map((option) => {
          const isSelected = selected === option
          const style = {
            ...(shape === 'square' ? { borderRadius: radius } : {}),
            ...(type === 'color' ? { backgroundColor: option } : {}),
          }
          return (
            <button
              key={option}
              type="button"
              className={`product-options__item product-options__item--${shape}${isSelected ? ' product-options__item--selected' : ''}`}
              style={style}
              onClick={() => choose(option)}
              aria-pressed={isSelected}
              aria-label={type === 'color' ? `Cor ${option}` : option}
            >
              {type === 'text' ? option : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
