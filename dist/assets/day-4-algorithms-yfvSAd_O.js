import{j as e}from"./index-wPonemfz.js";import{a as r,T as s,b as l}from"./TheoryTable-DOYeN1vA.js";import{V as n}from"./VideoPlayer-CmcoOxAU.js";function c({videoUrl:i}){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 4"}),e.jsx("p",{className:"theory-subtitle",children:"Алгоритмическое мышление и Big O"}),e.jsx("p",{className:"theory-date",children:"4 июня 2026"})]}),i&&e.jsx(n,{src:i}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Что такое алгоритм?"}),e.jsx("p",{className:"theory-intro",children:"Алгоритм — это пошаговая инструкция для решения задачи. Как рецепт в кулинарии: нужно делать шаги в правильном порядке, чтобы получить результат."}),e.jsx("p",{className:"theory-intro",style:{marginTop:"12px"},children:"Свойства алгоритма:"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Конечность"})," — алгоритм должен закончиться, не бежать вечно"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Определённость"})," — каждый шаг должен быть ясным и однозначным"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Ввод"})," — алгоритм принимает входные данные"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Вывод"})," — алгоритм выдаёт результат"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Эффективность"})," — алгоритм должен работать за разумное время"]})]}),e.jsx(r,{title:"Пример: Рецепт чая",children:e.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[e.jsx("li",{children:"Налей воду в чайник"}),e.jsx("li",{children:"Включи чайник"}),e.jsx("li",{children:"Жди, пока вода закипит"}),e.jsx("li",{children:"Налей горячую воду в кружку"}),e.jsx("li",{children:"Положи пакетик чая"}),e.jsx("li",{children:"Жди 3-5 минут"}),e.jsx("li",{children:"Достань пакетик"}),e.jsx("li",{children:"Добавь сахар (по желанию)"}),e.jsx("li",{children:"Чай готов!"})]})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Примеры алгоритмов"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Найти максимум в списке"}),e.jsx(s,{code:`def find_max(numbers):
    max_value = numbers[0]

    for num in numbers:
        if num > max_value:
            max_value = num

    return max_value

# Пример
scores = [45, 89, 23, 67, 92, 34]
print(find_max(scores))  # 92`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Поиск элемента (Linear Search)"}),e.jsx(s,{code:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Найдено на позиции i
    return -1  # Не найдено

# Пример
fruits = ["яблоко", "банан", "апельсин"]
print(linear_search(fruits, "банан"))  # 1
print(linear_search(fruits, "груша"))  # -1`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Алгоритм: Сортировка (Bubble Sort)"}),e.jsx(s,{code:`def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Меняем местами
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr

# Пример
nums = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(nums))
# [11, 12, 22, 25, 34, 64, 90]`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Нотация Big O (сложность алгоритма)"}),e.jsx("p",{className:"theory-intro",children:"Big O — это способ описать, как быстро растёт время выполнения алгоритма при увеличении входных данных."}),e.jsxs(r,{title:"Аналогия",children:[e.jsx("p",{children:"Представь, что у тебя есть большая библиотека:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"O(1)"})," — ты помнишь, где конкретная книга, берёшь её сразу"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"O(n)"})," — нужно проверить все полки, может на 100-й полке"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"O(n²)"})," — нужно проверить все полки и все книги на каждой полке"]})]})]}),e.jsx(l,{headers:["Нотация","Название","Что делает","Пример","Скорость"],rows:[["O(1)","Постоянная","Одна операция, не зависит от размера","Доступ к элементу по индексу","Молния"],["O(log n)","Логарифмическая","Каждый раз половина","Бинарный поиск","Очень быстро"],["O(n)","Линейная","Проверить все элементы","Поиск в списке","Быстро"],["O(n log n)","Линейно-логарифмическая","Разделяй и властвуй","Эффективная сортировка","Нормально"],["O(n²)","Квадратичная","Вложенные циклы","Пузырьковая сортировка","Медленно"],["O(n³)","Кубическая","Три вложенных цикла","Тройные циклы","Медленнее"],["O(2ⁿ)","Экспоненциальная","Растёт очень быстро","Некоторые рекурсивные алгоритмы","Очень медленно"]]}),e.jsxs("div",{className:"theory-subsection",style:{marginTop:"24px"},children:[e.jsx("h3",{className:"theory-heading-3",children:"Как анализировать Big O"}),e.jsx(s,{code:`# O(1) - одна операция
def get_first(arr):
    return arr[0]

# O(n) - один цикл
def sum_all(arr):
    total = 0
    for num in arr:
        total += num
    return total

# O(n²) - вложенные циклы
def print_pairs(arr):
    for i in arr:
        for j in arr:
            print(i, j)

# O(log n) - каждый раз половина (бинарный поиск)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Сравнение скоростей"}),e.jsx("p",{className:"theory-intro",children:"Как быстро работают разные алгоритмы с 1 млн элементов:"}),e.jsx(l,{headers:["Big O","Операций","Время","Использовать?"],rows:[["O(1)","1","0.000001 сек","Идеально! ✅"],["O(log n)","20","0.00002 сек","Очень хорошо ✅"],["O(n)","1,000,000","0.001 сек","Хорошо ✅"],["O(n log n)","20,000,000","0.02 сек","Приемлемо ✅"],["O(n²)","1,000,000,000,000","16 минут","Плохо ❌"],["O(2ⁿ)","Огромное число","Вечность ","Очень плохо ❌"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Как выбрать хороший алгоритм"}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{className:"theory-list-item",children:"Для маленьких данных — важнее простота кода"}),e.jsx("li",{className:"theory-list-item",children:"Для больших данных — важнее скорость (Big O)"}),e.jsx("li",{className:"theory-list-item",children:"Всегда проверь граничные случаи (пустой список, один элемент)"}),e.jsx("li",{className:"theory-list-item",children:"O(n) лучше, чем O(n²), но O(1) ещё лучше!"})]}),e.jsxs(r,{title:"На собеседовании",children:[e.jsx("p",{children:"Когда спрашивают решить задачу, обязательно скажи:"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Какая Big O временная сложность?"}),e.jsx("li",{children:"Какая Big O пространственная сложность (память)?"}),e.jsx("li",{children:"Можно ли оптимизировать?"})]})]})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь, как писать быстрый код"})})]})}export{c as default};
