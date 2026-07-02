import { TheoryTable, TheoryExample } from './components/TheoryTable'

export default function July2OsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Операционные системы: основы</h1>
        <p className="theory-subtitle">Трек: Кибербезопасность</p>
        <p className="theory-date">2 июля 2026</p>
        <p>
          Операционная система (ОС) — комплекс программ, управляющий аппаратными ресурсами компьютера
          и предоставляющий единую среду для запуска и взаимодействия прикладных программ. ОС — посредник
          между «железом» и пользователем/приложениями: именно она решает, какой процесс получит процессорное
          время, память, доступ к диску и сети — и именно на этом уровне закладывается базовая безопасность системы.
        </p>
      </section>

      {/* Функции ОС */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Основные функции ОС</h2>
        <ul className="theory-list">
          <li><strong>Управление процессами</strong> — создание, планирование и завершение процессов, распределение процессорного времени.</li>
          <li><strong>Управление памятью</strong> — выделение и защита областей оперативной памяти между процессами.</li>
          <li><strong>Управление файлами</strong> — организация файловой системы, прав доступа и хранения данных.</li>
          <li><strong>Управление устройствами</strong> — работа с драйверами и периферийным оборудованием.</li>
          <li><strong>Интерфейс пользователя</strong> — командная строка (CLI) и графическая оболочка (GUI).</li>
          <li><strong>Безопасность и разграничение доступа</strong> — аутентификация, права пользователей, изоляция процессов.</li>
        </ul>
      </section>

      {/* Архитектура */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Архитектура ОС и типы ядра</h2>
        <p><strong>Режимы работы процессора:</strong></p>
        <ul className="theory-list">
          <li><strong>Режим ядра (kernel mode)</strong> — полный доступ к аппаратным ресурсам.</li>
          <li><strong>Пользовательский режим (user mode)</strong> — ограниченный доступ, работа через системные вызовы.</li>
          <li>Разделение режимов — базовый механизм защиты ОС от сбоев и атак приложений.</li>
        </ul>
        <p><strong>Типы ядра:</strong></p>
        <TheoryTable
          headers={['Тип ядра', 'Суть']}
          rows={[
            ['Монолитное', 'Все службы работают в едином адресном пространстве (классический Linux)'],
            ['Микроядро', 'Минимум функций в ядре, остальное вынесено в изолированные процессы'],
            ['Гибридное', 'Сочетание подходов (ядро Windows NT, ядро XNU в macOS)'],
          ]}
        />
      </section>

      {/* Классификация */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Классификация ОС по назначению</h2>
        <ul className="theory-list">
          <li><strong>Настольные (десктопные)</strong> — Windows, macOS, Linux-дистрибутивы для ПК.</li>
          <li><strong>Серверные</strong> — Windows Server, серверные Linux-дистрибутивы.</li>
          <li><strong>Мобильные</strong> — Android, iOS.</li>
          <li><strong>Встраиваемые (embedded)</strong> — IoT-устройства, контроллеры.</li>
          <li><strong>Реального времени (RTOS)</strong> — промышленные и медицинские системы.</li>
        </ul>
      </section>

      {/* Windows */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Windows: архитектура и безопасность</h2>
        <p>Проприетарная ОС компании Microsoft, построенная на гибридном ядре NT.</p>
        <ul className="theory-list">
          <li><strong>Архитектура</strong> — ядро NT, HAL (уровень абстракции оборудования), подсистемы Win32/WinRT.</li>
          <li><strong>Файловая система</strong> — NTFS: журналируемая система с поддержкой ACL и шифрования (EFS).</li>
          <li><strong>Модель доступа</strong> — учётные записи, группы, домены Active Directory, политика UAC.</li>
          <li><strong>Средства защиты</strong> — Windows Defender, Windows Firewall, BitLocker, Windows Hello.</li>
          <li><strong>Область применения</strong> — корпоративные рабочие станции, домашние ПК, серверная инфраструктура.</li>
        </ul>
      </section>

      {/* Linux */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Linux: архитектура и безопасность</h2>
        <p>Семейство Unix-подобных ОС на базе открытого ядра Linux; распространяется в виде дистрибутивов.</p>
        <ul className="theory-list">
          <li><strong>Архитектура</strong> — монолитное модульное ядро, поддержка загружаемых модулей (LKM).</li>
          <li><strong>Файловая система</strong> — ext4, XFS, Btrfs; единое дерево каталогов, всё представлено как файл.</li>
          <li><strong>Модель доступа</strong> — классические права rwx для владельца/группы/остальных, расширенные ACL.</li>
          <li><strong>Средства защиты</strong> — SELinux / AppArmor (мандатный контроль доступа), iptables/nftables, разграничение через sudo.</li>
          <li><strong>Область применения</strong> — серверы, встраиваемые системы, суперкомпьютеры, рабочие станции разработчиков.</li>
        </ul>
      </section>

      {/* macOS */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. macOS: архитектура и безопасность</h2>
        <p>Проприетарная ОС компании Apple, построена на ядре XNU (гибрид Mach + BSD).</p>
        <ul className="theory-list">
          <li><strong>Архитектура</strong> — ядро XNU, слой Darwin (открытая Unix-основа), закрытые графические фреймворки Cocoa.</li>
          <li><strong>Файловая система</strong> — APFS: оптимизирована под SSD, поддерживает шифрование и снапшоты.</li>
          <li><strong>Модель доступа</strong> — права Unix-стиля + расширенные атрибуты, единая экосистема Apple ID.</li>
          <li><strong>Средства защиты</strong> — Gatekeeper (контроль источников ПО), SIP (защита системных файлов), песочница приложений.</li>
          <li><strong>Область применения</strong> — рабочие станции для творческих и разработческих задач, тесная интеграция с экосистемой Apple.</li>
        </ul>
      </section>

      {/* Сравнение */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Windows, Linux и macOS: ключевые различия</h2>
        <TheoryTable
          headers={['Критерий', 'Windows', 'Linux', 'macOS']}
          rows={[
            ['Тип ядра', 'Гибридное (NT)', 'Монолитное модульное', 'Гибридное (XNU)'],
            ['Лицензия', 'Проприетарная', 'Открытый исходный код', 'Проприетарная'],
            ['Файловая система', 'NTFS', 'ext4 / XFS / Btrfs', 'APFS'],
            ['Права доступа', 'ACL, UAC', 'rwx, SELinux/AppArmor', 'Unix-права, SIP'],
            ['Основная сфера', 'Офис, корпорации, игры', 'Серверы, embedded, DevOps', 'Творческие и dev-задачи'],
          ]}
        />
        <TheoryExample title="Почему это важно для ИБ">
          Модель прав доступа и открытость кода напрямую влияют на то, как атакуют и защищают систему.
          Linux с SELinux/AppArmor даёт мандатный контроль доступа — гибче, но сложнее настроить. Windows
          опирается на ACL и Active Directory — удобно для корпоративной инфраструктуры, но большая площадь атаки.
        </TheoryExample>
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Выводы</h2>
        <ul className="theory-list">
          <li>Операционная система — посредник между оборудованием и приложениями, отвечающий за управление ресурсами и базовую безопасность.</li>
          <li>Архитектурно ОС различаются по типу ядра (монолитное, микроядро, гибридное) и режиму разделения привилегий kernel/user mode.</li>
          <li>Windows построена на ядре NT и ориентирована на массового и корпоративного пользователя с моделью ACL и Active Directory.</li>
          <li>Linux — открытая Unix-подобная система с монолитным ядром, гибкой моделью прав и мандатным контролем доступа (SELinux/AppArmor).</li>
          <li>macOS сочетает закрытую экосистему Apple с Unix-основой (ядро XNU) и строгими механизмами изоляции приложений (SIP, Gatekeeper).</li>
          <li>Выбор ОС для задач кибербезопасности определяется требуемой моделью прав доступа, открытостью кода и сферой применения системы.</li>
        </ul>
      </section>
    </div>
  )
}
