// Сгенерировано scripts/import-sec-course.py из курса по кибербезопасности — не правь руками.
export default {
 "title": "Guided Case_2.6 - DNS",
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
     "src": "/winter/sec/42b7b917972f.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "**Виртуальная инфраструктура состоит из:**"
    },
    {
     "t": "ol",
     "items": [
      "Маршрутизатора **MikroTik1** с адресом 192.168.10.1/24 внутри сети с DNS1, Server1, и адресом 10.0.0.1/30 внутри сети с MikroTik2",
      "Маршрутизатора **MikroTik2** с адресом 192.168.20.1/24 внутри сети с DNS2 и Server2, и адресом 10.0.0.2/30 внутри сети с MikroTik1",
      "Debian-машины **DNS1** с адресом 192.168.10.10/24 и шлюзом 192.168.10.1",
      "Debian-машины **Server1** с Nginx и адресом 192.168.10.50/24 и шлюзом 192.168.10.1",
      "Debian-машины **DNS2** с адресом 192.168.20.10/24 и шлюзом 192.168.20.1",
      "Debian-машины **Server2** с Nginx и адресом 192.168.20.50/24 и шлюзом 192.168.20.1"
     ]
    },
    {
     "t": "p",
     "text": "Для выполнения данного кейса необходимо скачать новый или клонировать ранее скачанный **OVA-образ** виртуальной Debian-машины, заготовленной Positive Technologies. В данном образе уже есть предустановленный набор программного обеспечения, а скачать его можно по [данной ссылке](https://storage.ptsecurity.com/seafhttp/f/b4275685f64849189a2a/?op=view)"
    },
    {
     "t": "p",
     "text": "В данном кейсе будем использовать динамическую маршрутизацию в инфраструктуре, по аналогии как делали раньше. Для этого сначала назначим интерфейсам соответсвующие адреса, которые указаны на схеме выше, а затем настроим экземпляры протокола OSPF, используя только одну зону - главную магистраль. После чего перейдем к настройке служебных файлов для корректной работы выделенного DNS-сервера (**DNS1**)."
    },
    {
     "t": "p",
     "text": "Для начала откроем файл настройки DNS-зон **/etc/bind/named.conf.local** и настроим его под себя, для этого нам понадобится прописать конфигурации двух зон:"
    },
    {
     "t": "ol",
     "items": [
      "**edtechlab.intern** - внутренняя зона, для которой данный сервер будет главным (master), а записи зоны будут храниться в файле **/etc/bind/db.edtechlab.intern** .",
      "**positive.intern** - внешняя зона, при запросе к которой сервер будет только пересылать запрос на другой сервер, который является главным для этой зоны (192.168.20.10). Отредактируем содержимое файла, вставив конфигурацию ниже."
     ]
    },
    {
     "t": "code",
     "text": "zone \"edtechlab.intern\" {  \n\ttype master;\n\tfile \"/etc/bind/db.edtechlab.intern\";\n};  \n\nzone \"positive.intern\" {  \n\ttype forward;\n\tforward only;\n\tforwarders { 192.168.20.10; };\n};"
    },
    {
     "t": "p",
     "text": "Теперь пропишем стандартные настройки в файле **/etc/bind/named.conf.options**, для того чтобы сервер знал как работать с зонами."
    },
    {
     "t": "code",
     "text": "options {  \n\tdirectory \"/var/cache/bind\";\n\n\trecursion yes; \n\tlisten-on { any; };\n\tlisten-on-v6 { any; };\n\tallow-query { any; }; \n\n\tdnssec-validation no; \n};"
    },
    {
     "t": "p",
     "text": "Скопируем шаблон настройки (**cp /etc/bind/db.local /etc/bind/db.edtechlab.intern**) и отредактируем его под себя, открыв с помощью текстового редактора **nano** (**nano /etc/bind/db.edtechlab.intern**). В итоге содержимое должно выглядеть так:"
    },
    {
     "t": "code",
     "text": "$TTL 604800\n@ IN SOA ns.edtechlab.intern. admin.edtechlab.intern. (  \n\t2\n\t604800\n\t86400\n\t2419200\n\t604800 )\n  \n@   IN NS ns.edtechlab.intern. \nns  IN A 192.168.10.10\nsrv1 IN A 192.168.10.50"
    },
    {
     "t": "p",
     "text": "Перезапуситим службу DNS-сервера для применения изменений командой `systemctl restart bind9`"
    },
    {
     "t": "p",
     "text": "После настройки файлов конфигурации их содержимое должно выглядеть так:"
    },
    {
     "t": "img",
     "src": "/winter/sec/43038ab6e886.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Аналогично редактируем содержимое служебных файлов второго DNS-сервера (DNS2)"
    },
    {
     "t": "p",
     "text": "DNS2 будет ответственен за зону **positive.intern**, а перенаправлять запросы в зону **edtechlab.intern**, добавим конфигурацию в файл **/etc/bind/named.conf.local**"
    },
    {
     "t": "code",
     "text": "zone \"positive.intern\" {  \n\ttype master;  \n\tfile \"/etc/bind/db.positive.intern\";  \n};  \n\nzone \"edtechlab.intern\" {  \n\ttype forward;  \n\tforward only;  \n\tforwarders { 192.168.10.10; };  \n};"
    },
    {
     "t": "p",
     "text": "Запишем идентичные настройки для второго сервера в файл **/etc/bind/named.conf.options**."
    },
    {
     "t": "code",
     "text": "options {  \n\tdirectory \"/var/cache/bind\";  \n\n\trecursion yes;  \n\tlisten-on { any; };  \n\tlisten-on-v6 { any; };  \n\tallow-query { any; };  \n\n\tdnssec-validation no;  \n};"
    },
    {
     "t": "p",
     "text": "Копируем шаблон уже для зоны **positive.intern** (**cp /etc/bind/db.local /etc/bind/db.positive.intern**) и редактируем конфигурацию:"
    },
    {
     "t": "code",
     "text": "$TTL 604800  \n@ IN SOA ns.positive.intern. admin.positive.intern. (  \n\t2  \n\t604800  \n\t86400  \n\t2419200  \n\t604800 )  \n\n@   IN NS ns.positive.intern.  \nns  IN A 192.168.20.10  \nsrv2 IN A 192.168.20.50"
    },
    {
     "t": "p",
     "text": "Перезапускаем службу **bind9** и проверяем содержимое конфигурационных файлов, чтобы оно соответствовало изображению ниже."
    },
    {
     "t": "img",
     "src": "/winter/sec/83a09e620177.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Также, чтобы хосты знали, к какому DNS-серверу обращаться для разрешения доменных имён в IP-адреса, **перезапишем **файл **/etc/resolv.conf** на каждом ПК, добавив адрес DNS-сервера соответствующей сети следующими командами:"
    },
    {
     "t": "ol",
     "items": [
      "DNS1 - `sudo sh -c 'echo \"nameserver 192.168.10.10\" > /etc/resolv.conf'`",
      "DNS2- `sudo sh -c 'echo \"nameserver 192.168.20.10\" > /etc/resolv.conf'`"
     ]
    },
    {
     "t": "p",
     "text": "Выполним проверку наличия записи и доступности серверов на DNS1 утилитой **nslookup**, которая запросит адерса наших доменных имен. Выполним следющие команды:"
    },
    {
     "t": "ol",
     "items": [
      "`nslookup srv1.edtechlab.intern`",
      "`nslookup srv2.positive.intern`"
     ]
    },
    {
     "t": "img",
     "src": "/winter/sec/99e9e0ec935e.webp",
     "alt": "Иллюстрация к материалу"
    },
    {
     "t": "p",
     "text": "Теперь попытаемся получить доступ к веб странице, с помощью предустановленной службы **nginx** поднимем веб-сервер на Server1 командой `systemctl start nginx`, а затем добавим HTML-заголовок \"<h1>EDTECHLAB DNS WORKS</h1>\" в файл **/var/www/html/index.html**. Такие же действия выполним на Server2, то есть, запускаем **nginx** на Server2 и добавляем заголовок \"<h1>POSITIVE DNS WORKS</h1>\" в файл **/var/www/html/index.html**. Затем на DNS2 выполним HTTP запросы к обоим серверами. Воспользуемся командами ниже."
    },
    {
     "t": "img",
     "src": "/winter/sec/0fa4d4c93096.webp",
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
     "text": "Мы настроили DNS-сервера типов Resolver и Forwarder и получили доступ к доменным именам внутри виртуальной инфраструктуры. После выполнения настроек сетевых интерфейсов и DNS-конфигураций необходимо запустить **checker_dns **на машине **DNS1** с помощью команды `sudo chmod +x ~/checkers/checker_dns && sudo ~/checkers/checker_dns` Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
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
   "text": "Мы настроили DNS-сервера типов Resolver и Forwarder и получили доступ к доменным именам внутри виртуальной инфраструктуры. После выполнения настроек сетевых интерфейсов и DNS-конфигураций необходимо запустить **checker_dns **на машине **DNS1** с помощью команды `sudo chmod +x ~/checkers/checker_dns && sudo ~/checkers/checker_dns` Пример: **osL4l0ug79lzEHouNXgS9QXoCHEj0E**"
  }
 ]
}
