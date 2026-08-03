import{j as e}from"./index-wPonemfz.js";import{M as j,L as m}from"./MultiPartVideo-Bs_cVylG.js";import"./VideoPlayer-CmcoOxAU.js";const x=({href:s,title:c,desc:r,accent:n})=>e.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",style:{display:"block",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(16px, 3vw, 24px)",textDecoration:"none",transition:"border-color 0.15s, transform 0.15s",marginBottom:16},onMouseEnter:t=>{t.currentTarget.style.borderColor=n,t.currentTarget.style.transform="translateY(-2px)"},onMouseLeave:t=>{t.currentTarget.style.borderColor="var(--border-color)",t.currentTarget.style.transform="translateY(0)"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12},children:[e.jsxs("div",{children:[e.jsx("div",{style:{color:n,fontWeight:700,fontSize:17,marginBottom:6},children:c}),e.jsx("div",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.6},children:r})]}),e.jsx("span",{style:{color:n,fontSize:20,flexShrink:0},children:"→"})]})}),i=({code:s})=>{const c=s.split(`
`);return e.jsxs("div",{className:"theory-code-block",children:[e.jsx("div",{className:"theory-code-label",children:"python"}),e.jsx("pre",{className:"theory-code",children:e.jsx("code",{children:c.map((r,n)=>{const t=r.indexOf("#");if(t===-1)return e.jsxs("span",{children:[r,n<c.length-1?`
`:""]},n);const d=r.slice(0,t),h=(d.match(/'/g)||[]).length,p=(d.match(/"/g)||[]).length;return h%2!==0||p%2!==0?e.jsxs("span",{children:[r,n<c.length-1?`
`:""]},n):e.jsxs("span",{children:[e.jsx("span",{style:{color:"var(--text-primary)"},children:d}),e.jsx("span",{style:{color:"#6b7280"},children:r.slice(t)}),n<c.length-1?`
`:""]},n)})})})]})};function l({n:s,title:c,href:r,children:n}){return e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(16px, 3vw, 24px)",marginBottom:24},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:12,flexWrap:"wrap"},children:[e.jsx("span",{style:{width:28,height:28,borderRadius:"50%",background:"rgba(32,190,255,0.15)",border:"1px solid var(--accent-lime)",color:"var(--accent-lime)",fontWeight:700,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},children:s}),e.jsx("h3",{style:{color:"var(--text-primary)",fontSize:"clamp(16px, 2.6vw, 19px)",fontWeight:700,margin:0},children:c}),e.jsx("a",{href:r,target:"_blank",rel:"noopener noreferrer",style:{marginLeft:"auto",color:"#60a5fa",fontSize:13,textDecoration:"none",flexShrink:0},children:"Открыть на CodeRun →"})]}),n]})}const o=({children:s})=>e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",margin:"14px 0 8px"},children:s});function a({children:s}){return e.jsxs("div",{style:{marginTop:18,paddingTop:16,borderTop:"1px dashed var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:10},children:[e.jsx("span",{style:{fontSize:16},children:"🙋"}),e.jsx("span",{style:{color:"#818cf8",fontWeight:700,fontSize:13.5},children:"Решение с занятия"})]}),s]})}function g(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Нарешиваем LeetCode"}),e.jsx("p",{className:"theory-subtitle",children:"Все треки"}),e.jsx("p",{className:"theory-date",children:"3 июля 2026"}),e.jsx("p",{children:"Сегодня практикуем алгоритмическую секцию технических собеседований — ту самую, которую спрашивают в БигТехе. Будем разбирать классические задачи вместе на созвоне в 20:00."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Видео-лекция: разбор задач (4 части)"}),e.jsx(j,{parts:m})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Что нужно сделать перед занятием"}),e.jsx("p",{className:"theory-text",style:{marginBottom:20},children:"Заведи аккаунты на двух платформах — они понадобятся нам сегодня и в дальнейшем для тренировки алгоритмических задач:"}),e.jsx(x,{href:"https://leetcode.com",title:"LeetCode",desc:"Главная международная площадка с задачами уровня технических собеседований в BigTech. Зарегистрируйся и будь готов(а) решать вместе с нами.",accent:"var(--accent-lime)"}),e.jsx(x,{href:"https://coderun.yandex.ru/selections/algorithm-training-september-2025",title:"Yandex CodeRun — Алгоритмический тренинг",desc:"Платформа Яндекса для тренировки алгоритмов. Тоже потребуется зарегистрироваться заранее.",accent:"#60a5fa"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Разбор задач"}),e.jsx("p",{className:"theory-text",style:{marginBottom:20},children:"Ниже — 4 задачи, которые разбираем на сегодняшнем занятии, с условием и оптимальным решением на Python. Комментарии в коде объясняют каждый шаг."}),e.jsxs(l,{n:1,title:"Камни и украшения",href:"https://coderun.yandex.ru/selections/yandex-interview/problems/rocks-and-jewels",children:[e.jsx("p",{className:"theory-text",children:"Даны две строки строчных латинских символов — J и S. Символы, входящие в строку J — «драгоценности», входящие в строку S — «камни». Нужно определить, какое количество символов из S одновременно являются «драгоценностями». Проще говоря, нужно проверить, сколько символов из S входит в J."}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат ввода:"})," на двух первых строках — строка J и строка S (0 ≤ |J|, |S| ≤ 100)."]}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат вывода:"})," единственное число — количество камней, являющихся драгоценностями."]}),e.jsx(o,{children:"Идея решения"}),e.jsxs("p",{className:"theory-text",children:["В лоб можно для каждого символа S перебирать всю строку J — это O(|S| × |J|). Но проверку «символ входит в J» можно сделать за O(1), если один раз сложить все символы J в ",e.jsx("strong",{children:"множество (set)"}),". Тогда весь алгоритм — O(|J| + |S|): одно линейное построение множества и один линейный проход по S."]}),e.jsx(o,{children:"Решение"}),e.jsx(i,{code:`def num_jewels_in_stones(J: str, S: str) -> int:
    # Складываем символы J в set — проверка "x in jewels" работает за O(1)
    jewels = set(J)

    # Считаем, сколько символов S встречаются в множестве jewels
    # sum() по генератору True/False: True считается как 1
    return sum(1 for stone in S if stone in jewels)


if __name__ == "__main__":
    J = input()
    S = input()
    print(num_jewels_in_stones(J, S))`}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Сложность:"})," время O(|J| + |S|), память O(|J|) — под множество уникальных символов J."]}),e.jsxs(a,{children:[e.jsxs("p",{className:"theory-text",children:["Тоже рабочее решение, но с одним отличием: проверка ",e.jsx("code",{children:"el in j"})," здесь идёт по ",e.jsx("strong",{children:"строке"})," j, а не по множеству. Поиск символа в строке в худшем случае — O(|j|), поэтому итоговая сложность у этого варианта O(|S| × |J|) — медленнее, чем решение с set выше, но при |J|, |S| ≤ 100 (как в условии задачи) разница на практике незаметна."]}),e.jsx(i,{code:`import sys


def main():
    j = input()
    s = input()

    count = 0
    for el in s:
        # Проверяем, входит ли текущий символ строки s в строку j.
        # "in" для строки — это линейный поиск (сравнение el с каждым символом j),
        # поэтому одна проверка стоит O(|j|), а не O(1), как было бы с set.
        if el in j:
            count += 1  # символ оказался и "драгоценностью", и "камнем" — считаем его

    print(count)


if __name__ == '__main__':
    main()`})]})]}),e.jsxs(l,{n:2,title:"Анаграммы",href:"https://coderun.yandex.ru/selections/yandex-interview/problems/anagrams",children:[e.jsx("p",{className:"theory-text",children:"Даны две строки, состоящие из строчных латинских букв. Требуется определить, являются ли эти строки анаграммами, то есть отличаются ли они только порядком следования символов."}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат ввода:"})," две строки строчных латинских символов, каждая не длиннее 100 000 символов, разделены переводом строки."]}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат вывода:"})," 1, если строки — анаграммы, иначе 0."]}),e.jsx(o,{children:"Идея решения"}),e.jsxs("p",{className:"theory-text",children:["Анаграммы — это строки с одинаковым ",e.jsx("strong",{children:"набором и количеством"})," каждого символа. Если длины строк разные — сразу «нет». Иначе можно подсчитать частоту каждого символа в обеих строках (через ",e.jsx("code",{children:"Counter"}),") и сравнить получившиеся счётчики. Альтернатива — отсортировать обе строки и сравнить (O(n log n)), но подсчёт частот работает быстрее — за O(n)."]}),e.jsx(o,{children:"Решение"}),e.jsx(i,{code:`from collections import Counter

def is_anagram(s1: str, s2: str) -> int:
    # Разной длины строки анаграммами быть не могут — отсекаем сразу
    if len(s1) != len(s2):
        return 0

    # Counter считает частоту каждого символа: {'a': 2, 'b': 1, ...}
    # Строки — анаграммы тогда и только тогда, когда счётчики совпадают
    return 1 if Counter(s1) == Counter(s2) else 0


if __name__ == "__main__":
    s1 = input()
    s2 = input()
    print(is_anagram(s1, s2))`}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Сложность:"})," время O(n), память O(1) — алфавит фиксирован (26 строчных латинских букв), поэтому размер счётчика ограничен константой."]}),e.jsxs(a,{children:[e.jsxs("p",{className:"theory-text",children:["Альтернативный, тоже вполне корректный подход: воспользоваться тем, что у анаграмм одинаковый набор символов, и просто ",e.jsx("strong",{children:"отсортировать"})," обе строки. Если после сортировки строки совпали посимвольно — значит, изначально в них были одни и те же буквы в одном и том же количестве, просто в разном порядке."]}),e.jsx(i,{code:`import sys


def main():
    s1 = input()
    s2 = input()

    # sorted() возвращает список символов строки, отсортированный по алфавиту.
    # У анаграмм после сортировки получаются одинаковые списки символов.
    s1, s2 = sorted(s1), sorted(s2)

    # Сравниваем отсортированные версии: совпали — анаграммы (1), не совпали — нет (0)
    print(1) if s1 == s2 else print(0)


if __name__ == '__main__':
    main()`}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Сложность:"})," сортировка работает за O(n log n), поэтому этот вариант чуть медленнее решения через ",e.jsx("code",{children:"Counter"})," (O(n)), но зато очень короткий и наглядный — хороший вариант, если нужно быстро написать рабочий код на собеседовании."]})]})]}),e.jsxs(l,{n:3,title:"Последовательно идущие единицы",href:"https://coderun.yandex.ru/selections/yandex-interview/problems/consecutive-ones",children:[e.jsx("p",{className:"theory-text",children:"Дана последовательность, состоящая из цифр 0 и 1. Требуется определить длину наибольшей непрерывной подпоследовательности, состоящей только из единиц."}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат ввода:"})," в первой строке n — длина последовательности (1 ≤ n ≤ 10000), далее n строк с одним числом на каждой."]}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат вывода:"})," одно целое число — длина наибольшей непрерывной подпоследовательности единиц."]}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Требование:"})," алгоритм O(n), не более одного прохода по последовательности."]}),e.jsx(o,{children:"Идея решения"}),e.jsxs("p",{className:"theory-text",children:["Классический пример метода ",e.jsx("strong",{children:"«скользящее окно» / счётчик текущей серии"}),". Идём по числам один раз: пока встречаем единицы — наращиваем счётчик текущей серии подряд идущих единиц; как только встретили ноль — сравниваем текущую серию с максимумом и обнуляем счётчик. Так за один проход находим ответ, не храня всю последовательность в памяти."]}),e.jsx(o,{children:"Решение"}),e.jsx(i,{code:`def max_consecutive_ones(n: int, read_next) -> int:
    best = 0     # лучший результат за всё время
    current = 0  # длина текущей серии подряд идущих единиц

    for _ in range(n):
        x = read_next()
        if x == 1:
            current += 1           # серия продолжается — увеличиваем счётчик
            best = max(best, current)  # обновляем максимум "на лету"
        else:
            current = 0            # серия оборвалась нулём — сбрасываем счётчик

    return best


if __name__ == "__main__":
    n = int(input())
    print(max_consecutive_ones(n, lambda: int(input())))`}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Сложность:"})," время O(n) — ровно один проход, память O(1) — храним только два числа (best и current), сам массив целиком в памяти не нужен."]}),e.jsxs(a,{children:[e.jsxs("p",{className:"theory-text",children:["Та же самая идея «счётчика текущей серии», только без отдельной функции чтения — ",e.jsx("code",{children:"input()"}),"вызывается прямо внутри цикла. Логика полностью эквивалентна разобранному выше решению."]}),e.jsx(i,{code:`import sys


def main():
    n = int(input())
    cur_len = 0   # длина текущей серии подряд идущих единиц
    max_len = 0   # лучший результат за всё время

    for _ in range(n):
        if int(input()) == 1:
            cur_len += 1                    # единица — серия продолжается
            max_len = max(max_len, cur_len) # сразу же проверяем, не побит ли рекорд
        else:
            cur_len = 0                     # встретили ноль — серия обрывается, сбрасываем счётчик

    print(max_len)

if __name__ == '__main__':
    main()`}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Сложность:"})," те же O(n) по времени и O(1) по памяти — вариант отличается только оформлением, а не алгоритмом."]})]})]}),e.jsxs(l,{n:4,title:"Генерация скобочных последовательностей",href:"https://coderun.yandex.ru/selections/yandex-interview/problems/generating-bracket-sequences",children:[e.jsx("p",{className:"theory-text",children:"Дано целое число n. Требуется вывести все правильные скобочные последовательности длины 2n в лексикографическом порядке. Используются только круглые скобки."}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат ввода:"})," целое число n (0 ≤ n ≤ 11)."]}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Формат вывода:"})," все сгенерированные правильные скобочные последовательности, упорядоченные лексикографически."]}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Требование:"})," O(k) по времени (k — число последовательностей в ответе), O(n) дополнительной памяти."]}),e.jsx(o,{children:"Идея решения"}),e.jsxs("p",{className:"theory-text",children:["Строим последовательность посимвольно через ",e.jsx("strong",{children:"рекурсивный перебор (backtracking)"})," и добавляем скобку, только если это не нарушает правильность:"]}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{children:"открывающую «(» можно поставить, пока их использовано меньше n;"}),e.jsx("li",{children:"закрывающую «)» можно поставить, только пока открывающих скобок поставлено больше, чем закрывающих (иначе получим «)(» — невалидно)."})]}),e.jsx("p",{className:"theory-text",children:"Такой перебор, если ставить сначала «(», а потом «)», сам по себе генерирует ответы в лексикографическом порядке — сортировать отдельно не нужно. Память O(n) уходит на глубину рекурсии и буфер строящейся строки (длиной 2n), сама выдача результатов в O(k) не учитывается."}),e.jsx(o,{children:"Решение"}),e.jsx(i,{code:`def generate_parenthesis(n: int) -> list[str]:
    result = []
    buf = []  # буфер текущей строящейся последовательности

    def backtrack(open_count: int, close_count: int):
        # База рекурсии: длина последовательности достигла 2n — записываем ответ
        if len(buf) == 2 * n:
            result.append("".join(buf))
            return

        # Ставим "(" — если ещё не использовали все n открывающих скобок
        if open_count < n:
            buf.append("(")
            backtrack(open_count + 1, close_count)
            buf.pop()  # откатываем выбор (backtracking)

        # Ставим ")" — только если открывающих скобок больше, чем закрывающих
        # (иначе последовательность станет некорректной)
        if close_count < open_count:
            buf.append(")")
            backtrack(open_count, close_count + 1)
            buf.pop()

    backtrack(0, 0)
    return result


if __name__ == "__main__":
    n = int(input())
    for seq in generate_parenthesis(n):
        print(seq)`}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Сложность:"})," время O(k), где k — количество правильных скобочных последовательностей (это число Каталана C(n)); дополнительная память (не считая самого вывода) — O(n) на глубину рекурсии."]}),e.jsxs(a,{children:[e.jsxs("p",{className:"theory-text",children:["Тот же backtracking, но записанный иначе: вместо буфера-списка с ",e.jsx("code",{children:"append"}),"/",e.jsx("code",{children:"pop"}),"строка ",e.jsx("code",{children:"current"})," просто передаётся дальше по рекурсии новой копией (",e.jsx("code",{children:"current + '('"}),"), а печать готовой последовательности происходит прямо внутри рекурсивной функции, а не после возврата в ",e.jsx("code",{children:"main"}),"."]}),e.jsx(i,{code:`import sys


def generate(open_count, close_count, current, n):
    # База рекурсии: длина последовательности достигла 2n — она готова, печатаем
    if len(current) == 2 * n:
        print(current)
        return

    # Открывающую скобку можно добавить, пока не исчерпан лимит n
    if open_count < n:
        generate(open_count + 1, close_count, current + '(', n)

    # Закрывающую скобку можно добавить, только если открывающих скобок
    # уже поставлено больше, чем закрывающих — иначе последовательность станет некорректной
    if close_count < open_count:
        generate(open_count, close_count + 1, current + ')', n)


def main():
    n = int(input())
    generate(0, 0, '', n)


if __name__ == '__main__':
    main()`}),e.jsxs("p",{className:"theory-text",children:[e.jsx("strong",{children:"Нюанс:"})," здесь ",e.jsx("code",{children:"current + '('"})," каждый раз создаёт ",e.jsx("strong",{children:"новую"}),"строку (строки в Python неизменяемы), в то время как вариант с буфером-списком и",e.jsx("code",{children:"append"}),"/",e.jsx("code",{children:"pop"})," выше переиспользует одну и ту же структуру в памяти. На практике при n ≤ 11 (как в условии) разница в производительности незначительна, но на больших n подход с буфером и «откатом» (pop) экономичнее по памяти и по числу копирований."]})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Домашнее задание"}),e.jsxs("p",{className:"theory-text",children:["Во вкладке ",e.jsx("strong",{children:"«Домашние задания»"})," дня 3 июля лежат ещё 2 задачи с CodeRun — реши их самостоятельно, опираясь на подход из сегодняшнего разбора."]})]})]})}export{g as default};
