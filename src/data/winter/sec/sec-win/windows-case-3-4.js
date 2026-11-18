// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_3.4 - Автозапуск и переменные среды",
 "intro": null,
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Для выполнения данного кейса необходимо скачать [OVA-образ](https://storage.ptsecurity.com/seafhttp/f/cc138432c0754faab4d5/?op=view) виртуальной машины, заготовленной Positive Technologies. У данной виртуальной машины должен быть 1 сетевой адаптер VirtualBox в режиме bridge."
    },
    {
     "t": "p",
     "text": "К виртуальной машине можно подключиться с помощью графического интерфейса VirtualBox со следующими учётными данными:"
    },
    {
     "t": "p",
     "text": "**Windows VM:**"
    },
    {
     "t": "ul",
     "items": [
      "Login - **admin**\n— Password - **admin**",
      "Login - **student**\n— Password - **student**"
     ]
    },
    {
     "t": "p",
     "text": "**Цель практики:** Научиться управлять переменным окружением и автозапуском"
    },
    {
     "t": "h3",
     "text": "Автозапуск и управление переменными окружения"
    },
    {
     "t": "p",
     "text": "Создадим **auth.bat** на рабочем столе. В нем напишем:"
    },
    {
     "t": "code",
     "text": "@echo off\nif %1==1 set LOGIN=user1&set PASSWORD=pass123\nif %1==2 set LOGIN=ivan&set PASSWORD=qwerty\necho %LOGIN% %PASSWORD%"
    },
    {
     "t": "p",
     "text": "Зайдем в **System Properties**. Нажмём **Win+R** и введём: `sysdm.cpl`"
    },
    {
     "t": "p",
     "text": "переходим в **Advanced** и нажимаем **Environment Variables...**"
    },
    {
     "t": "p",
     "text": "В **User variables for admin** нажимаем **New...**"
    },
    {
     "t": "p",
     "text": "Копируем полный путь **auth.bat** (правой кнопкой по файлу - **copy as path**)"
    },
    {
     "t": "p",
     "text": "Пишем в **name** - `auth`, **value** - скопированный путь до файла"
    },
    {
     "t": "p",
     "text": "после добавления не забываем нажать **OK**"
    },
    {
     "t": "p",
     "text": "проверим в **cmd** введя: `%auth% 1`"
    },
    {
     "t": "note",
     "text": "Переменная окружения позволяет вызывать скрипты по короткому имени из любого места не задавая полного пути."
    },
    {
     "t": "p",
     "text": "нажимаем **Win+R** и для открытия папки с автозапуском вводим: `shell:startup`"
    },
    {
     "t": "p",
     "text": "Загрузим файл по ссылке в папку [auth_manager.bat](https://storage.ptsecurity.com/seafhttp/f/f47c732f52ff4b308ebb/?op=view)"
    },
    {
     "t": "p",
     "text": "Далее проверим что скрипт запускается при каждом включении системы. Для этого перезайдём в аккаунт или перезапустим систему"
    },
    {
     "t": "p",
     "text": "При старте нас будет ожидать окно для работы с **auth.bat**"
    }
   ]
  },
  {
   "id": "s2",
   "title": "Вопрос",
   "blocks": [
    {
     "t": "p",
     "text": "После выполнения обеих частей практики запустите файл[Checker_Guide_case_Startup.exe](https://storage.ptsecurity.com/seafhttp/f/bccd5c6f30e843799393/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
    }
   ]
  }
 ]
}

export const task = {
 "kind": "quiz",
 "intro": "Ответь на вопросы практики так, как получилось у тебя на стенде: значения, команды и короткое пояснение, как к ним пришёл. Разбор в тексте главы открывай после того, как попробуешь сам. Проверяющий посмотрит ответы и даст обратную связь.",
 "questions": [
  {
   "id": "q1",
   "topic": "Вопрос",
   "text": "После выполнения обеих частей практики запустите файл[Checker_Guide_case_Startup.exe](https://storage.ptsecurity.com/seafhttp/f/bccd5c6f30e843799393/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
