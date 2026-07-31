import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

const VIDEO_SRC = 'https://s3.regru.cloud/kirocamp/leetcode31july.mov'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: '#12121e', border: '1px solid #2a2a3a',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 640 }}>{caption}</figcaption>}
    </figure>
  )
}

function Term({ name, children }) {
  return (
    <div style={{ margin: '12px 0', paddingLeft: 14, borderLeft: '2px solid var(--accent-lime)' }}>
      <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>{name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}> — {children}</span>
    </div>
  )
}

function P({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '14px 0', alignItems: 'flex-start' }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%', border: '1.5px solid var(--accent-lime)',
        color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginTop: 2,
      }}>{n}</span>
      <p style={{ margin: 0, flex: 1 }}>{children}</p>
    </div>
  )
}

// Карточка условия задачи со ссылкой на LeetCode
function ProblemHeader({ num, title, url, difficulty }) {
  const diffColor = { 'Легко': '#4ade80', 'Средне': '#facc15', 'Сложно': '#f87171' }[difficulty] || '#94a3b8'
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', margin: '10px 0 18px',
    }}>
      <span style={{
        background: 'var(--accent-lime)', color: '#0a0a14', fontWeight: 800, fontSize: 13,
        padding: '3px 10px', borderRadius: 6,
      }}>Задача {num}</span>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', fontWeight: 700, fontSize: 15 }}>
        {title} ↗
      </a>
      <span style={{ color: diffColor, fontSize: 12.5, fontWeight: 700, border: `1px solid ${diffColor}`, borderRadius: 6, padding: '2px 8px' }}>
        {difficulty}
      </span>
    </div>
  )
}

