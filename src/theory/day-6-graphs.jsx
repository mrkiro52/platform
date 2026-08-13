import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day6GraphsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Дискретная математика: графы и алгоритмы</h1>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что такое граф?</h2>
        <p className="theory-intro">
          Граф — это структура, которая состоит из точек (вершин) и линий (рёбер), соединяющих эти точки. Графы помогают моделировать реальные сиутации.
        </p>

        <TheoryExample title="Примеры графов в реальной жизни">
          <ul>
            <li><strong>Социальная сеть</strong> — люди это вершины, дружба это рёбра</li>
            <li><strong>Карта города</strong> — перекрёстки это вершины, дороги это рёбра</li>
            <li><strong>Интернет</strong> — компьютеры это вершины, кабели это рёбра</li>
            <li><strong>Родственные связи</strong> — люди это вершины, семейные связи это рёбра</li>
          </ul>
        </TheoryExample>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Основные понятия</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Вершина (узел)</strong> — точка в графе</li>
            <li className="theory-list-item"><strong>Ребро</strong> — линия, соединяющая два узла</li>
            <li className="theory-list-item"><strong>Ориентированный граф</strong> — рёбра имеют направление (стрелка)</li>
            <li className="theory-list-item"><strong>Неориентированный граф</strong> — рёбра без направления</li>
            <li className="theory-list-item"><strong>Взвешенный граф</strong> — рёбра имеют вес (расстояние, стоимость)</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Представление графа</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Матрица смежности</h3>
          <p className="theory-intro">
            Используется, если много рёбер. Таблица, где строка и столбец = вершины, значение = есть ли ребро.
          </p>
          <TheoryCode code={`# Матрица смежности для графа A-B, A-C, B-C
# 1 = есть ребро, 0 = нет ребра

adjacency_matrix = [
    [0, 1, 1],  # A: связь с B, C
    [1, 0, 1],  # B: связь с A, C
    [1, 1, 0]   # C: связь с A, B
]

# Проверка: есть ли ребро между A (0) и B (1)?
if adjacency_matrix[0][1] == 1:
    print("Есть ребро A-B")`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Список смежности</h3>
          <p className="theory-intro">
            Используется, если мало рёбер. Для каждой вершины список её соседей.
          </p>
          <TheoryCode code={`# Список смежности для графа A-B, A-C, B-C
# Словарь: вершина -> список соседей

adjacency_list = {
    'A': ['B', 'C'],
    'B': ['A', 'C'],
    'C': ['A', 'B']
}

# Получить соседей вершины A
neighbors_a = adjacency_list['A']
print(neighbors_a)  # ['B', 'C']

# Проверить: соседи ли A и B?
if 'B' in adjacency_list['A']:
    print("A и B — соседи")`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Поиск в ширину (BFS)</h2>
        <p className="theory-intro">
          BFS (Breadth-First Search) — ищет уровень за уровнем, от стартовой вершины. Используется очередь.
        </p>

        <TheoryExample title="Как работает BFS">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Начинаешь со стартовой вершины, добавляешь в очередь</li>
            <li>Берёшь вершину из начала очереди</li>
            <li>Проверяешь все её соседей</li>
            <li>Еслиососед не посещён, добавляешь в очередь</li>
            <li>Повторяешь, пока очередь не пуста</li>
          </ol>
        </TheoryExample>

        <TheoryCode code={`from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        node = queue.popleft()  # Берём из начала
        result.append(node)

        # Проверяем всех соседей
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Граф: A-B, A-C, B-D, C-D
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D']`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Поиск в глубину (DFS)</h2>
        <p className="theory-intro">
          DFS (Depth-First Search) — идёт как глубже и глубже в один путь. Используется стек или рекурсия.
        </p>

        <TheoryExample title="Как работает DFS">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Начинаешь со стартовой вершины</li>
            <li>Идёшь как можно глубже в одного соседа</li>
            <li>Когда зашёл в тупик, возвращаешься</li>
            <li>Пробуешь следующего соседа</li>
          </ol>
        </TheoryExample>

        <TheoryCode code={`def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    result = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))

    return result

# Граф: A-B, A-C, B-D, C-D
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

print(dfs(graph, 'A'))  # ['A', 'B', 'D', 'C']`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Сравнение BFS vs DFS</h2>
        <TheoryTable
          headers={['Критерий', 'BFS', 'DFS']}
          rows={[
            ['Структура данных', 'Очередь', 'Стек или рекурсия'],
            ['Как ищет', 'Уровень за уровнем', 'Как можно глубже'],
            ['Находит кратчайший путь?', 'Да', 'Нет'],
            ['Используется для', 'Кратчайший путь, ширина', 'Компоненты, цикли'],
            ['Память', 'Может быть больше', 'Зависит от высоты'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Топологическая сортировка</h2>
        <p className="theory-intro">
          Порядок вершин в ориентированном графе без циклов, где для каждого ребра A→B вершина A идёт раньше B.
        </p>

        <TheoryCode code={`from collections import deque

def topological_sort(graph, in_degree):
    queue = deque([node for node in graph if in_degree[node] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return result

# Граф зависимостей: A→B, A→C, B→D, C→D
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}

in_degree = {'A': 0, 'B': 1, 'C': 1, 'D': 2}

print(topological_sort(graph, in_degree))  # ['A', 'B', 'C', 'D']`} language="python" />

        <TheoryExample title="Применение">
          <p>Например, в системе сборки проектов: нужно скомпилировать файл A перед файлом B, если B зависит от A.</p>
        </TheoryExample>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Теперь ты знаешь графы</p>
      </section>
    </div>
  )
}
