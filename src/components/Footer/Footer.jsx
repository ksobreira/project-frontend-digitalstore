import Logo from '../Logo/Logo'
import FooterInfo from '../FooterInfo/FooterInfo'
import facebook from '../../assets/facebook.svg'
import instagram from '../../assets/instagram.svg'
import twitter from '../../assets/twitter.svg'
import './Footer.css'

const social = [
  { name: 'Facebook', href: 'https://facebook.com', icon: facebook },
  { name: 'Instagram', href: 'https://instagram.com', icon: instagram },
  { name: 'Twitter', href: 'https://twitter.com', icon: twitter },
]

const info = [
  { text: 'Sobre Drip Store', link: '/about' },
  { text: 'Segurança', link: '/security' },
  { text: 'Wishlist', link: '/wishlist' },
  { text: 'Blog', link: '/blog' },
  { text: 'Trabalhe conosco', link: '/jobs' },
  { text: 'Meus Pedidos', link: '/meus-pedidos' },
]

const categories = [
  { text: 'Camisetas', link: '/produtos?filter=camiseta' },
  { text: 'Calças', link: '/produtos?filter=calca' },
  { text: 'Bonés', link: '/produtos?filter=bone' },
  { text: 'Headphones', link: '/produtos?filter=headphone' },
  { text: 'Tênis', link: '/produtos?filter=tenis' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Logo variant="footer" width={190} height={33} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
            <div className="footer__social">
              {social.map(({ name, href, icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>
                  <img src={icon} alt="" />
                </a>
              ))}
            </div>
          </div>

          <FooterInfo title="Informação" informations={info} />
          <FooterInfo title="Categorias" informations={categories} />

          <div className="footer-info">
            <h3 className="footer-info__title">Contato</h3>
            <p>Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161</p>
            <p className="footer__phone">(85) 3051-3411</p>
          </div>
        </div>

        <hr />
        <p className="footer__copy">© {new Date().getFullYear()} Digital Store - Feito por: Kauam Sobreira</p>
      </div>
    </footer>
  )
}
