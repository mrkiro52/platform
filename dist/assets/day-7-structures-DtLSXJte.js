import{j as e}from"./index-wPonemfz.js";import{b as s,a as t,T as n}from"./TheoryTable-DOYeN1vA.js";import{V as l}from"./VideoPlayer-CmcoOxAU.js";function c({videoUrl:r}){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 7"}),e.jsx("p",{className:"theory-subtitle",children:"Структуры данных: массивы и связанные списки"}),e.jsx("p",{className:"theory-date",children:"7 июня 2026"})]}),r&&e.jsx(l,{src:r}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Массив (Array)"}),e.jsx("p",{className:"theory-intro",children:"Массив — это структура данных, которая хранит несколько элементов одного типа в смежных ячейках памяти. Каждый элемент имеет индекс."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Как работает массив в памяти"}),e.jsx("p",{className:"theory-intro",children:"Массив занимает последовательно блоки памяти. Если массив начинается с адреса 1000:"}),e.jsx(s,{headers:["Индекс","Адрес памяти","Значение"],rows:[["0","1000","45"],["1","1004","89"],["2","1008","23"],["3","1012","67"],["4","1016","92"]]}),e.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Поэтому доступ к элементу по индексу за O(1) — просто посчитай адрес!"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операции с массивом"}),e.jsx(s,{headers:["Операция","Big O","Описание"],rows:[["Доступ по индексу","O(1)","arr[2] — мгновенно"],["Добавление в конец","O(1)","Если место есть"],["Вставка в середину","O(n)","Нужно сдвинуть элементы"],["Удаление из середины","O(n)","Нужно сдвинуть элементы"],["Поиск элемента","O(n)","Проверить все элементы"]]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Плюсы и минусы"}),e.jsx("p",{className:"theory-intro",children:e.jsx("strong",{children:"✅ Плюсы:"})}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{className:"theory-list-item",children:"Быстрый доступ к элементу по индексу O(1)"}),e.jsx("li",{className:"theory-list-item",children:"Экономит память (нет дополнительных указателей)"}),e.jsx("li",{className:"theory-list-item",children:"Можно быстро итерировать"})]}),e.jsx("p",{className:"theory-intro",children:e.jsx("strong",{children:"❌ Минусы:"})}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{className:"theory-list-item",children:"Фиксированный размер (в большинстве языков)"}),e.jsx("li",{className:"theory-list-item",children:"Вставка/удаление в середину O(n) — медленно"}),e.jsx("li",{className:"theory-list-item",children:"Нужно знать размер заранее"})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Динамический массив"}),e.jsx("p",{className:"theory-intro",children:"Динамический массив (как list в Python) автоматически растёт, когда не хватает места. Так как это работает?"}),e.jsx(t,{title:"Как растёт динамический массив",children:e.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[e.jsx("li",{children:"Создаёшь список [] с местом на 10 элементов"}),e.jsx("li",{children:"Добавляешь 10 элементов — список полон"}),e.jsx("li",{children:"Добавляешь 11-й элемент — программа создаёт новый массив на 20 элементов"}),e.jsx("li",{children:"Копирует старые 10 элементов туда"}),e.jsx("li",{children:"Добавляет 11-й элемент"}),e.jsx("li",{children:"Удаляет старый массив"})]})}),e.jsx(n,{code:`# В Python это список
numbers = []  # Создан пустой список

# Добавляем элементы
for i in range(1000000):
    numbers.append(i)

# Каждый append работает как:
# 1. Если место есть → добавляем O(1)
# 2. Если нет места → копируем всё в новый массив O(n) + добавляем

# Но в среднем это O(1) за счёт группировки добавлений!`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Связанный список (Linked List)"}),e.jsx("p",{className:"theory-intro",children:"Связанный список — это список, где каждый элемент (узел) содержит данные и указатель на следующий узел."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Структура узла"}),e.jsx(n,{code:`class Node:
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
print(node1.next.next.data)  # 30`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Полная реализация"}),e.jsx(n,{code:`class LinkedList:
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
ll.display()  # [10, 30]`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операции со связанным списком"}),e.jsx(s,{headers:["Операция","Big O","Описание"],rows:[["Доступ к элементу","O(n)","Нужно пройти от начала"],["Вставка в начало","O(1)","Просто меняем head"],["Вставка после узла","O(1)","Меняем указатели"],["Удаление из начала","O(1)","Меняем head"],["Поиск элемента","O(n)","Проходим по всем"]]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Сравнение: Массив vs Связный список"}),e.jsx(s,{headers:["Критерий","Массив","Связный список"],rows:[["Доступ по индексу","O(1) ⚡","O(n) 🐢"],["Вставка/удаление в начало","O(n) 🐢","O(1) ⚡"],["Вставка/удаление в конец","O(1) ⚡","O(n) 🐢"],["Поиск","O(n)","O(n)"],["Память","Плотная","Дополнительная на указатели"],["Использовать когда","Нужен быстрый доступ","Много вставок/удалений"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Двусвязный список"}),e.jsx("p",{className:"theory-intro",children:"Как связный список, но каждый узел имеет указатель и на следующий, и на предыдущий. Позволяет идти в обе стороны."}),e.jsx(n,{code:`class DNode:
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
    current = current.prev`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Когда что использовать?"}),e.jsx(t,{title:"Примеры",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Массив:"})," Сохраняешь оценки студентов, часто нужен доступ к i-й оценке"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Динамический массив:"})," Собираешь данные, не знаешь количество заранее"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Связный список:"})," Реализуешь очередь или стек, много вставок/удалений"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Двусвязный список:"}),' Плеер с кнопками "вперёд/назад" по плейлисту']})]})})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Правильная структура данных = правильное решение!"})})]})}export{c as default};
