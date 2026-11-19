import { useState } from 'react'
import arrowLeft from '../../assets/arrow-left.svg'
import arrowRight from '../../assets/arrow-right.svg'
import './Gallery.css'

const toNumber = (v) => parseInt(v, 10)

export default function Gallery({
  images = [],
  width = 1440,
  height = 681,
  radius = '0px',
  showThumbs = false,
  showDots = false,
  className = '',
}) {
  const [current, setCurrent] = useState(0)
  const last = images.length - 1

  const prev = () => setCurrent((i) => Math.max(i - 1, 0))
  const next = () => setCurrent((i) => Math.min(i + 1, last))

  return (
    <div className={`gallery ${className}`} style={{ maxWidth: `${toNumber(width)}px` }}>
      <div
        className="gallery__viewport"
        style={{ aspectRatio: `${toNumber(width)} / ${toNumber(height)}`, borderRadius: radius }}
      >
        {/* Faixa com todas as imagens lado a lado; deslocamos em múltiplos de 100% */}
        <div className="gallery__track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((image, i) => (
            <img key={image.src} src={image.src} alt={`Imagem ${i + 1} de ${images.length}`} />
          ))}
        </div>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--left"
          onClick={prev}
          disabled={current === 0}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeft} alt="" />
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--right"
          onClick={next}
          disabled={current === last}
          aria-label="Próxima imagem"
        >
          <img src={arrowRight} alt="" />
        </button>

        {showDots && (
          <div className="gallery__dots">
            {images.map((image, i) => (
              <button
                key={image.src}
                type="button"
                className={`gallery__dot${i === current ? ' gallery__dot--active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Ir para a imagem ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {showThumbs && (
        <div className="gallery__thumbs">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={`gallery__thumb${i === current ? ' gallery__thumb--active' : ''}`}
              style={{ borderRadius: radius }}
              onClick={() => setCurrent(i)}
              aria-label={`Ver imagem ${i + 1}`}
            >
              <img src={image.src} alt="" width="117" height="95" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
