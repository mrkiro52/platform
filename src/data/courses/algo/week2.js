// Курс «Алгоритмы: leetcode и алгособесы», неделя 2 — связные списки, поиск, сортировки, деревья.
// Формат урока — как в week1.js. Для задач на списки и деревья служебные классы
// ListNode и TreeNode приходят через prelude (helpers.js).

import { p, h, list, steps, py, shell, note, tip, warn, table, starter } from '../python/blocks'
import { LIST, TREE, COUNTING } from './helpers'

const lc = (num, slug) => ({ name: `LeetCode ${num}`, url: `https://leetcode.com/problems/${slug}/` })

const LIST_DOC = `# Узел списка уже определён на платформе:
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
`
const TREE_DOC = `# Узел дерева уже определён на платформе:
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
`

export default [
  // ═══════════════════════════════════════════════════════════════ День 8
  {
    id: 'a8',
    week: 2,
    day: 8,
    title: 'Односвязный список',
    summary: 'Устройство односвязного списка и сравнение с массивом, обход и изменение ссылок, фиктивная голова (dummy), разворот списка, слияние, приём «отстающий указатель», быстрый и медленный указатели.',
    sections: [
      {
        id: 'node',
        title: 'Как устроен связный список',
        blocks: [
          p('**Односвязный список** — цепочка узлов. Каждый узел хранит значение и ссылку на следующий узел; последний ссылается на `None`. Список задаётся ссылкой на первый узел — **голову** (head).'),
          shell(`head
 ↓
[1 | •]→[2 | •]→[3 | •]→ None
 val next`, 'Схема'),
          py(`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

head = ListNode(1, ListNode(2, ListNode(3)))
node = head
while node:                 # обход списка
    print(node.val, end=" ")
    node = node.next`, '1 2 3 '),
          table(['Операция', 'Массив (list)', 'Связный список'], [
            ['доступ к `i`-му элементу', '`O(1)`', '`O(i)` — нужно пройти от головы'],
            ['вставка/удаление в начале', '`O(n)` — сдвиг', '`O(1)` — поменять ссылку'],
            ['вставка после известного узла', '`O(n)`', '`O(1)`'],
            ['память', 'сплошной блок', 'по узлу на элемент, плюс ссылки'],
          ]),
          p('На собеседованиях связные списки проверяют аккуратность работы с указателями: легко потерять ссылку на хвост или зациклить список. Совет — рисовать узлы и стрелки на бумаге и проговаривать каждое присваивание.'),
        ],
      },
      {
        id: 'techniques',
        title: 'Основные приёмы',
        blocks: [
          h('Фиктивная голова (dummy)'),
          p('Когда голова списка может измениться (удаление первого узла, слияние), заводят фиктивный узел `dummy` перед головой. Все операции становятся одинаковыми — не нужно отдельно обрабатывать «первый узел». Ответ — `dummy.next`.'),
          h('Разворот списка'),
          p('Идём по списку и разворачиваем каждую стрелку, держа три указателя: `prev` (уже развёрнутая часть), `cur` (текущий узел) и `nxt` (сохраняем следующий, пока не потеряли).'),
          shell(`было:   None  1 → 2 → 3 → None
шаг 1:  None ← 1    2 → 3        prev = 1, cur = 2
шаг 2:  None ← 1 ← 2    3        prev = 2, cur = 3
шаг 3:  None ← 1 ← 2 ← 3         prev = 3 — новая голова`, 'Схема'),
          py(`class ListNode:
    def __init__(self, val=0, next=None):
        self.val, self.next = val, next

def reverse(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next      # 1. запомнить следующий
        cur.next = prev     # 2. развернуть стрелку
        prev = cur          # 3. сдвинуть prev
        cur = nxt           # 4. сдвинуть cur
    return prev

head = reverse(ListNode(1, ListNode(2, ListNode(3))))
print(head.val, head.next.val, head.next.next.val)`, '3 2 1'),
          h('Отстающий указатель'),
          p('Чтобы найти `n`-й узел **с конца** за один проход, первый указатель отпускают вперёд на `n` шагов, а потом двигают оба одновременно. Когда первый дойдёт до конца, второй окажется на `n` позиций левее.'),
          h('Быстрый и медленный указатели'),
          p('Медленный указатель (slow) шагает на 1 узел, быстрый (fast) — на 2. Когда быстрый дойдёт до конца, медленный будет **в середине**. А если в списке есть **цикл**, быстрый рано или поздно догонит медленного внутри цикла — это алгоритм Флойда («черепаха и заяц»).'),
          warn('Перед `fast.next.next` всегда проверяй `fast and fast.next` — иначе на конце списка будет обращение к `None.next`.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a8t1',
        title: 'Reverse Linked List',
        source: lc(206, 'reverse-linked-list'),
        prelude: LIST,
        text: 'Разверни односвязный список и верни новую голову. Попробуй итеративно за `O(1)` памяти.',
        starter: starter(`
${LIST_DOC}
def reverse_list(head):
    pass
`),
        examples: [{ call: 'list_to_array(reverse_list(build_list([1, 2, 3, 4, 5])))', expected: '[5, 4, 3, 2, 1]' }],
        tests: [
          { call: 'list_to_array(reverse_list(build_list([1, 2, 3, 4, 5])))', expected: '[5, 4, 3, 2, 1]' },
          { call: 'list_to_array(reverse_list(build_list([1, 2])))', expected: '[2, 1]' },
          { call: 'list_to_array(reverse_list(build_list([])))', expected: '[]' },
          { call: 'list_to_array(reverse_list(build_list([7])))', expected: '[7]' },
          { label: 'длинный список: 100 000 узлов', perf: true, code: `head = reverse_list(build_list(range(100000)))
__kiro_eq("первые значения", list_to_array(head)[:3], [99999, 99998, 99997])` },
        ],
        solution: {
          text: 'Три указателя `prev`, `cur`, `nxt`: запоминаем следующий узел, разворачиваем стрелку и сдвигаемся. Когда `cur` станет `None`, `prev` — новая голова.',
          code: `
def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. Рекурсивное решение тоже `O(n)`, но тратит `O(n)` памяти на стек вызовов и на длинном списке упрётся в ограничение глубины рекурсии.',
          mistakes: [
            'Развернуть стрелку до того, как сохранили `cur.next`, — остаток списка потерян.',
            'Вернуть `head` вместо `prev` — старая голова теперь последний узел.',
          ],
        },
      },
      {
        id: 'a8t2',
        title: 'Merge Two Sorted Lists',
        source: lc(21, 'merge-two-sorted-lists'),
        prelude: LIST,
        text: 'Даны головы двух отсортированных списков. Слей их в один отсортированный список, переиспользуя узлы, и верни голову.',
        starter: starter(`
${LIST_DOC}
def merge_two_lists(list1, list2):
    pass
`),
        examples: [{ call: 'list_to_array(merge_two_lists(build_list([1, 2, 4]), build_list([1, 3, 4])))', expected: '[1, 1, 2, 3, 4, 4]' }],
        tests: [
          { call: 'list_to_array(merge_two_lists(build_list([1, 2, 4]), build_list([1, 3, 4])))', expected: '[1, 1, 2, 3, 4, 4]' },
          { call: 'list_to_array(merge_two_lists(build_list([]), build_list([])))', expected: '[]' },
          { call: 'list_to_array(merge_two_lists(build_list([]), build_list([0])))', expected: '[0]' },
          { call: 'list_to_array(merge_two_lists(build_list([5, 6, 7]), build_list([1, 2])))', expected: '[1, 2, 5, 6, 7]' },
          { call: 'list_to_array(merge_two_lists(build_list([-3, 0, 10]), build_list([-5, 0, 2, 20])))', expected: '[-5, -3, 0, 0, 2, 10, 20]' },
        ],
        solution: {
          text: 'Фиктивная голова и указатель `tail` на конец результата. Пока оба списка не пусты, подцепляем меньший узел. В конце подцепляем остаток непустого списка целиком.',
          code: `
def merge_two_lists(list1, list2):
    dummy = ListNode()
    tail = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    tail.next = list1 or list2
    return dummy.next
`,
          complexity: '`O(n + m)` по времени, `O(1)` памяти.',
          mistakes: [
            'Без `dummy` приходится отдельно выбирать голову результата — лишний код и ошибки на пустых списках.',
            'Копировать значения в новый список Python и собирать заново — работает, но тратит `O(n + m)` памяти и не показывает работу со ссылками.',
          ],
        },
      },
      {
        id: 'a8t3',
        title: 'Remove Nth Node From End of List',
        source: lc(19, 'remove-nth-node-from-end-of-list'),
        prelude: LIST,
        text: 'Удали `n`-й узел **с конца** списка и верни голову. Гарантируется, что `n` не больше длины списка. Попробуй за один проход.',
        starter: starter(`
${LIST_DOC}
def remove_nth_from_end(head, n):
    pass
`),
        examples: [{ call: 'list_to_array(remove_nth_from_end(build_list([1, 2, 3, 4, 5]), 2))', expected: '[1, 2, 3, 5]' }],
        tests: [
          { call: 'list_to_array(remove_nth_from_end(build_list([1, 2, 3, 4, 5]), 2))', expected: '[1, 2, 3, 5]' },
          { call: 'list_to_array(remove_nth_from_end(build_list([1]), 1))', expected: '[]' },
          { call: 'list_to_array(remove_nth_from_end(build_list([1, 2]), 1))', expected: '[1]' },
          { call: 'list_to_array(remove_nth_from_end(build_list([1, 2]), 2))', expected: '[2]' },
          { call: 'list_to_array(remove_nth_from_end(build_list([1, 2, 3]), 3))', expected: '[2, 3]' },
        ],
        solution: {
          text: 'Фиктивная голова и два указателя. `fast` уходит вперёд на `n + 1` шаг от `dummy`, затем оба идут до конца. `slow` останавливается **перед** удаляемым узлом, и мы перешагиваем через него.',
          code: `
def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
`,
          complexity: '`O(L)` по времени за один проход, `O(1)` памяти.',
          mistakes: [
            'Без `dummy` не получится удалить первый узел (тест `[1, 2]`, `n = 2`).',
            'Отпустить `fast` вперёд на `n` шагов вместо `n + 1` — `slow` остановится на удаляемом узле, а не перед ним.',
          ],
        },
      },
      {
        id: 'a8t4',
        title: 'Middle of the Linked List',
        source: lc(876, 'middle-of-the-linked-list'),
        prelude: LIST,
        text: 'Верни средний узел списка. Если узлов чётное число, верни **второй** из двух средних.',
        starter: starter(`
${LIST_DOC}
def middle_node(head):
    pass
`),
        examples: [{ call: 'middle_node(build_list([1, 2, 3, 4, 5, 6])).val', expected: '4' }],
        tests: [
          { call: 'middle_node(build_list([1, 2, 3, 4, 5])).val', expected: '3' },
          { call: 'middle_node(build_list([1, 2, 3, 4, 5, 6])).val', expected: '4' },
          { call: 'middle_node(build_list([1])).val', expected: '1' },
          { call: 'middle_node(build_list([1, 2])).val', expected: '2' },
          { label: 'возвращается узел, а не копия', code: `head = build_list([10, 20, 30])
assert middle_node(head) is head.next, "нужно вернуть узел самого списка"` },
        ],
        solution: {
          text: 'Быстрый указатель шагает через узел, медленный — на один. Когда быстрый дойдёт до конца, медленный — в середине.',
          code: `
def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. Вариант с подсчётом длины и вторым проходом тоже `O(n)`, но делает два прохода.',
          mistakes: [
            'Условие `while fast.next and fast.next.next` — на чётной длине вернётся первый из средних, а нужен второй.',
          ],
        },
      },
      {
        id: 'a8t5',
        title: 'Linked List Cycle',
        source: lc(141, 'linked-list-cycle'),
        prelude: LIST,
        text: 'Определи, есть ли в списке цикл — узел, по ссылкам из которого можно снова прийти в него. Нужно `O(1)` дополнительной памяти.',
        starter: starter(`
${LIST_DOC}
def has_cycle(head) -> bool:
    pass
`),
        examples: [{ call: 'head = build_list([3, 2, 0, -4]); node_at(head, 3).next = node_at(head, 1); has_cycle(head)', expected: 'True' }],
        tests: [
          { label: 'цикл в середину', code: `head = build_list([3, 2, 0, -4])
node_at(head, 3).next = node_at(head, 1)
__kiro_eq("has_cycle", has_cycle(head), True)` },
          { label: 'цикл из двух узлов', code: `head = build_list([1, 2])
node_at(head, 1).next = head
__kiro_eq("has_cycle", has_cycle(head), True)` },
          { label: 'без цикла', code: `__kiro_eq("has_cycle([1, 2, 3])", has_cycle(build_list([1, 2, 3])), False)` },
          { label: 'пустой список', code: `__kiro_eq("has_cycle(None)", has_cycle(None), False)` },
          { label: 'узел ссылается сам на себя', code: `head = build_list([1])
head.next = head
__kiro_eq("has_cycle", has_cycle(head), True)` },
          { label: 'длинный список без цикла', perf: true, code: `__kiro_eq("has_cycle(100 000 узлов)", has_cycle(build_list(range(100000))), False)` },
        ],
        solution: {
          text: 'Алгоритм Флойда: медленный шагает на 1, быстрый на 2. Если цикла нет, быстрый дойдёт до `None`. Если есть — внутри цикла расстояние между ними сокращается на 1 за шаг, и быстрый догонит медленного.',
          code: `
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. Решение с множеством посещённых узлов тоже `O(n)`, но тратит `O(n)` памяти.',
          mistakes: [
            'Сравнивать значения `slow.val == fast.val` — разные узлы могут иметь одинаковые значения. Нужно сравнивать сами узлы через `is`.',
            'Проверять встречу до первого шага — при старте оба указателя на голове, и ответ всегда будет `True`.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 9
  {
    id: 'a9',
    week: 2,
    day: 9,
    title: 'Связные списки: быстрый и медленный указатели',
    summary: 'Поиск начала цикла по Флойду и почему он работает, разрезание списка посередине, разворот второй половины, проверка палиндрома и перестановка узлов, пересечение двух списков.',
    sections: [
      {
        id: 'floyd',
        title: 'Начало цикла: вторая фаза Флойда',
        blocks: [
          p('Вчера мы узнали, **есть ли** цикл. Чтобы найти узел, **с которого он начинается**, после встречи указателей ставим один из них обратно на голову и двигаем оба **по одному** шагу. Они встретятся ровно в начале цикла.'),
          p('Почему: пусть от головы до начала цикла `a` шагов, от начала цикла до точки встречи `b`, длина цикла `c`. Медленный прошёл `a + b`, быстрый — вдвое больше: `2(a + b)`. Быстрый сделал лишние целые круги: `2(a + b) − (a + b) = k·c`, откуда `a = k·c − b`. Значит, от точки встречи до начала цикла (по ходу движения) столько же шагов по модулю круга, сколько от головы — `a`.'),
          shell(`голова → ● → ● → ◉ начало цикла
                  ↗     ↘
                 ●       ●
                  ↖     ↙
                    ★ ← ●      ★ — точка встречи
a = путь от головы до ◉ = путь от ★ до ◉ (с точностью до целых кругов)`, 'Схема'),
        ],
      },
      {
        id: 'split',
        title: 'Разрезать, развернуть, соединить',
        blocks: [
          p('Многие задачи на списки собираются из трёх кирпичиков, которые уже знакомы:'),
          steps(
            '**Найти середину** быстрым и медленным указателями.',
            '**Развернуть** вторую половину (день 8).',
            '**Пройти две половины параллельно**: сравнить (палиндром) или переплести (перестановка узлов).',
          ),
          p('Это даёт `O(n)` по времени и `O(1)` памяти. Решение «скопировать значения в обычный список Python» тоже `O(n)`, но тратит `O(n)` памяти — на собеседовании обычно просят улучшить.'),
          h('Пересечение двух списков'),
          p('Два списка могут **сливаться** в общий хвост. Красивый приём: два указателя идут каждый по своему списку, а дойдя до конца, переходят на голову **другого** списка. Оба пройдут одинаковое расстояние `a + c + b` и встретятся в первом общем узле (или одновременно станут `None`, если пересечения нет).'),
          shell(`A:  a1 → a2 ↘
               c1 → c2 → c3        путь первого:  a1 a2 c1 c2 c3 | b1 b2 b3 c1
B:  b1 → b2 → b3 ↗                 путь второго:  b1 b2 b3 c1 c2 c3 | a1 a2 c1
                                                встреча в c1`, 'Схема'),
          note('Узлы сравниваем через `is` — это один и тот же объект в памяти, а не просто одинаковые значения.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a9t1',
        title: 'Linked List Cycle II',
        source: lc(142, 'linked-list-cycle-ii'),
        prelude: LIST,
        text: 'Верни узел, с которого начинается цикл, или `None`, если цикла нет. Список менять нельзя, дополнительная память — `O(1)`.',
        starter: starter(`
${LIST_DOC}
def detect_cycle(head):
    pass
`),
        examples: [{ call: 'head = build_list([3, 2, 0, -4]); node_at(head, 3).next = node_at(head, 1); detect_cycle(head).val', expected: '2' }],
        tests: [
          { label: 'цикл с узла 1', code: `head = build_list([3, 2, 0, -4])
node_at(head, 3).next = node_at(head, 1)
assert detect_cycle(head) is node_at(head, 1), "начало цикла — узел с индексом 1"` },
          { label: 'цикл с головы', code: `head = build_list([1, 2])
node_at(head, 1).next = head
assert detect_cycle(head) is head, "начало цикла — голова"` },
          { label: 'без цикла', code: `__kiro_eq("detect_cycle([1])", detect_cycle(build_list([1])), None)` },
          { label: 'длинный хвост до цикла', code: `head = build_list(range(50))
node_at(head, 49).next = node_at(head, 37)
assert detect_cycle(head) is node_at(head, 37), "начало цикла — узел с индексом 37"` },
          { label: 'пустой список', code: `__kiro_eq("detect_cycle(None)", detect_cycle(None), None)` },
        ],
        solution: {
          text: 'Сначала находим встречу быстрого и медленного указателей. Затем один указатель ставим на голову и двигаем оба по одному шагу — они встретятся в начале цикла.',
          code: `
def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            ptr = head
            while ptr is not slow:
                ptr = ptr.next
                slow = slow.next
            return ptr
    return None
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. С множеством посещённых узлов — `O(n)` памяти: первый узел, который уже был в множестве, и есть начало цикла.',
          mistakes: [
            'Вернуть точку встречи — она лежит где-то внутри цикла, а не в его начале.',
            'Во второй фазе двигать быстрый указатель по-прежнему на 2 шага.',
          ],
        },
      },
      {
        id: 'a9t2',
        title: 'Palindrome Linked List',
        source: lc(234, 'palindrome-linked-list'),
        prelude: LIST,
        text: 'Проверь, является ли список палиндромом — читается одинаково в обе стороны. Попробуй за `O(n)` времени и `O(1)` памяти.',
        starter: starter(`
${LIST_DOC}
def is_palindrome_list(head) -> bool:
    pass
`),
        examples: [{ call: 'is_palindrome_list(build_list([1, 2, 2, 1]))', expected: 'True' }],
        tests: [
          { call: 'is_palindrome_list(build_list([1, 2, 2, 1]))', expected: 'True' },
          { call: 'is_palindrome_list(build_list([1, 2]))', expected: 'False' },
          { call: 'is_palindrome_list(build_list([1, 2, 3, 2, 1]))', expected: 'True' },
          { call: 'is_palindrome_list(build_list([1]))', expected: 'True' },
          { call: 'is_palindrome_list(build_list([1, 2, 3, 1]))', expected: 'False' },
          { label: 'длинный палиндром', perf: true, code: `vals = list(range(50000)) + list(range(49999, -1, -1))
__kiro_eq("is_palindrome_list(100 000 узлов)", is_palindrome_list(build_list(vals)), True)` },
        ],
        solution: {
          text: 'Находим середину, разворачиваем вторую половину и сравниваем её с первой по узлам.',
          code: `
def is_palindrome_list(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    prev = None
    while slow:
        nxt = slow.next
        slow.next = prev
        prev = slow
        slow = nxt
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    return True
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. Хорошим тоном считается развернуть вторую половину обратно, чтобы не портить входной список.',
          mistakes: [
            'Сравнивать, пока `left` не станет `None`, — после разворота первая половина всё ещё указывает на средний узел; сравнивать нужно, пока не кончится развёрнутая половина.',
          ],
        },
      },
      {
        id: 'a9t3',
        title: 'Reorder List',
        source: lc(143, 'reorder-list'),
        prelude: LIST,
        text: 'Переставь узлы списка `L0 → L1 → … → Ln` в порядке `L0 → Ln → L1 → Ln−1 → L2 → …`. Менять значения нельзя — только ссылки. Функция ничего не возвращает.',
        starter: starter(`
${LIST_DOC}
def reorder_list(head) -> None:
    pass
`),
        examples: [{ call: 'head = build_list([1, 2, 3, 4]); reorder_list(head); list_to_array(head)', expected: '[1, 4, 2, 3]' }],
        tests: [
          { label: '[1, 2, 3, 4]', code: `head = build_list([1, 2, 3, 4])
reorder_list(head)
__kiro_eq("список", list_to_array(head), [1, 4, 2, 3])` },
          { label: '[1, 2, 3, 4, 5]', code: `head = build_list([1, 2, 3, 4, 5])
reorder_list(head)
__kiro_eq("список", list_to_array(head), [1, 5, 2, 4, 3])` },
          { label: 'один и два узла', code: `a = build_list([1]); reorder_list(a)
b = build_list([1, 2]); reorder_list(b)
__kiro_eq("списки", (list_to_array(a), list_to_array(b)), ([1], [1, 2]))` },
          { label: 'значения не меняются местами', code: `head = build_list([10, 20, 30])
nodes = [head, head.next, head.next.next]
reorder_list(head)
assert head is nodes[0] and head.next is nodes[2] and head.next.next is nodes[1], "нужно переставить узлы, а не значения"` },
        ],
        solution: {
          text: 'Три шага: найти середину, развернуть вторую половину, переплести половины, поочерёдно подцепляя узлы.',
          code: `
def reorder_list(head):
    if not head or not head.next:
        return
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    second = slow.next
    slow.next = None
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt
    first, second = head, prev
    while second:
        n1, n2 = first.next, second.next
        first.next = second
        second.next = n1
        first, second = n1, n2
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Не разорвать связь между половинами (`slow.next = None`) — получится цикл.',
            'Сложить узлы в обычный список Python и переставить по индексам — работает за `O(n)` памяти; на собеседовании попросят без неё.',
          ],
        },
      },
      {
        id: 'a9t4',
        title: 'Intersection of Two Linked Lists',
        source: lc(160, 'intersection-of-two-linked-lists'),
        prelude: LIST,
        text: 'Даны головы двух списков. Верни узел, с которого они сливаются в общий хвост, или `None`. Списки менять нельзя, нужно `O(1)` памяти.',
        starter: starter(`
${LIST_DOC}
def get_intersection_node(head_a, head_b):
    pass
`),
        examples: [{ call: 'общий хвост [8, 4, 5]: A = [4, 1] + хвост, B = [5, 6, 1] + хвост', expected: 'узел 8' }],
        tests: [
          { label: 'общий хвост [8, 4, 5]', code: `tail = build_list([8, 4, 5])
a = build_list([4, 1]); node_at(a, 1).next = tail
b = build_list([5, 6, 1]); node_at(b, 2).next = tail
assert get_intersection_node(a, b) is tail, "пересечение — узел 8"` },
          { label: 'без пересечения', code: `__kiro_eq("пересечение", get_intersection_node(build_list([2, 6, 4]), build_list([1, 5])), None)` },
          { label: 'один список — хвост другого', code: `b = build_list([3])
a = build_list([1, 2]); node_at(a, 1).next = b
assert get_intersection_node(a, b) is b, "пересечение — узел 3"` },
          { label: 'одинаковые значения без пересечения', code: `__kiro_eq("пересечение", get_intersection_node(build_list([1, 2, 3]), build_list([1, 2, 3])), None)` },
        ],
        solution: {
          text: 'Два указателя: каждый идёт по своему списку, а на конце перепрыгивает на голову другого. Оба пройдут `a + b + c` шагов и встретятся в точке пересечения или одновременно в `None`.',
          code: `
def get_intersection_node(head_a, head_b):
    p, q = head_a, head_b
    while p is not q:
        p = p.next if p else head_b
        q = q.next if q else head_a
    return p
`,
          complexity: '`O(n + m)` по времени, `O(1)` памяти.',
          mistakes: [
            'Сравнивать значения, а не узлы: списки `[1, 2, 3]` и `[1, 2, 3]` без общих узлов не пересекаются.',
            'Перепрыгивать на голову своего же списка — указатели никогда не выровняются.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 10
  {
    id: 'a10',
    week: 2,
    day: 10,
    title: 'Двусвязный список и LRU-кеш',
    summary: 'Двусвязный список, сторожевые узлы head и tail, вставка и удаление за O(1), проектирование LRU-кеша из хеш-таблицы и двусвязного списка — одна из самых частых задач на собеседованиях.',
    sections: [
      {
        id: 'dll',
        title: 'Двусвязный список',
        blocks: [
          p('В **двусвязном** списке каждый узел знает и следующий, и **предыдущий** узел. За это платим лишней ссылкой, но получаем главное: зная сам узел, его можно **удалить за `O(1)`**, не ища предыдущий от головы.'),
          shell(`None ← [A] ⇄ [B] ⇄ [C] → None
удалить B:  A.next = C,  C.prev = A`, 'Схема'),
          h('Сторожевые узлы'),
          p('Чтобы не проверять каждый раз «а не голова ли это» и «а не хвост ли», заводят два фиктивных узла — `head` и `tail`, — которые никогда не удаляются. Настоящие элементы живут между ними, и вставка и удаление делаются одинаково для любого узла.'),
          py(`class Node:
    def __init__(self, val=0):
        self.val = val
        self.prev = self.next = None

head, tail = Node(), Node()       # сторожевые узлы
head.next, tail.prev = tail, head

def insert_after(node, new):
    new.prev, new.next = node, node.next
    node.next.prev = new
    node.next = new

def remove(node):
    node.prev.next = node.next
    node.next.prev = node.prev

a, b = Node("A"), Node("B")
insert_after(head, a)
insert_after(a, b)
remove(a)
print(head.next.val, tail.prev.val)`, 'B B'),
        ],
      },
      {
        id: 'lru',
        title: 'LRU-кеш',
        blocks: [
          p('**LRU-кеш** (Least Recently Used) хранит не больше `capacity` записей. Когда места нет, выбрасывается запись, к которой **дольше всего не обращались**. Так кешируют страницы, ответы API, данные в базах. На собеседовании просят: `get` и `put` — за `O(1)`.'),
          table(['Нужно', 'Структура'], [
            ['найти запись по ключу за `O(1)`', 'хеш-таблица `ключ → узел`'],
            ['помнить порядок использования и двигать запись в «самые свежие» за `O(1)`', 'двусвязный список'],
            ['выбросить самую старую запись за `O(1)`', 'узел у хвоста (или головы) списка'],
          ]),
          steps(
            '`get(key)`: нет ключа — вернуть `-1`. Есть — переставить узел в начало списка (самый свежий) и вернуть значение.',
            '`put(key, value)`: если ключ есть — обновить значение и переставить в начало. Если нет — создать узел, вставить в начало и записать в словарь.',
            'Если размер превысил `capacity` — удалить узел перед `tail` (самый старый) и из списка, и из словаря. Для этого узел хранит свой ключ.',
          ),
          tip('В Python есть `collections.OrderedDict` с методами `move_to_end` и `popitem(last=False)` — на нём LRU пишется в 10 строк. На собеседовании об этом стоит сказать, но обычно просят реализовать структуру вручную — именно это и тренирует задача.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a10t1',
        title: 'Design Linked List',
        source: lc(707, 'design-linked-list'),
        text: 'Реализуй класс `MyLinkedList` — список с нумерацией узлов с нуля. Методы: `get(index)` — значение или `-1`, если индекс неверный; `add_at_head(val)`; `add_at_tail(val)`; `add_at_index(index, val)` — вставить перед узлом с номером `index`; при `index == длине` — в конец, при `index > длины` — ничего не делать; `delete_at_index(index)` — удалить, если индекс верный. Используй собственные узлы, а не список Python.',
        starter: starter(`
class MyLinkedList:
    def __init__(self):
        pass

    def get(self, index: int) -> int:
        pass

    def add_at_head(self, val: int) -> None:
        pass

    def add_at_tail(self, val: int) -> None:
        pass

    def add_at_index(self, index: int, val: int) -> None:
        pass

    def delete_at_index(self, index: int) -> None:
        pass
`),
        examples: [{ call: 'l = MyLinkedList(); l.add_at_head(1); l.add_at_tail(3); l.add_at_index(1, 2); l.get(1)', expected: '2' }],
        tests: [
          { label: 'пример из условия', code: `l = MyLinkedList()
l.add_at_head(1); l.add_at_tail(3); l.add_at_index(1, 2)
__kiro_eq("get(1)", l.get(1), 2)
l.delete_at_index(1)
__kiro_eq("get(1)", l.get(1), 3)` },
          { label: 'неверные индексы', code: `l = MyLinkedList()
__kiro_eq("get(0) пустого", l.get(0), -1)
l.add_at_index(1, 5)
__kiro_eq("get(0) после add_at_index(1)", l.get(0), -1)
l.add_at_index(0, 7)
l.delete_at_index(3)
__kiro_eq("get(0)", l.get(0), 7)
__kiro_eq("get(-1)", l.get(-1), -1)` },
          { label: 'удаление головы и хвоста', code: `l = MyLinkedList()
for v in [1, 2, 3, 4]:
    l.add_at_tail(v)
l.delete_at_index(0)
l.delete_at_index(2)
__kiro_eq("значения", [l.get(i) for i in range(3)], [2, 3, -1])
l.add_at_index(2, 9)
__kiro_eq("значения", [l.get(i) for i in range(3)], [2, 3, 9])` },
          { label: 'вставки в начало', code: `l = MyLinkedList()
for v in [3, 2, 1]:
    l.add_at_head(v)
l.add_at_index(3, 4)
__kiro_eq("значения", [l.get(i) for i in range(4)], [1, 2, 3, 4])` },
        ],
        solution: {
          text: 'Односвязный список с фиктивной головой и счётчиком размера. Чтобы вставить или удалить элемент с номером `index`, доходим до узла **перед** ним — от `dummy` ровно `index` шагов.',
          code: `
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

class MyLinkedList:
    def __init__(self):
        self.dummy = Node(0)
        self.size = 0

    def _before(self, index):
        node = self.dummy
        for _ in range(index):
            node = node.next
        return node

    def get(self, index):
        if index < 0 or index >= self.size:
            return -1
        return self._before(index).next.val

    def add_at_head(self, val):
        self.add_at_index(0, val)

    def add_at_tail(self, val):
        self.add_at_index(self.size, val)

    def add_at_index(self, index, val):
        if index < 0 or index > self.size:
            return
        prev = self._before(index)
        prev.next = Node(val, prev.next)
        self.size += 1

    def delete_at_index(self, index):
        if index < 0 or index >= self.size:
            return
        prev = self._before(index)
        prev.next = prev.next.next
        self.size -= 1
`,
          complexity: '`get`, `add_at_index`, `delete_at_index` — `O(index)`; `add_at_head` — `O(1)`. Если хранить ещё и ссылку на хвост, `add_at_tail` станет `O(1)`.',
          mistakes: [
            'Не хранить размер и проверять границы обходом — лишний проход и ошибки на граничных индексах.',
            'Путать «вставить перед узлом `index`» и «после» — сдвиг на единицу во всех тестах.',
          ],
        },
      },
      {
        id: 'a10t2',
        title: 'LRU Cache',
        source: lc(146, 'lru-cache'),
        text: 'Реализуй `LRUCache(capacity)`: `get(key)` — значение по ключу или `-1`; `put(key, value)` — записать значение. Обращение через `get` или `put` делает ключ самым свежим. Если после добавления записей больше `capacity`, удали самую давно использованную. `get` и `put` — за `O(1)`. Реализуй через хеш-таблицу и двусвязный список, без `OrderedDict`.',
        starter: starter(`
class LRUCache:
    def __init__(self, capacity: int):
        pass

    def get(self, key: int) -> int:
        pass

    def put(self, key: int, value: int) -> None:
        pass
`),
        examples: [{ call: 'c = LRUCache(2); c.put(1, 1); c.put(2, 2); c.get(1); c.put(3, 3); c.get(2)', expected: '-1' }],
        tests: [
          { label: 'Без OrderedDict', forbid: ['OrderedDict'] },
          { label: 'пример из условия', code: `c = LRUCache(2)
c.put(1, 1); c.put(2, 2)
__kiro_eq("get(1)", c.get(1), 1)
c.put(3, 3)
__kiro_eq("get(2) — вытеснен", c.get(2), -1)
c.put(4, 4)
__kiro_eq("get(1) — вытеснен", c.get(1), -1)
__kiro_eq("get(3)", c.get(3), 3)
__kiro_eq("get(4)", c.get(4), 4)` },
          { label: 'put существующего ключа обновляет свежесть', code: `c = LRUCache(2)
c.put(1, 1); c.put(2, 2)
c.put(1, 10)
c.put(3, 3)
__kiro_eq("get(1)", c.get(1), 10)
__kiro_eq("get(2)", c.get(2), -1)` },
          { label: 'ёмкость 1', code: `c = LRUCache(1)
c.put(2, 1)
__kiro_eq("get(2)", c.get(2), 1)
c.put(3, 2)
__kiro_eq("get(2)", c.get(2), -1)
__kiro_eq("get(3)", c.get(3), 2)` },
          { label: '200 000 операций', perf: true, code: `c = LRUCache(50000)
for i in range(100000):
    c.put(i, i)
hits = sum(1 for i in range(100000) if c.get(i) != -1)
__kiro_eq("сколько ключей в кеше", hits, 50000)` },
        ],
        solution: {
          text: 'Словарь `ключ → узел` и двусвязный список со сторожевыми узлами. Самые свежие записи — у головы, самые старые — у хвоста. Узел хранит ключ, чтобы при вытеснении удалить его и из словаря.',
          code: `
class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.map = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_front(self, node):
        node.prev, node.next = self.head, self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        if key not in self.map:
            return -1
        node = self.map[key]
        self._remove(node)
        self._add_front(node)
        return node.val

    def put(self, key, value):
        if key in self.map:
            node = self.map[key]
            node.val = value
            self._remove(node)
            self._add_front(node)
            return
        node = Node(key, value)
        self.map[key] = node
        self._add_front(node)
        if len(self.map) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.map[lru.key]
`,
          complexity: '`get` и `put` — `O(1)`, память `O(capacity)`. Альтернатива на собеседовании: обычный `dict` в Python сохраняет порядок вставки, и удаление с повторной вставкой ключа тоже даёт `O(1)`, но интервьюер почти всегда попросит показать двусвязный список.',
          mistakes: [
            'Хранить порядок в обычном списке Python и удалять ключ через `list.remove` — `O(n)` на операцию.',
            'Не хранить ключ в узле — при вытеснении не получится удалить запись из словаря.',
            'Забыть сделать ключ свежим при `put` существующего ключа.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 11
  {
    id: 'a11',
    week: 2,
    day: 11,
    title: 'Двоичный поиск',
    summary: 'Идея двоичного поиска и O(log n), надёжный шаблон с инвариантом, поиск первой позиции по условию (lower bound), модуль bisect, двоичный поиск в повёрнутом отсортированном массиве.',
    sections: [
      {
        id: 'idea',
        title: 'Идея и шаблон',
        blocks: [
          p('**Двоичный поиск** находит элемент в **отсортированном** массиве, каждый раз отбрасывая половину: смотрим на средний элемент; если он меньше искомого, ответ правее, иначе — левее. За `k` шагов остаётся `n / 2ᵏ` элементов, поэтому шагов `log₂ n`. Для миллиона элементов — 20 сравнений вместо миллиона.'),
          py(`def binary_search(nums, target):
    left, right = 0, len(nums) - 1     # ищем на отрезке [left, right]
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1              # mid уже проверен — исключаем
        else:
            right = mid - 1
    return -1

print(binary_search([-1, 0, 3, 5, 9, 12], 9))
print(binary_search([-1, 0, 3, 5, 9, 12], 2))`, '4\n-1'),
          p('Главный источник ошибок — границы: бесконечный цикл или пропущенный элемент. Чтобы не путаться, выбери **один** шаблон и держи в голове **инвариант** — что верно для `left` и `right` на каждом шаге. В шаблоне выше: если ответ есть, он лежит на отрезке `[left, right]`.'),
          h('Поиск первой позиции по условию'),
          p('Чаще нужен не сам элемент, а **граница**: первая позиция, где условие становится истинным (первый элемент `≥ target`, первая «плохая» версия). Если условие монотонно — сначала везде `False`, потом везде `True`, — работает шаблон:'),
          py(`def first_true(lo, hi, cond):
    # первое x в [lo, hi], для которого cond(x) истинно; hi, если таких нет
    while lo < hi:
        mid = (lo + hi) // 2
        if cond(mid):
            hi = mid        # mid может быть ответом — оставляем
        else:
            lo = mid + 1    # mid точно не ответ
    return lo

nums = [1, 3, 5, 6]
print(first_true(0, len(nums), lambda i: nums[i] >= 5))   # место вставки 5
print(first_true(0, len(nums), lambda i: nums[i] >= 7))`, '2\n4'),
          tip('В модуле `bisect` есть готовые функции: `bisect_left(a, x)` — первая позиция, куда можно вставить `x`, сохранив порядок; `bisect_right` — последняя. На собеседовании их можно упомянуть, но реализацию обычно просят написать самому.'),
        ],
      },
      {
        id: 'rotated',
        title: 'Повёрнутый отсортированный массив',
        blocks: [
          p('Отсортированный массив «повернули»: `[0, 1, 2, 4, 5, 6, 7]` → `[4, 5, 6, 7, 0, 1, 2]`. Он больше не отсортирован целиком, но двоичный поиск всё равно работает: **одна из половин** вокруг `mid` всегда отсортирована.'),
          steps(
            'Если `nums[left] <= nums[mid]`, отсортирована левая половина. Если `target` лежит в её диапазоне `[nums[left], nums[mid])`, ищем слева, иначе — справа.',
            'Иначе отсортирована правая половина: проверяем, лежит ли `target` в `(nums[mid], nums[right]]`.',
          ),
          p('Минимум повёрнутого массива ищется ещё проще: сравниваем `nums[mid]` с `nums[right]`. Если `nums[mid] > nums[right]`, «обрыв» (а значит, и минимум) правее `mid`; иначе минимум в левой части, включая `mid`.'),
          warn('Решение `min(nums)` или `nums.index(target)` работает за `O(n)`. В задачах на двоичный поиск тесты платформы считают, сколько элементов прочитано: линейный проход не пройдёт.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a11t1',
        title: 'Binary Search',
        source: lc(704, 'binary-search'),
        prelude: COUNTING,
        text: 'Список `nums` отсортирован по возрастанию, все числа различны. Верни индекс `target` или `-1`. Нужно `O(log n)` — тесты проверяют, сколько элементов прочитано.',
        starter: starter(`
def search(nums: list[int], target: int) -> int:
    pass
`),
        examples: [{ call: 'search([-1, 0, 3, 5, 9, 12], 9)', expected: '4' }],
        tests: [
          { call: 'search([-1, 0, 3, 5, 9, 12], 9)', expected: '4' },
          { call: 'search([-1, 0, 3, 5, 9, 12], 2)', expected: '-1' },
          { call: 'search([5], 5)', expected: '0' },
          { call: 'search([2, 5], 1)', expected: '-1' },
          { label: 'O(log n): не больше 40 чтений на миллионе элементов', code: `nums = CountingList(range(0, 2000000, 2))
__kiro_eq("search(..., 1333332)", search(nums, 1333332), 666666)
__kiro_eq("search(..., 7)", search(nums, 7), -1)
assert nums.reads <= 200, f"прочитано {nums.reads} элементов — это не двоичный поиск"` },
        ],
        solution: {
          text: 'Классический шаблон на отрезке `[left, right]`: сравниваем средний элемент с `target` и отбрасываем половину.',
          code: `
def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
`,
          complexity: '`O(log n)` по времени, `O(1)` памяти.',
          mistakes: [
            '`left = mid` вместо `left = mid + 1` в этом шаблоне — бесконечный цикл, когда `left` и `right` соседние.',
            '`while left < right` в шаблоне с отрезком `[left, right]` — последний кандидат не проверяется.',
          ],
        },
      },
      {
        id: 'a11t2',
        title: 'Search Insert Position',
        source: lc(35, 'search-insert-position'),
        prelude: COUNTING,
        text: 'Список отсортирован, числа различны. Верни индекс `target`, если он есть, иначе — позицию, куда его нужно вставить, чтобы порядок сохранился. Нужно `O(log n)`.',
        starter: starter(`
def search_insert(nums: list[int], target: int) -> int:
    pass
`),
        examples: [
          { call: 'search_insert([1, 3, 5, 6], 5)', expected: '2' },
          { call: 'search_insert([1, 3, 5, 6], 2)', expected: '1' },
        ],
        tests: [
          { call: 'search_insert([1, 3, 5, 6], 5)', expected: '2' },
          { call: 'search_insert([1, 3, 5, 6], 2)', expected: '1' },
          { call: 'search_insert([1, 3, 5, 6], 7)', expected: '4' },
          { call: 'search_insert([1, 3, 5, 6], 0)', expected: '0' },
          { call: 'search_insert([1], 1)', expected: '0' },
          { label: 'O(log n) на миллионе элементов', code: `nums = CountingList(range(0, 3000000, 3))
__kiro_eq("search_insert(..., 1000000)", search_insert(nums, 1000000), 333334)
assert nums.reads <= 100, f"прочитано {nums.reads} элементов — это не двоичный поиск"` },
        ],
        solution: {
          text: 'Это поиск первой позиции, где `nums[i] >= target` (lower bound). Ищем на полуинтервале `[0, n)`: если `nums[mid] < target`, ответ правее `mid`, иначе `mid` может быть ответом.',
          code: `
def search_insert(nums, target):
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo
`,
          complexity: '`O(log n)` по времени, `O(1)` памяти. То же делает `bisect.bisect_left(nums, target)`.',
          mistakes: [
            'Начать с `hi = len(nums) - 1` — ответ «вставить в конец» (`len(nums)`) станет недостижимым.',
          ],
        },
      },
      {
        id: 'a11t3',
        title: 'First Bad Version',
        source: lc(278, 'first-bad-version'),
        text: 'Версии продукта пронумерованы `1, 2, …, n`. Начиная с какой-то версии, все следующие — плохие. Функция `is_bad_version(v)` уже определена и говорит, плохая ли версия `v`. Найди первую плохую версию, вызвав `is_bad_version` как можно меньше раз — `O(log n)`.',
        starter: starter(`
# is_bad_version(version) -> bool уже определена на платформе

def first_bad_version(n: int) -> int:
    pass
`),
        examples: [{ call: 'n = 5, плохие начиная с 4: first_bad_version(5)', expected: '4' }],
        tests: [
          { label: 'n = 5, первая плохая 4', code: `calls = 0
def is_bad_version(v):
    global calls
    calls += 1
    return v >= 4
__kiro_eq("first_bad_version(5)", first_bad_version(5), 4)` },
          { label: 'n = 1', code: `def is_bad_version(v):
    return v >= 1
__kiro_eq("first_bad_version(1)", first_bad_version(1), 1)` },
          { label: 'все версии плохие', code: `def is_bad_version(v):
    return True
__kiro_eq("first_bad_version(10)", first_bad_version(10), 1)` },
          { label: 'n = 2 147 483 647: не больше 35 вызовов', code: `calls = 0
def is_bad_version(v):
    global calls
    calls += 1
    return v >= 1702766719
__kiro_eq("first_bad_version(2147483647)", first_bad_version(2147483647), 1702766719)
assert calls <= 35, f"is_bad_version вызвана {calls} раз — это не двоичный поиск"` },
        ],
        solution: {
          text: 'Условие «версия плохая» монотонно: `False … False True … True`. Ищем первую позицию с `True` шаблоном `lo < hi`.',
          code: `
def first_bad_version(n):
    lo, hi = 1, n
    while lo < hi:
        mid = (lo + hi) // 2
        if is_bad_version(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
`,
          complexity: '`O(log n)` вызовов, `O(1)` памяти.',
          mistakes: [
            'Проверять версии подряд — до двух миллиардов вызовов.',
            'В других языках `(lo + hi) / 2` переполняет 32-битное целое — поэтому пишут `lo + (hi − lo) / 2`. В Python целые числа не переполняются, но вопрос любят задавать.',
          ],
        },
      },
      {
        id: 'a11t4',
        title: 'Search in Rotated Sorted Array',
        source: lc(33, 'search-in-rotated-sorted-array'),
        prelude: COUNTING,
        text: 'Отсортированный массив различных чисел повернули в неизвестной точке: `[0, 1, 2, 4, 5, 6, 7]` → `[4, 5, 6, 7, 0, 1, 2]`. Найди индекс `target` или верни `-1` за `O(log n)`.',
        starter: starter(`
def search_rotated(nums: list[int], target: int) -> int:
    pass
`),
        examples: [{ call: 'search_rotated([4, 5, 6, 7, 0, 1, 2], 0)', expected: '4' }],
        tests: [
          { call: 'search_rotated([4, 5, 6, 7, 0, 1, 2], 0)', expected: '4' },
          { call: 'search_rotated([4, 5, 6, 7, 0, 1, 2], 3)', expected: '-1' },
          { call: 'search_rotated([1], 0)', expected: '-1' },
          { call: 'search_rotated([3, 1], 1)', expected: '1' },
          { call: 'search_rotated([5, 1, 3], 5)', expected: '0' },
          { call: 'search_rotated([1, 2, 3, 4, 5], 4)', expected: '3' },
          { label: 'O(log n) на миллионе элементов', code: `nums = CountingList(list(range(600000, 1000000)) + list(range(600000)))
__kiro_eq("search_rotated(..., 123)", search_rotated(nums, 123), 400123)
__kiro_eq("search_rotated(..., 999999)", search_rotated(nums, 999999), 399999)
assert nums.reads <= 400, f"прочитано {nums.reads} элементов — это не двоичный поиск"` },
        ],
        solution: {
          text: 'В каждый момент одна из половин вокруг `mid` отсортирована. Определяем какая и проверяем, попадает ли `target` в её диапазон.',
          code: `
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1
`,
          complexity: '`O(log n)` по времени, `O(1)` памяти.',
          mistakes: [
            '`nums[left] < nums[mid]` вместо `<=` — ошибка, когда `left == mid` (тест `[3, 1]`).',
            'Строгие и нестрогие неравенства в проверке диапазона перепутаны — пропускается `target`, равный краю половины.',
          ],
        },
      },
      {
        id: 'a11t5',
        title: 'Find Minimum in Rotated Sorted Array',
        source: lc(153, 'find-minimum-in-rotated-sorted-array'),
        prelude: COUNTING,
        text: 'Отсортированный массив различных чисел повернули. Найди минимальный элемент за `O(log n)`.',
        starter: starter(`
def find_min(nums: list[int]) -> int:
    pass
`),
        examples: [{ call: 'find_min([3, 4, 5, 1, 2])', expected: '1' }],
        tests: [
          { call: 'find_min([3, 4, 5, 1, 2])', expected: '1' },
          { call: 'find_min([4, 5, 6, 7, 0, 1, 2])', expected: '0' },
          { call: 'find_min([11, 13, 15, 17])', expected: '11' },
          { call: 'find_min([2, 1])', expected: '1' },
          { call: 'find_min([7])', expected: '7' },
          { label: 'O(log n) на миллионе элементов', code: `nums = CountingList(list(range(777, 1000000)) + list(range(777)))
__kiro_eq("find_min", find_min(nums), 0)
assert nums.reads <= 120, f"прочитано {nums.reads} элементов — это не двоичный поиск"` },
        ],
        solution: {
          text: 'Сравниваем средний элемент с правым. Если `nums[mid] > nums[right]`, минимум правее `mid`; иначе — на отрезке `[left, mid]`.',
          code: `
def find_min(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return nums[left]
`,
          complexity: '`O(log n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Сравнивать с `nums[left]` — на неповёрнутом массиве (`[11, 13, 15, 17]`) логика ломается.',
            '`right = mid - 1` — можно выкинуть сам минимум.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 12
  {
    id: 'a12',
    week: 2,
    day: 12,
    title: 'Двоичный поиск по ответу и сортировки',
    summary: 'Двоичный поиск по ответу для задач «минимальное значение, при котором можно», сортировка в Python и ключи, слияние отсортированных массивов с конца, сортировка подсчётом и флаг Нидерландов, сортировка и слияние интервалов.',
    sections: [
      {
        id: 'answer',
        title: 'Двоичный поиск по ответу',
        blocks: [
          p('Иногда двоичный поиск идёт не по массиву, а по **множеству возможных ответов**. Признак задачи: «найди минимальную скорость / ёмкость / время, при которой можно уложиться». Если при скорости `k` уложиться можно, то при любой большей — тоже. Условие монотонно — значит, ищем первое `k`, где оно истинно.'),
          steps(
            'Определить границы ответа: минимально возможное и максимально нужное значение.',
            'Написать функцию `can(k)` — проверку, подходит ли ответ `k`. Обычно она работает за `O(n)`.',
            'Двоичным поиском найти первое `k`, для которого `can(k)` истинно.',
          ),
          p('Сложность — `O(n · log M)`, где `M` — размер диапазона ответов. Даже при `M = 10⁹` это всего ~30 проверок.'),
          py(`import math

def hours_needed(piles, k):
    return sum(math.ceil(p / k) for p in piles)

piles = [3, 6, 7, 11]
print([hours_needed(piles, k) for k in range(1, 8)])   # не растёт с ростом k`, '[27, 15, 10, 8, 8, 6, 5]'),
        ],
      },
      {
        id: 'sorting',
        title: 'Сортировки',
        blocks: [
          p('В Python `sorted(a)` возвращает новый список, `a.sort()` сортирует на месте. Внутри — **Timsort**: `O(n log n)`, **устойчивая** (равные элементы сохраняют порядок). Сортировать можно по ключу: `sorted(people, key=lambda p: (p.age, p.name))`.'),
          table(['Алгоритм', 'Время', 'Память', 'Когда спрашивают'], [
            ['сортировка слиянием', '`O(n log n)`', '`O(n)`', 'классика «разделяй и властвуй», устойчивая'],
            ['быстрая сортировка', '`O(n log n)` в среднем, `O(n²)` в худшем', '`O(log n)`', 'разбиение вокруг опорного элемента'],
            ['сортировка подсчётом', '`O(n + k)`', '`O(k)`', 'значения из маленького диапазона `k`'],
            ['пузырьком, вставками', '`O(n²)`', '`O(1)`', 'только для объяснения идеи'],
          ]),
          h('Слияние отсортированных массивов с конца'),
          p('Если результат нужно записать в первый массив, у которого в конце есть свободное место, заполняем его **с конца**: сравниваем наибольшие элементы и ставим больший на последнее свободное место. Так мы никогда не затрём ещё не обработанные элементы.'),
          h('Флаг Нидерландов: три указателя'),
          p('Задача Дейкстры: массив из трёх видов значений (0, 1, 2) отсортировать за один проход на месте. Три указателя: `low` — граница нулей, `high` — граница двоек, `mid` — текущий элемент. Ноль меняем с `low`, двойку — с `high`, единицу пропускаем.'),
          h('Сортировка интервалов'),
          p('Задачи на интервалы почти всегда начинаются с сортировки **по началу**. После неё пересекающиеся интервалы идут подряд, и их можно слить одним проходом: если начало очередного интервала не больше конца последнего слитого — расширяем последний, иначе начинаем новый.'),
          py(`intervals = [[8, 10], [1, 3], [2, 6], [15, 18]]
intervals.sort(key=lambda x: x[0])
merged = []
for start, end in intervals:
    if merged and start <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], end)
    else:
        merged.append([start, end])
print(merged)`, '[[1, 6], [8, 10], [15, 18]]'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a12t1',
        title: 'Koko Eating Bananas',
        source: lc(875, 'koko-eating-bananas'),
        text: 'Есть кучи бананов `piles`. За час Коко съедает до `k` бананов из одной кучи: если в куче меньше `k`, она съедает кучу целиком и до конца часа больше не ест. Найди минимальную целую скорость `k`, чтобы съесть все бананы за `h` часов (`h >= len(piles)`).',
        starter: starter(`
def min_eating_speed(piles: list[int], h: int) -> int:
    pass
`),
        examples: [{ call: 'min_eating_speed([3, 6, 7, 11], 8)', expected: '4' }],
        tests: [
          { call: 'min_eating_speed([3, 6, 7, 11], 8)', expected: '4' },
          { call: 'min_eating_speed([30, 11, 23, 4, 20], 5)', expected: '30' },
          { call: 'min_eating_speed([30, 11, 23, 4, 20], 6)', expected: '23' },
          { call: 'min_eating_speed([1], 10)', expected: '1' },
          { call: 'min_eating_speed([312884470], 312884469)', expected: '2' },
          { label: 'большие кучи: двоичный поиск по ответу', perf: true, code: `piles = [10**9] * 10000
__kiro_eq("min_eating_speed", min_eating_speed(piles, 10**6), 10**7)` },
        ],
        solution: {
          text: 'Чем больше скорость, тем меньше часов — условие монотонно. Ищем минимальное `k` от 1 до `max(piles)`, для которого `sum(ceil(p / k)) <= h`.',
          code: `
def min_eating_speed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        hours = sum((p + mid - 1) // mid for p in piles)
        if hours <= h:
            hi = mid
        else:
            lo = mid + 1
    return lo
`,
          complexity: '`O(n · log M)`, где `M = max(piles)`.',
          mistakes: [
            'Перебирать скорость от 1 вверх — до `10⁹` проверок.',
            'Округлять `p // k` вниз — куча из 7 бананов при `k = 4` требует 2 часа, а не 1. Для целых чисел `ceil(p / k) = (p + k − 1) // k`.',
          ],
        },
      },
      {
        id: 'a12t2',
        title: 'Merge Sorted Array',
        source: lc(88, 'merge-sorted-array'),
        text: 'Списки `nums1` и `nums2` отсортированы. В `nums1` первые `m` элементов — данные, а в конце `n` нулей — свободное место. Слей `nums2` (длины `n`) в `nums1` так, чтобы `nums1` стал отсортированным. На месте, за `O(m + n)`, без `sort` и `sorted`.',
        starter: starter(`
def merge_sorted(nums1: list[int], m: int, nums2: list[int], n: int) -> None:
    pass
`),
        examples: [{ call: 'a = [1, 2, 3, 0, 0, 0]; merge_sorted(a, 3, [2, 5, 6], 3); a', expected: '[1, 2, 2, 3, 5, 6]' }],
        tests: [
          { forbid: ['sorted', '.sort'], label: 'Без sorted() и .sort()' },
          { label: '[1, 2, 3] + [2, 5, 6]', code: `a = [1, 2, 3, 0, 0, 0]
merge_sorted(a, 3, [2, 5, 6], 3)
__kiro_eq("nums1", a, [1, 2, 2, 3, 5, 6])` },
          { label: 'nums2 пуст', code: `a = [1]
merge_sorted(a, 1, [], 0)
__kiro_eq("nums1", a, [1])` },
          { label: 'nums1 пуст', code: `a = [0]
merge_sorted(a, 0, [1], 1)
__kiro_eq("nums1", a, [1])` },
          { label: 'все из nums2 меньше', code: `a = [4, 5, 6, 0, 0, 0]
merge_sorted(a, 3, [1, 2, 3], 3)
__kiro_eq("nums1", a, [1, 2, 3, 4, 5, 6])` },
        ],
        solution: {
          text: 'Заполняем `nums1` с конца: три указателя — на последний элемент данных `nums1`, на последний `nums2` и на последнее свободное место. Ставим больший из двух элементов и сдвигаемся.',
          code: `
def merge_sorted(nums1, m, nums2, n):
    i, j, k = m - 1, n - 1, m + n - 1
    while j >= 0:
        if i >= 0 and nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
`,
          complexity: '`O(m + n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Заполнять с начала — затираются ещё не обработанные элементы `nums1`.',
            'Цикл `while i >= 0 and j >= 0` и забыть дописать остаток `nums2`, если он остался.',
          ],
        },
      },
      {
        id: 'a12t3',
        title: 'Sort Colors',
        source: lc(75, 'sort-colors'),
        text: 'В списке только числа 0, 1 и 2 (три цвета). Отсортируй его на месте за **один проход**, без `sort` и `sorted`.',
        starter: starter(`
def sort_colors(nums: list[int]) -> None:
    pass
`),
        examples: [{ call: 'a = [2, 0, 2, 1, 1, 0]; sort_colors(a); a', expected: '[0, 0, 1, 1, 2, 2]' }],
        tests: [
          { forbid: ['sorted', '.sort'], label: 'Без sorted() и .sort()' },
          { label: '[2, 0, 2, 1, 1, 0]', code: `a = [2, 0, 2, 1, 1, 0]
sort_colors(a)
__kiro_eq("nums", a, [0, 0, 1, 1, 2, 2])` },
          { label: '[2, 0, 1]', code: `a = [2, 0, 1]
sort_colors(a)
__kiro_eq("nums", a, [0, 1, 2])` },
          { label: 'один цвет', code: `a = [1, 1, 1]
sort_colors(a)
__kiro_eq("nums", a, [1, 1, 1])` },
          { label: 'много двоек в начале', code: `a = [2, 2, 2, 0, 1, 0]
ref = a
sort_colors(a)
__kiro_eq("nums", a, [0, 0, 1, 2, 2, 2])
assert a is ref, "сортировать нужно на месте"` },
        ],
        solution: {
          text: 'Флаг Нидерландов: `low` — куда ставить следующий 0, `high` — куда следующую 2, `mid` — текущий элемент. После обмена с `high` указатель `mid` не сдвигаем: пришедший элемент ещё не проверен.',
          code: `
def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 2:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
        else:
            mid += 1
`,
          complexity: '`O(n)` за один проход, `O(1)` памяти. Сортировка подсчётом (посчитать нули, единицы, двойки и переписать) тоже `O(n)`, но делает два прохода.',
          mistakes: [
            'Сдвигать `mid` после обмена с `high` — пришедшая с конца двойка или ноль останется не на месте.',
          ],
        },
      },
      {
        id: 'a12t4',
        title: 'Merge Intervals',
        source: lc(56, 'merge-intervals'),
        text: 'Слей все пересекающиеся интервалы `[start, end]` и верни список непересекающихся интервалов, покрывающих те же точки, отсортированный по началу. Интервалы, касающиеся концами (`[1, 4]` и `[4, 5]`), тоже сливаются.',
        starter: starter(`
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])', expected: '[[1, 6], [8, 10], [15, 18]]' }],
        tests: [
          { call: 'merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]])', expected: '[[1, 6], [8, 10], [15, 18]]' },
          { call: 'merge_intervals([[1, 4], [4, 5]])', expected: '[[1, 5]]' },
          { call: 'merge_intervals([[4, 7], [1, 4]])', expected: '[[1, 7]]' },
          { call: 'merge_intervals([[1, 4], [2, 3]])', expected: '[[1, 4]]' },
          { call: 'merge_intervals([[5, 6]])', expected: '[[5, 6]]' },
          { call: 'merge_intervals([[2, 3], [4, 5], [6, 7], [1, 10]])', expected: '[[1, 10]]' },
        ],
        solution: {
          text: 'Сортируем по началу. Идём по интервалам: если начало текущего не больше конца последнего слитого, расширяем его конец; иначе добавляем новый интервал.',
          code: `
def merge_intervals(intervals):
    intervals = sorted(intervals, key=lambda x: x[0])
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
`,
          complexity: '`O(n log n)` из-за сортировки, `O(n)` на ответ.',
          mistakes: [
            'Забыть отсортировать — тест `[[4, 7], [1, 4]]` не сольётся.',
            'Писать `merged[-1][1] = end` без `max` — вложенный интервал `[2, 3]` внутри `[1, 4]` укоротит результат.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 13
  {
    id: 'a13',
    week: 2,
    day: 13,
    title: 'Деревья: обходы в глубину и в ширину',
    summary: 'Двоичное дерево и терминология, рекурсия на деревьях, обходы в глубину: прямой, симметричный и обратный, обход в ширину по уровням с очередью, типичные рекурсивные задачи.',
    sections: [
      {
        id: 'tree',
        title: 'Двоичное дерево',
        blocks: [
          p('**Двоичное дерево** — узлы, у каждого из которых не больше двух детей: левый и правый. Верхний узел — **корень**, узлы без детей — **листья**. **Глубина** узла — число рёбер от корня до него, **высота** дерева — длина самого длинного пути от корня до листа.'),
          shell(`        3          корень
       / \\
      9   20       глубина 1
         /  \\
        15   7     листья, глубина 2
в задачах дерево записывают по уровням: [3, 9, 20, None, None, 15, 7]`, 'Схема'),
          p('Дерево — **рекурсивная** структура: каждое поддерево само является деревом. Поэтому почти все задачи на деревья решаются рекурсией по шаблону:'),
          steps(
            '**Базовый случай**: пустое дерево (`node is None`) — вернуть ответ для пустого дерева.',
            '**Рекурсивный шаг**: решить задачу для левого и правого поддеревьев.',
            '**Собрать** ответ узла из ответов детей и значения самого узла.',
          ),
          py(`class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def tree_sum(node):
    if node is None:          # базовый случай
        return 0
    return node.val + tree_sum(node.left) + tree_sum(node.right)

root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(tree_sum(root))`, '54'),
        ],
      },
      {
        id: 'dfs',
        title: 'Обходы в глубину',
        blocks: [
          p('Обход в глубину (DFS) уходит до листа, потом возвращается. Три варианта отличаются тем, **когда** обрабатывается сам узел:'),
          table(['Обход', 'Порядок', 'Для дерева выше', 'Где нужен'], [
            ['прямой (pre-order)', 'узел → левое → правое', '3, 9, 20, 15, 7', 'копирование дерева, сериализация'],
            ['симметричный (in-order)', 'левое → узел → правое', '9, 3, 15, 20, 7', 'в дереве поиска даёт отсортированный порядок (день 17)'],
            ['обратный (post-order)', 'левое → правое → узел', '9, 15, 7, 20, 3', 'когда ответ узла зависит от ответов детей: высота, удаление'],
          ]),
          py(`class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def inorder(node, out):
    if node:
        inorder(node.left, out)
        out.append(node.val)
        inorder(node.right, out)
    return out

root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(inorder(root, []))`, '[9, 3, 15, 20, 7]'),
          note('Рекурсия хранит путь в стеке вызовов: память `O(h)`, где `h` — высота дерева. Для сбалансированного дерева это `O(log n)`, для «бамбука» — `O(n)`. В Python глубина рекурсии ограничена (~1000), поэтому для очень глубоких деревьев обход пишут со своим стеком.'),
        ],
      },
      {
        id: 'bfs',
        title: 'Обход в ширину по уровням',
        blocks: [
          p('Обход в ширину (BFS) идёт **по уровням**: сначала корень, потом все узлы глубины 1, потом глубины 2. Нужна очередь `deque`. Чтобы разделять уровни, на каждой итерации внешнего цикла обрабатываем ровно `len(queue)` узлов — это и есть текущий уровень.'),
          py(`from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def levels(root):
    if not root:
        return []
    res, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):       # ровно один уровень
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        res.append(level)
    return res

root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
print(levels(root))`, '[[3], [9, 20], [15, 7]]'),
          tip('Выбор обхода: «по уровням», «ближайший к корню», «самый левый на уровне» — BFS. «Путь от корня до листа», «высота», «сравнить поддеревья» — DFS.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a13t1',
        title: 'Maximum Depth of Binary Tree',
        source: lc(104, 'maximum-depth-of-binary-tree'),
        prelude: TREE,
        text: 'Найди максимальную глубину дерева — число узлов на самом длинном пути от корня до листа. У пустого дерева глубина 0.',
        starter: starter(`
${TREE_DOC}
def max_depth(root) -> int:
    pass
`),
        examples: [{ call: 'max_depth(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '3' }],
        tests: [
          { call: 'max_depth(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '3' },
          { call: 'max_depth(build_tree([1, None, 2]))', expected: '2' },
          { call: 'max_depth(build_tree([]))', expected: '0' },
          { call: 'max_depth(build_tree([1, 2, 3, 4, None, None, None, 5]))', expected: '4' },
        ],
        solution: {
          text: 'Глубина дерева — 1 плюс большая из глубин поддеревьев. Пустое дерево имеет глубину 0.',
          code: `
def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
`,
          complexity: '`O(n)` по времени, `O(h)` памяти на стек рекурсии.',
          mistakes: [
            'Вернуть 1 для пустого дерева — все глубины сдвинутся на единицу.',
          ],
        },
      },
      {
        id: 'a13t2',
        title: 'Invert Binary Tree',
        source: lc(226, 'invert-binary-tree'),
        prelude: TREE,
        text: 'Отрази дерево зеркально: у каждого узла поменяй местами левое и правое поддеревья. Верни корень.',
        starter: starter(`
${TREE_DOC}
def invert_tree(root):
    pass
`),
        examples: [{ call: 'tree_to_list(invert_tree(build_tree([4, 2, 7, 1, 3, 6, 9])))', expected: '[4, 7, 2, 9, 6, 3, 1]' }],
        tests: [
          { call: 'tree_to_list(invert_tree(build_tree([4, 2, 7, 1, 3, 6, 9])))', expected: '[4, 7, 2, 9, 6, 3, 1]' },
          { call: 'tree_to_list(invert_tree(build_tree([2, 1, 3])))', expected: '[2, 3, 1]' },
          { call: 'tree_to_list(invert_tree(build_tree([])))', expected: '[]' },
          { call: 'tree_to_list(invert_tree(build_tree([1, 2])))', expected: '[1, None, 2]' },
        ],
        solution: {
          text: 'Рекурсивно отражаем оба поддерева и меняем их местами.',
          code: `
def invert_tree(root):
    if root is None:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root
`,
          complexity: '`O(n)` по времени, `O(h)` памяти.',
          mistakes: [
            'Поменять местами только детей корня — глубже дерево останется прежним.',
            'Писать в два присваивания `root.left = invert(root.right)`, затем `root.right = invert(root.left)` — второе возьмёт уже изменённое левое поддерево.',
          ],
        },
      },
      {
        id: 'a13t3',
        title: 'Same Tree',
        source: lc(100, 'same-tree'),
        prelude: TREE,
        text: 'Проверь, одинаковы ли два дерева: совпадает структура и значения во всех узлах.',
        starter: starter(`
${TREE_DOC}
def is_same_tree(p, q) -> bool:
    pass
`),
        examples: [{ call: 'is_same_tree(build_tree([1, 2, 3]), build_tree([1, 2, 3]))', expected: 'True' }],
        tests: [
          { call: 'is_same_tree(build_tree([1, 2, 3]), build_tree([1, 2, 3]))', expected: 'True' },
          { call: 'is_same_tree(build_tree([1, 2]), build_tree([1, None, 2]))', expected: 'False' },
          { call: 'is_same_tree(build_tree([1, 2, 1]), build_tree([1, 1, 2]))', expected: 'False' },
          { call: 'is_same_tree(build_tree([]), build_tree([]))', expected: 'True' },
          { call: 'is_same_tree(build_tree([1]), build_tree([]))', expected: 'False' },
        ],
        solution: {
          text: 'Два пустых дерева одинаковы. Если пусто только одно или значения корней разные — нет. Иначе сравниваем рекурсивно левые и правые поддеревья.',
          code: `
def is_same_tree(p, q):
    if p is None and q is None:
        return True
    if p is None or q is None or p.val != q.val:
        return False
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)
`,
          complexity: '`O(n)` по времени, `O(h)` памяти.',
          mistakes: [
            'Сравнивать списки обходов (например, только in-order) — разные деревья могут дать одинаковый обход (тест `[1, 2]` и `[1, None, 2]`).',
          ],
        },
      },
      {
        id: 'a13t4',
        title: 'Symmetric Tree',
        source: lc(101, 'symmetric-tree'),
        prelude: TREE,
        text: 'Проверь, симметрично ли дерево относительно вертикальной оси через корень.',
        starter: starter(`
${TREE_DOC}
def is_symmetric(root) -> bool:
    pass
`),
        examples: [{ call: 'is_symmetric(build_tree([1, 2, 2, 3, 4, 4, 3]))', expected: 'True' }],
        tests: [
          { call: 'is_symmetric(build_tree([1, 2, 2, 3, 4, 4, 3]))', expected: 'True' },
          { call: 'is_symmetric(build_tree([1, 2, 2, None, 3, None, 3]))', expected: 'False' },
          { call: 'is_symmetric(build_tree([1]))', expected: 'True' },
          { call: 'is_symmetric(build_tree([]))', expected: 'True' },
          { call: 'is_symmetric(build_tree([1, 2, 3]))', expected: 'False' },
        ],
        solution: {
          text: 'Дерево симметрично, если его левое поддерево — зеркальное отражение правого. Зеркальность проверяем рекурсией: корни равны, левое поддерево одного зеркально правому поддереву другого и наоборот.',
          code: `
def is_symmetric(root):
    def mirror(a, b):
        if a is None and b is None:
            return True
        if a is None or b is None or a.val != b.val:
            return False
        return mirror(a.left, b.right) and mirror(a.right, b.left)
    return mirror(root.left, root.right) if root else True
`,
          complexity: '`O(n)` по времени, `O(h)` памяти.',
          mistakes: [
            'Сравнивать `a.left` с `b.left` — это проверка на одинаковость, а не на зеркальность.',
          ],
        },
      },
      {
        id: 'a13t5',
        title: 'Binary Tree Level Order Traversal',
        source: lc(102, 'binary-tree-level-order-traversal'),
        prelude: TREE,
        text: 'Верни значения узлов по уровням: список списков, уровень слева направо.',
        starter: starter(`
${TREE_DOC}
from collections import deque

def level_order(root) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'level_order(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '[[3], [9, 20], [15, 7]]' }],
        tests: [
          { call: 'level_order(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '[[3], [9, 20], [15, 7]]' },
          { call: 'level_order(build_tree([1]))', expected: '[[1]]' },
          { call: 'level_order(build_tree([]))', expected: '[]' },
          { call: 'level_order(build_tree([1, 2, 3, 4, None, None, 5]))', expected: '[[1], [2, 3], [4, 5]]' },
        ],
        solution: {
          text: 'BFS с очередью. На каждом шаге внешнего цикла забираем ровно `len(queue)` узлов — это один уровень, — а их детей добавляем в очередь для следующего.',
          code: `
from collections import deque

def level_order(root):
    if not root:
        return []
    res, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        res.append(level)
    return res
`,
          complexity: '`O(n)` по времени, `O(w)` памяти, где `w` — ширина самого широкого уровня.',
          mistakes: [
            'Не фиксировать размер уровня — узлы разных уровней смешаются в одном списке.',
            '`list.pop(0)` вместо `deque.popleft()` — `O(n)` на каждое извлечение.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 14
  {
    id: 'a14',
    week: 2,
    day: 14,
    title: 'Повторение и мини-контест недели 2',
    summary: 'Шпаргалка по связным спискам, двоичному поиску, сортировкам и деревьям и мини-контест из четырёх задач — список, двоичный поиск, дерево и интервалы — с таймером.',
    sections: [
      {
        id: 'cheatsheet',
        title: 'Шпаргалка недели',
        blocks: [
          table(['Тема', 'Ключевые приёмы', 'Частые ошибки'], [
            ['Связные списки', 'dummy-голова, разворот тремя указателями, быстрый и медленный, отстающий указатель', 'потерянная ссылка `next`, сравнение значений вместо узлов, обращение к `None.next`'],
            ['LRU и design', 'словарь + двусвязный список со сторожевыми узлами', 'узел не хранит ключ, забыли обновить свежесть'],
            ['Двоичный поиск', 'один шаблон и инвариант; поиск первой позиции по условию; поиск по ответу', 'бесконечный цикл из-за `left = mid`, недостижимая правая граница'],
            ['Сортировки', 'сортировка по ключу, слияние с конца, три указателя, сортировка интервалов по началу', 'забыли отсортировать, затёрли данные при слиянии с начала'],
            ['Деревья', 'рекурсия «база + дети + сборка», DFS-обходы, BFS по уровням', 'неверный базовый случай, смешение уровней в BFS'],
          ]),
        ],
      },
      {
        id: 'contest',
        title: 'Мини-контест',
        blocks: [
          p('Четыре задачи — по одной на каждую большую тему недели: связный список, двоичный поиск, дерево, интервалы. На каждую — таймер **25 минут**. Запускай таймер перед чтением условия и решай задачи в любом порядке, как на настоящем контесте: сначала те, где идея пришла сразу.'),
          p('После контеста запиши: какую тему узнал сразу, где потратил больше всего времени, какие тесты упали. Задачи, решённые с подсказкой, повтори через 2–3 дня без неё — так паттерны закрепляются лучше всего.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a14t1',
        title: 'Remove Linked List Elements',
        source: lc(203, 'remove-linked-list-elements'),
        timer: 25,
        prelude: LIST,
        text: 'Удали из списка все узлы со значением `val` и верни новую голову.',
        starter: starter(`
${LIST_DOC}
def remove_elements(head, val):
    pass
`),
        examples: [{ call: 'list_to_array(remove_elements(build_list([1, 2, 6, 3, 4, 5, 6]), 6))', expected: '[1, 2, 3, 4, 5]' }],
        tests: [
          { call: 'list_to_array(remove_elements(build_list([1, 2, 6, 3, 4, 5, 6]), 6))', expected: '[1, 2, 3, 4, 5]' },
          { call: 'list_to_array(remove_elements(build_list([]), 1))', expected: '[]' },
          { call: 'list_to_array(remove_elements(build_list([7, 7, 7, 7]), 7))', expected: '[]' },
          { call: 'list_to_array(remove_elements(build_list([7, 1, 7, 7, 2]), 7))', expected: '[1, 2]' },
        ],
        solution: {
          text: 'Фиктивная голова убирает особый случай удаления первых узлов. Если следующий узел нужно удалить — перешагиваем через него, **не сдвигаясь**: следующий за ним тоже может быть удаляемым.',
          code: `
def remove_elements(head, val):
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return dummy.next
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Сдвигать `cur` после удаления — два подряд удаляемых узла (`7, 7`) не удалятся.',
          ],
        },
      },
      {
        id: 'a14t2',
        title: 'Search a 2D Matrix',
        source: lc(74, 'search-a-2d-matrix'),
        timer: 25,
        text: 'В матрице `m × n` каждая строка отсортирована, и первый элемент строки больше последнего элемента предыдущей. Проверь, есть ли в матрице `target`, за `O(log(m · n))`.',
        starter: starter(`
def search_matrix(matrix: list[list[int]], target: int) -> bool:
    pass
`),
        examples: [{ call: 'search_matrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3)', expected: 'True' }],
        tests: [
          { call: 'search_matrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3)', expected: 'True' },
          { call: 'search_matrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13)', expected: 'False' },
          { call: 'search_matrix([[1]], 1)', expected: 'True' },
          { call: 'search_matrix([[1, 3]], 3)', expected: 'True' },
          { call: 'search_matrix([[1], [3]], 2)', expected: 'False' },
          { call: 'search_matrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 60)', expected: 'True' },
        ],
        solution: {
          text: 'Матрица по строкам — это отсортированный массив длины `m · n`. Делаем обычный двоичный поиск по «виртуальному» индексу `i` и переводим его в координаты: строка `i // n`, столбец `i % n`.',
          code: `
def search_matrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    while left <= right:
        mid = (left + right) // 2
        val = matrix[mid // n][mid % n]
        if val == target:
            return True
        if val < target:
            left = mid + 1
        else:
            right = mid - 1
    return False
`,
          complexity: '`O(log(m · n))` по времени, `O(1)` памяти.',
          mistakes: [
            'Перевод индекса через `m` вместо `n`: строка — это `mid // n`, где `n` — число столбцов.',
            'Склеить матрицу в один список — `O(m · n)` времени и памяти.',
          ],
        },
      },
      {
        id: 'a14t3',
        title: 'Average of Levels in Binary Tree',
        source: lc(637, 'average-of-levels-in-binary-tree'),
        timer: 25,
        prelude: TREE,
        text: 'Верни список средних значений узлов на каждом уровне дерева (дробные числа).',
        starter: starter(`
${TREE_DOC}
from collections import deque

def average_of_levels(root) -> list[float]:
    pass
`),
        examples: [{ call: 'average_of_levels(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '[3.0, 14.5, 11.0]' }],
        tests: [
          { call: 'average_of_levels(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '[3.0, 14.5, 11.0]' },
          { call: 'average_of_levels(build_tree([3, 9, 20, 15, 7]))', expected: '[3.0, 14.5, 11.0]' },
          { call: 'average_of_levels(build_tree([5]))', expected: '[5.0]' },
          { call: 'average_of_levels(build_tree([1, 2, 3, 4]))', expected: '[1.0, 2.5, 4.0]' },
        ],
        solution: {
          text: 'Обход в ширину по уровням, как в Level Order Traversal; для каждого уровня считаем сумму и делим на число узлов.',
          code: `
from collections import deque

def average_of_levels(root):
    res, queue = [], deque([root])
    while queue:
        size = len(queue)
        total = 0
        for _ in range(size):
            node = queue.popleft()
            total += node.val
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        res.append(total / size)
    return res
`,
          complexity: '`O(n)` по времени, `O(w)` памяти.',
          mistakes: [
            'Делить на 2 в степени уровня — уровни бывают неполными.',
          ],
        },
      },
      {
        id: 'a14t4',
        title: 'Insert Interval',
        source: lc(57, 'insert-interval'),
        timer: 25,
        text: 'Список непересекающихся интервалов отсортирован по началу. Вставь новый интервал и, если нужно, слей пересекающиеся. Верни отсортированный список непересекающихся интервалов. Ожидается `O(n)`.',
        starter: starter(`
def insert_interval(intervals: list[list[int]], new_interval: list[int]) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'insert_interval([[1, 3], [6, 9]], [2, 5])', expected: '[[1, 5], [6, 9]]' }],
        tests: [
          { call: 'insert_interval([[1, 3], [6, 9]], [2, 5])', expected: '[[1, 5], [6, 9]]' },
          { call: 'insert_interval([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])', expected: '[[1, 2], [3, 10], [12, 16]]' },
          { call: 'insert_interval([], [5, 7])', expected: '[[5, 7]]' },
          { call: 'insert_interval([[1, 5]], [6, 8])', expected: '[[1, 5], [6, 8]]' },
          { call: 'insert_interval([[3, 5]], [1, 2])', expected: '[[1, 2], [3, 5]]' },
          { call: 'insert_interval([[1, 5]], [2, 3])', expected: '[[1, 5]]' },
        ],
        solution: {
          text: 'Три фазы за один проход: интервалы, которые целиком левее нового, добавляем как есть; пересекающиеся сливаем с новым, расширяя его; оставшиеся (правее) добавляем как есть.',
          code: `
def insert_interval(intervals, new_interval):
    res = []
    start, end = new_interval
    i, n = 0, len(intervals)
    while i < n and intervals[i][1] < start:
        res.append(intervals[i])
        i += 1
    while i < n and intervals[i][0] <= end:
        start = min(start, intervals[i][0])
        end = max(end, intervals[i][1])
        i += 1
    res.append([start, end])
    res.extend(intervals[i:])
    return res
`,
          complexity: '`O(n)` по времени и памяти на ответ. Добавить интервал и вызвать Merge Intervals — `O(n log n)`: работает, но не использует отсортированность.',
          mistakes: [
            'Строгие и нестрогие сравнения: интервалы, касающиеся концами (`[1, 5]` и `[5, 7]`), сливаются.',
            'Забыть добавить новый интервал, если он правее всех (тест `[[1, 5]]`, `[6, 8]`).',
          ],
        },
      },
    ],
  },
]
