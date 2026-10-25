// Курс «Алгоритмы: leetcode и алгособесы», неделя 3 — графы, деревья поиска, жадные алгоритмы,
// куча, перебор с возвратом. Формат урока — как в week1.js.

import { p, h, list, steps, py, shell, note, tip, warn, table, starter } from '../python/blocks'
import { LIST, TREE, GRAPH } from './helpers'

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

// Проверка построенного дерева поиска: симметричный обход и сбалансированность
const BST_CHECK = `
def _inorder(n, out):
    if n:
        _inorder(n.left, out); out.append(n.val); _inorder(n.right, out)
    return out
def _height(n):
    if n is None:
        return 0
    l, r = _height(n.left), _height(n.right)
    if l < 0 or r < 0 or abs(l - r) > 1:
        return -1
    return 1 + max(l, r)
`

export default [
  // ═══════════════════════════════════════════════════════════════ День 15
  {
    id: 'a15',
    week: 3,
    day: 15,
    title: 'DFS: графы и деревья',
    summary: 'Графы и способы их хранить, сетка как граф, обход в глубину рекурсией и стеком, отметка посещённых, подсчёт компонент связности, копирование графа, DFS на деревьях: пути от корня и диаметр.',
    sections: [
      {
        id: 'graphs',
        title: 'Графы на собеседованиях',
        blocks: [
          p('**Граф** — вершины и рёбра между ними. На собеседованиях он встречается в трёх видах:'),
          list(
            '**список смежности**: словарь `{вершина: [соседи]}` или список списков — самый частый формат;',
            '**сетка** (матрица): клетка — вершина, соседи — клетки сверху, снизу, слева и справа. Острова, лабиринты, заливка;',
            '**неявный граф**: вершины — состояния (слова, позиции, комбинации), рёбра — допустимые переходы. Word Ladder, головоломки.',
          ),
          p('Главное отличие от деревьев — **циклы**: из вершины можно вернуться в неё же. Поэтому при обходе графа обязательно отмечаем **посещённые** вершины (множество `visited` или изменение самой сетки), иначе обход зациклится.'),
          h('Направления в сетке'),
          py(`grid = ["110",
        "100",
        "001"]
rows, cols = len(grid), len(grid[0])
DIRS = [(1, 0), (-1, 0), (0, 1), (0, -1)]

r, c = 0, 0
for dr, dc in DIRS:
    nr, nc = r + dr, c + dc
    if 0 <= nr < rows and 0 <= nc < cols:      # не вышли за границы
        print((nr, nc), grid[nr][nc])`, "(1, 0) 1\n(0, 1) 1"),
        ],
      },
      {
        id: 'dfs',
        title: 'Обход в глубину',
        blocks: [
          p('**DFS** идёт от вершины к непосещённому соседу, от него — дальше, пока есть куда идти, потом возвращается. Пишется рекурсией или явным стеком.'),
          py(`graph = {1: [2, 3], 2: [4], 3: [4], 4: [], 5: [6], 6: []}

def dfs(v, visited):
    visited.add(v)
    for u in graph[v]:
        if u not in visited:
            dfs(u, visited)

# компоненты связности: сколько раз пришлось запускать DFS с нового старта
visited, components = set(), 0
for v in graph:
    if v not in visited:
        dfs(v, visited)
        components += 1
print(components)`, '2'),
          h('Подсчёт компонент — схема «острова»'),
          steps(
            'Перебираем все вершины (клетки) по порядку.',
            'Встретили непосещённую — это новая компонента: увеличиваем счётчик и запускаем из неё DFS.',
            'DFS отмечает все вершины компоненты, поэтому повторно мы её не посчитаем.',
          ),
          p('Сложность — `O(V + E)`: каждая вершина и каждое ребро обрабатываются один раз. Для сетки `m × n` это `O(m · n)`.'),
          warn('В Python глубина рекурсии ограничена (около 1000 вызовов). На большой сетке рекурсивный DFS может упасть с `RecursionError`. Тогда используют явный стек: `stack = [start]`, в цикле `v = stack.pop()` и кладём непосещённых соседей. Или BFS — на следующем уроке.'),
        ],
      },
      {
        id: 'trees',
        title: 'DFS на деревьях: пути и диаметр',
        blocks: [
          p('На дереве DFS часто передаёт информацию **вниз** (например, оставшуюся сумму пути) или собирает **вверх** (высоту поддерева).'),
          list(
            '**вниз**: «есть ли путь от корня до листа с суммой `target`» — передаём в ребёнка `target − node.val`, а в листе проверяем, равен ли остаток значению листа;',
            '**вверх**: «диаметр дерева» — самый длинный путь между любыми двумя узлами. Он проходит через какой-то узел и равен `высота(левого) + высота(правого)`. Обходим дерево, каждый узел возвращает свою высоту, а по пути обновляем глобальный максимум.',
          ),
          note('Приём «функция возвращает одно, а ответ задачи обновляется в переменной снаружи» очень частый: возвращаемое значение нужно родителю, а ответ может достигаться в любом узле.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a15t1',
        title: 'Number of Islands',
        source: lc(200, 'number-of-islands'),
        text: 'Сетка `grid` — список строк из символов `"1"` (суша) и `"0"` (вода). Остров — группа клеток суши, соединённых по горизонтали или вертикали. Посчитай число островов.',
        starter: starter(`
def num_islands(grid: list[str]) -> int:
    pass
`),
        examples: [{ call: 'num_islands(["11000", "11000", "00100", "00011"])', expected: '3' }],
        tests: [
          { call: 'num_islands(["11110", "11010", "11000", "00000"])', expected: '1' },
          { call: 'num_islands(["11000", "11000", "00100", "00011"])', expected: '3' },
          { call: 'num_islands(["0"])', expected: '0' },
          { call: 'num_islands(["1"])', expected: '1' },
          { call: 'num_islands(["101", "010", "101"])', expected: '5' },
          { call: 'num_islands(["111", "101", "111"])', expected: '1' },
          { label: 'сетка 200 × 200', perf: true, code: `grid = ["10" * 100 if r % 2 == 0 else "0" * 200 for r in range(200)]
__kiro_eq("num_islands", num_islands(grid), 10000)` },
        ],
        solution: {
          text: 'Перебираем клетки. Встретив непосещённую сушу, увеличиваем счётчик и обходом в глубину отмечаем весь остров. Строки неизменяемы, поэтому посещённые клетки храним в множестве.',
          code: `
def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    seen = set()

    def dfs(r, c):
        stack = [(r, c)]
        seen.add((r, c))
        while stack:
            r, c = stack.pop()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1" and (nr, nc) not in seen:
                    seen.add((nr, nc))
                    stack.append((nr, nc))

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1" and (r, c) not in seen:
                count += 1
                dfs(r, c)
    return count
`,
          complexity: '`O(m · n)` по времени и памяти. Явный стек вместо рекурсии — защита от `RecursionError` на больших островах.',
          mistakes: [
            'Отмечать клетку посещённой, когда её **достают** из стека, а не когда **кладут**, — одна клетка попадает в стек много раз.',
            'Считать соседями диагональные клетки — в задаче только 4 направления.',
          ],
        },
      },
      {
        id: 'a15t2',
        title: 'Clone Graph',
        source: lc(133, 'clone-graph'),
        prelude: GRAPH,
        text: 'Дан узел связного неориентированного графа (`Node` с полями `val` и `neighbors`). Верни **глубокую копию** графа: новые узлы с теми же значениями и связями. Ни один узел копии не должен совпадать с узлом оригинала.',
        starter: starter(`
# Узел графа уже определён на платформе:
# class Node:
#     def __init__(self, val=0, neighbors=None):
#         self.val = val
#         self.neighbors = neighbors if neighbors is not None else []

def clone_graph(node):
    pass
`),
        examples: [{ call: 'граф [[2, 4], [1, 3], [2, 4], [1, 3]] — квадрат 1-2-3-4', expected: 'копия с теми же связями' }],
        tests: [
          { label: 'квадрат из 4 вершин', code: `orig = build_graph([[2, 4], [1, 3], [2, 4], [1, 3]])
copy = clone_graph(orig)
adj, nodes = graph_to_adj(copy)
__kiro_eq("связи копии", adj, [[2, 4], [1, 3], [2, 4], [1, 3]])
_, orig_nodes = graph_to_adj(orig)
assert not any(a is b for a in nodes for b in orig_nodes), "копия использует узлы оригинала"` },
          { label: 'одна вершина без соседей', code: `orig = build_graph([[]])
copy = clone_graph(orig)
assert copy is not orig, "нужен новый узел"
__kiro_eq("значение и соседи", (copy.val, copy.neighbors), (1, []))` },
          { label: 'пустой граф', code: `__kiro_eq("clone_graph(None)", clone_graph(None), None)` },
          { label: 'полный граф на 5 вершинах', code: `adj = [[j for j in range(1, 6) if j != i] for i in range(1, 6)]
copy = clone_graph(build_graph(adj))
__kiro_eq("связи копии", graph_to_adj(copy)[0], adj)` },
        ],
        solution: {
          text: 'Словарь «узел оригинала → его копия» служит и отметкой посещённых, и способом найти уже созданную копию соседа. Обходим граф DFS: создаём копию узла, затем рекурсивно копируем соседей и добавляем их в список.',
          code: `
def clone_graph(node):
    if node is None:
        return None
    copies = {}

    def dfs(v):
        if v in copies:
            return copies[v]
        c = Node(v.val)
        copies[v] = c
        for nb in v.neighbors:
            c.neighbors.append(dfs(nb))
        return c

    return dfs(node)
`,
          complexity: '`O(V + E)` по времени, `O(V)` памяти.',
          mistakes: [
            'Создать копию узла, но записать её в словарь **после** обхода соседей — на цикле граф копируется бесконечно.',
            'Добавлять в копию исходные узлы-соседи вместо их копий — копия «прилипает» к оригиналу.',
          ],
        },
      },
      {
        id: 'a15t3',
        title: 'Path Sum',
        source: lc(112, 'path-sum'),
        prelude: TREE,
        text: 'Есть ли в дереве путь **от корня до листа**, сумма значений на котором равна `target_sum`? Лист — узел без детей.',
        starter: starter(`
${TREE_DOC}
def has_path_sum(root, target_sum: int) -> bool:
    pass
`),
        examples: [{ call: 'has_path_sum(build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1]), 22)', expected: 'True' }],
        tests: [
          { call: 'has_path_sum(build_tree([5, 4, 8, 11, None, 13, 4, 7, 2, None, None, None, 1]), 22)', expected: 'True' },
          { call: 'has_path_sum(build_tree([1, 2, 3]), 5)', expected: 'False' },
          { call: 'has_path_sum(build_tree([]), 0)', expected: 'False' },
          { call: 'has_path_sum(build_tree([1, 2]), 1)', expected: 'False' },
          { call: 'has_path_sum(build_tree([-2, None, -3]), -5)', expected: 'True' },
        ],
        solution: {
          text: 'Передаём вниз остаток суммы. В листе проверяем, равен ли остаток значению листа. Важно: путь должен заканчиваться **в листе**, а не в любом узле.',
          code: `
def has_path_sum(root, target_sum):
    if root is None:
        return False
    if root.left is None and root.right is None:
        return root.val == target_sum
    rest = target_sum - root.val
    return has_path_sum(root.left, rest) or has_path_sum(root.right, rest)
`,
          complexity: '`O(n)` по времени, `O(h)` памяти.',
          mistakes: [
            'Считать путь законченным в узле с одним ребёнком (тест `[1, 2]`, сумма 1: узел 1 не лист).',
            'Вернуть `True` для пустого дерева при сумме 0 — у пустого дерева нет путей.',
          ],
        },
      },
      {
        id: 'a15t4',
        title: 'Diameter of Binary Tree',
        source: lc(543, 'diameter-of-binary-tree'),
        prelude: TREE,
        text: 'Диаметр дерева — длина (в рёбрах) самого длинного пути между любыми двумя узлами. Путь может не проходить через корень. Найди диаметр.',
        starter: starter(`
${TREE_DOC}
def diameter_of_binary_tree(root) -> int:
    pass
`),
        examples: [{ call: 'diameter_of_binary_tree(build_tree([1, 2, 3, 4, 5]))', expected: '3' }],
        tests: [
          { call: 'diameter_of_binary_tree(build_tree([1, 2, 3, 4, 5]))', expected: '3' },
          { call: 'diameter_of_binary_tree(build_tree([1, 2]))', expected: '1' },
          { call: 'diameter_of_binary_tree(build_tree([1]))', expected: '0' },
          { label: 'самый длинный путь не через корень', code: `root = build_tree([1, 2, None, 3, 4, 5, None, None, 6, 7, None, None, 8])
__kiro_eq("diameter", diameter_of_binary_tree(root), 6)` },
        ],
        solution: {
          text: 'Функция возвращает высоту поддерева (в узлах), а по пути обновляет ответ: путь через узел имеет длину `высота(левого) + высота(правого)` рёбер.',
          code: `
def diameter_of_binary_tree(root):
    best = 0

    def height(node):
        nonlocal best
        if node is None:
            return 0
        left, right = height(node.left), height(node.right)
        best = max(best, left + right)
        return 1 + max(left, right)

    height(root)
    return best
`,
          complexity: '`O(n)` по времени, `O(h)` памяти.',
          mistakes: [
            'Считать только путь через корень: `высота(левого) + высота(правого)` для корня — ответ неверен, когда длинный путь целиком в одном поддереве.',
            'Для каждого узла заново вызывать функцию высоты — `O(n²)`.',
          ],
        },
      },
      {
        id: 'a15t5',
        title: 'Flood Fill',
        source: lc(733, 'flood-fill'),
        text: 'Изображение — матрица чисел (цветов). Начиная с клетки `(sr, sc)`, «залей» новым цветом `color` эту клетку и все клетки исходного цвета, связанные с ней по горизонтали и вертикали. Верни изображение.',
        starter: starter(`
def flood_fill(image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'flood_fill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2)', expected: '[[2, 2, 2], [2, 2, 0], [2, 0, 1]]' }],
        tests: [
          { call: 'flood_fill([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2)', expected: '[[2, 2, 2], [2, 2, 0], [2, 0, 1]]' },
          { call: 'flood_fill([[0, 0, 0], [0, 0, 0]], 0, 0, 0)', expected: '[[0, 0, 0], [0, 0, 0]]' },
          { call: 'flood_fill([[0, 1], [1, 0]], 0, 0, 5)', expected: '[[5, 1], [1, 0]]' },
          { call: 'flood_fill([[7]], 0, 0, 3)', expected: '[[3]]' },
        ],
        solution: {
          text: 'DFS от стартовой клетки по соседям исходного цвета, перекрашивая их. Если новый цвет совпадает с исходным — ничего делать не нужно, иначе обход зациклится.',
          code: `
def flood_fill(image, sr, sc, color):
    old = image[sr][sc]
    if old == color:
        return image
    rows, cols = len(image), len(image[0])
    stack = [(sr, sc)]
    image[sr][sc] = color
    while stack:
        r, c = stack.pop()
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and image[nr][nc] == old:
                image[nr][nc] = color
                stack.append((nr, nc))
    return image
`,
          complexity: '`O(m · n)` по времени и памяти. Перекрашивание служит отметкой посещённых — отдельное множество не нужно.',
          mistakes: [
            'Не обработать случай `old == color` — клетки остаются «исходного цвета», и обход бесконечен.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 16
  {
    id: 'a16',
    week: 3,
    day: 16,
    title: 'BFS: графы и деревья',
    summary: 'Обход в ширину и почему он находит кратчайший путь в невзвешенном графе, BFS по слоям, BFS из нескольких источников, неявные графы на примере Word Ladder, BFS на деревьях: вид справа и минимальная глубина.',
    sections: [
      {
        id: 'bfs',
        title: 'Обход в ширину и кратчайшие пути',
        blocks: [
          p('**BFS** обходит граф «волнами»: сначала стартовая вершина, потом все её соседи (расстояние 1), потом их непосещённые соседи (расстояние 2) и так далее. Нужна очередь `deque`.'),
          p('Главное свойство: в **невзвешенном** графе BFS посещает вершины в порядке возрастания расстояния от старта. Поэтому первый раз, когда мы дошли до цели, — это кратчайший путь. DFS такого не гарантирует.'),
          py(`from collections import deque

graph = {1: [2, 3], 2: [4], 3: [4, 5], 4: [6], 5: [6], 6: []}

def shortest(start, goal):
    dist = {start: 0}
    queue = deque([start])
    while queue:
        v = queue.popleft()
        if v == goal:
            return dist[v]
        for u in graph[v]:
            if u not in dist:            # отмечаем при добавлении в очередь
                dist[u] = dist[v] + 1
                queue.append(u)
    return -1

print(shortest(1, 6))`, '3'),
          warn('Вершину отмечаем посещённой в момент **добавления в очередь**, а не извлечения. Иначе одна вершина попадёт в очередь много раз, и BFS станет медленным.'),
        ],
      },
      {
        id: 'layers',
        title: 'BFS по слоям и из нескольких источников',
        blocks: [
          p('Если важно знать, **на каком шаге** мы находимся (минуты, ходы, уровни дерева), обрабатываем очередь слоями: на каждом шаге внешнего цикла забираем ровно `len(queue)` элементов — это все вершины текущего расстояния.'),
          p('**Многоисточниковый BFS**: если «волна» стартует одновременно из нескольких точек (все гнилые апельсины, все выходы из лабиринта), кладём их **все** в очередь в начале. Дальше BFS работает как обычно, и расстояние до каждой клетки — до ближайшего источника.'),
          h('Неявные графы'),
          p('В Word Ladder вершины — слова, ребро — если слова отличаются одной буквой. Граф заранее не строим: соседей слова генерируем на лету, перебирая позицию и букву, и проверяем по множеству разрешённых слов. Кратчайшая цепочка превращений — это BFS.'),
          h('BFS на деревьях'),
          list(
            '**вид справа**: на каждом уровне видно только последний (самый правый) узел;',
            '**минимальная глубина**: BFS доходит до ближайшего листа первым — можно остановиться сразу, не обходя всё дерево.',
          ),
          tip('Правило выбора: нужен **кратчайший** путь или минимальное число шагов — BFS. Нужно просто обойти всё, найти компоненты или пути с условием — подойдёт DFS.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a16t1',
        title: 'Rotting Oranges',
        source: lc(994, 'rotting-oranges'),
        text: 'В сетке: `0` — пусто, `1` — свежий апельсин, `2` — гнилой. Каждую минуту свежие апельсины, соседние (по 4 направлениям) с гнилыми, тоже гниют. Через сколько минут не останется свежих? Если это невозможно — верни `-1`.',
        starter: starter(`
from collections import deque

def oranges_rotting(grid: list[list[int]]) -> int:
    pass
`),
        examples: [{ call: 'oranges_rotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])', expected: '4' }],
        tests: [
          { call: 'oranges_rotting([[2, 1, 1], [1, 1, 0], [0, 1, 1]])', expected: '4' },
          { call: 'oranges_rotting([[2, 1, 1], [0, 1, 1], [1, 0, 1]])', expected: '-1' },
          { call: 'oranges_rotting([[0, 2]])', expected: '0' },
          { call: 'oranges_rotting([[0]])', expected: '0' },
          { call: 'oranges_rotting([[2, 1, 1, 1, 2]])', expected: '2' },
          { call: 'oranges_rotting([[1]])', expected: '-1' },
        ],
        solution: {
          text: 'Многоисточниковый BFS: в начале кладём в очередь все гнилые апельсины и считаем свежие. Обрабатываем очередь слоями — один слой = одна минута. В конце, если свежие остались, ответ `-1`.',
          code: `
from collections import deque

def oranges_rotting(grid):
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    minutes = 0
    while queue and fresh:
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1
`,
          complexity: '`O(m · n)` по времени и памяти.',
          mistakes: [
            'Запускать BFS отдельно от каждого гнилого апельсина и брать максимум — неверно и медленно: волны идут одновременно.',
            'Считать лишнюю минуту в конце, когда очередь ещё не пуста, а свежих уже нет, — условие `while queue and fresh` это исключает.',
          ],
        },
      },
      {
        id: 'a16t2',
        title: 'Word Ladder',
        source: lc(127, 'word-ladder'),
        text: 'Нужно превратить слово `begin` в слово `end`, меняя по одной букве за шаг; каждое промежуточное слово (и `end`) должно быть в списке `word_list`. Верни число слов в самой короткой цепочке (включая `begin` и `end`) или 0, если цепочки нет. Все слова одной длины, из строчных латинских букв.',
        starter: starter(`
from collections import deque

def ladder_length(begin: str, end: str, word_list: list[str]) -> int:
    pass
`),
        examples: [{ call: 'ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])', expected: '5' }],
        tests: [
          { call: 'ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])', expected: '5' },
          { call: 'ladder_length("hit", "cog", ["hot", "dot", "dog", "lot", "log"])', expected: '0' },
          { call: 'ladder_length("a", "c", ["a", "b", "c"])', expected: '2' },
          { call: 'ladder_length("hot", "dog", ["hot", "dog"])', expected: '0' },
          { call: 'ladder_length("lost", "cost", ["most", "fist", "lost", "cost", "fish"])', expected: '2' },
        ],
        solution: {
          text: 'BFS по неявному графу слов. Соседей генерируем, заменяя каждую позицию на каждую букву, и оставляем только слова из множества. Посещённые слова удаляем из множества, чтобы не возвращаться к ним.',
          code: `
from collections import deque

def ladder_length(begin, end, word_list):
    words = set(word_list)
    if end not in words:
        return 0
    queue = deque([(begin, 1)])
    words.discard(begin)
    while queue:
        word, steps = queue.popleft()
        if word == end:
            return steps
        for i in range(len(word)):
            for ch in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + ch + word[i + 1:]
                if nxt in words:
                    words.remove(nxt)
                    queue.append((nxt, steps + 1))
    return 0
`,
          complexity: '`O(N · L · 26)` по времени, где `N` — число слов, `L` — их длина.',
          mistakes: [
            'Сравнивать каждое слово со всеми остальными, чтобы найти соседей, — `O(N² · L)`; на больших словарях слишком медленно.',
            'Проверять `nxt in word_list` по списку — `O(N)` на проверку.',
            'Вернуть число превращений, а не число слов, — ответ меньше на 1.',
          ],
        },
      },
      {
        id: 'a16t3',
        title: 'Binary Tree Right Side View',
        source: lc(199, 'binary-tree-right-side-view'),
        prelude: TREE,
        text: 'Представь, что смотришь на дерево справа. Верни значения видимых узлов сверху вниз — самый правый узел каждого уровня.',
        starter: starter(`
${TREE_DOC}
from collections import deque

def right_side_view(root) -> list[int]:
    pass
`),
        examples: [{ call: 'right_side_view(build_tree([1, 2, 3, None, 5, None, 4]))', expected: '[1, 3, 4]' }],
        tests: [
          { call: 'right_side_view(build_tree([1, 2, 3, None, 5, None, 4]))', expected: '[1, 3, 4]' },
          { call: 'right_side_view(build_tree([1, None, 3]))', expected: '[1, 3]' },
          { call: 'right_side_view(build_tree([]))', expected: '[]' },
          { call: 'right_side_view(build_tree([1, 2, 3, 4]))', expected: '[1, 3, 4]' },
        ],
        solution: {
          text: 'BFS по уровням: последний узел каждого уровня и есть видимый справа.',
          code: `
from collections import deque

def right_side_view(root):
    if not root:
        return []
    res, queue = [], deque([root])
    while queue:
        size = len(queue)
        for i in range(size):
            node = queue.popleft()
            if i == size - 1:
                res.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return res
`,
          complexity: '`O(n)` по времени, `O(w)` памяти.',
          mistakes: [
            'Идти только по правым детям — левый узел нижнего уровня тоже может быть виден (тест `[1, 2, 3, 4]`).',
          ],
        },
      },
      {
        id: 'a16t4',
        title: 'Shortest Path in Binary Matrix',
        source: lc(1091, 'shortest-path-in-binary-matrix'),
        text: 'Матрица `n × n` из 0 и 1. Найди длину кратчайшего пути из левого верхнего угла в правый нижний только по клеткам с 0, двигаясь в любую из **8** соседних клеток. Длина — число клеток в пути. Если пути нет, верни `-1`.',
        starter: starter(`
from collections import deque

def shortest_path_binary_matrix(grid: list[list[int]]) -> int:
    pass
`),
        examples: [{ call: 'shortest_path_binary_matrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]])', expected: '4' }],
        tests: [
          { call: 'shortest_path_binary_matrix([[0, 1], [1, 0]])', expected: '2' },
          { call: 'shortest_path_binary_matrix([[0, 0, 0], [1, 1, 0], [1, 1, 0]])', expected: '4' },
          { call: 'shortest_path_binary_matrix([[1, 0, 0], [1, 1, 0], [1, 1, 0]])', expected: '-1' },
          { call: 'shortest_path_binary_matrix([[0]])', expected: '1' },
          { call: 'shortest_path_binary_matrix([[0, 1, 1], [1, 1, 1], [1, 1, 0]])', expected: '-1' },
          { label: 'пустое поле 100 × 100', perf: true, code: `grid = [[0] * 100 for _ in range(100)]
__kiro_eq("shortest_path_binary_matrix", shortest_path_binary_matrix(grid), 100)` },
        ],
        solution: {
          text: 'BFS из левого верхнего угла по 8 направлениям. Расстояние храним вместе с клеткой в очереди, посещённые клетки помечаем единицей.',
          code: `
from collections import deque

def shortest_path_binary_matrix(grid):
    n = len(grid)
    if grid[0][0] or grid[n - 1][n - 1]:
        return -1
    queue = deque([(0, 0, 1)])
    grid[0][0] = 1
    while queue:
        r, c, d = queue.popleft()
        if r == n - 1 and c == n - 1:
            return d
        for dr in (-1, 0, 1):
            for dc in (-1, 0, 1):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 0:
                    grid[nr][nc] = 1
                    queue.append((nr, nc, d + 1))
    return -1
`,
          complexity: '`O(n²)` по времени и памяти.',
          mistakes: [
            'Забыть проверить стартовую и конечную клетки — путь из занятой клетки невозможен.',
            'Искать путь DFS — он найдёт какой-то путь, но не обязательно кратчайший.',
          ],
        },
      },
      {
        id: 'a16t5',
        title: 'Minimum Depth of Binary Tree',
        source: lc(111, 'minimum-depth-of-binary-tree'),
        prelude: TREE,
        text: 'Минимальная глубина — число узлов на самом коротком пути от корня до **листа**. У пустого дерева — 0.',
        starter: starter(`
${TREE_DOC}
from collections import deque

def min_depth(root) -> int:
    pass
`),
        examples: [{ call: 'min_depth(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '2' }],
        tests: [
          { call: 'min_depth(build_tree([3, 9, 20, None, None, 15, 7]))', expected: '2' },
          { call: 'min_depth(build_tree([2, None, 3, None, 4, None, 5, None, 6]))', expected: '5' },
          { call: 'min_depth(build_tree([]))', expected: '0' },
          { call: 'min_depth(build_tree([1, 2]))', expected: '2' },
        ],
        solution: {
          text: 'BFS по уровням: первый встреченный лист — на минимальной глубине, дальше можно не обходить.',
          code: `
from collections import deque

def min_depth(root):
    if not root:
        return 0
    queue = deque([(root, 1)])
    while queue:
        node, depth = queue.popleft()
        if not node.left and not node.right:
            return depth
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))
`,
          complexity: '`O(n)` в худшем случае, но BFS останавливается на ближайшем листе.',
          mistakes: [
            'Копировать решение Max Depth с `min` вместо `max`: у узла с одним ребёнком пустое поддерево даст 0, а это не путь до листа (тест `[1, 2]` → 2, а не 1).',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 17
  {
    id: 'a17',
    week: 3,
    day: 17,
    title: 'Двоичные деревья поиска и рекурсия',
    summary: 'Свойство двоичного дерева поиска, поиск и вставка за O(h), проверка корректности с границами, симметричный обход как сортировка, наименьший общий предок, построение сбалансированного дерева, проверка сбалансированности за O(n).',
    sections: [
      {
        id: 'bst',
        title: 'Двоичное дерево поиска',
        blocks: [
          p('**Двоичное дерево поиска** (BST) — двоичное дерево, где для каждого узла **все** значения левого поддерева меньше значения узла, а **все** значения правого — больше. Благодаря этому поиск идёт как двоичный: сравнили с узлом — ушли в одно поддерево.'),
          shell(`        8
       / \\
      3   10
     / \\    \\
    1   6    14
       / \\   /
      4   7 13
симметричный обход: 1 3 4 6 7 8 10 13 14 — по возрастанию`, 'Схема'),
          table(['Операция', 'Сбалансированное дерево', 'Вырожденное («бамбук»)'], [
            ['поиск, вставка, удаление', '`O(log n)`', '`O(n)`'],
            ['высота', '`O(log n)`', '`O(n)`'],
          ]),
          p('Поэтому в реальных системах используют **самобалансирующиеся** деревья (красно-чёрные, AVL, B-деревья в индексах баз данных), которые поддерживают высоту `O(log n)`. На собеседовании достаточно понимать свойство BST и уметь им пользоваться.'),
          h('Ключевые приёмы'),
          list(
            '**симметричный обход** BST выдаёт значения в отсортированном порядке — отсюда `k`-й наименьший элемент и проверка корректности;',
            '**проверка с границами**: недостаточно сравнить узел с детьми — каждое значение должно лежать в интервале `(low, high)`, который сужается при спуске;',
            '**поиск по значению** спускается в одну сторону — общий предок двух узлов находится там, где их пути расходятся.',
          ),
        ],
      },
      {
        id: 'recursion',
        title: 'Рекурсия, которая возвращает больше одного значения',
        blocks: [
          p('Проверка сбалансированности «в лоб» считает высоту каждого поддерева заново — `O(n²)`. Быстрее: функция за один обход возвращает высоту, а «несбалансированность» передаёт специальным значением (например, `-1`). Если в каком-то поддереве уже `-1` — сразу возвращаем `-1` наверх.'),
          p('Построение сбалансированного BST из отсортированного массива — пример «разделяй и властвуй»: средний элемент — корень, левая половина — левое поддерево, правая — правое, рекурсивно.'),
          py(`class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val, self.left, self.right = val, left, right

def build(nums, lo, hi):
    if lo > hi:
        return None
    mid = (lo + hi) // 2
    return TreeNode(nums[mid], build(nums, lo, mid - 1), build(nums, mid + 1, hi))

def height(n):
    return 0 if n is None else 1 + max(height(n.left), height(n.right))

root = build(list(range(1, 16)), 0, 14)
print(root.val, height(root))       # 15 элементов — высота 4`, '8 4'),
          tip('Рекурсивную функцию удобно проектировать вопросом: «что мне должны вернуть дети, чтобы я посчитал ответ для себя?»'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a17t1',
        title: 'Validate Binary Search Tree',
        source: lc(98, 'validate-binary-search-tree'),
        prelude: TREE,
        text: 'Проверь, является ли дерево корректным двоичным деревом поиска: в левом поддереве каждого узла все значения строго меньше, в правом — строго больше.',
        starter: starter(`
${TREE_DOC}
def is_valid_bst(root) -> bool:
    pass
`),
        examples: [{ call: 'is_valid_bst(build_tree([5, 1, 4, None, None, 3, 6]))', expected: 'False' }],
        tests: [
          { call: 'is_valid_bst(build_tree([2, 1, 3]))', expected: 'True' },
          { call: 'is_valid_bst(build_tree([5, 1, 4, None, None, 3, 6]))', expected: 'False' },
          { call: 'is_valid_bst(build_tree([5, 4, 6, None, None, 3, 7]))', expected: 'False' },
          { call: 'is_valid_bst(build_tree([2, 2, 2]))', expected: 'False' },
          { call: 'is_valid_bst(build_tree([1]))', expected: 'True' },
          { call: 'is_valid_bst(build_tree([8, 3, 10, 1, 6, None, 14, None, None, 4, 7, 13]))', expected: 'True' },
        ],
        solution: {
          text: 'Передаём вниз допустимый интервал `(low, high)`. Спускаясь влево, верхняя граница становится значением узла, вправо — нижняя.',
          code: `
def is_valid_bst(root):
    def check(node, low, high):
        if node is None:
            return True
        if not (low < node.val < high):
            return False
        return check(node.left, low, node.val) and check(node.right, node.val, high)
    return check(root, float("-inf"), float("inf"))
`,
          complexity: '`O(n)` по времени, `O(h)` памяти. Вариант: симметричный обход должен давать строго возрастающую последовательность.',
          mistakes: [
            'Сравнивать узел только с его детьми — дерево `[5, 4, 6, None, None, 3, 7]` пройдёт, хотя 3 в правом поддереве пятёрки.',
            'Нестрогое сравнение — одинаковые значения в BST недопустимы (тест `[2, 2, 2]`).',
          ],
        },
      },
      {
        id: 'a17t2',
        title: 'Lowest Common Ancestor of a BST',
        source: lc(235, 'lowest-common-ancestor-of-a-binary-search-tree'),
        prelude: TREE,
        text: 'Даны корень BST и два его узла `p` и `q`. Найди их **наименьшего общего предка** — самый глубокий узел, у которого и `p`, и `q` в поддереве (узел считается потомком самого себя). Используй свойство BST.',
        starter: starter(`
${TREE_DOC}
def lowest_common_ancestor(root, p, q):
    pass
`),
        examples: [{ call: 'root = build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5]); lowest_common_ancestor(root, find_node(root, 2), find_node(root, 8)).val', expected: '6' }],
        tests: [
          { label: 'p = 2, q = 8', code: `root = build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5])
assert lowest_common_ancestor(root, find_node(root, 2), find_node(root, 8)) is root, "ответ — узел 6"` },
          { label: 'p = 2, q = 4 — предок сам p', code: `root = build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5])
__kiro_eq("lca(2, 4)", lowest_common_ancestor(root, find_node(root, 2), find_node(root, 4)).val, 2)` },
          { label: 'p = 3, q = 5', code: `root = build_tree([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5])
__kiro_eq("lca(3, 5)", lowest_common_ancestor(root, find_node(root, 3), find_node(root, 5)).val, 4)` },
          { label: 'дерево из двух узлов', code: `root = build_tree([2, 1])
__kiro_eq("lca(2, 1)", lowest_common_ancestor(root, find_node(root, 2), find_node(root, 1)).val, 2)` },
        ],
        solution: {
          text: 'Если оба значения меньше значения узла, предок в левом поддереве; если оба больше — в правом. Иначе пути `p` и `q` расходятся здесь — это и есть ответ.',
          code: `
def lowest_common_ancestor(root, p, q):
    node = root
    while node:
        if p.val < node.val and q.val < node.val:
            node = node.left
        elif p.val > node.val and q.val > node.val:
            node = node.right
        else:
            return node
`,
          complexity: '`O(h)` по времени, `O(1)` памяти.',
          mistakes: [
            'Решать как для произвольного дерева, обходя всё, — `O(n)` и лишний код; свойство BST даёт `O(h)`.',
          ],
        },
      },
      {
        id: 'a17t3',
        title: 'Kth Smallest Element in a BST',
        source: lc(230, 'kth-smallest-element-in-a-bst'),
        prelude: TREE,
        text: 'Верни `k`-е по величине (начиная с 1) наименьшее значение в BST.',
        starter: starter(`
${TREE_DOC}
def kth_smallest(root, k: int) -> int:
    pass
`),
        examples: [{ call: 'kth_smallest(build_tree([5, 3, 6, 2, 4, None, None, 1]), 3)', expected: '3' }],
        tests: [
          { call: 'kth_smallest(build_tree([3, 1, 4, None, 2]), 1)', expected: '1' },
          { call: 'kth_smallest(build_tree([5, 3, 6, 2, 4, None, None, 1]), 3)', expected: '3' },
          { call: 'kth_smallest(build_tree([5, 3, 6, 2, 4, None, None, 1]), 6)', expected: '6' },
          { call: 'kth_smallest(build_tree([1]), 1)', expected: '1' },
        ],
        solution: {
          text: 'Симметричный обход BST выдаёт значения по возрастанию. Обходим итеративно со стеком и останавливаемся на `k`-м значении.',
          code: `
def kth_smallest(root, k):
    stack = []
    node = root
    while stack or node:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right
`,
          complexity: '`O(h + k)` по времени, `O(h)` памяти — обход останавливается, не доходя до конца.',
          mistakes: [
            'Собрать все значения в список и отсортировать — `O(n log n)`, не использует свойство BST.',
          ],
        },
      },
      {
        id: 'a17t4',
        title: 'Convert Sorted Array to BST',
        source: lc(108, 'convert-sorted-array-to-binary-search-tree'),
        prelude: TREE + BST_CHECK,
        text: 'Список `nums` отсортирован по возрастанию. Построй из него **сбалансированное** двоичное дерево поиска (высоты поддеревьев любого узла отличаются не больше чем на 1) и верни корень. Подойдёт любое такое дерево.',
        starter: starter(`
${TREE_DOC}
def sorted_array_to_bst(nums: list[int]):
    pass
`),
        examples: [{ call: 'sorted_array_to_bst([-10, -3, 0, 5, 9])', expected: 'например, [0, -3, 9, -10, None, 5]' }],
        tests: [
          { label: '[-10, -3, 0, 5, 9]', code: `root = sorted_array_to_bst([-10, -3, 0, 5, 9])
__kiro_eq("симметричный обход", _inorder(root, []), [-10, -3, 0, 5, 9])
assert _height(root) >= 0, "дерево не сбалансировано"` },
          { label: '[1, 3]', code: `root = sorted_array_to_bst([1, 3])
__kiro_eq("симметричный обход", _inorder(root, []), [1, 3])
assert _height(root) >= 0, "дерево не сбалансировано"` },
          { label: 'пустой список', code: `__kiro_eq("sorted_array_to_bst([])", sorted_array_to_bst([]), None)` },
          { label: '1000 элементов', code: `nums = list(range(1000))
root = sorted_array_to_bst(nums)
__kiro_eq("симметричный обход", _inorder(root, []), nums)
assert _height(root) == 10, "у сбалансированного дерева из 1000 узлов высота 10"` },
        ],
        solution: {
          text: 'Средний элемент — корень, левая половина массива — левое поддерево, правая — правое. Половины отличаются по размеру не больше чем на 1, поэтому дерево сбалансировано.',
          code: `
def sorted_array_to_bst(nums):
    def build(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2
        return TreeNode(nums[mid], build(lo, mid - 1), build(mid + 1, hi))
    return build(0, len(nums) - 1)
`,
          complexity: '`O(n)` по времени, `O(log n)` памяти на рекурсию.',
          mistakes: [
            'Передавать в рекурсию срезы `nums[:mid]` — каждый срез копирует часть массива, итого `O(n log n)` времени и лишняя память.',
            'Вставлять элементы по одному в порядке возрастания — получится «бамбук» высоты `n`.',
          ],
        },
      },
      {
        id: 'a17t5',
        title: 'Balanced Binary Tree',
        source: lc(110, 'balanced-binary-tree'),
        prelude: TREE,
        text: 'Проверь, сбалансировано ли дерево: у **каждого** узла высоты левого и правого поддеревьев отличаются не больше чем на 1. Ожидается `O(n)`.',
        starter: starter(`
${TREE_DOC}
def is_balanced(root) -> bool:
    pass
`),
        examples: [{ call: 'is_balanced(build_tree([1, 2, 2, 3, 3, None, None, 4, 4]))', expected: 'False' }],
        tests: [
          { call: 'is_balanced(build_tree([3, 9, 20, None, None, 15, 7]))', expected: 'True' },
          { call: 'is_balanced(build_tree([1, 2, 2, 3, 3, None, None, 4, 4]))', expected: 'False' },
          { call: 'is_balanced(build_tree([]))', expected: 'True' },
          { call: 'is_balanced(build_tree([1, 2, 2, 3, None, None, 3, 4, None, None, 4]))', expected: 'False' },
          { call: 'is_balanced(build_tree([1, 2, 3, 4, 5, None, 6]))', expected: 'True' },
        ],
        solution: {
          text: 'Одна рекурсия возвращает высоту поддерева или `-1`, если оно несбалансировано. Несбалансированность ребёнка сразу поднимается наверх.',
          code: `
def is_balanced(root):
    def height(node):
        if node is None:
            return 0
        left = height(node.left)
        if left < 0:
            return -1
        right = height(node.right)
        if right < 0 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return height(root) >= 0
`,
          complexity: '`O(n)` по времени, `O(h)` памяти.',
          mistakes: [
            'Проверять баланс только у корня — нижние узлы тоже должны быть сбалансированы (тест с «лапками» `[1, 2, 2, 3, None, None, 3, 4, None, None, 4]`).',
            'Для каждого узла отдельно считать высоты детей — `O(n²)`.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 18
  {
    id: 'a18',
    week: 3,
    day: 18,
    title: 'Жадные алгоритмы',
    summary: 'Что такое жадный алгоритм и когда он работает, как обосновать жадный выбор, типовые схемы: локальный выбор на каждом шаге, сортировка и выбор, «самый дальний достижимый», задачи на интервалы.',
    sections: [
      {
        id: 'greedy',
        title: 'Идея жадного алгоритма',
        blocks: [
          p('**Жадный алгоритм** на каждом шаге делает **локально лучший** выбор и никогда его не пересматривает. Он работает быстро и пишется коротко, но корректен не всегда: локально лучший выбор может испортить итоговый ответ.'),
          p('Пример, где жадность ломается: размен суммы 6 монетами `{1, 3, 4}`. Жадно берём самую крупную: `4 + 1 + 1` — три монеты, а оптимально `3 + 3` — две. Такие задачи решают динамическим программированием.'),
          h('Как обосновать жадность на собеседовании'),
          list(
            '**Аргумент обмена**: возьмём любое оптимальное решение; если оно отличается от жадного, его можно поменять в сторону жадного выбора, не ухудшив ответ.',
            '**Инвариант**: жадный алгоритм после каждого шага «не отстаёт» от любого другого решения.',
            '**Контрпример**: если быстро нашёлся пример, где жадность ошибается, — подход неверный.',
          ),
          tip('На собеседовании достаточно проговорить интуицию аргумента обмена. Строгое доказательство обычно не требуют, а вот контрпример к неверной жадности спросить могут.'),
        ],
      },
      {
        id: 'schemes',
        title: 'Типовые жадные схемы',
        blocks: [
          table(['Схема', 'Идея', 'Задача урока'], [
            ['собирать всю выгоду', 'суммировать каждый положительный шаг', 'Best Time to Buy and Sell Stock II'],
            ['самый дальний достижимый', 'поддерживать максимум, куда можно дойти', 'Jump Game'],
            ['сброс при провале', 'если запас ушёл в минус — начать заново со следующей точки', 'Gas Station'],
            ['сортировка + пары', 'отсортировать оба списка и сопоставлять меньшие с меньшими', 'Assign Cookies'],
            ['интервалы по концу', 'сортировать по концу и брать интервал, который заканчивается раньше всех', 'Non-overlapping Intervals'],
          ]),
          p('Последняя схема — классика: из пересекающихся интервалов выгоднее всего оставить тот, что **раньше заканчивается**, — он освобождает больше места для следующих. Это задача о выборе заявок (activity selection).'),
          py(`intervals = [[1, 3], [2, 4], [3, 5], [6, 8], [5, 7]]
intervals.sort(key=lambda x: x[1])      # по концу
chosen, end = [], float("-inf")
for s, e in intervals:
    if s >= end:                        # не пересекается с выбранными
        chosen.append([s, e])
        end = e
print(chosen)`, '[[1, 3], [3, 5], [5, 7]]'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a18t1',
        title: 'Best Time to Buy and Sell Stock II',
        source: lc(122, 'best-time-to-buy-and-sell-stock-ii'),
        text: '`prices[i]` — цена акции в день `i`. Можно сколько угодно раз покупать и продавать, но держать одновременно не больше одной акции (продать можно в тот же день, когда купил следующую). Найди максимальную прибыль.',
        starter: starter(`
def max_profit(prices: list[int]) -> int:
    pass
`),
        examples: [{ call: 'max_profit([7, 1, 5, 3, 6, 4])', expected: '7' }],
        tests: [
          { call: 'max_profit([7, 1, 5, 3, 6, 4])', expected: '7' },
          { call: 'max_profit([1, 2, 3, 4, 5])', expected: '4' },
          { call: 'max_profit([7, 6, 4, 3, 1])', expected: '0' },
          { call: 'max_profit([5])', expected: '0' },
          { call: 'max_profit([2, 1, 2, 0, 1])', expected: '2' },
        ],
        solution: {
          text: 'Прибыль от любой сделки на отрезке роста равна сумме ежедневных приростов. Поэтому достаточно суммировать все положительные разности соседних дней.',
          code: `
def max_profit(prices):
    return sum(max(0, prices[i] - prices[i - 1]) for i in range(1, len(prices)))
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Искать один лучший интервал «купить дёшево — продать дорого» — это другая задача (Stock I).',
          ],
        },
      },
      {
        id: 'a18t2',
        title: 'Jump Game',
        source: lc(55, 'jump-game'),
        text: 'Стоишь на первой позиции массива `nums`. `nums[i]` — максимальная длина прыжка из позиции `i`. Можно ли добраться до последней позиции? Ожидается `O(n)`.',
        starter: starter(`
def can_jump(nums: list[int]) -> bool:
    pass
`),
        examples: [{ call: 'can_jump([3, 2, 1, 0, 4])', expected: 'False' }],
        tests: [
          { call: 'can_jump([2, 3, 1, 1, 4])', expected: 'True' },
          { call: 'can_jump([3, 2, 1, 0, 4])', expected: 'False' },
          { call: 'can_jump([0])', expected: 'True' },
          { call: 'can_jump([0, 1])', expected: 'False' },
          { call: 'can_jump([2, 0, 0])', expected: 'True' },
          { label: 'большой массив', perf: true, code: `nums = [1] * 100000
__kiro_eq("can_jump([1] * 100000)", can_jump(nums), True)
nums = list(range(50000, 0, -1)) + [0, 0]
__kiro_eq("can_jump(убывающий)", can_jump(nums), False)` },
        ],
        solution: {
          text: 'Поддерживаем самую дальнюю достижимую позицию. Если текущая позиция дальше неё — до неё не дойти. Иначе обновляем максимум `i + nums[i]`.',
          code: `
def can_jump(nums):
    reach = 0
    for i, jump in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + jump)
    return True
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Перебирать все варианты прыжков рекурсией — экспоненциальное время.',
            'Всегда прыгать на максимальную длину — можно перепрыгнуть хорошую позицию и попасть в ноль.',
          ],
        },
      },
      {
        id: 'a18t3',
        title: 'Gas Station',
        source: lc(134, 'gas-station'),
        text: 'Заправки стоят по кругу. На заправке `i` можно залить `gas[i]` топлива, путь до следующей стоит `cost[i]`. Бак изначально пуст. Найди индекс заправки, начав с которой можно объехать круг по часовой стрелке, или `-1`. Если ответ есть, он единственный. Ожидается `O(n)`.',
        starter: starter(`
def can_complete_circuit(gas: list[int], cost: list[int]) -> int:
    pass
`),
        examples: [{ call: 'can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])', expected: '3' }],
        tests: [
          { call: 'can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])', expected: '3' },
          { call: 'can_complete_circuit([2, 3, 4], [3, 4, 3])', expected: '-1' },
          { call: 'can_complete_circuit([5], [4])', expected: '0' },
          { call: 'can_complete_circuit([3, 1, 1], [1, 2, 2])', expected: '0' },
          { label: 'большой массив', perf: true, code: `n = 100000
gas = [1] * n
cost = [1] * n
cost[0] = 2
cost[n - 2] = 2
gas[n - 1] = 3
__kiro_eq("can_complete_circuit", can_complete_circuit(gas, cost), n - 1)` },
        ],
        solution: {
          text: 'Если общий запас `sum(gas) − sum(cost)` отрицателен, объехать нельзя. Иначе идём по кругу с текущим запасом: как только он ушёл в минус, ни одна заправка от старта до текущей не подходит — новый кандидат на старт — следующая заправка.',
          code: `
def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    start = tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    return start
`,
          complexity: '`O(n)` по времени, `O(1)` памяти.',
          mistakes: [
            'Пробовать стартовать с каждой заправки и симулировать круг — `O(n²)`.',
          ],
        },
      },
      {
        id: 'a18t4',
        title: 'Assign Cookies',
        source: lc(455, 'assign-cookies'),
        text: 'У ребёнка `i` жадность `g[i]` — он доволен печеньем размера не меньше `g[i]`. Размеры печений — `s`. Каждому ребёнку — не больше одного печенья. Найди максимальное число довольных детей.',
        starter: starter(`
def find_content_children(g: list[int], s: list[int]) -> int:
    pass
`),
        examples: [{ call: 'find_content_children([1, 2], [1, 2, 3])', expected: '2' }],
        tests: [
          { call: 'find_content_children([1, 2, 3], [1, 1])', expected: '1' },
          { call: 'find_content_children([1, 2], [1, 2, 3])', expected: '2' },
          { call: 'find_content_children([10, 9, 8, 7], [5, 6, 7, 8])', expected: '2' },
          { call: 'find_content_children([], [1])', expected: '0' },
          { call: 'find_content_children([2, 2], [1, 1, 1])', expected: '0' },
        ],
        solution: {
          text: 'Сортируем оба списка. Самому нежадному ребёнку отдаём самое маленькое подходящее печенье: идём двумя указателями; если печенье подходит — ребёнок доволен, переходим к следующему ребёнку; в любом случае печенье расходуется.',
          code: `
def find_content_children(g, s):
    g, s = sorted(g), sorted(s)
    child = 0
    for cookie in s:
        if child < len(g) and cookie >= g[child]:
            child += 1
    return child
`,
          complexity: '`O(n log n + m log m)` из-за сортировки.',
          mistakes: [
            'Отдавать самому жадному ребёнку самое большое печенье, не сортируя, — порядок обработки становится случайным.',
          ],
        },
      },
      {
        id: 'a18t5',
        title: 'Non-overlapping Intervals',
        source: lc(435, 'non-overlapping-intervals'),
        text: 'Какое минимальное число интервалов нужно удалить, чтобы оставшиеся не пересекались? Интервалы, касающиеся концами (`[1, 2]` и `[2, 3]`), не пересекаются.',
        starter: starter(`
def erase_overlap_intervals(intervals: list[list[int]]) -> int:
    pass
`),
        examples: [{ call: 'erase_overlap_intervals([[1, 2], [2, 3], [3, 4], [1, 3]])', expected: '1' }],
        tests: [
          { call: 'erase_overlap_intervals([[1, 2], [2, 3], [3, 4], [1, 3]])', expected: '1' },
          { call: 'erase_overlap_intervals([[1, 2], [1, 2], [1, 2]])', expected: '2' },
          { call: 'erase_overlap_intervals([[1, 2], [2, 3]])', expected: '0' },
          { call: 'erase_overlap_intervals([[1, 100], [11, 22], [1, 11], [2, 12]])', expected: '2' },
          { call: 'erase_overlap_intervals([[0, 5]])', expected: '0' },
        ],
        solution: {
          text: 'Сортируем по концу и жадно оставляем интервал, который заканчивается раньше всех среди непересекающихся с уже оставленными. Удалить нужно все остальные.',
          code: `
def erase_overlap_intervals(intervals):
    intervals = sorted(intervals, key=lambda x: x[1])
    kept, end = 0, float("-inf")
    for s, e in intervals:
        if s >= end:
            kept += 1
            end = e
    return len(intervals) - kept
`,
          complexity: '`O(n log n)` из-за сортировки.',
          mistakes: [
            'Сортировать по началу и оставлять первый попавшийся — длинный интервал `[1, 100]` вытеснит все короткие.',
            'Считать касание концами пересечением (`s > end` вместо `s >= end`).',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 19
  {
    id: 'a19',
    week: 3,
    day: 19,
    title: 'Куча и очередь с приоритетом',
    summary: 'Двоичная куча и её операции, модуль heapq и максимальная куча через минус, top-k элементов кучей размера k, слияние k отсортированных списков, медиана потока двумя кучами.',
    sections: [
      {
        id: 'heap',
        title: 'Двоичная куча',
        blocks: [
          p('**Куча** (heap) — структура, которая быстро отдаёт **минимальный** элемент. Внутри это полное двоичное дерево, записанное в массив: у элемента с индексом `i` дети — `2i + 1` и `2i + 2`. Свойство кучи: каждый родитель не больше своих детей, поэтому минимум всегда в `heap[0]`.'),
          table(['Операция', 'heapq', 'Сложность'], [
            ['посмотреть минимум', '`heap[0]`', '`O(1)`'],
            ['добавить', '`heapq.heappush(heap, x)`', '`O(log n)`'],
            ['извлечь минимум', '`heapq.heappop(heap)`', '`O(log n)`'],
            ['превратить список в кучу', '`heapq.heapify(a)`', '`O(n)`'],
            ['добавить и сразу извлечь минимум', '`heapq.heappushpop(heap, x)`', '`O(log n)`'],
          ]),
          py(`import heapq

heap = []
for x in [5, 1, 8, 3, 2]:
    heapq.heappush(heap, x)
print(heap[0])                                # минимум
print([heapq.heappop(heap) for _ in range(3)])

# в Python куча только минимальная — максимальную делают через минус
max_heap = []
for x in [5, 1, 8]:
    heapq.heappush(max_heap, -x)
print(-max_heap[0])`, '1\n[1, 2, 3]\n8'),
          note('В кучу можно класть кортежи — они сравниваются по первому элементу, при равенстве по второму. Так хранят «приоритет + данные»: `(расстояние, точка)`, `(значение, номер списка)`. Если вторые элементы несравнимы (например, узлы списка), добавляют в кортеж уникальный номер.'),
        ],
      },
      {
        id: 'patterns',
        title: 'Паттерны с кучей',
        blocks: [
          h('Top-k: куча размера k'),
          p('Чтобы найти `k` наибольших элементов, держим **минимальную** кучу из `k` элементов. Новый элемент добавляем, и если куча стала больше `k`, выбрасываем минимум. В конце в куче — `k` наибольших, а на вершине — `k`-й по величине. Время `O(n log k)` вместо `O(n log n)` у сортировки, память `O(k)`.'),
          h('Слияние k отсортированных списков'),
          p('В куче лежат текущие «головы» всех списков. Извлекаем минимальную голову, кладём её в результат, а в кучу — следующий элемент того же списка. Каждый элемент проходит через кучу размера `k` один раз: `O(N log k)`.'),
          h('Медиана потока: две кучи'),
          p('Числа приходят по одному, нужно в любой момент знать медиану. Делим числа на две половины: **максимальная** куча хранит меньшую половину, **минимальная** — большую. Размеры отличаются не больше чем на 1. Медиана — вершина большей кучи или среднее двух вершин.'),
          shell(`меньшая половина (max-куча)   |   большая половина (min-куча)
        1  2  [3]               |        [5]  8  9
медиана = (3 + 5) / 2 = 4`, 'Схема'),
          warn('Сортировать весь массив ради `k` элементов — `O(n log n)`. На собеседовании это допустимый первый ответ, но следом спросят, как сделать за `O(n log k)`.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a19t1',
        title: 'Kth Largest Element in an Array',
        source: lc(215, 'kth-largest-element-in-an-array'),
        text: 'Найди `k`-й по величине элемент массива (в отсортированном по убыванию порядке, повторы учитываются). Без сортировки — используй кучу размера `k`.',
        starter: starter(`
import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    pass
`),
        examples: [{ call: 'find_kth_largest([3, 2, 1, 5, 6, 4], 2)', expected: '5' }],
        tests: [
          { forbid: ['sorted', '.sort', 'nlargest'], label: 'Без sorted(), .sort() и nlargest()' },
          { call: 'find_kth_largest([3, 2, 1, 5, 6, 4], 2)', expected: '5' },
          { call: 'find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)', expected: '4' },
          { call: 'find_kth_largest([1], 1)', expected: '1' },
          { call: 'find_kth_largest([-1, -1, -2], 3)', expected: '-2' },
          { label: 'большой массив', perf: true, code: `nums = [(i * 7919) % 100003 for i in range(100000)]
__kiro_eq("find_kth_largest", find_kth_largest(nums, 100), sorted(nums)[-100])` },
        ],
        solution: {
          text: 'Минимальная куча из `k` наибольших просмотренных элементов. Когда куча переполняется, выбрасываем её минимум. В конце на вершине — `k`-й по величине.',
          code: `
import heapq

def find_kth_largest(nums, k):
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
`,
          complexity: '`O(n log k)` по времени, `O(k)` памяти. Быстрый выбор (quickselect) даёт `O(n)` в среднем — хороший ответ на вопрос «а быстрее?».',
          mistakes: [
            'Положить в кучу все `n` элементов и `k` раз извлечь максимум — `O(n + k log n)`; работает, но память `O(n)`.',
            'Использовать максимальную кучу размера `k` — на вершине окажется не `k`-й, а наибольший.',
          ],
        },
      },
      {
        id: 'a19t2',
        title: 'Top K Frequent Elements (куча)',
        source: lc(347, 'top-k-frequent-elements'),
        text: 'Снова Top K Frequent Elements, но теперь через кучу: верни `k` самых частых элементов в любом порядке за `O(n log k)`. Без сортировки и `most_common`.',
        starter: starter(`
import heapq
from collections import Counter

def top_k_frequent_heap(nums: list[int], k: int) -> list[int]:
    pass
`),
        examples: [{ call: 'top_k_frequent_heap([1, 1, 1, 2, 2, 3], 2)', expected: '[1, 2]' }],
        tests: [
          { forbid: ['sorted', '.sort', '.most_common', 'nlargest'], label: 'Без сортировки, most_common() и nlargest()' },
          { label: 'top_k_frequent_heap([1, 1, 1, 2, 2, 3], 2)', code: `__kiro_eq("ответ", sorted(top_k_frequent_heap([1, 1, 1, 2, 2, 3], 2)), [1, 2])` },
          { label: 'top_k_frequent_heap([1], 1)', code: `__kiro_eq("ответ", sorted(top_k_frequent_heap([1], 1)), [1])` },
          { label: 'top_k_frequent_heap([4, 4, 4, 6, 6, 7, 7, 7, 7], 2)', code: `__kiro_eq("ответ", sorted(top_k_frequent_heap([4, 4, 4, 6, 6, 7, 7, 7, 7], 2)), [4, 7])` },
        ],
        solution: {
          text: 'Считаем частоты, затем держим минимальную кучу пар `(частота, элемент)` размера `k`: при переполнении выбрасываем самый редкий.',
          code: `
import heapq
from collections import Counter

def top_k_frequent_heap(nums, k):
    heap = []
    for x, f in Counter(nums).items():
        heapq.heappush(heap, (f, x))
        if len(heap) > k:
            heapq.heappop(heap)
    return [x for f, x in heap]
`,
          complexity: '`O(n log k)` по времени, `O(n)` памяти на счётчик. Сравни с решением «корзинами» из дня 4: там `O(n)`.',
          mistakes: [
            'Класть в кучу `(x, f)` — куча будет упорядочена по значению, а не по частоте.',
          ],
        },
      },
      {
        id: 'a19t3',
        title: 'Merge k Sorted Lists',
        source: lc(23, 'merge-k-sorted-lists'),
        prelude: LIST,
        text: 'Дан список голов `k` отсортированных связных списков. Слей их в один отсортированный список и верни голову. Ожидается `O(N log k)`, где `N` — общее число узлов.',
        starter: starter(`
${LIST_DOC}
import heapq

def merge_k_lists(lists):
    pass
`),
        examples: [{ call: 'list_to_array(merge_k_lists([build_list([1, 4, 5]), build_list([1, 3, 4]), build_list([2, 6])]))', expected: '[1, 1, 2, 3, 4, 4, 5, 6]' }],
        tests: [
          { call: 'list_to_array(merge_k_lists([build_list([1, 4, 5]), build_list([1, 3, 4]), build_list([2, 6])]))', expected: '[1, 1, 2, 3, 4, 4, 5, 6]' },
          { call: 'list_to_array(merge_k_lists([]))', expected: '[]' },
          { call: 'list_to_array(merge_k_lists([build_list([])]))', expected: '[]' },
          { call: 'list_to_array(merge_k_lists([build_list([2]), build_list([]), build_list([-1])]))', expected: '[-1, 2]' },
          { label: '1000 списков по 100 узлов', perf: true, code: `lists = [build_list(range(i, 100000, 1000)) for i in range(1000)]
res = list_to_array(merge_k_lists(lists))
__kiro_eq("первые и последний", (res[:3], res[-1], len(res)), ([0, 1, 2], 99999, 100000))` },
        ],
        solution: {
          text: 'Куча хранит текущие головы списков в виде `(значение, номер списка, узел)` — номер нужен, потому что узлы между собой несравнимы. Извлекаем минимум, подцепляем к результату и добавляем в кучу следующий узел того же списка.',
          code: `
import heapq

def merge_k_lists(lists):
    heap = [(node.val, i, node) for i, node in enumerate(lists) if node]
    heapq.heapify(heap)
    dummy = ListNode()
    tail = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        tail.next = node
        tail = node
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next
`,
          complexity: '`O(N log k)` по времени, `O(k)` памяти.',
          mistakes: [
            'Класть в кучу `(val, node)` — при равных значениях Python попробует сравнить узлы и упадёт с `TypeError`.',
            'Сливать списки по одному с результатом — `O(N · k)`.',
          ],
        },
      },
      {
        id: 'a19t4',
        title: 'K Closest Points to Origin',
        source: lc(973, 'k-closest-points-to-origin'),
        text: 'Даны точки на плоскости `[x, y]`. Верни `k` точек, ближайших к началу координат (по евклидову расстоянию), в любом порядке. Ответ гарантированно однозначен.',
        starter: starter(`
import heapq

def k_closest(points: list[list[int]], k: int) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'k_closest([[3, 3], [5, -1], [-2, 4]], 2)', expected: '[[3, 3], [-2, 4]]' }],
        tests: [
          { label: 'k_closest([[1, 3], [-2, 2]], 1)', code: `__kiro_eq("ответ", sorted(k_closest([[1, 3], [-2, 2]], 1)), [[-2, 2]])` },
          { label: 'k_closest([[3, 3], [5, -1], [-2, 4]], 2)', code: `__kiro_eq("ответ", sorted(k_closest([[3, 3], [5, -1], [-2, 4]], 2)), [[-2, 4], [3, 3]])` },
          { label: 'k = числу точек', code: `__kiro_eq("ответ", sorted(k_closest([[0, 1], [1, 0]], 2)), [[0, 1], [1, 0]])` },
          { label: 'большой набор точек', perf: true, code: `pts = [[i, -i] for i in range(100000, 0, -1)]
__kiro_eq("ответ", sorted(k_closest(pts, 3)), [[1, -1], [2, -2], [3, -3]])` },
        ],
        solution: {
          text: 'Максимальная куча размера `k` по квадрату расстояния (через минус): при переполнении выбрасываем самую дальнюю из выбранных. Корень извлекать не нужно — сравниваем квадраты расстояний.',
          code: `
import heapq

def k_closest(points, k):
    heap = []
    for x, y in points:
        heapq.heappush(heap, (-(x * x + y * y), x, y))
        if len(heap) > k:
            heapq.heappop(heap)
    return [[x, y] for _, x, y in heap]
`,
          complexity: '`O(n log k)` по времени, `O(k)` памяти.',
          mistakes: [
            'Минимальная куча размера `k` по расстоянию — выбрасываться будут ближайшие точки.',
            'Считать `sqrt` — лишняя работа и погрешности: порядок по квадрату расстояния тот же.',
          ],
        },
      },
      {
        id: 'a19t5',
        title: 'Find Median from Data Stream',
        source: lc(295, 'find-median-from-data-stream'),
        text: 'Реализуй класс `MedianFinder`: `add_num(num)` добавляет число из потока, `find_median()` возвращает медиану всех добавленных чисел (при чётном количестве — среднее двух средних, дробное число). Используй две кучи: `add_num` — `O(log n)`, `find_median` — `O(1)`.',
        starter: starter(`
import heapq

class MedianFinder:
    def __init__(self):
        pass

    def add_num(self, num: int) -> None:
        pass

    def find_median(self) -> float:
        pass
`),
        examples: [{ call: 'm = MedianFinder(); m.add_num(1); m.add_num(2); m.find_median()', expected: '1.5' }],
        tests: [
          { label: 'пример из условия', code: `m = MedianFinder()
m.add_num(1); m.add_num(2)
__kiro_eq("find_median()", m.find_median(), 1.5)
m.add_num(3)
__kiro_eq("find_median()", m.find_median(), 2)` },
          { label: 'одно число', code: `m = MedianFinder()
m.add_num(-5)
__kiro_eq("find_median()", m.find_median(), -5)` },
          { label: 'числа в разном порядке', code: `m = MedianFinder()
res = []
for x in [5, 15, 1, 3, 8, 7]:
    m.add_num(x)
    res.append(m.find_median())
__kiro_eq("медианы", res, [5, 10.0, 5, 4.0, 5, 6.0])` },
          { label: '50 000 операций', perf: true, code: `m = MedianFinder()
total = 0
for i in range(50000):
    m.add_num((i * 7919) % 50021)
s = sorted((i * 7919) % 50021 for i in range(50000))
__kiro_eq("медиана 50 000 чисел", m.find_median(), (s[24999] + s[25000]) / 2)` },
        ],
        solution: {
          text: '`low` — максимальная куча (через минус) с меньшей половиной, `high` — минимальная с большей. Новое число кладём в `low`, перекладываем максимум `low` в `high`, а если `high` стала больше — возвращаем её минимум в `low`. Так `low` всегда не меньше `high` максимум на один элемент.',
          code: `
import heapq

class MedianFinder:
    def __init__(self):
        self.low = []
        self.high = []

    def add_num(self, num):
        heapq.heappush(self.low, -num)
        heapq.heappush(self.high, -heapq.heappop(self.low))
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def find_median(self):
        if len(self.low) > len(self.high):
            return -self.low[0]
        return (-self.low[0] + self.high[0]) / 2
`,
          complexity: '`add_num` — `O(log n)`, `find_median` — `O(1)`.',
          mistakes: [
            'Хранить все числа и сортировать при каждом `find_median` — `O(n log n)` на запрос.',
            'Забыть минус при работе с максимальной кучей — половины перепутаются.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 20
  {
    id: 'a20',
    week: 3,
    day: 20,
    title: 'Рекурсия, перебор с возвратом и битовые операции',
    summary: 'Как устроена рекурсия, шаблон перебора с возвратом (backtracking): выбрать, рекурсивно продолжить, отменить выбор, подмножества, перестановки и комбинации, отсечения, базовые битовые операции и XOR.',
    sections: [
      {
        id: 'backtracking',
        title: 'Перебор с возвратом',
        blocks: [
          p('Когда нужно перечислить **все** варианты — подмножества, перестановки, комбинации, расстановки, — используют **перебор с возвратом** (backtracking). Решение строится по шагам; на каждом шаге пробуем все допустимые варианты, рекурсивно продолжаем и **отменяем** выбор, чтобы попробовать следующий.'),
          py(`def backtrack(path, choices, result):
    if len(path) == 2:                  # решение готово
        result.append(path[:])          # копия! path ещё будет меняться
        return
    for c in choices:
        if c in path:
            continue
        path.append(c)                  # выбрать
        backtrack(path, choices, result)   # продолжить
        path.pop()                      # отменить выбор

res = []
backtrack([], [1, 2, 3], res)
print(res)`, '[[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]]'),
          table(['Задача', 'Число вариантов', 'Особенность'], [
            ['подмножества', '`2ⁿ`', 'каждый элемент «брать или не брать»; перебираем `start`, чтобы не повторяться'],
            ['перестановки', '`n!`', 'на каждом шаге любой неиспользованный элемент'],
            ['комбинации с суммой', 'зависит от суммы', 'можно брать элемент повторно; отсекаем, если сумма превысила цель'],
          ]),
          warn('Самая частая ошибка — добавить в ответ сам список `path`, а не его копию `path[:]`. После отмены выборов все сохранённые ответы окажутся одним и тем же пустым списком.'),
          tip('**Отсечения** (pruning) ускоряют перебор: если текущий путь уже не может привести к ответу (сумма больше цели), дальше не идём. Сортировка вариантов часто позволяет обрывать весь оставшийся цикл через `break`.'),
        ],
      },
      {
        id: 'bits',
        title: 'Битовые операции',
        blocks: [
          p('Числа хранятся в двоичном виде, и с отдельными битами можно работать напрямую — быстро и без лишней памяти.'),
          table(['Операция', 'Python', 'Пример'], [
            ['И', '`a & b`', '`0b1100 & 0b1010 = 0b1000`'],
            ['ИЛИ', '`a | b`', '`0b1100 | 0b1010 = 0b1110`'],
            ['исключающее ИЛИ (XOR)', '`a ^ b`', '`0b1100 ^ 0b1010 = 0b0110`'],
            ['сдвиг влево / вправо', '`a << k`, `a >> k`', 'умножение и деление на `2ᵏ`'],
            ['проверить бит `k`', '`(a >> k) & 1`', ''],
            ['убрать младшую единицу', '`a & (a - 1)`', '`0b1100 → 0b1000`'],
          ]),
          h('Свойства XOR'),
          list(
            '`x ^ x = 0` и `x ^ 0 = x`;',
            'XOR перестановочен и ассоциативен — порядок не важен.',
          ),
          p('Отсюда классический трюк: XOR всех чисел массива, где каждое число встречается дважды, кроме одного, — даёт это единственное число: пары взаимно уничтожаются.'),
          py(`nums = [4, 1, 2, 1, 2]
x = 0
for n in nums:
    x ^= n
print(x)
print(bin(11), bin(11).count("1"))     # число единиц в записи`, '4\n0b1011 3'),
          note('Перебор подмножеств можно делать и битами: число от `0` до `2ⁿ − 1` — это маска, где бит `i` говорит, взят ли элемент `i`.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a20t1',
        title: 'Subsets',
        source: lc(78, 'subsets'),
        text: 'Все числа `nums` различны. Верни все возможные подмножества (включая пустое и само множество) в любом порядке.',
        starter: starter(`
def subsets(nums: list[int]) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'subsets([1, 2, 3])', expected: '[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]' }],
        tests: [
          { label: 'subsets([1, 2, 3])', code: `got = sorted(sorted(s) for s in subsets([1, 2, 3]))
__kiro_eq("подмножества", got, [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]])` },
          { label: 'subsets([0])', code: `__kiro_eq("подмножества", sorted(sorted(s) for s in subsets([0])), [[], [0]])` },
          { label: '10 элементов — 1024 подмножества без повторов', code: `res = subsets(list(range(10)))
__kiro_eq("число", len(res), 1024)
__kiro_eq("уникальных", len(set(tuple(sorted(s)) for s in res)), 1024)` },
        ],
        solution: {
          text: 'Перебор с возвратом: каждое состояние `path` — уже подмножество, добавляем его копию. Дальше пробуем добавить элементы с индексами от `start`, чтобы не получать одно подмножество в разном порядке.',
          code: `
def subsets(nums):
    res = []

    def backtrack(start, path):
        res.append(path[:])
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res
`,
          complexity: '`O(n · 2ⁿ)` по времени и памяти на ответ.',
          mistakes: [
            '`res.append(path)` без копии — в ответе окажутся ссылки на один и тот же список.',
            'Начинать цикл с 0 вместо `start` — подмножества повторятся в разном порядке.',
          ],
        },
      },
      {
        id: 'a20t2',
        title: 'Permutations',
        source: lc(46, 'permutations'),
        text: 'Все числа `nums` различны. Верни все перестановки в любом порядке. Без `itertools.permutations`.',
        starter: starter(`
def permute(nums: list[int]) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'permute([1, 2, 3])', expected: '[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]' }],
        tests: [
          { forbid: ['permutations'], label: 'Без itertools.permutations' },
          { label: 'permute([1, 2, 3])', code: `__kiro_eq("перестановки", sorted(permute([1, 2, 3])), [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])` },
          { label: 'permute([0, 1])', code: `__kiro_eq("перестановки", sorted(permute([0, 1])), [[0, 1], [1, 0]])` },
          { label: 'permute([1])', code: `__kiro_eq("перестановки", sorted(permute([1])), [[1]])` },
          { label: '6 элементов — 720 перестановок', code: `res = permute([1, 2, 3, 4, 5, 6])
__kiro_eq("число", len(res), 720)
__kiro_eq("уникальных", len(set(map(tuple, res))), 720)` },
        ],
        solution: {
          text: 'На каждом шаге ставим на следующее место любой ещё не использованный элемент. Используемые отмечаем множеством или массивом флагов.',
          code: `
def permute(nums):
    res = []
    used = [False] * len(nums)

    def backtrack(path):
        if len(path) == len(nums):
            res.append(path[:])
            return
        for i, x in enumerate(nums):
            if not used[i]:
                used[i] = True
                path.append(x)
                backtrack(path)
                path.pop()
                used[i] = False

    backtrack([])
    return res
`,
          complexity: '`O(n · n!)` по времени и памяти на ответ.',
          mistakes: [
            'Проверять `x in path` — работает для различных чисел, но это `O(n)` на проверку; флаги — `O(1)`.',
            'Забыть снять отметку `used[i] = False` при возврате.',
          ],
        },
      },
      {
        id: 'a20t3',
        title: 'Combination Sum',
        source: lc(39, 'combination-sum'),
        text: 'Даны различные положительные числа `candidates` и цель `target`. Верни все **уникальные** комбинации чисел с суммой `target`; одно число можно брать сколько угодно раз. Комбинации, отличающиеся только порядком, одинаковы.',
        starter: starter(`
def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    pass
`),
        examples: [{ call: 'combination_sum([2, 3, 6, 7], 7)', expected: '[[2, 2, 3], [7]]' }],
        tests: [
          { label: 'combination_sum([2, 3, 6, 7], 7)', code: `__kiro_eq("комбинации", sorted(sorted(c) for c in combination_sum([2, 3, 6, 7], 7)), [[2, 2, 3], [7]])` },
          { label: 'combination_sum([2, 3, 5], 8)', code: `__kiro_eq("комбинации", sorted(sorted(c) for c in combination_sum([2, 3, 5], 8)), [[2, 2, 2, 2], [2, 3, 3], [3, 5]])` },
          { label: 'combination_sum([2], 1)', code: `__kiro_eq("комбинации", list(combination_sum([2], 1)), [])` },
          { label: 'combination_sum([1], 3)', code: `__kiro_eq("комбинации", sorted(sorted(c) for c in combination_sum([1], 3)), [[1, 1, 1]])` },
        ],
        solution: {
          text: 'Перебор с возвратом с индексом `start`: элемент можно брать повторно (рекурсия с тем же `i`), но не возвращаться к предыдущим — так не будет одинаковых комбинаций в разном порядке. Сортировка позволяет обрывать цикл, как только кандидат больше остатка.',
          code: `
def combination_sum(candidates, target):
    candidates = sorted(candidates)
    res = []

    def backtrack(start, path, rest):
        if rest == 0:
            res.append(path[:])
            return
        for i in range(start, len(candidates)):
            c = candidates[i]
            if c > rest:
                break
            path.append(c)
            backtrack(i, path, rest - c)
            path.pop()

    backtrack(0, [], target)
    return res
`,
          complexity: 'Экспоненциальная в худшем случае; отсечение по `rest` сильно сокращает перебор.',
          mistakes: [
            'Рекурсия с `i + 1` — запретит повторное использование числа (`[2, 2, 3]` не найдётся).',
            'Рекурсия с `0` вместо `i` — комбинации повторятся в разном порядке.',
          ],
        },
      },
      {
        id: 'a20t4',
        title: 'Single Number',
        source: lc(136, 'single-number'),
        text: 'Каждое число в `nums` встречается дважды, кроме одного. Найди его за `O(n)` времени и `O(1)` дополнительной памяти.',
        starter: starter(`
def single_number(nums: list[int]) -> int:
    pass
`),
        examples: [{ call: 'single_number([4, 1, 2, 1, 2])', expected: '4' }],
        tests: [
          { call: 'single_number([2, 2, 1])', expected: '1' },
          { call: 'single_number([4, 1, 2, 1, 2])', expected: '4' },
          { call: 'single_number([1])', expected: '1' },
          { call: 'single_number([-3, 7, 7])', expected: '-3' },
          { label: 'большой массив', perf: true, code: `nums = list(range(50000)) * 2 + [123456]
__kiro_eq("single_number", single_number(nums), 123456)` },
        ],
        solution: {
          text: 'XOR всех чисел: пары дают 0, остаётся единственное непарное число.',
          code: `
def single_number(nums):
    x = 0
    for n in nums:
        x ^= n
    return x
`,
          complexity: '`O(n)` по времени, `O(1)` памяти. Решения со словарём или множеством тоже `O(n)`, но тратят `O(n)` памяти.',
          mistakes: [
            '`nums.count(x) == 1` для каждого элемента — `O(n²)`.',
          ],
        },
      },
      {
        id: 'a20t5',
        title: 'Number of 1 Bits',
        source: lc(191, 'number-of-1-bits'),
        text: 'Посчитай число единичных битов в двоичной записи неотрицательного целого `n`. Без `bin()` и `str.count` — используй битовые операции.',
        starter: starter(`
def hamming_weight(n: int) -> int:
    pass
`),
        examples: [{ call: 'hamming_weight(11)', expected: '3' }],
        tests: [
          { forbid: ['bin', '.count', '.bit_count', 'format'], label: 'Без bin(), count(), bit_count() и format()' },
          { call: 'hamming_weight(11)', expected: '3' },
          { call: 'hamming_weight(128)', expected: '1' },
          { call: 'hamming_weight(2147483645)', expected: '30' },
          { call: 'hamming_weight(0)', expected: '0' },
        ],
        solution: {
          text: 'Приём Кернигана: `n & (n − 1)` убирает младшую единицу. Считаем, сколько раз так можно сделать, пока `n` не станет нулём.',
          code: `
def hamming_weight(n):
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count
`,
          complexity: '`O(k)`, где `k` — число единиц. Вариант «проверять младший бит и сдвигать» — `O(число битов)`.',
          mistakes: [
            'Цикл по `n % 2` и `n // 2` — тоже правильно, но интервьюер ждёт битовые операции.',
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ День 21
  {
    id: 'a21',
    week: 3,
    day: 21,
    title: 'Финальный контест и ретроспектива',
    summary: 'Финальный контест из четырёх задач — граф, жадный алгоритм, куча, перебор с возвратом — с таймером 30 минут, карта паттернов курса, самооценка и план повторения перед собеседованиями.',
    sections: [
      {
        id: 'map',
        title: 'Карта паттернов курса',
        blocks: [
          table(['Если в условии…', 'Попробуй', 'Дни'], [
            ['отсортированный массив, пара с суммой, палиндром', 'два указателя', '1–2'],
            ['сумма отрезка, подмассивы с суммой, отрицательные числа', 'префиксные суммы + словарь', '2'],
            ['самый длинный/короткий подотрезок с условием', 'скользящее окно', '3'],
            ['«встречалось ли раньше», частоты, группировка', 'хеш-таблица', '4'],
            ['скобки, вложенность, следующий больший элемент', 'стек, монотонный стек', '5'],
            ['связный список, середина, цикл', 'dummy, быстрый и медленный указатели', '8–9'],
            ['O(1) на get/put с вытеснением', 'словарь + двусвязный список', '10'],
            ['отсортировано, «минимальное значение, при котором можно»', 'двоичный поиск, по ответу', '11–12'],
            ['интервалы', 'сортировка по началу или концу', '12, 18'],
            ['дерево: высота, пути, сравнение', 'рекурсия DFS', '13, 15, 17'],
            ['уровни, кратчайший путь, минимум шагов', 'BFS', '13, 16'],
            ['сетка, острова, компоненты', 'DFS/BFS с отметкой посещённых', '15–16'],
            ['k наибольших, слияние k списков, медиана', 'куча', '19'],
            ['все варианты: подмножества, перестановки', 'перебор с возвратом', '20'],
          ]),
        ],
      },
      {
        id: 'retro',
        title: 'Ретроспектива и план повторения',
        blocks: [
          p('После финального контеста оцени каждую тему по шкале из трёх уровней — так ты увидишь, что повторять в первую очередь:'),
          table(['Уровень', 'Признак', 'Что делать'], [
            ['даётся легко', 'узнаю паттерн за 1–2 минуты, решаю за 15–20 минут без подсказок', 'поддерживать: одна задача темы раз в 1–2 недели'],
            ['решаю, но медленно', 'нужен разбор или 30+ минут, ошибки в граничных случаях', 'повторить 3–5 задач темы за неделю, проговаривая решение вслух'],
            ['тормозит', 'не узнаю паттерн, не могу начать', 'перечитать теорию урока, решить задачи урока заново, затем 5 новых задач темы'],
          ]),
          h('Как повторять'),
          list(
            '**интервальное повторение**: задачу, решённую с подсказкой, реши заново через 1 день, через 3 дня и через неделю — без подсказок;',
            '**вслух**: на собеседовании нужно объяснять, поэтому тренируй и это — проговаривай идею, сложность и граничные случаи;',
            '**по таймеру**: 25–30 минут на задачу среднего уровня — норма собеседования;',
            '**по спискам**: подборки [Blind 75](https://neetcode.io/practice/practice/blind75) и [NeetCode 150](https://neetcode.io/practice/practice/neetcode150) с задачами LeetCode покрывают почти все паттерны курса.',
          ),
          h('Что изучать дальше'),
          list(
            '**динамическое программирование**: одномерное и двумерное, рюкзак, наибольшая общая подпоследовательность;',
            '**графы глубже**: топологическая сортировка, алгоритм Дейкстры, система непересекающихся множеств (Union-Find);',
            '**префиксное дерево** (trie) для задач на строки и словари;',
            '**интервальные задачи и разностные массивы**.',
          ),
          tip('Финальный контест ниже: четыре задачи, у каждой таймер 30 минут. Решай их как настоящее собеседование: сначала вслух сформулируй идею и сложность, потом пиши код.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'a21t1',
        title: 'Course Schedule',
        source: lc(207, 'course-schedule'),
        timer: 30,
        text: 'Курсы пронумерованы от 0 до `num_courses − 1`. Пара `[a, b]` в `prerequisites` значит: чтобы пройти курс `a`, нужно сначала пройти `b`. Можно ли пройти все курсы? Иначе говоря, нет ли в графе зависимостей цикла.',
        starter: starter(`
from collections import deque

def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    pass
`),
        examples: [
          { call: 'can_finish(2, [[1, 0]])', expected: 'True' },
          { call: 'can_finish(2, [[1, 0], [0, 1]])', expected: 'False' },
        ],
        tests: [
          { call: 'can_finish(2, [[1, 0]])', expected: 'True' },
          { call: 'can_finish(2, [[1, 0], [0, 1]])', expected: 'False' },
          { call: 'can_finish(3, [])', expected: 'True' },
          { call: 'can_finish(4, [[1, 0], [2, 1], [3, 2], [1, 3]])', expected: 'False' },
          { call: 'can_finish(5, [[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]])', expected: 'True' },
          { label: 'длинная цепочка', perf: true, code: `n = 50000
pre = [[i + 1, i] for i in range(n - 1)]
__kiro_eq("can_finish(цепочка)", can_finish(n, pre), True)` },
        ],
        solution: {
          text: 'Топологическая сортировка алгоритмом Кана (BFS по входящим степеням): кладём в очередь курсы без требований, «проходим» их и уменьшаем входящую степень зависимых. Если удалось пройти все курсы — цикла нет.',
          code: `
from collections import deque

def can_finish(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses
    for a, b in prerequisites:
        graph[b].append(a)
        indegree[a] += 1
    queue = deque(i for i in range(num_courses) if indegree[i] == 0)
    done = 0
    while queue:
        v = queue.popleft()
        done += 1
        for u in graph[v]:
            indegree[u] -= 1
            if indegree[u] == 0:
                queue.append(u)
    return done == num_courses
`,
          complexity: '`O(V + E)` по времени и памяти. Альтернатива — DFS с тремя цветами вершин (не посещена, в процессе, готова); но рекурсия на длинной цепочке упрётся в лимит глубины.',
          mistakes: [
            'Перепутать направление ребра: `[a, b]` — ребро из `b` в `a`.',
            'Искать цикл обычным DFS с одним множеством посещённых — путает «уже обработан» с «на текущем пути».',
          ],
        },
      },
      {
        id: 'a21t2',
        title: 'Partition Labels',
        source: lc(763, 'partition-labels'),
        timer: 30,
        text: 'Раздели строку `s` на как можно большее число частей так, чтобы каждая буква встречалась только в одной части. Верни список длин частей.',
        starter: starter(`
def partition_labels(s: str) -> list[int]:
    pass
`),
        examples: [{ call: 'partition_labels("ababcbacadefegdehijhklij")', expected: '[9, 7, 8]' }],
        tests: [
          { call: 'partition_labels("ababcbacadefegdehijhklij")', expected: '[9, 7, 8]' },
          { call: 'partition_labels("eccbbbbdec")', expected: '[10]' },
          { call: 'partition_labels("abc")', expected: '[1, 1, 1]' },
          { call: 'partition_labels("a")', expected: '[1]' },
          { call: 'partition_labels("abac")', expected: '[3, 1]' },
        ],
        solution: {
          text: 'Запоминаем последнее вхождение каждой буквы. Идём по строке, расширяя конец текущей части до последнего вхождения встреченных букв. Когда индекс дошёл до конца части — часть закончилась.',
          code: `
def partition_labels(s):
    last = {ch: i for i, ch in enumerate(s)}
    res = []
    start = end = 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])
        if i == end:
            res.append(end - start + 1)
            start = i + 1
    return res
`,
          complexity: '`O(n)` по времени, `O(алфавит)` памяти.',
          mistakes: [
            'Резать строку при первом повторе буквы — части получатся неправильными.',
          ],
        },
      },
      {
        id: 'a21t3',
        title: 'Last Stone Weight',
        source: lc(1046, 'last-stone-weight'),
        timer: 30,
        text: 'Есть камни с весами `stones`. Каждый ход берём два самых тяжёлых: при равных весах уничтожаются оба, иначе остаётся камень весом в разность. Верни вес последнего оставшегося камня или 0.',
        starter: starter(`
import heapq

def last_stone_weight(stones: list[int]) -> int:
    pass
`),
        examples: [{ call: 'last_stone_weight([2, 7, 4, 1, 8, 1])', expected: '1' }],
        tests: [
          { call: 'last_stone_weight([2, 7, 4, 1, 8, 1])', expected: '1' },
          { call: 'last_stone_weight([1])', expected: '1' },
          { call: 'last_stone_weight([2, 2])', expected: '0' },
          { call: 'last_stone_weight([10, 4, 2, 10])', expected: '2' },
          { label: 'много камней', perf: true, code: `stones = [1] * 50000 + [3]
__kiro_eq("last_stone_weight", last_stone_weight(stones), 1)` },
        ],
        solution: {
          text: 'Максимальная куча через минус: извлекаем два максимума, при разнице кладём остаток обратно.',
          code: `
import heapq

def last_stone_weight(stones):
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        a = -heapq.heappop(heap)
        b = -heapq.heappop(heap)
        if a != b:
            heapq.heappush(heap, -(a - b))
    return -heap[0] if heap else 0
`,
          complexity: '`O(n log n)` по времени, `O(n)` памяти.',
          mistakes: [
            'Сортировать список заново на каждом ходе — `O(n² log n)`.',
          ],
        },
      },
      {
        id: 'a21t4',
        title: 'Letter Combinations of a Phone Number',
        source: lc(17, 'letter-combinations-of-a-phone-number'),
        timer: 30,
        text: 'Цифры 2–9 на кнопочном телефоне соответствуют буквам: 2 — `abc`, 3 — `def`, 4 — `ghi`, 5 — `jkl`, 6 — `mno`, 7 — `pqrs`, 8 — `tuv`, 9 — `wxyz`. Верни все слова, которые можно набрать строкой цифр `digits`, в любом порядке. Для пустой строки — пустой список.',
        starter: starter(`
def letter_combinations(digits: str) -> list[str]:
    pass
`),
        examples: [{ call: 'letter_combinations("23")', expected: '["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]' }],
        tests: [
          { label: 'letter_combinations("23")', code: `__kiro_eq("слова", sorted(letter_combinations("23")), ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"])` },
          { label: 'letter_combinations("")', code: `__kiro_eq("слова", list(letter_combinations("")), [])` },
          { label: 'letter_combinations("2")', code: `__kiro_eq("слова", sorted(letter_combinations("2")), ["a", "b", "c"])` },
          { label: 'letter_combinations("79") — 16 слов', code: `res = letter_combinations("79")
__kiro_eq("число", len(res), 16)
assert "sz" in res and "pw" in res, "не хватает слов"` },
        ],
        solution: {
          text: 'Перебор с возвратом: на позиции `i` пробуем каждую букву цифры `digits[i]` и переходим к следующей позиции. Когда набрали длину `digits` — слово готово.',
          code: `
def letter_combinations(digits):
    if not digits:
        return []
    keys = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
    res = []

    def backtrack(i, path):
        if i == len(digits):
            res.append("".join(path))
            return
        for ch in keys[digits[i]]:
            path.append(ch)
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return res
`,
          complexity: '`O(4ⁿ · n)` в худшем случае — по числу слов.',
          mistakes: [
            'Вернуть `[""]` для пустой строки вместо `[]`.',
          ],
        },
      },
    ],
  },
]
