// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_3.5 - Реестр",
 "intro": "Адаптация для изучения защиты",
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Для выполнения данного кейса необходимо скачать [OVA-образ](https://storage.ptsecurity.com/seafhttp/f/cc138432c0754faab4d5/?op=view) виртуальной машины, заготовленной Positive Technologies. У данной виртуальной машины должен быть 1 сетевой адаптер VirtualBox в режиме bridge. Также понадобится **Debian**"
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
     "text": "**Цель практики:** изучение работы с реестром Windows (**regedit**), а также разбор рисков небезопасных конфигураций реестра (**AlwaysInstallElevated**, скрытые учётные записи через **SpecialAccounts**, перехват системных утилит через **Image File Execution Options**)"
    },
    {
     "t": "p",
     "text": "**Реестр windows**"
    },
    {
     "t": "p",
     "text": "Заходим в **regedit** - графический интерфейс работы с реестром. Нажимаем **WIN + R** и вводим: `regedit`"
    },
    {
     "t": "img",
     "src": "/winter/sec/1afe982068d4.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Автозапуск и поведение системы**"
    },
    {
     "t": "p",
     "text": "**Добавить программу в автозапуск**"
    },
    {
     "t": "p",
     "text": "Добавим программу в автозапуск. Для этого переходим в `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Run`"
    },
    {
     "t": "img",
     "src": "/winter/sec/e4d5d47e094d.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Правый клик по пустому месту на правой панели **New** → **String Value**."
    },
    {
     "t": "img",
     "src": "/winter/sec/70ec397bf66f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Даём имя - `cmd`. Дважды кликаем по файлу и вписываем путь: `C:\\Windows\\System32\\cmd.exe`"
    },
    {
     "t": "img",
     "src": "/winter/sec/c03629c7207e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Перезагружаем компьютер или перезаходим в пользователя. Мы увидим, что при входе запустилась командная строка"
    },
    {
     "t": "img",
     "src": "/winter/sec/13d38d9d9ea6.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Отключить автозапуск USB**"
    },
    {
     "t": "p",
     "text": "Теперь отключим драйверы USB. Для этого переходим в реестре `HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\USBSTOR`"
    },
    {
     "t": "img",
     "src": "/winter/sec/288218df590a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Дважды кликаем по **start**. Заменяем на `4`"
    },
    {
     "t": "img",
     "src": "/winter/sec/8492a877021a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Перезагружаем компьютер. Подключаем в **VirtualBox** USB-носитель"
    },
    {
     "t": "img",
     "src": "/winter/sec/cb1e621474c3.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Переходим в Device Manager. Нажимаем **WIN + R** и вводим: `devmgmt.msc`"
    },
    {
     "t": "img",
     "src": "/winter/sec/c9591ca33d87.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Находим в **Universal Serial Bus controller** устройство с восклицательным знаком и нажимаем на него. Мы увидим, что драйвер отключён"
    },
    {
     "t": "img",
     "src": "/winter/sec/c55821f075ba.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Скрыть последнего пользователя на экране входа**"
    },
    {
     "t": "p",
     "text": "По умолчанию Windows показывает имя последнего пользователя на экране входа. Для отключения находим в реестре `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System`"
    },
    {
     "t": "img",
     "src": "/winter/sec/f6ea701be5e7.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В **dontdisplaylastusername** ставим значение `1`"
    },
    {
     "t": "img",
     "src": "/winter/sec/771d4a74556b.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Выйдя из пользователя, мы не увидим прошлый вход"
    },
    {
     "t": "img",
     "src": "/winter/sec/3d10b64cbb35.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Возвращаем обратно - **dontdisplaylastusername** ставим на `0`"
    },
    {
     "t": "p",
     "text": "**Изменить политику запуска PowerShell**"
    },
    {
     "t": "p",
     "text": "Теперь отключим запуск неподписанных скриптов **PowerShell**. В реестре находим `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\PowerShell\\1\\ShellIds\\Microsoft.PowerShell`"
    },
    {
     "t": "p",
     "text": "Создаём **String Value** с названием `ExecutionPolicy` и значением `AllSigned`"
    },
    {
     "t": "img",
     "src": "/winter/sec/9260309de945.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Создаём файл **test.ps1** на рабочем столе. В нём пишем любую тестовую команду для вывода текста: `Write-Output \"Hello\"` и пробуем запустить в **PowerShell**. Мы увидим, что неподписанный файл система не запускает"
    },
    {
     "t": "img",
     "src": "/winter/sec/24f498e52253.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Сеть и безопасность**"
    },
    {
     "t": "p",
     "text": "**Отключить UAC**"
    },
    {
     "t": "p",
     "text": "Заходим в аккаунт **student** и пробуем запустить **PowerShell** от имени администратора"
    },
    {
     "t": "img",
     "src": "/winter/sec/dda62b61c285.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Мы увидим, что требуются админские права, которых нет у пользователя"
    },
    {
     "t": "img",
     "src": "/winter/sec/aab0a54afe3c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Возвращаемся обратно в **admin** и отключаем **User Account Control** - один из первых шагов атакующего после получения доступа к системе. В реестре находим `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System`"
    },
    {
     "t": "img",
     "src": "/winter/sec/0a6924eb45df.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В **EnableLUA** ставим `0`. После перезагружаем компьютер и заходим в аккаунт **student**"
    },
    {
     "t": "img",
     "src": "/winter/sec/466a94cce0b1.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Если снова запустим **PowerShell** от имени администратора, то увидим, что у нас не запросили админские права"
    },
    {
     "t": "img",
     "src": "/winter/sec/261630b491a0.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Отключить NetBIOS через реестр**"
    },
    {
     "t": "p",
     "text": "**NetBIOS** - устаревший протокол разрешения имён, активно используется атакующими для перехвата **NTLM-хэшей** через **NBT-NS poisoning**. Для отключения находим в реестре `HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\NetBT\\Parameters`"
    },
    {
     "t": "img",
     "src": "/winter/sec/8f7b7b4b524e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Создаём **DWORD Value**"
    },
    {
     "t": "img",
     "src": "/winter/sec/4cf641f1680a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Даём название `NodeType`"
    },
    {
     "t": "img",
     "src": "/winter/sec/b4598a3cb20f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Вписываем значение `2` - **P-node**, только через **DNS**"
    },
    {
     "t": "img",
     "src": "/winter/sec/8eb340c4c70f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Отключить LLMNR через реестр**"
    },
    {
     "t": "p",
     "text": "**LLMNR** (**Link-Local Multicast Name Resolution**) - резервный механизм разрешения имён: если **DNS** не находит хост, Windows делает широковещательный запрос в локальную сеть. Инструмент **Responder** перехватывает эти запросы и отвечает на них, вынуждая жертву отправить **NTLM**-хэш атакующему."
    },
    {
     "t": "p",
     "text": "Для отключения находим в реестре `HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows NT`"
    },
    {
     "t": "img",
     "src": "/winter/sec/753d94d2a0fa.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Создаём новый подраздел `DNSClient`: правой кнопкой нажимаем на папку **New** → **Key**"
    },
    {
     "t": "img",
     "src": "/winter/sec/520d0b4417fa.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Создаём **DWORD Value**"
    },
    {
     "t": "img",
     "src": "/winter/sec/063e3aaa09cd.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Даём название `EnableMulticast` и проверяем, что значение стоит `0`"
    },
    {
     "t": "img",
     "src": "/winter/sec/6de1710ff1fd.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Настройка WinRM через реестр**"
    },
    {
     "t": "p",
     "text": "**Windows Remote Management** - служба удалённого управления через **PowerShell Remoting**."
    },
    {
     "t": "p",
     "text": "Находим в реестре `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WSMAN\\Service`"
    },
    {
     "t": "img",
     "src": "/winter/sec/9ffa0539350a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Создаём **DWORD Value**"
    },
    {
     "t": "img",
     "src": "/winter/sec/355b822fda32.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Даём название `allow_unencrypted`"
    },
    {
     "t": "img",
     "src": "/winter/sec/3f475278c215.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Вписываем значение `1` - разрешает **WinRM** принимать соединения **без шифрования** порт **5985**"
    },
    {
     "t": "img",
     "src": "/winter/sec/ce3ccb2e4a21.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "И нам понадобится ещё один **DWORD Value**"
    },
    {
     "t": "img",
     "src": "/winter/sec/9f67b676618d.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Даём название `AllowAutoConfig`"
    },
    {
     "t": "img",
     "src": "/winter/sec/057e86c1b359.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Вписываем значение `1` - разрешает настраивать **WinRM** через **GPO**"
    },
    {
     "t": "img",
     "src": "/winter/sec/624d78c68db9.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Заходим в **PowerShell**"
    },
    {
     "t": "ul",
     "items": [
      "Запускаем **WinRM** : `Start-Service WinRM`",
      "Проверяем, что он запустился: `Get-Service WinRM`",
      "Смотрим, что слушает **WinRM** : `winrm enumerate winrm/config/listener`"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/2c2e96ec37bc.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Мы увидим, что **WinRM**:"
    },
    {
     "t": "ul",
     "items": [
      "Слушает на всех сетевых интерфейсах - **Address = ***",
      "Соединение незашифрованное - **Transport = HTTP**",
      "Cлушает - **Port = 5985**"
     ]
    },
    {
     "t": "p",
     "text": "**Следы и артефакты**"
    },
    {
     "t": "p",
     "text": "**Очистить историю недавних файлов**"
    },
    {
     "t": "p",
     "text": "Windows хранит список недавно открытых файлов в реестре. Это ценный источник артефактов при расследовании - и цель для атакующего, который хочет скрыть свою активность."
    },
    {
     "t": "p",
     "text": "Чтобы посмотреть историю недавно открытых файлов, в **PowerShell** вводим: `Get-ItemProperty -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs\"`"
    },
    {
     "t": "img",
     "src": "/winter/sec/d536049d01c4.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Для очистки используем: `Remove-Item -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs\" -Recurse -Force`"
    },
    {
     "t": "img",
     "src": "/winter/sec/be93920d52f9.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "При повторной проверке истории мы ничего не найдём"
    },
    {
     "t": "img",
     "src": "/winter/sec/d4235a7549f0.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Откроем ранее созданный файл **test.ps1** и после снова проверим историю. Мы увидим этот файл"
    },
    {
     "t": "img",
     "src": "/winter/sec/414e30847a52.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Включение логирования PowerShell**"
    },
    {
     "t": "p",
     "text": "Script Block Logging фиксирует все выполняемые **PowerShell**-команды в журнал событий."
    },
    {
     "t": "p",
     "text": "Для включения выполним команды в **PowerShell**:"
    },
    {
     "t": "ul",
     "items": [
      "создаём подраздел **ScriptBlockLogging: ** `New-Item -Path \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging\" -Force`",
      "включим логирование: `New-ItemProperty -Path \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging\" -Name \"EnableScriptBlockLogging\" -Value 1 -Type DWord`"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/ef49947e1cdf.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В новом окне **PowerShell** выполняем команду: `Whoami`"
    },
    {
     "t": "img",
     "src": "/winter/sec/8db84980df2a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь заходим в **Event Viewer**"
    },
    {
     "t": "img",
     "src": "/winter/sec/dcb1df4d9331.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Переходим в **Applications and Services Logs → Microsoft → Windows → PowerShell → Operational**. Мы увидим команду **PowerShell**, которую ранее выполнили"
    },
    {
     "t": "img",
     "src": "/winter/sec/a331c04a9bc7.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Посмотреть и изменить MRU**"
    },
    {
     "t": "p",
     "text": "MRU - список недавно использованных элементов: команд в строке **Run**, открытых файлов, посещённых путей."
    },
    {
     "t": "p",
     "text": "Нажимаем **Win + R** и вводим: `cmd`"
    },
    {
     "t": "img",
     "src": "/winter/sec/aa6eab252d4f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь открываем **PowerShell** и выполняем: `Get-ItemProperty -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU\"` - мы увидим историю команд в **Run**"
    },
    {
     "t": "img",
     "src": "/winter/sec/8ec0a2485577.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь удалим запись. С помощью прошлой команды находим значение **MRUList** - под ним есть запись **b : cmd\\1** (в вашем примере может быть другое значение): `Remove-ItemProperty -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RunMRU\" -Name \"b\"` и снова проверяем историю команд в **RUN**"
    },
    {
     "t": "img",
     "src": "/winter/sec/aff8c1b22b3d.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь посмотрим историю открытых папок в проводнике и введём путь `C:\\Windows\\System32`"
    },
    {
     "t": "img",
     "src": "/winter/sec/792bdcf665c0.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В **PowerShell** выполняем: `Get-ItemProperty -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\TypedPaths\"` - мы увидим, что заходили в папку"
    },
    {
     "t": "img",
     "src": "/winter/sec/2997408f2dc4.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Очищаем список: `Remove-Item -Path \"HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\TypedPaths\" -Recurse -Force` и снова смотрим историю папок. Нам ничего не выдаст, так как мы очистили его."
    },
    {
     "t": "img",
     "src": "/winter/sec/c9590158bdc4.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "h3",
     "text": "Включение AlwaysInstallElevated"
    },
    {
     "t": "p",
     "text": "**AlwaysInstallElevated** - политика Windows, которая разрешает устанавливать **MSI**-пакеты с правами **SYSTEM** для любого пользователя, включая непривилегированных. Если оба ключа (в **HKLM** и **HKCU**) установлены в значение 1 - любой **MSI**-файл запустится с максимальными привилегиями."
    },
    {
     "t": "p",
     "text": "Включаем через **PowerShell**:"
    },
    {
     "t": "ul",
     "items": [
      "Создаём новый раздел на уровне системы: `New-Item -Path \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer\" -Force`",
      "Добавляем параметр **AlwaysInstallElevated** со значением **1** : `Set-ItemProperty -Path \"HKLM:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer\" -Name \"AlwaysInstallElevated\" -Value 1 -Type DWord`",
      "Создаём новый раздел на уровне пользователя: `New-Item -Path \"HKCU:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer\" -Force`",
      "Добавляем параметр **AlwaysInstallElevated** со значением **1** : `Set-ItemProperty -Path \"HKCU:\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer\" -Name \"AlwaysInstallElevated\" -Value 1 -Type DWord`"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/f687cb940bcb.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Политика включена - теперь посмотрим как атакующий использует её для получения привилегий **SYSTEM**."
    }
   ]
  },
  {
   "id": "s2",
   "title": "Вопрос",
   "blocks": [
    {
     "t": "p",
     "text": "После выполнения обеих частей практики запустите файл [Checker_Guide_case_Registry.exe](https://storage.ptsecurity.com/seafhttp/f/b95e8058207c40568dcb/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
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
   "text": "После выполнения обеих частей практики запустите файл [Checker_Guide_case_Registry.exe](https://storage.ptsecurity.com/seafhttp/f/b95e8058207c40568dcb/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
