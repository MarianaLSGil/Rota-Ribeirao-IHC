import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'
import './Profile.css'

const MOCK_HISTORY = [
  { id: 1, name: 'Bar do Alemão',         category: 'bar',        rating: 5, date: 'há 2 dias' },
  { id: 2, name: 'Café Estação',           category: 'cafe',       rating: 4, date: 'há 1 semana' },
  { id: 3, name: 'Restaurante Don Camilo', category: 'restaurante', rating: 5, date: 'há 2 semanas' },
  { id: 4, name: 'Mercado Municipal',      category: 'mercado',    rating: 3, date: 'há 1 mês' },
]

const BADGE_COLOR = {
  bar: 'badge--orange',
  cafe: 'badge--blue',
  restaurante: 'badge--green',
  mercado: 'badge--purple',
  evento: 'badge--red',
}

export default function Profile() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  function handleLogout() {
    logout()
    setUser(null)
    navigate('/')
  }

  const initials = user.name
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?'

  return (
    <div className="page-wrapper profile-page">
      <div className="container">

        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <span className="profile-email">
              <i className="fa-solid fa-envelope"></i> {user.email}
            </span>
            {user.isAdmin && (
              <span className="badge badge--purple profile-admin-badge">
                <i className="fa-solid fa-shield-halved"></i> Admin
              </span>
            )}
          </div>
          <button className="btn btn--outline profile-logout" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Sair
          </button>
        </div>

        <div className="profile-stats">
          <div className="profile-stat">
            <i className="fa-solid fa-map-location-dot"></i>
            <strong>12</strong>
            <span>Lugares visitados</span>
          </div>
          <div className="profile-stat">
            <i className="fa-solid fa-star"></i>
            <strong>4</strong>
            <span>Avaliações feitas</span>
          </div>
          <div className="profile-stat">
            <i className="fa-solid fa-heart"></i>
            <strong>5</strong>
            <span>Favoritos salvos</span>
          </div>
          <div className="profile-stat">
            <i className="fa-solid fa-fire"></i>
            <strong>3</strong>
            <span>Semanas seguidas</span>
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Histórico recente</h2>
          <p className="section-subtitle">Lugares que você avaliou</p>
          <div className="profile-history">
            {MOCK_HISTORY.map(item => (
              <div key={item.id} className="history-item">
                <div className="history-item__left">
                  <span className={`badge ${BADGE_COLOR[item.category] || 'badge--blue'}`}>
                    {item.category}
                  </span>
                  <span className="history-item__name">{item.name}</span>
                </div>
                <div className="history-item__right">
                  <span className="stars">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</span>
                  <span className="history-item__date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Preferências</h2>
          <p className="section-subtitle">Com base no seu histórico, você curte mais</p>
          <div className="profile-prefs">
            <div className="pref-tag">
              <i className="fa-solid fa-martini-glass"></i> Bares & Pubs
            </div>
            <div className="pref-tag">
              <i className="fa-solid fa-mug-hot"></i> Cafés
            </div>
            <div className="pref-tag">
              <i className="fa-solid fa-fire"></i> Comemorações
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
