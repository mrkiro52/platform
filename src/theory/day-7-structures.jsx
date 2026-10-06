import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

export default function Day7StructuresTheory({ videoUrl }) {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Структуры данных: массивы и связанные списки</h1>
        <p>
          Массив и связанный список — две базовые структуры для хранения последовательностей. Они по-разному устроены в памяти, и от этого зависит скорость операций. Понимание этой разницы — основа для всех остальных структур данных.
        </p>
      </section>

      {videoUrl && <VideoPlayer src={videoUrl} />}

      <section className="theory-section">
        <h2 className="theory-heading-2">Массив (Array)</h2>
        <p className="theory-intro">
          Массив — это структура данных, которая хранит несколько элементов одного типа в смежных ячейках памяти. Каждый элемент имеет индекс.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Как работает массив в памяти</h3>
          <p className="theory-intro">
            Массив занимает последовательно блоки памяти. Если массив начинается с адреса 1000:
          </p>
          <TheoryTable
            headers={['Индекс', 'Адрес памяти', 'Значение']}
            rows={[
              ['0', '1000', '45'],
              ['1', '1004', '89'],
              ['2', '1008', '23'],
              ['3', '1012', '67'],
              ['4', '1016', '92'],
            ]}
          />

          <p className="theory-intro" style={{ marginTop: '16px' }}>
            Поэтому доступ к элементу по индексу за O(1) — просто посчитай адрес!
          </p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операции с массивом</h3>
          <TheoryTable
            headers={['Операция', 'Big O', 'Описание']}
            rows={[
              ['Доступ по индексу', 'O(1)', 'arr[2] — мгновенно'],
              ['Добавление в конец', 'O(1)', 'Если место есть'],
              ['Вставка в середину', 'O(n)', 'Нужно сдвинуть элементы'],
              ['Удаление из середины', 'O(n)', 'Нужно сдвинуть элементы'],
              ['Поиск элемента', 'O(n)', 'Проверить все элементы'],
            ]}
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Плюсы и минусы</h3>
          <p className="theory-intro"><strong>✓ Плюсы:</strong></p>
          <ul className="theory-list">
            <li className="theory-list-item">Быстрый доступ к элементу по индексу O(1)</li>
            <li className="theory-list-item">Экономит память (нет дополнительных указателей)</li>
            <li className="theory-list-item">Можно быстро итерировать</li>
          </ul>

          <p className="theory-intro"><strong>✗ Минусы:</strong></p>
          <ul className="theory-list">
            <li className="theory-list-item">Фиксированный размер (в большинстве языков)</li>
            <li className="theory-list-item">Вставка/удаление в середину O(n) — медленно</li>
            <li className="theory-list-item">Нужно знать размер заранее</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Динамический массив</h2>
        <p className="theory-intro">
          Динамический массив (как list в Python) автоматически растёт, когда не хватает места. Так как это работает?
        </p>

        <TheoryExample title="Как растёт динамический массив">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Создаёшь список [] с местом на 10 элементов</li>
            <li>Добавляешь 10 элементов — список полон</li>
            <li>Добавляешь 11-й элемент — программа создаёт новый массив на 20 элементов</li>
            <li>Копирует старые 10 элементов туда</li>
            <li>Добавляет 11-й элемент</li>
            <li>Удаляет старый массив</li>
          </ol>
        </TheoryExample>

        <TheoryCode code={`# В Python это список
numbers = []  # Создан пустой список

# Добавляем элементы
for i in range(1000000):
    numbers.append(i)

# Каждый append работает как:
# 1. Если место есть → добавляем O(1)
# 2. Если нет места → копируем всё в новый массив O(n) + добавляем

# Но в среднем это O(1) за счёт группировки добавлений!`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Связанный список (Linked List)</h2>
        <p className="theory-intro">
          Связанный список — это список, где каждый элемент (узел) содержит данные и указатель на следующий узел.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Структура узла</h3>
          <TheoryCode code={`class Node:
    def __init__(self, data):
        self.data = data        # Данные
        self.next = None        # Указатель на следующий узел

# Создание узлов
node1 = Node(10)
node2 = Node(20)
node3 = Node(30)

# Связываем их
node1.next = node2
node2.next = node3

# Получение данных
print(node1.data)        # 10
print(node1.next.data)   # 20
print(node1.next.next.data)  # 30`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Полная реализация</h3>
          <TheoryCode code={`class LinkedList:
    def __init__(self):
        self.head = None

    def add(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node

    def display(self):
        result = []
        current = self.head
        while current:
            result.append(current.data)
            current = current.next
        print(result)

    def remove(self, data):
        if not self.head:
            return

        if self.head.data == data:
            self.head = self.head.next
            return

        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

# Использование
ll = LinkedList()
ll.add(10)
ll.add(20)
ll.add(30)
ll.display()  # [10, 20, 30]

ll.remove(20)
ll.display()  # [10, 30]`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операции со связанным списком</h3>
          <TheoryTable
            headers={['Операция', 'Big O', 'Описание']}
            rows={[
              ['Доступ к элементу', 'O(n)', 'Нужно пройти от начала'],
              ['Вставка в начало', 'O(1)', 'Просто меняем head'],
              ['Вставка после узла', 'O(1)', 'Меняем указатели'],
              ['Удаление из начала', 'O(1)', 'Меняем head'],
              ['Поиск элемента', 'O(n)', 'Проходим по всем'],
            ]}
          />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Сравнение: Массив vs Связный список</h2>
        <TheoryTable
          headers={['Критерий', 'Массив', 'Связный список']}
          rows={[
            ['Доступ по индексу', 'O(1) ', 'O(n) '],
            ['Вставка/удаление в начало', 'O(n) ', 'O(1) '],
            ['Вставка/удаление в конец', 'O(1) ', 'O(n) '],
            ['Поиск', 'O(n)', 'O(n)'],
            ['Память', 'Плотная', 'Дополнительная на указатели'],
            ['Использовать когда', 'Нужен быстрый доступ', 'Много вставок/удалений'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Двусвязный список</h2>
        <p className="theory-intro">
          Как связный список, но каждый узел имеет указатель и на следующий, и на предыдущий. Позволяет идти в обе стороны.
        </p>

        <TheoryCode code={`class DNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None  # Указатель на предыдущий

# Двусвязный список можно обходить в обе стороны
node1 = DNode(10)
node2 = DNode(20)
node3 = DNode(30)

node1.next = node2
node2.prev = node1
node2.next = node3
node3.prev = node2

# Идём вперёд: 10 → 20 → 30
current = node1
while current:
    print(current.data)
    current = current.next

# Идём назад: 30 → 20 → 10
current = node3
while current:
    print(current.data)
    current = current.prev`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Когда что использовать?</h2>
        <TheoryExample title="Примеры">
          <ul>
            <li><strong>Массив:</strong> Сохраняешь оценки студентов, часто нужен доступ к i-й оценке</li>
            <li><strong>Динамический массив:</strong> Собираешь данные, не знаешь количество заранее</li>
            <li><strong>Связный список:</strong> Реализуешь очередь или стек, много вставок/удалений</li>
            <li><strong>Двусвязный список:</strong> Плеер с кнопками "вперёд/назад" по плейлисту</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как устроен list в Python</h2>
        <p>
          Список в Python — это динамический массив <strong>ссылок</strong> на объекты. Сам массив хранит адреса,
          а значения лежат в памяти отдельно. Поэтому в один список можно положить данные разных типов, а
          доступ по индексу всё равно O(1): адрес нужной ячейки вычисляется сразу.
        </p>
        <p>
          Когда место заканчивается, Python выделяет новый массив с запасом (примерно в 1,125 раза больше плюс
          небольшая константа) и копирует туда ссылки. Копирование — O(n), но происходит редко, поэтому
          <code> append</code> в среднем занимает <strong>амортизированное O(1)</strong>.
        </p>
        <TheoryCode language="python" code={`import sys

items = []
for i in range(10):
    items.append(i)
    print(len(items), sys.getsizeof(items))
# размер в байтах растёт скачками, а не на каждом append —
# список заранее резервирует место под будущие элементы`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Приёмы для задач на связные списки</h2>
        <h3 className="theory-heading-3">Фиктивный узел (dummy)</h3>
        <p>
          Чтобы не обрабатывать отдельно удаление первого элемента или пустой список, перед головой ставят
          вспомогательный узел.
        </p>
        <TheoryCode language="python" code={`class Node:
    def __init__(self, val, next=None):
        self.val, self.next = val, next

def remove_all(head, target):
    dummy = Node(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == target:
            cur.next = cur.next.next     # пропускаем узел
        else:
            cur = cur.next
    return dummy.next`} />
        <h3 className="theory-heading-3">Медленный и быстрый указатели</h3>
        <p>
          Один указатель идёт на шаг, другой — на два. Когда быстрый дойдёт до конца, медленный будет в
          середине. Если в списке есть цикл, указатели обязательно встретятся.
        </p>
        <TheoryCode language="python" code={`def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
        if slow is fast:
            return True
    return False`} />
        <h3 className="theory-heading-3">Разворот списка</h3>
        <TheoryCode language="python" code={`def reverse(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next
    return prev`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Задачи с собеседований</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Reverse Linked List</strong> — развернуть список (три указателя).</li>
          <li className="theory-list-item"><strong>Merge Two Sorted Lists</strong> — слить два отсортированных списка (фиктивный узел).</li>
          <li className="theory-list-item"><strong>Linked List Cycle</strong> — есть ли цикл (медленный и быстрый указатели).</li>
          <li className="theory-list-item"><strong>Remove Nth Node From End</strong> — удалить n-й с конца за один проход (указатели с отставанием на n).</li>
          <li className="theory-list-item"><strong>Rotate Array</strong> — сдвинуть массив на k позиций за O(1) памяти (три разворота).</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Правильная структура данных = правильное решение!</p>
      </section>
    </div>
  )
}
