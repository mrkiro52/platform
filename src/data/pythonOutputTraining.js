// Пул задач для тренировки "Что выведет? (Python)".
// answer — точная строка вывода (как будет напечатано в консоли построчно, \n между строками)

export const PYTHON_OUTPUT_POOL = [
  {
    id: 'mutable-default-arg',
    title: 'Изменяемый аргумент по умолчанию',
    code: `def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))
print(add_item(2))`,
    answer: '[1]\n[1, 2]',
  },
  {
    id: 'late-binding-closure',
    title: 'Позднее связывание в замыканиях',
    code: `funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])`,
    answer: '[2, 2, 2]',
  },
  {
    id: 'banker-rounding',
    title: 'Округление round() до чётного',
    code: `print(round(0.5))
print(round(1.5))
print(round(2.5))`,
    answer: '0\n2\n2',
  },
  {
    id: 'chained-comparison',
    title: 'Цепочка сравнений',
    code: `x = 5
print(1 < x < 10)
print(10 < x < 1)`,
    answer: 'True\nFalse',
  },
  {
    id: 'float-precision',
    title: 'Точность чисел с плавающей запятой',
    code: `print(0.1 + 0.2 == 0.3)
print(0.1 + 0.2)`,
    answer: 'False\n0.30000000000000004',
  },
  {
    id: 'string-multiplication',
    title: 'Умножение строки',
    code: `print('ab' * 3)
print(3 * 'x')`,
    answer: 'ababab\nxxx',
  },
  {
    id: 'list-vs-tuple-unpack',
    title: 'Распаковка с звёздочкой',
    code: `first, *rest = [1, 2, 3, 4]
print(rest)

*init, last = [1, 2, 3, 4]
print(init)`,
    answer: '[2, 3, 4]\n[1, 2, 3]',
  },
  {
    id: 'dict-order',
    title: 'Порядок ключей словаря',
    code: `d = {'b': 2, 'a': 1, 'c': 3}
print(list(d.keys()))`,
    answer: "['b', 'a', 'c']",
  },
  {
    id: 'boolean-arithmetic',
    title: 'Арифметика с булевыми значениями',
    code: `print(True + True)
print(True == 1)
print(False == 0)
print(True + False + True)`,
    answer: '2\nTrue\nTrue\n2',
  },
  {
    id: 'string-slicing-negative',
    title: 'Срезы строк с отрицательными индексами',
    code: `s = 'Python'
print(s[-3:])
print(s[:-3])
print(s[::-1])`,
    answer: 'hon\nPyt\nnohtyP',
  },
  {
    id: 'shallow-copy-nested',
    title: 'Поверхностное копирование вложенных списков',
    code: `original = [[1, 2], [3, 4]]
copy = original.copy()
copy[0][0] = 99

print(original)`,
    answer: '[[99, 2], [3, 4]]',
  },
  {
    id: 'empty-list-identity',
    title: 'Идентичность пустых списков',
    code: `a = []
b = []
print(a is b)
print(a == b)`,
    answer: 'False\nTrue',
  },
  {
    id: 'exception-else-finally',
    title: 'Порядок else и finally в try',
    code: `try:
    x = 1
except ValueError:
    print('except')
else:
    print('else')
finally:
    print('finally')`,
    answer: 'else\nfinally',
  },
  {
    id: 'list-comprehension-scope',
    title: 'Область видимости в списковом включении',
    code: `x = 10
squares = [x for x in range(3)]
print(squares)
print(x)`,
    answer: '[0, 1, 2]\n10',
  },
  {
    id: 'or-short-circuit',
    title: 'Оператор or возвращает не только True/False',
    code: `print(0 or 'default')
print('' or None or 'fallback')
print(5 or 10)`,
    answer: 'default\nfallback\n5',
  },
  {
    id: 'sort-key-stability',
    title: 'Устойчивость сортировки',
    code: `data = [('b', 2), ('a', 2), ('c', 1)]
data.sort(key=lambda x: x[1])
print(data)`,
    answer: "[('c', 1), ('b', 2), ('a', 2)]",
  },
  {
    id: 'string-format-index',
    title: 'Форматирование строк с повтором индекса',
    code: `print('{0} {1} {0}'.format('a', 'b'))`,
    answer: 'a b a',
  },
  {
    id: 'nested-function-nonlocal',
    title: 'nonlocal во вложенной функции',
    code: `def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        return count
    print(inner())
    print(inner())

outer()`,
    answer: '1\n2',
  },
  {
    id: 'set-deduplication-order',
    title: 'Множество и дублирующиеся значения',
    code: `nums = [3, 1, 2, 3, 1, 4]
print(len(set(nums)))
print(sorted(set(nums)))`,
    answer: '4\n[1, 2, 3, 4]',
  },
  {
    id: 'walrus-operator',
    title: 'Оператор моржа :=',
    code: `values = [1, 2, 3, 4, 5]
result = [y := x * 2 for x in values if x > 2]
print(result)
print(y)`,
    answer: '[6, 8, 10]\n10',
  },
]
