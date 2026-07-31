import{j as e}from"./index-Cb5sh8pD.js";import{a as i,b as t,T as s}from"./TheoryTable-CAJX0pr7.js";function n(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 8"}),e.jsx("p",{className:"theory-subtitle",children:"Структуры данных: стек и очередь"}),e.jsx("p",{className:"theory-date",children:"8 июня 2026"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Стек (Stack)"}),e.jsx("p",{className:"theory-intro",children:"Стек работает по принципу LIFO (Last In, First Out) — последний добавленный элемент первым извлекается. Как стопка тарелок: берёшь с вершины."}),e.jsxs(i,{title:"Аналогия из жизни",children:[e.jsx("p",{children:"Думаешь о стопке книг:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Положил первую книгу (основание стека)"}),e.jsx("li",{children:"Положил вторую на первую"}),e.jsx("li",{children:"Положил третью на вторую (вершина стека)"}),e.jsx("li",{children:"Берёшь книги? Сначала третью, потом вторую, потом первую"})]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операции со стеком"}),e.jsx(t,{headers:["Операция","Описание","Big O"],rows:[["push(x)","Добавить элемент на вершину","O(1)"],["pop()","Удалить и вернуть элемент с вершины","O(1)"],["peek()","Посмотреть элемент на вершине без удаления","O(1)"],["is_empty()","Проверить, пуст ли стек","O(1)"],["size()","Размер стека","O(1)"]]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Реализация стека"}),e.jsx(s,{code:`class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        return None

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Использование
stack = Stack()
stack.push(10)
stack.push(20)
stack.push(30)

print(stack.pop())   # 30 (последний добавленный)
print(stack.peek())  # 20 (вершина без удаления)
print(stack.size())  # 2`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Примеры использования стека"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Undo/Redo"})," — каждый шаг в стек, отменяешь — pop из стека"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"История браузера"}),' — нажимаешь "назад" → pop из стека URL']}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Вычисление выражений"})," — (2 + 3) * 4 → используешь стек"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Рекурсия"})," — каждый вызов функции идёт в стек вызовов"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"DFS (поиск в глубину)"})," — обход графа"]})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Очередь (Queue)"}),e.jsx("p",{className:"theory-intro",children:"Очередь работает по принципу FIFO (First In, First Out) — первый добавленный элемент первым извлекается. Как очередь в магазине."}),e.jsxs(i,{title:"Аналогия из жизни",children:[e.jsx("p",{children:"Очередь в магазине:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Первый пришёл — первый обслужился"}),e.jsx("li",{children:"Последний пришёл — последний обслужился"})]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операции с очередью"}),e.jsx(t,{headers:["Операция","Описание","Big O"],rows:[["enqueue(x)","Добавить элемент в конец (задняя часть)","O(1)"],["dequeue()","Удалить и вернуть элемент с начала (передняя часть)","O(1)"],["front()","Посмотреть первый элемент без удаления","O(1)"],["is_empty()","Проверить, пуста ли очередь","O(1)"],["size()","Размер очереди","O(1)"]]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Реализация очереди"}),e.jsx(s,{code:`from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        return None

    def front(self):
        if not self.is_empty():
            return self.items[0]
        return None

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Использование
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)

print(queue.dequeue())  # 10 (первый добавленный)
print(queue.front())    # 20 (передняя без удаления)
print(queue.size())     # 2`,language:"python"}),e.jsx(i,{title:"Почему deque?",children:e.jsx("p",{children:"Используем deque из collections, потому что обычный list в Python медленный для удаления с начала (O(n)). deque быстрый для обоих концов (O(1))."})})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Примеры использования очереди"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Очередь печати"})," — отправляешь несколько файлов, принтер печатает по очереди"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"BFS (поиск в ширину)"})," — обход графа уровень за уровнем"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Система обработки задач"})," — рабочий берёт первую задачу из очереди"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Буфер ввода-вывода"})," — данные идут в очередь, программа обрабатывает по порядку"]})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Стек vs Очередь"}),e.jsx(t,{headers:["Критерий","Стек (LIFO)","Очередь (FIFO)"],rows:[["Добавление","В вершину (push)","В конец (enqueue)"],["Удаление","С вершины (pop)","С начала (dequeue)"],["Первым обслужен","Последний добавленный","Первый добавленный"],["Аналогия","Стопка тарелок","Очередь в магазине"],["Используется для","Undo/redo, DFS","BFS, обработка задач"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Деку (Deque) - двусторонняя очередь"}),e.jsx("p",{className:"theory-intro",children:"Deque (Double Ended Queue) — очередь, где можно добавлять и удалять элементы с обоих концов."}),e.jsx(s,{code:`from collections import deque

dq = deque([10, 20, 30])

# Добавлять можно с обоих концов
dq.append(40)        # Добавить в конец: [10, 20, 30, 40]
dq.appendleft(5)     # Добавить в начало: [5, 10, 20, 30, 40]

# Удалять можно с обоих концов
dq.pop()             # Удалить с конца: [5, 10, 20, 30]
dq.popleft()         # Удалить с начала: [10, 20, 30]

print(dq)            # deque([10, 20, 30])

# Все операции O(1)!`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Практический пример: Проверка скобок"}),e.jsx("p",{className:"theory-intro",children:"Проверить, правильно ли расставлены скобки: (()), ()((, ()("}),e.jsx(s,{code:`def is_valid_parentheses(s):
    stack = Stack()
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:  # Открывающая скобка
            stack.push(char)
        elif char in pairs.values():  # Закрывающая скобка
            if stack.is_empty() or pairs[stack.pop()] != char:
                return False

    return stack.is_empty()

# Примеры
print(is_valid_parentheses("()"))        # True
print(is_valid_parentheses("()[]{}"))    # True
print(is_valid_parentheses("([{}])"))    # True
print(is_valid_parentheses("([)]"))      # False
print(is_valid_parentheses("("))         # False`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Практический пример: BFS с очередью"}),e.jsx(s,{code:`from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []

    while queue:
        node = queue.popleft()  # Берём с начала (очередь)
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)  # Добавляем в конец

    return result

# Граф
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'E'],
    'D': ['B'],
    'E': ['C']
}

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E']`,language:"python"})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Стек и очередь — это основа многих алгоритмов!"})})]})}export{n as default};
