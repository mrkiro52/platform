// Служебный Python-код для задач курса по алгоритмам (поле prelude задачи).
// Выполняется до решения студента: классы узлов, сборка и разбор структур для тестов.
// Студенту эти классы описаны в шаблоне решения комментарием, определять их самому не нужно.

// Связный список: build_list([1, 2, 3]) → голова, list_to_array(head) → [1, 2, 3]
// Каждый созданный узел запоминается, и после теста _kiro_teardown разрывает связи.
// Зачем: Python в браузере (Pyodide) очень долго освобождает цепочку из тысяч объектов,
// связанных ссылками, — рекурсивно, узел за узлом. Без разрыва связей проверка
// на длинном списке «зависает» уже после того, как тест прошёл.
export const LIST = `
_KIRO_NODES = []

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        _KIRO_NODES.append(self)
    def __repr__(self):
        return f"ListNode({self.val})"

def _kiro_teardown():
    for node in _KIRO_NODES:
        node.next = None
    _KIRO_NODES.clear()

def build_list(values):
    dummy = ListNode()
    tail = dummy
    for v in values:
        tail.next = ListNode(v)
        tail = tail.next
    return dummy.next

def list_to_array(head, limit=100000):
    out = []
    while head is not None and len(out) < limit:
        out.append(head.val)
        head = head.next
    return out

def node_at(head, index):
    for _ in range(index):
        head = head.next
    return head
`

// Двоичное дерево в порядке обхода в ширину, None — пустое место:
// build_tree([3, 9, 20, None, None, 15, 7]); tree_to_list(root) — обратно
export const TREE = `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    def __repr__(self):
        return f"TreeNode({self.val})"

def build_tree(values):
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while queue and i < len(values):
        node = queue.pop(0)
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root

def tree_to_list(root):
    out, queue = [], [root]
    while queue:
        node = queue.pop(0)
        if node is None:
            out.append(None)
            continue
        out.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    while out and out[-1] is None:
        out.pop()
    return out

def find_node(root, val):
    if root is None or root.val == val:
        return root
    return find_node(root.left, val) or find_node(root.right, val)
`

// Неориентированный граф для Clone Graph: узел со списком соседей
export const GRAPH = `
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def build_graph(adj):
    if not adj:
        return None
    nodes = [Node(i + 1) for i in range(len(adj))]
    for i, nbrs in enumerate(adj):
        nodes[i].neighbors = [nodes[j - 1] for j in nbrs]
    return nodes[0]

def graph_to_adj(node):
    if node is None:
        return [], []
    seen, order = {node.val: node}, [node]
    for cur in order:
        for nb in cur.neighbors:
            if nb.val not in seen:
                seen[nb.val] = nb
                order.append(nb)
    objs = sorted(order, key=lambda n: n.val)
    return [[nb.val for nb in n.neighbors] for n in objs], objs
`

// Список, который считает обращения по индексу: проверка, что решение — двоичный поиск,
// а не линейный проход. nums.reads — сколько элементов прочитано
export const COUNTING = `
class CountingList(list):
    def __init__(self, *args):
        super().__init__(*args)
        self.reads = 0
    def __getitem__(self, i):
        self.reads += len(range(*i.indices(len(self)))) if isinstance(i, slice) else 1
        return super().__getitem__(i)
    def __iter__(self):
        for i in range(len(self)):
            yield self[i]
    def __contains__(self, x):
        self.reads += len(self)
        return super().__contains__(x)
    def index(self, *args):
        self.reads += len(self)
        return super().index(*args)
    def count(self, x):
        self.reads += len(self)
        return super().count(x)
`