// Блок ячеек массива с подсветкой активного индекса
function ArrayCells({ values, highlight = [], labels = {} }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {values.map((v, i) => {
        const isHi = highlight.includes(i)
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 8, fontWeight: 700, fontSize: 15,
              background: isHi ? 'rgba(32,190,255,0.18)' : 'var(--bg-tertiary)',
              border: `1.5px solid ${isHi ? 'var(--accent-lime)' : 'var(--border-color)'}`,
              color: isHi ? 'var(--accent-lime)' : 'var(--text-primary)',
            }}>{v}</div>
            <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>{labels[i] ?? i}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function July31LeetcodeTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Нарешиваем LeetCode: разбор занятия</h1>
        <p className="theory-subtitle">Треки: Все треки</p>
        <p className="theory-date">31 июля 2026</p>
        <p>
          Запись встречи 31 июля — разобрали четыре задачи с LeetCode из подборки Top Interview 150:
          динамическое программирование, бинарный поиск, работу с хеш-таблицами и классический паттерн
          «два указателя» на отсортированном массиве. Для каждой — перевод условия, оптимальное решение
          на Python и оценка по времени и памяти (Big O).
        </p>
        <VideoPlayer src={VIDEO_SRC} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Climbing Stairs — подъём по лестнице</h2>
        <ProblemHeader num={1} title="Climbing Stairs" url="https://leetcode.com/problems/climbing-stairs/" difficulty="Легко" />
        <Term name="Условие (перевод)">
          Нужно подняться по лестнице из <code>n</code> ступеней. За один шаг можно подняться на 1 или 2
          ступени. Сколькими различными способами можно подняться на самый верх?
        </Term>
        <P n={1}>
          Пример: при <code>n = 3</code> есть три способа — [1,1,1], [1,2], [2,1]. Обозначим количество
          способов дойти до ступени <code>i</code> как <code>ways(i)</code>. На последний шаг попадаешь либо
          со ступени <code>i-1</code> (шагом на 1), либо со ступени <code>i-2</code> (шагом на 2). Значит:{' '}
          <code>ways(i) = ways(i-1) + ways(i-2)</code> — это классическая последовательность Фибоначчи.
        </P>
        <TheoryCode language="python" code={`class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n

        prev2, prev1 = 1, 2  # ways(1)=1, ways(2)=2
        for _ in range(3, n + 1):
            prev2, prev1 = prev1, prev2 + prev1
        return prev1`} />
        <Fig caption="ways(i) = ways(i-1) + ways(i-2) — храним только два последних значения, без массива и рекурсии.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'monospace', fontSize: 13.5 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>n = 5</div>
            <div>ways(1)=1, ways(2)=2</div>
            <div>ways(3) = ways(2)+ways(1) = 2+1 = <span style={{ color: 'var(--accent-lime)' }}>3</span></div>
            <div>ways(4) = ways(3)+ways(2) = 3+2 = <span style={{ color: 'var(--accent-lime)' }}>5</span></div>
            <div>ways(5) = ways(4)+ways(3) = 5+3 = <span style={{ color: 'var(--accent-lime)' }}>8</span></div>
          </div>
        </Fig>
        <TheoryTable
          headers={['Решение', 'Время', 'Память', 'Комментарий']}
          rows={[
            ['Наивная рекурсия', 'O(2ⁿ)', 'O(n)', 'пересчитывает одни и те же подзадачи заново — экспоненциально медленно'],
            ['DP с массивом', 'O(n)', 'O(n)', 'хранит все промежуточные значения ways(i)'],
            ['DP с двумя переменными', 'O(n)', 'O(1)', 'оптимальное решение — нужны только два предыдущих значения'],
          ]}
        />
        <TheoryExample title="Почему это Фибоначчи">
          Число способов подняться на n ступеней — это в точности (n+1)-е число Фибоначчи. Задача выглядит
          как комбинаторика, а по сути сводится к рекуррентному соотношению, которое можно посчитать за
          линейный проход и константную память.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Sqrt(x) — целочисленный квадратный корень</h2>
        <ProblemHeader num={2} title="Sqrt(x)" url="https://leetcode.com/problems/sqrtx/" difficulty="Легко" />
        <Term name="Условие (перевод)">
          Дано неотрицательное целое число <code>x</code>. Верните квадратный корень из <code>x</code>,
          округлённый вниз до целого. Встроенные функции возведения в степень использовать нельзя —
          например, <code>x ** 0.5</code>.
        </Term>
        <P n={2}>
          Раз возводить в степень нельзя, а перебирать все числа от 1 до x — слишком медленно, применяем{' '}
          <strong>бинарный поиск</strong> по ответу: мы ищем такое наибольшее целое <code>mid</code>, что{' '}
          <code>mid² ≤ x</code>. Ответ находится в диапазоне <code>[0, x]</code>, а функция{' '}
          <code>mid²</code> монотонно растёт — то есть бинарный поиск здесь применим напрямую.
        </P>
        <TheoryCode language="python" code={`class Solution:
    def mySqrt(self, x: int) -> int:
        if x < 2:
            return x

        left, right = 1, x // 2
        while left <= right:
            mid = (left + right) // 2
            if mid * mid == x:
                return mid
            elif mid * mid < x:
                left = mid + 1
            else:
                right = mid - 1
        return right  # right всегда останавливается на наибольшем mid² ≤ x`} />
        <Fig caption="Бинарный поиск для x = 8: сужаем границы, пока не найдём наибольшее mid с mid² ≤ 8.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'monospace', fontSize: 13.5 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>x = 8, left=1, right=4</div>
            <div>mid=2: 2²=4 ≤ 8 → left=3</div>
            <div>mid=3 (left=3,right=4): 3²=9 &gt; 8 → right=2</div>
            <div style={{ borderTop: '1px solid var(--accent-lime)', paddingTop: 8, color: 'var(--accent-lime)' }}>
              left(3) &gt; right(2), цикл закончен → ответ = right = 2
            </div>
          </div>
        </Fig>
        <TheoryTable
          headers={['Решение', 'Время', 'Память', 'Комментарий']}
          rows={[
            ['Линейный перебор от 1 до x', 'O(√x)', 'O(1)', 'работает, но медленнее бинарного поиска на больших x'],
            ['Бинарный поиск', 'O(log x)', 'O(1)', 'оптимальное решение — не использует деление и возведение в степень'],
          ]}
        />
        <TheoryExample title="Границы поиска">
          Верхнюю границу можно смело брать как <code>x // 2</code> при <code>x ≥ 2</code>, потому что
          квадратный корень из x всегда не больше x/2 при x ≥ 2 — это сужает диапазон поиска и не требует
          знания корня заранее.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Word Pattern — соответствие шаблону</h2>
        <ProblemHeader num={3} title="Word Pattern" url="https://leetcode.com/problems/word-pattern/" difficulty="Легко" />
        <Term name="Условие (перевод)">
          Даны строка <code>pattern</code> и строка <code>s</code>. Нужно определить, следует ли{' '}
          <code>s</code> тому же шаблону — то есть существует ли <strong>биекция</strong> (взаимно
          однозначное соответствие) между буквами шаблона и словами строки: каждая буква соответствует
          ровно одному слову, и каждое слово — ровно одной букве.
        </Term>
        <P n={3}>
          Пример: <code>pattern = "abba"</code>, <code>s = "dog cat cat dog"</code> → true, потому что{' '}
          <code>'a' → "dog"</code>, <code>'b' → "cat"</code>, и это соответствие не нарушается ни разу.
        </P>
        <P n={4}>
          Ключевая тонкость — это именно <strong>биекция</strong>, а не просто «буква → слово». Нужно
          проверять соответствие в <strong>обе стороны</strong> одновременно: одна и та же буква не может
          указывать на два разных слова, и одно и то же слово не может соответствовать двум разным буквам.
          Для этого заводим два словаря.
        </P>
        <TheoryCode language="python" code={`class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        words = s.split()
        if len(pattern) != len(words):
            return False

        char_to_word = {}
        word_to_char = {}

        for ch, word in zip(pattern, words):
            if ch in char_to_word and char_to_word[ch] != word:
                return False
            if word in word_to_char and word_to_char[word] != ch:
                return False
            char_to_word[ch] = word
            word_to_char[word] = ch

        return True`} />
        <Fig caption="Два словаря проверяют соответствие в обе стороны: буква→слово и слово→буква.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'monospace', fontSize: 13.5 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>pattern = "abba", s = "dog cat cat dog"</div>
            <div>'a'↔"dog": char_to_word['a']="dog", word_to_char["dog"]='a'</div>
            <div>'b'↔"cat": char_to_word['b']="cat", word_to_char["cat"]='b'</div>
            <div>'b'↔"cat": уже есть, совпадает — ок</div>
            <div>'a'↔"dog": уже есть, совпадает — ок</div>
            <div style={{ borderTop: '1px solid var(--accent-lime)', paddingTop: 8, color: 'var(--accent-lime)' }}>
              все проверки прошли → true
            </div>
          </div>
        </Fig>
        <TheoryTable
          headers={['Решение', 'Время', 'Память', 'Комментарий']}
          rows={[
            ['Один словарь (буква→слово)', '—', '—', 'не работает: пропускает случай, когда два разных символа указывают на одно и то же слово'],
            ['Два словаря (биекция)', 'O(n)', 'O(n)', 'оптимальное решение — n здесь длина pattern / число слов в s'],
          ]}
        />
        <TheoryExample title="Частая ошибка">
          Если проверять соответствие только «буква → слово» одним словарём, задача с{' '}
          <code>pattern = "abba"</code>, <code>s = "dog dog dog dog"</code> ошибочно пройдёт как true —
          хотя 'a' и 'b' обе указывают на одно и то же слово "dog", что нарушает биекцию. Второй словарь
          именно эту ситуацию и ловит.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. 3Sum — сумма трёх чисел</h2>
        <ProblemHeader num={4} title="3Sum" url="https://leetcode.com/problems/3sum/" difficulty="Средне" />
        <Term name="Условие (перевод)">
          Дан целочисленный массив <code>nums</code>. Верните все триплеты{' '}
          <code>[nums[i], nums[j], nums[k]]</code> такие, что <code>i ≠ j</code>, <code>i ≠ k</code>,{' '}
          <code>j ≠ k</code>, и <code>nums[i] + nums[j] + nums[k] == 0</code>. Итоговый набор триплетов не
          должен содержать дубликатов.
        </Term>
        <P n={5}>
          Пример: <code>nums = [-1,0,1,2,-1,-4]</code> → ответ <code>[[-1,-1,2], [-1,0,1]]</code>.
        </P>
        <P n={6}>
          Это задача Two Sum, но на один уровень сложнее. Наивно — перебрать все тройки индексов за O(n³).
          Оптимальнее: сначала <strong>отсортировать</strong> массив, затем зафиксировать одно число в
          цикле и искать оставшуюся пару <strong>двумя указателями</strong> в оставшейся части массива —
          ровно тот же приём, что и в Two Sum на отсортированном массиве. Сортировка также сразу даёт
          способ пропускать дубликаты, не собирая их вручную в set.
        </P>
        <TheoryCode language="python" code={`class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        result = []

        for i in range(n - 2):
            if nums[i] > 0:
                break  # дальше все числа положительные — тройка с суммой 0 невозможна
            if i > 0 and nums[i] == nums[i - 1]:
                continue  # пропускаем дубликат первого числа

            left, right = i + 1, n - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total == 0:
                    result.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif total < 0:
                    left += 1
                else:
                    right -= 1

        return result`} />
        <Fig caption="После сортировки фиксируем nums[i], а left/right сходятся друг к другу, ищя пару с нужной суммой.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'monospace', fontSize: 13 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>отсортировано: [-4, -1, -1, 0, 1, 2]</div>
            <ArrayCells values={[-4, -1, -1, 0, 1, 2]} highlight={[1, 2, 5]} labels={{ 1: 'i', 2: 'left', 5: 'right' }} />
            <div>i=-1, left=-1, right=2: сумма = -1-1+2 = 0 → найден триплет [-1,-1,2]</div>
            <div>сдвигаем left и right дальше друг к другу, i переходит к следующему уникальному значению</div>
          </div>
        </Fig>
        <TheoryTable
          headers={['Решение', 'Время', 'Память', 'Комментарий']}
          rows={[
            ['Наивный перебор (3 цикла)', 'O(n³)', 'O(1)', 'слишком медленно уже на n ~ 1000'],
            ['Сортировка + хеш-множество', 'O(n²)', 'O(n)', 'рабочий вариант, но требует ручной дедупликации триплетов'],
            ['Сортировка + два указателя', 'O(n²)', 'O(log n) или O(n)', 'зависит от сортировки; это и есть оптимальное решение — дубликаты пропускаются естественным образом'],
          ]}
        />
        <TheoryExample title="Почему можно прервать цикл по break">
          Массив отсортирован, поэтому как только <code>nums[i] &gt; 0</code>, все оставшиеся числа справа
          тоже положительны — их сумма с любыми двумя числами не может быть равна нулю. Это позволяет
          выйти из внешнего цикла раньше, не дожидаясь его формального конца.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={7}>
          Сегодня разобрали четыре паттерна, которые встречаются на алгоритмических секциях
          собеседований постоянно. <strong>Climbing Stairs</strong> — динамическое программирование
          сводится к последовательности Фибоначчи и считается за O(n) времени и O(1) памяти двумя
          переменными вместо массива. <strong>Sqrt(x)</strong> — классический пример{' '}
          <strong>бинарного поиска по ответу</strong>, когда искомое значение ищется не в массиве, а в
          диапазоне возможных чисел. <strong>Word Pattern</strong> показал, что проверка{' '}
          <strong>биекции</strong> требует двух словарей — по одному на каждое направление соответствия. А{' '}
          <strong>3Sum</strong> расширил приём «сортировка + два указателя» из Two Sum на задачу с тремя
          числами, снизив сложность с O(n³) до O(n²).
        </P>
      </section>
    </div>
  )
}
