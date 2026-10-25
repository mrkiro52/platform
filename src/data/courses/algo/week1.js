// Курс «Алгоритмы: leetcode и алгособесы», неделя 1 — фундамент и линейные структуры.
// Урок: теория паттерна (sections) и задачи с автопроверкой (tasks). Тесты — вызовы функций
// и проверочный код (src/lib/python/checker.js); perf — тест на скорость. После решения
// открывается разбор: эталон, сложность, типичные ошибки (solution).

import { p, h, list, steps, py, shell, note, tip, warn, table, starter } from '../python/blocks'

const lc = (num, slug) => ({ name: `LeetCode ${num}`, url: `https://leetcode.com/problems/${slug}/` })

export default [
  // ═══════════════════════════════════════════════════════════════ День 1
  {
    id: 'a1',
    week: 1,
    day: 1,
    title: 'Массивы и строки, два указателя',
    summary: 'Как оценивать сложность алгоритма (Big O), что важно знать о списках и строках в Python, паттерн «два указателя»: навстречу друг другу и в одном направлении.',
    sections: [
      {
        id: 'bigo',
        title: 'Сложность алгоритма: Big O',
        blocks: [
          p('На алгособесе мало написать работающий код — нужно объяснить, **насколько быстро** он работает. Для этого используют асимптотическую сложность: как растёт число операций при росте размера входа `n`. Константы и мелкие слагаемые отбрасывают: `3n + 5` — это `O(n)`, `n²/2 + n` — это `O(n²)`.'),
          table(['Сложность', 'Название', 'n = 10⁵', 'Пример'], [
            ['`O(1)`', 'константная', '1', 'доступ по индексу, `x in set`'],
            ['`O(log n)`', 'логарифмическая', '~17', 'двоичный поиск'],
            ['`O(n)`', 'линейная', '10⁵', 'один проход по массиву'],
            ['`O(n log n)`', 'линейно-логарифмическая', '~1,7·10⁶', 'сортировка'],
            ['`O(n²)`', 'квадратичная', '10¹⁰', 'два вложенных цикла'],
          ]),
          p('Ориентир для собеседований и [LeetCode](https://leetcode.com/problemset/): за секунду Python делает порядка 10⁷ простых операций. Если `n` до 10⁵, решение `O(n²)` уже не пройдёт по времени — нужно `O(n)` или `O(n log n)`. Ограничения в условии задачи — подсказка, какая сложность ожидается.'),
          p('Отдельно считают **дополнительную память**: `O(1)` — несколько переменных, `O(n)` — новый список или словарь размера входа. Фраза «на месте» (in-place) означает `O(1)` дополнительной памяти.'),
          h('Что сколько стоит в Python'),
          table(['Операция', 'Сложность'], [
            ['`a[i]`, `a[i] = x`, `len(a)`, `a.append(x)`, `a.pop()`', '`O(1)`'],
            ['`a.insert(0, x)`, `a.pop(0)`, `x in a`, `a.index(x)`', '`O(n)`'],
            ['срез `a[i:j]`, копия `a[:]`', '`O(j − i)` — создаётся новый список'],
            ['`sorted(a)`, `a.sort()`', '`O(n log n)`'],
            ['`x in set`, `d[key]`', '`O(1)` в среднем'],
            ['`s1 + s2` для строк', '`O(len)` — строки неизменяемы, создаётся новая'],
          ]),
          warn('Строки в Python неизменяемы. Склейка в цикле `res = res + ch` создаёт новую строку на каждом шаге и даёт `O(n²)`. Собирай части в список и склеивай один раз: `"".join(parts)`.'),
        ],
      },
      {
        id: 'two-pointers',
        title: 'Два указателя навстречу',
        blocks: [
          p('**Два указателя** — два индекса, которые двигаются по массиву по определённому правилу. Вместо перебора всех пар (`O(n²)`) каждый указатель проходит массив не больше одного раза — получаем `O(n)`.'),
          p('Первый вариант — указатели **идут навстречу**: левый с начала, правый с конца, пока не встретятся. Так проверяют палиндромы, разворачивают массивы на месте, ищут пару с заданной суммой в **отсортированном** массиве.'),
          shell(`индексы:   0   1   2   3   4   5
массив:  [ 1,  3,  4,  6,  8, 11 ]   ищем пару с суммой 10
           L                   R     1 + 11 = 12 > 10 → R влево
           L               R         1 + 8  = 9  < 10 → L вправо
               L           R         3 + 8  = 11 > 10 → R влево
               L       R             3 + 6  = 9  < 10 → L вправо
                   L   R             4 + 6  = 10  ✓`, 'Схема'),
          p('Почему это корректно: массив отсортирован. Если сумма больше нужной, правый элемент слишком велик **для любого** левого — его можно выбросить. Если меньше — выбрасываем левый. Каждый шаг отсекает один элемент, поэтому шагов не больше `n`.'),
          py(`def pair_with_sum(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return left, right
        if s < target:
            left += 1
        else:
            right -= 1
    return None

print(pair_with_sum([1, 3, 4, 6, 8, 11], 10))`, '(2, 3)'),
        ],
      },
      {
        id: 'same-direction',
        title: 'Два указателя в одном направлении',
        blocks: [
          p('Второй вариант — **медленный и быстрый** указатели идут в одну сторону. Быстрый читает каждый элемент, медленный указывает, куда записать следующий «хороший» элемент. Так массив фильтруют **на месте**, без новой памяти: удаляют дубликаты, сдвигают нули, убирают нужное значение.'),
          py(`def remove_value(nums, val):
    write = 0                      # куда писать следующий «хороший» элемент
    for read in range(len(nums)):  # read — быстрый указатель
        if nums[read] != val:
            nums[write] = nums[read]
            write += 1
    return write                   # сколько элементов осталось

nums = [3, 2, 2, 3, 4, 3]
k = remove_value(nums, 3)
print(k, nums[:k])`, '3 [2, 2, 4]'),
          h('Как узнать задачу на два указателя'),
          list(
            'массив или строка **отсортированы**, и нужна пара или тройка с условием на сумму;',
            'нужно сравнивать элементы с двух концов (палиндром, разворот);',
            'нужно изменить массив **на месте** за `O(1)` памяти;',
            'наивное решение перебирает все пары за `O(n²)`.',
          ),
          tip('На собеседовании сначала проговори наивное решение и его сложность, потом — идею с указателями. Интервьюер хочет видеть ход мысли, а не только ответ.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a1t1',
        title: 'Reverse String',
        source: lc(344, 'reverse-string'),
        text: 'Дан список символов `s`. Разверни его **на месте**: функция ничего не возвращает, а меняет переданный список. Дополнительная память — `O(1)`. Функции `reversed()` и метод `.reverse()` не используй — реши двумя указателями.',
        starter: starter(`
def reverse_string(s: list[str]) -> None:
    # разверни s на месте
    pass
`),
        examples: [{ call: 's = ["h","e","l","l","o"]; reverse_string(s); s', expected: '["o","l","l","e","h"]' }],
        tests: [
          { forbid: ['reversed', '.reverse'], label: 'Без reversed() и .reverse()' },
          { label: 'reverse_string(list("hello"))', code: `s = list("hello")
ref = s
reverse_string(s)
__kiro_eq("s после reverse_string", s, list("olleh"))
assert s is ref, "Список нужно изменить на месте, а не создавать новый"` },
          { label: 'чётная длина', code: `s = list("Hannah")
reverse_string(s)
__kiro_eq("s", s, list("hannaH"))` },
          { label: 'один символ', code: `s = ["a"]
reverse_string(s)
__kiro_eq("s", s, ["a"])` },
        ],
        solution: {
          text: 'Два указателя навстречу: меняем местами крайние элементы и сдвигаем указатели к центру, пока они не встретятся.',
          code: `
def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            '`s = s[::-1]` — создаёт новый список и меняет только локальную переменную, исходный список не меняется.',
            'Условие `left <= right` вместо `left < right` — лишний обмен элемента с самим собой; не ошибка, но показывает невнимательность.',
          ],
        },
      },
      {
        id: 'a1t2',
        title: 'Valid Palindrome',
        source: lc(125, 'valid-palindrome'),
        text: 'Строка — палиндром, если после удаления всех символов, кроме букв и цифр, и приведения к нижнему регистру она читается одинаково слева направо и справа налево. Верни `True` или `False`. Постарайся решить за `O(1)` дополнительной памяти — двумя указателями, пропуская лишние символы.',
        starter: starter(`
def is_palindrome(s: str) -> bool:
    pass
`),
        examples: [
          { call: 'is_palindrome("A man, a plan, a canal: Panama")', expected: 'True' },
          { call: 'is_palindrome("race a car")', expected: 'False' },
        ],
        tests: [
          { call: 'is_palindrome("A man, a plan, a canal: Panama")', expected: 'True' },
          { call: 'is_palindrome("race a car")', expected: 'False' },
          { call: 'is_palindrome(" ")', expected: 'True' },
          { call: 'is_palindrome("0P")', expected: 'False' },
          { call: 'is_palindrome("No lemon, no melon")', expected: 'True' },
          { call: 'is_palindrome(".,")', expected: 'True' },
        ],
        solution: {
          text: 'Указатели с двух концов. Каждый пропускает символы, которые не являются буквой или цифрой (`str.isalnum()`), затем сравниваем символы в нижнем регистре.',
          code: `
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. Решение через очищенную строку `t == t[::-1]` тоже `O(n)`, но тратит `O(n)` памяти — на собеседовании попросят улучшить.',
          mistakes: [
            'Забыть условие `left < right` во внутренних циклах — указатель выйдет за границы на строке из одних знаков препинания.',
            'Считать цифры «лишними» символами: `"0P"` — не палиндром, цифры нужно сравнивать.',
          ],
        },
      },
      {
        id: 'a1t3',
        title: 'Two Sum II — Input Array Is Sorted',
        source: lc(167, 'two-sum-ii-input-array-is-sorted'),
        text: 'Список `numbers` отсортирован по неубыванию. Найди два числа с суммой `target` и верни их **номера, начиная с 1**: `[i, j]`, где `i < j`. Решение гарантированно одно, один элемент нельзя использовать дважды. Нужно `O(n)` по времени и `O(1)` памяти.',
        starter: starter(`
def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    pass
`),
        examples: [
          { call: 'two_sum_sorted([2, 7, 11, 15], 9)', expected: '[1, 2]' },
          { call: 'two_sum_sorted([-1, 0], -1)', expected: '[1, 2]' },
        ],
        tests: [
          { call: 'two_sum_sorted([2, 7, 11, 15], 9)', expected: '[1, 2]' },
          { call: 'two_sum_sorted([2, 3, 4], 6)', expected: '[1, 3]' },
          { call: 'two_sum_sorted([-1, 0], -1)', expected: '[1, 2]' },
          { call: 'two_sum_sorted([1, 2, 3, 4, 4, 9, 56, 90], 8)', expected: '[4, 5]' },
          { label: 'большой массив: 100 000 чисел', perf: true, code: `nums = list(range(1, 100001))
__kiro_eq("two_sum_sorted(1..100000, 199999)", two_sum_sorted(nums, 199999), [99999, 100000])` },
        ],
        solution: {
          text: 'Классические два указателя навстречу: сумма больше цели — двигаем правый, меньше — левый. Ответ переводим в нумерацию с единицы.',
          code: `
def two_sum_sorted(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]
        if s < target:
            left += 1
        else:
            right -= 1
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Вернуть индексы с нуля — в условии нумерация с 1.',
            'Перебрать все пары двумя циклами — `O(n²)`, большой тест не пройдёт.',
            'Решить словарём, как обычный Two Sum, — работает за `O(n)`, но тратит `O(n)` памяти и не использует сортировку; интервьюер спросит, зачем дан отсортированный массив.',
          ],
        },
      },
      {
        id: 'a1t4',
        title: 'Remove Duplicates from Sorted Array',
        source: lc(26, 'remove-duplicates-from-sorted-array'),
        text: 'Список `nums` отсортирован по неубыванию. Удали повторы **на месте** так, чтобы каждое значение встречалось один раз, и верни `k` — число уникальных элементов. Первые `k` элементов `nums` должны содержать уникальные значения в исходном порядке, что лежит дальше — неважно.',
        starter: starter(`
def remove_duplicates(nums: list[int]) -> int:
    pass
`),
        examples: [{ call: 'nums = [0,0,1,1,1,2,2,3,3,4]; k = remove_duplicates(nums); k, nums[:k]', expected: '(5, [0, 1, 2, 3, 4])' }],
        tests: [
          { label: '[1, 1, 2]', code: `nums = [1, 1, 2]
k = remove_duplicates(nums)
__kiro_eq("k", k, 2)
__kiro_eq("nums[:k]", nums[:k], [1, 2])` },
          { label: '[0,0,1,1,1,2,2,3,3,4]', code: `nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
k = remove_duplicates(nums)
__kiro_eq("k", k, 5)
__kiro_eq("nums[:k]", nums[:k], [0, 1, 2, 3, 4])` },
          { label: 'без повторов', code: `nums = [-3, -1, 5]
k = remove_duplicates(nums)
__kiro_eq("k", k, 3)
__kiro_eq("nums[:k]", nums[:k], [-3, -1, 5])` },
          { label: 'все одинаковые', code: `nums = [7, 7, 7, 7]
k = remove_duplicates(nums)
__kiro_eq("k", k, 1)
__kiro_eq("nums[:k]", nums[:k], [7])` },
        ],
        solution: {
          text: 'Медленный указатель `write` — граница уникальной части. Быстрый `read` идёт по массиву; встретив значение, отличное от последнего записанного, копируем его в `nums[write]`.',
          code: `
def remove_duplicates(nums):
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[write - 1]:
            nums[write] = nums[read]
            write += 1
    return write
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            '`return len(set(nums))` — число верное, но массив не изменён, и первые `k` элементов не уникальны.',
            'Удалять элементы через `nums.pop(i)` в цикле — каждое удаление `O(n)`, итого `O(n²)`, плюс легко пропустить элемент из-за сдвига индексов.',
          ],
        },
      },
      {
        id: 'a1t5',
        title: 'Move Zeroes',
        source: lc(283, 'move-zeroes'),
        text: 'Перемести все нули в конец списка `nums` **на месте**, сохранив порядок ненулевых элементов. Функция ничего не возвращает.',
        starter: starter(`
def move_zeroes(nums: list[int]) -> None:
    pass
`),
        examples: [{ call: 'nums = [0, 1, 0, 3, 12]; move_zeroes(nums); nums', expected: '[1, 3, 12, 0, 0]' }],
        tests: [
          { label: '[0, 1, 0, 3, 12]', code: `nums = [0, 1, 0, 3, 12]
move_zeroes(nums)
__kiro_eq("nums", nums, [1, 3, 12, 0, 0])` },
          { label: '[0]', code: `nums = [0]
move_zeroes(nums)
__kiro_eq("nums", nums, [0])` },
          { label: 'без нулей', code: `nums = [4, 2, 4]
move_zeroes(nums)
__kiro_eq("nums", nums, [4, 2, 4])` },
          { label: 'нули в конце и отрицательные', code: `nums = [-1, 0, 0, 5, 0, -3, 0]
ref = nums
move_zeroes(nums)
__kiro_eq("nums", nums, [-1, 5, -3, 0, 0, 0, 0])
assert nums is ref, "Список нужно изменить на месте"` },
        ],
        solution: {
          text: 'Медленный указатель `write` показывает, куда поставить следующий ненулевой элемент. Быстрый `read` идёт по массиву и при ненулевом элементе меняет его местами с `nums[write]` — нули сами «всплывают» в конец.',
          code: `
def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            '`nums.remove(0)` и `nums.append(0)` в цикле — каждое удаление `O(n)`, итого `O(n²)`.',
            'Сортировка по ключу `x == 0` формально работает (сортировка в Python устойчивая), но это `O(n log n)` — интервьюер ждёт линейное решение.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 2
  {
    id: 'a2',
    week: 1,
    day: 2,
    title: 'Два указателя (продолжение) и префиксные суммы',
    summary: 'Два указателя после сортировки (3Sum), жадное движение указателей (Container With Most Water, Trapping Rain Water), префиксные суммы и их сочетание с хеш-таблицей для подсчёта подмассивов.',
    sections: [
      {
        id: 'sort-pointers',
        title: 'Сортировка + два указателя',
        blocks: [
          p('Если массив не отсортирован, а задача — найти тройку или пару с условием на сумму, часто помогает сначала **отсортировать** его за `O(n log n)`. После этого можно зафиксировать один элемент и для остатка запустить два указателя: тройки ищутся за `O(n²)` вместо `O(n³)`.'),
          steps(
            'Отсортировать массив.',
            'Перебрать первый элемент тройки `i`. Если он совпадает с предыдущим — пропустить, чтобы не получить одинаковые тройки.',
            'Для отрезка правее `i` запустить два указателя навстречу и искать пары с суммой `-nums[i]`.',
            'После найденной пары сдвинуть оба указателя и пропустить повторяющиеся значения.',
          ),
          note('Пропуск дубликатов — главное место, где ошибаются в 3Sum. Тройки должны быть уникальными **по значениям**, поэтому одинаковые числа на одной позиции тройки пропускаем.'),
        ],
      },
      {
        id: 'greedy-pointers',
        title: 'Жадное движение указателей',
        blocks: [
          p('В задачах вроде Container With Most Water указатели двигаются по **жадному** правилу: на каждом шаге отбрасываем ту сторону, которая точно не может дать лучший ответ.'),
          p('Площадь контейнера между линиями `i` и `j` равна `min(h[i], h[j]) · (j − i)`. Если левая линия ниже правой, то для неё любой контейнер с правой границей левее текущей будет **не больше**: ширина меньше, а высота ограничена той же низкой линией. Значит, левую линию можно выбросить — сдвигаем левый указатель.'),
          h('Trapping Rain Water'),
          p('Над столбиком `i` удержится вода высотой `min(max_left, max_right) − h[i]`, где `max_left` — самый высокий столбик левее (включая `i`), `max_right` — правее. Самый понятный способ — заранее посчитать два массива максимумов: `O(n)` времени и памяти. Двумя указателями то же самое делается за `O(1)` памяти.'),
          shell(`высоты:  0 1 0 2 1 0 1 3 2 1 2 1
                      █
              █ ≈ ≈ ≈ █ █ ≈ █
          █ ≈ █ █ ≈ █ █ █ █ █ █     ≈ — вода, всего 6 клеток`, 'Схема'),
        ],
      },
      {
        id: 'prefix',
        title: 'Префиксные суммы',
        blocks: [
          p('**Префиксная сумма** `prefix[i]` — сумма первых `i` элементов. Считается за один проход, а потом сумма любого отрезка `nums[l..r]` получается за `O(1)` как разность двух префиксов:'),
          shell(`nums   =    [3,  1,  4,  1,  5]
prefix = [0,  3,  4,  8,  9, 14]       prefix[i + 1] = prefix[i] + nums[i]

сумма nums[1..3] = prefix[4] − prefix[1] = 9 − 3 = 6   (1 + 4 + 1)`, 'Схема'),
          py(`from itertools import accumulate

nums = [3, 1, 4, 1, 5]
prefix = [0] + list(accumulate(nums))
print(prefix)
l, r = 1, 3
print(prefix[r + 1] - prefix[l])   # сумма nums[1..3]`, '[0, 3, 4, 8, 9, 14]\n6'),
          h('Префиксы + хеш-таблица'),
          p('Сколько подмассивов имеют сумму `k`? Подмассив `l..r` подходит, если `prefix[r + 1] − prefix[l] = k`, то есть `prefix[l] = prefix[r + 1] − k`. Идём слева направо, храним в словаре, **сколько раз встречалась** каждая префиксная сумма, и для текущей суммы добавляем к ответу `count[sum − k]`. Это `O(n)` вместо `O(n²)` и работает с отрицательными числами — в отличие от скользящего окна.'),
          warn('Не забудь начальное значение `count = {0: 1}`: пустой префикс с суммой 0 нужен, чтобы учесть подмассивы, начинающиеся с первого элемента.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a2t1',
        title: '3Sum',
        source: lc(15, '3sum'),
        text: 'Найди все **уникальные** тройки `[a, b, c]` из `nums` с суммой 0 (элементы на разных позициях). Порядок троек и порядок чисел внутри тройки неважен. Ожидается `O(n²)`.',
        starter: starter(`
def three_sum(nums: list[int]) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'three_sum([-1, 0, 1, 2, -1, -4])', expected: '[[-1, -1, 2], [-1, 0, 1]]' }],
        tests: [
          { label: 'three_sum([-1, 0, 1, 2, -1, -4])', code: `__kiro_eq("three_sum([-1, 0, 1, 2, -1, -4])", sorted(map(sorted, three_sum([-1, 0, 1, 2, -1, -4]))), [[-1, -1, 2], [-1, 0, 1]])` },
          { label: 'three_sum([0, 1, 1])', code: `__kiro_eq("three_sum([0, 1, 1])", list(three_sum([0, 1, 1])), [])` },
          { label: 'three_sum([0, 0, 0, 0])', code: `__kiro_eq("three_sum([0, 0, 0, 0])", sorted(map(sorted, three_sum([0, 0, 0, 0]))), [[0, 0, 0]])` },
          { label: 'много повторов', code: `__kiro_eq("three_sum([-2, 0, 0, 2, 2])", sorted(map(sorted, three_sum([-2, 0, 0, 2, 2]))), [[-2, 0, 2]])` },
          { label: 'three_sum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6])', code: `got = sorted(map(sorted, three_sum([-4, -2, -2, -2, 0, 1, 2, 2, 2, 3, 3, 4, 4, 6, 6])))
__kiro_eq("тройки", got, [[-4, -2, 6], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-2, -2, 4], [-2, 0, 2]])` },
          { label: 'большой массив: 1500 чисел', perf: true, code: `nums = [(i * 7919) % 200003 - 100001 for i in range(1500)]
res = three_sum(nums)
assert all(sum(t) == 0 for t in res), "есть тройка с ненулевой суммой"
assert len(set(tuple(sorted(t)) for t in res)) == len(res), "тройки повторяются"` },
        ],
        solution: {
          text: 'Сортируем, фиксируем первый элемент и ищем пару двумя указателями. Повторы пропускаем и для первого элемента, и после каждой найденной пары.',
          code: `
def three_sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s < 0:
                left += 1
            elif s > 0:
                right -= 1
            else:
                res.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
    return res
`,
          complexity: '`O(n²)` по времени: сортировка `O(n log n)` и `n` проходов двух указателей. Память `O(1)` без учёта ответа.',
          mistakes: [
            'Три вложенных цикла — `O(n³)`, большой тест не пройдёт.',
            'Убирать повторы через `set` из кортежей в конце — работает, но маскирует неаккуратную логику; на собеседовании попросят обойтись без этого.',
            'После найденной тройки сдвинуть только один указатель — бесконечный цикл или повторная тройка.',
          ],
        },
      },
      {
        id: 'a2t2',
        title: 'Container With Most Water',
        source: lc(11, 'container-with-most-water'),
        text: 'Дан список `height`: `height[i]` — высота вертикальной линии в точке `i`. Выбери две линии, которые вместе с осью образуют контейнер с наибольшим объёмом воды, и верни этот объём: `min(height[i], height[j]) · (j − i)`. Ожидается `O(n)`.',
        starter: starter(`
def max_area(height: list[int]) -> int:
    pass
`),
        examples: [{ call: 'max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])', expected: '49' }],
        tests: [
          { call: 'max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])', expected: '49' },
          { call: 'max_area([1, 1])', expected: '1' },
          { call: 'max_area([4, 3, 2, 1, 4])', expected: '16' },
          { call: 'max_area([1, 2, 1])', expected: '2' },
          { label: 'большой массив: 100 000 линий', perf: true, code: `h = [i % 1000 + 1 for i in range(100000)]
__kiro_eq("max_area(большой)", max_area(h), 99000000)` },
        ],
        solution: {
          text: 'Указатели на концах. Считаем площадь, обновляем максимум и сдвигаем указатель на более **низкой** линии — только так можно найти контейнер выше.',
          code: `
def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        best = max(best, min(height[left], height[right]) * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Перебор всех пар — `O(n²)`.',
            'Сдвигать указатель на более высокой линии — так можно пропустить оптимальный ответ: высота ограничена низкой стороной, а ширина уменьшается.',
          ],
        },
      },
      {
        id: 'a2t3',
        title: 'Trapping Rain Water',
        source: lc(42, 'trapping-rain-water'),
        text: 'Список `height` — высоты столбиков ширины 1. Сколько единиц дождевой воды удержится между ними? Над столбиком `i` вода стоит на уровне `min(max_left, max_right)`, где `max_left` и `max_right` — самые высокие столбики слева и справа (включая сам `i`). Достаточно решения за `O(n)` с дополнительными массивами максимумов.',
        starter: starter(`
def trap(height: list[int]) -> int:
    pass
`),
        examples: [{ call: 'trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])', expected: '6' }],
        tests: [
          { call: 'trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])', expected: '6' },
          { call: 'trap([4, 2, 0, 3, 2, 5])', expected: '9' },
          { call: 'trap([])', expected: '0' },
          { call: 'trap([5, 4, 3, 2, 1])', expected: '0' },
          { call: 'trap([3, 0, 3])', expected: '3' },
          { label: 'большой массив: 100 000 столбиков', perf: true, code: `h = [100000 if i in (0, 99999) else i % 7 for i in range(100000)]
__kiro_eq("trap(большой)", trap(h), sum(100000 - (i % 7) for i in range(1, 99999)))` },
        ],
        solution: {
          text: 'Считаем массив максимумов слева направо и справа налево, затем для каждого столбика добавляем `min(left_max[i], right_max[i]) − height[i]`.',
          code: `
def trap(height):
    n = len(height)
    if n == 0:
        return 0
    left_max = [0] * n
    right_max = [0] * n
    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i - 1], height[i])
    right_max[-1] = height[-1]
    for i in range(n - 2, -1, -1):
        right_max[i] = max(right_max[i + 1], height[i])
    return sum(min(left_max[i], right_max[i]) - height[i] for i in range(n))
`,
          complexity: '`O(n)` по времени и `O(n)` памяти. Улучшение до `O(1)` памяти — два указателя: двигаем ту сторону, где текущий максимум меньше, и считаем воду по нему.',
          mistakes: [
            'Для каждого столбика заново искать максимум слева и справа — `O(n²)`.',
            'Забыть пустой список — `height[0]` упадёт с ошибкой.',
          ],
        },
      },
      {
        id: 'a2t4',
        title: 'Running Sum of 1d Array',
        source: lc(1480, 'running-sum-of-1d-array'),
        text: 'Верни список префиксных сумм: `result[i] = nums[0] + nums[1] + … + nums[i]`.',
        starter: starter(`
def running_sum(nums: list[int]) -> list[int]:
    pass
`),
        examples: [{ call: 'running_sum([1, 2, 3, 4])', expected: '[1, 3, 6, 10]' }],
        tests: [
          { call: 'running_sum([1, 2, 3, 4])', expected: '[1, 3, 6, 10]' },
          { call: 'running_sum([1, 1, 1, 1, 1])', expected: '[1, 2, 3, 4, 5]' },
          { call: 'running_sum([3, 1, 2, 10, 1])', expected: '[3, 4, 6, 16, 17]' },
          { call: 'running_sum([-5])', expected: '[-5]' },
          { label: 'большой массив', perf: true, code: `res = running_sum([1] * 100000)
__kiro_eq("последний элемент", res[-1], 100000)` },
        ],
        solution: {
          text: 'Один проход с накопленной суммой. Каждый элемент результата — предыдущий плюс текущий элемент входа.',
          code: `
def running_sum(nums):
    res = []
    total = 0
    for x in nums:
        total += x
        res.append(total)
    return res
`,
          complexity: '`O(n)` по времени. Можно и на месте: `nums[i] += nums[i - 1]`.',
          mistakes: [
            'Считать `sum(nums[:i + 1])` для каждого `i` — `O(n²)`.',
          ],
        },
      },
      {
        id: 'a2t5',
        title: 'Subarray Sum Equals K',
        source: lc(560, 'subarray-sum-equals-k'),
        text: 'Посчитай, сколько непрерывных подмассивов `nums` имеют сумму ровно `k`. Числа могут быть отрицательными. Ожидается `O(n)` — через префиксные суммы и словарь.',
        starter: starter(`
def subarray_sum(nums: list[int], k: int) -> int:
    pass
`),
        examples: [
          { call: 'subarray_sum([1, 1, 1], 2)', expected: '2' },
          { call: 'subarray_sum([1, 2, 3], 3)', expected: '2' },
        ],
        tests: [
          { call: 'subarray_sum([1, 1, 1], 2)', expected: '2' },
          { call: 'subarray_sum([1, 2, 3], 3)', expected: '2' },
          { call: 'subarray_sum([1, -1, 0], 0)', expected: '3' },
          { call: 'subarray_sum([3, 4, 7, 2, -3, 1, 4, 2], 7)', expected: '4' },
          { call: 'subarray_sum([1], 0)', expected: '0' },
          { label: 'большой массив: 100 000 чисел', perf: true, code: `nums = [1, -1] * 50000
__kiro_eq("subarray_sum([1, -1] * 50000, 0)", subarray_sum(nums, 0), 2500000000)` },
        ],
        solution: {
          text: 'Идём по массиву, поддерживая текущую префиксную сумму. Подмассив, оканчивающийся здесь, имеет сумму `k`, если раньше встречалась префиксная сумма `sum − k`. Сколько раз она встречалась — столько и подмассивов.',
          code: `
def subarray_sum(nums, k):
    count = {0: 1}
    total = 0
    res = 0
    for x in nums:
        total += x
        res += count.get(total - k, 0)
        count[total] = count.get(total, 0) + 1
    return res
`,
          complexity: '`O(n)` по времени и `O(n)` памяти.',
          mistakes: [
            'Скользящее окно — не работает с отрицательными числами: при расширении окна сумма может уменьшаться.',
            'Забыть `count = {0: 1}` — потеряются подмассивы, начинающиеся с первого элемента.',
            'Обновить `count[total]` до прибавления к ответу — при `k = 0` пустой подмассив посчитается как ответ.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 3
  {
    id: 'a3',
    week: 1,
    day: 3,
    title: 'Скользящее окно',
    summary: 'Окно фиксированного размера, окно переменного размера с условием, шаблон «расширяем справа — сужаем слева», окно со счётчиком символов.',
    sections: [
      {
        id: 'fixed',
        title: 'Окно фиксированного размера',
        blocks: [
          p('**Скользящее окно** — подотрезок массива или строки, который двигается слева направо. Вместо того чтобы заново считать ответ для каждого подотрезка, мы **обновляем** его: добавляем элемент, вошедший справа, и убираем вышедший слева.'),
          p('Пример: максимальная сумма `k` подряд идущих элементов. Наивно — `n` окон по `k` элементов, `O(n·k)`. Со скользящим окном каждое следующее окно получается из предыдущего за `O(1)`:'),
          shell(`nums = [1, 12, -5, -6, 50, 3],  k = 4
[1, 12, -5, -6]          сумма 2
    [12, -5, -6, 50]     2 − 1 + 50 = 51
        [-5, -6, 50, 3]  51 − 12 + 3 = 42`, 'Схема'),
          py(`def max_window_sum(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]   # вошёл nums[i], вышел nums[i - k]
        best = max(best, window)
    return best

print(max_window_sum([1, 12, -5, -6, 50, 3], 4))`, '51'),
        ],
      },
      {
        id: 'variable',
        title: 'Окно переменного размера',
        blocks: [
          p('Чаще окно меняет размер: ищем самый длинный или самый короткий подотрезок с условием. Шаблон один и тот же:'),
          steps(
            'Правая граница `right` идёт по массиву и **расширяет** окно, добавляя элемент.',
            'Пока окно нарушает условие (или пока условие выполнено — для поиска минимума), **сужаем** его: убираем элемент слева и двигаем `left`.',
            'После сужения обновляем ответ по текущему окну.',
          ),
          py(`def longest_with_at_most_two_distinct(s):
    count = {}
    left = best = 0
    for right, ch in enumerate(s):
        count[ch] = count.get(ch, 0) + 1          # расширяем
        while len(count) > 2:                      # окно плохое — сужаем
            count[s[left]] -= 1
            if count[s[left]] == 0:
                del count[s[left]]
            left += 1
        best = max(best, right - left + 1)         # окно хорошее — обновляем ответ
    return best

print(longest_with_at_most_two_distinct("eceba"))`, '3'),
          p('Почему это `O(n)`, хотя внутри цикла есть `while`? Каждый элемент **один раз** входит в окно (через `right`) и не больше одного раза выходит (через `left`). Суммарно оба указателя проходят массив по одному разу.'),
          h('Когда окно работает, а когда нет'),
          list(
            'нужен непрерывный подотрезок (подмассив, подстрока) — да;',
            'условие **монотонно**: если окно плохое, то любое более широкое окно с той же левой границей тоже плохое — да;',
            'в массиве есть отрицательные числа и условие на сумму — монотонность ломается, окно не работает; нужны префиксные суммы (день 2).',
          ),
          tip('Для подсчёта символов в окне удобен словарь или `collections.Counter`. Если алфавит небольшой (например, только заглавные латинские буквы), можно взять список из 26 счётчиков.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a3t1',
        title: 'Maximum Average Subarray I',
        source: lc(643, 'maximum-average-subarray-i'),
        text: 'Найди непрерывный подмассив длины ровно `k` с наибольшим средним и верни это среднее (дробное число). Ожидается `O(n)`.',
        starter: starter(`
def find_max_average(nums: list[int], k: int) -> float:
    pass
`),
        examples: [{ call: 'find_max_average([1, 12, -5, -6, 50, 3], 4)', expected: '12.75' }],
        tests: [
          { label: 'find_max_average([1, 12, -5, -6, 50, 3], 4)', code: `res = find_max_average([1, 12, -5, -6, 50, 3], 4)
assert abs(res - 12.75) < 1e-6, f"ожидалось 12.75, получено {res!r}"` },
          { label: 'find_max_average([5], 1)', code: `res = find_max_average([5], 1)
assert abs(res - 5.0) < 1e-6, f"ожидалось 5.0, получено {res!r}"` },
          { label: 'отрицательные числа', code: `res = find_max_average([-1, -2, -3, -4], 2)
assert abs(res - (-1.5)) < 1e-6, f"ожидалось -1.5, получено {res!r}"` },
          { label: 'окно на весь массив', code: `res = find_max_average([0, 4, 0, 3, 2], 5)
assert abs(res - 1.8) < 1e-6, f"ожидалось 1.8, получено {res!r}"` },
          { label: 'большой массив: n = 100 000, k = 50 000', perf: true, code: `nums = [i % 100 for i in range(100000)]
res = find_max_average(nums, 50000)
assert abs(res - 49.5) < 1e-6, f"ожидалось 49.5, получено {res!r}"` },
        ],
        solution: {
          text: 'Считаем сумму первого окна, затем сдвигаем его: прибавляем вошедший элемент и вычитаем вышедший. Делим на `k` один раз в конце.',
          code: `
def find_max_average(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i - k]
        best = max(best, window)
    return best / k
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Считать `sum(nums[i:i + k])` для каждого окна — `O(n·k)`, на большом тесте слишком медленно.',
            'Начать `best` с нуля — при отрицательных числах ответ окажется неверным.',
          ],
        },
      },
      {
        id: 'a3t2',
        title: 'Longest Substring Without Repeating Characters',
        source: lc(3, 'longest-substring-without-repeating-characters'),
        text: 'Найди длину самой длинной подстроки `s` без повторяющихся символов. Ожидается `O(n)`.',
        starter: starter(`
def length_of_longest_substring(s: str) -> int:
    pass
`),
        examples: [
          { call: 'length_of_longest_substring("abcabcbb")', expected: '3' },
          { call: 'length_of_longest_substring("pwwkew")', expected: '3' },
        ],
        tests: [
          { call: 'length_of_longest_substring("abcabcbb")', expected: '3' },
          { call: 'length_of_longest_substring("bbbbb")', expected: '1' },
          { call: 'length_of_longest_substring("pwwkew")', expected: '3' },
          { call: 'length_of_longest_substring("")', expected: '0' },
          { call: 'length_of_longest_substring("abba")', expected: '2' },
          { call: 'length_of_longest_substring("dvdf")', expected: '3' },
          { label: 'большая строка: 100 000 символов', perf: true, code: `s = "".join(chr(0x4E00 + i % 5000) for i in range(100000))
__kiro_eq("length_of_longest_substring(большая)", length_of_longest_substring(s), 5000)` },
        ],
        solution: {
          text: 'Окно переменного размера. Храним последнюю позицию каждого символа. Если текущий символ уже встречался **внутри окна**, переносим левую границу сразу за его прошлую позицию.',
          code: `
def length_of_longest_substring(s):
    last = {}
    left = best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best
`,
          complexity: '`O(n)` по времени, `O(min(n, алфавит))` памяти.',
          mistakes: [
            'Не проверять `last[ch] >= left` — левая граница может «прыгнуть» назад (тест `"abba"`).',
            'Для каждого начала строить подстроку заново — `O(n²)` и больше, большой тест не пройдёт.',
          ],
        },
      },
      {
        id: 'a3t3',
        title: 'Minimum Size Subarray Sum',
        source: lc(209, 'minimum-size-subarray-sum'),
        text: 'Все числа в `nums` положительные. Найди длину самого короткого непрерывного подмассива с суммой **не меньше** `target`. Если такого нет, верни 0. Ожидается `O(n)`.',
        starter: starter(`
def min_sub_array_len(target: int, nums: list[int]) -> int:
    pass
`),
        examples: [{ call: 'min_sub_array_len(7, [2, 3, 1, 2, 4, 3])', expected: '2' }],
        tests: [
          { call: 'min_sub_array_len(7, [2, 3, 1, 2, 4, 3])', expected: '2' },
          { call: 'min_sub_array_len(4, [1, 4, 4])', expected: '1' },
          { call: 'min_sub_array_len(11, [1, 1, 1, 1, 1, 1, 1, 1])', expected: '0' },
          { call: 'min_sub_array_len(15, [1, 2, 3, 4, 5])', expected: '5' },
          { label: 'большой массив: 100 000 чисел', perf: true, code: `nums = [1] * 100000
__kiro_eq("min_sub_array_len(50000, [1] * 100000)", min_sub_array_len(50000, nums), 50000)` },
        ],
        solution: {
          text: 'Расширяем окно справа, пока сумма меньше `target`. Как только сумма достигла цели — фиксируем длину и сужаем окно слева, пока условие держится.',
          code: `
def min_sub_array_len(target, nums):
    left = total = 0
    best = len(nums) + 1
    for right, x in enumerate(nums):
        total += x
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return best if best <= len(nums) else 0
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. Окно работает, потому что все числа положительные: сумма растёт при расширении и убывает при сужении.',
          mistakes: [
            'Вернуть «бесконечность» или `len(nums) + 1`, когда подмассива нет, — по условию нужен 0.',
            'Использовать `if` вместо `while` при сужении — окно сузится только на один элемент за шаг, и минимум может быть пропущен.',
          ],
        },
      },
      {
        id: 'a3t4',
        title: 'Longest Repeating Character Replacement',
        source: lc(424, 'longest-repeating-character-replacement'),
        text: 'Строка `s` состоит из заглавных латинских букв. Можно заменить не больше `k` символов на любые другие. Найди длину самой длинной подстроки из одинаковых букв, которую можно получить.',
        starter: starter(`
def character_replacement(s: str, k: int) -> int:
    pass
`),
        examples: [
          { call: 'character_replacement("ABAB", 2)', expected: '4' },
          { call: 'character_replacement("AABABBA", 1)', expected: '4' },
        ],
        tests: [
          { call: 'character_replacement("ABAB", 2)', expected: '4' },
          { call: 'character_replacement("AABABBA", 1)', expected: '4' },
          { call: 'character_replacement("AAAA", 0)', expected: '4' },
          { call: 'character_replacement("ABCDE", 1)', expected: '2' },
          { call: 'character_replacement("ABBB", 0)', expected: '3' },
          { label: 'большая строка: 100 000 символов', perf: true, code: `s = "AB" * 50000
__kiro_eq("character_replacement(\\"AB\\" * 50000, 1000)", character_replacement(s, 1000), 2001)` },
        ],
        solution: {
          text: 'Окно хорошее, если `длина окна − частота самой частой буквы ≤ k`: все остальные буквы можно заменить. Расширяем окно справа, пока условие нарушено — сужаем слева. Максимальную частоту можно не уменьшать при сужении: ответ растёт, только когда она растёт.',
          code: `
def character_replacement(s, k):
    count = {}
    left = max_freq = best = 0
    for right, ch in enumerate(s):
        count[ch] = count.get(ch, 0) + 1
        max_freq = max(max_freq, count[ch])
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best
`,
          complexity: '`O(n)` по времени, `O(26)` памяти.',
          mistakes: [
            'Перебирать все подстроки и для каждой считать частоты — `O(n²)` или хуже.',
            'Пересчитывать `max(count.values())` на каждом шаге — тоже работает (`O(26·n)`), но важно понимать, почему можно обойтись без этого.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 4
  {
    id: 'a4',
    week: 1,
    day: 4,
    title: 'Хеш-таблицы',
    summary: 'Как устроены dict и set и почему поиск в них O(1), частые приёмы: «видели ли раньше», подсчёт частот, группировка по ключу, Counter и defaultdict, bucket sort по частотам.',
    sections: [
      {
        id: 'hash',
        title: 'Как работает хеш-таблица',
        blocks: [
          p('**Хеш-таблица** хранит пары «ключ — значение» и находит значение по ключу в среднем за `O(1)`. В Python это `dict`, а `set` — то же самое, только без значений.'),
          p('Внутри — массив «корзин». Хеш-функция превращает ключ в число, по нему выбирается корзина. Поиск не перебирает все элементы, а сразу идёт в нужную корзину. Если два ключа попали в одну корзину (**коллизия**), таблица разрешает это, но в среднем элементов в корзине мало.'),
          list(
            'ключом может быть только **неизменяемый** объект: число, строка, кортеж. Список ключом быть не может — его хеш мог бы измениться;',
            'в худшем случае (много коллизий) операции деградируют до `O(n)`, но на практике считаются `O(1)`;',
            'за скорость платим памятью: `O(n)` на хранение.',
          ),
          table(['Задача', 'Без хеш-таблицы', 'С хеш-таблицей'], [
            ['есть ли повторы', 'сравнить все пары — `O(n²)`', 'добавлять в `set` и проверять — `O(n)`'],
            ['пара с суммой `target`', 'все пары — `O(n²)`', 'искать `target − x` среди увиденных — `O(n)`'],
            ['частоты элементов', '`list.count` для каждого — `O(n²)`', 'один проход со счётчиком — `O(n)`'],
          ]),
        ],
      },
      {
        id: 'patterns',
        title: 'Приёмы с dict и set',
        blocks: [
          h('«Видели ли мы это раньше»'),
          p('Идём по массиву и для каждого элемента проверяем, встречалось ли нужное значение **раньше**, а потом запоминаем текущий элемент. Так решаются Two Sum, поиск дубликатов, первый неповторяющийся элемент.'),
          h('Подсчёт частот: Counter'),
          py(`from collections import Counter

words = ["кот", "пёс", "кот", "ёж", "кот", "пёс"]
cnt = Counter(words)
print(cnt["кот"], cnt["слон"])     # отсутствующий ключ — 0, без ошибки
print(cnt.most_common(2))`, "3 0\n[('кот', 3), ('пёс', 2)]"),
          h('Группировка по ключу: defaultdict'),
          p('Чтобы сгруппировать объекты, нужен **ключ**, одинаковый у объектов одной группы. Для анаграмм это отсортированные буквы слова или кортеж из 26 счётчиков букв.'),
          py(`from collections import defaultdict

groups = defaultdict(list)          # отсутствующий ключ сразу получает []
for word in ["eat", "tea", "tan", "ate", "nat", "bat"]:
    groups["".join(sorted(word))].append(word)
print(dict(groups))`, "{'aet': ['eat', 'tea', 'ate'], 'ant': ['tan', 'nat'], 'abt': ['bat']}"),
          h('Bucket sort по частотам'),
          p('Как найти `k` самых частых элементов быстрее, чем `O(n log n)`? Частота элемента — от 1 до `n`. Заведём `n + 1` «корзин», в корзину номер `f` положим элементы с частотой `f`, а потом пройдём по корзинам от больших частот к меньшим. Всё за `O(n)`.'),
          warn('`key in list` — это `O(n)`, а `key in set` и `key in dict` — `O(1)`. Если в цикле проверяешь принадлежность — переведи коллекцию в `set` заранее.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a4t1',
        title: 'Two Sum',
        source: lc(1, 'two-sum'),
        text: 'Найди два **разных** индекса `i` и `j`, для которых `nums[i] + nums[j] == target`, и верни `[i, j]` (порядок неважен). Решение гарантированно одно. Ожидается `O(n)`.',
        starter: starter(`
def two_sum(nums: list[int], target: int) -> list[int]:
    pass
`),
        examples: [
          { call: 'two_sum([2, 7, 11, 15], 9)', expected: '[0, 1]' },
          { call: 'two_sum([3, 3], 6)', expected: '[0, 1]' },
        ],
        tests: [
          { label: 'two_sum([2, 7, 11, 15], 9)', code: `__kiro_eq("two_sum([2, 7, 11, 15], 9)", sorted(two_sum([2, 7, 11, 15], 9)), [0, 1])` },
          { label: 'two_sum([3, 2, 4], 6)', code: `__kiro_eq("two_sum([3, 2, 4], 6)", sorted(two_sum([3, 2, 4], 6)), [1, 2])` },
          { label: 'two_sum([3, 3], 6)', code: `__kiro_eq("two_sum([3, 3], 6)", sorted(two_sum([3, 3], 6)), [0, 1])` },
          { label: 'отрицательные числа', code: `__kiro_eq("two_sum([-3, 4, 3, 90], 0)", sorted(two_sum([-3, 4, 3, 90], 0)), [0, 2])` },
          { label: 'большой массив: 100 000 чисел', perf: true, code: `nums = list(range(100000))
__kiro_eq("two_sum(0..99999, 199997)", sorted(two_sum(nums, 199997)), [99998, 99999])` },
        ],
        solution: {
          text: 'Для каждого числа ищем «пару» `target − x` среди уже просмотренных чисел. Словарь хранит «значение → индекс». Проверяем **до** того, как добавить текущее число, — так один элемент не используется дважды.',
          code: `
def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        if target - x in seen:
            return [seen[target - x], i]
        seen[x] = i
`,
          complexity: '`O(n)` по времени и `O(n)` памяти.',
          mistakes: [
            'Два вложенных цикла — `O(n²)`.',
            'Сначала записать все числа в словарь, а потом искать пару, — при `[3, 3]` и `target = 6` элемент найдёт сам себя, если не проверить, что индексы разные.',
            'Отсортировать и взять два указателя — индексы перепутаются, нужно хранить исходные позиции.',
          ],
        },
      },
      {
        id: 'a4t2',
        title: 'Group Anagrams',
        source: lc(49, 'group-anagrams'),
        text: 'Сгруппируй слова-анаграммы — слова из одних и тех же букв. Верни список групп. Порядок групп и порядок слов в группе неважен.',
        starter: starter(`
def group_anagrams(strs: list[str]) -> list[list[str]]:
    pass
`),
        examples: [{ call: 'group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])', expected: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]' }],
        tests: [
          { label: 'group_anagrams(["eat","tea","tan","ate","nat","bat"])', code: `got = sorted(sorted(g) for g in group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
__kiro_eq("группы", got, [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]])` },
          { label: 'group_anagrams([""])', code: `__kiro_eq("группы", sorted(sorted(g) for g in group_anagrams([""])), [[""]])` },
          { label: 'group_anagrams(["a"])', code: `__kiro_eq("группы", sorted(sorted(g) for g in group_anagrams(["a"])), [["a"]])` },
          { label: 'одинаковые буквы в разном количестве', code: `got = sorted(sorted(g) for g in group_anagrams(["ab", "aab", "ba", "aba", "b"]))
__kiro_eq("группы", got, [["aab", "aba"], ["ab", "ba"], ["b"]])` },
        ],
        solution: {
          text: 'Ключ группы — отсортированные буквы слова: у анаграмм он совпадает. `defaultdict(list)` собирает слова по ключу.',
          code: `
from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)
    for word in strs:
        groups["".join(sorted(word))].append(word)
    return list(groups.values())
`,
          complexity: '`O(n · m log m)`, где `m` — длина слова. Ключ из 26 счётчиков букв даёт `O(n · m)`.',
          mistakes: [
            'Ключ — `set(word)`: у `"ab"` и `"aab"` множества букв совпадают, но это не анаграммы.',
            'Ключ — отсортированный **список** букв: список нельзя использовать как ключ словаря, нужна строка или кортеж.',
          ],
        },
      },
      {
        id: 'a4t3',
        title: 'Valid Anagram',
        source: lc(242, 'valid-anagram'),
        text: 'Проверь, является ли строка `t` анаграммой строки `s` — состоит из тех же букв в том же количестве.',
        starter: starter(`
def is_anagram(s: str, t: str) -> bool:
    pass
`),
        examples: [
          { call: 'is_anagram("anagram", "nagaram")', expected: 'True' },
          { call: 'is_anagram("rat", "car")', expected: 'False' },
        ],
        tests: [
          { call: 'is_anagram("anagram", "nagaram")', expected: 'True' },
          { call: 'is_anagram("rat", "car")', expected: 'False' },
          { call: 'is_anagram("a", "ab")', expected: 'False' },
          { call: 'is_anagram("aacc", "ccac")', expected: 'False' },
          { call: 'is_anagram("", "")', expected: 'True' },
        ],
        solution: {
          text: 'Сравниваем частоты букв. `Counter` строит словарь частот за `O(n)`, а сравнение двух `Counter` — проверка, что все частоты совпадают.',
          code: `
from collections import Counter

def is_anagram(s, t):
    return len(s) == len(t) and Counter(s) == Counter(t)
`,
          complexity: '`O(n)` по времени, `O(алфавит)` памяти. Вариант `sorted(s) == sorted(t)` — `O(n log n)`.',
          mistakes: [
            'Сравнить множества букв `set(s) == set(t)` — теряется количество (тест `"aacc"` и `"ccac"`).',
          ],
        },
      },
      {
        id: 'a4t4',
        title: 'Contains Duplicate',
        source: lc(217, 'contains-duplicate'),
        text: 'Верни `True`, если какое-то число встречается в `nums` хотя бы дважды, иначе `False`. Ожидается `O(n)`.',
        starter: starter(`
def contains_duplicate(nums: list[int]) -> bool:
    pass
`),
        examples: [
          { call: 'contains_duplicate([1, 2, 3, 1])', expected: 'True' },
          { call: 'contains_duplicate([1, 2, 3, 4])', expected: 'False' },
        ],
        tests: [
          { call: 'contains_duplicate([1, 2, 3, 1])', expected: 'True' },
          { call: 'contains_duplicate([1, 2, 3, 4])', expected: 'False' },
          { call: 'contains_duplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])', expected: 'True' },
          { call: 'contains_duplicate([])', expected: 'False' },
          { label: 'большой массив без повторов', perf: true, code: `__kiro_eq("contains_duplicate(0..99999)", contains_duplicate(list(range(100000))), False)` },
        ],
        solution: {
          text: 'Складываем числа в множество и проверяем, не встречалось ли текущее раньше. Можно и короче: `len(set(nums)) != len(nums)`.',
          code: `
def contains_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False
`,
          complexity: '`O(n)` по времени и `O(n)` памяти. Ранний выход — плюс: при дубле в начале массива работаем быстрее.',
          mistakes: [
            'Проверка `x in nums[:i]` в цикле — `O(n²)`.',
            '`seen` — список вместо множества: `x in list` занимает `O(n)`.',
          ],
        },
      },
      {
        id: 'a4t5',
        title: 'Top K Frequent Elements',
        source: lc(347, 'top-k-frequent-elements'),
        text: 'Верни `k` самых частых элементов `nums` в любом порядке. Ответ гарантированно однозначен. Попробуй решить за `O(n)` — подсчётом частот и «корзинами».',
        starter: starter(`
def top_k_frequent(nums: list[int], k: int) -> list[int]:
    pass
`),
        examples: [{ call: 'top_k_frequent([1, 1, 1, 2, 2, 3], 2)', expected: '[1, 2]' }],
        tests: [
          { label: 'top_k_frequent([1, 1, 1, 2, 2, 3], 2)', code: `__kiro_eq("top_k_frequent([1, 1, 1, 2, 2, 3], 2)", sorted(top_k_frequent([1, 1, 1, 2, 2, 3], 2)), [1, 2])` },
          { label: 'top_k_frequent([1], 1)', code: `__kiro_eq("top_k_frequent([1], 1)", sorted(top_k_frequent([1], 1)), [1])` },
          { label: 'отрицательные', code: `__kiro_eq("top_k_frequent([4, -1, -1, 2, -1, 2, 3], 2)", sorted(top_k_frequent([4, -1, -1, 2, -1, 2, 3], 2)), [-1, 2])` },
          { label: 'k = числу различных', code: `__kiro_eq("top_k_frequent([5, 6, 6], 2)", sorted(top_k_frequent([5, 6, 6], 2)), [5, 6])` },
        ],
        solution: {
          text: 'Считаем частоты, раскладываем элементы по корзинам `buckets[частота]` и собираем ответ, проходя корзины от больших частот к меньшим.',
          code: `
from collections import Counter

def top_k_frequent(nums, k):
    cnt = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for x, f in cnt.items():
        buckets[f].append(x)
    res = []
    for f in range(len(nums), 0, -1):
        for x in buckets[f]:
            res.append(x)
            if len(res) == k:
                return res
    return res
`,
          complexity: '`O(n)` по времени и памяти. Варианты: `Counter(nums).most_common(k)` или сортировка по частоте — `O(n log n)`; куча размера `k` — `O(n log k)` (день 19).',
          mistakes: [
            'Вернуть частоты вместо самих элементов.',
            'Сортировать сами числа, а не по частоте.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 5
  {
    id: 'a5',
    week: 1,
    day: 5,
    title: 'Стек и монотонный стек',
    summary: 'Стек LIFO на списке Python, задачи на парные скобки и вычисление выражений, стек с дополнительной информацией (минимум за O(1)), монотонный стек для поиска следующего большего элемента.',
    sections: [
      {
        id: 'stack',
        title: 'Стек',
        blocks: [
          p('**Стек** — структура «последним пришёл — первым ушёл» (LIFO), как стопка тарелок: кладём сверху и берём сверху. Операции: положить (`push`), снять верхний (`pop`), посмотреть верхний (`top`/`peek`) — все за `O(1)`.'),
          p('В Python стек — обычный список: `append` кладёт на вершину, `pop()` снимает, `stack[-1]` — верхний элемент.'),
          py(`stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack[-1])       # верхний элемент
print(stack.pop())     # снимаем
print(stack)`, '3\n3\n[1, 2]'),
          h('Когда нужен стек'),
          list(
            '**парные конструкции**: скобки, теги HTML — открывающий элемент ждёт закрывающего, причём закрывается последний открытый;',
            '**отложенные вычисления**: обратная польская запись, калькулятор выражений;',
            '**отмена действий** (undo), история браузера, обход в глубину без рекурсии;',
            '«для каждого элемента найди **ближайший** слева или справа элемент с условием» — монотонный стек.',
          ),
          h('Стек с дополнительной информацией'),
          p('Иногда в стеке хранят не только значение, но и что-то полезное о части стека под ним. Чтобы получать минимум за `O(1)`, рядом с каждым значением храним минимум на момент добавления: `(value, min_so_far)`. При снятии элемента минимум «откатывается» сам.'),
        ],
      },
      {
        id: 'monotonic',
        title: 'Монотонный стек',
        blocks: [
          p('**Монотонный стек** хранит элементы (обычно их индексы) так, что значения в нём всегда убывают (или возрастают). Он отвечает на вопрос «для каждого элемента найди **следующий больший** справа» за `O(n)` вместо `O(n²)`.'),
          steps(
            'Идём по массиву слева направо.',
            'Пока текущий элемент **больше** элемента на вершине стека, снимаем вершину: для неё текущий элемент — тот самый «следующий больший».',
            'Кладём текущий индекс в стек. Элементы в стеке — те, для которых ответ ещё не найден; их значения убывают.',
          ),
          py(`def next_greater(nums):
    res = [-1] * len(nums)
    stack = []                          # индексы, значения по ним убывают
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            res[stack.pop()] = x
        stack.append(i)
    return res

print(next_greater([2, 1, 2, 4, 3]))`, '[4, 2, 4, -1, -1]'),
          p('Почему `O(n)`: каждый индекс один раз кладётся в стек и не больше одного раза снимается. Внутренний `while` за весь проход делает не больше `n` снятий.'),
          tip('В монотонном стеке почти всегда хранят **индексы**, а не значения: по индексу можно и узнать значение, и посчитать расстояние (как в Daily Temperatures).'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a5t1',
        title: 'Valid Parentheses',
        source: lc(20, 'valid-parentheses'),
        text: 'Строка `s` состоит из скобок `()[]{}`. Проверь, что скобки расставлены правильно: каждая открывающая закрывается скобкой того же типа и в правильном порядке.',
        starter: starter(`
def is_valid(s: str) -> bool:
    pass
`),
        examples: [
          { call: 'is_valid("()[]{}")', expected: 'True' },
          { call: 'is_valid("(]")', expected: 'False' },
        ],
        tests: [
          { call: 'is_valid("()")', expected: 'True' },
          { call: 'is_valid("()[]{}")', expected: 'True' },
          { call: 'is_valid("(]")', expected: 'False' },
          { call: 'is_valid("([)]")', expected: 'False' },
          { call: 'is_valid("{[]}")', expected: 'True' },
          { call: 'is_valid("(")', expected: 'False' },
          { call: 'is_valid("))")', expected: 'False' },
        ],
        solution: {
          text: 'Открывающие скобки кладём в стек. Закрывающая должна совпасть по типу с вершиной стека. В конце стек должен быть пуст.',
          code: `
def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack
`,
          complexity: '`O(n)` по времени и памяти.',
          mistakes: [
            'Считать только количество открывающих и закрывающих — `"([)]"` пройдёт, хотя порядок неверный.',
            'Не проверить, что стек пуст перед `pop()` (тест `"))"`), или не проверить пустоту стека в конце (тест `"("`).',
          ],
        },
      },
      {
        id: 'a5t2',
        title: 'Min Stack',
        source: lc(155, 'min-stack'),
        text: 'Реализуй класс `MinStack` с методами `push(val)`, `pop()`, `top()` и `get_min()` — получить минимальный элемент стека. **Все** операции — за `O(1)`. `pop`, `top` и `get_min` вызываются только для непустого стека.',
        starter: starter(`
class MinStack:
    def __init__(self):
        pass

    def push(self, val: int) -> None:
        pass

    def pop(self) -> None:
        pass

    def top(self) -> int:
        pass

    def get_min(self) -> int:
        pass
`),
        examples: [{ call: 's = MinStack(); s.push(-2); s.push(0); s.push(-3); s.get_min()', expected: '-3' }],
        tests: [
          { label: 'пример из условия', code: `s = MinStack()
s.push(-2); s.push(0); s.push(-3)
__kiro_eq("get_min()", s.get_min(), -3)
s.pop()
__kiro_eq("top()", s.top(), 0)
__kiro_eq("get_min()", s.get_min(), -2)` },
          { label: 'повторяющийся минимум', code: `s = MinStack()
s.push(1); s.push(1); s.push(2)
s.pop(); s.pop()
__kiro_eq("get_min() после двух pop", s.get_min(), 1)` },
          { label: 'минимум возвращается после pop', code: `s = MinStack()
for v in [5, 3, 7, 1, 8]:
    s.push(v)
mins = []
for _ in range(4):
    mins.append(s.get_min())
    s.pop()
__kiro_eq("минимумы по мере снятия", mins, [1, 1, 3, 3])
__kiro_eq("top()", s.top(), 5)` },
          { label: 'get_min за O(1): 100 000 операций', perf: true, code: `s = MinStack()
for i in range(100000, 0, -1):
    s.push(i)
total = 0
for _ in range(50000):
    total += s.get_min()
__kiro_eq("сумма минимумов", total, 50000)` },
        ],
        solution: {
          text: 'Храним в стеке пары `(значение, минимум на этот момент)`. Минимум для новой пары — меньшее из нового значения и минимума под ним.',
          code: `
class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val):
        cur_min = min(val, self.stack[-1][1]) if self.stack else val
        self.stack.append((val, cur_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def get_min(self):
        return self.stack[-1][1]
`,
          complexity: 'Все операции `O(1)`, память `O(n)`.',
          mistakes: [
            '`get_min` через `min(self.stack)` — `O(n)` на каждый вызов.',
            'Хранить один общий минимум в переменной — после `pop` минимума неизвестно, каким стал новый минимум.',
          ],
        },
      },
      {
        id: 'a5t3',
        title: 'Evaluate Reverse Polish Notation',
        source: lc(150, 'evaluate-reverse-polish-notation'),
        text: 'Вычисли выражение в обратной польской записи: операнды идут перед операцией, `["2", "1", "+", "3", "*"]` — это `(2 + 1) * 3`. Операции: `+ - * /`. Деление целочисленное **с отбрасыванием дробной части** (к нулю): `-7 / 2 = -3`.',
        starter: starter(`
def eval_rpn(tokens: list[str]) -> int:
    pass
`),
        examples: [{ call: 'eval_rpn(["2", "1", "+", "3", "*"])', expected: '9' }],
        tests: [
          { call: 'eval_rpn(["2", "1", "+", "3", "*"])', expected: '9' },
          { call: 'eval_rpn(["4", "13", "5", "/", "+"])', expected: '6' },
          { call: 'eval_rpn(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])', expected: '22' },
          { call: 'eval_rpn(["-7", "2", "/"])', expected: '-3' },
          { call: 'eval_rpn(["5"])', expected: '5' },
          { call: 'eval_rpn(["3", "4", "-"])', expected: '-1' },
        ],
        solution: {
          text: 'Числа кладём в стек. Встретив операцию, снимаем два верхних числа — **сначала второй** операнд, потом первый, — применяем операцию и кладём результат обратно.',
          code: `
def eval_rpn(tokens):
    stack = []
    for tok in tokens:
        if tok in "+-*/" and len(tok) == 1:
            b = stack.pop()
            a = stack.pop()
            if tok == "+":
                stack.append(a + b)
            elif tok == "-":
                stack.append(a - b)
            elif tok == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))
        else:
            stack.append(int(tok))
    return stack[0]
`,
          complexity: '`O(n)` по времени и памяти.',
          mistakes: [
            '`a // b` вместо `int(a / b)`: в Python `//` округляет вниз, и `-7 // 2 = -4`, а нужно `-3`.',
            'Перепутать порядок операндов при `-` и `/`: первым снимается **правый** операнд.',
            'Проверять `tok in "+-*/"` без проверки длины — строка `"-11"` не операция, а число.',
          ],
        },
      },
      {
        id: 'a5t4',
        title: 'Daily Temperatures',
        source: lc(739, 'daily-temperatures'),
        text: 'Для каждого дня определи, через сколько дней станет **теплее**. Если такого дня нет — 0. Ожидается `O(n)` — монотонным стеком.',
        starter: starter(`
def daily_temperatures(temperatures: list[int]) -> list[int]:
    pass
`),
        examples: [{ call: 'daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])', expected: '[1, 1, 4, 2, 1, 1, 0, 0]' }],
        tests: [
          { call: 'daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73])', expected: '[1, 1, 4, 2, 1, 1, 0, 0]' },
          { call: 'daily_temperatures([30, 40, 50, 60])', expected: '[1, 1, 1, 0]' },
          { call: 'daily_temperatures([30, 60, 90])', expected: '[1, 1, 0]' },
          { call: 'daily_temperatures([50, 50, 50])', expected: '[0, 0, 0]' },
          { label: 'большой массив: 100 000 убывающих температур', perf: true, code: `t = list(range(100000, 0, -1)) + [100001]
res = daily_temperatures(t)
__kiro_eq("res[0]", res[0], 100000)
__kiro_eq("res[-2]", res[-2], 1)` },
        ],
        solution: {
          text: 'Стек хранит индексы дней, для которых тёплый день ещё не найден; температуры в стеке убывают. Новый день «закрывает» все более холодные дни на вершине стека.',
          code: `
def daily_temperatures(temperatures):
    res = [0] * len(temperatures)
    stack = []
    for i, t in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < t:
            j = stack.pop()
            res[j] = i - j
        stack.append(i)
    return res
`,
          complexity: '`O(n)` по времени и памяти: каждый индекс кладётся и снимается не больше одного раза.',
          mistakes: [
            'Для каждого дня искать следующий тёплый вложенным циклом — `O(n²)`, на убывающем массиве слишком медленно.',
            'Снимать при `<=` вместо `<`: одинаковая температура — это не «теплее».',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 6
  {
    id: 'a6',
    week: 1,
    day: 6,
    title: 'Очередь и задачи на проектирование',
    summary: 'Очередь FIFO и deque, почему list.pop(0) медленный, кольцевой буфер, очередь из двух стеков и амортизированная сложность, как решать задачи «спроектируй структуру данных» на собеседовании.',
    sections: [
      {
        id: 'queue',
        title: 'Очередь и deque',
        blocks: [
          p('**Очередь** — «первым пришёл — первым ушёл» (FIFO): добавляем в конец, забираем из начала. Очередь задач, сообщений, запросов к серверу; обход в ширину (день 16).'),
          warn('`list.pop(0)` сдвигает все остальные элементы и стоит `O(n)`. Очередь на списке с `pop(0)` превращает линейный алгоритм в квадратичный.'),
          p('В Python для очереди есть `collections.deque` — двусторонняя очередь: добавление и удаление **с обоих концов** за `O(1)`.'),
          py(`from collections import deque

q = deque()
q.append("A")          # в конец
q.append("B")
q.append("C")
print(q.popleft())     # из начала — O(1)
q.appendleft("Z")      # в начало
print(list(q), q[0], q[-1])`, "A\n['Z', 'B', 'C'] Z C"),
        ],
      },
      {
        id: 'design',
        title: 'Задачи на проектирование структур',
        blocks: [
          p('Задача «спроектируй структуру данных» (design) проверяет, умеешь ли ты выбрать внутреннее представление под требуемые операции. Порядок работы на собеседовании:'),
          steps(
            'Выписать все операции и требуемую сложность каждой.',
            'Выбрать хранилище: список, deque, словарь, несколько структур сразу.',
            'Продумать граничные случаи: пустая структура, переполнение, повторные элементы.',
            'Назвать сложность каждой операции и памяти.',
          ),
          h('Очередь из двух стеков'),
          p('Стек `in` принимает новые элементы, стек `out` отдаёт. Когда `out` пуст, перекладываем в него **все** элементы из `in` — порядок переворачивается, и самый старый элемент оказывается на вершине `out`.'),
          shell(`push 1, 2, 3:   in = [1, 2, 3]   out = []
pop:            out пуст → перекладываем: in = []   out = [3, 2, 1] → отдаём 1
push 4:         in = [4]         out = [3, 2]
pop:            out не пуст → отдаём 2`, 'Схема'),
          p('Перекладывание иногда стоит `O(n)`, но каждый элемент перекладывается **ровно один раз** за всю жизнь. Поэтому `n` операций занимают `O(n)` суммарно — **амортизированная** сложность одной операции `O(1)`.'),
          h('Кольцевой буфер'),
          p('Очередь фиксированного размера `k` хранят в массиве из `k` ячеек с индексом начала `head` и числом элементов `size`. Конец очереди — `(head + size) % k`: индексы «заворачиваются» по кругу, и место освобождённых ячеек используется снова. Так устроены буферы в сетевых драйверах, аудио, логах.'),
          tip('В задачах с отметками времени (Number of Recent Calls) очередь хранит только «свежие» события: новые добавляются в конец, а устаревшие уходят из начала — это скользящее окно по времени.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a6t1',
        title: 'Implement Queue using Stacks',
        source: lc(232, 'implement-queue-using-stacks'),
        text: 'Реализуй очередь `MyQueue` на двух стеках (списках Python, только `append`, `pop()` и `[-1]`): `push(x)` — в конец, `pop()` — забрать из начала и вернуть, `peek()` — первый элемент, `empty()` — пуста ли очередь. Амортизированно все операции — `O(1)`.',
        starter: starter(`
class MyQueue:
    def __init__(self):
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def peek(self) -> int:
        pass

    def empty(self) -> bool:
        pass
`),
        examples: [{ call: 'q = MyQueue(); q.push(1); q.push(2); q.peek(), q.pop(), q.empty()', expected: '(1, 1, False)' }],
        tests: [
          { label: 'пример из условия', code: `q = MyQueue()
q.push(1); q.push(2)
__kiro_eq("peek()", q.peek(), 1)
__kiro_eq("pop()", q.pop(), 1)
__kiro_eq("empty()", q.empty(), False)` },
          { label: 'чередование push и pop', code: `q = MyQueue()
q.push(1); q.push(2); q.push(3)
__kiro_eq("pop()", q.pop(), 1)
q.push(4)
__kiro_eq("pop()", q.pop(), 2)
__kiro_eq("pop()", q.pop(), 3)
__kiro_eq("peek()", q.peek(), 4)
__kiro_eq("pop()", q.pop(), 4)
__kiro_eq("empty()", q.empty(), True)` },
          { label: 'Без deque — только списки', forbid: ['deque'] },
          { label: 'Без pop(0)', forbidRe: String.raw`\.pop\(\s*0\s*\)`, message: 'list.pop(0) сдвигает все элементы и стоит O(n) — очередь на двух стеках должна обходиться без него' },
          { label: '100 000 операций', perf: true, code: `q = MyQueue()
for i in range(100000):
    q.push(i)
s = 0
for _ in range(100000):
    s += q.pop()
__kiro_eq("сумма", s, 4999950000)` },
        ],
        solution: {
          text: 'Два стека: `inbox` для `push`, `outbox` для `pop` и `peek`. Когда `outbox` пуст, перекладываем в него всё из `inbox`.',
          code: `
class MyQueue:
    def __init__(self):
        self.inbox = []
        self.outbox = []

    def push(self, x):
        self.inbox.append(x)

    def _move(self):
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())

    def pop(self):
        self._move()
        return self.outbox.pop()

    def peek(self):
        self._move()
        return self.outbox[-1]

    def empty(self):
        return not self.inbox and not self.outbox
`,
          complexity: '`push` и `empty` — `O(1)`, `pop` и `peek` — амортизированно `O(1)`.',
          mistakes: [
            'Перекладывать элементы туда и обратно на каждой операции — `O(n)` на операцию.',
            'Перекладывать в `outbox`, когда он **не** пуст, — порядок элементов нарушится.',
          ],
        },
      },
      {
        id: 'a6t2',
        title: 'Implement Stack using Queues',
        source: lc(225, 'implement-stack-using-queues'),
        text: 'Реализуй стек `MyStack` на очереди `collections.deque`, используя только операции очереди: `append` (в конец), `popleft` (из начала), `q[0]` и `len`. Методы: `push(x)`, `pop()` — снять и вернуть верхний, `top()`, `empty()`.',
        starter: starter(`
from collections import deque

class MyStack:
    def __init__(self):
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def top(self) -> int:
        pass

    def empty(self) -> bool:
        pass
`),
        examples: [{ call: 's = MyStack(); s.push(1); s.push(2); s.top(), s.pop(), s.empty()', expected: '(2, 2, False)' }],
        tests: [
          { label: 'только операции очереди', forbid: ['.pop', '.appendleft'] },
          { label: 'пример из условия', code: `s = MyStack()
s.push(1); s.push(2)
__kiro_eq("top()", s.top(), 2)
__kiro_eq("pop()", s.pop(), 2)
__kiro_eq("empty()", s.empty(), False)` },
          { label: 'порядок LIFO', code: `s = MyStack()
for v in [1, 2, 3]:
    s.push(v)
__kiro_eq("pop()", s.pop(), 3)
s.push(4)
__kiro_eq("pop()", s.pop(), 4)
__kiro_eq("pop()", s.pop(), 2)
__kiro_eq("top()", s.top(), 1)
__kiro_eq("pop()", s.pop(), 1)
__kiro_eq("empty()", s.empty(), True)` },
        ],
        solution: {
          text: 'После добавления элемента в конец очереди «прокручиваем» очередь: перекладываем все прежние элементы из начала в конец. Новый элемент оказывается в начале — там, откуда очередь отдаёт элементы.',
          code: `
from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()

    def top(self):
        return self.q[0]

    def empty(self):
        return len(self.q) == 0
`,
          complexity: '`push` — `O(n)`, остальные операции — `O(1)`. Можно наоборот: `push` за `O(1)`, а прокручивать при `pop`.',
          mistakes: [
            'Использовать `pop()` с правого конца deque — это уже операция стека, а задача как раз про то, как обойтись без неё.',
          ],
        },
      },
      {
        id: 'a6t3',
        title: 'Design Circular Queue',
        source: lc(622, 'design-circular-queue'),
        text: 'Реализуй кольцевую очередь фиксированного размера `k` на списке длины `k`: `en_queue(value)` — добавить, вернуть `True` или `False`, если очередь полна; `de_queue()` — удалить из начала, вернуть `True` или `False`, если пуста; `front()` и `rear()` — первый и последний элементы, `-1` для пустой; `is_empty()`, `is_full()`. Все операции — `O(1)`.',
        starter: starter(`
class MyCircularQueue:
    def __init__(self, k: int):
        pass

    def en_queue(self, value: int) -> bool:
        pass

    def de_queue(self) -> bool:
        pass

    def front(self) -> int:
        pass

    def rear(self) -> int:
        pass

    def is_empty(self) -> bool:
        pass

    def is_full(self) -> bool:
        pass
`),
        examples: [{ call: 'q = MyCircularQueue(3); q.en_queue(1); q.en_queue(2); q.en_queue(3); q.en_queue(4)', expected: 'False' }],
        tests: [
          { label: 'пример из условия', code: `q = MyCircularQueue(3)
__kiro_eq("en_queue(1)", q.en_queue(1), True)
__kiro_eq("en_queue(2)", q.en_queue(2), True)
__kiro_eq("en_queue(3)", q.en_queue(3), True)
__kiro_eq("en_queue(4)", q.en_queue(4), False)
__kiro_eq("rear()", q.rear(), 3)
__kiro_eq("is_full()", q.is_full(), True)
__kiro_eq("de_queue()", q.de_queue(), True)
__kiro_eq("en_queue(4)", q.en_queue(4), True)
__kiro_eq("rear()", q.rear(), 4)
__kiro_eq("front()", q.front(), 2)` },
          { label: 'пустая очередь', code: `q = MyCircularQueue(2)
__kiro_eq("is_empty()", q.is_empty(), True)
__kiro_eq("front()", q.front(), -1)
__kiro_eq("rear()", q.rear(), -1)
__kiro_eq("de_queue()", q.de_queue(), False)` },
          { label: 'много кругов по буферу', code: `q = MyCircularQueue(3)
out = []
for i in range(10):
    q.en_queue(i)
    if q.is_full():
        out.append(q.front())
        q.de_queue()
__kiro_eq("снятые элементы", out, [0, 1, 2, 3, 4, 5, 6, 7])
__kiro_eq("front(), rear()", (q.front(), q.rear()), (8, 9))` },
          { label: 'размер 1', code: `q = MyCircularQueue(1)
__kiro_eq("en_queue(5)", q.en_queue(5), True)
__kiro_eq("is_full()", q.is_full(), True)
__kiro_eq("front(), rear()", (q.front(), q.rear()), (5, 5))
__kiro_eq("de_queue()", q.de_queue(), True)
__kiro_eq("is_empty()", q.is_empty(), True)` },
        ],
        solution: {
          text: 'Список из `k` ячеек, индекс начала `head` и число элементов `size`. Последний элемент — по индексу `(head + size − 1) % k`, новый записываем в `(head + size) % k`.',
          code: `
class MyCircularQueue:
    def __init__(self, k):
        self.buf = [0] * k
        self.k = k
        self.head = 0
        self.size = 0

    def en_queue(self, value):
        if self.is_full():
            return False
        self.buf[(self.head + self.size) % self.k] = value
        self.size += 1
        return True

    def de_queue(self):
        if self.is_empty():
            return False
        self.head = (self.head + 1) % self.k
        self.size -= 1
        return True

    def front(self):
        return -1 if self.is_empty() else self.buf[self.head]

    def rear(self):
        return -1 if self.is_empty() else self.buf[(self.head + self.size - 1) % self.k]

    def is_empty(self):
        return self.size == 0

    def is_full(self):
        return self.size == self.k
`,
          complexity: 'Все операции `O(1)`, память `O(k)`.',
          mistakes: [
            'Хранить только `head` и `tail` без `size` — пустую и полную очередь не различить (в обоих случаях `head == tail`).',
            'Забыть `% k` при вычислении индекса — выход за границы списка после первого круга.',
          ],
        },
      },
      {
        id: 'a6t4',
        title: 'Number of Recent Calls',
        source: lc(933, 'number-of-recent-calls'),
        text: 'Класс `RecentCounter` считает запросы за последние 3000 мс. Метод `ping(t)` добавляет запрос в момент `t` и возвращает, сколько запросов было в отрезке времени `[t − 3000, t]`. Каждый следующий `t` строго больше предыдущего.',
        starter: starter(`
from collections import deque

class RecentCounter:
    def __init__(self):
        pass

    def ping(self, t: int) -> int:
        pass
`),
        examples: [{ call: 'c = RecentCounter(); [c.ping(t) for t in [1, 100, 3001, 3002]]', expected: '[1, 2, 3, 3]' }],
        tests: [
          { label: 'пример из условия', code: `c = RecentCounter()
__kiro_eq("ответы", [c.ping(t) for t in [1, 100, 3001, 3002]], [1, 2, 3, 3])` },
          { label: 'граница окна включается', code: `c = RecentCounter()
__kiro_eq("ответы", [c.ping(t) for t in [1000, 4000, 4001, 7001]], [1, 2, 2, 2])` },
          { label: 'редкие запросы', code: `c = RecentCounter()
__kiro_eq("ответы", [c.ping(t) for t in [1, 5000, 10000]], [1, 1, 1])` },
          { label: '100 000 запросов', perf: true, code: `c = RecentCounter()
last = 0
for t in range(1, 100001):
    last = c.ping(t)
__kiro_eq("последний ответ", last, 3001)` },
        ],
        solution: {
          text: 'Очередь хранит времена запросов в окне. Новый запрос добавляем в конец, а из начала удаляем все запросы старше `t − 3000`. Ответ — длина очереди.',
          code: `
from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t):
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)
`,
          complexity: 'Амортизированно `O(1)` на `ping`: каждый запрос один раз добавляется и один раз удаляется. Память — не больше 3001 элемента.',
          mistakes: [
            'Хранить все запросы в списке и каждый раз пересчитывать подходящие — `O(n)` на запрос.',
            'Удалять через `list.pop(0)` — тоже `O(n)` за удаление.',
            'Строгое `<=` вместо `<`: запрос ровно в момент `t − 3000` должен учитываться.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 7
  {
    id: 'a7',
    week: 1,
    day: 7,
    title: 'Повторение и мини-контест недели 1',
    summary: 'Шпаргалка по паттернам недели: как по условию понять, какой приём нужен, и мини-контест из пяти задач с таймером 25 минут на каждую.',
    sections: [
      {
        id: 'cheatsheet',
        title: 'Шпаргалка недели',
        blocks: [
          table(['Паттерн', 'Признаки в условии', 'Сложность', 'Задачи недели'], [
            ['Два указателя навстречу', 'отсортированный массив, пара/тройка с суммой, палиндром', '`O(n)`', 'Two Sum II, 3Sum, Valid Palindrome'],
            ['Два указателя в одну сторону', 'изменить массив на месте, отфильтровать', '`O(n)`, `O(1)` памяти', 'Remove Duplicates, Move Zeroes'],
            ['Префиксные суммы', 'сумма отрезка, число подмассивов с суммой, есть отрицательные', '`O(n)`', 'Subarray Sum Equals K'],
            ['Скользящее окно', 'самый длинный/короткий подотрезок с условием', '`O(n)`', 'Longest Substring, Min Size Subarray'],
            ['Хеш-таблица', '«встречалось ли раньше», частоты, группировка', '`O(n)`', 'Two Sum, Group Anagrams'],
            ['Стек', 'скобки, вложенность, вычисление выражений', '`O(n)`', 'Valid Parentheses, RPN'],
            ['Монотонный стек', '«следующий больший/меньший элемент»', '`O(n)`', 'Daily Temperatures'],
            ['Очередь', 'FIFO, окно по времени, обход в ширину', '`O(1)` на операцию', 'Recent Calls'],
          ]),
        ],
      },
      {
        id: 'contest',
        title: 'Как проходить мини-контест',
        blocks: [
          p('Контест тренирует то, что проверяют на алгособесе: решить незнакомую задачу за ограниченное время, вслух объясняя ход мысли. У каждой задачи ниже — таймер на **25 минут**.'),
          steps(
            'Запусти таймер и прочитай условие. Выпиши пару своих примеров, включая граничные: пустой вход, один элемент, повторы.',
            'Назови наивное решение и его сложность. Подумай, какой паттерн из шпаргалки подходит.',
            'Напиши код, прогони на своих примерах кнопкой «Запустить», потом нажми «Проверить решение».',
            'Не уложился в 25 минут — открой разбор, разберись и через день реши задачу заново без подсказок.',
          ),
          h('Разбор ошибок'),
          p('После контеста выпиши для каждой задачи: сколько времени ушло, какой паттерн не сразу узнал, какие тесты упали и почему. Типичные причины: не учтён пустой вход, ошибка на единицу в границах, решение `O(n²)` вместо `O(n)`. Такой список — лучший план повторения.'),
          tip('Самые частые вопросы интервьюера после решения: «Какая сложность?», «Можно ли быстрее или с меньшей памятью?», «Что будет на пустом входе?». Готовь ответы заранее.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a7t1',
        title: 'Is Subsequence',
        source: lc(392, 'is-subsequence'),
        timer: 25,
        text: 'Проверь, является ли строка `s` **подпоследовательностью** строки `t`: её можно получить из `t` удалением некоторых символов без изменения порядка остальных.',
        starter: starter(`
def is_subsequence(s: str, t: str) -> bool:
    pass
`),
        examples: [
          { call: 'is_subsequence("abc", "ahbgdc")', expected: 'True' },
          { call: 'is_subsequence("axc", "ahbgdc")', expected: 'False' },
        ],
        tests: [
          { call: 'is_subsequence("abc", "ahbgdc")', expected: 'True' },
          { call: 'is_subsequence("axc", "ahbgdc")', expected: 'False' },
          { call: 'is_subsequence("", "ahbgdc")', expected: 'True' },
          { call: 'is_subsequence("aaa", "aa")', expected: 'False' },
          { call: 'is_subsequence("ace", "abcde")', expected: 'True' },
          { call: 'is_subsequence("b", "")', expected: 'False' },
        ],
        solution: {
          text: 'Два указателя в одном направлении: идём по `t`, и когда символ совпадает с очередным символом `s`, сдвигаем указатель в `s`. Если дошли до конца `s` — это подпоследовательность.',
          code: `
def is_subsequence(s, t):
    i = 0
    for ch in t:
        if i < len(s) and s[i] == ch:
            i += 1
    return i == len(s)
`,
          complexity: '`O(len(t))` по времени, `O(1)` памяти.',
          mistakes: [
            'Искать каждый символ `s` через `t.find(ch)` с начала строки — теряется порядок.',
            'Забыть проверку `i < len(s)` — выход за границы, когда `s` уже найдена целиком.',
          ],
        },
      },
      {
        id: 'a7t2',
        title: 'Backspace String Compare',
        source: lc(844, 'backspace-string-compare'),
        timer: 25,
        text: 'Строки `s` и `t` набирают в текстовом редакторе, символ `#` означает Backspace (удалить предыдущий символ; на пустом тексте ничего не делает). Совпадут ли итоговые тексты?',
        starter: starter(`
def backspace_compare(s: str, t: str) -> bool:
    pass
`),
        examples: [
          { call: 'backspace_compare("ab#c", "ad#c")', expected: 'True' },
          { call: 'backspace_compare("a#c", "b")', expected: 'False' },
        ],
        tests: [
          { call: 'backspace_compare("ab#c", "ad#c")', expected: 'True' },
          { call: 'backspace_compare("ab##", "c#d#")', expected: 'True' },
          { call: 'backspace_compare("a#c", "b")', expected: 'False' },
          { call: 'backspace_compare("###a", "a")', expected: 'True' },
          { call: 'backspace_compare("xywrrmp", "xywrrmu#p")', expected: 'True' },
          { call: 'backspace_compare("bxj##tw", "bxo#j##tw")', expected: 'True' },
        ],
        solution: {
          text: 'Стек: обычный символ кладём, `#` снимает последний символ, если он есть. Сравниваем получившиеся стеки.',
          code: `
def backspace_compare(s, t):
    def build(text):
        stack = []
        for ch in text:
            if ch == "#":
                if stack:
                    stack.pop()
            else:
                stack.append(ch)
        return stack
    return build(s) == build(t)
`,
          complexity: '`O(n + m)` по времени и памяти. Есть решение за `O(1)` памяти — два указателя с конца строк, пропускающие удалённые символы.',
          mistakes: [
            'Не проверить пустой стек перед `pop()` — ошибка на строке `"###a"`.',
            'Удалять символы из строки через срезы в цикле — `O(n²)`.',
          ],
        },
      },
      {
        id: 'a7t3',
        title: 'Majority Element',
        source: lc(169, 'majority-element'),
        timer: 25,
        text: 'Найди элемент, который встречается в `nums` **больше** `n / 2` раз. Он гарантированно существует.',
        starter: starter(`
def majority_element(nums: list[int]) -> int:
    pass
`),
        examples: [{ call: 'majority_element([2, 2, 1, 1, 1, 2, 2])', expected: '2' }],
        tests: [
          { call: 'majority_element([3, 2, 3])', expected: '3' },
          { call: 'majority_element([2, 2, 1, 1, 1, 2, 2])', expected: '2' },
          { call: 'majority_element([5])', expected: '5' },
          { call: 'majority_element([-1, -1, 4])', expected: '-1' },
          { label: 'большой массив', perf: true, code: `nums = [7] * 50001 + list(range(49999))
__kiro_eq("majority_element(большой)", majority_element(nums), 7)` },
        ],
        solution: {
          text: 'Хеш-таблица частот работает за `O(n)` памяти. Красивее — **алгоритм голосования Бойера — Мура** за `O(1)` памяти: держим кандидата и счётчик; одинаковый элемент увеличивает счётчик, другой — уменьшает; при нуле берём нового кандидата. Элемент большинства «переживает» все сокращения.',
          code: `
def majority_element(nums):
    candidate, count = None, 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            '`nums.count(x)` для каждого элемента — `O(n²)`.',
            'Взять `sorted(nums)[n // 2]` — верно, но это `O(n log n)`; хорошо назвать как вариант, но спросят про линейное решение.',
          ],
        },
      },
      {
        id: 'a7t4',
        title: 'Next Greater Element I',
        source: lc(496, 'next-greater-element-i'),
        timer: 25,
        text: 'Все числа различны, `nums1` — подмножество `nums2`. Для каждого `x` из `nums1` найди в `nums2` первый элемент **правее** `x`, который больше `x`, или `-1`. Верни ответы в порядке `nums1`.',
        starter: starter(`
def next_greater_element(nums1: list[int], nums2: list[int]) -> list[int]:
    pass
`),
        examples: [{ call: 'next_greater_element([4, 1, 2], [1, 3, 4, 2])', expected: '[-1, 3, -1]' }],
        tests: [
          { call: 'next_greater_element([4, 1, 2], [1, 3, 4, 2])', expected: '[-1, 3, -1]' },
          { call: 'next_greater_element([2, 4], [1, 2, 3, 4])', expected: '[3, -1]' },
          { call: 'next_greater_element([1, 3, 5, 2, 4], [6, 5, 4, 3, 2, 1, 7])', expected: '[7, 7, 7, 7, 7]' },
          { call: 'next_greater_element([], [1, 2])', expected: '[]' },
          { label: 'большой массив', perf: true, code: `nums2 = list(range(100000, 0, -1)) + [100001]
res = next_greater_element(nums2[:-1], nums2)
__kiro_eq("все ответы равны 100001", set(res), {100001})` },
        ],
        solution: {
          text: 'Монотонный стек по `nums2` находит «следующий больший» для каждого числа за один проход; ответы складываем в словарь и затем читаем для `nums1`.',
          code: `
def next_greater_element(nums1, nums2):
    nxt = {}
    stack = []
    for x in nums2:
        while stack and stack[-1] < x:
            nxt[stack.pop()] = x
        stack.append(x)
    return [nxt.get(x, -1) for x in nums1]
`,
          complexity: '`O(n + m)` по времени и `O(m)` памяти.',
          mistakes: [
            'Для каждого `x` из `nums1` искать его в `nums2` и идти вправо — `O(n · m)`.',
          ],
        },
      },
      {
        id: 'a7t5',
        title: 'Find All Anagrams in a String',
        source: lc(438, 'find-all-anagrams-in-a-string'),
        timer: 25,
        text: 'Найди все начальные индексы подстрок `s`, которые являются анаграммами `p`. Верни их в порядке возрастания. Ожидается `O(n)` — скользящее окно длины `len(p)` со счётчиками букв.',
        starter: starter(`
def find_anagrams(s: str, p: str) -> list[int]:
    pass
`),
        examples: [{ call: 'find_anagrams("cbaebabacd", "abc")', expected: '[0, 6]' }],
        tests: [
          { call: 'find_anagrams("cbaebabacd", "abc")', expected: '[0, 6]' },
          { call: 'find_anagrams("abab", "ab")', expected: '[0, 1, 2]' },
          { call: 'find_anagrams("a", "ab")', expected: '[]' },
          { call: 'find_anagrams("aaaa", "aa")', expected: '[0, 1, 2]' },
          { label: 'большая строка', perf: true, code: `s = "ab" * 50000
res = find_anagrams(s, "ab" * 5000)
__kiro_eq("число вхождений", len(res), 90001)` },
        ],
        solution: {
          text: 'Окно фиксированной длины `len(p)`. Держим счётчик букв окна и сравниваем его со счётчиком `p`. При сдвиге окна добавляем вошедшую букву и убираем вышедшую.',
          code: `
from collections import Counter

def find_anagrams(s, p):
    k = len(p)
    need = Counter(p)
    window = Counter(s[:k])
    res = [0] if window == need and len(s) >= k else []
    for i in range(k, len(s)):
        window[s[i]] += 1
        window[s[i - k]] -= 1
        if window[s[i - k]] == 0:
            del window[s[i - k]]
        if window == need:
            res.append(i - k + 1)
    return res
`,
          complexity: '`O(n · A)`, где `A` — размер алфавита (сравнение счётчиков); при 26 буквах это `O(n)`.',
          mistakes: [
            'Для каждой позиции заново считать `Counter(s[i:i + k])` — `O(n · k)`.',
            'Не удалять из счётчика буквы с нулевой частотой — сравнение `Counter` всё равно сработает, но с обычным `dict` ключи с нулём ломают равенство.',
          ],
        },
      },
    ],
  },
]
