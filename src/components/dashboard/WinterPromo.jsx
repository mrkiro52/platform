// Анонс набора на зимний поток — над календарём на дашборде
const FORM_URL = 'https://forms.yandex.ru/u/6af8d1fcc45c078cb8a2faf0/'
const REVIEWS_URL = 'https://t.me/hanil_feedback'

export default function WinterPromo() {
  return (
    <div className="widget dsh-promo">
      <a className="dsh-promo-poster" href={FORM_URL} target="_blank" rel="noopener noreferrer" aria-label="Записаться в KIRO IT Winter Camp ’26">
        <img src="/winter-camp-poster.webp" alt="KIRO IT Winter Camp ’26 — зимний онлайн айти лагерь" loading="eager" />
      </a>
      <div className="dsh-promo-body">
        <h2 className="dsh-promo-title">
          Открыт набор на зимний поток нашего онлайн айти лагеря, старт с 1 декабря, не упусти свой шанс
        </h2>
        <div className="dsh-promo-actions">
          <a className="dsh-promo-btn" href={REVIEWS_URL} target="_blank" rel="noopener noreferrer">Отзывы о лагере</a>
          <a className="dsh-promo-btn is-main" href={FORM_URL} target="_blank" rel="noopener noreferrer">Участвовать</a>
        </div>
      </div>
    </div>
  )
}
