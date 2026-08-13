import{j as s}from"./index-C36_DhLL.js";import{b as a,T as e,a as i,D as r}from"./TheoryTable-DNWzV45k.js";function l(){return s.jsxs("div",{className:"theory-container",children:[s.jsx("section",{className:"theory-section",children:s.jsx("h1",{className:"theory-title",children:"Тестирование, комментарии и документация · SQL часть 2"})}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Типы тестов"}),s.jsx(a,{headers:["Тип","Что тестирует","Скорость","Пример"],rows:[["Unit","Одна функция","Быстро","def test_add()"],["Integration","Несколько компонентов","Медленнее","Фронтенд + API"],["E2E","Весь поток пользователя","Очень медленно","Открыть браузер, кликнуть"]]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Паттерн AAA"}),s.jsx("p",{className:"theory-intro",children:"Arrange → Act → Assert. Структура каждого теста:"}),s.jsx(e,{code:`def test_user_creation():
    # Arrange (подготовка)
    user_data = {"name": "Иван", "age": 17}

    # Act (выполнение)
    user = User(**user_data)

    # Assert (проверка)
    assert user.name == "Иван"
    assert user.age == 17`,language:"python"})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"TDD (Test-Driven Development)"}),s.jsx("p",{className:"theory-intro",children:"Красный → Зелёный → Рефакторинг"}),s.jsxs("ol",{style:{paddingLeft:"20px",color:"var(--text-secondary)",fontSize:"13px"},children:[s.jsx("li",{children:"Напиши тест (сейчас fails) 🔴"}),s.jsx("li",{children:"Напиши код чтобы тест passed ✅"}),s.jsx("li",{children:"Рефакторь код (тесты всё ещё работают)"}),s.jsx("li",{children:"Повтори"})]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Документация"}),s.jsxs("div",{className:"theory-subsection",children:[s.jsx("h3",{className:"theory-heading-3",children:"README"}),s.jsx("p",{className:"theory-intro",children:"Лицо проекта. Должно быть понятно за 30 секунд."}),s.jsxs("ul",{className:"theory-list",children:[s.jsx("li",{className:"theory-list-item",children:"Что это"}),s.jsx("li",{className:"theory-list-item",children:"Как установить"}),s.jsx("li",{className:"theory-list-item",children:"Как использовать"}),s.jsx("li",{className:"theory-list-item",children:"Примеры"})]})]}),s.jsxs("div",{className:"theory-subsection",children:[s.jsx("h3",{className:"theory-heading-3",children:"Docstrings (Python)"}),s.jsx(e,{code:`def calculate_average(numbers):
    """
    Вычисляет среднее арифметическое.

    Args:
        numbers (list): Список чисел

    Returns:
        float: Среднее значение

    Raises:
        ValueError: Если список пуст
    """
    if not numbers:
        raise ValueError("Список не может быть пустым")
    return sum(numbers) / len(numbers)`,language:"python"})]}),s.jsxs("div",{className:"theory-subsection",children:[s.jsx("h3",{className:"theory-heading-3",children:"JSDoc (JavaScript)"}),s.jsx(e,{code:`/**
 * Сортирует массив
 * @param {number[]} arr - Массив чисел
 * @returns {number[]} Отсортированный массив
 * @throws {Error} Если arr не массив
 */
function sortArray(arr) {
    return arr.sort((a, b) => a - b)
}`,language:"javascript"})]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Комментарии"}),s.jsxs(i,{title:"Плохо",children:[s.jsx("p",{children:"// Увеличиваем i на 1"}),s.jsx("p",{children:"i++"})]}),s.jsxs(i,{title:"Хорошо",children:[s.jsx("p",{children:"// Пропускаем элементы до первого позитивного отзыва"}),s.jsx("p",{children:"while (reviews[i].rating < 4) i++"})]}),s.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правило: комментируй ЧТО и ПОЧЕМУ, а не ЧТО делает код (это очевидно из кода)."})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Хорошие привычки"}),s.jsxs("ul",{className:"theory-list",children:[s.jsx("li",{className:"theory-list-item",children:"✅ Пиши код для людей, компилятор уже поймёт"}),s.jsx("li",{className:"theory-list-item",children:"✅ Тесты это документация (показывают как использовать)"}),s.jsx("li",{className:"theory-list-item",children:"✅ Код должен быть понятен без комментариев"}),s.jsx("li",{className:"theory-list-item",children:"❌ Не комментируй очевидное"}),s.jsx("li",{className:"theory-list-item",children:"❌ Не оставляй старый код в комментариях (это Git!)"})]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"📊 SQL — часть 2: агрегатные функции"}),s.jsxs("p",{className:"theory-intro",children:["Агрегатные функции считают что-то по целой группе строк и возвращают одно число. Используем ту же таблицу ",s.jsx("strong",{children:"users"})," из части 1."]}),s.jsx(r,{name:"users",columns:["id","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"],["5","Дина","28","Казань"]]}),s.jsx(a,{headers:["Функция","Что делает","Пример","Результат"],rows:[["COUNT(*)","Считает строки","SELECT COUNT(*) FROM users","5"],["AVG(age)","Среднее значение","SELECT AVG(age) FROM users","29"],["MAX(age)","Максимум","SELECT MAX(age) FROM users","42"],["MIN(age)","Минимум","SELECT MIN(age) FROM users","19"],["SUM(age)","Сумма","SELECT SUM(age) FROM users","145"]]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"GROUP BY — группировка"}),s.jsx("p",{className:"theory-intro",children:"GROUP BY собирает строки в группы по одинаковому значению, и агрегатная функция считается для каждой группы отдельно."}),s.jsx(e,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city;`}),s.jsx("p",{className:"theory-text",children:"Строки сгруппировались по городу, и для каждого посчиталось количество:"}),s.jsx(r,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"],["Сочи","1"]],highlightCols:[1],caption:"Анна+Вера → Москва (2), Борис+Дина → Казань (2), Глеб → Сочи (1)"})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"HAVING — фильтр групп"}),s.jsxs("p",{className:"theory-intro",children:["HAVING фильтрует уже сгруппированные данные. Запомни разницу: ",s.jsx("strong",{children:"WHERE"})," фильтрует строки ДО группировки, ",s.jsx("strong",{children:"HAVING"})," — группы ПОСЛЕ."]}),s.jsx(e,{language:"sql",code:`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city
HAVING COUNT(*) > 1;`}),s.jsx("p",{className:"theory-text",children:"Остались только города, где больше одного пользователя:"}),s.jsx(r,{name:"результат",columns:["city","count"],rows:[["Москва","2"],["Казань","2"]],highlightRows:[0,1],caption:"Сочи отброшен — там только 1 пользователь"})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"INSERT — добавление данных"}),s.jsx(e,{language:"sql",code:`INSERT INTO users (id, name, age, city)
VALUES (6, 'Егор', 35, 'Москва');`}),s.jsx("p",{className:"theory-text",children:"В таблице появилась новая строка:"}),s.jsx(r,{name:"users",columns:["id","name","age","city"],rows:[["...","...","...","..."],["5","Дина","28","Казань"],["6","Егор","35","Москва"]],highlightRows:[2],caption:"Новая строка добавлена в конец таблицы"})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"UPDATE и DELETE"}),s.jsx("p",{className:"theory-intro",children:"UPDATE меняет существующие строки, DELETE удаляет их. Условие WHERE определяет, какие именно строки затронуты."}),s.jsx(e,{language:"sql",code:`-- Изменить город пользователя с id=1
UPDATE users SET city = 'Сочи' WHERE id = 1;

-- Удалить пользователя с id=6
DELETE FROM users WHERE id = 6;`}),s.jsxs(i,{title:"⚠️ Главное правило безопасности",children:[s.jsxs("p",{children:["ВСЕГДА пиши WHERE в UPDATE и DELETE! Без условия команда изменит или удалит ",s.jsx("strong",{children:"ВСЕ"})," строки таблицы."]}),s.jsx("p",{style:{marginTop:"8px",color:"#ff5f5f"},children:"DELETE FROM users; — удалит вообще всех пользователей!"})]})]}),s.jsx("section",{className:"theory-section theory-section--closing",children:s.jsx("p",{className:"theory-closing-text",children:"Качество > количество кода. А GROUP BY и агрегаты превращают тысячи строк в осмысленные цифры! 🎯"})})]})}export{l as default};
