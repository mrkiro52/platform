// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_3.6 - NFS",
 "intro": null,
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Для выполнения данного кейса необходимо скачать [OVA-образ](https://storage.ptsecurity.com/seafhttp/f/cc138432c0754faab4d5/?op=view) виртуальной машины, заготовленной Positive Technologies. У данной виртуальной машины должен быть 1 сетевой адаптер VirtualBox в режиме bridge. Также понадобится **Debian** как сервер **nfs**"
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
     "text": "**Цель практики:** Научиться работать с NFS"
    },
    {
     "t": "p",
     "text": "**NFS клиент windows**"
    },
    {
     "t": "p",
     "text": "Используем виртуальную машину Windows"
    },
    {
     "t": "p",
     "text": "Запускаем powershell от имени администратора"
    },
    {
     "t": "img",
     "src": "/winter/sec/77d298e32ae2.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Для установки требуются 2 компонента:"
    },
    {
     "t": "ul",
     "items": [
      "**ServicesForNFS-ClientOnly** - основной клиент NFS",
      "**ClientForNFS-Infrastructure** - управление NFS"
     ]
    },
    {
     "t": "p",
     "text": "Для их установки воспользуемся командой: `Enable-WindowsOptionalFeature -FeatureName ServicesForNFS-ClientOnly, ClientForNFS-Infrastructure -Online -NoRestart`"
    },
    {
     "t": "p",
     "text": "После выполним перезагрузку компьютера"
    },
    {
     "t": "img",
     "src": "/winter/sec/b5098c15ef2b.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Скачиваем на linux **nfs**. Команда: `sudo apt install nfs-kernel-server nfs-common -y`"
    },
    {
     "t": "img",
     "src": "/winter/sec/089a704e0bde.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Cоздадим **NFS** папку и настроим владельца и права на папку"
    },
    {
     "t": "ul",
     "items": [
      "Создание: `mkdir -p /srv/ShareWin`",
      "Назначение пользователя **nobody **владельцем папки: `sudo chown nobody:nogroup /srv/ShareWin`",
      "Даём всем полные права на папку: `sudo chmod 777 /srv/ShareWin`",
      "проверим владельца и права: `ls -l /srv`"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/4ec5dc4236b7.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Настраиваем сам nfs. Откроим файл **/etc/exports**. Команда: `sudo nano /etc/exports` и добавим в него одну строку: `/srv/ShareWin *(rw,sync,subtree_check,fsid=0)` после сохраним файл"
    },
    {
     "t": "img",
     "src": "/winter/sec/2c7fc192dcea.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "note",
     "text": "**/srv/ShareWin** - указываем сетевую папку\n* Разрешаем доступ всем в сети(обычно указывается ip-адрес)\n**(rw,sync,no_subtree_check,no_root_squash,fsid=0)** - параметры:\n**rw** - клиенты могут читать и писать в папку\n**sync** - Запись на диск происходит **синхронно** (сервер подтверждает операцию только после реальной записи)\n**subtree_check** - заставляет сервер NFS проверять, что каждый запрашиваемый файл физически находится внутри экспортируемой папки\n**fsid=0** - помечаем главную точку монтирования ShareWin"
    },
    {
     "t": "p",
     "text": "Применим настройки:"
    },
    {
     "t": "code",
     "text": "sudo exportfs -a\nsudo systemctl restart nfs-server"
    },
    {
     "t": "img",
     "src": "/winter/sec/e89b2ccfd964.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "На Windows машине переходим в мой компьютер, нажимаем **...** и выбираем **Map network drive**"
    },
    {
     "t": "img",
     "src": "/winter/sec/509ceec615c3.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Вписываем адрес сетевой папки linux машины"
    },
    {
     "t": "img",
     "src": "/winter/sec/b3a68a94c47f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь мы можем зайти в сетевую папку и создать файл test **с расширением** txt"
    },
    {
     "t": "note",
     "text": "На скриншоте в проводнике включено расширение файлов. Для включения данной функции вы можете нажать в проводнике \"View\" - \"Show\" - \"File name extensions\""
    },
    {
     "t": "img",
     "src": "/winter/sec/2dbc5b724221.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "На linux мы увидим созданный файл **ls**"
    },
    {
     "t": "img",
     "src": "/winter/sec/d22ef022551d.webp",
     "alt": "Иллюстрация к материалу"
    }
   ]
  },
  {
   "id": "s2",
   "title": "Вопрос",
   "blocks": [
    {
     "t": "p",
     "text": "После выполнения обеих частей практики запустите файл[Checker_Guide_case_NFS.exe](https://storage.ptsecurity.com/seafhttp/f/fc042fd98e76487897f9/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
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
   "text": "После выполнения обеих частей практики запустите файл[Checker_Guide_case_NFS.exe](https://storage.ptsecurity.com/seafhttp/f/fc042fd98e76487897f9/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
