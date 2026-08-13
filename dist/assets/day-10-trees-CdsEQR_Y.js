import{j as e}from"./index-CPS4-3oh.js";import{a as r,T as s,b as t}from"./TheoryTable-Dn24XUql.js";function o(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 10"}),e.jsx("p",{className:"theory-subtitle",children:"Структуры данных: деревья"}),e.jsx("p",{className:"theory-date",children:"10 июня 2026"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Что такое дерево?"}),e.jsx("p",{className:"theory-intro",children:"Дерево — это иерархическая структура данных с узлами, где каждый узел может иметь несколько потомков, но только одного родителя."}),e.jsx(r,{title:"Аналогия",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Файловая система:"})," папки и файлы образуют дерево"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Генеалогия:"})," родитель → дети → внуки"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Организация:"})," руководитель → отделы → сотрудники"]})]})}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Терминология"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Корень (root)"})," — верхний узел без родителя"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Листья (leaves)"})," — узлы без потомков"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Высота"})," — количество уровней в дереве"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Глубина узла"})," — расстояние до корня"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Поддерево"})," — узел и все его потомки"]})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Бинарное дерево (Binary Tree)"}),e.jsx("p",{className:"theory-intro",children:"Дерево, где каждый узел может иметь максимум 2 потомка (левый и правый)."}),e.jsx(s,{code:`class Node:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None

root = Node(1)
root.left = Node(2)
root.right = Node(3)
root.left.left = Node(4)
root.left.right = Node(5)`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Обходы дерева"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"1. In-order (левый-корень-правый)"}),e.jsx("p",{className:"theory-intro",children:"Для BST дает отсортированный порядок:"}),e.jsx(s,{code:`def inorder(node):
    if node is None:
        return
    inorder(node.left)
    print(node.data)
    inorder(node.right)

# Для дерева выше: 4 2 5 1 3`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"2. Pre-order (корень-левый-правый)"}),e.jsx("p",{className:"theory-intro",children:"Обходит корень первым:"}),e.jsx(s,{code:`def preorder(node):
    if node is None:
        return
    print(node.data)
    preorder(node.left)
    preorder(node.right)

# Для дерева выше: 1 2 4 5 3`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"3. Post-order (левый-правый-корень)"}),e.jsx("p",{className:"theory-intro",children:"Обходит корень последним:"}),e.jsx(s,{code:`def postorder(node):
    if node is None:
        return
    postorder(node.left)
    postorder(node.right)
    print(node.data)

# Для дерева выше: 4 5 2 3 1`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Бинарное дерево поиска (BST)"}),e.jsx("p",{className:"theory-intro",children:"BST — бинарное дерево с особым свойством: левый потомок < родитель < правый потомок."}),e.jsx(s,{code:`class BST:
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
print(bst.search(100)) # False`,language:"python"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операции в BST"}),e.jsx(t,{headers:["Операция","Big O (лучше)","Big O (хуже)","Когда худший случай"],rows:[["Поиск","O(log n)","O(n)","Несбалансированное дерево"],["Вставка","O(log n)","O(n)","Несбалансированное дерево"],["Удаление","O(log n)","O(n)","Несбалансированное дерево"]]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Высота и баланс дерева"}),e.jsx(r,{title:"Сбалансированное дерево O(log n)",children:e.jsx("p",{children:"Дерево где разница высот левого и правого поддеревьев ≤ 1"})}),e.jsx(r,{title:"Несбалансированное дерево O(n)",children:e.jsx("p",{children:"Дерево вырождается в список (все элементы в одну сторону)"})}),e.jsx(s,{code:`# Несбалансированное дерево (худший случай)
bst = BST()
for val in [1, 2, 3, 4, 5]:  # Уже отсортировано!
    bst.insert(val)

# Дерево выглядит как список:
# 1-2-3-4-5

# Поиск 5 требует O(5) операций!`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Сбалансированные деревья"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"AVL-дерево"}),e.jsx("p",{className:"theory-intro",children:"Самобалансирующееся дерево, которое поддерживает баланс после вставки/удаления. Высота всегда O(log n)."}),e.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Гарантирует O(log n) для всех операций, но медленнее при вставке/удалении из-за переб алансировки."})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Red-Black дерево"}),e.jsx("p",{className:"theory-intro",children:"Другое сбалансированное дерево. Быстрее AVL при вставке/удалении."}),e.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Используется в Java TreeMap и C++ std::map."})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Практический пример: Проверка BST"}),e.jsx(s,{code:`def is_bst(node, min_val=float('-inf'), max_val=float('inf')):
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

print(is_bst(root))  # True`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Когда использовать деревья?"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"BST:"})," Быстрый поиск, сортировка, диапазонные запросы"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Файловая система:"})," Иерархия папок и файлов"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"DOM дерево:"})," В браузерах для HTML документов"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Индексы БД:"})," B-деревья в базах данных"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Парсеры:"})," Abstract Syntax Tree (AST)"]})]})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Деревья — один из самых мощных инструментов программиста!"})})]})}export{o as default};
