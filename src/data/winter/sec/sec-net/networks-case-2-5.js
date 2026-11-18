// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_2.5 - Динамическая маршрутизация",
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
     "t": "p",
     "text": "**Виртуальная инфраструктура состоит из:**"
    },
    {
     "t": "ol",
     "items": [
      "Маршрутизатора **MikroTik1** с адресом 10.0.21.2/30 внутри сети с MikroTik2 и Router ID 1.1.1.1",
      "Маршрутизатора **MikroTik2** с адресом 10.0.21.1/30 внутри сети с MikroTik1, адресом 10.0.32.2/30 внутри сети с MikroTik3, адресом 10.0.24.1/30 внутри сети с MikroTik4 и Router ID 2.2.2.2",
      "Маршрутизатора **MikroTik3** с адресом 192.168.1.1/24 внутри сети с Debian1, адресом 10.0.32.1/30 внутри сети с MikroTik2 и Router ID 3.3.3.3",
      "Маршрутизатора **MikroTik4** с адресом 192.168.2.1/24 внутри сети с Debian2, адресом 10.0.24.2/30 внутри сети с MikroTik2 и Router ID 4.4.4.4",
      "Debian-машины **Debian1** с адресом 192.168.1.10/24 и шлюзом 192.168.1.1",
      "Debian-машины **Debian2** с адресом 192.168.2.10/24 и шлюзом 192.168.2.1",
      "Области OSPF backbone ( **главная магистраль** ), внутри которой находится соединение между MikroTik1 и MikroTik2",
      "Области OSPF area1, внутри которой находится соединение между MikroTik2 и MikroTik3, а также сегмент с Debian1",
      "Области OSPF area2, внутри которой находится соединение между MikroTik2 и MikroTik4, а также сегмент с Debian2"
     ]
    },
    {
     "t": "p",
     "text": "Для выполнения данного кейса необходимо скачать новый или клонировать ранее скачанный **OVA-образ** виртуальной Debian-машины, заготовленной Positive Technologies. В данном образе уже есть предустановленный набор программного обеспечения, а скачать его можно по [данной ссылке](https://storage.ptsecurity.com/seafhttp/f/b4275685f64849189a2a/?op=view)"
    },
    {
     "t": "p",
     "text": "Для начала, настроим сетевые интерфейсы на устройствах инфраструктуры, опирайся на схему инфраструктуры."
    },
    {
     "t": "p",
     "text": "MikroTik1:"
    },
    {
     "t": "ol",
     "items": [
      "`/ip address add address=10.0.21.2/30 interface=ether1` - назначает адрес 10.0.21.2/30 на интерфейс ether1"
     ]
    },
    {
     "t": "p",
     "text": "MikroTik2:"
    },
    {
     "t": "ol",
     "items": [
      "`/ip address add address=10.0.32.2/30 interface=ether1` - назначает адрес 10.0.32.2/30 на интерфейс ether1",
      "`/ip address add address=10.0.21.1/30 interface=ether2` - назначает адрес 10.0.21.1/30 на интерфейс ether2",
      "`/ip address add address=10.0.24.1/30 interface=ether3` - назначает адрес 10.0.24.1/30 на интерфейс ether3"
     ]
    },
    {
     "t": "p",
     "text": "MikroTik3:"
    },
    {
     "t": "ol",
     "items": [
      "`/ip address add address=192.168.1.1/24 interface=ether1` - назначает адрес 192.168.1.1/24 на интерфейс ether1",
      "`/ip address add address=10.0.32.1/30 interface=ether2` - назначает адрес 10.0.32.1/30 на интерфейс ether2"
     ]
    },
    {
     "t": "p",
     "text": "MikroTik4:"
    },
    {
     "t": "ol",
     "items": [
      "`/ip address add address=10.0.24.2/30 interface=ether1` - назначает адрес 10.0.24.2/30 на интерфейс ether1",
      "`/ip address add address=192.168.2.1/24 interface=ether2` - назначает адрес 192.168.2.1/24 на интерфейс ether2"
     ]
    },
    {
     "t": "p",
     "text": "Для хостов Debian1 и Debian2 назначим соответсвующие IP-адреса: Debian1 - **192.168.1.10/24** Debian2 - **192.168.2.10/24**"
    },
    {
     "t": "p",
     "text": "Затем на каждом маршрутизаторе необходимо создать экземпляры OSPF, к которым мы присоединим области, содержащие информацию о сетях внутри себя. Начнем с MikroTik1. Этот маршрутизатор имеет только один сетевой интерфейс, который является главной магистралью (**backbone**), для его настройки необходимо выполнить следующие команды:"
    },
    {
     "t": "ol",
     "items": [
      "`/routing ospf instance add name=default router-id=1.1.1.1` - создает экземпляр OSPF с Router ID 1.1.1.1",
      "`/routing ospf area add name=backbone area-id=0.0.0.0 instance=default` - создает backbone-область OSPF",
      "`/routing ospf interface-template add interfaces=ether1 networks=10.0.21.0/30 area=backbone` - добавляет сеть 10.0.21.0/30 в backbone-область"
     ]
    },
    {
     "t": "p",
     "text": "В свою очередь, MikroTik2 является пограничным маршрутизатором, поэтому для его настройки понадобится больше команд, по сравнению с первым, так как ему надо знать о всех областях в топологии. Используем следующие команды:"
    },
    {
     "t": "ol",
     "items": [
      "`/routing ospf instance add name=default router-id=2.2.2.2` - создает экземпляр OSPF с Router ID 2.2.2.2",
      "`/routing ospf area add name=backbone area-id=0.0.0.0 instance=default` - создает backbone-область OSPF",
      "`/routing ospf area add name=area1 area-id=0.0.0.1 instance=default` - создает область OSPF area1",
      "`/routing ospf area add name=area2 area-id=0.0.0.2 instance=default` - создает область OSPF area2",
      "`/routing ospf interface-template add interfaces=ether1 networks=10.0.32.0/30 area=area1` - добавляет сеть 10.0.32.0/30 в область area1",
      "`/routing ospf interface-template add interfaces=ether2 networks=10.0.21.0/30 area=backbone` - добавляет сеть 10.0.21.0/30 в backbone-область",
      "`/routing ospf interface-template add interfaces=ether3 networks=10.0.24.0/30 area=area2` - добавляет сеть 10.0.24.0/30 в область area2"
     ]
    },
    {
     "t": "p",
     "text": "MikroTik3 имеет два интерфейса, которые находятся в области **Area1**, для его настройки выполним 4 команды:"
    },
    {
     "t": "ol",
     "items": [
      "`/routing ospf instance add name=default router-id=3.3.3.3` - создает экземпляр OSPF с Router ID 3.3.3.3",
      "`/routing ospf area add name=area1 area-id=0.0.0.1 instance=default` - создает область OSPF area1",
      "`/routing ospf interface-template add interfaces=ether1 networks=192.168.1.0/24 area=area1` - добавляет сеть 192.168.1.0/24 в область area1",
      "`/routing ospf interface-template add interfaces=ether2 networks=10.0.32.0/30 area=area1` - добавляет сеть 10.0.32.0/30 в область area1"
     ]
    },
    {
     "t": "p",
     "text": "Как и третий маршрутизатор, у MikroTik4 есть 2 интерфейса в одной области:"
    },
    {
     "t": "ol",
     "items": [
      "`/routing ospf instance add name=default router-id=4.4.4.4` - создает экземпляр OSPF с Router ID 4.4.4.4",
      "`/routing ospf area add name=area2 area-id=0.0.0.2 instance=default` - создает область OSPF area2",
      "`/routing ospf interface-template add interfaces=ether1 networks=10.0.24.0/30 area=area2` - добавляет сеть 10.0.24.0/30 в область area2",
      "`/routing ospf interface-template add interfaces=ether2 networks=192.168.2.0/24 area=area2` - добавляет сеть 192.168.2.0/24 в область area2"
     ]
    }
   ]
  },
  {
   "id": "s2",
   "title": "Вопрос",
   "blocks": [
    {
     "t": "p",
     "text": "Мы настроили динамическую маршрутизацию. После настройки сетевых конфигураций необходимо запустить **checker_dynamic **на машине **Debian1** с помощью команды `sudo chmod +x ~/checkers/checker_dynamic && sudo ~/checkers/checker_dynamic` Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
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
   "text": "Мы настроили динамическую маршрутизацию. После настройки сетевых конфигураций необходимо запустить **checker_dynamic **на машине **Debian1** с помощью команды `sudo chmod +x ~/checkers/checker_dynamic && sudo ~/checkers/checker_dynamic` Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
