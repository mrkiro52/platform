import { TheoryExample, TheoryTable } from './components/TheoryTable'

export default function Day27LearningTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Как учиться программированию</h1>
        <p>
          Программирование — профессия, в которой учиться приходится постоянно. Разберёмся, какие способы учиться действительно работают, как не застрять в бесконечных курсах и как выстроить устойчивый режим.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Активное vs Пассивное обучение</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✗ Пассивное: Читать блоги, смотреть видео</li>
          <li className="theory-list-item">✓ Активное: Писать код, делать проекты, объяснять</li>
        </ul>
        <p className="theory-intro" style={{ marginTop: '12px' }}>
          Статистика: помнишь 10% прочитанного, 50% услышанного, 90% сделанного!
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Метод Фейнмана</h2>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li>Выбери концепцию</li>
          <li>Объясни её простыми словами (как ребёнку)</li>
          <li>Определи пробелы в понимании</li>
          <li>Упрости и переделай объяснение</li>
        </ol>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ресурсы для обучения</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Обучение:</strong> CS50, Roadmap.sh, Udemy</li>
          <li className="theory-list-item"><strong>Практика:</strong> LeetCode, Codeforces, HackerRank</li>
          <li className="theory-list-item"><strong>Проекты:</strong> GitHub, собственные идеи</li>
          <li className="theory-list-item"><strong>Сообщество:</strong> Reddit r/learnprogramming, Discord</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как учиться эффективно</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✓ Уделяй 1-2 часа ежедневно, а не 8 часов в выходной</li>
          <li className="theory-list-item">✓ Проектное обучение: делай реальные проекты</li>
          <li className="theory-list-item">✓ Читай чужой код (GitHub, документация)</li>
          <li className="theory-list-item">✓ Объясняй другим (лучший способ учиться)</li>
          <li className="theory-list-item">✗ Не зубри синтаксис (Google это за тебя)</li>
          <li className="theory-list-item">✗ Не начинай со сложного</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Публичное портфолио</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>GitHub:</strong> README, примеры кода, проекты</li>
          <li className="theory-list-item"><strong>LinkedIn:</strong> Опыт, навыки, рекомендации</li>
          <li className="theory-list-item"><strong>Личный сайт:</strong> Portfolio с примерами работ</li>
          <li className="theory-list-item"><strong>Блог:</strong> Статьи о том что учишь</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как ставить цели (OKR)</h2>
        <TheoryExample title="Пример OKR">
          <p><strong>Objective:</strong> Научиться веб-разработке</p>
          <p><strong>Key Results:</strong></p>
          <ul style={{ marginTop: '8px' }}>
            <li>1. Завершить 5 проектов на React</li>
            <li>2. Сделать 30 задач на LeetCode (medium)</li>
            <li>3. Прочитать 2 книги по вебу</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как работает память: что реально помогает запоминать</h2>
        <p>
          Большинство привычных способов учиться — перечитывать, выделять маркером, пересматривать видео —
          создают ощущение понимания, но плохо закрепляют знания. Исследования когнитивной психологии выделяют
          несколько приёмов, которые работают заметно лучше.
        </p>
        <TheoryTable
          headers={['Приём', 'Суть', 'Как применить в программировании']}
          rows={[
            ['Активное вспоминание (active recall)', 'Достать знание из памяти без подсказки', 'Закрой конспект и напиши алгоритм или объясни термин своими словами'],
            ['Интервальные повторения', 'Повторять через растущие интервалы: 1 день, 3 дня, неделя, месяц', 'Карточки в Anki с вопросами вида «что делает git rebase?»'],
            ['Чередование тем', 'Смешивать типы задач, а не решать 20 одинаковых подряд', 'Чередуй задачи на стек, хэш-таблицы и два указателя'],
            ['Проговаривание (метод Фейнмана)', 'Объяснить так, чтобы понял новичок', 'Напиши пост, комментарий или README, объясняющий тему'],
            ['Сон и перерывы', 'Память закрепляется во время отдыха', 'Не учись по 8 часов без пауз; помидорные циклы по 25–50 минут'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Осознанная практика вместо «просто кодить»</h2>
        <p>
          Количество часов само по себе не делает сильнее. Рост даёт <strong>осознанная практика</strong>: задачи
          чуть сложнее текущего уровня, понятная цель и быстрая обратная связь.
        </p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Зона ближайшего развития.</strong> Если задача решается за 5 минут — она слишком лёгкая. Если час не понимаешь, с чего начать, — слишком сложная. Ищи середину.</li>
          <li className="theory-list-item"><strong>Обратная связь.</strong> Тесты, код-ревью, сравнение с эталонным решением, вопросы ИИ-ассистенту «что можно улучшить в этом коде?».</li>
          <li className="theory-list-item"><strong>Разбор после решения.</strong> Решил задачу — посмотри чужие решения и найди хотя бы одну новую идею.</li>
          <li className="theory-list-item"><strong>Повторное решение.</strong> Через неделю реши ту же задачу с нуля, не подглядывая. Если не получается — тема не усвоена.</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как выбраться из «ада туториалов»</h2>
        <p>
          Ад туториалов — состояние, когда человек посмотрел десятки курсов, но не может написать проект без
          видео. Причина в том, что при повторении за автором мозг не принимает решений. Выход — как можно
          раньше начинать делать своё.
        </p>
        <ol className="theory-steps">
          <li>Посмотри урок один раз, не повторяя код.</li>
          <li>Закрой видео и напиши то же самое сам. Застрял — смотри документацию, а не видео.</li>
          <li>Измени проект: добавь функцию, которой не было в уроке.</li>
          <li>Сделай похожий проект на другую тему без урока вообще.</li>
        </ol>
        <p>
          Правило 30/70: не больше 30% времени на изучение теории и видео, не меньше 70% — на написание кода.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Учиться с ИИ, а не вместо себя</h2>
        <p>
          ИИ-ассистенты ускоряют обучение, если использовать их как наставника, а не как генератор готовых
          ответов. Если ИИ решил задачу за тебя, навык не появился.
        </p>
        <TheoryTable
          headers={['Полезно', 'Вредно для обучения']}
          rows={[
            ['«Объясни, почему этот код падает, но не исправляй его»', '«Напиши решение задачи»'],
            ['«Дай подсказку к задаче, без решения»', 'Копировать код, не понимая каждую строку'],
            ['«Проверь моё решение и укажи на слабые места»', 'Не пробовать решить самому хотя бы 20–30 минут'],
            ['«Задай мне 5 вопросов по теме, чтобы проверить понимание»', 'Пропускать документацию, потому что «ИИ знает»'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как читать документацию</h2>
        <p>
          Документация — главный источник правды о технологии. Навык быстро находить в ней нужное отличает
          разработчика, который сам решает задачи, от того, кто ждёт подсказки.
        </p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Начинай с Getting Started / Tutorial</strong> — он даёт общую картину за 30–60 минут.</li>
          <li className="theory-list-item"><strong>Справочник (API Reference) не читают подряд</strong> — по нему ищут конкретную функцию.</li>
          <li className="theory-list-item"><strong>Запускай примеры из документации</strong> и меняй их — так быстрее понимаешь поведение.</li>
          <li className="theory-list-item"><strong>Смотри на версию.</strong> Ответ со Stack Overflow 2016 года может относиться к устаревшей версии библиотеки.</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">План недели и как не выгореть</h2>
        <p>
          Регулярность важнее интенсивности: 1–2 часа каждый день дают больше, чем 10 часов в выходные раз в две
          недели. Пример устойчивого расписания на неделю:
        </p>
        <TheoryTable
          headers={['День', 'Фокус']}
          rows={[
            ['Пн, Ср, Пт', 'Новая тема: конспект + практика по ней'],
            ['Вт, Чт', 'Алгоритмические задачи (2–3 штуки) и повторение прошлых тем'],
            ['Сб', 'Пет-проект: применить пройденное в своём коде'],
            ['Вс', 'Отдых или лёгкое повторение карточек'],
          ]}
        />
        <p>
          Плато — нормальная часть обучения: в какой-то момент кажется, что прогресса нет. Обычно в это время
          знания укладываются. Помогают смена формата (проект вместо теории), задачи попроще для уверенности и
          сравнение себя с собой месяц назад, а не с другими.
        </p>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Обучение — это путь, не пункт назначения! </p>
      </section>
    </div>
  )
}
