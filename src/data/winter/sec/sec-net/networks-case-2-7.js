// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_2.7 - VLAN",
 "intro": null,
 "sections": [
  {
   "id": "s1",
   "title": "Стенд / введение",
   "blocks": [
    {
     "t": "p",
     "text": "Создадим виртуальную инфраструктуру в соответствии со схемой ниже:"
    },
    {
     "t": "img",
     "src": "/winter/sec/d033f48fcad4.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Виртуальная инфраструктура состоит из:**"
    },
    {
     "t": "ol",
     "items": [
      "Первый коммутатор ( **MikroTik1** ) с адресом 192.168.1.1/24",
      "Второй коммутатор ( **MikroTik2** ) с адресом 192.168.1.2/24",
      "Третий коммутатор ( **MikroTik3** ) с адресом 192.168.1.3/24",
      "Подсети 1, подключенной к MikroTik1",
      "Подсети 2, подключенной к MikroTik2",
      "Подсети 3, подключенной к MikroTik3"
     ]
    },
    {
     "t": "p",
     "text": "Для выполнения данного кейса необходимо скачать новый или клонировать ранее скачанный **OVA-образ** виртуальной Debian-машины, заготовленной Positive Technologies. В данном образе уже есть предустановленный набор программного обеспечения, а скачать его можно по [данной ссылке](https://storage.ptsecurity.com/seafhttp/f/b4275685f64849189a2a/?op=view)"
    },
    {
     "t": "note",
     "text": "**Сетевой мост** - программная функция, объединяющая несколько сегментов локальной сети в **единую сеть**.\n**Широковещательный шторм** - это состояние сети, при котором из-за петель или неконтролируемой рассылки широковещательных кадров происходит увеличение трафика, приводящее к перегрузке сети и отказу в обслуживании.\n**Время сходимости** - это время, за которое сеть после изменения топологии пересчитывает дерево и восстанавливает корректную работу без петель."
    },
    {
     "t": "h3",
     "text": "Настройка широковещательного домена"
    },
    {
     "t": "p",
     "text": "Настроим сетевые интерфейсы и их адреса в соответствии со схемой и таблицей ниже:"
    },
    {
     "t": "table",
     "headers": [
      "",
      "MikroTik1",
      "MikroTik2",
      "MikroTik3",
      "Subnet1",
      "Subnet2",
      "Subnet3"
     ],
     "rows": [
      [
       "MikroTik1",
       "-",
       "intnet12",
       "intnet31",
       "intnetsub1",
       "-",
       "-"
      ],
      [
       "MikroTik2",
       "intnet12",
       "-",
       "intnet23",
       "-",
       "intnetsub2",
       "-"
      ],
      [
       "MikroTik3",
       "intnet31",
       "intnet23",
       "-",
       "-",
       "-",
       "intnetsub3"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Затем на каждом коммутаторе создадим сетевые мосты и объединим в них все соответствующие кабели (в каждом по три штуки). А затем назначим каждому мосту IP-адрес."
    },
    {
     "t": "p",
     "text": "MikroTik1:"
    },
    {
     "t": "ol",
     "items": [
      "`/interface bridge add name=br1 disabled=no protocol-mode=none` - создает сетевой мост br1",
      "`/interface bridge port add bridge=br1 interface=ether1 ` - добавляет ether1 в мост br1",
      "`/interface bridge port add bridge=br1 interface=ether2` - добавляет ether2 в мост br1",
      "`/interface bridge port add bridge=br1 interface=ether3` - добавляет ether3 в мост br1",
      "`/ip address add address=192.168.1.1/24 interface=br1` - назначает IP-адрес мосту br1"
     ]
    },
    {
     "t": "p",
     "text": "MikroTik2:"
    },
    {
     "t": "ol",
     "items": [
      "`/interface bridge add name=br1 disabled=no protocol-mode=none`",
      "`/interface bridge port add bridge=br1 interface=ether1`",
      "`/interface bridge port add bridge=br1 interface=ether2`",
      "`/interface bridge port add bridge=br1 interface=ether3`",
      "`/ip address add address=192.168.1.2/24 interface=br1`"
     ]
    },
    {
     "t": "p",
     "text": "MikroTik3:"
    },
    {
     "t": "ol",
     "items": [
      "`/interface bridge add name=br1 disabled=no protocol-mode=none`",
      "`/interface bridge port add bridge=br1 interface=ether1`",
      "`/interface bridge port add bridge=br1 interface=ether2`",
      "`/interface bridge port add bridge=br1 interface=ether3`",
      "`/ip address add address=192.168.1.3/24 interface=br1`"
     ]
    },
    {
     "t": "p",
     "text": "Теперь спровоцируем шторм, применив команду `ping 192.168.1.3` с первого коммутатора на третий. Для того чтобы продемонстрировать нагрузку на сетевом мосте, включим мониторинг трафика командой `interface monitor-traffic br1` на MikroTik3 и MikroTik2, как показано далее."
    },
    {
     "t": "img",
     "src": "/winter/sec/143cc6b23cb2.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "На скриншоте видно, что ICMP-пакеты на первом роутере иногда не доходят, вызывая ошибку **timeout**, а также скорость ответа растет со временем, от 3 мс до 27 мс. Наличие шторма подтверждает и мониторинг, показывая максимально 1472 пакетов в секунду, что для трех устройств явно многовато. Пока наша сеть не упала, отключим мост командой `/interface bridge disable br1`."
    },
    {
     "t": "h3",
     "text": "Локализация путем VLAN-сегментации"
    },
    {
     "t": "p",
     "text": "Для локализации шторма мы создадим два VLAN-сегмента (10 и 20), а также настроим access и trunk порты, чтобы локализовать шторм. Произведем необходимые настройки на коммутаторах."
    },
    {
     "t": "p",
     "text": "Первый коммутатор:"
    },
    {
     "t": "ol",
     "items": [
      "`/interface bridge port set [find interface=ether3] pvid=10` - назначает ether3 VLAN ID 10",
      "`/interface vlan add name=vlan10 interface=br1 vlan-id=10` - создает VLAN-интерфейс vlan10",
      "`/ip address set [find interface=br1] interface=vlan10` - переносит IP-адрес с br1 на vlan10",
      "`/interface bridge vlan add bridge=br1 vlan-ids=10 tagged=br1,ether1,ether2 untagged=ether3` - настраивает VLAN 10 с trunk- и access-портами",
      "`/interface bridge vlan add bridge=br1 vlan-ids=20 tagged=br1,ether1,ether2` - разрешает VLAN 20 на trunk-портах",
      "`/interface bridge enable br1` - включает мост br1",
      "`/interface bridge set br1 vlan-filtering=yes` - включает фильтрацию VLAN на мосту"
     ]
    },
    {
     "t": "p",
     "text": "Второй коммутатор:"
    },
    {
     "t": "ol",
     "items": [
      "`/interface bridge port set [find interface=ether3] pvid=10`",
      "`/interface vlan add name=vlan10 interface=br1 vlan-id=10`",
      "`/ip address set [find interface=br1] interface=vlan10`",
      "`/interface bridge vlan add bridge=br1 vlan-ids=10 tagged=br1,ether1,ether2 untagged=ether3`",
      "`/interface bridge vlan add bridge=br1 vlan-ids=20 tagged=br1,ether1,ether2`",
      "`/interface bridge enable br1`",
      "`/interface bridge set br1 vlan-filtering=yes`"
     ]
    },
    {
     "t": "p",
     "text": "Третий коммутатор:"
    },
    {
     "t": "ol",
     "items": [
      "`/interface bridge port set [find interface=ether3] pvid=20`",
      "`/interface vlan add name=vlan20 interface=br1 vlan-id=20`",
      "`/ip address set [find interface=br1] interface=vlan20`",
      "`/interface bridge vlan add bridge=br1 vlan-ids=10 tagged=br1,ether1,ether2`",
      "`/interface bridge vlan add bridge=br1 vlan-ids=20 tagged=br1,ether1,ether2 untagged=ether3`",
      "`/interface bridge enable br1`",
      "`/interface bridge set br1 vlan-filtering=yes`"
     ]
    },
    {
     "t": "p",
     "text": "Аналогично применяем утилиту **ping** с MikroTik1 на MikroTik2, так как на третий коммутатор уже недоступен, ведь теперь он в другом VLAN-сегменте. Теперь на интерфейсах второго устройства (**ether1**) и третьего (**ether3**) одновременно запускаем мониторинг (`interface monitor-traffic <наименование интерфейса>`), как показано ниже."
    },
    {
     "t": "img",
     "src": "/winter/sec/b53e6355ebae.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь ситуация внутри инфраструктуры изменилась. Можно отчетливо увидеть, что внутри сегмента 20 количество пакетов (параметр - **rx-packets-per-second**) снизилось, но все равно еще выше нормы, при этом на интерфейсе MikroTik3 этот параметр равен 0, так как его access порт не пропускает трафик."
    },
    {
     "t": "h3",
     "text": "Устранение шторма протоколом STP"
    },
    {
     "t": "p",
     "text": "На третьем этапе мы полностью излечим сеть от шторма, включив протокол STP. Для этого применим следующую команду на каждом устройстве."
    },
    {
     "t": "ol",
     "items": [
      "MikroTik1 - `/interface bridge set br1 protocol-mode=stp`",
      "MikroTik2 - `/interface bridge set br1 protocol-mode=stp`",
      "MikroTik3 - `/interface bridge set br1 protocol-mode=stp`"
     ]
    },
    {
     "t": "p",
     "text": "Для того чтобы закрепить роль root-коммутатора строго за MikroTik3 командой `/interface bridge set br1 priority=0x1000`, а на остальных введем другую команду `/interface bridge set [find] priority=0x8000`. Затем запустим **ping** с первого на второй коммутатор, как делали прежде, а также включаем мониторинг br1 на остальных коммутаторах."
    },
    {
     "t": "p",
     "text": "После применения настроек видно, что ошибка **timeout** полностью исчезла, а параметр **time** стал в пределах 2 миллисекунд. Количество пакетов в секунду со значения 1472 опустилось до 1."
    },
    {
     "t": "h3",
     "text": "Сравнение STP и RSTP"
    },
    {
     "t": "p",
     "text": "Для начала убедимся, что MikroTik3 является главным коммутатором (параметр - root-bridge), а также определим root-порты на устройствах (параметр - root-port), с помощью применения команды `interface bridge monitor br1`, как это сделано на изображении дальше."
    },
    {
     "t": "img",
     "src": "/winter/sec/ef7eba5aafb8.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Из скриншота видно, что третий коммутатор, как и задумывалось **root**, а на первом и втором root-портами являются интерфейсы **ether2**. Для того чтобы увидеть время схождение топологии, запустим **ping** с MikroTik1 на MikroTik2, параллельно выполнив перезагрузку **ether2** на MikroTik2, применив последовательно команды:"
    },
    {
     "t": "ol",
     "items": [
      "`interface disable ether2`",
      "`interface enable ether2`"
     ]
    },
    {
     "t": "p",
     "text": "В момент перезагрузки утилита **ping** будет выдавать ошибки **timeout**, так как время перестроения топологии STP составляет 30–50 секунд. Соответственно, в этот промежуток времени часть пакетов будет теряться из-за отсутствия корректного маршрута передачи, что показано ниже."
    },
    {
     "t": "img",
     "src": "/winter/sec/5f0d47e2286d.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Можем увидеть, что при перезагрузке интерфейса **ether2** доступность узла упала, потому что в это время происходит перестроение топологии протоколом STP. Теперь выполним аналогичную перезагрузку интерфейса, но перед этим заменим протокол STP на RSTP следующими командами:"
    },
    {
     "t": "ol",
     "items": [
      "MikroTik1 - `/interface bridge set br1 protocol-mode=rstp`",
      "MikroTik2 - `/interface bridge set br1 protocol-mode=rstp`",
      "MikroTik3 - `/interface bridge set br1 protocol-mode=rstp`"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/87be7edbb900.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "В случае с использованием RSTP, можем увидеть, что доступность не прерывалась, так как эта версия протокола связующего дерева перестраивает топологию быстрее."
    },
    {
     "t": "h3",
     "text": "Подготовка к проверке"
    },
    {
     "t": "p",
     "text": "В данном кейсе для проверки необходимо подключить Debian-машину в **Подсеть 3** и настроить ее сетевой интерфейс **enp0s3**, так чтобы был доступ до коммутатора **MikroTik3**. Какие настройки файла **/etc/network/interfaces** показано далее."
    },
    {
     "t": "code",
     "text": "allow-hotplug enp0s3\niface enp0s3 inet static\n\taddress 192.168.1.10\n\tnetmask 255.255.255.0\n\tgateway 192.168.1.3"
    },
    {
     "t": "p",
     "text": "Затем на коммутаторе проверим работающие сервисы командой `ip service print`."
    },
    {
     "t": "img",
     "src": "/winter/sec/14b2f4992183.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Важно проверить отсутствие символа **X** перед сервисом **ssh**, если по каким-то причинам символ присутствует, то выполните команду `ip service enable ssh`. Затем выполним команду `ip service disable telnet`, чтобы отключить небезопасный протокол **telnet**. Итоговый список сервисов и их состояний должен выглядеть так:"
    },
    {
     "t": "img",
     "src": "/winter/sec/cef9fede39a5.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Заключительным этапом установите пароль **pt-3dt3chl@b** для пользователя **admin** на коммутаторе с помощью команды `user set admin password=pt-3dt3chl@b`"
    }
   ]
  },
  {
   "id": "s2",
   "title": "Вопрос",
   "blocks": [
    {
     "t": "p",
     "text": "Мы настроили сегментацию сети с помощью **VLAN**, а также использовали протоколы связующего дерева **STP/RSTP** для удаления петлей из топологии. После настройки сетевых конфигураций необходимо запустить **checker_vlan **на **Debian-машине **с помощью команды `sudo chmod +x ~/checkers/checker_vlan && sudo ~/checkers/checker_vlan` Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
    },
    {
     "t": "p",
     "text": "**Примечание к данному вопросу**"
    },
    {
     "t": "ol",
     "items": [
      "Проверка кейса происходит по средствам подключения машины к коммутатору, поэтому необходимо подготовить устройства в соответствии с пунктом **Подготовка к проверке**"
     ]
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
   "text": "Мы настроили сегментацию сети с помощью **VLAN**, а также использовали протоколы связующего дерева **STP/RSTP** для удаления петлей из топологии. После настройки сетевых конфигураций необходимо запустить **checker_vlan **на **Debian-машине **с помощью команды `sudo chmod +x ~/checkers/checker_vlan && sudo ~/checkers/checker_vlan` Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**\n**Примечание к данному вопросу**\n1. Проверка кейса происходит по средствам подключения машины к коммутатору, поэтому необходимо подготовить устройства в соответствии с пунктом **Подготовка к проверке**"
  }
 ]
}
