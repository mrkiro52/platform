// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_3.7 - Сетевой стек",
 "intro": null,
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Для выполнения данной практики необходимо скачать [OVA-образ](https://storage.ptsecurity.com/seafhttp/f/cc138432c0754faab4d5/?op=view) виртуальной машины, заготовленной Positive Technologies. У данной виртуальной машины должен быть 1 сетевой адаптер VirtualBox в режиме NAT Network. Также понадобится Debian. На виртуальной машине Windows должен стоять ip **192.168.0.109**"
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
     "text": "Дополнительные файлы:"
    },
    {
     "t": "ul",
     "items": [
      "[brute.sh](https://storage.ptsecurity.com/seafhttp/f/701f1c179a95413f8526/?op=view)",
      "[rdp_dict.txt](https://storage.ptsecurity.com/seafhttp/f/af547b42b3ac491db81f/?op=download)"
     ]
    },
    {
     "t": "p",
     "text": "**Цель практики:** настройка RDP и WinRM на Windows 11 с дальнейшей проверкой работы политики **Account Lockout Policy** с помощью брутфорс-атаки"
    },
    {
     "t": "h3",
     "text": "Настройка удалённого доступа"
    },
    {
     "t": "p",
     "text": "**Включение RDP через классическую оснастку**"
    },
    {
     "t": "p",
     "text": "Откроем на **Windows 11** диалог **Run** сочетанием **Win + R**, введём **sysdm.cpl** и нажмём **Enter**"
    },
    {
     "t": "img",
     "src": "/winter/sec/795c68e39ebe.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Откроется окно **System Properties** - перейдём на вкладку **Remote**. В блоке **Remote Desktop** переключим радиокнопку в положение **Allow remote connections to this computer**. Сразу под ней установите флажок **Allow connections only from computers running Remote Desktop with Network Level Authentication (recommended)** - это включает **NLA**, без которой подключение к серверу будет инициировать тяжёлый графический стек до подтверждения учётных данных. Подтвердите изменения кнопкой **Apply**"
    },
    {
     "t": "img",
     "src": "/winter/sec/558b9e615724.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В этом же окне нажмём кнопку **Select Users** - откроется отдельное окно **Remote Desktop Users**. По умолчанию через **RDP** могут заходить только члены локальной группы **Administrators**; для делегирования удалённого входа обычным учётным записям нужно либо добавить их сюда индивидуально, либо добавить специально созданную группу. Группу мы создадим чуть ниже через **PowerShell**, поэтому пока окно закроем кнопкой **OK**"
    },
    {
     "t": "img",
     "src": "/winter/sec/cacc7f771b7a.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "После применения настроек **Windows** автоматически открывает порт **TCP 3389** в **Windows Defender Firewall** для текущего сетевого профиля и регистрирует встроенные правила группы **Remote Desktop**. Это можно проверить в командной строке - этим займёмся в следующем подразделе."
    },
    {
     "t": "p",
     "text": "**RDP через PowerShell и реестр**"
    },
    {
     "t": "p",
     "text": "То же самое, что мы только что сделали через **GUI**, можно сделать через ключи реестра. Это нужно знать, чтобы автоматизировать настройку **RDP** на десятках машин одной командой и чтобы понимать, какие именно параметры система меняет под капотом."
    },
    {
     "t": "p",
     "text": "Главный ключ - **fDenyTSConnections** в ветке **HKLM\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server**. Значение **0** означает \"удалённые подключения разрешены\", **1** - \"запрещены\". Параметр **UserAuthentication** в подключе **WinStations\\RDP-Tcp** включает (**1**) или отключает (**0**) требование **NLA**."
    },
    {
     "t": "p",
     "text": "Выполним:"
    },
    {
     "t": "code",
     "text": "Set-ItemProperty -Path \"HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\" `\n-Name \"fDenyTSConnections\" -Value 0\nSet-ItemProperty -Path \"HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp\" `\n-Name \"UserAuthentication\" -Value 1"
    },
    {
     "t": "img",
     "src": "/winter/sec/97d11a83fb74.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Сразу проверим, что значения записаны:"
    },
    {
     "t": "code",
     "text": "(Get-ItemProperty -Path \"HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\").fDenyTSConnections\n(Get-ItemProperty -Path \"HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp\").UserAuthentication"
    },
    {
     "t": "img",
     "src": "/winter/sec/65375215a169.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Первая команда должна вернуть **0**, вторая - **1**."
    },
    {
     "t": "p",
     "text": "После активации **RDP** перезагрузим виртуальную машину."
    },
    {
     "t": "p",
     "text": "Откроем терминал проверьте порт **TCP 3389**: `Get-NetTCPConnection -LocalPort 3389 -State Listen`"
    },
    {
     "t": "img",
     "src": "/winter/sec/eaf340591fa2.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе должна появиться строка с **LocalAddress 0.0.0.0** или **::** и **State Listen** - это значит, что система ждёт входящих подключений со всех сетевых интерфейсов. Дополнительно убедимся, что правила брандмауэра для **RDP** включены:"
    },
    {
     "t": "code",
     "text": "Enable-NetFirewallRule -DisplayGroup \"Remote Desktop\"\nGet-NetFirewallRule -DisplayGroup \"Remote Desktop\" | Select-Object DisplayName, Enabled, Direction, Action"
    },
    {
     "t": "img",
     "src": "/winter/sec/77fd5bd8a3c4.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе должны быть несколько правил **Remote Desktop - User Mode (TCP-In)**, **Remote Desktop - User Mode (UDP-In)** и связанные, все со значением **Enabled = True** и **Action = Allow**."
    },
    {
     "t": "p",
     "text": "**Группа удалённого доступа и пользователь rdpuser**"
    },
    {
     "t": "p",
     "text": "Создадим локального пользователя **rdpuser** с заранее известным паролем **rdpuser** - этот же пароль будет лежать на позиции 25 в словаре, по которому мы будем запускать брутфорс. Пароль передаётся объектом **SecureString**:"
    },
    {
     "t": "code",
     "text": "$Password = ConvertTo-SecureString \"rdpuser\" -AsPlainText -Force\nNew-LocalUser -Name \"rdpuser\" `\n    -FullName \"RDP Test User\" `\n    -Password $Password `\n    -PasswordNeverExpires `\n    -AccountNeverExpires"
    },
    {
     "t": "img",
     "src": "/winter/sec/dd511d2c411c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Затем создадим локальную группу **LabRemoteUsers** для делегирования удалённого доступа и добавьте в неё **rdpuser**:"
    },
    {
     "t": "code",
     "text": "New-LocalGroup -Name \"LabRemoteUsers\" -Description \"Users allowed to connect via RDP\"\nAdd-LocalGroupMember -Group \"LabRemoteUsers\" -Member \"rdpuser\""
    },
    {
     "t": "img",
     "src": "/winter/sec/b8c8871cabc1.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь нужно дать самой группе **LabRemoteUsers** право удалённого входа. Это делается двумя независимыми операциями: добавление в встроенную группу **Remote Desktop Users** (это даёт право на запуск **RDP**-сессии) и - если включена политика **Allow log on through Remote Desktop Services** на конкретные группы - добавление туда же. Для нашего стенда достаточно первого: `Add-LocalGroupMember -Group \"Remote Desktop Users\" -Member \"LabRemoteUsers\"`"
    },
    {
     "t": "p",
     "text": "Проверим, что вложенность сработала:"
    },
    {
     "t": "code",
     "text": "Get-LocalGroupMember -Group \"Remote Desktop Users\"\nGet-LocalGroupMember -Group \"LabRemoteUsers\""
    },
    {
     "t": "img",
     "src": "/winter/sec/473217db1cb7.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе первой команды должна быть группа **<имя_компьютера>\\LabRemoteUsers**, во второй - пользователь **<имя_компьютера>\\rdpuser**."
    },
    {
     "t": "h3",
     "text": "WinRM через PSRemoting"
    },
    {
     "t": "p",
     "text": "**WinRM** на современной **Windows 11** не включён по умолчанию для произвольных сетевых профилей - его нужно активировать. Это делает командлет **Enable-PSRemoting**, который одной командой настраивает службу **WinRM**, открывает правила брандмауэра и регистрирует слушатель **HTTP** на порту **5985**:"
    },
    {
     "t": "code",
     "text": "Set-NetConnectionProfile -NetworkCategory Private\nEnable-PSRemoting -Force"
    },
    {
     "t": "img",
     "src": "/winter/sec/8b25bda953a1.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Флаг **-Force** подавляет интерактивные подтверждения. Сразу после выполнения убедимся, что слушатель действительно поднялся: `Get-ChildItem -Path WSMan:\\localhost\\Listener\\ `"
    },
    {
     "t": "img",
     "src": "/winter/sec/6f66340851a1.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе должна быть как минимум одна запись с **Keys**, содержащим **Transport=HTTP** и **Port=5985**."
    },
    {
     "t": "p",
     "text": "Финальная проверка - попробовать подключиться к **WinRM** локально через **Test-WSMan**: `Test-WSMan -ComputerName localhost`"
    },
    {
     "t": "img",
     "src": "/winter/sec/66ab876bd49b.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе появится **wsmid** и **ProductVersion** - это значит, что служба отвечает по протоколу **WS-Management**. Дополнительно можно выполнить локальную команду через **WinRM**: `Invoke-Command -ComputerName localhost -ScriptBlock { hostname; whoami }  `"
    },
    {
     "t": "img",
     "src": "/winter/sec/4fa8467bc9e2.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Команда выполнится через **PSRemoting**-канал и вернёт имя компьютера и текущую учётную запись. Это доказывает, что **WinRM** не просто слушает порт, но и полноценно принимает удалённые команды."
    },
    {
     "t": "p",
     "text": "В этой практике используется **HTTP**-слушатель на **5985**. В реальной инфраструктуре правильнее использовать **HTTPS** на **5986** с привязкой к сертификату - это снимает риск перехвата трафика **WinRM**-сессии в открытом виде. Настройка **HTTPS**-слушателя требует отдельного сертификата и относится к смежной теме инфраструктуры сертификатов; здесь мы её не разбираем. Также упомянем, что в **PowerShell 7+** появилась альтернатива - **PSRemoting over SSH** через встроенный **OpenSSH**-сервер **Windows 11**, который тоже даёт защищённый канал управления, но требует отдельной настройки **OpenSSH**."
    },
    {
     "t": "p",
     "text": "Узнаем **IP**-адрес **Windows**-машины во внутренней сети для подключения с **Debian**: `Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike 'Loopback' -and $_.IPAddress -notlike '169.*' } | Select-Object InterfaceAlias, IPAddress  `"
    },
    {
     "t": "img",
     "src": "/winter/sec/50300af2f650.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Запишем адрес второго адаптера (мост) - он понадобится в следующих подразделах. Для примера далее используется **192.168.0.101**."
    },
    {
     "t": "h3",
     "text": "Подготовка машины на Debian"
    },
    {
     "t": "p",
     "text": "Переключитесь на **Debian 12**. Откроем терминал и установим **FreeRDP 2.10.x** из стандартного репозитория:"
    },
    {
     "t": "code",
     "text": "sudo apt update\nsudo apt install -y freerdp2-x11\ndpkg -l | grep freerdp2-x11\nxfreerdp /version"
    },
    {
     "t": "p",
     "text": "Команда **xfreerdp /version** должна вывести строку вида **This is FreeRDP version 2.10.0** или близкую (2.10.x)"
    },
    {
     "t": "p",
     "text": "Узнаем **IP**-адрес самой **Debian**-машины во внутренней сети - он нам не нужен для подключения, но пригодится, чтобы понимать топологию: `ip -4 addr show | grep inet`"
    },
    {
     "t": "img",
     "src": "/winter/sec/23a242c9f626.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Проверим связь до **Windows**-машины обычным **ping**: `ping -c 4 192.168.0.101`"
    },
    {
     "t": "img",
     "src": "/winter/sec/f72e4700fe02.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Если ответы приходят, связь установлена."
    },
    {
     "t": "p",
     "text": "**Sanity-check одиночного RDP-подключения**"
    },
    {
     "t": "p",
     "text": "Прежде чем запускать брутфорс по словарю, убедимся, что **xfreerdp** под **NLA** успешно проходит аутентификацию с правильным паролем. Это маленькая, но критически важная проверка: без неё мы не сможем отличить ситуацию \"брутфорс работает, lockout сработал на 10-й попытке\" от ситуации \"стенд не настроен, xfreerdp падает на **CredSSP**\". Выполним на **Debian**: `xfreerdp /v:192.168.0.101 /u:rdpuser /p:'rdpuser' /cert:ignore /sec:nla +auth-only`"
    },
    {
     "t": "img",
     "src": "/winter/sec/41b8801b1f66.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Разбор флагов:"
    },
    {
     "t": "ul",
     "items": [
      "**/v** - адрес целевой машины",
      "**/u** - имя пользователя",
      "**/p** - пароль",
      "**/cert:ignore** - игнорировать самоподписанный сертификат сервера; в учебном стенде это нормально",
      "**/sec:nla** - принудительно использовать **NLA** через **CredSSP** , отключая откат на старые протоколы",
      "**+auth-only** - выполнить только аутентификацию и завершиться, не открывая графическое окно сессии"
     ]
    },
    {
     "t": "p",
     "text": "При успешной аутентификации в выводе будет строка **[INFO][com.freerdp.client.x11] - Authentication only**. Это означает, что **CredSSP**-туннель установлен, учётные данные проверены, и сессия успешно бы открылась"
    },
    {
     "t": "h3",
     "text": "Брутфорс RDP и роль Account Lockout Policy"
    },
    {
     "t": "p",
     "text": "**Проверка дефолтной защиты Account Lockout Policy**"
    },
    {
     "t": "p",
     "text": "Прежде чем что-либо отключать, убедимся, что **Account Lockout Policy** на **Windows 11** действительно работает в дефолте. Начиная со сборки **22528** все четыре параметра политики блокировки включены штатно: **Account lockout threshold** = **10 invalid sign-in attempts**, **Account lockout duration** = **10 minutes**, **Reset account lockout counter after** = **10 minutes**, **Allow Administrator account lockout** = **Enabled**."
    },
    {
     "t": "p",
     "text": "Откроем оснастку **secpol.msc** через **Win + R** -> **secpol.msc** -> **OK**. В левой панели разверните **Account Policies** -> **Account Lockout Policy**. В правой панели мы увидми четыре пункта с их текущими значениями."
    },
    {
     "t": "p",
     "text": "Подтвердим то же самое в **PowerShell**: `net accounts`"
    },
    {
     "t": "img",
     "src": "/winter/sec/f2749274249c.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе будет блок, в котором значимые для нас строки - **Lockout threshold**, **Lockout duration (minutes)** и **Lockout observation window (minutes)**. Соответствующие значения - **10**, **10** и **10**. На современной **Windows 11** это и есть штатная защита от брутфорса."
    },
    {
     "t": "p",
     "text": "**Контролируемый брутфорс с включённой защитой**"
    },
    {
     "t": "p",
     "text": "Переключимся на **Debian**. Поместим рядом с домашним каталогом два файла: словарь **rdp_dict.txt** и скрипт **brute.sh** (оба скачаны со страницы практики). Сделайте скрипт исполняемым: `chmod +x brute.sh`"
    },
    {
     "t": "img",
     "src": "/winter/sec/db1d2f536259.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Содержимое **brute.sh** простое и прозрачное:"
    },
    {
     "t": "code",
     "text": "#!/bin/bash\nTARGET=\"192.168.0.101\"\nUSER=\"rdpuser\"\nDICT=\"rdp_dict.txt\"\n\ni=0\nwhile IFS= read -r pwd; do\n    i=$((i+1))\n    echo \"[*] Attempt #$i: trying password '$pwd'\"\n    xfreerdp /v:$TARGET /u:$USER /p:\"$pwd\" /cert:ignore /sec:nla +auth-only >/dev/null 2>&1\n    rc=$?\n    if [ $rc -eq 0 ]; then\n        echo \"[+] SUCCESS on attempt #$i: password is '$pwd'\"\n        echo \"Success on attempt $i: $pwd\" > /tmp/rdp_success.txt\n        exit 0\n    fi\ndone < \"$DICT\"\n\necho \"[-] Dictionary exhausted without success\"\nexit 1"
    },
    {
     "t": "p",
     "text": "Скрипт читает словарь построчно, на каждой строке пробует подключиться через **xfreerdp** в режиме **+auth-only**, проверяет exit code. Код **0** означает успешную аутентификацию - скрипт пишет файл-маркер на стороне **Debian** и выходит. Любой ненулевой код означает либо неверный пароль, либо блокировку - скрипт продолжает перебор. Запустим: `./brute.sh`"
    },
    {
     "t": "img",
     "src": "/winter/sec/0952f8959b81.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "На экране мы увидим последовательные попытки: **Attempt #1**, **Attempt #2** и так далее. Каждая попытка занимает несколько секунд - **CredSSP**-handshake небыстрый. После **10**-й неудачной попытки **Windows** регистрирует превышение **Account lockout threshold** и блокирует **rdpuser**. С **11**-й попытки мы не сможем сбрутить RDP уже не из-за неверного пароля, а из-за блокировки учётной записи - даже если в словаре дальше встретится правильный пароль, аутентификация не пройдёт. Через какое-то время **brute.sh** дойдёт до конца словаря и сообщит **Dictionary exhausted without success**."
    },
    {
     "t": "p",
     "text": "Переключимся на **Windows** и зафиксируем состояние блокировки: `net user rdpuser`"
    },
    {
     "t": "img",
     "src": "/winter/sec/7ce8f41820c1.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе обратите внимание на две строки:"
    },
    {
     "t": "p",
     "text": "**Account active** - **Locked**."
    },
    {
     "t": "p",
     "text": "Это первый ключевой вывод практики: **штатная Account Lockout Policy полностью блокирует брутфорс**. Без отключения защиты атакующий упирается в блокировку через 10 попыток, а далее ему остаётся только ждать 10 минут или искать другие векторы."
    },
    {
     "t": "p",
     "text": "**Уязвимая конфигурация: отключение lockout**"
    },
    {
     "t": "p",
     "text": "Теперь намеренно создадим уязвимую конфигурацию - чтобы увидеть, во что превращается брутфорс без защиты. Отключим блокировку через **net accounts**: `net accounts /lockoutthreshold:0`"
    },
    {
     "t": "p",
     "text": "Значение **0** означает \"учётные записи не блокируются никогда\". Разблокируем **rdpuser**, чтобы она снова смогла принимать попытки аутентификации: `net user rdpuser /active:yes`"
    },
    {
     "t": "img",
     "src": "/winter/sec/9ce33f9a9325.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Повторный брутфорс без защиты**"
    },
    {
     "t": "p",
     "text": "Вернёмся на **Debian** и снова запустите **brute.sh**: `./brute.sh`"
    },
    {
     "t": "p",
     "text": "На этот раз ничто не останавливает перебор. На каждой неудачной попытке **xfreerdp** возвращает ошибку, скрипт пробует следующий пароль. На **25**-й попытке в словаре окажется правильный пароль **rdpuser**, туннель установится, **xfreerdp** вернёт **0**, и скрипт напечатает **[+] SUCCESS on attempt #25: password is 'rdpuser'**. Файл-маркер на стороне **Debian** появится в **/tmp/rdp_success.txt**"
    },
    {
     "t": "img",
     "src": "/winter/sec/8ade91abecc9.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь, имея найденный пароль, подключитесь к **rdpuser** полноценно, чтобы получить рабочий стол: `xfreerdp /v:192.168.0.109 /u:rdpuser /p:'rdpuser' /cert:ignore /sec:nla /size:800x600`"
    },
    {
     "t": "img",
     "src": "/winter/sec/7a55f8b274ed.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Откроется отдельное окно с графическим рабочим столом **Windows 11** под учётной записью **rdpuser**. На этом моменте атакующий получил полноценный интерактивный вход - именно это и есть та угроза, ради демонстрации которой брутфорс воспроизводится."
    },
    {
     "t": "p",
     "text": "**Возврат строгой защиты**"
    },
    {
     "t": "p",
     "text": "Завершим **RDP**-сессию **rdpuser** (Close на окне **xfreerdp**) и вернёмся в основную консоль **Windows** под административной учётной записью. Восстановим **Account Lockout Policy**, но **строже дефолта** - порог 5 попыток, длительность 1440 минут, окно сброса счётчика 1440 минут. Это и будет финальное состояние системы: `net accounts /lockoutthreshold:5 /lockoutduration:1440 /lockoutwindow:1440  `"
    },
    {
     "t": "p",
     "text": "Проверим результат: `net accounts`"
    },
    {
     "t": "img",
     "src": "/winter/sec/a0a9a32f45fa.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В выводе должно быть **Lockout threshold = 5**, **Lockout duration (minutes) = 1440**, **Lockout observation window (minutes) = 1440**."
    },
    {
     "t": "h3",
     "text": "Что показала демонстрация и как защищать RDP в инфраструктуре"
    },
    {
     "t": "p",
     "text": "Атака, которую мы только что воспроизвели, классифицируется **MITRE ATT&CK** как **T1110.001** - **Brute Force: Password Guessing**. Её эффективность напрямую зависит от настройки защиты на стороне сервера. Когда **Account Lockout Policy** включена со здравыми параметрами, атакующий получает не более 5 попыток на учётную запись за окно сброса счётчика - перебор по словарю на 60 строк практически бесполезен. Когда политика отключена, тот же словарь добивает до правильного пароля за несколько минут, и атакующий получает рабочий стол."
    },
    {
     "t": "p",
     "text": "В реальной инфраструктуре для **RDP** придерживайтесь нескольких базовых принципов. Не выставляйте порт **3389** в публичный интернет напрямую - подключения должны идти либо через **VPN**, либо через **Remote Desktop Gateway** (компонент **Remote Desktop Services**, который проксирует **RDP** через **HTTPS**). Держим **Account Lockout Policy** включённой с порогом **5-10** попыток и окном сброса **15-30** минут - этого хватает, чтобы остановить любые автоматизированные подборщики. **NLA** обязательна на всех узлах: она снимает с сервера нагрузку графического стека до подтверждения учётных данных и делает невозможными атаки на старые уязвимости вроде **BlueKeep**. Смена дефолтного порта **3389** через ключ **PortNumber** в **HKLM\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp** не панацея, но отсекает массовые сканирующие ботнеты, которые проверяют только стандартный порт. Ограничим подключения по списку **IP** через **Windows Defender Firewall** - адреса администраторов известны, всё лишнее можно блокировать на уровне сети. И сделаем мониторинг **Event ID 4625** в журнале **Security**: каждое неудачное подключение по **RDP** генерирует это событие с полем **LogonType = 10** (**RemoteInteractive**) - всплеск таких событий с одного **IP** должен триггерить алерт ещё до того, как сработает lockout policy. Детальный разбор работы с журналами и **Event Viewer**."
    },
    {
     "t": "p",
     "text": "Для управления через **WinRM** придерживайтесь аналогичных правил: **HTTPS**-слушатель на **5986** вместо **HTTP5985**, ограничение по **IP**, мониторинг логов **Microsoft-Windows-WinRM/Operational**. Если есть возможность - используйте **PSRemoting over SSH** через встроенный **OpenSSH**-сервер **Windows 11** как альтернативный защищённый транспорт, особенно для гетерогенных сред с **Linux**-серверами."
    }
   ]
  },
  {
   "id": "s2",
   "title": "Вопрос",
   "blocks": [
    {
     "t": "p",
     "text": "После выполнения обеих частей практики запустите файл [checker_practice_RDP.exe](https://storage.ptsecurity.com/seafhttp/f/174d15147422455d89e9/?op=download) от имени администратора в PowerShell на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
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
   "text": "После выполнения обеих частей практики запустите файл [checker_practice_RDP.exe](https://storage.ptsecurity.com/seafhttp/f/174d15147422455d89e9/?op=download) от имени администратора в PowerShell на Windows-машине - он выдаст уникальную строку символов для ответа. Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
