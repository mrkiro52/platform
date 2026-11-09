import { useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => document.body.classList.remove('landing-page')
  }, [])

  return (
    <div className="lp">
      <header className="lp-nav">
        <span className="lp-logo">KIRO PLATFORM</span>
        <Link to="/login" className="btn-primary lp-nav-btn">Войти</Link>
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
            <Link to="/login" className="btn-primary lp-cta-btn">Войти</Link>
            <Link to="/register" className="lp-cta-btn lp-cta-btn--ghost">Зарегистрироваться</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
