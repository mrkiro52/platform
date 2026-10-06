import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day8StacksQueuesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Структуры данных: стек и очередь</h1>
        <p>
          Стек и очередь — структуры с ограниченным доступом: элементы добавляются и извлекаются по строгим правилам. На них построены вызовы функций, отмена действий, обработка задач и поиск в ширину.
        </p>
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

      <section className="theory-section">
        <h2 className="theory-heading-2">Очередь с приоритетом</h2>
        <p>
          В обычной очереди первым выходит тот, кто раньше пришёл. В <strong>очереди с приоритетом</strong> —
          элемент с наименьшим (или наибольшим) приоритетом. Так работают планировщики задач, алгоритм Дейкстры,
          выбор «k самых больших» элементов. Внутри она обычно устроена как <strong>двоичная куча</strong>.
        </p>
        <TheoryCode language="python" code={`import heapq

tasks = []
heapq.heappush(tasks, (2, "написать тесты"))
heapq.heappush(tasks, (1, "починить прод"))
heapq.heappush(tasks, (3, "обновить README"))

while tasks:
    priority, task = heapq.heappop(tasks)   # всегда минимальный приоритет
    print(priority, task)
# 1 починить прод
# 2 написать тесты
# 3 обновить README`} />
        <TheoryTable
          headers={['Операция', 'Сложность']}
          rows={[
            ['Добавить элемент (heappush)', 'O(log n)'],
            ['Извлечь минимум (heappop)', 'O(log n)'],
            ['Посмотреть минимум (heap[0])', 'O(1)'],
            ['Построить кучу из списка (heapify)', 'O(n)'],
          ]}
        />
        <p>
          <code>heapq</code> — это min-куча. Чтобы получить максимум, кладут числа со знаком минус:
          <code> heapq.heappush(h, -x)</code>.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Монотонный стек</h2>
        <p>
          Приём для задач вида «для каждого элемента найти ближайший больший справа». Наивное решение — два
          вложенных цикла за O(n²). Монотонный стек решает за O(n): в стеке хранятся индексы элементов, для
          которых ответ ещё не найден, и значения в нём всегда убывают.
        </p>
        <TheoryCode language="python" code={`def next_greater(nums):
    result = [-1] * len(nums)
    stack = []                       # индексы, ждущие ответа
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x  # нашли больший элемент справа
        stack.append(i)
    return result

next_greater([2, 1, 5, 3, 6])   # [5, 5, 6, 6, -1]`} />
        <p>
          Каждый индекс один раз попадает в стек и один раз из него извлекается — поэтому общая сложность O(n),
          хотя внутри есть цикл <code>while</code>.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Где стек и очередь встречаются в реальных системах</h2>
        <TheoryTable
          headers={['Система', 'Структура', 'Зачем']}
          rows={[
            ['Стек вызовов функций', 'Стек', 'Возврат из функции в место, откуда её вызвали'],
            ['Undo в редакторе', 'Стек', 'Отмена последнего действия'],
            ['История браузера «назад»', 'Стек', 'Возврат на предыдущую страницу'],
            ['Очереди сообщений (RabbitMQ, Kafka)', 'Очередь', 'Обработка задач по порядку поступления'],
            ['Буфер печати, обработка запросов сервером', 'Очередь', 'Справедливый порядок обслуживания'],
            ['Планировщик задач ОС', 'Очередь с приоритетом', 'Сначала важные процессы'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Задачи с собеседований на стек и очередь</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Valid Parentheses</strong> — проверить правильность скобочной последовательности (стек).</li>
          <li className="theory-list-item"><strong>Min Stack</strong> — стек, который возвращает минимум за O(1) (второй стек минимумов).</li>
          <li className="theory-list-item"><strong>Implement Queue using Stacks</strong> — очередь на двух стеках с амортизированной O(1).</li>
          <li className="theory-list-item"><strong>Daily Temperatures</strong> — через сколько дней будет теплее (монотонный стек).</li>
          <li className="theory-list-item"><strong>Kth Largest Element</strong> — k-й по величине элемент (куча размера k).</li>
          <li className="theory-list-item"><strong>Binary Tree Level Order Traversal</strong> — обход дерева по уровням (очередь).</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Стек и очередь — это основа многих алгоритмов!</p>
      </section>
    </div>
  )
}
