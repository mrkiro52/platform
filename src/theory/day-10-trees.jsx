import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day10TreesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 10</h1>
        <p className="theory-subtitle">Структуры данных: деревья</p>
        <p className="theory-date">10 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что такое дерево?</h2>
        <p className="theory-intro">
          Дерево — это иерархическая структура данных с узлами, где каждый узел может иметь несколько потомков, но только одного родителя.
        </p>

        <TheoryExample title="Аналогия">
          <ul>
            <li><strong>Файловая система:</strong> папки и файлы образуют дерево</li>
            <li><strong>Генеалогия:</strong> родитель → дети → внуки</li>
            <li><strong>Организация:</strong> руководитель → отделы → сотрудники</li>
          </ul>
        </TheoryExample>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Терминология</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Корень (root)</strong> — верхний узел без родителя</li>
            <li className="theory-list-item"><strong>Листья (leaves)</strong> — узлы без потомков</li>
            <li className="theory-list-item"><strong>Высота</strong> — количество уровней в дереве</li>
            <li className="theory-list-item"><strong>Глубина узла</strong> — расстояние до корня</li>
            <li className="theory-list-item"><strong>Поддерево</strong> — узел и все его потомки</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Бинарное дерево (Binary Tree)</h2>
        <p className="theory-intro">
          Дерево, где каждый узел может иметь максимум 2 потомка (левый и правый).
        </p>

        <TheoryCode code={`class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Обходы дерева</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">1. In-order (левый-корень-правый)</h3>
          <p className="theory-intro">Для BST дает отсортированный порядок:</p>
          <TheoryCode code={`def inorder(node):
    if node is None:
        return
    inorder(node.left)
    print(node.data)
    inorder(node.right)

# Для дерева выше: 4 2 5 1 3`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">2. Pre-order (корень-левый-правый)</h3>
          <p className="theory-intro">Обходит корень первым:</p>
          <TheoryCode code={`def preorder(node):
    if node is None:
        return
    print(node.data)
    preorder(node.left)
    preorder(node.right)

# Для дерева выше: 1 2 4 5 3`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">3. Post-order (левый-правый-корень)</h3>
          <p className="theory-intro">Обходит корень последним:</p>
          <TheoryCode code={`def postorder(node):
    if node is None:
        return
    postorder(node.left)
    postorder(node.right)
    print(node.data)

# Для дерева выше: 4 5 2 3 1`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Бинарное дерево поиска (BST)</h2>
        <p className="theory-intro">
          BST — бинарное дерево с особым свойством: левый потомок &lt; родитель &lt; правый потомок.
        </p>

        <TheoryCode code={`class BST:
    def __init__(self):
        self.root = None

    def insert(self, data):
        if self.root is None:
            self.root = Node(data)
        else:
            self._insert_recursive(self.root, data)

    def _insert_recursive(self, node, data):
        if data < node.data:
            if node.left is None:
                node.left = Node(data)
            else:
                self._insert_recursive(node.left, data)
        else:
            if node.right is None:
                node.right = Node(data)
            else:
                self._insert_recursive(node.right, data)

    def search(self, data):
        return self._search_recursive(self.root, data)

    def _search_recursive(self, node, data):
        if node is None:
            return False
        if data == node.data:
            return True
        elif data < node.data:
            return self._search_recursive(node.left, data)
        else:
            return self._search_recursive(node.right, data)

# Использование
bst = BST()
for val in [50, 30, 70, 20, 40, 60, 80]:
    bst.insert(val)

print(bst.search(40))  # True
print(bst.search(100)) # False`} language="python" />

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операции в BST</h3>
          <TheoryTable
            headers={['Операция', 'Big O (лучше)', 'Big O (хуже)', 'Когда худший случай']}
            rows={[
              ['Поиск', 'O(log n)', 'O(n)', 'Несбалансированное дерево'],
              ['Вставка', 'O(log n)', 'O(n)', 'Несбалансированное дерево'],
              ['Удаление', 'O(log n)', 'O(n)', 'Несбалансированное дерево'],
            ]}
          />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Высота и баланс дерева</h2>

        <TheoryExample title="Сбалансированное дерево O(log n)">
          <p>Дерево где разница высот левого и правого поддеревьев ≤ 1</p>
        </TheoryExample>

        <TheoryExample title="Несбалансированное дерево O(n)">
          <p>Дерево вырождается в список (все элементы в одну сторону)</p>
        </TheoryExample>

        <TheoryCode code={`# Несбалансированное дерево (худший случай)
bst = BST()
for val in [1, 2, 3, 4, 5]:  # Уже отсортировано!
    bst.insert(val)

# Дерево выглядит как список:
# 1-2-3-4-5

# Поиск 5 требует O(5) операций!`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Сбалансированные деревья</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">AVL-дерево</h3>
          <p className="theory-intro">
            Самобалансирующееся дерево, которое поддерживает баланс после вставки/удаления. Высота всегда O(log n).
          </p>
          <p className="theory-text" style={{ marginTop: '12px' }}>
            Гарантирует O(log n) для всех операций, но медленнее при вставке/удалении из-за переб алансировки.
          </p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Red-Black дерево</h3>
          <p className="theory-intro">
            Другое сбалансированное дерево. Быстрее AVL при вставке/удалении.
          </p>
          <p className="theory-text" style={{ marginTop: '12px' }}>
            Используется в Java TreeMap и C++ std::map.
          </p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Практический пример: Проверка BST</h2>
        <TheoryCode code={`def is_bst(node, min_val=float('-inf'), max_val=float('inf')):
    """Проверить, является ли дерево корректным BST"""
    if node is None:
        return True

    # Если значение вне диапазона - не BST
    if node.data <= min_val or node.data >= max_val:
        return False

    # Рекурсивно проверяем поддеревья
    return (is_bst(node.left, min_val, node.data) and
            is_bst(node.right, node.data, max_val))

# Пример
root = Node(50)
root.left = Node(30)
root.right = Node(70)
root.left.left = Node(20)
root.left.right = Node(40)

print(is_bst(root))  # True`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Когда использовать деревья?</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>BST:</strong> Быстрый поиск, сортировка, диапазонные запросы</li>
          <li className="theory-list-item"><strong>Файловая система:</strong> Иерархия папок и файлов</li>
          <li className="theory-list-item"><strong>DOM дерево:</strong> В браузерах для HTML документов</li>
          <li className="theory-list-item"><strong>Индексы БД:</strong> B-деревья в базах данных</li>
          <li className="theory-list-item"><strong>Парсеры:</strong> Abstract Syntax Tree (AST)</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Деревья — один из самых мощных инструментов программиста!</p>
      </section>
    </div>
  )
}
