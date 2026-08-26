import MultiPartVideo, { LEETCODE_ONE_PARTS } from '../components/MultiPartVideo'

const LinkCard = ({ href, title, desc, accent }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'block',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 12,
      padding: 'clamp(16px, 3vw, 24px)',
      textDecoration: 'none',
      transition: 'border-color 0.15s, transform 0.15s',
      marginBottom: 16,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div style={{ color: accent, fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
      </div>
      <span style={{ color: accent, fontSize: 20, flexShrink: 0 }}>→</span>
    </div>
  </a>
)

// Блок кода Python с подсветкой комментариев (# ...)
const Code = ({ code }) => {
  const lines = code.split('\n')
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">python</div>
      <pre className="theory-code"><code>
        {lines.map((line, i) => {
          const idx = line.indexOf('#')
          if (idx === -1) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
          const before = line.slice(0, idx)
          const sq = (before.match(/'/g) || []).length
          const dq = (before.match(/"/g) || []).length
          if (sq % 2 !== 0 || dq % 2 !== 0) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
          return (
            <span key={i}>
              <span style={{ color: 'var(--text-primary)' }}>{before}</span>
              <span style={{ color: '#6b7280' }}>{line.slice(idx)}</span>
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          )
        })}
      </code></pre>
    </div>
  )
}

// Карточка «задача + решение»
function Problem({ n, title, href, children }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12,
      padding: 'clamp(16px, 3vw, 24px)', marginBottom: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,214,10,0.15)',
          border: '1px solid var(--accent-lime)', color: 'var(--accent-lime)', fontWeight: 700, fontSize: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{n}</span>
        <h3 style={{ color: 'var(--text-primary)', fontSize: 'clamp(16px, 2.6vw, 19px)', fontWeight: 700, margin: 0 }}>{title}</h3>
        <a href={href} target="_blank" rel="noopener noreferrer" style={{
          marginLeft: 'auto', color: '#60a5fa', fontSize: 13, textDecoration: 'none', flexShrink: 0,
        }}>Открыть на CodeRun →</a>
      </div>
      {children}
    </div>
  )
}

const Label = ({ children }) => (
  <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', margin: '14px 0 8px' }}>{children}</div>
)

// Блок с альтернативным (студенческим) решением — визуально отделён от основного разбора
function AltSolution({ children }) {
  return (
    <div style={{
      marginTop: 18, paddingTop: 16, borderTop: '1px dashed var(--border-color)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 16 }}>🙋</span>
        <span style={{ color: '#818cf8', fontWeight: 700, fontSize: 13.5 }}>Решение с занятия</span>
      </div>
      {children}
    </div>
  )
}

export default function July3LeetcodeTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Нарешиваем LeetCode</h1>
        <p className="theory-subtitle">Все треки</p>
        <p className="theory-date">3 июля 2026</p>
        <p>
          Сегодня практикуем алгоритмическую секцию технических собеседований — ту самую, которую спрашивают
          в БигТехе. Будем разбирать классические задачи вместе на созвоне в 20:00.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2 theory-heading-2--centered">Видео-лекция: разбор задач (4 части)</h2>
        <MultiPartVideo parts={LEETCODE_ONE_PARTS} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что нужно сделать перед занятием</h2>
        <p className="theory-text" style={{ marginBottom: 20 }}>
          Заведи аккаунты на двух платформах — они понадобятся нам сегодня и в дальнейшем для тренировки
          алгоритмических задач:
        </p>

        <LinkCard
          href="https://leetcode.com"
          title="LeetCode"
          desc="Главная международная площадка с задачами уровня технических собеседований в BigTech. Зарегистрируйся и будь готов(а) решать вместе с нами."
          accent="var(--accent-lime)"
        />

        <LinkCard
          href="https://coderun.yandex.ru/selections/algorithm-training-september-2025"
          title="Yandex CodeRun — Алгоритмический тренинг"
          desc="Платформа Яндекса для тренировки алгоритмов. Тоже потребуется зарегистрироваться заранее."
          accent="#60a5fa"
        />
      </section>

      {/* Разбор задач */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Разбор задач</h2>
        <p className="theory-text" style={{ marginBottom: 20 }}>
          Ниже — 4 задачи, которые разбираем на сегодняшнем занятии, с условием и оптимальным решением на
          Python. Комментарии в коде объясняют каждый шаг.
        </p>

        <Problem n={1} title="Камни и украшения" href="https://coderun.yandex.ru/selections/yandex-interview/problems/rocks-and-jewels">
          <p className="theory-text">
            Даны две строки строчных латинских символов — J и S. Символы, входящие в строку J — «драгоценности»,
            входящие в строку S — «камни». Нужно определить, какое количество символов из S одновременно
            являются «драгоценностями». Проще говоря, нужно проверить, сколько символов из S входит в J.
          </p>
          <p className="theory-text"><strong>Формат ввода:</strong> на двух первых строках — строка J и строка S (0 ≤ |J|, |S| ≤ 100).</p>
          <p className="theory-text"><strong>Формат вывода:</strong> единственное число — количество камней, являющихся драгоценностями.</p>

          <Label>Идея решения</Label>
          <p className="theory-text">
            В лоб можно для каждого символа S перебирать всю строку J — это O(|S| × |J|). Но проверку «символ
            входит в J» можно сделать за O(1), если один раз сложить все символы J в <strong>множество (set)</strong>.
            Тогда весь алгоритм — O(|J| + |S|): одно линейное построение множества и один линейный проход по S.
          </p>

          <Label>Решение</Label>
          <Code code={`def num_jewels_in_stones(J: str, S: str) -> int:
    # Складываем символы J в set — проверка "x in jewels" работает за O(1)
    jewels = set(J)

    # Считаем, сколько символов S встречаются в множестве jewels
    # sum() по генератору True/False: True считается как 1
    return sum(1 for stone in S if stone in jewels)


if __name__ == "__main__":
    J = input()
    S = input()
    print(num_jewels_in_stones(J, S))`} />
          <p className="theory-text">
            <strong>Сложность:</strong> время O(|J| + |S|), память O(|J|) — под множество уникальных символов J.
          </p>

          <AltSolution>
            <p className="theory-text">
              Тоже рабочее решение, но с одним отличием: проверка <code>el in j</code> здесь идёт
              по <strong>строке</strong> j, а не по множеству. Поиск символа в строке в худшем случае — O(|j|),
              поэтому итоговая сложность у этого варианта O(|S| × |J|) — медленнее, чем решение с set выше,
              но при |J|, |S| ≤ 100 (как в условии задачи) разница на практике незаметна.
            </p>
            <Code code={`import sys


def main():
    j = input()
    s = input()

    count = 0
    for el in s:
        # Проверяем, входит ли текущий символ строки s в строку j.
        # "in" для строки — это линейный поиск (сравнение el с каждым символом j),
        # поэтому одна проверка стоит O(|j|), а не O(1), как было бы с set.
        if el in j:
            count += 1  # символ оказался и "драгоценностью", и "камнем" — считаем его

    print(count)


if __name__ == '__main__':
    main()`} />
          </AltSolution>
        </Problem>

        <Problem n={2} title="Анаграммы" href="https://coderun.yandex.ru/selections/yandex-interview/problems/anagrams">
          <p className="theory-text">
            Даны две строки, состоящие из строчных латинских букв. Требуется определить, являются ли эти строки
            анаграммами, то есть отличаются ли они только порядком следования символов.
          </p>
          <p className="theory-text"><strong>Формат ввода:</strong> две строки строчных латинских символов, каждая не длиннее 100 000 символов, разделены переводом строки.</p>
          <p className="theory-text"><strong>Формат вывода:</strong> 1, если строки — анаграммы, иначе 0.</p>

          <Label>Идея решения</Label>
          <p className="theory-text">
            Анаграммы — это строки с одинаковым <strong>набором и количеством</strong> каждого символа. Если длины
            строк разные — сразу «нет». Иначе можно подсчитать частоту каждого символа в обеих строках
            (через <code>Counter</code>) и сравнить получившиеся счётчики. Альтернатива — отсортировать обе
            строки и сравнить (O(n log n)), но подсчёт частот работает быстрее — за O(n).
          </p>

          <Label>Решение</Label>
          <Code code={`from collections import Counter

def is_anagram(s1: str, s2: str) -> int:
    # Разной длины строки анаграммами быть не могут — отсекаем сразу
    if len(s1) != len(s2):
        return 0

    # Counter считает частоту каждого символа: {'a': 2, 'b': 1, ...}
    # Строки — анаграммы тогда и только тогда, когда счётчики совпадают
    return 1 if Counter(s1) == Counter(s2) else 0


if __name__ == "__main__":
    s1 = input()
    s2 = input()
    print(is_anagram(s1, s2))`} />
          <p className="theory-text">
            <strong>Сложность:</strong> время O(n), память O(1) — алфавит фиксирован (26 строчных латинских
            букв), поэтому размер счётчика ограничен константой.
          </p>

          <AltSolution>
            <p className="theory-text">
              Альтернативный, тоже вполне корректный подход: воспользоваться тем, что у анаграмм одинаковый
              набор символов, и просто <strong>отсортировать</strong> обе строки. Если после сортировки строки
              совпали посимвольно — значит, изначально в них были одни и те же буквы в одном и том же
              количестве, просто в разном порядке.
            </p>
            <Code code={`import sys


def main():
    s1 = input()
    s2 = input()

    # sorted() возвращает список символов строки, отсортированный по алфавиту.
    # У анаграмм после сортировки получаются одинаковые списки символов.
    s1, s2 = sorted(s1), sorted(s2)

    # Сравниваем отсортированные версии: совпали — анаграммы (1), не совпали — нет (0)
    print(1) if s1 == s2 else print(0)


if __name__ == '__main__':
    main()`} />
            <p className="theory-text">
              <strong>Сложность:</strong> сортировка работает за O(n log n), поэтому этот вариант чуть медленнее
              решения через <code>Counter</code> (O(n)), но зато очень короткий и наглядный — хороший вариант,
              если нужно быстро написать рабочий код на собеседовании.
            </p>
          </AltSolution>
        </Problem>

        <Problem n={3} title="Последовательно идущие единицы" href="https://coderun.yandex.ru/selections/yandex-interview/problems/consecutive-ones">
          <p className="theory-text">
            Дана последовательность, состоящая из цифр 0 и 1. Требуется определить длину наибольшей непрерывной
            подпоследовательности, состоящей только из единиц.
          </p>
          <p className="theory-text"><strong>Формат ввода:</strong> в первой строке n — длина последовательности (1 ≤ n ≤ 10000), далее n строк с одним числом на каждой.</p>
          <p className="theory-text"><strong>Формат вывода:</strong> одно целое число — длина наибольшей непрерывной подпоследовательности единиц.</p>
          <p className="theory-text"><strong>Требование:</strong> алгоритм O(n), не более одного прохода по последовательности.</p>

          <Label>Идея решения</Label>
          <p className="theory-text">
            Классический пример метода <strong>«скользящее окно» / счётчик текущей серии</strong>. Идём по числам
            один раз: пока встречаем единицы — наращиваем счётчик текущей серии подряд идущих единиц; как только
            встретили ноль — сравниваем текущую серию с максимумом и обнуляем счётчик. Так за один проход находим
            ответ, не храня всю последовательность в памяти.
          </p>

          <Label>Решение</Label>
          <Code code={`def max_consecutive_ones(n: int, read_next) -> int:
    best = 0     # лучший результат за всё время
    current = 0  # длина текущей серии подряд идущих единиц

    for _ in range(n):
        x = read_next()
        if x == 1:
            current += 1           # серия продолжается — увеличиваем счётчик
            best = max(best, current)  # обновляем максимум "на лету"
        else:
            current = 0            # серия оборвалась нулём — сбрасываем счётчик

    return best


if __name__ == "__main__":
    n = int(input())
    print(max_consecutive_ones(n, lambda: int(input())))`} />
          <p className="theory-text">
            <strong>Сложность:</strong> время O(n) — ровно один проход, память O(1) — храним только два числа
            (best и current), сам массив целиком в памяти не нужен.
          </p>

          <AltSolution>
            <p className="theory-text">
              Та же самая идея «счётчика текущей серии», только без отдельной функции чтения — <code>input()</code>
              вызывается прямо внутри цикла. Логика полностью эквивалентна разобранному выше решению.
            </p>
            <Code code={`import sys


def main():
    n = int(input())
    cur_len = 0   # длина текущей серии подряд идущих единиц
    max_len = 0   # лучший результат за всё время

    for _ in range(n):
        if int(input()) == 1:
            cur_len += 1                    # единица — серия продолжается
            max_len = max(max_len, cur_len) # сразу же проверяем, не побит ли рекорд
        else:
            cur_len = 0                     # встретили ноль — серия обрывается, сбрасываем счётчик

    print(max_len)

if __name__ == '__main__':
    main()`} />
            <p className="theory-text">
              <strong>Сложность:</strong> те же O(n) по времени и O(1) по памяти — вариант отличается только
              оформлением, а не алгоритмом.
            </p>
          </AltSolution>
        </Problem>

        <Problem n={4} title="Генерация скобочных последовательностей" href="https://coderun.yandex.ru/selections/yandex-interview/problems/generating-bracket-sequences">
          <p className="theory-text">
            Дано целое число n. Требуется вывести все правильные скобочные последовательности длины 2n в
            лексикографическом порядке. Используются только круглые скобки.
          </p>
          <p className="theory-text"><strong>Формат ввода:</strong> целое число n (0 ≤ n ≤ 11).</p>
          <p className="theory-text"><strong>Формат вывода:</strong> все сгенерированные правильные скобочные последовательности, упорядоченные лексикографически.</p>
          <p className="theory-text"><strong>Требование:</strong> O(k) по времени (k — число последовательностей в ответе), O(n) дополнительной памяти.</p>

          <Label>Идея решения</Label>
          <p className="theory-text">
            Строим последовательность посимвольно через <strong>рекурсивный перебор (backtracking)</strong> и
            добавляем скобку, только если это не нарушает правильность:
          </p>
          <ul className="theory-list">
            <li>открывающую «(» можно поставить, пока их использовано меньше n;</li>
            <li>закрывающую «)» можно поставить, только пока открывающих скобок поставлено больше, чем закрывающих (иначе получим «)(» — невалидно).</li>
          </ul>
          <p className="theory-text">
            Такой перебор, если ставить сначала «(», а потом «)», сам по себе генерирует ответы в
            лексикографическом порядке — сортировать отдельно не нужно. Память O(n) уходит на глубину рекурсии
            и буфер строящейся строки (длиной 2n), сама выдача результатов в O(k) не учитывается.
          </p>

          <Label>Решение</Label>
          <Code code={`def generate_parenthesis(n: int) -> list[str]:
    result = []
    buf = []  # буфер текущей строящейся последовательности

    def backtrack(open_count: int, close_count: int):
        # База рекурсии: длина последовательности достигла 2n — записываем ответ
        if len(buf) == 2 * n:
            result.append("".join(buf))
            return

        # Ставим "(" — если ещё не использовали все n открывающих скобок
        if open_count < n:
            buf.append("(")
            backtrack(open_count + 1, close_count)
            buf.pop()  # откатываем выбор (backtracking)

        # Ставим ")" — только если открывающих скобок больше, чем закрывающих
        # (иначе последовательность станет некорректной)
        if close_count < open_count:
            buf.append(")")
            backtrack(open_count, close_count + 1)
            buf.pop()

    backtrack(0, 0)
    return result


if __name__ == "__main__":
    n = int(input())
    for seq in generate_parenthesis(n):
        print(seq)`} />
          <p className="theory-text">
            <strong>Сложность:</strong> время O(k), где k — количество правильных скобочных последовательностей
            (это число Каталана C(n)); дополнительная память (не считая самого вывода) — O(n) на глубину рекурсии.
          </p>

          <AltSolution>
            <p className="theory-text">
              Тот же backtracking, но записанный иначе: вместо буфера-списка с <code>append</code>/<code>pop</code>
              строка <code>current</code> просто передаётся дальше по рекурсии новой копией (<code>current + '('</code>),
              а печать готовой последовательности происходит прямо внутри рекурсивной функции, а не после
              возврата в <code>main</code>.
            </p>
            <Code code={`import sys


def generate(open_count, close_count, current, n):
    # База рекурсии: длина последовательности достигла 2n — она готова, печатаем
    if len(current) == 2 * n:
        print(current)
        return

    # Открывающую скобку можно добавить, пока не исчерпан лимит n
    if open_count < n:
        generate(open_count + 1, close_count, current + '(', n)

    # Закрывающую скобку можно добавить, только если открывающих скобок
    # уже поставлено больше, чем закрывающих — иначе последовательность станет некорректной
    if close_count < open_count:
        generate(open_count, close_count + 1, current + ')', n)


def main():
    n = int(input())
    generate(0, 0, '', n)


if __name__ == '__main__':
    main()`} />
            <p className="theory-text">
              <strong>Нюанс:</strong> здесь <code>current + '('</code> каждый раз создаёт <strong>новую</strong>
              строку (строки в Python неизменяемы), в то время как вариант с буфером-списком и
              <code>append</code>/<code>pop</code> выше переиспользует одну и ту же структуру в памяти. На
              практике при n ≤ 11 (как в условии) разница в производительности незначительна, но на больших n
              подход с буфером и «откатом» (pop) экономичнее по памяти и по числу копирований.
            </p>
          </AltSolution>
        </Problem>
      </section>

      {/* Домашнее задание */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Домашнее задание</h2>
        <p className="theory-text">
          Во вкладке <strong>«Домашние задания»</strong> дня 3 июля лежат ещё 2 задачи с CodeRun — реши их
          самостоятельно, опираясь на подход из сегодняшнего разбора.
        </p>
      </section>
    </div>
  )
}
