// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_3.9 - Расширенное журналирование",
 "intro": null,
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Для выполнения данной практики необходимо скачать [OVA-образ](https://storage.ptsecurity.com/seafhttp/f/cc138432c0754faab4d5/?op=view) виртуальной машины, заготовленной Positive Technologies. У данной виртуальной машины должен быть 1 сетевой адаптер VirtualBox в режиме NAT Network. Также понадобится **Debian**"
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
     "text": "**Цель практики**: настройка расширенного аудита Windows через auditpol, установка Sysmon с готовой конфигурацией, демонстрация отключения подкатегории Process Creation и обнаружение следа этой атаки через Event ID 4719"
    },
    {
     "t": "h3",
     "text": "Расширенный аудит через auditpol"
    },
    {
     "t": "p",
     "text": "**Просмотр текущей политики аудита**"
    },
    {
     "t": "p",
     "text": "Откроем на **win-targetPowerShell** от имени администратора: нажмём **Win**, введём **PowerShell**, в результатах поиска нажмём правой кнопкой по **Windows PowerShell** и выберем **Run as administrator**. В окне **User Account Control** нажмём **Yes**. Все команды первой части выполняются в этом окне, если явно не указано иное."
    },
    {
     "t": "p",
     "text": "Первое, что нужно сделать - посмотреть, что уже включено. Утилита **auditpol** показывает состояние всех 58 подкатегорий расширенной политики аудита, разбитых на 9 верхних категорий: `auditpol /get /category:*`"
    },
    {
     "t": "p",
     "text": "В выводе мы увидим девять категорий - **System**, **Logon/Logoff**, **Object Access**, **Privilege Use**, **Detailed Tracking**, **Policy Change**, **Account Management**, **DS Access**, **Account Logon** - каждая раскрыта на подкатегории с текущим состоянием (**No Auditing**, **Success**, **Failure** или **Success and Failure**)"
    },
    {
     "t": "p",
     "text": "Прокрутим вывод и обратим внимание на три ключевые строки. **Detailed Tracking -> Process Creation** = **No Auditing** - именно из-за этого **Event ID 4688** сейчас не пишется вообще. **Policy Change -> Audit Policy Change** = **No Auditing** - без этого мы не увидим **Event ID 4719** в финале практики, когда будете отключать аудит. **Logon/Logoff -> Logon** обычно уже стоит в **Success** - **Event ID 4624** пишется, но неудачные попытки (**Event ID 4625**) - нет. Эти пробелы мы будем закрывать следующим действием."
    },
    {
     "t": "p",
     "text": "**Включение восьми подкатегорий аудита**"
    },
    {
     "t": "p",
     "text": "По минимальному набору из статьи 11 включим восемь ключевых подкатегорий. Каждая команда включает и успех, и неудачу. Выполни последовательно:"
    },
    {
     "t": "code",
     "text": "auditpol /set /subcategory:\"Process Creation\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Logon\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Special Logon\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Security Group Management\" /success:enable /failure:enable\nauditpol /set /subcategory:\"User Account Management\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Audit Policy Change\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Other Object Access Events\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Security System Extension\" /success:enable /failure:enable"
    },
    {
     "t": "p",
     "text": "Каждая команда должна вернуть **The command was successfully executed**. Если вместо этого мы видим ошибку **Error: 0x00000522** - **PowerShell** запущен не от администратора, перезапустим его"
    },
    {
     "t": "p",
     "text": "Кратко о том, что даёт каждая подкатегория. **Process Creation** генерирует **Event ID 4688** при каждом запуске процесса - основа для расследования атак. **Logon** и **Special Logon** покрывают **Event ID 4624**, **4625** и **4672** - входы, неудачные попытки входа, вход с административными правами. **Security Group Management** и **User Account Management** дают **Event ID 4720**, **4726**, **4732** - создание учёток и добавления в группы (типичная техника закрепления атакующего). **Audit Policy Change** - **Event ID 4719**, самое критическое для этой практики, потому что именно этим событием фиксируется отключение самого аудита. **Other Object Access Events** - **Event ID 4698** - создание задач планировщика. **Security System Extension** - **Event ID 7045** - установка новой службы; именно так работают **PsExec** и большинство инструментов удалённого выполнения."
    },
    {
     "t": "p",
     "text": "Проверим результат ещё одним вызовом: `auditpol /get /category:*`"
    },
    {
     "t": "p",
     "text": "Теперь напротив каждой из восьми включённых подкатегорий должно стоять **Success and Failure**"
    },
    {
     "t": "p",
     "text": "**Включение командной строки в Event ID 4688**"
    },
    {
     "t": "p",
     "text": "По умолчанию **Event ID 4688** содержит только имя запущенного процесса. Это критичный пробел - **powershell.exe** в поле **Process Name** запускается на рядовом хосте по десятку раз в день, и без командной строки эти события не отличить друг от друга. Вредоносный запуск с флагом **-EncodedCommand** и **Base64**-нагрузкой утонет в потоке легитимных."
    },
    {
     "t": "p",
     "text": "Включение выполняется одной командой правки реестра: `reg add \"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit\" /v ProcessCreationIncludeCmdLine_Enabled /t REG_DWORD /d 1 /f`"
    },
    {
     "t": "p",
     "text": "Команда должна вернуть **The operation completed successfully**. Проверьте, что значение действительно установлено: `Get-ItemProperty \"HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\Audit\" -Name ProcessCreationIncludeCmdLine_Enabled`"
    },
    {
     "t": "p",
     "text": "В выводе мы должны увидеть строку **ProcessCreationIncludeCmdLine_Enabled : 1**. Если её нет - предыдущая команда не сработала, повторим"
    },
    {
     "t": "p",
     "text": "**Генерация тестового Event ID 4688**"
    },
    {
     "t": "p",
     "text": "Теперь запустим процесс с осмысленным аргументом, чтобы убедиться: **Event ID 4688** пишется, и в него попадает командная строка."
    },
    {
     "t": "p",
     "text": "В том же окне **PowerShell** выполним: `Start-Process notepad.exe -ArgumentList \"C:\\Windows\\System32\\drivers\\etc\\hosts\"`"
    },
    {
     "t": "p",
     "text": "На экране откроется **notepad.exe** с системным файлом **hosts**. Закройте окно **notepad** - для генерации события этого достаточно, файл трогать не нужно."
    },
    {
     "t": "p",
     "text": "Подождём пару секунд, чтобы событие успело записаться, и найдём его в **Security**: `Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4688} -MaxEvents 20 | Where-Object { $_.Message -match 'hosts' } | Format-List TimeCreated, Message`"
    },
    {
     "t": "p",
     "text": "В выводе мы должны увидеть событие с полями:"
    },
    {
     "t": "ul",
     "items": [
      "**New Process Name** - **C:\\Windows\\System32\\notepad.exe**",
      "**Process Command Line** - **notepad.exe C:\\Windows\\System32\\drivers\\etc\\hosts**",
      "**Creator Process Name** - **C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe**"
     ]
    },
    {
     "t": "p",
     "text": "Если поле **Process Command Line** пустое или отсутствует - значит правка реестра не применилась, вернёмся на предыдущий подраздел и повторим. Дополнительно можно посмотреть это же событие через **GUI**: откроем **Event Viewer** через **Win + R** -> **eventvwr.msc**, перейдём в **Windows Logs -> Security**, отсортируем по времени и найдём свежее **Event ID 4688**."
    },
    {
     "t": "h3",
     "text": "Генерация событий входа с Debian"
    },
    {
     "t": "p",
     "text": "Переключимся на **Debian**. Откроем терминал и установим **FreeRDP 2.10.x** из стандартного репозитория:"
    },
    {
     "t": "code",
     "text": "sudo apt update\nsudo apt install -y freerdp2-x11\ndpkg -l | grep freerdp2-x11\nxfreerdp /version"
    },
    {
     "t": "p",
     "text": "Команда **xfreerdp /version** должна вывести строку вида **This is FreeRDP version 2.10.0**"
    },
    {
     "t": "p",
     "text": "Первая команда - успешный вход по **RDP** с правильным паролем: `xfreerdp /v:192.168.0.101 /u:rdpuser /p:'rdpuser' /cert:ignore`"
    },
    {
     "t": "p",
     "text": "Подставьте реальный **IP win-target**, если он у Вас отличается от **192.168.1.151**. Команда должна отработать без интерактивного окна и вернуть в приглашение терминала с **Exit code: 0**."
    },
    {
     "t": "p",
     "text": "Вторая команда - тот же вход, но с намеренно неверным паролем: `xfreerdp /v:192.168.0.101 /u:rdpuser /p:'WrongPassword123' /cert:ignore`"
    },
    {
     "t": "p",
     "text": "Эта команда вернёт ошибку аутентификации - именно это и нужно, чтобы получить **Event ID 4625** на **win-target**."
    },
    {
     "t": "p",
     "text": "Возвращаемся на **win-target**, в то же окно **PowerShell** от администратора. Проверьте, что события появились:"
    },
    {
     "t": "code",
     "text": "Get-WinEvent -FilterHashtable @{\n    LogName   = 'Security'\n    Id        = 4625, 4624\n    StartTime = (Get-Date).AddMinutes(-10)\n} |\nSelect-Object -First 10 TimeCreated, Id, Message |\nFormat-List"
    },
    {
     "t": "p",
     "text": "Тип входа **10** означает **RemoteInteractive** - именно так регистрируются **RDP**-подключения. В выводе мы должны увидеть две свежие строки:"
    },
    {
     "t": "ul",
     "items": [
      "**Id = 4624** (успешный вход от первого запуска **xfreerdp** )"
     ]
    },
    {
     "t": "ul",
     "items": [
      "одну с **Id = 4625** (неудачный от второго)"
     ]
    },
    {
     "t": "p",
     "text": "На этом первый этап практики закрыт: штатный аудит настроен, командная строка в **Event ID 4688** пишется, события входа с удалённой машины фиксируются. Вторая половина расширенного журналирования - контекст, хэши файлов и сетевые связи - закрывается **Sysmon**."
    },
    {
     "t": "h3",
     "text": "Sysmon с готовым конфигом"
    },
    {
     "t": "p",
     "text": "**Что даёт Sysmon поверх штатного аудита**"
    },
    {
     "t": "p",
     "text": "**Sysmon** дополняет штатный аудит там, где у последнего слепые зоны. Штатный **Event ID 4688** покажет, что запустился **powershell.exe** с командной строкой - но не покажет **SHA-256** самого бинарника. **Sysmon Event ID 1** покажет и то, и другое, плюс полную командную строку родителя. Штатный аудит вообще не пишет сетевые подключения с привязкой к процессу - **Sysmon Event ID 3** пишет. Штатный аудит не видит доступа к памяти чужих процессов (типичная техника для **Pass-the-Hash** и патчинга **EtwEventWrite** - разбирается в статье 11.4) - **Sysmon Event ID 10** видит."
    },
    {
     "t": "p",
     "text": "В этой практике мы устанавливаем **Sysmon v15.21** (актуальная версия из набора **Sysinternals** на 2026 год) с готовой конфигурацией **SwiftOnSecurity** - это де-факто стандарт для learn-сценариев и первого развёртывания в инфраструктуре. Тонкая настройка правил **Sysmon** под конкретную среду - тема отдельного курса по детектированию."
    },
    {
     "t": "p",
     "text": "**Подготовка каталога и загрузка**"
    },
    {
     "t": "p",
     "text": "Все действия в этом этапе практики выполняются в том же окне **PowerShell от администратора** на **win-target**. Создадим рабочий каталог: `New-Item -Path \"C:\\Tools\\Sysmon\" -ItemType Directory -Force`"
    },
    {
     "t": "p",
     "text": "Скачиваем напрямую из сети - выполним две команды:"
    },
    {
     "t": "code",
     "text": "Invoke-WebRequest -Uri \"https://download.sysinternals.com/files/Sysmon.zip\" -OutFile \"C:\\Tools\\Sysmon\\Sysmon.zip\"\nInvoke-WebRequest -Uri \"https://raw.githubusercontent.com/SwiftOnSecurity/sysmon-config/master/sysmonconfig-export.xml\" -OutFile \"C:\\Tools\\Sysmon\\sysmonconfig-export.xml\""
    },
    {
     "t": "p",
     "text": "Распакуем архив **Sysmon** в тот же каталог:"
    },
    {
     "t": "code",
     "text": "Expand-Archive -Path \"C:\\Tools\\Sysmon\\Sysmon.zip\" -DestinationPath \"C:\\Tools\\Sysmon\" -Force\nGet-ChildItem \"C:\\Tools\\Sysmon\" -Filter \"Sysmon*.exe\""
    },
    {
     "t": "p",
     "text": "В каталоге должны появиться три исполняемых файла: **Sysmon.exe** (32-битная сборка), **Sysmon64.exe** (**x64**) и **Sysmon64a.exe** (**ARM64**). Для **Windows 11 x64** используется **Sysmon64.exe**"
    },
    {
     "t": "p",
     "text": "Убедимся, что файл конфигурации на месте и не пустой: `Get-Item \"C:\\Tools\\Sysmon\\sysmonconfig-export.xml\" | Select-Object Name, Length`"
    },
    {
     "t": "p",
     "text": "Поле **Length** должно быть в районе **120 000 - 200 000** байт - реальный размер конфига **SwiftOnSecurity**. Если ноль или пусто - файл не скачался, проверьте сетевой доступ."
    },
    {
     "t": "p",
     "text": "**Установка Sysmon с конфигурацией**"
    },
    {
     "t": "p",
     "text": "Перейдём в рабочий каталог и запустим установку с принятием лицензии и указанием файла конфига:"
    },
    {
     "t": "code",
     "text": "cd C:\\Tools\\Sysmon\n.\\Sysmon64.exe -accepteula -i sysmonconfig-export.xml"
    },
    {
     "t": "p",
     "text": "Утилита выведет несколько строк - принятие лицензии, версию **Sysmon**, версию схемы конфига, сообщение об успешной установке. В конце должны быть строки **Sysmon64 installed** и **SysmonDrv installed**. Если вместо этого выпадает ошибка про уже существующую службу - удалим предыдущую установку через **.\\Sysmon64.exe -u** и повторим"
    },
    {
     "t": "p",
     "text": "Убедимся, что оба компонента запущены: `Get-Service Sysmon64, SysmonDrv | Format-Table Name, Status, StartType`"
    },
    {
     "t": "p",
     "text": "В выводе должны быть две строки: **Sysmon64** и **SysmonDrv**, у обеих **Status = Running** и **StartType = Automatic(или Boot)**"
    },
    {
     "t": "p",
     "text": "**Проверка журнала Sysmon**"
    },
    {
     "t": "p",
     "text": "Логи **Sysmon** пишутся в отдельный журнал по пути **Applications and Services Logs -> Microsoft -> Windows -> Sysmon -> Operational** в **Event Viewer**. Проверьте, что журнал существует и в нём уже что-то есть - сам факт установки службы порождает несколько событий: `Get-WinEvent -LogName \"Microsoft-Windows-Sysmon/Operational\" -MaxEvents 5 | Select-Object TimeCreated, Id, LevelDisplayName | Format-Table`"
    },
    {
     "t": "p",
     "text": "Мы должны увидеть несколько свежих событий"
    },
    {
     "t": "p",
     "text": "**Генерация Sysmon Event ID 1**"
    },
    {
     "t": "p",
     "text": "Запустим **notepad.exe** ещё раз с тем же аргументом, что и в первом этапе практики: `Start-Process notepad.exe -ArgumentList \"C:\\Windows\\System32\\drivers\\etc\\hosts\"`"
    },
    {
     "t": "p",
     "text": "Закройте открывшееся окно. Теперь у Вас должно появиться событие сразу в двух местах - в **Security** как **Event ID 4688** (это уже было) и в **Microsoft-Windows-Sysmon/Operational** как **Event ID 1** (**Process Create**)."
    },
    {
     "t": "p",
     "text": "Найдём свежее **Sysmon**-событие: `Get-WinEvent -LogName \"Microsoft-Windows-Sysmon/Operational\" -FilterXPath \"*[System[EventID=1]]\" -MaxEvents 20 | Where-Object { $_.Message -match 'notepad' } | Format-List TimeCreated, Message`"
    },
    {
     "t": "p",
     "text": "В выводе мы увидим развёрнутое сообщение с полями:"
    },
    {
     "t": "ul",
     "items": [
      "**Image** - **C:\\Windows\\System32\\notepad.exe**",
      "**CommandLine** - **\"C:\\Windows\\System32\\notepad.exe\" C:\\Windows\\System32\\drivers\\etc\\hosts**",
      "**Hashes** - **SHA1=..., MD5=..., SHA256=..., IMPHASH=...**",
      "**ParentImage** - **C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe**",
      "**ParentCommandLine** - полная командная строка родителя",
      "**User** - имя учётной записи в формате **DOMAIN\\user**"
     ]
    },
    {
     "t": "p",
     "text": "Обратим внимание именно на поле **Hashes** - это то, чего нет и никогда не будет в штатном **Event ID 4688**. С **SHA-256** файла мы можем искать этот же бинарник на других хостах инфраструктуры или проверять его на **VirusTotal**. Это одна из главных ценностей **Sysmon**: связка **процесс + хэш** позволяет реагировать на инциденты в разы точнее, чем по одному имени."
    },
    {
     "t": "p",
     "text": "Второй этап практики закрыт: **Sysmon** установлен, оба компонента работают, телеметрия идёт. Дальше - короткий эксперимент, который замыкает обе половины практики."
    },
    {
     "t": "h3",
     "text": "Отключение Process Creation и след Event ID 4719"
    },
    {
     "t": "p",
     "text": "В первом этапе практики мы явно включили подкатегорию **Audit Policy Change** - и сейчас мы увидим, зачем. Атакующий с правами администратора не будет очищать журнал **Security** через **wevtutil cl** (это оставит громкое **Event ID 1102**), а попробует тише - отключит запись новых событий там, где ему это мешает. Классический сценарий из статьи - отключение подкатегории **Process Creation**, чтобы дальнейшие запуски процессов не попадали в **Event ID 4688**. Техника проходит по **MITRE ATT&CK** как **T1562.002** - **Impair Defenses: Disable Windows Event Logging**."
    },
    {
     "t": "p",
     "text": "Все команды - в том же окне **PowerShell** от администратора на **win-target**."
    },
    {
     "t": "p",
     "text": "Отключим подкатегорию: `auditpol /set /subcategory:\"Process Creation\" /success:disable /failure:disable`"
    },
    {
     "t": "p",
     "text": "Команда должна вернуть **The command was successfully executed**"
    },
    {
     "t": "p",
     "text": "Проверьте, что подкатегория действительно выключена: `auditpol /get /subcategory:\"Process Creation\"`"
    },
    {
     "t": "p",
     "text": "Запустим ещё один тестовый процесс с новым, отличным от предыдущих, аргументом - чтобы точно отличать до и после: `Start-Process notepad.exe -ArgumentList \"C:\\Windows\\System32\\drivers\\etc\\services\"`"
    },
    {
     "t": "p",
     "text": "Аргумент **services** выбран специально: во всех предыдущих запусках мы открывали **hosts**, теперь фильтр по строке **services** гарантированно найдёт только это событие, а не старые. Закройте окно **notepad**."
    },
    {
     "t": "p",
     "text": "По правилам расширенного аудита, **Event ID 4688** для этого запуска в журнале **Security** появиться **не должен** - подкатегория выключена."
    },
    {
     "t": "p",
     "text": "Убедимся в этом:"
    },
    {
     "t": "code",
     "text": "Get-WinEvent -FilterHashtable @{\n    LogName   = 'Security'\n    Id        = 4688\n    StartTime = (Get-Date).AddMinutes(-10)\n} -MaxEvents 5 |\nWhere-Object {\n    $_.Message -match 'services'\n} |\nFormat-List TimeCreated, Message"
    },
    {
     "t": "p",
     "text": "Вывод должен быть **пустым**"
    },
    {
     "t": "p",
     "text": "Теперь та же проверка, но в журнале **Sysmon**: `Get-WinEvent -LogName \"Microsoft-Windows-Sysmon/Operational\" -FilterXPath \"*[System[EventID=1]]\" -MaxEvents 20 | Where-Object { $_.Message -match 'services' } | Format-List TimeCreated, Message`"
    },
    {
     "t": "p",
     "text": "Здесь мы увидим свежее **Event ID 1** для того же **notepad.exe** с аргументом **services**. Это ключевой вывод второй половины практики: **Sysmon работает через ETW-провайдер уровня ядра и не зависит от штатной политики аудита**. Отключение **auditpol** ослепляет только штатный **Security**-журнал; **Sysmon** продолжает писать. Именно поэтому в статье 11 **Sysmon** идёт как **второй независимый источник телеметрии**, а не как замена штатному аудиту"
    },
    {
     "t": "p",
     "text": "Теперь найдём след самой атаки. Атакующий рассчитывал на тишину, но подкатегория **Audit Policy Change** была включена в 1 этапе практики - и попытка отключения оставила **Event ID 4719**: `Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4719} -MaxEvents 10 | Where-Object { $_.Message -match 'Process Creation' } | Format-List TimeCreated, Message`"
    },
    {
     "t": "p",
     "text": "В теле события мы увидим:"
    },
    {
     "t": "ul",
     "items": [
      "**Category** - **Detailed Tracking**",
      "**Subcategory** - **Process Creation**",
      "**Subcategory GUID** - уникальный идентификатор подкатегории",
      "**Changes** - **Success removed, Failure removed**",
      "**Account Name** - учётная запись, от которой это было выполнено (в нашем случае - мы сами)"
     ]
    },
    {
     "t": "p",
     "text": "Это финальное доказательство и ключевой урок практики: **любое изменение политики аудита оставляет свой собственный аудитный след**, если подкатегория **Audit Policy Change** включена заранее. В инфраструктуре с **SIEM** на **Event ID 4719** обязательно настраивается отдельный алерт - без него это событие теряется в общем потоке, и атака остаётся незамеченной."
    },
    {
     "t": "p",
     "text": "Обязательно вернём подкатегорию **Process Creation** обратно - иначе штатный аудит **Event ID 4688** останется отключённым, и в реальной инфраструктуре это создаст слепую зону:"
    },
    {
     "t": "code",
     "text": "auditpol /set /subcategory:\"Process Creation\" /success:enable /failure:enable\nauditpol /get /subcategory:\"Process Creation\""
    },
    {
     "t": "p",
     "text": "Напротив строки **Process Creation** снова должно быть **Success and Failure**"
    },
    {
     "t": "h3",
     "text": "Что показала демонстрация и как защищать инфраструктуру журналирования"
    },
    {
     "t": "p",
     "text": "Всё, что мы только что сделали руками, в реальной инфраструктуре автоматизируется. Расширенный аудит и включение командной строки в **Event ID 4688** прокатываются через **GPO** на все рабочие станции и серверы одной политикой. **Sysmon** устанавливается тем же способом плюс регулярное обновление конфигурации. Собранные события пересылаются на выделенный коллектор через **Windows Event Forwarding** (**WEF**) в режиме **MinLatency** - это гарантирует, что **Event ID 1102**, **4719**, **1100** и **16** улетают с хоста быстрее, чем атакующий успевает их стереть локально."
    },
    {
     "t": "p",
     "text": "Драйвер **Sysmon** защищается от выгрузки через **GPO**-запрет на **fltMC.exe** для непривилегированных процессов - иначе одной командой **fltMC.exe unload SysmonDrv** атакующий выключает всю **Sysmon**-телеметрию, оставляя службу видимо работающей в **services.msc**. Подмена конфигурации **Sysmon** детектируется через мониторинг **Event ID 16** в **SIEM**: любое изменение конфига вне технологического окна - красный флаг."
    }
   ]
  },
  {
   "id": "s2",
   "title": "Вопрос",
   "blocks": [
    {
     "t": "p",
     "text": "Мы настроили расширенный аудит через **auditpol**, установили **Sysmon** с готовой конфигурацией, и продемонстрировали, как отключение подкатегории аудита оставляет след в **Event ID 4719**. После выполнения обеих частей запустим файл [checker_practice_Audit.exe](https://storage.ptsecurity.com/seafhttp/f/55d0faa941b34f9ca995/?op=view) от имени администратора в **PowerShell** - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
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
   "text": "Мы настроили расширенный аудит через **auditpol**, установили **Sysmon** с готовой конфигурацией, и продемонстрировали, как отключение подкатегории аудита оставляет след в **Event ID 4719**. После выполнения обеих частей запустим файл [checker_practice_Audit.exe](https://storage.ptsecurity.com/seafhttp/f/55d0faa941b34f9ca995/?op=view) от имени администратора в **PowerShell** - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
