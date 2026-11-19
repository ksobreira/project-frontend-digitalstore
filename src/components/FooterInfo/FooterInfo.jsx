import { Link } from 'react-router-dom'

export default function FooterInfo({ title, informations = [] }) {
  return (
    <div className="footer-info">
      <h3 className="footer-info__title">{title}</h3>
      <ul>
        {informations.map(({ text, link }) => (
          <li key={text}><Link to={link}>{text}</Link></li>
        ))}
      </ul>
    </div>
  )
}
