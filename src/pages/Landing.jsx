import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../landing.css'

// Лендинг для гостей: одна секция в стиле платформы — шапка с логотипом и
// кнопкой «Войти», заголовок, описание и кнопки входа и регистрации.

const FEATURES = [
  'Конспекты и материалы',
  'Тренажёры',
  'Знакомства',
  'Полезные ссылки',
  'Полные ликбезы',
  'KIRO IT CAMP',
]

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => document.body.classList.remove('landing-page')
  }, [])

  return (
    <div className="lp">
      <header className="lp-nav">
        <span className="lp-logo">KIRO PLATFORM</span>
        <button type="button" className="btn-primary lp-nav-btn" onClick={() => navigate('/login')}>Войти</button>
      </header>

      <main className="lp-hero">
        <div className="lp-glow" aria-hidden="true" />
        <div className="lp-hero-in">
          <h1 className="lp-title">Платформа комьюнити <span>KIRO TEAM</span></h1>
          <p className="lp-sub">
            Материалы для изучения, тренажёры для тренировок, сервис знакомств, куча полезных ссылок
            и полные ликбезы по темам IT и не только. А ещё здесь проходит наш онлайн{' '}
            <span className="lp-nowrap">IT-лагерь <b>KIRO IT CAMP</b></span>.
          </p>
          <ul className="lp-features">
            {FEATURES.map(f => <li key={f}>{f}</li>)}
          </ul>
          <div className="lp-cta">
            <button type="button" className="btn-primary lp-cta-btn" onClick={() => navigate('/login')}>Войти</button>
            <button type="button" className="lp-cta-btn lp-cta-btn--ghost" onClick={() => navigate('/register')}>Зарегистрироваться</button>
          </div>
        </div>
      </main>
    </div>
  )
}
