// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_3.13 - GPO",
 "intro": "Адаптация для изучения защиты",
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Эта практика - прямое продолжение практики по развёртыванию **DC**. Мы используем те же две виртуальные машины, ту же изолированную сеть и те же учётные данные, поэтому отдельный **OVA-образ** скачивать не нужно - продолжаем работу на уже поднятом домене **lab.local**"
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
     "text": "**Windows Server VM:**"
    },
    {
     "t": "ul",
     "items": [
      "Login - **admin**\n— Password - **Admin123**"
     ]
    },
    {
     "t": "p",
     "text": "Дополнительный файл (скачиваем с диска курса, как скачивали **OVA**):"
    },
    {
     "t": "ul",
     "items": [
      "[corp_wallpaper.jpg](https://storage.ptsecurity.com/seafhttp/f/19ce9c101d934445bf87/?op=download) - корпоративные обои для стандартизации рабочего стола"
     ]
    },
    {
     "t": "p",
     "text": "**Цель практики**: научиться централизованно управлять доменом через **Group Policy Object** (**GPO**) - настроить доменную парольную политику, локальные политики безопасности, преференсы и административные шаблоны, привязать **GPO** к организационным единицам (**Organizational Unit**, **OU**), проверить применение через **gpresult** и на простом примере разобрать, почему компрометация контроллера домена через **SYSVOL** означает захват всех машин домена"
    },
    {
     "t": "p",
     "text": "Групповые политики - это механизм, которым домен централизованно навязывает настройки сотням и тысячам машин из одной точки. Вместо того чтобы вручную править реестр и локальные политики на каждом хосте, мы описываем нужное состояние один раз в объекте **GPO**, привязываем его к контейнеру домена, и все машины и пользователи внутри этого контейнера получают настройку автоматически при следующем обновлении политик."
    },
    {
     "t": "p",
     "text": "Работаем на **dc01**. Войдём под **LAB\\Administrator**, откроем **Server Manager**"
    },
    {
     "t": "img",
     "src": "/winter/sec/820593947b5e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В верхнем меню выберем **Tools** -> **Group Policy Management**"
    },
    {
     "t": "img",
     "src": "/winter/sec/a62a951ca579.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В дереве слева раскроем **Forest: lab.local** -> **Domains** -> **lab.local**. Внутри домена уже существуют два объекта, которые **AD DS** создаёт по умолчанию:"
    },
    {
     "t": "ul",
     "items": [
      "**Default Domain Policy** - политика, привязанная к корню домена. Именно здесь живёт доменная парольная политика и политика блокировки учётных записей. Правило: параметры паролей задаются только на этом уровне, привязка парольной политики к **OU** не работает",
      "**Default Domain Controllers Policy** - политика для контейнера **Domain Controllers** , определяющая безопасность самих контроллеров"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/c7add0569de6.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Порядок применения политик подчиняется правилу **LSDOU**: сначала применяется **Local** (локальная политика машины), затем **Site** (политика сайта), затем **Domain** (политики домена), и последними - политики **OU** сверху вниз по иерархии. Кто применился последним, тот и переопределяет остальных при конфликте. Это ключевой момент: политика на уровне **OU** сильнее доменной, если параметры пересекаются."
    },
    {
     "t": "p",
     "text": "Каждый **GPO** делится на две ветки - **Computer Configuration** (применяется к машинам при загрузке и по расписанию) и **User Configuration** (применяется к пользователю при входе). Внутри каждой ветки - три раздела: **Policies** (жёсткие политики), **Preferences** (преференсы - настройки, которые можно менять) и административные шаблоны. Дальше мы поработаем со всеми основными узлами."
    },
    {
     "t": "h3",
     "text": "Организационная единица и перенос объектов"
    },
    {
     "t": "p",
     "text": "Чтобы привязывать политики не ко всему домену, а к конкретной группе машин, нам нужна отдельная **OU**. Создадим две: **LabWorkstations** для клиентских машин и **LabUsers** для учётных записей пользователей. Откроем на **dc01PowerShell** от имени администратора и выполним:"
    },
    {
     "t": "code",
     "text": "New-ADOrganizationalUnit -Name \"LabWorkstations\" -Path \"DC=lab,DC=local\" -ProtectedFromAccidentalDeletion $false\nNew-ADOrganizationalUnit -Name \"LabUsers\" -Path \"DC=lab,DC=local\" -ProtectedFromAccidentalDeletion $false"
    },
    {
     "t": "img",
     "src": "/winter/sec/e37cd1913e41.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь перенесём клиентскую машину **WIN-LAB** в **OU LabWorkstations**, а трёх пользователей - в **OU LabUsers**:"
    },
    {
     "t": "code",
     "text": "Get-ADComputer \"WIN-LAB\" | Move-ADObject -TargetPath \"OU=LabWorkstations,DC=lab,DC=local\"\nGet-ADUser \"ivanov\" | Move-ADObject -TargetPath \"OU=LabUsers,DC=lab,DC=local\"\nGet-ADUser \"petrov\" | Move-ADObject -TargetPath \"OU=LabUsers,DC=lab,DC=local\"\nGet-ADUser \"sidorov\" | Move-ADObject -TargetPath \"OU=LabUsers,DC=lab,DC=local\""
    },
    {
     "t": "img",
     "src": "/winter/sec/75064e0064a2.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Проверим, что объекты действительно легли в новые контейнеры:"
    },
    {
     "t": "code",
     "text": "Get-ADComputer \"WIN-LAB\" | Select-Object Name, DistinguishedName\nGet-ADUser -Filter * -SearchBase \"OU=LabUsers,DC=lab,DC=local\" | Select-Object Name, DistinguishedName"
    },
    {
     "t": "img",
     "src": "/winter/sec/9f514fa74228.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В поле **DistinguishedName** у **WIN-LAB** должно появиться **OU=LabWorkstations**, а у пользователей - **OU=LabUsers**. Если объект остался в старом контейнере **Computers** или **Users**, политики, привязанные к нашим **OU**, до него не дойдут."
    },
    {
     "t": "h3",
     "text": "Доменная парольная политика"
    },
    {
     "t": "p",
     "text": "Начнём с самого базового - требований к паролям для всего домена. Откроем в **Group Policy Management**"
    },
    {
     "t": "img",
     "src": "/winter/sec/712af3abf23a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Узел **lab.local**, правой кнопкой по **Default Domain Policy** -> **Edit**"
    },
    {
     "t": "img",
     "src": "/winter/sec/6e0f78b761ee.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Откроется **Group Policy Management Editor**"
    },
    {
     "t": "img",
     "src": "/winter/sec/5f06d21509ef.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Пройдём в **Computer Configuration** -> **Policies** -> **Windows Settings** -> **Security Settings** -> **Account Policies** -> **Password Policy**"
    },
    {
     "t": "img",
     "src": "/winter/sec/bb1a452351e5.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Зададим значения двойным кликом по каждому параметру:"
    },
    {
     "t": "img",
     "src": "/winter/sec/dd820d05172a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "ul",
     "items": [
      "**Minimum password length** - **12**",
      "**Password must meet complexity requirements** - **Enabled**",
      "**Maximum password age** - **60**",
      "**Enforce password history** - **5**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/3c4d1d268ee6.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Затем перейдём в соседний узел **Account Lockout Policy** и настроим блокировку после серии неудачных попыток входа:"
    },
    {
     "t": "ul",
     "items": [
      "**Account lockout threshold** - **5**",
      "**Account lockout duration** - **15**",
      "**Reset account lockout counter after** - **15**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/7640ac25f212.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Закроем редактор. Изменения доменной политики применяются к контроллеру домена почти сразу, но убедимся в этом явно через модуль **AD**: `Get-ADDefaultDomainPasswordPolicy`"
    },
    {
     "t": "img",
     "src": "/winter/sec/c32fad16601c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе мы видим **MinPasswordLength = 12**, **ComplexityEnabled = True**, **LockoutThreshold = 5**. Это финальное состояние доменной парольной политики."
    },
    {
     "t": "h3",
     "text": "Local Policies: Security Options и User Rights Assignment"
    },
    {
     "t": "p",
     "text": "Дальше настроим локальную безопасность машин через одну общую политику. Вернёмся в **Group Policy Management**, правой кнопкой по **OU LabWorkstations** -> **Create a GPO in this domain, and Link it here**"
    },
    {
     "t": "img",
     "src": "/winter/sec/17cbce300f2c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Назовём новый объект **Lab Baseline Security** и нажмём **OK**"
    },
    {
     "t": "img",
     "src": "/winter/sec/43b2912bdbea.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Затем правой кнопкой по нему -> **Edit**"
    },
    {
     "t": "img",
     "src": "/winter/sec/6e64c88f32fc.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Все настройки этого раздела лежат в **Computer Configuration** -> **Policies** -> **Windows Settings** -> **Security Settings** -> **Local Policies**"
    },
    {
     "t": "p",
     "text": "Внутри - три узла:"
    },
    {
     "t": "ul",
     "items": [
      "**Audit Policy**",
      "**User Rights Assignment**",
      "**Security Options**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/b0ea9d8bc5ed.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Начнём с **Security Options** - это набор из десятков предопределённых параметров безопасности, каждый из которых под капотом меняет конкретный ключ реестра или флаг **SAM**"
    },
    {
     "t": "img",
     "src": "/winter/sec/960d311d2ddf.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Давайте настроим несколько:"
    },
    {
     "t": "ul",
     "items": [
      "**Первое** - потребуем обязательное нажатие **Ctrl+Alt+Del** перед входом. Эта комбинация вызывает доверенный системный экран входа, который невозможно подделать пользовательским приложением, что защищает от поддельных окон ввода пароля. Найдём параметр **Interactive logon: Do not require CTRL+ALT+DEL** и выставим его в **Disabled** - двойное отрицание означает, что нажатие теперь обязательно"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/556a2a0b33cc.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "ul",
     "items": [
      "Второе и третье - отключим встроенные локальные учётные записи **Administrator** и **Guest**. Встроенный локальный администратор с предсказуемым именем и гость без пароля - классические точки входа для атакующего, поэтому на доменных машинах их отключают. Настроим два параметра:\n— **Accounts: Administrator account status** - **Disabled**\n— **Accounts: Guest account status** - **Disabled**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/7dd0af13653c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "ul",
     "items": [
      "Четвёртое - настроим предупреждающий баннер, который система покажет до входа. Это стандарт корпоративной среды: он юридически фиксирует, что доступ разрешён только авторизованным лицам и что ведётся мониторинг. Заполним два параметра:\n— **Interactive logon: Message title for users attempting to log on** - **Positive Technologies Lab - Authorized Access Only**\n— **Interactive logon: Message text for users attempting to log on** - **Authorized personnel only. All activity on this system is monitored and logged**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/2fd227c85c65.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь перейдём в узел **User Rights Assignment**. Здесь назначаются права входа и системные привилегии - кому разрешено или запрещено входить локально, по сети, через службы удалённого рабочего стола, кто может выключать машину и так далее. Настроим одно право для наглядности: запретим локальный вход гостям. Найдём **Deny log on locally**, откроем, нажмём **Add User or Group**, добавим **Guests** и подтвердим"
    },
    {
     "t": "img",
     "src": "/winter/sec/5ca58d1052e8.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "h3",
     "text": "Preferences: Local Users and Groups"
    },
    {
     "t": "p",
     "text": "Раздел **Preferences** отличается от **Policies** тем, что через него настраивается то, что политиками напрямую не покрывается - в том числе членство в локальных группах. Покажем, как через **GPO** добавить доменного пользователя в локальную группу на всех машинах **OU**. В том же редакторе **Lab Baseline Security** пройдём в **Computer Configuration** -> **Preferences** -> **Control Panel Settings** -> **Local Users and Groups**. Правой кнопкой по пустому месту -> **New** -> **Local Group**"
    },
    {
     "t": "img",
     "src": "/winter/sec/afe4baa816ed.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В открывшемся окне:"
    },
    {
     "t": "ul",
     "items": [
      "**Action** - **Update**",
      "**Group name** - **Remote Desktop Users (built-in)**",
      "В блоке **Members** нажмём **Add** , укажем **LAB\\ivanov** , действие **Add to this group**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/089d840ccfa9.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Нажмём **OK**. Теперь на каждой машине из **OU LabWorkstations** доменный пользователь **ivanov** будет автоматически добавлен в локальную группу **Remote Desktop Users**, что даст ему право удалённого входа - и всё это без ручной настройки на самих машинах"
    },
    {
     "t": "img",
     "src": "/winter/sec/0a07a830e18d.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "h3",
     "text": "Стандартизация: обои рабочего стола"
    },
    {
     "t": "p",
     "text": "Обои - параметр пользователя, а не машины, поэтому он лежит в ветке **User Configuration**. Но привязана наша политика к **OU** с машинами, а пользователи живут в другой **OU**. Чтобы пользовательская настройка сработала на этих машинах для любого входящего, включим режим замыкания. В **Computer Configuration** -> **Policies** -> **Administrative Templates** -> **System** -> **Group Policy** найдём **Configure user Group Policy loopback processing mode**"
    },
    {
     "t": "img",
     "src": "/winter/sec/6a9f96fbc958.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Выставим **Enabled** и режим **Merge**. Теперь пользовательская часть нашего **GPO** применяется ко всем, кто входит на машины **OU LabWorkstations**"
    },
    {
     "t": "img",
     "src": "/winter/sec/0575e05a6b55.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "файл **corp_wallpaper.jpg** нужно положить туда, откуда его прочитает любая машина домена - в общий каталог **SYSVOL**, который автоматически реплицируется и доступен на чтение всем аутентифицированным пользователям. Создадим папку и скопируем в неё обои (файл предварительно скачан на **dc01** со страницы курса в **C:\\Users\\Administrator\\Downloads**):"
    },
    {
     "t": "code",
     "text": "New-Item -ItemType Directory -Path \"C:\\Windows\\SYSVOL\\sysvol\\lab.local\\corp\" -Force\nCopy-Item \"C:\\Users\\Administrator\\Downloads\\corp_wallpaper.jpg\" \"C:\\Windows\\SYSVOL\\sysvol\\lab.local\\corp\\corp_wallpaper.jpg\""
    },
    {
     "t": "img",
     "src": "/winter/sec/853ee248de9a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь пропишем путь в политике. В редакторе **Lab Baseline Security** пройдём в **User Configuration** -> **Policies** -> **Administrative Templates** -> **Desktop** -> **Desktop** -> **Desktop Wallpaper**"
    },
    {
     "t": "img",
     "src": "/winter/sec/c7421c249d5c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Выставим **Enabled** и заполним:"
    },
    {
     "t": "ul",
     "items": [
      "**Wallpaper Name** - **\\lab.local\\SYSVOL\\lab.local\\corp\\corp_wallpaper.jpg**",
      "**Wallpaper Style** - **Fill**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/d2269ca413a0.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Путь указываем именно через **UNC**-имя домена, а не через локальный диск **dc01**: клиентская машина обращается к **SYSVOL** по сети, локального пути **C:\\Windows\\SYSVOL** у неё нет."
    },
    {
     "t": "h3",
     "text": "Windows Components: WinRM и Microsoft Defender"
    },
    {
     "t": "p",
     "text": "Узел **Windows Components** в административных шаблонах - это тонкая настройка отдельных компонентов **Windows**: от **Windows Update** до **Microsoft Defender**. Здесь очень наглядно видно, что политикой можно управлять почти любой встроенной подсистемой. Настроим два компонента."
    },
    {
     "t": "p",
     "text": "Сначала включим удалённое управление через **Windows Remote Management** (**WinRM**) сразу на всём домене - это то, что в host-based практике мы делали руками на одной машине, а теперь раздаём централизованно. В **LabWorkstations ->Lab Baseline Security -> Computer Configuration** -> **Policies** -> **Administrative Templates** -> **Windows Components** -> **Windows Remote Management (WinRM)** -> **WinRM Service** откроем **Allow remote server management through WinRM**"
    },
    {
     "t": "img",
     "src": "/winter/sec/91d0f9a49a3f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Выставим **Enabled**, а в полях **IPv4 filter** и **IPv6 filter** укажем * (принимать со всех адресов лабораторной сети)"
    },
    {
     "t": "img",
     "src": "/winter/sec/27a3bc72fc4c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Одной этой настройки мало: служба **WinRM** должна быть запущена, а брандмауэр - пропускать входящие на **порт 5985**. Службу переведём в автозапуск через **Computer Configuration** -> **Policies** -> **Windows Settings** -> **Security Settings** -> **System Services**: найдём **Windows Remote Management (WS-Management)**"
    },
    {
     "t": "img",
     "src": "/winter/sec/4c40cd3f776e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Выставим **Automatic**"
    },
    {
     "t": "img",
     "src": "/winter/sec/a5f3e1749c2e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Правило брандмауэра добавим в **Computer Configuration** -> **Policies** -> **Windows Settings** -> **Security Settings** -> **Windows Defender Firewall with Advanced Security** -> **Inbound Rules** -> **New Rule** -> **Predefined** -> **Windows Remote Management**"
    },
    {
     "t": "img",
     "src": "/winter/sec/673f5f2401f1.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Ставим обе галочки и нажимаем **Next**"
    },
    {
     "t": "img",
     "src": "/winter/sec/67d1a200838f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Allow the connection**, а после **Finish**"
    },
    {
     "t": "img",
     "src": "/winter/sec/0aa94f47c161.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь отключим **Microsoft Defender Antivirus**. Мы делаем это исключительно в учебных целях - чтобы показать, что через **GPO** настраиваются и защитные компоненты системы, и чтобы дальше беспрепятственно продемонстрировать запуск скрипта на машинах домена. В боевой инфраструктуре так не делают никогда."
    },
    {
     "t": "p",
     "text": "Важный момент: на **Windows 11** политика отключения **Defender** игнорируется, пока включена **Tamper Protection** (защита от подделки настроек антивируса). Её нельзя снять через **GPO** - только вручную на самой машине. Поэтому сначала на **WIN-LAB** откроем **Windows Security** -> **Virus & threat protection** -> **Manage settings**"
    },
    {
     "t": "img",
     "src": "/winter/sec/663c5fc89efb.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Выключим переключатель **Tamper Protection**"
    },
    {
     "t": "img",
     "src": "/winter/sec/58736d2c2e71.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "После этого вернёмся в редактор **Lab Baseline Security** на **dc01** и в **Computer Configuration** -> **Policies** -> **Administrative Templates** -> **Windows Components** -> **Microsoft Defender Antivirus** откроем **Turn off Microsoft Defender Antivirus**"
    },
    {
     "t": "img",
     "src": "/winter/sec/8a009dadceb8.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Выставим **Enabled** и нажимаем **ОК**"
    },
    {
     "t": "img",
     "src": "/winter/sec/144c33e26463.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "h3",
     "text": "Применение и диагностика"
    },
    {
     "t": "p",
     "text": "Политики не применяются мгновенно - клиент обновляет их при загрузке и затем по фоновому расписанию (примерно раз в 90 минут). Чтобы не ждать, форсируем обновление вручную. Переключимся на **WIN-LAB**, войдём под **LAB\\Administrator**, откроем **PowerShell** от имени администратора и выполним: `gpupdate /force`"
    },
    {
     "t": "p",
     "text": "Команда перечитает все применимые политики и применит их. Если политика требует перезагрузки или повторного входа (как обои или членство в группах), система об этом сообщит - согласимся"
    },
    {
     "t": "img",
     "src": "/winter/sec/98d62a1250fd.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь проверим, что именно применилось и откуда пришло. Инструмент диагностики - **gpresult**:"
    },
    {
     "t": "code",
     "text": "gpresult /r\ngpresult /h report.html\n./report.html"
    },
    {
     "t": "p",
     "text": "Первая команда покажет в консоли список применённых **GPO** в разделах **Computer Settings** и **User Settings** - там должны быть **Default Domain Policy** и **Lab Baseline Security**"
    },
    {
     "t": "img",
     "src": "/winter/sec/30130564de83.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Вторая соберёт подробный **HTML**-отчёт со всеми применёнными параметрами и их источниками"
    },
    {
     "t": "img",
     "src": "/winter/sec/042e4a2c9f6e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Откроем **report.html** в браузере и убедимся, что наши настройки на месте"
    },
    {
     "t": "img",
     "src": "/winter/sec/582bfb3ca795.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Проверим ключевые настройки точечно. Обязательность **Ctrl+Alt+Del** и наличие баннера читаются из реестра: `Get-ItemProperty \"HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" | Select-Object DisableCAD, legalnoticecaption, legalnoticetext`"
    },
    {
     "t": "p",
     "text": "**DisableCAD** должно быть **0** (нажатие обязательно), а поля баннера - заполнены нашим текстом"
    },
    {
     "t": "img",
     "src": "/winter/sec/8e8a58be4a0a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "При перезагрузке VM мы могли наблюдать как применились наши групповые политики: **Ctrl+Alt+Del**"
    },
    {
     "t": "img",
     "src": "/winter/sec/2002efd84462.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Баннер**"
    },
    {
     "t": "img",
     "src": "/winter/sec/91dc4adbc066.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Рабочий стол**"
    },
    {
     "t": "img",
     "src": "/winter/sec/ad474187847a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Состояние службы **WinRM** и антивируса проверим так:"
    },
    {
     "t": "code",
     "text": "Get-Service WinRM | Select-Object Name, Status, StartType\nGet-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled"
    },
    {
     "t": "p",
     "text": "Служба **WinRM** должна быть **Running** и **Automatic**, а **RealTimeProtectionEnabled **- **False**"
    },
    {
     "t": "img",
     "src": "/winter/sec/ca014f47024a.webp",
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
     "text": "Мы централизованно настроили домен через **GPO**: задали парольную политику, локальные политики безопасности, преференсы, административные шаблоны, включили **WinRM** на весь домен и продемонстрировали, как компрометация **SYSVOL** приводит к выполнению кода на всех машинах домена. После выполнения всех шагов запустим файл [checker_practice_GPO.exe](https://storage.ptsecurity.com/seafhttp/f/dc364238c66e4a669111/?op=view) от имени администратора в **PowerShell** на контроллере домена **dc01** - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
    },
    {
     "t": "note",
     "text": "Чекер необходимо запустить именно на **dc01** (там есть модуль **AD** и доступ к **SYSVOL**), от имени администратора командой **.\\checker_practice_GPO.exe** в **PowerShell**."
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
   "text": "Мы централизованно настроили домен через **GPO**: задали парольную политику, локальные политики безопасности, преференсы, административные шаблоны, включили **WinRM** на весь домен и продемонстрировали, как компрометация **SYSVOL** приводит к выполнению кода на всех машинах домена. После выполнения всех шагов запустим файл [checker_practice_GPO.exe](https://storage.ptsecurity.com/seafhttp/f/dc364238c66e4a669111/?op=view) от имени администратора в **PowerShell** на контроллере домена **dc01** - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
