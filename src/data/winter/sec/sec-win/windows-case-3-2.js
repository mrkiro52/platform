// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_3.2 - Драйвера",
 "intro": "Адаптация для изучения защиты",
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Для выполнения данного кейса необходимо скачать[OVA-образ](https://storage.ptsecurity.com/seafhttp/f/cc138432c0754faab4d5/?op=view)виртуальной машины, заготовленной Positive Technologies. У данной виртуальной машины должен быть 1 сетевой адаптер VirtualBox в режиме **bridge**. Также понадобится **Debian** с ip-адресом **192.168.0.108**."
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
     "text": "В Windows VM нужно создать рабочие папки и перенести файлы перед началом:"
    },
    {
     "t": "ul",
     "items": [
      "**C:\\Labs** - папка для выводов скриптов.",
      "**C:\\Labs\\DLLHijack\\app** - поместим сюда [legitimate.exe](https://storage.ptsecurity.com/seafhttp/f/3820bad77e104dc5b6a7/?op=view)",
      "**C:\\Labs\\DLLHijack\\payload** - поместим сюда [vuln.dll](https://storage.ptsecurity.com/seafhttp/f/bb83de9bed1546a38488/?op=view)"
     ]
    },
    {
     "t": "note",
     "text": "**vuln.dll** лежит в архиве. Разархивировать данный архив можно исключительно на виртуальной машине, так как он содержит потенциально вредоносные файлы. Обратите внимание что на данном архиве стоит пароль - `edtechlab-intern`"
    },
    {
     "t": "ul",
     "items": [
      "**C:\\Temp** - поместим [labtest.sys](https://storage.ptsecurity.com/seafhttp/f/7ab8cf5f4bd64d878829/?op=view)",
      "**C:\\Tools** - [Procmon.exe](https://storage.ptsecurity.com/seafhttp/f/993a9901dfc04adcb5bb/?op=view)"
     ]
    },
    {
     "t": "p",
     "text": "**Цель практики:** Работа с драйверами Windows и проведение атак** DLL Hijacking** и **DLL Side-Loading**"
    },
    {
     "t": "h3",
     "text": "Работа с драйверами"
    },
    {
     "t": "p",
     "text": "Начнём с базовой проверки: что загружено в ядро, откуда и подписано ли. Без этого невозможно отличить легитимный драйвер от **BYOVD**."
    },
    {
     "t": "p",
     "text": "Тестовые драйвера, который мы будем рассматривать, подписаны самоподписанным сертификатом - не доверенным Microsoft. По умолчанию Windows запрещает загрузку таких драйверов через механизм **DSE (Driver Signature Enforcement)** Для обхода включим **режим тестовой подписи** - официальный режим Windows для разработчиков драйверов."
    },
    {
     "t": "note",
     "text": "**Важно:** Test Mode используется только в изолированной лабораторной VM. В реальной атаке BYOVD атакующий **не включает** этот режим - он использует уже подписанный легитимный драйвер с уязвимостью. Именно поэтому BYOVD так опасен: никаких специальных режимов не требуется."
    },
    {
     "t": "p",
     "text": "В выключенной VM переходим в **настройки**"
    },
    {
     "t": "img",
     "src": "/winter/sec/e8c26b1dc0fd.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В **системе** выключаем **Secure boot**"
    },
    {
     "t": "img",
     "src": "/winter/sec/385003258925.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Запускаем VM и открываем **Powershell** от имени администратора:"
    },
    {
     "t": "img",
     "src": "/winter/sec/2cd059c661e1.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Включаем режим тестирования и перезагружаем компьютер:"
    },
    {
     "t": "code",
     "text": "bcdedit /set testsigning yes\nRestart-Computer"
    },
    {
     "t": "img",
     "src": "/winter/sec/e0f7ef900245.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Для выполнения практики **HVCI** должен быть отключён. Если он включён - Windows будет блокировать загрузку нашего тестового драйвера даже в **Test Mode**. Проверим текущий статус:"
    },
    {
     "t": "code",
     "text": "Get-CimInstance -ClassName Win32_DeviceGuard `\n-Namespace root\\Microsoft\\Windows\\DeviceGuard |\nSelect-Object VirtualizationBasedSecurityStatus, `\nCodeIntegrityPolicyEnforcementStatus |\nExport-Csv C:\\Labs\\hvci_status.csv -NoTypeInformation"
    },
    {
     "t": "p",
     "text": "Разбор команды:"
    },
    {
     "t": "ul",
     "items": [
      "**Get-CimInstance** - обращается к **WMI** / **CIM** для получения системной информации",
      "**-ClassName Win32_DeviceGuard** - класс который содержит данные о состоянии **VBS** и **HVCI**",
      "**-Namespace root\\Microsoft\\Windows\\DeviceGuard** - пространство имён где находится этот класс"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/90ee4bfa4079.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Посмотрим результат: Import-Csv C:\\Labs\\hvci_status.csv"
    },
    {
     "t": "img",
     "src": "/winter/sec/c9e7c5be552b.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "note",
     "text": "Расшифровка значений **VirtualizationBasedSecurityStatus**: **0** - VBS отключён **1** - VBS включён но не активен **2** -VBS активен, защита работает\nЕсли значение не равно **2** - система уязвима к **BYOVD** в полной мере."
    },
    {
     "t": "p",
     "text": "Сохраним список всех загруженных драйверов - это базовая точка отсчёта, с которой мы сравним состояние системы после загрузки тестового драйвера:"
    },
    {
     "t": "code",
     "text": "driverquery /v /fo csv | ConvertFrom-Csv |\nSelect-Object \"Module Name\", \"Start Mode\", \"State\", \"Path\" |\nExport-Csv C:\\Labs\\drivers_list.csv -NoTypeInformation"
    },
    {
     "t": "p",
     "text": "Разбор команды:"
    },
    {
     "t": "ul",
     "items": [
      "**driverquery /v /fo csv** - выводит подробный список всех загруженных драйверов в формате CSV",
      "**ConvertFrom-Csv** - преобразует **CSV** -текст в объекты **PowerShell** для удобной фильтрации",
      "**Select-Object** - выбирает только нужные колонки",
      "**Export-Csv** - сохраняет результат в файл. Флаг **-NoTypeInformation** убирает служебную строку из начала **CSV**"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/47a2e86977c9.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Посмотрим результат: `Import-Csv C:\\Labs\\drivers_list.csv | Format-Table -AutoSize`"
    },
    {
     "t": "img",
     "src": "/winter/sec/9ae17bd118f8.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "note",
     "text": "Обратим внимание на колонку **Path**. Все легитимные системные драйверы находятся в **C:\\Windows\\System32\\drivers**. Любой драйвер из другого места - повод для проверки"
    },
    {
     "t": "p",
     "text": "Теперь отфильтруем только те драйверы, которые загружены не из системных папок - именно так выглядит аномалия при реальной атаке:"
    },
    {
     "t": "code",
     "text": "driverquery /v /fo csv | ConvertFrom-Csv |\nWhere-Object {\n$_.\"Path\" -notlike \"*\\Windows\\System32\\*\" -and\n$_.\"Path\" -notlike \"*\\Windows\\SysWOW64\\*\" -and\n$_.\"Path\" -ne \"\"\n} |\nSelect-Object \"Module Name\", \"Start Mode\", \"State\", \"Path\" |\nExport-Csv C:\\Labs\\nonstandard_drivers.csv -NoTypeInformation"
    },
    {
     "t": "p",
     "text": "Разбор команды:"
    },
    {
     "t": "ul",
     "items": [
      "**Where-Object** - фильтрует объекты по условию",
      "**-notlike \"*\\Windows\\System32*\"** - исключает пути содержащие системную папку. Символ * означает любой набор символов",
      "**-and** - оба условия должны выполняться одновременно",
      "**-ne \"\"** - исключает пустые значения пути"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/071b270c9df5.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Посмотрим результат: `Import-Csv C:\\Labs\\nonstandard_drivers.csv`"
    },
    {
     "t": "img",
     "src": "/winter/sec/f6f334fca052.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "note",
     "text": "Легитимные системные драйверы загружаются из **C:\\Windows\\System32\\drivers**. Драйвер загруженный атакующим через **sc.exe** будет находиться в другом месте - это и есть аномалия."
    },
    {
     "t": "p",
     "text": "Загрузим тестовый драйвер:"
    },
    {
     "t": "code",
     "text": "sc.exe create LabTestDrv type= kernel binPath= C:\\Temp\\labtest.sys\nsc.exe start LabTestDrv"
    },
    {
     "t": "p",
     "text": "Разбор команды:"
    },
    {
     "t": "ul",
     "items": [
      "**sc.exe** - утилита управления службами и драйверами Windows",
      "**create LabTestDrv** - создаёт новый сервис с именем **LabTestDrv**",
      "**type= kernel **- указывает что это драйвер режима ядра, а не обычная служба",
      "**binPath= C:\\Temp\\labtest.sys** - путь к файлу драйвера",
      "**start LabTestDrv** - запускает зарегистрированный драйвер"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/3183ccdaa3b6.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь снова поищем драйвера вне системных папок:"
    },
    {
     "t": "code",
     "text": "driverquery /v /fo csv | ConvertFrom-Csv |\nWhere-Object {\n$_.\"Path\" -notlike \"*\\Windows\\System32\\*\" -and\n$_.\"Path\" -notlike \"*\\Windows\\SysWOW64\\*\" -and\n$_.\"Path\" -ne \"\"\n} |\nSelect-Object \"Module Name\", \"Start Mode\", \"State\", \"Path\" |\nExport-Csv C:\\Labs\\nonstandard_drivers.csv -NoTypeInformation\nImport-Csv C:\\Labs\\nonstandard_drivers.csv"
    },
    {
     "t": "img",
     "src": "/winter/sec/8864903030a4.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Проверим подпись драйвера:"
    },
    {
     "t": "code",
     "text": "Get-AuthenticodeSignature C:\\Temp\\labtest.sys |\nSelect-Object Path, Status, SignerCertificate |\nExport-Csv C:\\Labs\\driver_signature.csv -NoTypeInformation\nImport-Csv C:\\Labs\\driver_signature.csv"
    },
    {
     "t": "img",
     "src": "/winter/sec/e591ab25735e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "note",
     "text": "**Get-AuthenticodeSignature** проверяет цифровую подпись файла и возвращает информацию о сертификате и статусе подписи. Возможные статусы: **Valid** - подпись валидна, **NotSigned** - файл не подписан, **UnknownError** - подпись есть но сертификат не доверенный (Именно такие сертификаты у нас используется в практике)"
    },
    {
     "t": "p",
     "text": "Выгрузим тестовый драйвер:"
    },
    {
     "t": "ul",
     "items": [
      "Остановим работающий драйвер: `sc.exe stop LabTestDrv`",
      "Удалим регистрацию сервиса из системы: `sc.exe delete LabTestDrv`"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/449e0ac5eae6.webp",
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
     "text": "После выполнения обеих частей практики запустите файл[Checker_Guide_case_Drivers.exe](https://storage.ptsecurity.com/seafhttp/f/23179942fb364b18bef9/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
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
   "text": "После выполнения обеих частей практики запустите файл[Checker_Guide_case_Drivers.exe](https://storage.ptsecurity.com/seafhttp/f/23179942fb364b18bef9/?op=view) от имени администратора в **PowerShell** на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
