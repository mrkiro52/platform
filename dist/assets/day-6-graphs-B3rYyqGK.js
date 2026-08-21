import{j as e}from"./index-BlnQ7002.js";import{a as i,T as s,b as r}from"./TheoryTable-BDiL0XX6.js";function l(){return e.jsxs("div",{className:"theory-container",children:[e.jsx("section",{className:"theory-section",children:e.jsx("h1",{className:"theory-title",children:"Дискретная математика: графы и алгоритмы"})}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Что такое граф?"}),e.jsx("p",{className:"theory-intro",children:"Граф — это структура, которая состоит из точек (вершин) и линий (рёбер), соединяющих эти точки. Графы помогают моделировать реальные сиутации."}),e.jsx(i,{title:"Примеры графов в реальной жизни",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Социальная сеть"})," — люди это вершины, дружба это рёбра"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Карта города"})," — перекрёстки это вершины, дороги это рёбра"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Интернет"})," — компьютеры это вершины, кабели это рёбра"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Родственные связи"})," — люди это вершины, семейные связи это рёбра"]})]})}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Вершина (узел)"})," — точка в графе"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Ребро"})," — линия, соединяющая два узла"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Ориентированный граф"})," — рёбра имеют направление (стрелка)"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Неориентированный граф"})," — рёбра без направления"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Взвешенный граф"})," — рёбра имеют вес (расстояние, стоимость)"]})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Представление графа"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Матрица смежности"}),e.jsx("p",{className:"theory-intro",children:"Используется, если много рёбер. Таблица, где строка и столбец = вершины, значение = есть ли ребро."}),e.jsx(s,{code:`# Матрица смежности для графа A-B, A-C, B-C
# 1 = есть ребро, 0 = нет ребра

adjacency_matrix = [
    [0, 1, 1],  # A: связь с B, C
    [1, 0, 1],  # B: связь с A, C
    [1, 1, 0]   # C: связь с A, B
]

# Проверка: есть ли ребро между A (0) и B (1)?
if adjacency_matrix[0][1] == 1:
    print("Есть ребро A-B")`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Список смежности"}),e.jsx("p",{className:"theory-intro",children:"Используется, если мало рёбер. Для каждой вершины список её соседей."}),e.jsx(s,{code:`# Список смежности для графа A-B, A-C, B-C
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
    print("A и B — соседи")`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Поиск в ширину (BFS)"}),e.jsx("p",{className:"theory-intro",children:"BFS (Breadth-First Search) — ищет уровень за уровнем, от стартовой вершины. Используется очередь."}),e.jsx(i,{title:"Как работает BFS",children:e.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[e.jsx("li",{children:"Начинаешь со стартовой вершины, добавляешь в очередь"}),e.jsx("li",{children:"Берёшь вершину из начала очереди"}),e.jsx("li",{children:"Проверяешь все её соседей"}),e.jsx("li",{children:"Еслиососед не посещён, добавляешь в очередь"}),e.jsx("li",{children:"Повторяешь, пока очередь не пуста"})]})}),e.jsx(s,{code:`from collections import deque

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

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D']`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Поиск в глубину (DFS)"}),e.jsx("p",{className:"theory-intro",children:"DFS (Depth-First Search) — идёт как глубже и глубже в один путь. Используется стек или рекурсия."}),e.jsx(i,{title:"Как работает DFS",children:e.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[e.jsx("li",{children:"Начинаешь со стартовой вершины"}),e.jsx("li",{children:"Идёшь как можно глубже в одного соседа"}),e.jsx("li",{children:"Когда зашёл в тупик, возвращаешься"}),e.jsx("li",{children:"Пробуешь следующего соседа"})]})}),e.jsx(s,{code:`def dfs(graph, node, visited=None):
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

print(dfs(graph, 'A'))  # ['A', 'B', 'D', 'C']`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Сравнение BFS vs DFS"}),e.jsx(r,{headers:["Критерий","BFS","DFS"],rows:[["Структура данных","Очередь","Стек или рекурсия"],["Как ищет","Уровень за уровнем","Как можно глубже"],["Находит кратчайший путь?","Да","Нет"],["Используется для","Кратчайший путь, ширина","Компоненты, цикли"],["Память","Может быть больше","Зависит от высоты"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Топологическая сортировка"}),e.jsx("p",{className:"theory-intro",children:"Порядок вершин в ориентированном графе без циклов, где для каждого ребра A→B вершина A идёт раньше B."}),e.jsx(s,{code:`from collections import deque

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

print(topological_sort(graph, in_degree))  # ['A', 'B', 'C', 'D']`,language:"python"}),e.jsx(i,{title:"Применение",children:e.jsx("p",{children:"Например, в системе сборки проектов: нужно скомпилировать файл A перед файлом B, если B зависит от A."})})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь графы"})})]})}export{l as default};
