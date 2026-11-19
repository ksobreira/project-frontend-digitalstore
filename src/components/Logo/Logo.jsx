import logoHeader from '../../assets/logo-header.svg'
import logoFooter from '../../assets/logo-footer.svg'


export default function Logo({ variant = 'header', width = 253, height = 44, className = '' }) {
  return (
    <img
      className={className}
      src={variant === 'footer' ? logoFooter : logoHeader}
      width={width}
      height={height}
      alt="Digital Store"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  )
}
