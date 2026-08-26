import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

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
              background: isHi ? 'rgba(255,214,10,0.18)' : 'var(--bg-tertiary)',
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

export default function July17LeetcodeTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Нарешиваем LeetCode: разбор занятия</h1>
        <p className="theory-subtitle">Треки: Все треки</p>
        <p className="theory-date">17 июля 2026</p>
        <p>
          На занятии мы разобрали четыре классические алгоритмические задачи с LeetCode — из тех, что регулярно
          встречаются на алгоритмических секциях собеседований. Для каждой задачи: перевод условия, разбор решения
          на Python, оценка по времени и памяти (Big O) и визуализация того, как алгоритм работает пошагово.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Single Number — единственное число</h2>
        <ProblemHeader num={1} title="Single Number" url="https://leetcode.com/problems/single-number/" difficulty="Легко" />
        <Term name="Условие (перевод)">
          Дан непустой массив целых чисел <code>nums</code>, в котором каждый элемент встречается дважды, кроме
          одного. Найдите это единственное число. Решение должно работать за линейное время и использовать только
          константный объём дополнительной памяти.
        </Term>
        <TheoryCode language="python" code={`class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for num in nums:
            result ^= num
        return result`} />
        <P n={1}>
          Решение построено на побитовой операции <strong>XOR</strong> (исключающее ИЛИ, в Python — оператор{' '}
          <code>^</code>). У XOR есть три ключевых свойства, на которых всё держится:
        </P>
        <TheoryTable
          headers={['Свойство', 'Формула', 'Смысл']}
          rows={[
            ['XOR числа с собой', 'a ^ a = 0', 'два одинаковых числа взаимно уничтожаются'],
            ['XOR с нулём', 'a ^ 0 = a', 'ноль не влияет на результат — с него удобно начинать'],
            ['Коммутативность и ассоциативность', 'порядок операндов не важен', 'можно применять XOR ко всем числам подряд, в любом порядке'],
          ]}
        />
        <P n={2}>
          Из этих свойств следует главный трюк: если применить XOR ко <strong>всем</strong> числам массива подряд,
          все пары одинаковых чисел взаимно «сократятся» до нуля (по свойству a^a=0), а в конце останется только
          то единственное число, у которого не было пары — потому что XOR с нулём его не меняет (a^0=a).
        </P>
        <Fig caption="Пошаговое применение XOR к [4, 1, 2, 1, 2]: пары 1 и 2 взаимно гасятся, остаётся 4.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'monospace', fontSize: 14 }}>
            <div><span style={{ color: 'var(--text-tertiary)' }}>исходный массив:</span> <ArrayCells values={[4, 1, 2, 1, 2]} highlight={[]} /></div>
            <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: 10 }}>
              <div>result = 0</div>
              <div>result = 0 ^ 4 = <span style={{ color: 'var(--accent-lime)' }}>4</span></div>
              <div>result = 4 ^ 1 = <span style={{ color: 'var(--accent-lime)' }}>5</span></div>
              <div>result = 5 ^ 2 = <span style={{ color: 'var(--accent-lime)' }}>7</span></div>
              <div>result = 7 ^ 1 = <span style={{ color: 'var(--accent-lime)' }}>6</span> <span style={{ color: 'var(--text-tertiary)' }}>// первая двойка 1 «сократилась»</span></div>
              <div>result = 6 ^ 2 = <span style={{ color: 'var(--accent-lime)' }}>4</span> <span style={{ color: 'var(--text-tertiary)' }}>// вторая двойка 2 «сократилась»</span></div>
            </div>
            <div style={{ borderTop: '1px solid var(--accent-lime)', paddingTop: 10, color: 'var(--accent-lime)', fontWeight: 700 }}>
              Итог: result = 4 — это и есть единственное число без пары
            </div>
          </div>
        </Fig>
        <TheoryExample title="Big O">
          Время — O(n): один проход по массиву. Память — O(1): используется только одна переменная{' '}
          <code>result</code>, независимо от размера массива. Именно это и требовалось условием задачи.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Two Sum — сумма двух чисел</h2>
        <ProblemHeader num={2} title="Two Sum" url="https://leetcode.com/problems/two-sum/" difficulty="Легко" />
        <Term name="Условие (перевод)">
          Дан массив целых чисел <code>nums</code> и целое число <code>target</code>. Верните индексы двух чисел,
          сумма которых равна <code>target</code>. Можно считать, что для каждого входа есть ровно одно решение, и
          один и тот же элемент нельзя использовать дважды. Ответ можно вернуть в любом порядке.
        </Term>
        <P n={3}>
          Разберём два решения — через хеш-таблицу (быстрое) и через два указателя (требует предварительной
          сортировки).
        </P>
        <TheoryCode language="python" code={`# Решение 1: хеш-таблица (словарь)
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}  # значение -> индекс
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`} />
        <Fig caption="Хеш-таблица: для каждого числа проверяем, встречалось ли ранее дополняющее его до target.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'monospace', fontSize: 13.5 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>nums = [2, 7, 11, 15], target = 9</div>
            <div>i=0: num=2, complement=7, 7 не в seen → seen = {'{2: 0}'}</div>
            <div>i=1: num=7, complement=2, <span style={{ color: 'var(--accent-lime)' }}>2 есть в seen!</span> → вернуть [0, 1]</div>
          </div>
        </Fig>
        <TheoryCode language="python" code={`# Решение 2: два указателя (нужен отсортированный массив с исходными индексами)
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        indexed = sorted(enumerate(nums), key=lambda pair: pair[1])
        left, right = 0, len(indexed) - 1
        while left < right:
            s = indexed[left][1] + indexed[right][1]
            if s == target:
                return [indexed[left][0], indexed[right][0]]
            elif s < target:
                left += 1
            else:
                right -= 1
        return []`} />
        <Fig caption="Два указателя на отсортированном массиве: сумма меньше target — двигаем левый; больше — двигаем правый.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'monospace', fontSize: 13.5 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>отсортировано по значению: [2, 7, 11, 15], target = 9</div>
            <div>left=2 (индекс 0), right=15 (индекс 3): сумма 17 &gt; 9 → сдвигаем right влево</div>
            <div>left=2 (индекс 0), right=11 (индекс 2): сумма 13 &gt; 9 → сдвигаем right влево</div>
            <div>left=2 (индекс 0), right=7 (индекс 1): сумма <span style={{ color: 'var(--accent-lime)' }}>9 == target!</span> → вернуть [0, 1]</div>
          </div>
        </Fig>
        <TheoryTable
          headers={['Решение', 'Время', 'Память', 'Комментарий']}
          rows={[
            ['Хеш-таблица', 'O(n)', 'O(n)', 'один проход, но словарь хранит до n элементов'],
            ['Два указателя', 'O(n log n)', 'O(n)', 'время «съедает» сортировка; сама пара находится за O(n), но нужно хранить исходные индексы'],
          ]}
        />
        <TheoryExample title="Какое решение выбрать">
          Хеш-таблица асимптотически быстрее (O(n) против O(n log n) из-за сортировки), поэтому на собеседовании
          обычно ожидают именно её. Два указателя чаще применяют, когда массив <em>уже отсортирован</em> — тогда
          сортировку делать не нужно, и решение становится O(n) по времени при O(1) дополнительной памяти.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. 4Sum — сумма четырёх чисел</h2>
        <ProblemHeader num={3} title="4Sum" url="https://leetcode.com/problems/4sum/" difficulty="Средне" />
        <Term name="Условие (перевод)">
          Дан массив <code>nums</code> из n целых чисел. Верните массив всех уникальных четвёрок{' '}
          <code>[nums[a], nums[b], nums[c], nums[d]]</code> таких, что 0 ≤ a, b, c, d &lt; n, индексы a, b, c, d
          попарно различны, и <code>nums[a] + nums[b] + nums[c] + nums[d] == target</code>. Ответ можно вернуть в
          любом порядке.
        </Term>
        <P n={4}>
          Пример: <code>nums = [1, 0, -1, 0, -2, 2]</code>, <code>target = 0</code> → ответ{' '}
          <code>[[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]</code>.
        </P>
        <P n={5}>
          Наивное решение — перебрать все четвёрки индексов, это O(n⁴). Оптимальное решение: сначала{' '}
          <strong>отсортировать</strong> массив, зафиксировать два внешних числа двумя вложенными циклами, а
          оставшуюся пару искать <strong>двумя указателями</strong> — тот же приём, что и в Two Sum, только
          примененный внутри двойного цикла. Сортировка также даёт возможность пропускать повторяющиеся значения,
          чтобы не собирать дубликаты четвёрок.
        </P>
        <TheoryCode language="python" code={`class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        result = []

        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]:
                continue  # пропускаем дубликат первого числа
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue  # пропускаем дубликат второго числа

                left, right = j + 1, n - 1
                while left < right:
                    total = nums[i] + nums[j] + nums[left] + nums[right]
                    if total == target:
                        result.append([nums[i], nums[j], nums[left], nums[right]])
                        while left < right and nums[left] == nums[left + 1]:
                            left += 1
                        while left < right and nums[right] == nums[right - 1]:
                            right -= 1
                        left += 1
                        right -= 1
                    elif total < target:
                        left += 1
                    else:
                        right -= 1
        return result`} />
        <Fig caption="Два вложенных цикла фиксируют i и j, а left/right сходятся друг к другу внутри оставшегося отрезка.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'monospace', fontSize: 13 }}>
            <div style={{ color: 'var(--text-tertiary)' }}>отсортировано: [-2, -1, 0, 0, 1, 2], target = 0</div>
            <ArrayCells values={[-2, -1, 0, 0, 1, 2]} highlight={[0, 1, 4, 5]} labels={{ 0: 'i', 1: 'j', 4: 'left', 5: 'right' }} />
            <div>сумма = -2 + -1 + 1 + 2 = 0 → найдена четвёрка [-2, -1, 1, 2]</div>
            <div>left и right сдвигаются друг к другу, i и j продолжают перебор дальше</div>
          </div>
        </Fig>
        <TheoryTable
          headers={['Решение', 'Время', 'Память', 'Комментарий']}
          rows={[
            ['Наивный перебор (4 цикла)', 'O(n⁴)', 'O(1)', 'слишком медленно уже на n ~ 200'],
            ['Сортировка + 2 цикла + 2 указателя', 'O(n³)', 'O(log n) или O(n)', 'зависит от алгоритма сортировки; это и есть оптимальное решение'],
          ]}
        />
        <TheoryExample title="Почему именно O(n³)">
          Сортировка занимает O(n log n), два внешних цикла дают O(n²) комбинаций пар (i, j), а для каждой такой
          пары два указателя проходят оставшуюся часть массива за O(n). Итого O(n²) · O(n) = O(n³) — сортировка на
          этом фоне пренебрежимо мала.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Group Anagrams — группировка анаграмм</h2>
        <ProblemHeader num={4} title="Group Anagrams" url="https://leetcode.com/problems/group-anagrams/" difficulty="Средне" />
        <Term name="Условие (перевод)">
          Дан массив строк <code>strs</code>. Сгруппируйте анаграммы вместе. Ответ можно вернуть в любом порядке.
        </Term>
        <P n={6}>
          Пример: <code>strs = ["eat","tea","tan","ate","nat","bat"]</code> → ответ{' '}
          <code>[["bat"],["nat","tan"],["ate","eat","tea"]]</code>.
        </P>
        <Term name="Анаграмма">
          слово, составленное из тех же букв, что и другое слово, но в другом порядке. «eat», «tea» и «ate» —
          анаграммы друг друга, потому что у всех одинаковый набор букв: e, a, t.
        </Term>
        <P n={7}>
          Ключевая идея: у анаграмм всегда одинаковый отсортированный набор букв. Значит, можно использовать{' '}
          <strong>отсортированную строку как ключ</strong> в словаре — все анаграммы «схлопнутся» в один и тот же
          ключ и попадут в одну группу.
        </P>
        <TheoryCode language="python" code={`# Решение 1: ключ — отсортированная строка
from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = defaultdict(list)
        for s in strs:
            key = ''.join(sorted(s))  # "eat" -> "aet"
            groups[key].append(s)
        return list(groups.values())`} />
        <Fig caption="Отсортированная строка как ключ словаря: все анаграммы попадают в одну группу.">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'monospace', fontSize: 13.5 }}>
            <div>"eat" → sorted → "aet"</div>
            <div>"tea" → sorted → "aet" <span style={{ color: 'var(--text-tertiary)' }}>(тот же ключ)</span></div>
            <div>"tan" → sorted → "ant"</div>
            <div>"ate" → sorted → "aet" <span style={{ color: 'var(--text-tertiary)' }}>(тот же ключ)</span></div>
            <div>"nat" → sorted → "ant" <span style={{ color: 'var(--text-tertiary)' }}>(тот же ключ)</span></div>
            <div>"bat" → sorted → "abt"</div>
            <div style={{ borderTop: '1px solid var(--accent-lime)', paddingTop: 8, marginTop: 4, color: 'var(--accent-lime)' }}>
              группы: {'{'}"aet": [eat,tea,ate], "ant": [tan,nat], "abt": [bat]{'}'}
            </div>
          </div>
        </Fig>
        <TheoryCode language="python" code={`# Решение 2: ключ — счётчик букв (без сортировки строки)
from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = defaultdict(list)
        for s in strs:
            count = [0] * 26
            for ch in s:
                count[ord(ch) - ord('a')] += 1
            groups[tuple(count)].append(s)  # кортеж чисел как ключ
        return list(groups.values())`} />
        <TheoryTable
          headers={['Решение', 'Время', 'Память', 'Комментарий']}
          rows={[
            ['Ключ — отсортированная строка', 'O(n · k log k)', 'O(n · k)', 'n строк, k — средняя длина строки; сортировка каждой строки'],
            ['Ключ — счётчик букв (массив из 26)', 'O(n · k)', 'O(n · k)', 'быстрее: подсчёт букв за O(k) вместо сортировки за O(k log k)'],
          ]}
        />
        <TheoryExample title="Когда какое решение лучше">
          При коротких строках разница почти не заметна. На длинных строках решение со счётчиком букв быстрее,
          потому что подсчёт частот — O(k), а сортировка строки — O(k log k). Оба решения используют словарь
          (хеш-таблицу) как основную структуру данных для группировки.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={8}>
          Сегодня мы закрепили несколько ключевых паттернов алгоритмических задач. <strong>XOR-трюк</strong> в
          Single Number — классический приём для задач «найти уникальный элемент» за O(n) времени и O(1) памяти.{' '}
          <strong>Хеш-таблица</strong> в Two Sum — самый быстрый универсальный способ искать «дополняющее» значение
          за один проход. <strong>Два указателя на отсортированном массиве</strong> — мощный приём, который в 4Sum
          масштабируется вложением в циклы, снижая перебор с O(n⁴) до O(n³). А в Group Anagrams мы увидели, как{' '}
          <strong>выбор правильного ключа для хеш-таблицы</strong> (отсортированная строка или счётчик букв)
          превращает задачу группировки в линейный проход по данным.
        </P>
      </section>
    </div>
  )
}
