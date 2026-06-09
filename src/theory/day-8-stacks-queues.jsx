import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day8StacksQueuesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 8</h1>
        <p className="theory-subtitle">Структуры данных: стек и очередь</p>
        <p className="theory-date">8 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Стек (Stack)</h2>
        <p className="theory-intro">
          Стек работает по принципу LIFO (Last In, First Out) — последний добавленный элемент первым извлекается. Как стопка тарелок: берёшь с вершины.
        </p>

        <TheoryExample title="Аналогия из жизни">
          <p>Думаешь о стопке книг:</p>
          <ul>
            <li>Положил первую книгу (основание стека)</li>
            <li>Положил вторую на первую</li>
            <li>Положил третью на вторую (вершина стека)</li>
            <li>Берёшь книги? Сначала третью, потом вторую, потом первую</li>
          </ul>
        </TheoryExample>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операции со стеком</h3>
          <TheoryTable
            headers={['Операция', 'Описание', 'Big O']}
            rows={[
              ['push(x)', 'Добавить элемент на вершину', 'O(1)'],
              ['pop()', 'Удалить и вернуть элемент с вершины', 'O(1)'],
              ['peek()', 'Посмотреть элемент на вершине без удаления', 'O(1)'],
              ['is_empty()', 'Проверить, пуст ли стек', 'O(1)'],
              ['size()', 'Размер стека', 'O(1)'],
            ]}
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Реализация стека</h3>
          <TheoryCode code={`class Stack:
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
print(stack.size())  # 2`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Примеры использования стека</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Undo/Redo</strong> — каждый шаг в стек, отменяешь — pop из стека</li>
            <li className="theory-list-item"><strong>История браузера</strong> — нажимаешь "назад" → pop из стека URL</li>
            <li className="theory-list-item"><strong>Вычисление выражений</strong> — (2 + 3) * 4 → используешь стек</li>
            <li className="theory-list-item"><strong>Рекурсия</strong> — каждый вызов функции идёт в стек вызовов</li>
            <li className="theory-list-item"><strong>DFS (поиск в глубину)</strong> — обход графа</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Очередь (Queue)</h2>
        <p className="theory-intro">
          Очередь работает по принципу FIFO (First In, First Out) — первый добавленный элемент первым извлекается. Как очередь в магазине.
        </p>

        <TheoryExample title="Аналогия из жизни">
          <p>Очередь в магазине:</p>
          <ul>
            <li>Первый пришёл — первый обслужился</li>
            <li>Последний пришёл — последний обслужился</li>
          </ul>
        </TheoryExample>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операции с очередью</h3>
          <TheoryTable
            headers={['Операция', 'Описание', 'Big O']}
            rows={[
              ['enqueue(x)', 'Добавить элемент в конец (задняя часть)', 'O(1)'],
              ['dequeue()', 'Удалить и вернуть элемент с начала (передняя часть)', 'O(1)'],
              ['front()', 'Посмотреть первый элемент без удаления', 'O(1)'],
              ['is_empty()', 'Проверить, пуста ли очередь', 'O(1)'],
              ['size()', 'Размер очереди', 'O(1)'],
            ]}
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Реализация очереди</h3>
          <TheoryCode code={`from collections import deque

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
print(queue.size())     # 2`} language="python" />

          <TheoryExample title="Почему deque?">
            <p>Используем deque из collections, потому что обычный list в Python медленный для удаления с начала (O(n)). deque быстрый для обоих концов (O(1)).</p>
          </TheoryExample>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Примеры использования очереди</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Очередь печати</strong> — отправляешь несколько файлов, принтер печатает по очереди</li>
            <li className="theory-list-item"><strong>BFS (поиск в ширину)</strong> — обход графа уровень за уровнем</li>
            <li className="theory-list-item"><strong>Система обработки задач</strong> — рабочий берёт первую задачу из очереди</li>
            <li className="theory-list-item"><strong>Буфер ввода-вывода</strong> — данные идут в очередь, программа обрабатывает по порядку</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Сравнение: Стек vs Очередь</h2>
        <TheoryTable
          headers={['Критерий', 'Стек (LIFO)', 'Очередь (FIFO)']}
          rows={[
            ['Добавление', 'В вершину (push)', 'В конец (enqueue)'],
            ['Удаление', 'С вершины (pop)', 'С начала (dequeue)'],
            ['Первым обслужен', 'Последний добавленный', 'Первый добавленный'],
            ['Аналогия', 'Стопка тарелок', 'Очередь в магазине'],
            ['Используется для', 'Undo/redo, DFS', 'BFS, обработка задач'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Деку (Deque) - двусторонняя очередь</h2>
        <p className="theory-intro">
          Deque (Double Ended Queue) — очередь, где можно добавлять и удалять элементы с обоих концов.
        </p>

        <TheoryCode code={`from collections import deque

dq = deque([10, 20, 30])

# Добавлять можно с обоих концов
dq.append(40)        # Добавить в конец: [10, 20, 30, 40]
dq.appendleft(5)     # Добавить в начало: [5, 10, 20, 30, 40]

# Удалять можно с обоих концов
dq.pop()             # Удалить с конца: [5, 10, 20, 30]
dq.popleft()         # Удалить с начала: [10, 20, 30]

print(dq)            # deque([10, 20, 30])

# Все операции O(1)!`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Практический пример: Проверка скобок</h2>
        <p className="theory-intro">
          Проверить, правильно ли расставлены скобки: (()), ()((, ()(
        </p>

        <TheoryCode code={`def is_valid_parentheses(s):
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
print(is_valid_parentheses("("))         # False`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Практический пример: BFS с очередью</h2>
        <TheoryCode code={`from collections import deque

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

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E']`} language="python" />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Стек и очередь — это основа многих алгоритмов! 🎯</p>
      </section>
    </div>
  )
}
