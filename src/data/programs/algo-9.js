// Блок ноября «Алгособес», глава 9 — Связные списки (Linked List).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 9,
 "title": "Связные списки",
 "summary": "Односвязный список: узел и ссылки, обход, фиктивная голова (dummy); быстрый и медленный указатели; разворот списка и части списка; два прохода и разрыв в нужном месте; хеш-таблица + двусвязный список для LRU-кэша; разбор 11 задач от Linked List Cycle до Reverse Nodes in k-Group.",
 "intro": "Связные списки проверяют, умеешь ли ты аккуратно работать со ссылками: не потерять хвост при перестановке, правильно обработать голову и конец. Почти все задачи темы решаются тремя приёмами — фиктивная голова, два указателя с разной скоростью или разным стартом, разворот. На собеседовании полезно рисовать стрелки на бумаге: так видно, какую ссылку нужно сохранить до перестановки.",
 "sections": [
  {
   "id": "list",
   "num": "9.1",
   "title": "Как устроен связный список",
   "blocks": [
    {
     "t": "p",
     "text": "Узел хранит значение и ссылку на следующий узел; последний ссылается на `None`. В отличие от массива, доступ к i-му элементу — O(i), зато вставка и удаление после известного узла — O(1): нужно только поменять ссылку."
    },
    {
     "t": "code",
     "text": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nhead = ListNode(1, ListNode(2, ListNode(3)))\ncur = head\nwhile cur:                       # обход: идём по ссылкам до None\n    print(cur.val, end=\" \")\n    cur = cur.next",
     "out": "1 2 3 "
    },
    {
     "t": "h3",
     "text": "Фиктивная голова (dummy)"
    },
    {
     "t": "p",
     "text": "Если голова списка может удалиться или измениться, заведи узел-заглушку перед ней: `dummy = ListNode(0, head)`. Тогда у каждого настоящего узла есть предыдущий, и не нужен особый случай для головы. Ответ — `dummy.next`."
    },
    {
     "t": "h3",
     "text": "Разворот списка"
    },
    {
     "t": "p",
     "text": "Базовая операция, которую нужно уметь писать не задумываясь. Три указателя: `prev`, `cur` и сохранённый `nxt`, потому что после разворота ссылки `cur.next` дорогу вперёд уже не найти."
    },
    {
     "t": "code",
     "text": "def reverse(head):\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next      # 1. сохранили путь вперёд\n        cur.next = prev     # 2. развернули стрелку\n        prev, cur = cur, nxt   # 3. сдвинулись\n    return prev             # новая голова\n\nnode = reverse(ListNode(1, ListNode(2, ListNode(3))))\nwhile node:\n    print(node.val, end=\" \")\n    node = node.next",
     "out": "3 2 1 "
    },
    {
     "t": "table",
     "caption": "Приёмы",
     "headers": [
      "Признак",
      "Приём"
     ],
     "rows": [
      [
       "найти середину, цикл, k-й с конца",
       "два указателя: быстрый и медленный или с отставанием на k"
      ],
      [
       "удалить или вставить, голова может измениться",
       "фиктивная голова"
      ],
      [
       "развернуть весь список или кусок",
       "три указателя: prev, cur, nxt"
      ],
      [
       "слить, разделить по условию",
       "фиктивные головы для каждого нового списка"
      ],
      [
       "нужен доступ за O(1) по ключу + порядок",
       "хеш-таблица + двусвязный список (LRU)"
      ]
     ]
    }
   ],
   "terms": [],
   "divider": "Теория"
  },
  {
   "id": "p141",
   "num": "9.2",
   "title": "141. Linked List Cycle",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Есть ли в связном списке цикл?"
    },
    {
     "t": "p",
     "text": "**Идея.** Медленный указатель делает шаг на 1, быстрый — на 2. Если цикла нет, быстрый дойдёт до `None`. Если есть, оба попадут в цикл, и быстрый догонит медленного: расстояние между ними сокращается на 1 за шаг."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        slow = fast = head\n        while fast and fast.next:\n            slow = slow.next\n            fast = fast.next.next\n            if slow is fast:\n                return True\n        return False"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Условие `fast and fast.next` защищает от обращения к `None.next`.",
      "Внутри цикла быстрый приближается к медленному на 1 узел за шаг, поэтому не может «перепрыгнуть» его — встреча произойдёт за число шагов не больше длины цикла.",
      "Простое решение с `set` посещённых узлов — O(n) памяти.",
      "Продолжение (Linked List Cycle II): найти начало цикла. После встречи ставим один указатель в голову и двигаем оба по одному шагу — встретятся в начале цикла."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p21",
   "num": "9.3",
   "title": "21. Merge Two Sorted Lists",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Слей два отсортированных списка в один отсортированный, переиспользуя узлы."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→2→4` и `1→3→4` → `1→1→2→3→4→4`"
    },
    {
     "t": "p",
     "text": "**Идея.** Как в слиянии массивов: сравниваем текущие узлы двух списков и подвешиваем меньший к хвосту результата. Фиктивная голова избавляет от отдельного выбора первого узла."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = tail = ListNode()\n        while list1 and list2:\n            if list1.val <= list2.val:\n                tail.next, list1 = list1, list1.next\n            else:\n                tail.next, list2 = list2, list2.next\n            tail = tail.next\n        tail.next = list1 or list2        # остаток уже отсортирован\n        return dummy.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`tail` — последний узел результата, к нему подвешиваем меньший из двух текущих.",
      "Когда один список кончился, остаток второго подвешиваем целиком — копировать по узлу не нужно.",
      "Рекурсивный вариант короче, но тратит O(n + m) памяти на стек вызовов."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n + m).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p2",
   "num": "9.4",
   "title": "2. Add Two Numbers",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Два неотрицательных числа записаны в списках цифрами в обратном порядке (первая — единицы). Верни их сумму в том же виде."
    },
    {
     "t": "p",
     "text": "**Пример.** `2→4→3` + `5→6→4` → `7→0→8` (342 + 465 = 807)"
    },
    {
     "t": "p",
     "text": "**Идея.** Обратный порядок цифр — подарок: складываем «столбиком» с младших разрядов, ровно в порядке обхода списков, и переносим единицу в следующий разряд."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = tail = ListNode()\n        carry = 0\n        while l1 or l2 or carry:\n            total = carry\n            if l1:\n                total += l1.val\n                l1 = l1.next\n            if l2:\n                total += l2.val\n                l2 = l2.next\n            carry, digit = divmod(total, 10)\n            tail.next = ListNode(digit)\n            tail = tail.next\n        return dummy.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Цикл идёт, пока есть цифры хотя бы в одном списке **или** остался перенос: 5 + 5 = 10 даёт лишний разряд.",
      "Списки разной длины обрабатываются естественно: закончившийся просто перестаёт добавлять цифры.",
      "`divmod(total, 10)` даёт и перенос, и цифру разряда."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(max(n, m)).",
      "**Память:** O(1) кроме ответа."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p138",
   "num": "9.5",
   "title": "138. Copy List with Random Pointer",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)"
    },
    {
     "t": "p",
     "text": "**Условие.** У каждого узла списка есть `next` и `random` (ссылка на любой узел или `None`). Сделай глубокую копию списка."
    },
    {
     "t": "p",
     "text": "**Идея.** Сложность в том, что `random` может указывать вперёд, на ещё не созданный узел. Решение: первым проходом создаём копии всех узлов и запоминаем соответствие в словаре `old → new`, вторым — расставляем `next` и `random` через словарь."
    },
    {
     "t": "code",
     "text": "class Node:\n    def __init__(self, x: int, next=None, random=None):\n        self.val = int(x)\n        self.next = next\n        self.random = random\n\nclass Solution:\n    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':\n        copy = {None: None}                    # чтобы ссылки на None копировались без проверок\n        cur = head\n        while cur:                             # проход 1: создаём узлы\n            copy[cur] = Node(cur.val)\n            cur = cur.next\n        cur = head\n        while cur:                             # проход 2: расставляем ссылки\n            copy[cur].next = copy[cur.next]\n            copy[cur].random = copy[cur.random]\n            cur = cur.next\n        return copy[head]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Ключ `None → None` в словаре убирает проверки на пустые ссылки.",
      "После первого прохода копия каждого узла уже существует, поэтому во втором проходе любые ссылки разрешаются.",
      "Решение за O(1) дополнительной памяти: вставить копию каждого узла сразу после оригинала (A → A′ → B → B′), тогда `A′.random = A.random.next`, и в конце расплести списки."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(n) на словарь."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p92",
   "num": "9.6",
   "title": "92. Reverse Linked List II",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Разверни часть списка с позиции `left` до `right` (нумерация с 1) за один проход."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→2→3→4→5, left = 2, right = 4` → `1→4→3→2→5`"
    },
    {
     "t": "p",
     "text": "**Идея.** Доходим до узла `prev` перед позицией `left` (фиктивная голова — на случай `left = 1`). Дальше `right − left` раз берём узел, стоящий после первого узла куска, и переставляем его сразу после `prev`. Так кусок разворачивается «вставками в начало»."
    },
    {
     "t": "array",
     "index": false,
     "caption": "left = 2, right = 4: каждый шаг переносит следующий узел в начало куска",
     "rows": [
      {
       "label": "старт",
       "cells": [
        1,
        2,
        3,
        4,
        5
       ],
       "ptr": {
        "0": "prev",
        "1": "cur"
       }
      },
      {
       "label": "шаг 1",
       "cells": [
        1,
        3,
        2,
        4,
        5
       ],
       "hl": [
        1
       ],
       "note": "3 переехал за prev"
      },
      {
       "label": "шаг 2",
       "cells": [
        1,
        4,
        3,
        2,
        5
       ],
       "hl": [
        1
       ],
       "note": "4 переехал за prev"
      }
     ]
    },
    {
     "t": "code",
     "text": "class Solution:\n    def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        prev = dummy\n        for _ in range(left - 1):          # prev — узел перед куском\n            prev = prev.next\n        cur = prev.next                    # первый узел куска; он уедет в конец куска\n        for _ in range(right - left):\n            nxt = cur.next                 # узел, который переносим в начало куска\n            cur.next = nxt.next\n            nxt.next = prev.next\n            prev.next = nxt\n        return dummy.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`cur` всё время один и тот же узел — бывший первый в куске. Он постепенно сдвигается к концу куска.",
      "Каждая итерация вынимает узел после `cur` и вставляет его сразу после `prev` — три изменения ссылок.",
      "Фиктивная голова решает случай `left = 1`, когда меняется голова всего списка."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p19",
   "num": "9.7",
   "title": "19. Remove Nth Node From End of List",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Удали n-й узел с конца списка за один проход."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→2→3→4→5, n = 2` → `1→2→3→5`"
    },
    {
     "t": "p",
     "text": "**Идея.** Отправляем быстрый указатель на n + 1 шагов вперёд от фиктивной головы, затем двигаем оба вместе. Когда быстрый дошёл до `None`, медленный стоит **перед** удаляемым узлом."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        fast = slow = dummy\n        for _ in range(n + 1):\n            fast = fast.next\n        while fast:\n            fast = fast.next\n            slow = slow.next\n        slow.next = slow.next.next       # пропускаем удаляемый узел\n        return dummy.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Между указателями всё время n узлов. Когда быстрый вышел за конец, до конца от медленного — n + 1 шаг, то есть следующий узел — n-й с конца.",
      "Фиктивная голова нужна, когда удаляется сама голова (n равно длине списка).",
      "Решение в два прохода (посчитать длину, потом дойти до L − n) тоже O(n) и вполне приемлемо."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p82",
   "num": "9.8",
   "title": "82. Remove Duplicates from Sorted List II",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Список отсортирован. Удали **все** узлы, у которых значение повторяется, оставив только уникальные."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→2→3→3→4→4→5` → `1→2→5`"
    },
    {
     "t": "p",
     "text": "**Идея.** `prev` — последний узел, который точно остаётся. Смотрим на группу, начинающуюся с `prev.next`: если в ней больше одного узла, пропускаем её целиком (`prev.next` = первый узел после группы), иначе сдвигаем `prev`."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        prev = dummy\n        while prev.next:\n            cur = prev.next\n            if cur.next and cur.next.val == cur.val:      # группа дубликатов\n                val = cur.val\n                while cur and cur.val == val:\n                    cur = cur.next\n                prev.next = cur                           # выкидываем всю группу\n            else:\n                prev = cur                                # уникальный — оставляем\n        return dummy.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Фиктивная голова нужна, потому что удаляться может начало списка: `1→1→2`.",
      "После выброса группы `prev` не двигаем: следующий узел ещё может начинать новую группу дубликатов.",
      "Сравни с задачей 83 (оставить одну копию) — там достаточно `cur.next = cur.next.next` при равных значениях."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p61",
   "num": "9.9",
   "title": "61. Rotate List",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [61. Rotate List](https://leetcode.com/problems/rotate-list/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Поверни список вправо на k позиций."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→2→3→4→5, k = 2` → `4→5→1→2→3`"
    },
    {
     "t": "p",
     "text": "**Идея.** Находим длину n и хвост. Поворот на k эквивалентен повороту на `k % n`. Соединяем хвост с головой в кольцо, проходим `n − k % n` узлов от начала — это новый хвост, после него новая голова. Разрываем кольцо."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        if not head or not head.next:\n            return head\n        n, tail = 1, head\n        while tail.next:                 # длина и последний узел\n            tail = tail.next\n            n += 1\n        k %= n\n        if k == 0:\n            return head\n        tail.next = head                 # кольцо\n        new_tail = head\n        for _ in range(n - k - 1):\n            new_tail = new_tail.next\n        new_head = new_tail.next\n        new_tail.next = None             # разрыв\n        return new_head"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "k может быть огромным (до 2·10⁹), поэтому без `k %= n` решение не уложится во время.",
      "Новый хвост — узел номер `n − k` (с единицы), до него `n − k − 1` шагов от головы.",
      "Ранний выход при `k == 0` экономит работу и не создаёт лишнее кольцо."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p86",
   "num": "9.10",
   "title": "86. Partition List",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [86. Partition List](https://leetcode.com/problems/partition-list/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Переставь узлы так, чтобы все значения меньше x шли перед значениями ≥ x, сохранив исходный порядок внутри каждой группы."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→4→3→2→5→2, x = 3` → `1→2→2→4→3→5`"
    },
    {
     "t": "p",
     "text": "**Идея.** Идём по списку и раскладываем узлы в два новых списка: «меньше x» и «не меньше x». Каждый со своей фиктивной головой. В конце склеиваем первый со вторым."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:\n        less = less_tail = ListNode()\n        more = more_tail = ListNode()\n        while head:\n            if head.val < x:\n                less_tail.next = head\n                less_tail = head\n            else:\n                more_tail.next = head\n                more_tail = head\n            head = head.next\n        more_tail.next = None              # иначе может остаться цикл\n        less_tail.next = more.next\n        return less.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Узлы не копируются — переподвешиваются, порядок внутри групп сохраняется.",
      "`more_tail.next = None` обязательно: последний узел второго списка мог ссылаться на узел из первого, и получится цикл."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p146",
   "num": "9.11",
   "title": "146. LRU Cache",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [146. LRU Cache](https://leetcode.com/problems/lru-cache/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Реализуй LRU-кэш ёмкости `capacity`: `get(key)` возвращает значение или −1, `put(key, value)` добавляет или обновляет; при переполнении удаляется ключ, к которому дольше всего не обращались. Обе операции — O(1)."
    },
    {
     "t": "p",
     "text": "**Идея.** Словарь даёт доступ к значению за O(1), но не помнит порядок использования. Двусвязный список хранит ключи от «давно не использованного» к «свежему»: перенести узел в конец и удалить из начала — O(1), если у нас есть ссылка на узел. Словарь хранит `ключ → узел`. Заглушки-головы с обоих концов убирают особые случаи."
    },
    {
     "t": "code",
     "text": "class DNode:\n    def __init__(self, key=0, val=0):\n        self.key, self.val = key, val\n        self.prev = self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.map = {}                          # key -> DNode\n        self.head, self.tail = DNode(), DNode()    # заглушки: head.next — самый старый\n        self.head.next, self.tail.prev = self.tail, self.head\n\n    def _remove(self, node):\n        node.prev.next, node.next.prev = node.next, node.prev\n\n    def _append(self, node):                   # в конец — самый свежий\n        node.prev, node.next = self.tail.prev, self.tail\n        self.tail.prev.next = node\n        self.tail.prev = node\n\n    def get(self, key: int) -> int:\n        if key not in self.map:\n            return -1\n        node = self.map[key]\n        self._remove(node)\n        self._append(node)\n        return node.val\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.map:\n            self._remove(self.map[key])\n        node = DNode(key, value)\n        self.map[key] = node\n        self._append(node)\n        if len(self.map) > self.cap:\n            oldest = self.head.next\n            self._remove(oldest)\n            del self.map[oldest.key]           # поэтому ключ хранится в узле"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`get` переносит узел в конец — он стал самым свежим.",
      "`put` для существующего ключа удаляет старый узел и вставляет новый в конец.",
      "При переполнении удаляем `head.next` — самый давний. Ключ хранится в узле, чтобы удалить его и из словаря.",
      "В Python есть готовый `OrderedDict` с `move_to_end` и `popitem(last=False)` — решение в 10 строк. Но на собеседовании обычно просят реализовать двусвязный список руками."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(1) на операцию.",
      "**Память:** O(capacity)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p25",
   "num": "9.12",
   "title": "25. Reverse Nodes in k-Group",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Разверни узлы списка группами по k. Если в конце осталось меньше k узлов, они остаются как есть. Менять можно только ссылки, не значения."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→2→3→4→5, k = 2` → `2→1→4→3→5`"
    },
    {
     "t": "p",
     "text": "**Идея.** Повторяем: от узла `group_prev` (перед очередной группой) проверяем, что впереди есть k узлов; если нет — конец. Разворачиваем эти k узлов стандартным разворотом, затем пришиваем: бывший первый узел группы становится последним и ссылается на начало следующей группы, а `group_prev` — на бывший последний."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        dummy = ListNode(0, head)\n        group_prev = dummy\n        while True:\n            kth = group_prev                    # ищем k-й узел группы\n            for _ in range(k):\n                kth = kth.next\n                if not kth:\n                    return dummy.next           # осталось меньше k узлов\n            group_next = kth.next\n            prev, cur = group_next, group_prev.next   # разворот: хвост группы сразу смотрит на следующую\n            while cur is not group_next:\n                nxt = cur.next\n                cur.next = prev\n                prev, cur = cur, nxt\n            first = group_prev.next             # бывший первый — теперь последний в группе\n            group_prev.next = kth\n            group_prev = first"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Перед разворотом убеждаемся, что в группе ровно k узлов, — иначе последний неполный кусок развернулся бы.",
      "Разворот начинаем с `prev = group_next`: тогда бывший первый узел сразу будет ссылаться на начало следующей группы, и отдельное пришивание хвоста не нужно.",
      "`group_prev.next = kth` — к предыдущей части пришиваем новое начало группы; новым `group_prev` становится бывший первый узел.",
      "Каждый узел проходится дважды (поиск k-го и разворот) — O(n)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "9.13",
   "title": "Шпаргалка по главе",
   "divider": "Итоги",
   "blocks": [
    {
     "t": "table",
     "caption": "Все задачи главы: признак в условии → приём",
     "headers": [
      "Задача",
      "Сложность",
      "Уровень",
      "Главный приём"
     ],
     "rows": [
      [
       "[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)",
       "Easy",
       "1",
       "быстрый и медленный указатели (Флойд)"
      ],
      [
       "[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)",
       "Easy",
       "1",
       "фиктивная голова + слияние двух отсортированных"
      ],
      [
       "[2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)",
       "Medium",
       "1",
       "сложение столбиком с переносом"
      ],
      [
       "[138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/)",
       "Medium",
       "2",
       "словарь «старый узел → копия», два прохода"
      ],
      [
       "[92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)",
       "Medium",
       "2",
       "dummy + разворот куска вставкой в начало"
      ],
      [
       "[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)",
       "Medium",
       "1",
       "два указателя с отставанием на n"
      ],
      [
       "[82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/)",
       "Medium",
       "2",
       "dummy, пропускаем целые группы одинаковых"
      ],
      [
       "[61. Rotate List](https://leetcode.com/problems/rotate-list/)",
       "Medium",
       "2",
       "замкнуть в кольцо и разорвать в нужном месте"
      ],
      [
       "[86. Partition List](https://leetcode.com/problems/partition-list/)",
       "Medium",
       "2",
       "два списка с фиктивными головами"
      ],
      [
       "[146. LRU Cache](https://leetcode.com/problems/lru-cache/)",
       "Medium",
       "1",
       "словарь + двусвязный список (или OrderedDict)"
      ],
      [
       "[25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/)",
       "Hard",
       "3",
       "проверить, что впереди k узлов, развернуть группу, пришить"
      ]
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "6–8 часов",
  "format": "решения на LeetCode",
  "situation": [
   "Реши задачи главы на LeetCode сам, не подглядывая в разбор, — двигайся от Easy к Medium. Если идеи нет за 25 минут, открой разбор, разберись и напиши решение заново с нуля. Задачи разбиты по уровням из главы 1: начни с уровня 1, остальные — если позволяет время."
  ],
  "parts": [
   {
    "title": "Уровень 1 — золотой минимум",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) · Easy",
       "[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy",
       "[2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) · Medium",
       "[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) · Medium",
       "[146. LRU Cache](https://leetcode.com/problems/lru-cache/) · Medium"
      ]
     }
    ]
   },
   {
    "title": "Уровень 2 — уверенный",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[138. Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer/) · Medium",
       "[92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) · Medium",
       "[82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) · Medium",
       "[61. Rotate List](https://leetcode.com/problems/rotate-list/) · Medium",
       "[86. Partition List](https://leetcode.com/problems/partition-list/) · Medium"
      ]
     }
    ]
   },
   {
    "title": "Уровень 3 — всё (Hard и экзотика)",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Напиши разворот связного списка и объясни, зачем сохранять `nxt` до изменения ссылки.",
   "Когда нужна фиктивная голова и что она упрощает?",
   "Почему быстрый указатель обязательно встретит медленного, если в списке есть цикл?",
   "Как найти n-й узел с конца за один проход?",
   "Почему в LRU-кэше нужен именно двусвязный список и зачем хранить ключ в узле?"
  ]
 }
}
