// Индивидуальная программа «Backend-разработка», глава 3, трек Java.
// Язык до уровня «как это работает под капотом»: типы и память, ООП, equals/hashCode,
// исключения, generics и стирание типов, устройство коллекций, Stream API, records и
// sealed, рефлексия и прокси, многопоточность и JMM, виртуальные потоки, JVM, GC,
// I/O и NIO, Maven/Gradle, JUnit/Mockito/Testcontainers, Spring и Spring Boot, JPA/Hibernate.
// Общие темы главы — в backend-3.js, склеиваются в combineTrack (index.js).

export default {
  summary: 'Java под капотом: примитивы и ссылки, кеш Integer, String pool, ООП и порядок инициализации, иммутабельность, equals и hashCode, исключения и try-with-resources, generics и стирание типов, устройство ArrayList и HashMap, Stream API, records, sealed и pattern matching, рефлексия и прокси, потоки и Java Memory Model, synchronized, volatile, CAS, CompletableFuture, ConcurrentHashMap, виртуальные потоки, загрузка классов и JIT, куча и Metaspace, сборщики мусора, утечки памяти, NIO, Maven и Gradle, тестирование, Spring IoC, AOP, MVC, транзакции и Spring Data, Hibernate и N+1.',
  intro: 'Java появилась в 1995 году в Sun Microsystems с девизом «написано однажды — работает везде»: код компилируется не в машинные инструкции, а в байткод для виртуальной машины JVM. За 30 лет вокруг неё выросла самая большая экосистема корпоративной разработки: Spring, Hibernate, Kafka, Elasticsearch, Hadoop. В России на Java работают Сбер, Т-Банк, Альфа-Банк, ВТБ, Ozon, Яндекс, МТС, Авито. На собеседовании на junior/middle Java-разработчика спрашивают не синтаксис, а устройство: как работает HashMap, что будет, если переопределить equals без hashCode, зачем volatile, что такое happens-before, как устроена куча и какие бывают сборщики мусора, как Spring создаёт прокси и почему @Transactional не работает при вызове метода из того же класса. Эта часть главы отвечает на эти вопросы. Примеры — для Java 21 (LTS); где поведение зависит от версии, это отмечено.',
  sections: [
    {
      id: 'java-types',
      num: '1.1',
      divider: 'Трек Java',
      title: 'Типы данных: примитивы, ссылки, обёртки, строки, массивы',
      blocks: [
        { t: 'h3', text: '1.1.1. Как выполняется Java-программа' },
        { t: 'flow', steps: ['исходники .java', 'javac', 'байткод .class', 'JVM: загрузчик классов', 'интерпретатор + JIT-компилятор', 'машинный код'] },
        { t: 'p', text: 'Компилятор javac превращает исходники в **байткод** — инструкции для стековой виртуальной машины. JVM загружает классы по мере необходимости, проверяет байткод, сначала интерпретирует его, а горячие методы компилирует JIT-компилятором в машинный код с оптимизациями (раздел 1.19). Поэтому Java-сервис «разогревается»: первые секунды после старта он медленнее.' },
        { t: 'h3', text: '1.1.2. Примитивы и ссылки' },
        { t: 'table', caption: 'Таблица 1. Примитивные типы Java', headers: ['Тип', 'Размер', 'Диапазон / комментарий', 'Значение по умолчанию'], rows: [
          ['byte', '1 байт', '−128 … 127', '0'],
          ['short', '2 байта', '−32 768 … 32 767', '0'],
          ['int', '4 байта', '≈ ±2,1 млрд', '0'],
          ['long', '8 байт', '≈ ±9,2·10¹⁸', '0L'],
          ['float', '4 байта', 'IEEE 754, ~7 значащих цифр', '0.0f'],
          ['double', '8 байт', 'IEEE 754, ~15–16 цифр', '0.0'],
          ['char', '2 байта', 'беззнаковый, UTF-16 code unit', '\'\\u0000\''],
          ['boolean', 'не определён спецификацией', 'на практике 1 байт в массиве, 4 байта как локальная переменная', 'false'],
        ] },
        { t: 'ul', items: [
          '**Примитив хранит значение**, а переменная ссылочного типа хранит **ссылку** — адрес объекта в куче (или null).',
          '**Всё передаётся по значению.** Для примитива копируется число, для объекта — **ссылка**. Метод может изменить объект по ссылке, но не может заставить переменную вызывающего кода указывать на другой объект. Вопрос «в Java передача по ссылке или по значению?» — правильный ответ: всегда по значению, просто значение ссылочной переменной — ссылка.',
          '**Переполнение не проверяется:** Integer.MAX_VALUE + 1 == Integer.MIN_VALUE. Для проверки — Math.addExact, который бросает ArithmeticException.',
          '**Деньги не хранят в double:** 0.1 + 0.2 == 0.30000000000000004. Используют BigDecimal (с созданием из строки new BigDecimal("0.1")) или long копеек.',
          'Целочисленное деление на 0 — ArithmeticException, а у double — Infinity или NaN.',
        ] },
        { t: 'code', text: `void reassign(StringBuilder sb) {
    sb.append("!");              // меняет объект — вызывающий увидит
    sb = new StringBuilder("x"); // меняет только локальную копию ссылки
}

StringBuilder s = new StringBuilder("hi");
reassign(s);
System.out.println(s);           // hi!` },
        { t: 'h3', text: '1.1.3. Как объект лежит в памяти' },
        { t: 'p', text: 'У каждого объекта в HotSpot JVM есть **заголовок**: mark word (8 байт: хеш-код, возраст для GC, состояние блокировки) и указатель на класс (4 байта при сжатых указателях). Затем поля, выровненные до 8 байт. Поэтому new Object() занимает 16 байт, а Integer — 16 байт ради 4 байт значения. Инструмент JOL (Java Object Layout) показывает точную раскладку.' },
        { t: 'p', text: '**Сжатые указатели** (compressed oops): при куче до 32 ГБ ссылки занимают 4 байта вместо 8 — JVM хранит смещение, делённое на 8. Поэтому кучу больше 32 ГБ задавать невыгодно: на 32–48 ГБ полезного места может оказаться **меньше**, чем на 31 ГБ.' },
        { t: 'h3', text: '1.1.4. Обёртки и автоупаковка' },
        { t: 'p', text: 'У каждого примитива есть класс-обёртка: Integer, Long, Double, Boolean, Character… Они нужны там, где требуется объект: коллекции (List<Integer>), generics, null как «нет значения». Компилятор сам вставляет преобразования — **автоупаковку** (autoboxing): Integer x = 5 превращается в Integer.valueOf(5), а int y = x — в x.intValue().' },
        { t: 'code', text: `Integer a = 127, b = 127;
System.out.println(a == b);       // true  — один и тот же объект из кеша
Integer c = 128, d = 128;
System.out.println(c == d);       // false — два разных объекта
System.out.println(c.equals(d));  // true  — сравнение значений` },
        { t: 'p', text: '**Кеш Integer.** Integer.valueOf возвращает готовые объекты для значений **от −128 до 127** (верхнюю границу можно поднять флагом -XX:AutoBoxCacheMax). Вне диапазона создаётся новый объект. Поэтому **объекты-обёртки сравнивают только через equals**. То же для Long, Short, Byte, Character (0–127); у Boolean два объекта TRUE и FALSE.' },
        { t: 'ul', items: [
          '**NullPointerException при распаковке:** Integer count = map.get(key); int c = count; — если ключа нет, get вернёт null, и распаковка упадёт.',
          '**Скрытые аллокации:** Long sum = 0L; for (…) sum += i; создаёт новый объект Long на каждой итерации — в разы медленнее, чем long.',
          'Тернарный оператор с разными типами: flag ? 1 : null — тип выражения Integer, но flag ? 1 : (Integer) null при присваивании в int упадёт с NPE.',
        ] },
        { t: 'h3', text: '1.1.5. Строки' },
        { t: 'p', text: '**String неизменяем** (immutable). Любая «модификация» создаёт новый объект. Это даёт безопасность (строку-путь нельзя подменить после проверки), потокобезопасность и возможность кешировать хеш-код — String часто ключ в HashMap.' },
        { t: 'ul', items: [
          '**Устройство (Java 9+, Compact Strings):** внутри массив byte[] и флаг кодировки coder. Если все символы помещаются в Latin-1 — по 1 байту на символ, иначе UTF-16 — по 2 байта. До Java 9 был char[] и всегда 2 байта.',
          '**String pool** — таблица интернированных строк в куче. Строковые литералы попадают туда автоматически: "abc" == "abc" — true, это один объект. new String("abc") создаёт новый объект вне пула. s.intern() возвращает экземпляр из пула.',
          '**Сравнивать строки только через equals.** == сравнивает ссылки и иногда случайно «работает» для литералов, что делает ошибку коварной.',
          '**Конкатенация в цикле** создаёт новую строку на каждой итерации — O(n²). Используют **StringBuilder** (не потокобезопасный, быстрый) или StringBuffer (синхронизированный, устаревший). Для одиночного выражения a + b + c компилятор с Java 9 генерирует вызов invokedynamic StringConcatFactory — это эффективно, StringBuilder руками не нужен.',
          '**hashCode** строки вычисляется лениво и кешируется в поле hash: s[0]·31^(n−1) + … + s[n−1]. 31 — нечётное простое число, умножение на которое JIT заменяет сдвигом и вычитанием.',
          'Полезное: text blocks """ … """ (Java 15), String.join, strip() вместо trim() (учитывает Unicode-пробелы), isBlank(), repeat(), formatted().',
        ] },
        { t: 'code', text: `String a = "hello";
String b = "hel" + "lo";             // константа времени компиляции — тот же объект из пула
String c = new String("hello");
String part = "hel";
String d = part + "lo";              // вычисляется во время выполнения — новый объект

System.out.println(a == b);          // true
System.out.println(a == c);          // false
System.out.println(a == d);          // false
System.out.println(a == d.intern()); // true
System.out.println(a.equals(c));     // true` },
        { t: 'h3', text: '1.1.6. Массивы' },
        { t: 'ul', items: [
          'Массив — **объект** в куче с полем length и элементами подряд. int[] хранит сами числа, Integer[] и String[] — ссылки на объекты.',
          'Размер задаётся при создании и не меняется. Выход за границы — ArrayIndexOutOfBoundsException (JVM проверяет каждый доступ, но JIT убирает лишние проверки в циклах).',
          '**Массивы ковариантны:** String[] можно присвоить в Object[]. Но запись туда Integer бросит ArrayStoreException во время выполнения — поэтому generics сделаны инвариантными (раздел 1.9).',
          'Утилиты: Arrays.sort (для примитивов — Dual-Pivot Quicksort, для объектов — стабильный TimSort), Arrays.asList (список фиксированного размера поверх массива), Arrays.copyOf, Arrays.fill, Arrays.equals и Arrays.hashCode (у самого массива equals сравнивает ссылки).',
        ] },
      ],
      terms: [
        ['JVM', 'Java Virtual Machine — виртуальная машина, исполняющая байткод.'],
        ['JIT', 'just-in-time — компиляция байткода в машинный код во время работы программы.'],
        ['autoboxing', 'автоматическое преобразование примитива в объект-обёртку и обратно.'],
        ['compressed oops', 'сжатые 32-битные ссылки при куче до 32 ГБ.'],
      ],
    },
    {
      id: 'java-oop',
      num: '1.2',
      title: 'ООП: абстракция, инкапсуляция, наследование, полиморфизм',
      blocks: [
        { t: 'h3', text: '1.2.1. Четыре принципа на одном примере' },
        { t: 'code', text: `// Абстракция: что умеет любой способ оплаты — без деталей реализации
public abstract class PaymentMethod {
    private final String id;                 // инкапсуляция: состояние скрыто

    protected PaymentMethod(String id) {
        this.id = Objects.requireNonNull(id);
    }

    public String id() { return id; }

    // Шаблонный метод: общий алгоритм, детали — в наследниках
    public final Receipt pay(Money amount) {
        validate(amount);
        Receipt r = doPay(amount);           // полиморфный вызов
        audit(r);
        return r;
    }

    protected abstract Receipt doPay(Money amount);

    protected void validate(Money amount) {
        if (amount.isNegativeOrZero()) throw new IllegalArgumentException("amount");
    }

    private void audit(Receipt r) { /* … */ }
}

// Наследование: карта — частный случай способа оплаты
public class CardPayment extends PaymentMethod {
    private final String pan;
    public CardPayment(String id, String pan) { super(id); this.pan = pan; }

    @Override
    protected Receipt doPay(Money amount) { /* запрос в процессинг */ }
}

public class SbpPayment extends PaymentMethod {
    @Override
    protected Receipt doPay(Money amount) { /* запрос в СБП */ }
}

// Полиморфизм: код работает с абстракцией, не зная конкретного класса
List<PaymentMethod> methods = List.of(new CardPayment("1", "4111…"), new SbpPayment("2"));
for (PaymentMethod m : methods) {
    m.pay(Money.rub(500));                   // вызовется нужный doPay
}` },
        { t: 'table', caption: 'Таблица 2. Четыре принципа ООП', headers: ['Принцип', 'Суть', 'В примере'], rows: [
          ['абстракция', 'выделить существенное и скрыть детали', 'PaymentMethod описывает «оплатить», не говоря как'],
          ['инкапсуляция', 'данные и методы вместе, состояние меняется только через методы, инварианты защищены', 'private-поля, проверка в конструкторе'],
          ['наследование', 'новый класс расширяет существующий, наследуя поля и методы', 'CardPayment extends PaymentMethod'],
          ['полиморфизм', 'один интерфейс — много реализаций; вызов определяется фактическим типом объекта', 'm.pay() вызывает doPay нужного класса'],
        ] },
        { t: 'h3', text: '1.2.2. Как работает полиморфизм под капотом' },
        { t: 'p', text: 'Вызов нестатического метода компилируется в инструкцию **invokevirtual** (или invokeinterface для интерфейсов). У каждого класса JVM строит **таблицу виртуальных методов** (vtable): массив адресов реализаций, где у переопределённого метода тот же индекс, что у родительского. Вызов — взять класс объекта из заголовка, взять адрес по индексу, перейти. Для интерфейсов есть itable — поиск чуть дороже.' },
        { t: 'p', text: 'JIT делает полиморфизм почти бесплатным: если в конкретном месте вызова всегда приходит один класс (**мономорфный вызов**), JIT ставит проверку класса и **инлайнит** метод. Два класса — биморфный вызов, тоже инлайнится. Три и больше (**мегаморфный**) — честный косвенный вызов через vtable.' },
        { t: 'h3', text: '1.2.3. Проблемы наследования' },
        { t: 'ul', items: [
          '**Хрупкий базовый класс:** изменение родителя может сломать наследников, которые полагались на его внутреннее поведение. Классический пример из «Effective Java»: наследник HashSet переопределяет add и addAll для подсчёта элементов — и считает дважды, потому что addAll родителя внутри вызывает add.',
          '**Нарушение инкапсуляции:** наследник зависит от деталей реализации родителя.',
          '**Жёсткая иерархия:** класс может наследовать только один класс, а реальный мир не укладывается в одно дерево.',
          '**Принцип подстановки Лисков:** наследник должен работать везде, где работает родитель. Квадрат, наследующий прямоугольник, нарушает его: setWidth у квадрата неожиданно меняет и высоту.',
        ] },
        { t: 'p', text: 'Поэтому правило Джошуа Блоха — **«предпочитай композицию наследованию»** (раздел 1.3.3), а классы, не предназначенные для наследования, делают final.' },
      ],
    },
    {
      id: 'java-interfaces',
      num: '1.3',
      title: 'Интерфейсы, абстрактные классы, композиция',
      blocks: [
        { t: 'h3', text: '1.3.1. Интерфейс' },
        { t: 'p', text: 'Интерфейс — контракт: набор методов, которые класс обязуется реализовать. Класс может реализовать **много** интерфейсов. С Java 8 интерфейсы получили **default-методы** (с реализацией) и статические методы, с Java 9 — приватные методы.' },
        { t: 'code', text: `public interface OrderRepository {
    Optional<Order> findById(long id);
    void save(Order order);

    default Order getById(long id) {        // реализация по умолчанию
        return findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    static OrderRepository inMemory() {     // фабричный метод
        return new InMemoryOrderRepository();
    }
}` },
        { t: 'p', text: '**Зачем default-методы:** добавить метод в интерфейс, не сломав всех существующих реализаций. Именно так в Java 8 в Collection добавили stream() и removeIf().' },
        { t: 'p', text: '**Конфликт default-методов (ромб):** если класс реализует два интерфейса с одинаковым default-методом, компилятор требует переопределить его явно; внутри можно вызвать нужную версию: A.super.hello(). Правила: метод класса важнее default-метода; более специфичный интерфейс важнее родительского.' },
        { t: 'h3', text: '1.3.2. Абстрактный класс или интерфейс' },
        { t: 'table', caption: 'Таблица 3. Сравнение', headers: ['', 'Абстрактный класс', 'Интерфейс'], rows: [
          ['наследование', 'только один', 'сколько угодно'],
          ['состояние', 'поля любого типа', 'только константы public static final'],
          ['конструктор', 'есть', 'нет'],
          ['модификаторы методов', 'любые', 'public (и private для вспомогательных)'],
          ['смысл', '«является» — общая основа родственных классов с общим кодом и состоянием', '«умеет» — способность, которую может иметь любой класс'],
          ['пример', 'AbstractList, HttpServlet', 'Comparable, Runnable, List'],
        ] },
        { t: 'p', text: 'На практике: API описывают **интерфейсами**, а абстрактный класс используют как базовую реализацию с общим кодом (AbstractList реализует List, оставляя наследнику get и size).' },
        { t: 'h3', text: '1.3.3. Композиция' },
        { t: 'p', text: '**Композиция** — объект содержит другие объекты и делегирует им работу. Это гибче наследования: зависимость можно подменить, комбинировать поведение, а внутренности не протекают.' },
        { t: 'code', text: `// Вместо наследования от HashSet — обёртка (паттерн «декоратор»)
public class CountingSet<E> implements Set<E> {
    private final Set<E> delegate;            // композиция
    private int addCount;

    public CountingSet(Set<E> delegate) { this.delegate = delegate; }

    @Override public boolean add(E e) { addCount++; return delegate.add(e); }
    @Override public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return delegate.addAll(c);            // внутренности delegate нас не касаются
    }
    // остальные методы просто делегируются
}

// Сервис собирается из зависимостей — их легко подменить в тестах
public class OrderService {
    private final OrderRepository repo;
    private final PaymentGateway payments;
    private final Clock clock;

    public OrderService(OrderRepository repo, PaymentGateway payments, Clock clock) {
        this.repo = repo; this.payments = payments; this.clock = clock;
    }
}` },
        { t: 'p', text: 'Вся архитектура Spring-приложения — это композиция: сервисы получают зависимости через конструктор (раздел 1.26).' },
      ],
    },
    {
      id: 'java-modifiers',
      num: '1.4',
      title: 'Модификаторы доступа, static, final',
      blocks: [
        { t: 'h3', text: '1.4.1. Модификаторы доступа' },
        { t: 'table', caption: 'Таблица 4. Кто видит член класса', headers: ['Модификатор', 'Класс', 'Пакет', 'Наследник в другом пакете', 'Все'], rows: [
          ['private', 'да', 'нет', 'нет', 'нет'],
          ['(нет модификатора — package-private)', 'да', 'да', 'нет', 'нет'],
          ['protected', 'да', 'да', 'да', 'нет'],
          ['public', 'да', 'да', 'да', 'да'],
        ] },
        { t: 'ul', items: [
          'Правило — **минимальная видимость**: поля private, методы — настолько закрыты, насколько возможно. Чем меньше открыто, тем свободнее менять реализацию.',
          'protected видно **и во всём пакете** — это часто забывают.',
          'Переопределённый метод не может сузить видимость: public в родителе — public в наследнике.',
          '**Модули** (Java 9, JPMS): module-info.java с exports ограничивает видимость пакетов целиком — public-класс неэкспортированного пакета снаружи модуля не виден.',
        ] },
        { t: 'h3', text: '1.4.2. static' },
        { t: 'ul', items: [
          '**static-поле** принадлежит классу, а не объекту: одно на всю JVM (точнее — на загрузчик классов). Хранится вместе с объектом Class в куче.',
          '**static-метод** вызывается без объекта, не имеет this и **не переопределяется** — только скрывается (hiding): вызов выбирается по объявленному типу при компиляции (invokestatic).',
          '**static-блок** выполняется один раз при инициализации класса.',
          '**static вложенный класс** не держит ссылку на внешний объект. Нестатический внутренний класс неявно хранит ссылку Outer.this — частая причина утечек памяти (раздел 1.22), поэтому вложенные классы делают static, если доступ к внешнему объекту не нужен.',
          'Статическое изменяемое состояние — глобальная переменная: мешает тестам и многопоточности. Статика уместна для констант, утилит и фабрик.',
        ] },
        { t: 'h3', text: '1.4.3. final' },
        { t: 'table', caption: 'Таблица 5. Значения final', headers: ['Где', 'Смысл'], rows: [
          ['переменная, поле', 'присвоить можно ровно один раз. Для ссылки — нельзя переназначить ссылку, но **объект менять можно**: final List<String> list — в список можно добавлять'],
          ['метод', 'нельзя переопределить в наследнике'],
          ['класс', 'нельзя унаследовать: String, Integer, все records'],
          ['параметр', 'нельзя переприсвоить внутри метода'],
        ] },
        { t: 'p', text: '**final-поля и многопоточность** — важная, но малоизвестная гарантия Java Memory Model: если объект корректно сконструирован (ссылка на this не утекла из конструктора), то **любой поток**, получивший ссылку на объект, увидит final-поля полностью инициализированными — даже без синхронизации. На этом построена безопасность неизменяемых объектов (раздел 1.6).' },
        { t: 'p', text: '**Effectively final:** локальная переменная, которую не меняют после присваивания, считается финальной — её можно использовать в лямбде и анонимном классе. Причина требования: лямбда получает **копию** значения, и если бы переменную можно было менять, копия и оригинал разошлись бы.' },
      ],
    },
    {
      id: 'java-overriding',
      num: '1.5',
      title: 'Перегрузка, переопределение, порядок инициализации',
      blocks: [
        { t: 'h3', text: '1.5.1. Перегрузка и переопределение' },
        { t: 'table', caption: 'Таблица 6. Overload и override', headers: ['', 'Перегрузка (overloading)', 'Переопределение (overriding)'], rows: [
          ['что это', 'методы с одним именем и разными параметрами в одном классе', 'наследник заменяет реализацию метода родителя'],
          ['когда выбирается', '**при компиляции**, по объявленным типам аргументов (статическое связывание)', '**во время выполнения**, по фактическому классу объекта (динамическое связывание)'],
          ['сигнатура', 'должны различаться параметры; тип результата не учитывается', 'та же сигнатура; тип результата — тот же или подтип (ковариантный)'],
          ['исключения', 'любые', 'нельзя добавить новые проверяемые или расширить их'],
          ['видимость', 'любая', 'не уже, чем у родителя'],
        ] },
        { t: 'code', text: `class Printer {
    void print(Object o)  { System.out.println("object"); }
    void print(String s)  { System.out.println("string"); }
}

Object x = "hello";
new Printer().print(x);   // "object" — перегрузка выбрана по ОБЪЯВЛЕННОМУ типу Object

class Animal { String sound() { return "…"; } }
class Dog extends Animal { @Override String sound() { return "гав"; } }

Animal a = new Dog();
a.sound();                // "гав" — переопределение выбрано по ФАКТИЧЕСКОМУ классу` },
        { t: 'ul', items: [
          '**@Override** не обязательна, но нужна: если сигнатура не совпала (опечатка, другой тип параметра), компилятор сообщит об ошибке, а не создаст молча новый метод-перегрузку. Классика — equals(Order o) вместо equals(Object o).',
          'Порядок выбора перегрузки: точное совпадение → расширение примитивов (int → long) → автоупаковка → varargs.',
          'static, private и final методы не переопределяются.',
          '**Поля не полиморфны:** если в наследнике объявлено поле с тем же именем, оно скрывает родительское, и обращение выбирается по объявленному типу.',
        ] },
        { t: 'h3', text: '1.5.2. Порядок инициализации' },
        { t: 'p', text: 'Частый вопрос: «что напечатает программа». Порядок:' },
        { t: 'ol', items: [
          '**Инициализация класса** (один раз, при первом активном использовании: new, вызов статического метода, обращение к статическому полю не-константе): сначала родительский класс, затем текущий; внутри — статические поля и static-блоки **в порядке объявления**.',
          '**Создание объекта:** выделяется память, все поля получают значения по умолчанию (0, null, false).',
          'Вызывается конструктор, первой строкой которого неявно или явно идёт **super(…)** — конструктор родителя отрабатывает полностью (его инициализаторы полей и тело).',
          'Затем **инициализаторы полей и нестатические блоки** текущего класса в порядке объявления.',
          'Затем **тело конструктора** текущего класса.',
        ] },
        { t: 'code', text: `class Parent {
    static { System.out.println("1. static Parent"); }
    { System.out.println("3. init Parent"); }
    Parent() {
        System.out.println("4. ctor Parent");
        hello();                        // опасно: полиморфный вызов из конструктора
    }
    void hello() {}
}

class Child extends Parent {
    static { System.out.println("2. static Child"); }
    private String name = "Аня";
    { System.out.println("5. init Child"); }
    Child() { System.out.println("6. ctor Child"); }
    @Override void hello() { System.out.println("hello, " + name); }
}

new Child();
// 1. static Parent
// 2. static Child
// 3. init Parent
// 4. ctor Parent
// hello, null        ← поле name ещё не инициализировано!
// 5. init Child
// 6. ctor Child` },
        { t: 'p', text: '**Вывод:** не вызывай переопределяемые методы из конструктора — наследник увидит свои поля неинициализированными. И не «выпускай» this из конструктора (регистрация слушателя, запуск потока) — другой поток может увидеть недостроенный объект.' },
        { t: 'p', text: '**Ленивая инициализация класса** используется в идиоме Holder для потокобезопасного синглтона без синхронизации: JVM гарантирует, что инициализация класса выполняется ровно один раз и под блокировкой.' },
        { t: 'code', text: `public class Registry {
    private Registry() {}
    private static class Holder {                  // загрузится при первом обращении к Holder
        static final Registry INSTANCE = new Registry();
    }
    public static Registry getInstance() { return Holder.INSTANCE; }
}` },
      ],
    },
    {
      id: 'java-immutable',
      num: '1.6',
      title: 'Иммутабельность',
      blocks: [
        { t: 'h3', text: '1.6.1. Зачем неизменяемые объекты' },
        { t: 'ul', items: [
          '**Потокобезопасность бесплатно:** объект, который нельзя изменить, можно отдавать любым потокам без синхронизации.',
          '**Безопасные ключи HashMap и элементы HashSet:** если ключ изменится после вставки, его хеш станет другим, и элемент «потеряется» в таблице.',
          '**Нет защитного копирования:** объект можно отдать наружу, не боясь, что его испортят.',
          '**Проще рассуждать:** состояние задаётся в конструкторе и проверяется один раз.',
          'Цена — новые объекты при каждом «изменении». Обычно это дёшево: короткоживущие объекты быстро собирает молодое поколение GC.',
        ] },
        { t: 'h3', text: '1.6.2. Как сделать класс неизменяемым' },
        { t: 'ol', items: [
          'класс final (или приватный конструктор с фабрикой) — чтобы наследник не добавил изменяемость;',
          'все поля private final;',
          'нет сеттеров; «изменение» возвращает новый объект (withX);',
          '**изменяемые компоненты копируются** на входе и выходе: коллекции, массивы, Date;',
          'this не утекает из конструктора.',
        ] },
        { t: 'code', text: `public final class Order {
    private final long id;
    private final List<Item> items;
    private final Instant createdAt;           // Instant неизменяем — копировать не нужно

    public Order(long id, List<Item> items, Instant createdAt) {
        this.id = id;
        this.items = List.copyOf(items);       // защитная копия, к тому же неизменяемая
        this.createdAt = Objects.requireNonNull(createdAt);
    }

    public List<Item> items() { return items; }  // List.copyOf уже неизменяем

    public Order withItem(Item item) {
        var copy = new ArrayList<>(items);
        copy.add(item);
        return new Order(id, copy, createdAt);
    }
}

// С Java 16 короче — record (раздел 1.12)
public record Money(long kopecks, String currency) {
    public Money {                               // компактный конструктор для проверок
        if (kopecks < 0) throw new IllegalArgumentException("negative");
        Objects.requireNonNull(currency);
    }
}` },
        { t: 'h3', text: '1.6.3. Неизменяемые коллекции' },
        { t: 'table', caption: 'Таблица 7. Три вида «неизменяемости» коллекций', headers: ['Способ', 'Что получится'], rows: [
          ['Collections.unmodifiableList(list)', '**обёртка-представление**: менять через неё нельзя, но изменения исходного list видны'],
          ['List.of(…), List.copyOf(list) (Java 9/10)', 'настоящая неизменяемая копия; не допускает null'],
          ['stream.toList() (Java 16)', 'неизменяемый список; допускает null'],
          ['Collectors.toList()', 'обычный изменяемый ArrayList (не гарантировано спецификацией)'],
        ] },
        { t: 'p', text: 'Неизменяемость коллекции **поверхностная**: List.of(user) не мешает изменить сам user. Для глубокой неизменяемости неизменяемыми должны быть и элементы.' },
        { t: 'p', text: 'Примеры неизменяемых классов JDK: String, обёртки Integer/Long, BigDecimal, BigInteger, все классы java.time (LocalDate, Instant, Duration). Старые java.util.Date и Calendar — изменяемые, поэтому их заменили на java.time в Java 8.' },
      ],
    },
    {
      id: 'java-equals',
      num: '1.7',
      title: 'equals, hashCode, Comparable, Comparator',
      blocks: [
        { t: 'h3', text: '1.7.1. Контракт equals' },
        { t: 'p', text: 'По умолчанию Object.equals сравнивает ссылки (то же, что ==). Для объектов-значений его переопределяют. Контракт:' },
        { t: 'ul', items: [
          '**рефлексивность:** x.equals(x) — true;',
          '**симметричность:** x.equals(y) == y.equals(x);',
          '**транзитивность:** если x = y и y = z, то x = z;',
          '**согласованность:** повторные вызовы дают тот же результат, пока объекты не менялись;',
          'x.equals(null) — false.',
        ] },
        { t: 'h3', text: '1.7.2. Контракт hashCode' },
        { t: 'ul', items: [
          '**если объекты равны по equals — их hashCode обязан совпадать;**',
          'если hashCode совпадает, объекты **не обязаны** быть равны (коллизия);',
          'hashCode не меняется, пока не меняются поля, участвующие в equals.',
        ] },
        { t: 'example', label: 'Что будет, если переопределить только equals', text: 'Два «равных» объекта получат разные hashCode (по умолчанию он связан с идентичностью объекта). HashMap ищет сначала бакет по хешу, и второй объект попадёт в другой бакет: map.put(new Point(1, 2), "A"); map.get(new Point(1, 2)) вернёт null, а HashSet будет хранить «дубликаты». Это самый частый вопрос про equals и hashCode.' },
        { t: 'code', text: `public final class Point {
    private final int x, y;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Point p)) return false;     // pattern matching, Java 16
        return x == p.x && y == p.y;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);                     // 31 * (31 + x) + y
    }
}` },
        { t: 'ul', items: [
          '**instanceof или getClass():** instanceof разрешает равенство с наследником, но ломает симметричность, если наследник добавил поля в equals. getClass() строже. Для final-классов разницы нет. Record генерирует equals и hashCode автоматически.',
          '**Изменяемые поля в hashCode** — ловушка: объект положили в HashSet, изменили поле, и set.contains(obj) возвращает false, а remove не удаляет.',
          '**Сущности JPA:** equals по id ломается, пока id ещё не присвоен базой. Обычно используют бизнес-ключ или id с осторожной реализацией (раздел 1.30).',
          '**Identity hashCode** (по умолчанию) — случайное число, которое JVM генерирует при первом вызове и сохраняет в mark word заголовка объекта. Это **не адрес** в памяти: объекты перемещаются сборщиком мусора, а хеш должен оставаться постоянным.',
        ] },
        { t: 'h3', text: '1.7.3. Comparable и Comparator' },
        { t: 'p', text: '**Comparable<T>** — естественный порядок объекта, метод compareTo: отрицательное число — меньше, 0 — равно, положительное — больше. Его используют TreeMap, TreeSet, Collections.sort без компаратора. **Comparator<T>** — внешний порядок, который можно задать множеством способов.' },
        { t: 'code', text: `public record Version(int major, int minor) implements Comparable<Version> {
    @Override
    public int compareTo(Version o) {
        int c = Integer.compare(major, o.major);   // НЕ major - o.major: переполнение!
        return c != 0 ? c : Integer.compare(minor, o.minor);
    }
}

// Компараторы собираются цепочкой
Comparator<User> byCityThenAge = Comparator
    .comparing(User::city)
    .thenComparing(User::age, Comparator.reverseOrder())
    .thenComparing(User::name, Comparator.nullsLast(String::compareTo));

users.sort(byCityThenAge);` },
        { t: 'ul', items: [
          '**Не вычитай** для сравнения: a - b переполнится при больших разных по знаку значениях, и порядок окажется неверным.',
          '**Согласованность с equals:** желательно, чтобы compareTo == 0 тогда и только тогда, когда equals — true. Иначе TreeSet и HashSet будут по-разному считать дубликаты. Пример нарушения из JDK: new BigDecimal("1.0") и new BigDecimal("1.00") не равны по equals, но compareTo даёт 0.',
          'Компаратор должен быть транзитивным, иначе TimSort может бросить IllegalArgumentException: Comparison method violates its general contract!',
        ] },
      ],
    },
    {
      id: 'java-exceptions',
      num: '1.8',
      title: 'Исключения и управление ресурсами',
      blocks: [
        { t: 'h3', text: '1.8.1. Иерархия' },
        { t: 'tree', lines: [
          [0, '**Throwable**'],
          [1, '**Error** — проблемы JVM, не перехватывать: OutOfMemoryError, StackOverflowError, NoClassDefFoundError'],
          [1, '**Exception** — проверяемые (checked): IOException, SQLException, InterruptedException'],
          [2, '**RuntimeException** — непроверяемые (unchecked): NullPointerException, IllegalArgumentException, IllegalStateException, IndexOutOfBoundsException, ConcurrentModificationException'],
        ] },
        { t: 'ul', items: [
          '**Проверяемые** исключения компилятор заставляет либо обработать, либо объявить в throws. Идея — внешние сбои, которые вызывающий может осмысленно обработать.',
          '**Непроверяемые** — ошибки программиста и нарушения контракта; объявлять не нужно.',
          'Спор о checked-исключениях идёт десятилетиями: они плохо сочетаются с лямбдами и стримами (функциональные интерфейсы их не объявляют). Spring и большинство современных библиотек используют только unchecked: например, Spring оборачивает SQLException в DataAccessException.',
        ] },
        { t: 'h3', text: '1.8.2. try, catch, finally' },
        { t: 'code', text: `try {
    process(order);
} catch (PaymentDeclinedException | InsufficientFundsException e) {   // multi-catch
    return Result.declined(e.getMessage());
} catch (IOException e) {
    throw new PaymentGatewayException("gateway unavailable", e);       // сохраняем причину!
} finally {
    metrics.record();      // выполнится всегда: и при return, и при исключении
}` },
        { t: 'ul', items: [
          '**catch от частного к общему**: catch (Exception) раньше catch (IOException) — ошибка компиляции.',
          '**Оборачивая, передавай cause** — иначе стек исходной ошибки потеряется.',
          '**Не глотай исключения:** catch (Exception e) {} — худшее, что можно сделать. Минимум — залогировать, а лучше — обработать или пробросить.',
          '**return в finally** перекрывает и return из try, и брошенное исключение — исключение пропадёт бесследно. Так не делают.',
          'finally не выполнится только при System.exit, падении JVM или убийстве процесса.',
          '**Под капотом** try/catch бесплатен, пока исключения нет: у метода есть таблица исключений (диапазон байткода → обработчик), которая используется только при броске. Дорого само **создание** исключения — сбор стека (fillInStackTrace). Поэтому исключения не используют для обычного управления потоком.',
        ] },
        { t: 'h3', text: '1.8.3. try-with-resources' },
        { t: 'p', text: 'С Java 7 ресурсы, реализующие **AutoCloseable**, закрываются автоматически — в обратном порядке открытия, даже при исключении:' },
        { t: 'code', text: `try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement("SELECT name FROM users WHERE id = ?")) {
    ps.setLong(1, id);
    try (ResultSet rs = ps.executeQuery()) {
        return rs.next() ? rs.getString(1) : null;
    }
}   // закроются rs → ps → conn` },
        { t: 'p', text: '**Подавленные исключения:** если в теле try брошено исключение, а потом close() тоже бросил — основным останется первое, а исключение из close будет добавлено к нему как **suppressed** (e.getSuppressed()). В старом ручном finally исключение из close **затирало** исходное — и причина сбоя терялась.' },
        { t: 'h3', text: '1.8.4. Хорошие практики' },
        { t: 'ul', items: [
          'Бросай **специфичные** исключения со смыслом: OrderNotFoundException, а не RuntimeException("error").',
          'Для неверных аргументов — IllegalArgumentException, для неверного состояния объекта — IllegalStateException, для null — Objects.requireNonNull.',
          'Не используй исключения для обычного потока управления: «пользователь не найден» в поиске — это Optional, а не исключение.',
          'В веб-приложении исключения переводятся в HTTP-ответы в одном месте — @RestControllerAdvice (раздел 1.28).',
          'InterruptedException нельзя глотать: либо пробросить, либо восстановить флаг прерывания Thread.currentThread().interrupt() (раздел 1.14).',
        ] },
      ],
    },
    {
      id: 'java-generics',
      num: '1.9',
      title: 'Generics',
      blocks: [
        { t: 'h3', text: '1.9.1. Зачем generics' },
        { t: 'code', text: `// До Java 5: проверки нет, приведение вручную, ошибка — во время выполнения
List list = new ArrayList();
list.add("text");
Integer n = (Integer) list.get(0);    // ClassCastException

// С generics — ошибка при компиляции
List<String> names = new ArrayList<>();
names.add(42);                        // не скомпилируется` },
        { t: 'h3', text: '1.9.2. Стирание типов' },
        { t: 'p', text: 'Generics в Java реализованы через **стирание типов** (type erasure): параметры типа существуют только на этапе компиляции. В байткоде List<String> и List<Integer> — один и тот же класс List, параметр T заменяется на свою границу (Object или указанную в extends), а компилятор вставляет приведения типов в местах использования. Так сделали ради обратной совместимости с кодом до Java 5.' },
        { t: 'p', text: 'Следствия, о которых спрашивают:' },
        { t: 'ul', items: [
          'нельзя new T() и new T[] — во время выполнения T неизвестен;',
          'нельзя obj instanceof List<String> — только List<?>;',
          'нельзя перегрузить методы m(List<String>) и m(List<Integer>) — после стирания одинаковая сигнатура;',
          '**нельзя использовать примитивы**: List<int> не бывает, только List<Integer> — с автоупаковкой и лишней памятью. (Проект Valhalla готовит value-классы, чтобы это исправить.)',
          'статическое поле не может иметь тип T — оно одно на все параметризации;',
          'компилятор генерирует **bridge-методы**, чтобы переопределение работало после стирания.',
          'Тип можно сохранить явно: передать Class<T> (как в JPA em.find(User.class, id)) или «токен типа» — анонимный подкласс new TypeReference<List<User>>() {} в Jackson: информация о параметрах супертипа сохраняется в class-файле.',
        ] },
        { t: 'h3', text: '1.9.3. Инвариантность и wildcards' },
        { t: 'p', text: 'List<Integer> **не является** подтипом List<Number>, хотя Integer — подтип Number. Иначе можно было бы сделать так: List<Number> nums = ints; nums.add(3.14); — и в списке целых оказался бы double. Для гибкости есть **wildcards**:' },
        { t: 'code', text: `// ? extends T — «производитель»: можно читать как T, нельзя добавлять
double sum(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}
sum(List.of(1, 2, 3));          // List<Integer> подходит
sum(List.of(1.5, 2.5));         // List<Double> подходит

// ? super T — «потребитель»: можно добавлять T, читать — только как Object
void fill(List<? super Integer> out) {
    out.add(1); out.add(2);
}
fill(new ArrayList<Number>());  // подходит
fill(new ArrayList<Object>());  // подходит

// Пример из JDK: Collections.copy
public static <T> void copy(List<? super T> dest, List<? extends T> src)` },
        { t: 'p', text: 'Правило **PECS** — Producer Extends, Consumer Super: если из коллекции читают, используется extends; если в неё пишут — super; если и то и другое — точный тип.' },
        { t: 'h3', text: '1.9.4. Обобщённые методы и ограничения' },
        { t: 'code', text: `// <T extends Comparable<? super T>> — T сравним сам с собой или с предком
public static <T extends Comparable<? super T>> T max(Collection<? extends T> items) {
    Iterator<? extends T> it = items.iterator();
    T best = it.next();
    while (it.hasNext()) {
        T x = it.next();
        if (x.compareTo(best) > 0) best = x;
    }
    return best;
}

// Несколько ограничений
<T extends Number & Comparable<T>> T clamp(T v, T lo, T hi) { … }` },
        { t: 'p', text: '**Сырые типы** (raw types) — List без параметра — оставлены для совместимости. Компилятор выдаёт предупреждение unchecked, и проверки типов отключаются. В новом коде их не используют.' },
        { t: 'p', text: '**Heap pollution:** varargs с параметром типа (T... args) создаёт массив Object[], и можно положить туда значение не того типа. Безопасные такие методы помечают @SafeVarargs.' },
      ],
      terms: [
        ['type erasure', 'стирание параметров типа при компиляции.'],
        ['PECS', 'Producer Extends, Consumer Super — правило выбора wildcard.'],
        ['bridge-метод', 'синтетический метод, который компилятор добавляет для корректного переопределения после стирания.'],
      ],
    },
    {
      id: 'java-collections',
      num: '1.10',
      title: 'Коллекции: устройство, сложность, выбор реализации',
      blocks: [
        { t: 'h3', text: '1.10.1. Иерархия' },
        { t: 'tree', lines: [
          [0, '**Iterable** → **Collection**'],
          [1, '**List** — упорядоченный, с индексами, допускает дубликаты: ArrayList, LinkedList'],
          [1, '**Set** — без дубликатов: HashSet, LinkedHashSet, TreeSet (SortedSet / NavigableSet)'],
          [1, '**Queue / Deque** — очереди: ArrayDeque, PriorityQueue, LinkedList'],
          [0, '**Map** — отдельная иерархия «ключ → значение»: HashMap, LinkedHashMap, TreeMap, EnumMap'],
          [0, 'Java 21: **SequencedCollection / SequencedMap** — общие методы getFirst, getLast, reversed'],
        ] },
        { t: 'h3', text: '1.10.2. ArrayList' },
        { t: 'p', text: 'Внутри — массив Object[] elementData и счётчик size. Начальная ёмкость 10 (массив создаётся лениво при первом add). Когда массив заполнен, создаётся новый в **1,5 раза больше** (newCapacity = old + old >> 1), и элементы копируются через System.arraycopy. Поэтому add — **амортизированно O(1)**.' },
        { t: 'ul', items: [
          'get(i) и set(i) — O(1): прямой доступ по индексу;',
          'add(x) в конец — амортизированно O(1);',
          'add(i, x) и remove(i) в середине — O(n): сдвиг хвоста массива;',
          'contains и indexOf — O(n);',
          'если размер известен, задавай ёмкость: new ArrayList<>(n);',
          'массив не уменьшается сам при удалении — для этого trimToSize().',
        ] },
        { t: 'h3', text: '1.10.3. LinkedList' },
        { t: 'p', text: 'Двусвязный список узлов Node {item, next, prev}. Вставка и удаление **при наличии ссылки на узел** (через итератор) — O(1), get(i) — O(n): нужно идти от ближайшего конца.' },
        { t: 'p', text: '**На практике LinkedList почти всегда проигрывает ArrayList**, даже на вставках в середину: каждый узел — отдельный объект на 24–32 байта с заголовком и двумя ссылками, узлы разбросаны по памяти, и процессор постоянно промахивается мимо кеша, а ArrayList сдвигает непрерывный блок одной быстрой инструкцией. Для очереди и стека лучше **ArrayDeque**. Даже автор LinkedList Джошуа Блох признавался, что сам им не пользуется.' },
        { t: 'h3', text: '1.10.4. HashMap — самый частый вопрос' },
        { t: 'code', text: `// java.util.HashMap — упрощённо
transient Node<K,V>[] table;    // массив бакетов, длина — степень двойки
transient int size;
int threshold;                  // capacity * loadFactor — когда расширяться
final float loadFactor;         // по умолчанию 0.75

static class Node<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;             // цепочка при коллизиях
}` },
        { t: 'p', text: '**put(key, value):**' },
        { t: 'ol', items: [
          'вычисляется key.hashCode() и **перемешивается**: hash ^ (hash >>> 16) — старшие биты подмешиваются к младшим, потому что индекс берётся из младших;',
          'индекс бакета: (n − 1) & hash — быстрая замена остатку от деления, работает потому, что n — степень двойки;',
          'если бакет пуст — кладём новый узел;',
          'иначе идём по цепочке: если нашёлся ключ с тем же hash и equals — заменяем значение; иначе добавляем узел в конец цепочки;',
          'если размер превысил threshold (capacity × 0,75) — **resize**: массив удваивается, и все узлы переносятся. Благодаря степени двойки узел либо остаётся на своём индексе, либо переезжает на index + oldCapacity — это определяется одним битом хеша, без пересчёта.',
        ] },
        { t: 'p', text: '**Деревья в бакетах (Java 8).** Если в одном бакете больше **8** элементов, а таблица не меньше 64, цепочка превращается в **красно-чёрное дерево** (TreeNode) — поиск в бакете становится O(log n) вместо O(n). При уменьшении до 6 — обратно в список. Это защита от плохих hashCode и от атак подбором коллизий. Если таблица меньше 64, вместо дерева делается resize.' },
        { t: 'table', caption: 'Таблица 8. Что нужно помнить про HashMap', headers: ['Вопрос', 'Ответ'], rows: [
          ['начальная ёмкость', '16; таблица создаётся при первом put'],
          ['load factor', '0,75 — компромисс между памятью и длиной цепочек'],
          ['null', 'один null-ключ (кладётся в бакет 0) и любые null-значения'],
          ['сложность', 'в среднем O(1); в худшем O(log n) с Java 8, раньше O(n)'],
          ['порядок итерации', 'не определён и меняется при resize'],
          ['потокобезопасность', '**нет**. Конкурентная запись теряет данные; в Java 7 при resize могла зациклить цепочку и повесить поток на 100% CPU'],
          ['изменяемый ключ', 'если поля ключа изменятся после put, элемент не найти — hash уже другой'],
          ['new HashMap<>(1000)', 'резервирует 1024 бакета, но resize произойдёт после 768 элементов. Для n элементов без resize — HashMap.newHashMap(n) (Java 19)'],
        ] },
        { t: 'h3', text: '1.10.5. Остальные Map и Set' },
        { t: 'ul', items: [
          '**LinkedHashMap** — HashMap + двусвязный список по всем узлам. Сохраняет порядок вставки или, с accessOrder = true, порядок доступа. Переопределив removeEldestEntry, получаем **LRU-кеш** в десяток строк — популярная задача на собеседовании.',
          '**TreeMap** — красно-чёрное дерево: ключи отсортированы, операции O(log n), есть навигация floorKey, ceilingKey, headMap, subMap. Ключи сравниваются через compareTo или Comparator, **equals не используется**.',
          '**HashSet, LinkedHashSet, TreeSet** — обёртки над соответствующими Map, где элементы — ключи, а значение — общий объект-заглушка PRESENT.',
          '**EnumMap / EnumSet** — массив или битовая маска по ordinal enum: самые быстрые и компактные для ключей-enum.',
          '**IdentityHashMap** — сравнивает ключи через ==. **WeakHashMap** — ключи хранятся по слабым ссылкам и удаляются, когда на них нет других ссылок (раздел 1.21).',
        ] },
        { t: 'code', text: `class LruCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    LruCache(int capacity) {
        super(16, 0.75f, true);            // accessOrder = true
        this.capacity = capacity;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;          // вытеснить самый давно использованный
    }
}` },
        { t: 'h3', text: '1.10.6. Очереди' },
        { t: 'ul', items: [
          '**ArrayDeque** — кольцевой буфер на массиве: O(1) на оба конца. Лучший выбор для стека (push/pop) и очереди (offer/poll). Класс Stack устарел — он наследует синхронизированный Vector.',
          '**PriorityQueue** — двоичная куча на массиве: offer и poll — O(log n), peek — O(1). Итерация **не** в порядке приоритета. Задачи «top-k» решаются кучей размера k.',
          'Конкурентные очереди — в разделе 1.17.',
        ] },
        { t: 'h3', text: '1.10.7. Итераторы и fail-fast' },
        { t: 'p', text: 'У коллекций java.util есть счётчик изменений **modCount**. Итератор запоминает его при создании и проверяет при каждом next(). Если коллекцию изменили не через итератор — бросается **ConcurrentModificationException**. Это fail-fast поведение, и оно срабатывает даже в **одном** потоке:' },
        { t: 'code', text: `for (String s : list) {
    if (s.isBlank()) list.remove(s);      // ConcurrentModificationException
}

list.removeIf(String::isBlank);          // правильно

Iterator<String> it = list.iterator();   // или через итератор
while (it.hasNext()) {
    if (it.next().isBlank()) it.remove();
}` },
        { t: 'h3', text: '1.10.8. Как выбрать' },
        { t: 'table', caption: 'Таблица 9. Выбор коллекции', headers: ['Задача', 'Коллекция'], rows: [
          ['список по умолчанию', 'ArrayList'],
          ['стек, очередь, двусторонняя очередь', 'ArrayDeque'],
          ['очередь с приоритетом, top-k', 'PriorityQueue'],
          ['словарь по умолчанию', 'HashMap'],
          ['словарь с порядком вставки, LRU', 'LinkedHashMap'],
          ['отсортированные ключи, поиск по диапазону', 'TreeMap'],
          ['ключи — enum', 'EnumMap, EnumSet'],
          ['многопоточный доступ', 'ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue (раздел 1.17)'],
          ['неизменяемые данные', 'List.of, Map.of, Set.of'],
        ] },
      ],
      terms: [
        ['load factor', 'коэффициент заполнения, после которого таблица расширяется.'],
        ['fail-fast', 'итератор сразу падает при обнаружении конкурентного изменения.'],
        ['LRU', 'least recently used — вытеснение давно не использованных элементов.'],
      ],
    },
    {
      id: 'java-streams',
      num: '1.11',
      title: 'Лямбды, функциональные интерфейсы, Stream API, Optional',
      blocks: [
        { t: 'h3', text: '1.11.1. Лямбды и функциональные интерфейсы' },
        { t: 'p', text: '**Функциональный интерфейс** — интерфейс с одним абстрактным методом (может иметь default-методы). Лямбда — компактная реализация такого интерфейса. Аннотация @FunctionalInterface просит компилятор проверить, что метод ровно один.' },
        { t: 'table', caption: 'Таблица 10. Основные интерфейсы java.util.function', headers: ['Интерфейс', 'Метод', 'Пример'], rows: [
          ['Function<T, R>', 'R apply(T)', 'User::name'],
          ['Consumer<T>', 'void accept(T)', 'System.out::println'],
          ['Supplier<T>', 'T get()', 'ArrayList::new'],
          ['Predicate<T>', 'boolean test(T)', 'String::isBlank'],
          ['BiFunction<T, U, R>', 'R apply(T, U)', '(a, b) -> a + b'],
          ['UnaryOperator<T>, BinaryOperator<T>', 'T apply(T) / T apply(T, T)', 'String::trim, Integer::sum'],
          ['IntFunction, ToLongFunction, IntPredicate…', 'примитивные специализации', 'без автоупаковки'],
        ] },
        { t: 'p', text: '**Ссылки на методы:** статический Integer::parseInt; метод конкретного объекта logger::info; метод произвольного объекта String::toLowerCase (первый аргумент лямбды станет this); конструктор User::new.' },
        { t: 'p', text: '**Как лямбда устроена внутри.** Это **не** анонимный класс. Компилятор кладёт тело лямбды в приватный статический метод (lambda$main$0), а в месте создания ставит инструкцию **invokedynamic**. При первом выполнении JVM вызывает LambdaMetafactory, которая на лету генерирует класс, реализующий интерфейс, и кеширует его. Лямбда без захвата переменных — синглтон, аллокации при повторных вызовах нет. Лямбда, захватывающая переменные, создаёт объект с их копиями — поэтому захватывать можно только effectively final переменные.' },
        { t: 'h3', text: '1.11.2. Stream API' },
        { t: 'p', text: 'Стрим — **конвейер** обработки данных: источник → промежуточные операции → терминальная операция.' },
        { t: 'code', text: `Map<String, Long> revenueByCity = orders.stream()               // источник
    .filter(o -> o.status() == Status.DELIVERED)                  // промежуточные
    .filter(o -> o.createdAt().isAfter(monthStart))
    .collect(Collectors.groupingBy(                               // терминальная
        Order::city,
        Collectors.summingLong(Order::amount)));

List<String> topCustomers = orders.stream()
    .collect(Collectors.groupingBy(Order::customerId, Collectors.counting()))
    .entrySet().stream()
    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
    .limit(10)
    .map(Map.Entry::getKey)
    .toList();` },
        { t: 'ul', items: [
          '**Ленивость.** Промежуточные операции (filter, map, flatMap, sorted, distinct, limit, peek) ничего не делают, пока не вызвана терминальная (collect, toList, forEach, reduce, count, findFirst, anyMatch).',
          '**Поэлементная обработка.** Каждый элемент проходит весь конвейер, прежде чем начнётся следующий, — промежуточных коллекций не создаётся. filter → map → findFirst остановится на первом подходящем элементе (short-circuit).',
          '**Stateful-операции** sorted и distinct должны увидеть все элементы — они буферизуют данные.',
          '**Стрим одноразовый:** повторный вызов терминальной операции — IllegalStateException.',
          '**Примитивные стримы** IntStream, LongStream — без автоупаковки: mapToLong(Order::amount).sum().',
          'Под капотом: источник — **Spliterator** (умеет обходить и делиться на части для параллелизма), а каждая операция — стадия (Sink), которая передаёт элемент следующей.',
        ] },
        { t: 'h3', text: '1.11.3. Коллекторы' },
        { t: 'code', text: `// toMap бросит IllegalStateException при дубликате ключа — нужна функция слияния
Map<Long, User> byId = users.stream()
    .collect(Collectors.toMap(User::id, u -> u, (a, b) -> a));

Map<Boolean, List<User>> adults = users.stream()
    .collect(Collectors.partitioningBy(u -> u.age() >= 18));

String csv = names.stream().collect(Collectors.joining(", ", "[", "]"));

LongSummaryStatistics stats = orders.stream()
    .collect(Collectors.summarizingLong(Order::amount));   // count, sum, min, max, avg` },
        { t: 'h3', text: '1.11.4. Параллельные стримы' },
        { t: 'p', text: 'parallelStream() делит данные через Spliterator и обрабатывает части в общем **ForkJoinPool.commonPool()** (потоков — число ядер минус один). Ловушки:' },
        { t: 'ul', items: [
          '**общий пул на всё приложение:** если в параллельном стриме делать блокирующие запросы в базу или сеть, он займёт весь пул, и встанут все остальные параллельные стримы и CompletableFuture без своего пула;',
          'выигрыш есть только на **больших объёмах и тяжёлых вычислениях** над хорошо делимыми источниками (ArrayList, массив). LinkedList и Stream.iterate делятся плохо;',
          'операции должны быть **без побочных эффектов**: forEach(list::add) в параллельном стриме — гонка;',
          'в веб-сервисе запросы и так обрабатываются параллельно, поэтому parallelStream в обработчике запроса обычно вредит.',
        ] },
        { t: 'h3', text: '1.11.5. Optional' },
        { t: 'p', text: 'Optional<T> — контейнер, который явно говорит: «значения может не быть». Предназначен для **возвращаемых значений** методов.' },
        { t: 'code', text: `Optional<User> user = repo.findByEmail(email);

String name = user.map(User::name).orElse("гость");
User u = user.orElseThrow(() -> new NotFoundException(email));
user.ifPresentOrElse(this::greet, this::showSignup);

// orElse вычисляет аргумент ВСЕГДА, orElseGet — только при пустом Optional
User u1 = user.orElse(createDefaultUser());        // createDefaultUser вызовется всегда!
User u2 = user.orElseGet(this::createDefaultUser); // только если пусто` },
        { t: 'ul', items: [
          '**Не используй** Optional как поле класса, параметр метода, элемент коллекции — он не Serializable и добавляет лишний объект.',
          '**Не пиши** if (opt.isPresent()) opt.get() — это тот же null-check, только длиннее. Используй map, orElse, ifPresent.',
          'Метод, возвращающий Optional, **никогда не возвращает null**.',
          'Для коллекций «нет значения» — пустая коллекция, а не Optional<List>.',
        ] },
      ],
    },
    {
      id: 'java-modern',
      num: '1.12',
      title: 'Современная Java: records, sealed classes, pattern matching',
      blocks: [
        { t: 'p', text: 'С Java 9 версии выходят каждые полгода, а LTS-версии (с долгой поддержкой) — раз в два года: 11, 17, 21, 25 (сентябрь 2025). В продакшене в 2026 году преобладают Java 17 и 21. Ниже — то, что изменило стиль кода.' },
        { t: 'h3', text: '1.12.1. var (Java 10)' },
        { t: 'p', text: 'Вывод типа локальной переменной: var orders = new ArrayList<Order>(). Тип по-прежнему статический — его выводит компилятор. Уместен, когда тип очевиден из правой части.' },
        { t: 'h3', text: '1.12.2. Records (Java 16)' },
        { t: 'code', text: `public record OrderDto(long id, String status, List<ItemDto> items) {
    public OrderDto {                                // компактный конструктор
        Objects.requireNonNull(status);
        items = List.copyOf(items);                  // защитная копия
    }
    public int itemCount() { return items.size(); } // можно добавлять методы
    public static OrderDto empty(long id) { return new OrderDto(id, "NEW", List.of()); }
}

var dto = new OrderDto(1, "PAID", List.of());
dto.id();          // аксессор — без префикса get
dto.equals(other); // equals, hashCode и toString сгенерированы по всем компонентам` },
        { t: 'ul', items: [
          'record — **прозрачный носитель неизменяемых данных**: класс final, поля private final, наследовать другие классы нельзя (неявно extends java.lang.Record), реализовывать интерфейсы — можно.',
          'Идеален для DTO, ответов API, ключей map, событий, значений-объектов (Money, Coordinates).',
          'equals, hashCode и toString генерируются через invokedynamic (ObjectMethods.bootstrap) — компактный байткод.',
          '**Не подходит для сущностей JPA**: Hibernate требует конструктор без аргументов, изменяемые поля и прокси-наследование. Но records отлично работают как проекции запросов.',
          'Jackson (с 2.12) сериализует и десериализует records без настроек.',
        ] },
        { t: 'h3', text: '1.12.3. Sealed classes (Java 17)' },
        { t: 'p', text: '**Запечатанный** класс или интерфейс явно перечисляет, кто может его наследовать. Наследники должны быть final, sealed или non-sealed. Так в Java появились **алгебраические типы данных**: компилятор знает все варианты.' },
        { t: 'code', text: `public sealed interface PaymentResult
        permits Success, Declined, Pending {}

public record Success(String transactionId) implements PaymentResult {}
public record Declined(String reason, boolean retryable) implements PaymentResult {}
public record Pending(Duration retryAfter) implements PaymentResult {}` },
        { t: 'h3', text: '1.12.4. Pattern matching' },
        { t: 'code', text: `// instanceof с привязкой переменной (Java 16)
if (obj instanceof String s && !s.isBlank()) {
    System.out.println(s.length());
}

// switch-выражение (Java 14) + pattern matching (Java 21) + деконструкция records
String describe(PaymentResult r) {
    return switch (r) {
        case Success(String txId)                  -> "оплачено, транзакция " + txId;
        case Declined(String reason, boolean retry)
                when retry                         -> "отказ, можно повторить: " + reason;
        case Declined d                            -> "отказ: " + d.reason();
        case Pending p                             -> "повтор через " + p.retryAfter();
    };   // default не нужен: компилятор проверил, что все варианты sealed-интерфейса покрыты
}` },
        { t: 'p', text: '**Исчерпывающая проверка** — главный выигрыш: если добавить в permits новый вариант Refunded, все такие switch перестанут компилироваться, пока его не обработают. Раньше это делали паттерном Visitor или цепочками instanceof, и забытый случай всплывал только в продакшене.' },
        { t: 'h3', text: '1.12.5. Что ещё полезно знать' },
        { t: 'ul', items: [
          '**Text blocks** (Java 15): многострочные строки """ … """ для SQL и JSON в коде и тестах.',
          '**Виртуальные потоки** (Java 21) — раздел 1.18.',
          '**Sequenced collections** (Java 21): list.getFirst(), list.reversed(), map.firstEntry().',
          '**Улучшенные NullPointerException** (Java 14): сообщение указывает, что именно было null — «Cannot invoke "String.length()" because "user.name" is null».',
          '**Java 22–25:** безымянные переменные _ в паттернах и catch, Foreign Function and Memory API вместо JNI, Stream Gatherers (свои промежуточные операции), Scoped Values и structured concurrency (стандартизированы к Java 25), компактные исходники и main без класса для обучения, компактные заголовки объектов.',
        ] },
      ],
    },
    {
      id: 'java-reflection',
      num: '1.13',
      title: 'Аннотации, рефлексия, динамические прокси',
      blocks: [
        { t: 'h3', text: '1.13.1. Аннотации' },
        { t: 'p', text: 'Аннотация — метаданные, прикреплённые к классу, методу, полю или параметру. Сама по себе ничего не делает: её читает компилятор, процессор аннотаций при сборке или код через рефлексию во время выполнения.' },
        { t: 'code', text: `@Target(ElementType.METHOD)                  // где можно ставить
@Retention(RetentionPolicy.RUNTIME)          // сохранить до времени выполнения
public @interface Timed {
    String value() default "";               // параметр аннотации
    boolean logArgs() default false;
}

public class OrderService {
    @Timed(value = "orders.create", logArgs = true)
    public Order create(CreateOrderRequest req) { … }
}` },
        { t: 'table', caption: 'Таблица 11. RetentionPolicy', headers: ['Значение', 'Где доступна', 'Пример'], rows: [
          ['SOURCE', 'только в исходнике, отбрасывается компилятором', '@Override, @SuppressWarnings, аннотации Lombok'],
          ['CLASS (по умолчанию)', 'в class-файле, но не через рефлексию', 'инструменты анализа байткода'],
          ['RUNTIME', 'через рефлексию во время выполнения', '@Transactional, @Entity, @GetMapping, @Test'],
        ] },
        { t: 'p', text: '**Обработка при компиляции** (annotation processing): процессор генерирует новый код до компиляции. Так работают Lombok (вмешивается в синтаксическое дерево, что формально не поддерживается API), MapStruct (генерирует мапперы), Dagger (DI без рефлексии). Это быстрее рефлексии во время выполнения и проверяется при сборке.' },
        { t: 'h3', text: '1.13.2. Рефлексия' },
        { t: 'code', text: `Class<?> cls = Class.forName("com.acme.OrderService");
Object service = cls.getDeclaredConstructor().newInstance();

for (Method m : cls.getDeclaredMethods()) {
    Timed timed = m.getAnnotation(Timed.class);
    if (timed != null) {
        System.out.println(m.getName() + " → " + timed.value());
    }
}

Field f = cls.getDeclaredField("repo");
f.setAccessible(true);                    // доступ к private-полю
f.set(service, new InMemoryRepo());       // так когда-то работала инъекция в поля` },
        { t: 'ul', items: [
          'Рефлексия — фундамент фреймворков: Spring находит компоненты и внедряет зависимости, Hibernate заполняет сущности, Jackson читает поля, JUnit находит методы @Test.',
          '**Цена:** проверки доступа, упаковка аргументов в Object[], нет инлайнинга. JVM оптимизирует частые рефлексивные вызовы — с Java 18 Method.invoke реализован через **MethodHandle**, который JIT умеет инлайнить.',
          '**Ломает инкапсуляцию:** setAccessible(true) обходит private. С Java 16 модульная система **запрещает** глубокую рефлексию во внутренности JDK по умолчанию — отсюда ошибки InaccessibleObjectException у старых библиотек и флаги --add-opens.',
          'Ошибки видны только во время выполнения: опечатка в имени метода — NoSuchMethodException.',
          '**MethodHandle / VarHandle** (java.lang.invoke) — современная быстрая альтернатива для фреймворков.',
        ] },
        { t: 'h3', text: '1.13.3. Динамические прокси' },
        { t: 'p', text: '**Прокси** — объект-заместитель, который перехватывает вызовы методов и может добавить поведение до и после: транзакции, логирование, кеширование, проверку прав, ленивую загрузку. Это основа Spring AOP, Hibernate и Mockito.' },
        { t: 'p', text: '**JDK dynamic proxy** (java.lang.reflect.Proxy) создаёт во время выполнения класс, реализующий **интерфейсы**, и направляет все вызовы в InvocationHandler:' },
        { t: 'code', text: `@SuppressWarnings("unchecked")
static <T> T timed(T target, Class<T> iface) {
    return (T) Proxy.newProxyInstance(
        iface.getClassLoader(),
        new Class<?>[] { iface },
        (proxy, method, args) -> {                          // InvocationHandler
            long start = System.nanoTime();
            try {
                return method.invoke(target, args);         // вызов настоящего объекта
            } catch (InvocationTargetException e) {
                throw e.getCause();                 // разворачиваем исходное исключение
            } finally {
                long micros = (System.nanoTime() - start) / 1000;
                System.out.printf("%s: %d мкс%n", method.getName(), micros);
            }
        });
}

OrderRepository repo = timed(new JdbcOrderRepository(ds), OrderRepository.class);
repo.findById(42);   // печатает время выполнения` },
        { t: 'table', caption: 'Таблица 12. Два вида прокси', headers: ['', 'JDK Proxy', 'CGLIB / ByteBuddy'], rows: [
          ['как', 'новый класс, реализующий интерфейсы', 'генерируется **подкласс** целевого класса'],
          ['требования', 'нужен интерфейс', 'класс и методы не final, нужен доступный конструктор'],
          ['что перехватывается', 'методы интерфейса', 'все не-final, не-private методы'],
          ['где используется', 'Spring при наличии интерфейса (если явно настроено), Spring Data репозитории', 'Spring Boot по умолчанию (proxyTargetClass = true), Hibernate lazy-прокси, Mockito'],
        ] },
        { t: 'p', text: 'Отсюда ограничения, которые всплывают в Spring и Hibernate: **final-класс или final-метод нельзя проксировать** через подкласс; **private-методы** не перехватываются; **вызов метода из того же объекта** (this.method()) идёт мимо прокси (раздел 1.27). В Kotlin классы final по умолчанию — поэтому для Spring нужен плагин kotlin-allopen.' },
      ],
      terms: [
        ['annotation processing', 'генерация кода на основе аннотаций во время компиляции.'],
        ['CGLIB', 'библиотека генерации подклассов-прокси во время выполнения.'],
        ['MethodHandle', 'типизированная быстрая ссылка на метод, поле или конструктор.'],
      ],
    },
    {
      id: 'java-threads',
      num: '1.14',
      divider: 'Java: многопоточность',
      title: 'Потоки, прерывание и Java Memory Model',
      blocks: [
        { t: 'h3', text: '1.14.1. Поток в Java' },
        { t: 'p', text: 'До Java 21 каждый объект Thread — это **поток операционной системы** (платформенный поток, соотношение 1:1). Стек потока по умолчанию 512 КБ – 1 МБ (-Xss), создание и переключение идут через ядро ОС. Поэтому потоков в приложении — сотни или тысячи, а не миллионы, и их держат в пулах (раздел 1.16).' },
        { t: 'code', text: `Thread t = new Thread(() ->
    System.out.println("работаю в " + Thread.currentThread().getName()));
t.start();     // новый поток; t.run() выполнил бы код в ТЕКУЩЕМ потоке
t.join();      // дождаться завершения

// Java 21
Thread.ofPlatform().name("worker-", 0).start(task);
Thread.ofVirtual().start(task);` },
        { t: 'table', caption: 'Таблица 13. Состояния потока (Thread.State)', headers: ['Состояние', 'Когда'], rows: [
          ['NEW', 'создан, start() ещё не вызван'],
          ['RUNNABLE', 'выполняется или готов выполняться (в том числе в блокирующем вводе-выводе с точки зрения JVM)'],
          ['BLOCKED', 'ждёт монитор, чтобы войти в synchronized'],
          ['WAITING', 'ждёт без таймаута: wait(), join(), LockSupport.park()'],
          ['TIMED_WAITING', 'ждёт с таймаутом: sleep(n), wait(n), join(n)'],
          ['TERMINATED', 'завершён'],
        ] },
        { t: 'p', text: '**Daemon-потоки** не мешают JVM завершиться: когда остаются только они, JVM выходит. Необработанное исключение в потоке завершает только этот поток (не всю JVM), печатается через UncaughtExceptionHandler.' },
        { t: 'h3', text: '1.14.2. Прерывание' },
        { t: 'p', text: 'В Java нельзя безопасно «убить» поток — Thread.stop() устарел и удалён, потому что останавливал поток в произвольной точке, оставляя объекты в несогласованном состоянии. Вместо этого — **кооперативное прерывание**: t.interrupt() выставляет потоку флаг, а поток сам решает, когда остановиться.' },
        { t: 'ul', items: [
          'если поток **заблокирован** в sleep, wait, join, BlockingQueue.take и других прерываемых методах — он просыпается с **InterruptedException**, а флаг **сбрасывается**;',
          'если поток работает — флаг просто выставлен, поток должен проверять Thread.currentThread().isInterrupted();',
          'обычный блокирующий ввод-вывод через java.io **не прерывается** — для этого есть каналы NIO (InterruptibleChannel) или закрытие сокета.',
        ] },
        { t: 'code', text: `public void run() {
    while (!Thread.currentThread().isInterrupted()) {
        try {
            Task t = queue.take();           // прерываемое ожидание
            process(t);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();  // восстановить флаг — его сбросили!
            break;                               // и выйти
        }
    }
}

// Плохо — так делать нельзя
try { Thread.sleep(1000); } catch (InterruptedException ignored) {}  // прерывание потеряно` },
        { t: 'p', text: 'Почему важно не глотать InterruptedException: прерыванием пользуется ExecutorService.shutdownNow(), Future.cancel(true), фреймворки при остановке приложения. Проглоченное прерывание — и поток не завершится, приложение не остановится корректно.' },
        { t: 'h3', text: '1.14.3. Зачем нужна модель памяти' },
        { t: 'p', text: 'Без синхронизации поток **не обязан** видеть записи другого потока, и порядок записей может выглядеть переставленным. Причины: JIT держит значения в регистрах и переставляет инструкции, процессор переставляет операции с памятью и пишет через собственные кеши и store buffer.' },
        { t: 'code', text: `class Worker {
    private boolean running = true;       // без volatile

    void stop() { running = false; }      // вызывается из другого потока

    void loop() {
        while (running) { /* работа без синхронизации */ }
        // JIT вправе превратить цикл в while(true): «running внутри не меняется»
    }
}` },
        { t: 'h3', text: '1.14.4. Java Memory Model и happens-before' },
        { t: 'p', text: '**JMM** (JSR-133, Java 5) определяет, какие значения может увидеть чтение переменной. Центральное понятие — **happens-before**: если действие A happens-before B, то все записи, сделанные до A, видны в B. Правила:' },
        { t: 'ul', items: [
          '**порядок программы:** внутри одного потока каждое действие happens-before следующих;',
          '**монитор:** освобождение монитора (выход из synchronized) happens-before каждого последующего захвата того же монитора;',
          '**volatile:** запись в volatile-переменную happens-before каждого последующего чтения этой переменной;',
          '**запуск потока:** t.start() happens-before любых действий в потоке t;',
          '**завершение потока:** все действия потока happens-before возврата из t.join();',
          '**прерывание:** t.interrupt() happens-before обнаружения прерывания в t;',
          '**final-поля:** конец конструктора happens-before чтения final-полей через ссылку, полученную после конструктора (раздел 1.4.3);',
          '**транзитивность:** если A hb B и B hb C, то A hb C.',
        ] },
        { t: 'p', text: 'Транзитивность — то, что делает синхронизацию полезной: записи **до** volatile-записи видны потоку, который прочитал это volatile-значение, даже если сами переменные не volatile.' },
        { t: 'code', text: `class Publisher {
    private Config config;                 // обычное поле
    private volatile boolean ready;        // флаг публикации

    void publish() {                       // поток A
        config = loadConfig();             // 1
        ready = true;                      // 2: volatile-запись
    }

    Config read() {                        // поток B
        if (ready) {                       // 3: volatile-чтение видит true
            return config;                 // 4: видит полный config (1 hb 2 hb 3 hb 4)
        }
        return null;
    }
}` },
        { t: 'p', text: '**Гонка данных** в терминах JMM — два доступа к одной переменной из разных потоков, хотя бы один — запись, не упорядоченных happens-before. Программа без гонок ведёт себя **последовательно согласованно** (как будто потоки выполняются по очереди) — это гарантия DRF-SC (data-race-free → sequential consistency). С гонкой возможны странные результаты, но, в отличие от C++ и Go, JMM гарантирует хотя бы отсутствие значений «из воздуха» и неразорванность ссылок и 32-битных значений (long и double без volatile формально могут читаться половинками, на 64-битных JVM на практике нет).' },
        { t: 'h3', text: '1.14.5. Безопасная публикация' },
        { t: 'p', text: 'Объект, созданный в одном потоке и переданный другому без синхронизации, может быть виден **частично сконструированным**: ссылка уже видна, а поля ещё нули. Безопасно опубликовать объект можно так:' },
        { t: 'ul', items: [
          'инициализировать его в статическом инициализаторе;',
          'записать ссылку в volatile-поле или AtomicReference;',
          'записать в поле, защищённое блокировкой;',
          'положить в потокобезопасную коллекцию (ConcurrentHashMap, BlockingQueue);',
          'сделать объект **неизменяемым с final-полями** — он безопасен даже при публикации через гонку.',
        ] },
      ],
      terms: [
        ['JMM', 'Java Memory Model — правила видимости и упорядочения операций с памятью между потоками.'],
        ['happens-before', 'отношение, гарантирующее видимость записей одного действия в другом.'],
        ['DRF-SC', 'программа без гонок данных ведёт себя последовательно согласованно.'],
      ],
    },
    {
      id: 'java-sync',
      num: '1.15',
      title: 'synchronized, volatile, locks, atomics',
      blocks: [
        { t: 'h3', text: '1.15.1. synchronized' },
        { t: 'code', text: `public class Account {
    private long balance;

    public synchronized void deposit(long amount) {   // монитор this
        balance += amount;
    }

    public void transfer(Account to, long amount) {
        Account first = this.id < to.id ? this : to;   // единый порядок — против deadlock
        Account second = first == this ? to : this;
        synchronized (first) {
            synchronized (second) {
                this.balance -= amount;
                to.balance += amount;
            }
        }
    }

    public static synchronized void audit() {}       // монитор Account.class
}` },
        { t: 'p', text: 'synchronized даёт сразу две гарантии: **взаимное исключение** (в блоке одного монитора одновременно один поток) и **видимость** (всё, что сделано до выхода из блока, видно следующему, кто войдёт). Монитор **реентерабельный**: поток, уже держащий монитор, может войти повторно — счётчик увеличится.' },
        { t: 'p', text: '**Как устроено.** В байткоде блок — инструкции monitorenter и monitorexit (и ещё один monitorexit на пути исключения). Состояние блокировки хранится в **mark word** заголовка объекта:' },
        { t: 'ul', items: [
          '**без конкуренции** — лёгкая (thin) блокировка: поток атомарным CAS записывает в заголовок ссылку на запись блокировки в своём стеке; с Java 21 новая схема lightweight locking хранит владельцев в отдельном стеке блокировок потока;',
          '**при конкуренции** блокировка «раздувается» (inflation) до полноценного **ObjectMonitor** — структуры с очередью ждущих потоков, которые паркуются через ОС;',
          '**biased locking** — оптимизация «блокировку всегда берёт один поток» — отключена в Java 15 и удалена в Java 18: её поддержка стала дороже выигрыша.',
        ] },
        { t: 'p', text: '**wait / notify** работают только внутри synchronized на том же объекте: wait() освобождает монитор и ждёт, notify() будит один ждущий поток, notifyAll() — всех. Ждать всегда нужно в цикле while (!условие) wait(); — из-за ложных пробуждений (spurious wakeups) и потому что условие могло снова стать ложным. Сегодня вместо wait/notify используют java.util.concurrent.' },
        { t: 'h3', text: '1.15.2. volatile' },
        { t: 'p', text: 'volatile даёт **видимость и упорядочение**, но **не атомарность**:' },
        { t: 'ul', items: [
          'запись в volatile сразу становится видна другим потокам; чтение всегда видит последнюю запись;',
          'операции до volatile-записи нельзя переставить после неё, после volatile-чтения — до него. На x86 это стоит одну инструкцию-барьер на запись (lock add или xchg), чтение почти бесплатно;',
          '**count++ на volatile-поле — по-прежнему гонка**: это чтение, сложение и запись, и два потока могут прочитать одно значение. Для счётчиков — AtomicLong или LongAdder.',
        ] },
        { t: 'p', text: 'Когда volatile достаточно: флаг остановки, публикация неизменяемого объекта (volatile Config config), значение, которое пишет один поток, а читают многие.' },
        { t: 'code', text: `// Double-checked locking: без volatile — СЛОМАН
public class Holder {
    private static volatile Holder instance;    // volatile обязателен
    public static Holder get() {
        Holder h = instance;
        if (h == null) {
            synchronized (Holder.class) {
                h = instance;
                if (h == null) {
                    instance = h = new Holder();
                }
            }
        }
        return h;
    }
}
// Без volatile другой поток может увидеть ссылку на объект раньше,
// чем запись его полей: new = выделить память → записать ссылку → вызвать конструктор
// после перестановки. Лучше — идиома Holder из раздела 1.5.2 или enum-синглтон.` },
        { t: 'h3', text: '1.15.3. Lock и ReentrantLock' },
        { t: 'code', text: `private final ReentrantLock lock = new ReentrantLock();
private final Condition notEmpty = lock.newCondition();

public Item take(Duration timeout) throws InterruptedException {
    if (!lock.tryLock(timeout.toMillis(), TimeUnit.MILLISECONDS)) {  // попытка с таймаутом
        throw new TimeoutException();
    }
    try {
        while (items.isEmpty()) {
            notEmpty.await();          // аналог wait, но условий может быть несколько
        }
        return items.removeFirst();
    } finally {
        lock.unlock();                 // ВСЕГДА в finally
    }
}` },
        { t: 'table', caption: 'Таблица 14. synchronized или ReentrantLock', headers: ['Возможность', 'synchronized', 'ReentrantLock'], rows: [
          ['попытка без ожидания / с таймаутом', 'нет', 'tryLock()'],
          ['прерываемое ожидание', 'нет', 'lockInterruptibly()'],
          ['честная очередь (fair)', 'нет', 'new ReentrantLock(true) — медленнее'],
          ['несколько условий ожидания', 'одно (wait/notify)', 'много Condition'],
          ['освобождение', 'автоматически', 'вручную в finally'],
          ['блокировка не по вложенным блокам', 'нет', 'да (hand-over-hand)'],
        ] },
        { t: 'p', text: 'Под капотом ReentrantLock построен на **AbstractQueuedSynchronizer (AQS)** — общей основе почти всех синхронизаторов java.util.concurrent (Semaphore, CountDownLatch, ReentrantReadWriteLock): целое число состояния, которое меняется через CAS, и очередь ждущих потоков (вариант CLH-очереди), которые паркуются через LockSupport.park.' },
        { t: 'ul', items: [
          '**ReentrantReadWriteLock** — много читателей или один писатель; выигрывает при частых долгих чтениях.',
          '**StampedLock** (Java 8) — с **оптимистичным чтением**: tryOptimisticRead() возвращает «штамп» без блокировки, после чтения validate(stamp) проверяет, не было ли записи. Очень быстро для редких записей, но не реентерабелен.',
          '**Semaphore** — ограничить число одновременных доступов (например, не больше 10 запросов к внешнему API).',
          '**CountDownLatch** — дождаться N событий; **CyclicBarrier** — N потоков ждут друг друга; **Phaser** — гибкая многофазная версия.',
        ] },
        { t: 'h3', text: '1.15.4. Атомарные переменные и CAS' },
        { t: 'p', text: 'Классы java.util.concurrent.atomic (AtomicInteger, AtomicLong, AtomicReference, AtomicBoolean) построены на **CAS** — Compare-And-Swap: процессорная инструкция (cmpxchg на x86) атомарно меняет значение, только если оно равно ожидаемому. Это **lock-free**: потоки не блокируются, при конфликте просто повторяют попытку.' },
        { t: 'code', text: `AtomicLong counter = new AtomicLong();
counter.incrementAndGet();

// Что делает incrementAndGet внутри (упрощённо)
long prev, next;
do {
    prev = value;              // volatile-чтение
    next = prev + 1;
} while (!compareAndSet(prev, next));   // кто-то успел раньше — повторяем

// Обновление по функции
AtomicReference<Config> cfg = new AtomicReference<>(initial);
cfg.updateAndGet(c -> c.withTimeout(Duration.ofSeconds(5)));` },
        { t: 'ul', items: [
          '**LongAdder** — для счётчиков с высокой конкуренцией: держит несколько ячеек (по одной на «горячий» поток, как Striped64), каждый поток инкрементирует свою, а sum() складывает. При сильной конкуренции в разы быстрее AtomicLong, потому что потоки не спорят за одну строку кеша. Минус — sum() не атомарный снимок.',
          '**Проблема ABA:** значение было A, стало B и снова A — CAS не заметит изменения. Важно для lock-free структур с переиспользованием узлов; решается AtomicStampedReference (значение + версия).',
          '**False sharing:** две независимые переменные в одной строке кеша (64 байта) мешают друг другу при записи из разных ядер. JDK использует аннотацию @Contended для разнесения полей.',
        ] },
      ],
      terms: [
        ['монитор', 'механизм взаимного исключения, встроенный в каждый объект Java.'],
        ['CAS', 'compare-and-swap — атомарная замена значения при совпадении с ожидаемым.'],
        ['AQS', 'AbstractQueuedSynchronizer — основа синхронизаторов java.util.concurrent.'],
        ['false sharing', 'ложное разделение строки кеша независимыми переменными.'],
      ],
    },
    {
      id: 'java-executors',
      num: '1.16',
      title: 'Executors, Future, CompletableFuture',
      blocks: [
        { t: 'h3', text: '1.16.1. Пулы потоков' },
        { t: 'p', text: 'Создавать поток на каждую задачу дорого, а неограниченное число потоков исчерпает память. **ExecutorService** отделяет задачи от потоков, которые их выполняют.' },
        { t: 'code', text: `ExecutorService pool = new ThreadPoolExecutor(
    8,                                   // corePoolSize — держать постоянно
    32,                                  // maximumPoolSize
    60, TimeUnit.SECONDS,                // сколько живёт лишний поток без работы
    new ArrayBlockingQueue<>(1000),      // ОГРАНИЧЕННАЯ очередь задач
    Thread.ofPlatform().name("orders-", 0).factory(),
    new ThreadPoolExecutor.CallerRunsPolicy()   // что делать, если всё переполнено
);

Future<Report> f = pool.submit(() -> buildReport(id));
Report r = f.get(5, TimeUnit.SECONDS);   // блокирующее ожидание с таймаутом

pool.shutdown();                          // не принимать новые, доделать текущие
if (!pool.awaitTermination(30, TimeUnit.SECONDS)) {
    pool.shutdownNow();                   // прервать работающие задачи
}` },
        { t: 'p', text: '**Как ThreadPoolExecutor принимает задачу** — частый вопрос:' },
        { t: 'ol', items: [
          'если потоков меньше corePoolSize — создаётся новый поток, даже если остальные свободны;',
          'иначе задача кладётся в **очередь**;',
          'если очередь полна и потоков меньше maximumPoolSize — создаётся дополнительный поток;',
          'если и это невозможно — срабатывает **RejectedExecutionHandler**: AbortPolicy (исключение, по умолчанию), CallerRunsPolicy (задачу выполнит вызывающий поток — естественное замедление поставщика, back-pressure), DiscardPolicy, DiscardOldestPolicy.',
        ] },
        { t: 'example', label: 'Ловушки Executors', text: 'Executors.newFixedThreadPool(n) использует **неограниченную** LinkedBlockingQueue: если задачи приходят быстрее, чем выполняются, очередь растёт до OutOfMemoryError. При этом maximumPoolSize не работает вовсе — очередь никогда не «полна». Executors.newCachedThreadPool() создаёт неограниченное число потоков. Поэтому в продакшене пул настраивают явно, через ThreadPoolExecutor с ограниченной очередью.' },
        { t: 'ul', items: [
          '**Сколько потоков:** для CPU-задач — около числа ядер; для задач с ожиданием ввода-вывода — больше: ядра × (1 + время ожидания / время вычислений). С виртуальными потоками этот подсчёт для I/O почти не нужен (раздел 1.18).',
          '**ScheduledExecutorService** — задачи по расписанию: scheduleAtFixedRate. Если задача бросит исключение, её следующие запуски молча отменятся — исключения нужно ловить внутри.',
          '**Исключения в submit()** не печатаются — они сохраняются в Future и всплывут только при get(). Задача, результат которой никто не читает, падает молча.',
          '**ForkJoinPool** — пул с work stealing для рекурсивных задач «разделяй и властвуй»; на нём работают параллельные стримы и CompletableFuture по умолчанию.',
        ] },
        { t: 'h3', text: '1.16.2. Future' },
        { t: 'p', text: 'Future<T> — результат, который будет готов позже: get() блокирует до готовности, get(timeout) — с таймаутом, cancel(true) — попытаться прервать, isDone(). Главный недостаток — нельзя сказать «когда будет готово, сделай то-то» без блокировки потока.' },
        { t: 'h3', text: '1.16.3. CompletableFuture' },
        { t: 'p', text: 'CompletableFuture (Java 8) — Future, который можно **комбинировать**: строить цепочки и объединять параллельные операции без блокировок.' },
        { t: 'code', text: `ExecutorService io = Executors.newVirtualThreadPerTaskExecutor();

var userF = CompletableFuture.supplyAsync(() -> users.get(id), io);
var ordersF = CompletableFuture.supplyAsync(() -> orders.byUser(id), io);
var balanceF = CompletableFuture.supplyAsync(() -> billing.balance(id), io)
    .completeOnTimeout(Balance.UNKNOWN, 300, TimeUnit.MILLISECONDS);   // запасное значение

CompletableFuture<Profile> profileF = userF
    .thenCombine(ordersF, (u, os) -> new Profile(u, os))              // объединить два
    .thenCombine(balanceF, Profile::withBalance)
    .orTimeout(2, TimeUnit.SECONDS)                                   // общий таймаут
    .exceptionally(e -> Profile.fallback(id));                        // обработка ошибки

Profile p = profileF.join();` },
        { t: 'table', caption: 'Таблица 15. Основные методы CompletableFuture', headers: ['Метод', 'Что делает', 'Аналог в Stream / Optional'], rows: [
          ['thenApply(f)', 'преобразовать результат', 'map'],
          ['thenCompose(f)', 'следующий асинхронный шаг, возвращающий CompletableFuture', 'flatMap'],
          ['thenCombine(other, f)', 'объединить два независимых результата', 'zip'],
          ['thenAccept / thenRun', 'действие с результатом / без', 'forEach'],
          ['allOf(…) / anyOf(…)', 'дождаться всех / первого', ''],
          ['exceptionally(f)', 'заменить ошибку значением', 'orElse'],
          ['handle((v, e) -> …)', 'обработать и успех, и ошибку', ''],
          ['whenComplete', 'побочное действие, результат не меняется', 'peek'],
        ] },
        { t: 'ul', items: [
          '**Где выполняется колбэк:** thenApply без Async — в потоке, который завершил предыдущую стадию, или в вызывающем, если стадия уже завершена. thenApplyAsync — в пуле.',
          '**Пул по умолчанию** — ForkJoinPool.commonPool(). Блокирующие вызовы (БД, HTTP) в нём забивают общий пул, поэтому для ввода-вывода передают свой Executor вторым аргументом.',
          'Ошибки оборачиваются в **CompletionException**; join() бросает её, get() — ExecutionException с причиной внутри.',
          'cancel() у CompletableFuture **не прерывает** выполняющуюся задачу — только помечает результат отменённым.',
        ] },
      ],
    },
    {
      id: 'java-concurrent',
      num: '1.17',
      title: 'Конкурентные коллекции и ThreadLocal',
      blocks: [
        { t: 'h3', text: '1.17.1. Почему не synchronizedMap' },
        { t: 'p', text: 'Collections.synchronizedMap(map) и Hashtable защищают каждую операцию **одной общей блокировкой**: потоки выстраиваются в очередь даже на чтении. И составные операции всё равно не атомарны: if (!map.containsKey(k)) map.put(k, v) — между проверкой и записью может вклиниться другой поток.' },
        { t: 'h3', text: '1.17.2. ConcurrentHashMap' },
        { t: 'ul', items: [
          '**Java 7:** таблица делилась на 16 **сегментов**, у каждого свой ReentrantLock — 16 потоков могли писать параллельно.',
          '**Java 8+:** сегментов нет. **Чтение без блокировок** — элементы таблицы читаются как volatile. **Вставка в пустой бакет — CAS**. Вставка в непустой бакет — synchronized **на первом узле этого бакета**: блокируется только одна ячейка таблицы. Длинные цепочки, как в HashMap, превращаются в деревья.',
          '**Расширение — кооперативное:** когда таблица растёт, потоки, пришедшие с записью, **помогают переносить** бакеты (каждый берёт свой диапазон), а перенесённые бакеты помечаются узлом ForwardingNode, который перенаправляет чтения в новую таблицу.',
          'Счётчик размера устроен как LongAdder — size() приблизителен при конкурентных изменениях; для больших map есть mappingCount().',
          '**null запрещён** и как ключ, и как значение: иначе get(k) == null не отличить «нет ключа» от «значение null», а проверить containsKey отдельно нельзя атомарно.',
          'Итераторы **слабо согласованы** (weakly consistent): не бросают ConcurrentModificationException и отражают состояние на какой-то момент во время обхода.',
        ] },
        { t: 'code', text: `ConcurrentHashMap<String, LongAdder> hits = new ConcurrentHashMap<>();

// Атомарные составные операции — вместо get + put
hits.computeIfAbsent(path, k -> new LongAdder()).increment();

Map<Long, User> cache = new ConcurrentHashMap<>();
User u = cache.computeIfAbsent(id, this::loadUser);   // loadUser вызовется один раз на ключ

counts.merge(word, 1, Integer::sum);                  // атомарный подсчёт слов` },
        { t: 'p', text: 'Функция в computeIfAbsent выполняется **под блокировкой бакета** — она должна быть быстрой и **не должна менять ту же map** (в Java 8 это могло вызвать бесконечный цикл, сейчас — IllegalStateException). Для загрузки из сети или БД лучше кеш-библиотека Caffeine.' },
        { t: 'h3', text: '1.17.3. Другие конкурентные коллекции' },
        { t: 'table', caption: 'Таблица 16. java.util.concurrent', headers: ['Коллекция', 'Устройство', 'Когда'], rows: [
          ['CopyOnWriteArrayList', 'при каждой записи копирует весь массив; чтение без блокировок по снимку', 'читают часто, пишут редко: списки слушателей, конфигурация'],
          ['ConcurrentSkipListMap / Set', 'список с пропусками на CAS, отсортированный', 'конкурентный аналог TreeMap'],
          ['ConcurrentLinkedQueue', 'lock-free очередь (алгоритм Майкла–Скотта)', 'неблокирующая очередь'],
          ['ArrayBlockingQueue', 'кольцевой буфер, один ReentrantLock, ограниченная', 'производитель — потребитель с ограничением'],
          ['LinkedBlockingQueue', 'связный список, две блокировки (голова и хвост)', 'по умолчанию неограниченная — задавай ёмкость'],
          ['SynchronousQueue', 'без ёмкости: передача из рук в руки', 'newCachedThreadPool'],
          ['PriorityBlockingQueue, DelayQueue', 'куча с блокировками; элементы с задержкой', 'задачи по приоритету и по времени'],
        ] },
        { t: 'code', text: `BlockingQueue<Event> queue = new ArrayBlockingQueue<>(10_000);

// производитель
if (!queue.offer(event, 100, TimeUnit.MILLISECONDS)) {   // не блокироваться бесконечно
    droppedEvents.increment();
}

// потребитель
while (!Thread.currentThread().isInterrupted()) {
    Event e = queue.take();             // ждёт, пока не появится элемент
    handle(e);
}` },
        { t: 'h3', text: '1.17.4. ThreadLocal' },
        { t: 'p', text: '**ThreadLocal** — переменная, у которой своё значение в каждом потоке. Используется для контекста запроса (пользователь, trace id, транзакция в Spring, MDC в логах) и для непотокобезопасных объектов, которые дорого создавать (раньше — SimpleDateFormat).' },
        { t: 'p', text: '**Как устроено:** значения хранятся не в ThreadLocal, а **в самом потоке** — у каждого Thread есть поле threadLocals типа ThreadLocalMap (хеш-таблица с открытой адресацией). Ключ — сам объект ThreadLocal по **слабой ссылке**, значение — по сильной.' },
        { t: 'example', label: 'Утечка через ThreadLocal в пуле потоков', text: 'Потоки пула живут долго и переиспользуются. Если положить в ThreadLocal данные пользователя и не удалить, следующий запрос в этом потоке **увидит чужие данные** — это и утечка памяти, и уязвимость. А если ThreadLocal хранит объект класса веб-приложения, при передеплое в Tomcat загрузчик классов не может быть собран — утечка Metaspace. Правило: try { holder.set(x); … } finally { holder.remove(); }.' },
        { t: 'code', text: `private static final ThreadLocal<RequestContext> CTX = new ThreadLocal<>();

public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
        throws IOException, ServletException {
    CTX.set(RequestContext.from(req));
    try {
        chain.doFilter(req, res);
    } finally {
        CTX.remove();          // обязательно
    }
}` },
        { t: 'ul', items: [
          '**InheritableThreadLocal** копирует значение в дочерние потоки при создании — но не в потоки пула, созданные заранее.',
          '**Асинхронность ломает ThreadLocal:** код в CompletableFuture или @Async выполняется в другом потоке и не видит значения. Контекст переносят вручную или обёртками (TaskDecorator в Spring, context propagation в Micrometer).',
          '**С виртуальными потоками** ThreadLocal работает, но миллион потоков — миллион копий значений. Для них сделаны **ScopedValue** (стандартизированы в Java 25): неизменяемое значение в ограниченной области кода, дешёвое и автоматически исчезающее.',
        ] },
      ],
    },
    {
      id: 'java-virtual',
      num: '1.18',
      title: 'Виртуальные потоки, гонки и deadlock',
      blocks: [
        { t: 'h3', text: '1.18.1. Проблема, которую решают виртуальные потоки' },
        { t: 'p', text: 'Классический сервер «поток на запрос» (Tomcat) упирается в число потоков ОС: если каждый запрос 200 мс ждёт базу и внешний API, то 200 потоков пула обслуживают максимум 1000 запросов в секунду, хотя CPU почти свободен. Альтернатива — реактивное программирование (WebFlux, Project Reactor) — масштабируется, но код превращается в цепочки операторов, стеки ошибок нечитаемы, отладка тяжела.' },
        { t: 'h3', text: '1.18.2. Как устроены виртуальные потоки (Java 21)' },
        { t: 'ul', items: [
          'Виртуальный поток — объект Thread, которым управляет **JVM**, а не ОС. Он выполняется на небольшом пуле платформенных потоков-**носителей** (carrier threads) — ForkJoinPool с числом потоков по числу ядер. Модель M:N, как горутины в Go.',
          'Стек виртуального потока хранится **в куче** как объекты-фрагменты и растёт по необходимости: виртуальный поток стоит сотни байт – единицы КБ, их можно создать **миллионы**.',
          'Когда виртуальный поток выполняет **блокирующую операцию** (чтение сокета, ожидание в BlockingQueue, sleep, JDBC-запрос), JVM **снимает его с носителя** (unmount): копирует кадры стека в кучу и освобождает носитель для другого виртуального потока. Когда данные готовы — поток снова монтируется на любой свободный носитель. Для этого всё блокирующее в JDK (сокеты, java.util.concurrent) переписано так, чтобы паркование было «виртуально-осведомлённым».',
          'Код остаётся **обычным синхронным**: стек вызовов читается, исключения понятны, отладчик работает.',
        ] },
        { t: 'code', text: `try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<Price>> futures = itemIds.stream()
        .map(id -> executor.submit(() -> priceClient.get(id)))   // 10 000 задач и потоков
        .toList();
    for (Future<Price> f : futures) {
        prices.add(f.get());
    }
}   // close() дождётся всех задач

// Spring Boot 3.2+: весь Tomcat на виртуальных потоках одной настройкой
// spring.threads.virtual.enabled=true` },
        { t: 'h3', text: '1.18.3. Ограничения виртуальных потоков' },
        { t: 'ul', items: [
          '**Pinning (закрепление):** до Java 24 виртуальный поток, заблокировавшийся **внутри synchronized**, не мог отцепиться от носителя — носитель простаивал. При нескольких таких потоках все носители заняты, и приложение вставало. Рекомендация для Java 21 — заменять synchronized вокруг блокирующих операций на ReentrantLock. В **Java 24** (JEP 491) synchronized больше не закрепляет поток. Нативные вызовы (JNI) и некоторые операции файловой системы по-прежнему закрепляют.',
          '**Не пулить виртуальные потоки.** Они дешёвые — создаются на каждую задачу. Ограничивать нужно **ресурс**, а не потоки: для 10 000 виртуальных потоков, идущих в базу, пул соединений всё равно 20 — конкурентный доступ ограничивают Semaphore или размером пула соединений.',
          '**Не ускоряют вычисления.** Выигрыш — только для задач, которые много ждут ввода-вывода. Для CPU-задач нужны платформенные потоки по числу ядер.',
          '**ThreadLocal** с тяжёлыми объектами на миллионе потоков — расход памяти (раздел 1.17.4).',
        ] },
        { t: 'h3', text: '1.18.4. Состояние гонки' },
        { t: 'p', text: '**Race condition** — результат зависит от того, в каком порядке выполнились потоки. Важно различать: **гонка данных** — несинхронизированный доступ к памяти (раздел 1.14.4); **состояние гонки** — логическая ошибка, которая может быть и при полностью синхронизированных операциях.' },
        { t: 'code', text: `// check-then-act: каждая операция потокобезопасна, а вместе — нет
if (!map.containsKey(key)) {          // поток 1 и поток 2 оба видят false
    map.put(key, create());           // оба создают значение
}
// Правильно: атомарная составная операция
map.computeIfAbsent(key, k -> create());

// read-modify-write
if (account.getBalance() >= amount) { // оба потока видят 1000
    account.withdraw(amount);         // оба снимают по 1000 → баланс −1000
}
// Правильно: проверка и изменение под одной блокировкой
// или атомарно в базе: UPDATE … SET balance = balance - ? WHERE id = ? AND balance >= ?` },
        { t: 'p', text: 'Те же гонки бывают **между экземплярами сервиса**: два пода одновременно обрабатывают одну оплату. Там защита — блокировки и ограничения в базе, идемпотентность (раздел общих тем про распределённые системы).' },
        { t: 'h3', text: '1.18.5. Deadlock, livelock, starvation' },
        { t: 'p', text: '**Deadlock** возникает, когда выполнены четыре условия Коффмана одновременно: взаимное исключение, удержание с ожиданием, отсутствие принудительного отъёма, **циклическое ожидание**. Разрушить проще всего последнее — **единым порядком захвата блокировок** (пример с transfer в разделе 1.15.1). Другие способы: tryLock с таймаутом и откатом, одна блокировка вместо нескольких, отсутствие вызовов чужого кода под блокировкой.' },
        { t: 'ul', items: [
          '**Livelock** — потоки не заблокированы, но постоянно уступают друг другу и не продвигаются (два человека в коридоре шагают в одну сторону). Лечится случайной задержкой перед повтором.',
          '**Starvation (голодание)** — поток не получает ресурс, потому что его постоянно перехватывают другие. Лечится честными блокировками (fair).',
        ] },
        { t: 'p', text: '**Как найти deadlock:** снять дамп потоков — jstack <pid>, jcmd <pid> Thread.print или kill -3. JVM сама находит циклы на мониторах и ReentrantLock и пишет в конце дампа: «Found one Java-level deadlock», с потоками и блокировками, которые они держат и ждут. В мониторинге — ThreadMXBean.findDeadlockedThreads().' },
        { t: 'code', text: `"pool-1-thread-2":
  waiting to lock monitor 0x00007f8b2c003f58 (object 0x000000076ab62208, a com.acme.Account),
  which is held by "pool-1-thread-1"
"pool-1-thread-1":
  waiting to lock monitor 0x00007f8b2c006358 (object 0x000000076ab62218, a com.acme.Account),
  which is held by "pool-1-thread-2"

Found 1 deadlock.` },
      ],
      terms: [
        ['carrier thread', 'платформенный поток, на котором выполняется виртуальный поток.'],
        ['pinning', 'закрепление виртуального потока за носителем, мешающее ему освободиться при блокировке.'],
        ['race condition', 'зависимость результата от порядка выполнения потоков.'],
      ],
    },
    {
      id: 'java-jvm',
      num: '1.19',
      divider: 'Java: JVM и память',
      title: 'Загрузка классов, байткод, JIT',
      blocks: [
        { t: 'h3', text: '1.19.1. Байткод' },
        { t: 'p', text: 'JVM — **стековая** машина: инструкции берут операнды со стека операндов и кладут результат обратно. Посмотреть байткод — javap -c -p Foo.class.' },
        { t: 'code', text: `int add(int a, int b) { return a + b; }

// javap -c
  0: iload_1      // положить на стек локальную переменную 1 (a)
  1: iload_2      // положить b
  2: iadd         // снять два, сложить, положить результат
  3: ireturn

// Виды вызовов
invokestatic    — статический метод
invokespecial   — конструктор, private-метод, super.method()
invokevirtual   — обычный метод класса (через vtable)
invokeinterface — метод интерфейса
invokedynamic   — связывание при первом вызове: лямбды, конкатенация строк, records` },
        { t: 'h3', text: '1.19.2. Загрузка классов' },
        { t: 'p', text: 'Класс загружается **лениво** — при первом обращении к нему. Этапы:' },
        { t: 'ol', items: [
          '**Loading** — загрузчик находит байты класса (в JAR, директории, сети) и создаёт объект Class;',
          '**Linking:** **verification** — проверка байткода: корректные типы на стеке, нет выхода за границы локальных переменных (защита от испорченных и вредоносных class-файлов); **preparation** — память под статические поля, значения по умолчанию; **resolution** — символические ссылки на другие классы и методы заменяются прямыми (часто лениво);',
          '**Initialization** — выполнение статических инициализаторов (метод clinit), один раз и потокобезопасно.',
        ] },
        { t: 'tree', lines: [
          [0, '**Bootstrap ClassLoader** — встроен в JVM (на C++): java.base — java.lang, java.util'],
          [1, '**Platform ClassLoader** (до Java 9 — Extension) — остальные модули платформы: java.sql, java.xml'],
          [2, '**Application (System) ClassLoader** — classpath приложения: твой код и библиотеки'],
          [3, 'пользовательские загрузчики: сервер приложений, Spring Boot LaunchedURLClassLoader, плагины, OSGi'],
        ] },
        { t: 'ul', items: [
          '**Делегирование родителю** (parent delegation): загрузчик сначала просит родителя загрузить класс и только если тот не смог — грузит сам. Поэтому нельзя подменить java.lang.String своим классом — его всегда загрузит Bootstrap.',
          '**Класс идентифицируется парой «имя + загрузчик».** Один и тот же com.acme.User, загруженный двумя разными загрузчиками, — два разных класса: приведение между ними даёт ClassCastException «User cannot be cast to User». Классика при горячей перезагрузке и в серверах приложений.',
          '**ClassNotFoundException** — класс не найден при явной загрузке (Class.forName). **NoClassDefFoundError** — класс был при компиляции, но не найден или не смог инициализироваться при выполнении (часто — конфликт версий библиотек или исключение в статическом инициализаторе).',
          'Загрузчик держит ссылки на все загруженные им классы, а каждый класс — на свой загрузчик. Класс выгружается только вместе с загрузчиком, когда на них нет ссылок — отсюда утечки Metaspace (раздел 1.22).',
        ] },
        { t: 'h3', text: '1.19.3. Интерпретатор и JIT' },
        { t: 'p', text: 'HotSpot начинает с **интерпретации** байткода и считает, сколько раз вызывается каждый метод и сколько итераций делают циклы. Горячий код компилируется в машинный — **многоуровневая компиляция** (tiered compilation):' },
        { t: 'table', caption: 'Таблица 17. Уровни компиляции HotSpot', headers: ['Уровень', 'Что', 'Зачем'], rows: [
          ['0', 'интерпретатор', 'старт без задержек, сбор профиля'],
          ['1–3', '**C1** (клиентский компилятор)', 'быструю компиляцию с простыми оптимизациями; уровень 3 собирает профиль: какие классы приходят, какие ветки выполняются'],
          ['4', '**C2** (серверный компилятор)', 'агрессивные оптимизации по собранному профилю — после ~10 000 вызовов'],
        ] },
        { t: 'p', text: 'Главные оптимизации JIT:' },
        { t: 'ul', items: [
          '**инлайнинг** — встраивание тела вызываемого метода; открывает все остальные оптимизации. Геттеры и маленькие методы ничего не стоят;',
          '**спекулятивная девиртуализация** — если в месте вызова всегда приходит один класс, вызов интерфейса превращается в прямой с проверкой (раздел 1.2.2);',
          '**escape analysis** — если объект не выходит за пределы метода, JIT может **не создавать его в куче** (scalar replacement — поля становятся локальными переменными) и убрать ненужные блокировки (lock elision);',
          '**удаление проверок границ массивов** в циклах, развёртка циклов, векторизация (SIMD);',
          '**удаление мёртвого кода** по профилю: ветка, которая никогда не выполнялась, не компилируется вовсе.',
        ] },
        { t: 'p', text: '**Деоптимизация.** Оптимизации спекулятивны: если в «мономорфное» место вызова впервые придёт другой класс или выполнится «невозможная» ветка, JVM выбрасывает скомпилированный код, возвращается в интерпретатор и перекомпилирует позже. Поэтому производительность Java-кода надо мерить после **прогрева** — для микробенчмарков есть **JMH**, который учитывает прогрев, мёртвый код и деоптимизации.' },
        { t: 'h3', text: '1.19.4. Быстрый старт' },
        { t: 'ul', items: [
          '**CDS / AppCDS** (Class Data Sharing) — заранее разобранные метаданные классов в архиве; ускоряет старт на десятки процентов. В Java 24–25 развивается в AOT-кеш проекта Leyden: сохраняются и загруженные классы, и профили.',
          '**GraalVM Native Image** — компиляция всего приложения заранее (AOT) в нативный бинарник: старт за десятки миллисекунд и меньше памяти, но без JIT-оптимизаций по профилю и с ограничениями на рефлексию. Поддерживается Spring Boot 3 и Quarkus — популярно для serverless.',
          '**CRaC** — снимок прогретой JVM, из которого приложение восстанавливается за миллисекунды.',
        ] },
      ],
      terms: [
        ['tiered compilation', 'многоуровневая компиляция: интерпретатор → C1 → C2.'],
        ['деоптимизация', 'откат скомпилированного кода при нарушении предположений JIT.'],
        ['JMH', 'Java Microbenchmark Harness — инструмент корректных микробенчмарков.'],
        ['AOT', 'ahead-of-time — компиляция заранее, до запуска.'],
      ],
    },
    {
      id: 'java-memory',
      num: '1.20',
      title: 'Stack, heap, Metaspace',
      blocks: [
        { t: 'h3', text: '1.20.1. Области памяти JVM' },
        { t: 'table', caption: 'Таблица 18. Память JVM', headers: ['Область', 'Что хранит', 'Чья', 'Ошибка при нехватке'], rows: [
          ['**стек потока**', 'кадры вызовов: локальные переменные (примитивы и ссылки), стек операндов, адрес возврата', 'у каждого потока свой, размер -Xss', 'StackOverflowError'],
          ['**куча** (heap)', 'все объекты и массивы, String pool, статические поля (в объекте Class)', 'общая для всех потоков, -Xms / -Xmx', 'OutOfMemoryError: Java heap space'],
          ['**Metaspace**', 'метаданные классов: структура, байткод методов, константы', 'общая, в нативной памяти, -XX:MaxMetaspaceSize', 'OutOfMemoryError: Metaspace'],
          ['**Code cache**', 'машинный код от JIT', 'общая, -XX:ReservedCodeCacheSize', 'JIT отключается — резкое падение скорости'],
          ['**direct memory**', 'буферы NIO вне кучи (ByteBuffer.allocateDirect), Netty', 'общая, -XX:MaxDirectMemorySize', 'OutOfMemoryError: Direct buffer memory'],
          ['стеки потоков, GC-структуры, библиотеки', 'нативная память JVM', '', 'процесс убивает ОС (OOM-killer)'],
        ] },
        { t: 'p', text: '**До Java 8** метаданные классов лежали в **PermGen** — части кучи фиксированного размера, и приложения с большим числом классов или горячими передеплоями падали с OutOfMemoryError: PermGen space. В Java 8 PermGen заменили **Metaspace** в нативной памяти — он растёт автоматически (по умолчанию без верхней границы), а String pool и статические поля переехали в обычную кучу.' },
        { t: 'h3', text: '1.20.2. Стек' },
        { t: 'code', text: `void handle(long id) {
    int retries = 3;                 // примитив — прямо в кадре стека
    Order order = repo.find(id);     // ссылка — в кадре стека, объект — в куче
    process(order, retries);         // новый кадр сверху
}                                    // кадр снят — ссылка исчезла, объект станет мусором,
                                     // если на него больше никто не ссылается` },
        { t: 'p', text: 'StackOverflowError — почти всегда бесконечная или слишком глубокая рекурсия: например, toString() двух сущностей, ссылающихся друг на друга, или equals в двунаправленной связи JPA. Кадры стека невелики, и по умолчанию стек выдерживает несколько тысяч–десятков тысяч вызовов.' },
        { t: 'h3', text: '1.20.3. Устройство кучи' },
        { t: 'p', text: 'В основе — **гипотеза о поколениях**: большинство объектов умирает молодыми (временные объекты запроса, итераторы, DTO), а пережившие несколько сборок живут долго (кеши, синглтоны). Поэтому классическая куча делится на поколения:' },
        { t: 'tree', lines: [
          [0, '**Young generation** — молодое поколение'],
          [1, '**Eden** — здесь создаются почти все новые объекты'],
          [1, '**Survivor S0 и S1** — объекты, пережившие сборку; один из двух всегда пуст'],
          [0, '**Old generation** (tenured) — объекты, пережившие несколько сборок (по умолчанию до 15 — счётчик возраста в mark word)'],
        ] },
        { t: 'ul', items: [
          '**Выделение памяти — почти бесплатно:** у каждого потока есть **TLAB** (thread-local allocation buffer) — свой кусок Eden. Создать объект — сдвинуть указатель в своём TLAB, без блокировок. Это быстрее, чем malloc в C.',
          '**Minor GC** чистит только молодое поколение: живые объекты из Eden и одного Survivor копируются в другой Survivor (или в Old, если возраст достиг порога), а Eden очищается целиком. Стоимость пропорциональна **живым** объектам, а не мусору — поэтому много короткоживущих объектов в Java дёшево.',
          '**Ссылки из старого поколения в молодое** отслеживаются **card table** через барьер записи — иначе для minor GC пришлось бы сканировать всё старое поколение.',
          '**Major / Full GC** чистит старое поколение (или всю кучу) — дольше.',
        ] },
        { t: 'h3', text: '1.20.4. Настройки памяти' },
        { t: 'code', text: `# -Xms и -Xmx — начальный и максимальный размер кучи (равные — без изменения размера)
java -Xms2g -Xmx2g \\
     -XX:+UseG1GC -XX:MaxGCPauseMillis=200 \\
     -XX:MaxMetaspaceSize=256m \\
     -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/dumps \\
     -Xlog:gc*:file=/logs/gc.log:time,uptime \\
     -jar app.jar

# В контейнере — доля от лимита памяти контейнера, а не абсолютные значения
java -XX:MaxRAMPercentage=75.0 -jar app.jar` },
        { t: 'p', text: '**Контейнеры:** с Java 10 (и 8u191) JVM учитывает лимиты cgroup. Без настроек максимальная куча — **25%** лимита контейнера, что обычно мало. Ставят MaxRAMPercentage около 70–75%: остальное нужно Metaspace, стекам потоков, code cache, direct-буферам. Если отдать куче 100% лимита, процесс убьёт OOM-killer Kubernetes без Java-исключения и без дампа.' },
      ],
      terms: [
        ['TLAB', 'thread-local allocation buffer — личный кусок Eden для быстрого выделения памяти потоком.'],
        ['Metaspace', 'область нативной памяти для метаданных классов (с Java 8).'],
        ['card table', 'структура, отмечающая участки старого поколения со ссылками на молодое.'],
      ],
    },
    {
      id: 'java-gc',
      num: '1.21',
      title: 'Сборщики мусора и типы ссылок',
      blocks: [
        { t: 'h3', text: '1.21.1. Как GC находит мусор' },
        { t: 'p', text: 'В Java нет подсчёта ссылок. GC обходит граф объектов от **корней** (GC roots): локальные переменные и параметры в стеках всех потоков, статические поля загруженных классов, активные потоки, JNI-ссылки, мониторы. Всё, до чего нельзя дойти, — мусор. Поэтому **циклические ссылки не мешают** сборке: два объекта, ссылающиеся друг на друга, но недостижимые из корней, будут удалены.' },
        { t: 'p', text: 'Базовые алгоритмы: **mark-sweep** (пометить и освободить — фрагментирует память), **mark-compact** (пометить и уплотнить — дорого), **копирующий** (переложить живых в чистую область — быстро для молодого поколения, где живых мало). **Stop-the-world (STW)** — пауза, на которой все потоки приложения остановлены в безопасных точках (safepoints).' },
        { t: 'h3', text: '1.21.2. Сборщики HotSpot' },
        { t: 'table', caption: 'Таблица 19. Сборщики мусора', headers: ['Сборщик', 'Флаг', 'Идея', 'Паузы', 'Когда'], rows: [
          ['Serial', '-XX:+UseSerialGC', 'один поток, STW', 'большие', 'маленькие приложения, контейнеры с 1 CPU'],
          ['Parallel', '-XX:+UseParallelGC', 'много потоков, STW; максимальная пропускная способность', 'заметные', 'пакетная обработка, где важна общая скорость, а не задержки'],
          ['**G1**', '-XX:+UseG1GC', 'куча из регионов, сборка самых «мусорных» регионов в пределах цели паузы', '~десятки–200 мс, настраиваемо', '**по умолчанию с Java 9**; универсальный выбор для сервисов'],
          ['**ZGC**', '-XX:+UseZGC', 'почти всё конкурентно, включая перемещение объектов; цветные указатели и барьеры чтения', '**< 1 мс** независимо от размера кучи', 'низкие задержки, большие кучи (до 16 ТБ); поколенческий с Java 21, единственный режим с Java 23'],
          ['Shenandoah', '-XX:+UseShenandoahGC', 'конкурентное уплотнение (Red Hat), указатели перенаправления', 'единицы мс', 'низкие задержки, в сборках OpenJDK от Red Hat и других'],
          ['Epsilon', '-XX:+UseEpsilonGC', 'не собирает вообще', 'нет', 'тесты производительности, короткие задачи'],
        ] },
        { t: 'h3', text: '1.21.3. G1 подробнее' },
        { t: 'ul', items: [
          'Куча делится на **регионы** одинакового размера (1–32 МБ). Каждый регион в данный момент — Eden, Survivor, Old или Humongous (для объектов больше половины региона).',
          '**Young-сборка** — STW, копирует живые объекты из Eden-регионов.',
          '**Конкурентная маркировка** старого поколения запускается, когда заполненность кучи превышает порог (IHOP, ~45%), — параллельно с приложением.',
          '**Mixed-сборки** — вместе с молодыми регионами собираются старые регионы с наибольшей долей мусора (отсюда название Garbage-First). Число регионов выбирается так, чтобы уложиться в цель -XX:MaxGCPauseMillis (по умолчанию 200 мс).',
          'Если G1 не успевает — **Full GC** на всей куче, долгая пауза. Частые Full GC в логах — признак, что куча мала или есть утечка.',
          '**Humongous-объекты** (огромные массивы) выделяются сразу в старом поколении и могут вызывать проблемы — при частом создании больших буферов увеличивают размер региона.',
        ] },
        { t: 'h3', text: '1.21.4. Как читать проблему GC' },
        { t: 'ul', items: [
          '**Высокая доля времени в GC** (больше 5–10%) при росте старого поколения, которое не освобождается после сборок, — утечка памяти;',
          '**частые minor GC** — высокий темп аллокаций: искать, кто создаёт много объектов (профилировщик аллокаций);',
          '**длинные паузы** — большая куча на неподходящем сборщике (переход на ZGC), humongous-объекты, Full GC;',
          'OutOfMemoryError: **GC overhead limit exceeded** — JVM тратит больше 98% времени на GC и освобождает меньше 2% кучи.',
        ] },
        { t: 'p', text: 'Инструменты: логи -Xlog:gc*, анализаторы логов GCeasy и GCViewer, jstat -gcutil <pid> 1s, метрики jvm_gc_pause_seconds в Micrometer и Grafana.' },
        { t: 'h3', text: '1.21.5. Типы ссылок' },
        { t: 'table', caption: 'Таблица 20. Ссылки java.lang.ref', headers: ['Тип', 'Когда объект соберут', 'Применение'], rows: [
          ['**сильная** (обычная)', 'никогда, пока ссылка достижима', 'всё обычное'],
          ['**SoftReference**', 'только при нехватке памяти — перед OutOfMemoryError', 'кеши, чувствительные к памяти (но поведение плохо предсказуемо — лучше Caffeine с лимитом размера)'],
          ['**WeakReference**', 'при ближайшей сборке, если нет сильных ссылок', 'WeakHashMap, канонизирующие map, слушатели, которые не должны удерживать объект'],
          ['**PhantomReference**', 'объект уже недостижим; get() всегда null; ставится в ReferenceQueue после финализации', 'освобождение нативных ресурсов — на этом построен Cleaner (Java 9)'],
        ] },
        { t: 'code', text: `Map<Object, Metadata> meta = new WeakHashMap<>();
Object key = new Object();
meta.put(key, new Metadata());
key = null;                 // сильных ссылок на ключ больше нет
System.gc();                // подсказка, не гарантия
// после сборки запись исчезнет из WeakHashMap

// Освобождение нативного ресурса без finalize (устарел и будет удалён)
private static final Cleaner CLEANER = Cleaner.create();
CLEANER.register(this, () -> nativeFree(handle));   // действие НЕ должно ссылаться на this` },
        { t: 'p', text: '**finalize()** объявлен устаревшим для удаления (Java 18): он замедлял GC, объект «воскресал», порядок и время вызова не гарантировались. Ресурсы закрывают явно — try-with-resources.' },
      ],
      terms: [
        ['GC roots', 'корни графа объектов: стеки потоков, статические поля, JNI-ссылки.'],
        ['safepoint', 'точка в коде, где поток может быть безопасно остановлен для GC.'],
        ['Humongous', 'в G1 — объект больше половины региона.'],
      ],
    },
    {
      id: 'java-leaks',
      num: '1.22',
      title: 'Утечки памяти и профилирование',
      blocks: [
        { t: 'h3', text: '1.22.1. Утечка в языке со сборщиком мусора' },
        { t: 'p', text: 'GC собирает **недостижимые** объекты. Утечка в Java — это объекты, которые **больше не нужны, но остаются достижимыми**. Типичные причины:' },
        { t: 'ul', items: [
          '**Статическая коллекция, которая только растёт:** static Map<String, Session> sessions без удаления. Самый частый случай.',
          '**Кеш без ограничения размера и времени жизни.** Используют Caffeine с maximumSize и expireAfterWrite.',
          '**ThreadLocal без remove** в пуле потоков (раздел 1.17.4).',
          '**Слушатели и подписки**, которые регистрируются и никогда не удаляются.',
          '**Нестатический внутренний класс или лямбда**, переданные в долгоживущий объект, неявно держат ссылку на внешний объект.',
          '**Незакрытые ресурсы:** соединения, потоки, ResultSet — держат и память, и нативные ресурсы.',
          '**Изменяемые ключи HashMap:** изменённый ключ уже не найти и не удалить.',
          '**Утечка загрузчика классов:** поток или ThreadLocal держит класс веб-приложения, и при передеплое старый загрузчик со всеми классами не может быть выгружен → OutOfMemoryError: Metaspace.',
          'Хранение большого объекта ради маленькой части: например, весь ответ API в кеше ради одного поля.',
        ] },
        { t: 'h3', text: '1.22.2. Как искать' },
        { t: 'ol', items: [
          '**Метрики:** график используемой кучи **после** сборок (а не до). Если «дно» пилы растёт со временем — утечка. Рост числа потоков, загруженных классов, direct memory — тоже сигналы.',
          '**Дамп кучи:** jcmd <pid> GC.heap_dump /tmp/heap.hprof или автоматически при OOM (-XX:+HeapDumpOnOutOfMemoryError). Дамп большой — размером с кучу — и при снятии останавливает приложение.',
          '**Анализ в Eclipse MAT или VisualVM:** **Dominator tree** — объекты, удерживающие больше всего памяти; **retained size** — сколько освободится, если удалить объект (в отличие от shallow size — размера самого объекта); **Path to GC roots** — цепочка ссылок от корня, которая держит объект. Именно она показывает причину утечки.',
          '**Гистограмма классов** без полного дампа: jcmd <pid> GC.class_histogram — сравнить две гистограммы с промежутком во времени, кто растёт.',
        ] },
        { t: 'example', label: 'Реальный случай', text: 'Сервис падал с OutOfMemoryError раз в двое суток. В дампе dominator tree показал HashMap на 1,4 ГБ внутри метрик: при каждом запросе в Micrometer регистрировался таймер с тегом, содержащим id пользователя, — миллионы уникальных временных рядов. Это проблема высокой кардинальности тегов — её же обсуждаем в общих темах про мониторинг. Исправление — убрать id из тегов.' },
        { t: 'h3', text: '1.22.3. Профилирование CPU и аллокаций' },
        { t: 'ul', items: [
          '**Java Flight Recorder (JFR)** — встроенный в JVM профилировщик с накладными расходами около 1%: можно держать включённым в продакшене. Записывает CPU-сэмплы, аллокации, GC, блокировки, ввод-вывод, исключения. Запуск: -XX:StartFlightRecording или jcmd <pid> JFR.start duration=60s filename=rec.jfr. Анализ — **JDK Mission Control**.',
          '**async-profiler** — сэмплирующий профилировщик без проблемы safepoint bias (обычные профилировщики видят потоки только в безопасных точках и искажают картину). Строит **flame graph** для CPU, аллокаций, блокировок и wall-clock времени.',
          '**VisualVM, JProfiler, YourKit** — графические профилировщики для разработки.',
          '**jcmd** — швейцарский нож: Thread.print (дамп потоков), GC.heap_info, VM.flags, VM.native_memory (при -XX:NativeMemoryTracking=summary — кто ест нативную память).',
          'Непрерывное профилирование в продакшене — Pyroscope, Grafana Profiles, Datadog.',
        ] },
        { t: 'p', text: '**Порядок диагностики «сервис тормозит»:** метрики (CPU, GC, пулы потоков и соединений, задержки зависимостей) → дамп потоков 3 раза с интервалом в несколько секунд (что делают потоки: ждут базу? блокировку? работают?) → профиль CPU при высокой загрузке или wall-clock профиль при низкой → гипотеза и проверка.' },
      ],
      terms: [
        ['retained size', 'объём памяти, который освободится, если удалить объект вместе со всем, что держит только он.'],
        ['JFR', 'Java Flight Recorder — встроенный низкозатратный профилировщик.'],
        ['flame graph', 'визуализация стеков: ширина полосы — доля времени.'],
      ],
    },
    {
      id: 'java-io',
      num: '1.23',
      divider: 'Java: экосистема',
      title: 'I/O, NIO, файлы, HTTP-клиенты',
      blocks: [
        { t: 'h3', text: '1.23.1. Классический java.io' },
        { t: 'ul', items: [
          '**Байтовые потоки** InputStream / OutputStream и **символьные** Reader / Writer (с кодировкой).',
          'Построены на **декораторах**: new BufferedReader(new InputStreamReader(new FileInputStream(f), StandardCharsets.UTF_8)) — каждый слой добавляет возможность: буферизацию, декодирование.',
          '**Всегда указывай кодировку** — до Java 18 по умолчанию использовалась кодировка ОС, и на Windows русский текст превращался в мусор. С Java 18 по умолчанию UTF-8.',
          '**Блокирующий:** read() держит поток, пока данных нет. Сервер на java.io — поток на соединение.',
        ] },
        { t: 'h3', text: '1.23.2. NIO: буферы, каналы, селекторы' },
        { t: 'p', text: 'java.nio (Java 1.4) добавил модель для высоконагруженного ввода-вывода:' },
        { t: 'ul', items: [
          '**Buffer** — контейнер данных с позицией, лимитом и ёмкостью; flip() переключает из режима записи в режим чтения. **Direct-буфер** (allocateDirect) живёт вне кучи — ОС читает в него напрямую, без лишней копии.',
          '**Channel** — двунаправленное соединение с файлом или сокетом; читает в буфер и пишет из буфера. FileChannel.transferTo использует системный вызов sendfile — **zero-copy**: данные идут с диска в сокет, не проходя через память приложения (так быстро работает Kafka).',
          '**Selector** — один поток следит за тысячами неблокирующих каналов и узнаёт, какие готовы к чтению или записи. Внутри — epoll (Linux), kqueue (macOS). На этом построены **Netty**, Undertow, Reactor Netty, клиент Kafka.',
        ] },
        { t: 'h3', text: '1.23.3. Файлы: java.nio.file' },
        { t: 'code', text: `Path path = Path.of("data", "orders.csv");

List<String> lines = Files.readAllLines(path);              // небольшие файлы целиком
String text = Files.readString(path);
Files.writeString(path, text, StandardOpenOption.CREATE, StandardOpenOption.APPEND);

try (Stream<String> stream = Files.lines(path)) {            // большие — лениво, построчно
    long errors = stream.filter(l -> l.contains("ERROR")).count();
}                                                            // стрим держит файл — закрыть!

try (BufferedWriter w = Files.newBufferedWriter(path)) { … }

// Атомарная замена файла
Path tmp = Files.createTempFile(dir, "cfg", ".tmp");
Files.writeString(tmp, content);
Files.move(tmp, target, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);

try (Stream<Path> files = Files.walk(root)) {                // обход дерева
    files.filter(p -> p.toString().endsWith(".log")).forEach(this::archive);
}` },
        { t: 'h3', text: '1.23.4. HTTP-клиенты' },
        { t: 'code', text: `// java.net.http.HttpClient (Java 11): HTTP/1.1 и HTTP/2, синхронно и асинхронно
HttpClient client = HttpClient.newBuilder()     // один на приложение: держит пул соединений
    .connectTimeout(Duration.ofSeconds(2))
    .version(HttpClient.Version.HTTP_2)
    .build();

HttpRequest req = HttpRequest.newBuilder(URI.create(baseUrl + "/users/" + id))
    .timeout(Duration.ofSeconds(3))                  // таймаут ответа — задавать всегда
    .header("Accept", "application/json")
    .GET()
    .build();

HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());
if (resp.statusCode() != 200) throw new UpstreamException(resp.statusCode());
User user = objectMapper.readValue(resp.body(), User.class);

CompletableFuture<HttpResponse<String>> async =
    client.sendAsync(req, HttpResponse.BodyHandlers.ofString());` },
        { t: 'table', caption: 'Таблица 21. HTTP-клиенты в Java-проектах', headers: ['Клиент', 'Когда'], rows: [
          ['java.net.http.HttpClient', 'без зависимостей, HTTP/2'],
          ['Spring **RestClient** (6.1+)', 'новый синхронный клиент Spring с текучим API; заменяет RestTemplate'],
          ['RestTemplate', 'старый синхронный клиент Spring, в режиме поддержки'],
          ['**WebClient**', 'реактивный неблокирующий клиент Spring WebFlux'],
          ['HTTP Interface (@HttpExchange) / OpenFeign', 'декларативный клиент: интерфейс с аннотациями, реализацию генерирует фреймворк'],
          ['OkHttp, Apache HttpClient 5', 'зрелые библиотеки с тонкой настройкой пулов'],
        ] },
        { t: 'p', text: 'Независимо от клиента: **таймауты подключения и ответа обязательны** (без них поток висит бесконечно, когда внешний сервис завис), пул соединений настроен под нагрузку, клиент переиспользуется, а не создаётся на каждый запрос. Повторы и circuit breaker — в общих темах про распределённые системы (Resilience4j).' },
      ],
    },
    {
      id: 'java-build',
      num: '1.24',
      title: 'Maven и Gradle',
      blocks: [
        { t: 'h3', text: '1.24.1. Зачем система сборки' },
        { t: 'p', text: 'Скачать зависимости и их транзитивные зависимости нужных версий, скомпилировать, прогнать тесты, собрать JAR, опубликовать артефакт — одной командой и одинаково на ноутбуке и в CI.' },
        { t: 'h3', text: '1.24.2. Maven' },
        { t: 'code', text: `<project>
  <groupId>com.acme</groupId>
  <artifactId>orders-service</artifactId>
  <version>1.4.0</version>

  <parent>                                       <!-- версии зависимостей Spring Boot -->
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.4.1</version>
  </parent>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>   <!-- версия из parent -->
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.testcontainers</groupId>
      <artifactId>postgresql</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>` },
        { t: 'ul', items: [
          '**Координаты** groupId:artifactId:version однозначно определяют артефакт. Версии с суффиксом -SNAPSHOT — изменяемые, для разработки.',
          '**Жизненный цикл** — фиксированные фазы: validate → compile → test → package → verify → install (в локальный репозиторий ~/.m2) → deploy (в удалённый: Nexus, Artifactory). mvn package выполнит все фазы до package включительно.',
          '**Плагины** привязаны к фазам и делают реальную работу: compiler, surefire (unit-тесты), failsafe (интеграционные), jar, spring-boot-maven-plugin (исполняемый fat JAR).',
          '**Scope:** compile (по умолчанию), provided (есть при компиляции, предоставит среда — например, сервлет-контейнер), runtime (нужен только при запуске — драйвер БД), test.',
          '**Конфликты транзитивных зависимостей:** если две библиотеки тянут разные версии третьей, Maven выбирает **ближайшую** к проекту в дереве (nearest wins), а при равной глубине — первую объявленную. Отсюда NoSuchMethodError во время выполнения. Диагностика — mvn dependency:tree, лечение — dependencyManagement с явной версией или exclusions.',
          '**BOM** (bill of materials) — набор согласованных версий, импортируемый в dependencyManagement: spring-boot-dependencies, testcontainers-bom.',
        ] },
        { t: 'h3', text: '1.24.3. Gradle' },
        { t: 'code', text: `// build.gradle.kts
plugins {
    java
    id("org.springframework.boot") version "3.4.1"
    id("io.spring.dependency-management") version "1.1.7"
}

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.testcontainers:postgresql")
}

tasks.test { useJUnitPlatform() }` },
        { t: 'ul', items: [
          'Сборка — **граф задач** (tasks) с входами и выходами. Gradle пропускает задачи, у которых входы не изменились (**инкрементальная сборка**), берёт результаты из **кеша сборки** (в том числе удалённого, общего для команды) и держит прогретый **демон** — на больших проектах в разы быстрее Maven.',
          '**implementation и api:** зависимость implementation не видна потребителям модуля — меньше перекомпиляций и протечек зависимостей; api — видна.',
          'Конфликты версий Gradle решает иначе: по умолчанию выбирается **самая высокая** версия.',
          'Скрипт — код на Kotlin DSL или Groovy: гибко, но сложные скрипты трудно поддерживать.',
          '**Gradle Wrapper** (gradlew) и **Maven Wrapper** (mvnw) фиксируют версию инструмента в репозитории.',
        ] },
        { t: 'table', caption: 'Таблица 22. Maven или Gradle', headers: ['', 'Maven', 'Gradle'], rows: [
          ['описание', 'декларативный XML', 'код на Kotlin / Groovy'],
          ['скорость', 'медленнее на больших проектах', 'инкрементальность, кеш, демон'],
          ['гибкость', 'всё через плагины, «по соглашению»', 'произвольная логика'],
          ['где', 'преобладает в банках и enterprise', 'Android, крупные многомодульные проекты, Spring сам собирается Gradle'],
        ] },
      ],
    },
    {
      id: 'java-testing',
      num: '1.25',
      title: 'Тестирование: JUnit, Mockito, Testcontainers',
      blocks: [
        { t: 'h3', text: '1.25.1. JUnit 5' },
        { t: 'code', text: `class PriceCalculatorTest {

    private final PriceCalculator calc = new PriceCalculator();

    @Test
    void appliesDiscountForLoyalCustomer() {
        Money price = calc.price(Money.rub(1000), Customer.loyal());
        assertEquals(Money.rub(900), price);
    }

    @ParameterizedTest(name = "{0} шт → скидка {1}%")
    @CsvSource({ "1, 0", "10, 5", "100, 10" })
    void volumeDiscount(int qty, int expectedPercent) {
        assertEquals(expectedPercent, calc.volumeDiscount(qty));
    }

    @Test
    void rejectsNegativePrice() {
        var e = assertThrows(IllegalArgumentException.class,
            () -> calc.price(Money.rub(-1), Customer.regular()));
        assertTrue(e.getMessage().contains("negative"));
    }
}` },
        { t: 'ul', items: [
          '**Жизненный цикл:** @BeforeAll / @AfterAll (один раз на класс, статические методы), @BeforeEach / @AfterEach (перед каждым тестом). По умолчанию **новый экземпляр тестового класса на каждый тест** — тесты изолированы.',
          '@DisplayName, @Nested (группировка), @Disabled, @Tag ("integration"), @Timeout.',
          '**AssertJ** — читаемые цепочки проверок: assertThat(orders).hasSize(3).extracting(Order::status).containsOnly(PAID).',
          '**Расширения** (@ExtendWith) — точка интеграции: Mockito, Spring, Testcontainers подключаются через них.',
          'Тест строят по схеме **Arrange–Act–Assert** (Given–When–Then).',
        ] },
        { t: 'h3', text: '1.25.2. Mockito' },
        { t: 'code', text: `@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock OrderRepository repo;
    @Mock PaymentGateway payments;
    @InjectMocks OrderService service;          // создаст сервис с моками в конструкторе

    @Test
    void paysAndSavesOrder() {
        when(repo.findById(1L)).thenReturn(Optional.of(new Order(1L, Money.rub(500))));
        when(payments.charge(any(), eq(Money.rub(500)))).thenReturn(Receipt.ok("tx-1"));

        service.pay(1L);

        ArgumentCaptor<Order> saved = ArgumentCaptor.forClass(Order.class);
        verify(repo).save(saved.capture());
        assertThat(saved.getValue().status()).isEqualTo(Status.PAID);
        verifyNoMoreInteractions(payments);
    }
}` },
        { t: 'ul', items: [
          '**Как работает:** Mockito генерирует подкласс-прокси (ByteBuddy, раздел 1.13.3), а с Mockito 5 по умолчанию использует **inline mock maker** — инструментирует байткод через Java agent, поэтому мокаются даже final-классы и статические методы (mockStatic).',
          '**mock** — все методы возвращают значения по умолчанию; **spy** — настоящий объект, у которого переопределены отдельные методы (для spy используют doReturn(x).when(spy).method(), иначе вызовется настоящий метод).',
          '**Не мокай то, чем не владеешь**, и не мокай всё подряд: тест, который проверяет только порядок вызовов моков, ломается при любом рефакторинге и не ловит реальных ошибок. Объекты-значения и простую логику используют настоящими.',
          'Строгие заглушки (strict stubs, по умолчанию в MockitoExtension) роняют тест, если заглушка не использовалась, — помогает держать тесты чистыми.',
        ] },
        { t: 'h3', text: '1.25.3. Testcontainers' },
        { t: 'p', text: 'Интеграционные тесты с **настоящими** PostgreSQL, Kafka, Redis в Docker-контейнерах вместо H2 и моков. H2 ведёт себя иначе, чем PostgreSQL: другие типы, нет JSONB, другие блокировки, — и тест «зелёный», а прод падает.' },
        { t: 'code', text: `@SpringBootTest
@Testcontainers
class OrderRepositoryIT {

    @Container
    @ServiceConnection              // Spring Boot 3.1+: сам пропишет URL, логин и пароль
    static PostgreSQLContainer<?> pg = new PostgreSQLContainer<>("postgres:16-alpine");

    @Autowired OrderRepository repo;

    @Test
    void findsPaidOrdersByUser() {
        repo.save(new Order(…));
        assertThat(repo.findPaidByUser(42L)).hasSize(1);
    }
}` },
        { t: 'ul', items: [
          'Контейнер в static-поле запускается **один раз на класс**; чтобы переиспользовать его между классами — паттерн singleton container или reuse-режим.',
          'Миграции Flyway/Liquibase применяются к контейнеру при старте контекста — тесты проверяют и схему.',
          'Нужен Docker на машине разработчика и в CI.',
        ] },
        { t: 'h3', text: '1.25.4. Тесты в Spring Boot' },
        { t: 'table', caption: 'Таблица 23. Тестовые срезы Spring Boot', headers: ['Аннотация', 'Что поднимает', 'Для чего'], rows: [
          ['@SpringBootTest', 'весь контекст приложения', 'интеграционные и end-to-end тесты'],
          ['@WebMvcTest(Controller.class)', 'только веб-слой; сервисы — @MockitoBean', 'контроллеры, валидация, коды ответов через MockMvc'],
          ['@DataJpaTest', 'только JPA: репозитории, EntityManager; каждый тест в транзакции с откатом', 'запросы репозиториев'],
          ['@JsonTest', 'только Jackson', 'формат сериализации DTO'],
        ] },
        { t: 'p', text: '**Кеш контекста:** Spring переиспользует контекст между тестовыми классами с одинаковой конфигурацией. Каждая уникальная комбинация @MockitoBean (раньше @MockBean) и свойств создаёт **новый контекст** — набор тестов замедляется в разы. Поэтому моки бинов выносят в общий базовый класс.' },
      ],
    },
    {
      id: 'java-spring-ioc',
      num: '1.26',
      divider: 'Java: Spring и данные',
      title: 'Spring: IoC/DI, бины, конфигурация',
      blocks: [
        { t: 'h3', text: '1.26.1. Инверсия управления и внедрение зависимостей' },
        { t: 'p', text: '**Inversion of Control** — объекты не создают свои зависимости сами (new JdbcOrderRepository() внутри сервиса), а получают готовые снаружи. Создаёт объекты и связывает их **контейнер** — в Spring это ApplicationContext. **Dependency Injection** — конкретный способ IoC: зависимости передаются через конструктор, сеттер или поле.' },
        { t: 'p', text: 'Зачем: сервис зависит от **интерфейса**, а не от реализации; в тестах подставляется мок; конфигурация (какая реализация, какие настройки) отделена от бизнес-логики; контейнер управляет жизненным циклом и добавляет поведение через прокси (транзакции, кеш, безопасность).' },
        { t: 'code', text: `@Service
public class OrderService {
    private final OrderRepository repo;
    private final PaymentGateway payments;

    // Внедрение через конструктор: единственный конструктор — @Autowired не нужен
    public OrderService(OrderRepository repo, PaymentGateway payments) {
        this.repo = repo;
        this.payments = payments;
    }
}` },
        { t: 'table', caption: 'Таблица 24. Способы внедрения', headers: ['Способ', 'Плюсы', 'Минусы'], rows: [
          ['**конструктор** (рекомендуется)', 'поля final; объект нельзя создать без зависимостей; легко тестировать без Spring; циклические зависимости видны сразу', 'длинный конструктор — сигнал, что у класса слишком много обязанностей'],
          ['сеттер', 'необязательные зависимости, переконфигурация', 'объект может быть неполным'],
          ['поле (@Autowired на поле)', 'коротко', 'нельзя final, скрытые зависимости, без Spring или рефлексии не протестировать'],
        ] },
        { t: 'h3', text: '1.26.2. Как объявить бин' },
        { t: 'ul', items: [
          '**Сканирование компонентов:** классы с @Component и его специализациями — @Service, @Repository (дополнительно переводит исключения хранилища в DataAccessException), @Controller, @RestController, @Configuration. @SpringBootApplication включает сканирование пакета приложения и вложенных.',
          '**@Bean-методы** в @Configuration-классе — для чужих классов и сложной сборки:',
        ] },
        { t: 'code', text: `@Configuration
public class ClientsConfig {

    @Bean
    public RestClient pricingClient(RestClient.Builder builder, PricingProperties props) {
        return builder.baseUrl(props.url())
            .requestFactory(new JdkClientHttpRequestFactory(HttpClient.newBuilder()
                .connectTimeout(props.connectTimeout()).build()))
            .build();
    }
}

@ConfigurationProperties(prefix = "pricing")      // типобезопасная конфигурация
public record PricingProperties(URI url, Duration connectTimeout, Duration readTimeout) {}

# application.yml
pricing:
  url: http://pricing:8080
  connect-timeout: 2s
  read-timeout: 3s` },
        { t: 'p', text: '**Почему @Configuration-класс проксируется.** Если один @Bean-метод вызывает другой, Spring должен вернуть **тот же синглтон**, а не создать новый объект. Для этого класс @Configuration оборачивается CGLIB-подклассом, который перехватывает вызовы @Bean-методов и отдаёт бин из контейнера (режим proxyBeanMethods = true по умолчанию).' },
        { t: 'h3', text: '1.26.3. Разрешение зависимостей' },
        { t: 'ul', items: [
          'Зависимость ищется **по типу**. Если подходящих бинов несколько — NoUniqueBeanDefinitionException. Выбор: @Primary на одном из бинов, @Qualifier("name") в месте внедрения или имя параметра, совпадающее с именем бина.',
          'Можно внедрить **все** реализации: List<PaymentProvider> или Map<String, PaymentProvider> (ключ — имя бина) — так делают стратегии.',
          'Необязательная зависимость — Optional<T> или ObjectProvider<T>.',
          '**Циклические зависимости** через конструкторы — ошибка при старте; с Spring Boot 2.6 запрещены и через поля. Цикл — признак плохого разделения обязанностей, лечится выделением третьего компонента.',
        ] },
        { t: 'h3', text: '1.26.4. Области видимости (scope)' },
        { t: 'table', caption: 'Таблица 25. Scope бинов', headers: ['Scope', 'Экземпляров', 'Комментарий'], rows: [
          ['singleton (по умолчанию)', 'один на контейнер', 'должен быть потокобезопасным: им пользуются все запросы одновременно — **никакого изменяемого состояния запроса в полях**'],
          ['prototype', 'новый при каждом запросе бина', 'Spring не управляет уничтожением'],
          ['request, session', 'на HTTP-запрос / сессию', 'в синглтон внедряется прокси, который находит нужный экземпляр'],
        ] },
        { t: 'p', text: '**Ловушка:** prototype-бин, внедрённый в singleton, создаётся **один раз** — при создании синглтона. Чтобы получать новый каждый раз — ObjectProvider<T>.getObject() или @Lookup.' },
        { t: 'h3', text: '1.26.5. Жизненный цикл бина' },
        { t: 'ol', items: [
          'чтение определений бинов (BeanDefinition) из сканирования, @Bean-методов, автоконфигураций;',
          '**BeanFactoryPostProcessor** может изменить определения до создания бинов (так подставляются ${placeholders});',
          'создание экземпляра (вызов конструктора с зависимостями);',
          'внедрение через сеттеры и поля;',
          'методы *Aware (BeanNameAware, ApplicationContextAware);',
          '**BeanPostProcessor.postProcessBeforeInitialization**;',
          'инициализация: @PostConstruct → InitializingBean.afterPropertiesSet → init-method;',
          '**BeanPostProcessor.postProcessAfterInitialization** — **здесь бин подменяется прокси**: для @Transactional, @Async, @Cacheable, AOP в контейнер кладётся не сам объект, а прокси вокруг него;',
          'бин готов; при закрытии контекста — @PreDestroy → DisposableBean.destroy.',
        ] },
        { t: 'h3', text: '1.26.6. Как работает Spring Boot' },
        { t: 'ul', items: [
          '**Стартеры** — наборы зависимостей: spring-boot-starter-web тянет Spring MVC, Tomcat, Jackson.',
          '**Автоконфигурация:** в JAR-файлах Spring Boot лежат классы @AutoConfiguration, перечисленные в META-INF/spring/…AutoConfiguration.imports. Каждый срабатывает по условиям: **@ConditionalOnClass** (есть ли класс в classpath — например, драйвер PostgreSQL), **@ConditionalOnMissingBean** (не объявил ли разработчик свой бин — тогда автоконфигурация отступает), @ConditionalOnProperty. Так Boot сам создаёт DataSource, если видит драйвер и spring.datasource.url.',
          'Отчёт, какие автоконфигурации сработали и почему, — запуск с --debug или эндпоинт /actuator/conditions.',
          '**Внешняя конфигурация** с порядком приоритета: аргументы командной строки > переменные окружения > application-{profile}.yml > application.yml. Профили (spring.profiles.active=prod) переключают наборы настроек.',
          '**Embedded-сервер** (Tomcat по умолчанию) и **исполняемый fat JAR** — приложение запускается java -jar app.jar.',
          '**Actuator** — /actuator/health (пробы Kubernetes), /metrics, /prometheus, /info.',
        ] },
      ],
      terms: [
        ['IoC', 'Inversion of Control — управление созданием объектов передано контейнеру.'],
        ['DI', 'Dependency Injection — передача зависимостей объекту снаружи.'],
        ['BeanPostProcessor', 'расширение Spring, обрабатывающее бины после создания, в том числе оборачивающее их в прокси.'],
      ],
    },
    {
      id: 'java-aop',
      num: '1.27',
      title: 'AOP и прокси в Spring',
      blocks: [
        { t: 'h3', text: '1.27.1. Сквозная функциональность' },
        { t: 'p', text: 'Логирование, метрики, транзакции, кеширование, проверка прав нужны в десятках методов и не относятся к бизнес-логике. **Аспектно-ориентированное программирование** выносит их в одно место — **аспект** — и применяет декларативно.' },
        { t: 'table', caption: 'Таблица 26. Термины AOP', headers: ['Термин', 'Значение'], rows: [
          ['aspect', 'модуль сквозной логики — класс с @Aspect'],
          ['join point', 'точка, где можно вмешаться; в Spring AOP — только **вызов метода** бина'],
          ['pointcut', 'выражение, выбирающее join points: execution(* com.acme..*Service.*(..)) или @annotation(Timed)'],
          ['advice', 'что сделать: @Before, @After, @AfterReturning, @AfterThrowing, @Around'],
          ['weaving', 'внедрение аспекта: в Spring — во время выполнения через прокси; в AspectJ — при компиляции или загрузке класса'],
        ] },
        { t: 'code', text: `@Aspect
@Component
public class TimingAspect {
    private final MeterRegistry registry;
    public TimingAspect(MeterRegistry registry) { this.registry = registry; }

    @Around("@annotation(timed)")
    public Object time(ProceedingJoinPoint pjp, Timed timed) throws Throwable {
        Timer.Sample sample = Timer.start(registry);
        try {
            return pjp.proceed();                       // вызов настоящего метода
        } finally {
            sample.stop(registry.timer(timed.value()));
        }
    }
}` },
        { t: 'h3', text: '1.27.2. Как Spring AOP работает: прокси' },
        { t: 'p', text: 'В BeanPostProcessor (раздел 1.26.5) Spring видит, что к бину применимы аспекты или аннотации @Transactional, @Async, @Cacheable, @PreAuthorize, и кладёт в контейнер **прокси**. Все, кто внедряет этот бин, получают прокси. Вызов идёт так: клиент → прокси → цепочка интерсепторов (транзакция, кеш, аспекты) → настоящий объект.' },
        { t: 'p', text: 'Прокси — JDK dynamic proxy или CGLIB-подкласс (раздел 1.13.3). Spring Boot по умолчанию использует CGLIB (proxyTargetClass = true) — поэтому можно внедрять бин по классу, а не только по интерфейсу.' },
        { t: 'h3', text: '1.27.3. Ловушка самовызова' },
        { t: 'p', text: 'Самый частый вопрос по Spring на собеседовании: **почему @Transactional не работает**.' },
        { t: 'code', text: `@Service
public class ReportService {

    public void generateAll() {
        for (long id : ids) {
            generate(id);          // this.generate(id) — вызов идёт МИМО прокси!
        }
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void generate(long id) { … }   // новая транзакция НЕ откроется
}` },
        { t: 'p', text: 'Прокси перехватывает только вызовы, пришедшие **снаружи** через ссылку на прокси. Внутри объекта this указывает на настоящий объект, и аннотации игнорируются. Способы исправить:' },
        { t: 'ul', items: [
          '**вынести метод в отдельный бин** — правильное решение;',
          'внедрить в класс ссылку на собственный прокси (@Lazy self-injection) — работает, но запутывает;',
          'программное управление: TransactionTemplate.execute(…);',
          'AspectJ weaving в режиме компиляции — аспекты вплетаются в байткод и работают при самовызове.',
        ] },
        { t: 'p', text: 'Ещё ограничения прокси: **private и final методы** не перехватываются (у CGLIB-подкласса нет к ним доступа), **static-методы** — тоже. Аннотация на них молча игнорируется. И аннотации работают только у бинов Spring — объект, созданный через new, никаких прокси не получает.' },
      ],
    },
    {
      id: 'java-mvc',
      num: '1.28',
      title: 'Spring MVC, валидация, обработка ошибок',
      blocks: [
        { t: 'h3', text: '1.28.1. Как запрос проходит через Spring MVC' },
        { t: 'flow', steps: ['Tomcat: поток из пула', 'фильтры сервлетов (Security, логирование)', 'DispatcherServlet', 'HandlerMapping: какой метод', 'HandlerAdapter: аргументы, валидация', 'метод контроллера', 'HttpMessageConverter: объект → JSON', 'ответ'] },
        { t: 'ul', items: [
          '**DispatcherServlet** — единая точка входа (паттерн Front Controller): все запросы приходят в него, а он распределяет их.',
          '**HandlerMapping** по URL, методу и заголовкам находит метод контроллера (RequestMappingHandlerMapping строит таблицу из аннотаций при старте).',
          '**Argument resolvers** превращают запрос в параметры метода: @PathVariable, @RequestParam, @RequestHeader, @RequestBody (через Jackson), Principal.',
          '**HttpMessageConverter** сериализует возвращаемое значение по заголовку Accept.',
          '**HandlerInterceptor** — перехватчики до и после контроллера (внутри Spring, в отличие от фильтров сервлета).',
          'Каждый запрос обрабатывается в **отдельном потоке** пула Tomcat (по умолчанию до 200 потоков; с spring.threads.virtual.enabled — виртуальные потоки).',
        ] },
        { t: 'h3', text: '1.28.2. REST-контроллер' },
        { t: 'code', text: `@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService service;
    public OrderController(OrderService service) { this.service = service; }

    @GetMapping("/{id}")
    public OrderResponse get(@PathVariable long id) {
        return OrderResponse.from(service.get(id));
    }

    @GetMapping
    public Page<OrderResponse> list(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "20") @Max(100) int size) {
        return service.list(PageRequest.of(page, size)).map(OrderResponse::from);
    }

    @PostMapping
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest req,
                                                UriComponentsBuilder uri) {
        Order o = service.create(req);
        return ResponseEntity
            .created(uri.path("/api/v1/orders/{id}").buildAndExpand(o.id()).toUri())
            .body(OrderResponse.from(o));
    }
}` },
        { t: 'p', text: '**Не отдавай сущности JPA напрямую** — только DTO: сущность раскрывает внутреннюю модель, ленивые связи вызовут LazyInitializationException или N+1 при сериализации, а двунаправленные связи — бесконечную рекурсию в JSON.' },
        { t: 'h3', text: '1.28.3. Валидация' },
        { t: 'code', text: `public record CreateOrderRequest(
    @NotNull Long customerId,
    @NotEmpty @Size(max = 100) List<@Valid ItemRequest> items,
    @Size(max = 500) String comment,
    @Email String notifyEmail
) {}

public record ItemRequest(@NotBlank String sku, @Positive @Max(999) int quantity) {}` },
        { t: 'ul', items: [
          'Аннотации **Jakarta Bean Validation**, реализация — Hibernate Validator (spring-boot-starter-validation).',
          '@Valid на параметре @RequestBody включает проверку; ошибка — **MethodArgumentNotValidException** со списком нарушенных полей.',
          'Для параметров пути и запроса (@Max на @RequestParam) нужна @Validated на классе; ошибка — HandlerMethodValidationException (Spring 6.1+) или ConstraintViolationException.',
          'Свои правила — собственная аннотация с @Constraint и классом-валидатором.',
          '**Валидация входа — не замена бизнес-проверок** в сервисе: «товар есть на складе» проверяет сервис, а не аннотация.',
        ] },
        { t: 'h3', text: '1.28.4. Обработка ошибок' },
        { t: 'p', text: 'Исключения переводятся в HTTP-ответы **в одном месте**. Spring 6 поддерживает стандарт **RFC 9457 Problem Details** — единый формат ошибок application/problem+json.' },
        { t: 'code', text: `@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    ProblemDetail notFound(OrderNotFoundException e) {
        var pd = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
        pd.setType(URI.create("https://api.acme.ru/errors/order-not-found"));
        pd.setProperty("orderId", e.orderId());
        return pd;
    }

    @ExceptionHandler(InsufficientStockException.class)
    ProblemDetail conflict(InsufficientStockException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    ProblemDetail unexpected(Exception e) {
        log.error("unexpected error", e);                     // в лог — полностью
        return ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR); // без деталей
    }
}

// Ответ
// HTTP/1.1 404
// Content-Type: application/problem+json
// {"type":"https://api.acme.ru/errors/order-not-found","title":"Not Found","status":404,
//  "detail":"Order 42 not found","instance":"/api/v1/orders/42","orderId":42}` },
        { t: 'p', text: 'Наследование от ResponseEntityExceptionHandler даёт готовую обработку стандартных исключений Spring MVC (неверный JSON, ошибки валидации, неподдерживаемый метод) в формате Problem Details. Наружу **не отдают стек и сообщения внутренних исключений** — это утечка информации о системе.' },
      ],
    },
    {
      id: 'java-spring-data',
      num: '1.29',
      title: 'Spring Security, транзакции, Spring Data',
      blocks: [
        { t: 'h3', text: '1.29.1. Spring Security: как устроено' },
        { t: 'p', text: 'Spring Security — **цепочка сервлетных фильтров** (SecurityFilterChain), через которую проходит каждый запрос до DispatcherServlet. Каждый фильтр делает свою часть: CORS, CSRF, извлечение учётных данных (сессия, Basic, Bearer-токен), обработка ошибок доступа, авторизация.' },
        { t: 'ul', items: [
          '**Аутентификация** — «кто ты»: фильтр извлекает учётные данные и передаёт их **AuthenticationManager**, который через AuthenticationProvider проверяет их (пароль через UserDetailsService и PasswordEncoder, токен — через декодер JWT).',
          'Результат — объект **Authentication** (principal, права — GrantedAuthority) в **SecurityContextHolder**, который по умолчанию хранится в ThreadLocal текущего потока.',
          '**Авторизация** — «что тебе можно»: правила для URL в конфигурации и аннотации методов @PreAuthorize (работают через прокси — с теми же ограничениями самовызова).',
          'Пароли хранятся только как хеш **BCrypt** или Argon2 через PasswordEncoder — подробнее о паролях, JWT и OAuth — в общих темах про безопасность.',
        ] },
        { t: 'code', text: `@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())               // REST с токенами, без cookie-сессий
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/catalog/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))   // проверка JWT
            .build();
    }
}

@PreAuthorize("hasRole('ADMIN') or #userId == authentication.name")
public UserProfile profile(String userId) { … }` },
        { t: 'h3', text: '1.29.2. @Transactional' },
        { t: 'p', text: '@Transactional — декларативная транзакция через прокси. Перед методом **TransactionInterceptor** берёт у PlatformTransactionManager соединение из пула, выключает autocommit, **привязывает соединение к текущему потоку** (TransactionSynchronizationManager, ThreadLocal) — и все репозитории внутри используют именно его. После метода — commit или rollback.' },
        { t: 'table', caption: 'Таблица 27. Propagation — что делать, если транзакция уже есть', headers: ['Значение', 'Поведение'], rows: [
          ['**REQUIRED** (по умолчанию)', 'присоединиться к текущей или создать новую'],
          ['**REQUIRES_NEW**', 'приостановить текущую и открыть новую (отдельное соединение!) — для аудита, который должен сохраниться даже при откате основной'],
          ['NESTED', 'вложенная через SAVEPOINT в той же транзакции'],
          ['SUPPORTS', 'с транзакцией, если она есть, иначе без'],
          ['MANDATORY', 'требует существующую, иначе исключение'],
          ['NOT_SUPPORTED, NEVER', 'выполнить без транзакции / запретить транзакцию'],
        ] },
        { t: 'p', text: '**Ловушки @Transactional** — их перечисляют на каждом собеседовании:' },
        { t: 'ol', items: [
          '**Самовызов** — вызов из того же класса идёт мимо прокси (раздел 1.27.3).',
          '**Откат только для unchecked-исключений:** по умолчанию rollback для RuntimeException и Error, а при **проверяемом** исключении (IOException) транзакция **закоммитится**. Нужно rollbackFor = Exception.class.',
          '**Проглоченное исключение** внутри метода — прокси не узнает об ошибке и сделает commit.',
          '**UnexpectedRollbackException:** внутренний метод с REQUIRED бросил исключение, его поймали во внешнем — но общая транзакция уже помечена rollback-only, и commit внешнего метода упадёт.',
          'Аннотация на **private-методе** или на классе, который не является бином, — не работает.',
          '**Долгие операции в транзакции** — HTTP-вызовы, отправка писем — держат соединение из пула и блокировки строк. Пул из 10 соединений исчерпывается 10 медленными запросами.',
          '**readOnly = true** — подсказка: Hibernate отключает проверку изменений (dirty checking) и не делает flush, а драйвер может направить запрос на реплику.',
          '**Отправка события после коммита:** если отправить сообщение в Kafka внутри транзакции, а транзакция откатится — сообщение уже ушло. Используют @TransactionalEventListener(phase = AFTER_COMMIT) или паттерн transactional outbox (общие темы).',
        ] },
        { t: 'h3', text: '1.29.3. Spring Data JPA' },
        { t: 'code', text: `public interface OrderRepository extends JpaRepository<Order, Long> {

    // Запрос выводится из имени метода
    List<Order> findByCustomerIdAndStatusOrderByCreatedAtDesc(long customerId, Status status);

    boolean existsByExternalId(String externalId);

    // JPQL явно
    @Query("select o from Order o join fetch o.items where o.id = :id")
    Optional<Order> findWithItems(@Param("id") long id);

    // Проекция в record — только нужные столбцы
    @Query("""
        select new com.acme.OrderSummary(o.id, o.status, o.total)
        from Order o where o.customerId = :c""")
    List<OrderSummary> summaries(@Param("c") long customerId);

    // Нативный SQL
    @Query(value = "select * from orders where created_at > now() - interval '1 day'",
           nativeQuery = true)
    List<Order> recent();

    @Modifying
    @Query("update Order o set o.status = :s where o.id in :ids")
    int bulkUpdateStatus(@Param("ids") List<Long> ids, @Param("s") Status s);
}` },
        { t: 'ul', items: [
          '**Как это работает:** при старте Spring для каждого интерфейса-репозитория создаёт **JDK-прокси**, реализация методов — SimpleJpaRepository, а запросы по именам методов разбираются и превращаются в JPQL один раз при старте (ошибка в имени — ошибка запуска приложения).',
          '**Пагинация:** Page<T> делает дополнительный count-запрос; Slice<T> — нет (только «есть ли следующая»). На больших таблицах OFFSET медленный — используют keyset-пагинацию (раздел про API в главе 1).',
          '**save()** для новой сущности делает persist, для существующей — merge. «Новая ли» определяется по id == null (или по @Version). С присвоенными вручную id save делает лишний SELECT.',
          '@Modifying-запросы идут мимо контекста персистентности — загруженные ранее сущности остаются со старыми значениями (clearAutomatically = true).',
        ] },
      ],
      terms: [
        ['SecurityFilterChain', 'цепочка фильтров Spring Security, через которую проходит запрос.'],
        ['propagation', 'правило распространения транзакции при вложенных вызовах.'],
        ['rollback-only', 'пометка транзакции, после которой commit невозможен.'],
      ],
    },
    {
      id: 'java-jpa',
      num: '1.30',
      title: 'JDBC, JPA/Hibernate: связи, fetching, N+1, кеширование',
      blocks: [
        { t: 'h3', text: '1.30.1. JDBC' },
        { t: 'p', text: '**JDBC** — низкоуровневый стандартный API доступа к базам; на нём построено всё остальное (Hibernate, jOOQ, Spring JdbcTemplate). Соединения берутся из пула — в Spring Boot по умолчанию **HikariCP**.' },
        { t: 'code', text: `String sql = "SELECT id, total FROM orders WHERE customer_id = ? AND status = ?";
try (Connection c = dataSource.getConnection();               // из пула HikariCP
     PreparedStatement ps = c.prepareStatement(sql)) {
    ps.setLong(1, customerId);                       // параметры — защита от SQL-инъекции
    ps.setString(2, "PAID");
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            result.add(new OrderRow(rs.getLong("id"), rs.getBigDecimal("total")));
        }
    }
}   // close() у соединения из пула не закрывает его, а возвращает в пул

// Spring JdbcClient (6.1) — то же короче
List<OrderRow> rows = jdbcClient.sql(sql)
    .params(customerId, "PAID")
    .query(OrderRow.class)
    .list();` },
        { t: 'ul', items: [
          '**Пул HikariCP:** maximumPoolSize по умолчанию 10. Формула-ориентир от авторов: (ядра × 2) + число дисков — больше соединений не значит быстрее, база начинает тратить время на переключение. connectionTimeout (30 с по умолчанию) — сколько ждать свободное соединение; при исчерпании пула потоки висят до этого таймаута.',
          '**Пакетная вставка:** ps.addBatch() + executeBatch() — один сетевой обмен на сотни строк; для PostgreSQL добавляют reWriteBatchedInserts=true.',
          'Ещё инструменты: **jOOQ** — типобезопасный SQL из схемы БД, **MyBatis** — SQL в XML или аннотациях с маппингом.',
        ] },
        { t: 'h3', text: '1.30.2. JPA и Hibernate: контекст персистентности' },
        { t: 'p', text: '**JPA** (Jakarta Persistence) — стандарт ORM, **Hibernate** — его основная реализация. Главное понятие — **контекст персистентности** (persistence context, EntityManager, в Hibernate — Session): кеш сущностей в рамках транзакции.' },
        { t: 'tree', lines: [
          [0, '**transient** — new Order(): Hibernate о нём не знает'],
          [0, '**managed** — после persist() или загрузки: изменения отслеживаются и сами попадут в базу'],
          [0, '**detached** — контекст закрыт (транзакция кончилась): объект есть, но изменения не отслеживаются'],
          [0, '**removed** — после remove(): будет удалён при flush'],
        ] },
        { t: 'ul', items: [
          '**Кеш первого уровня:** em.find(Order.class, 1) дважды в одной транзакции — один SQL. Гарантия: одна строка таблицы — один Java-объект в контексте.',
          '**Dirty checking:** при загрузке Hibernate сохраняет снимок полей. При **flush** (перед commit, перед JPQL-запросом к той же таблице, или явно) он сравнивает текущие значения со снимком и генерирует UPDATE для изменённых. Поэтому order.setStatus(PAID) внутри @Transactional сохраняется **без вызова save**.',
          '**Write-behind:** INSERT и UPDATE копятся и отправляются при flush, а не сразу. Ошибка ограничения базы (unique) всплывёт при flush — иногда далеко от места изменения.',
          'Большой контекст (загружены десятки тысяч сущностей) медленный: dirty checking сравнивает все. Пакетную обработку делают порциями с em.flush() и em.clear().',
        ] },
        { t: 'h3', text: '1.30.3. Связи' },
        { t: 'code', text: `@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)   // позволяет пакетные INSERT
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)  // по умолчанию EAGER — меняем!
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();    // по умолчанию LAZY

    @Version
    private long version;                                 // оптимистическая блокировка

    public void addItem(OrderItem item) {                 // поддерживаем обе стороны связи
        items.add(item);
        item.setOrder(this);
    }

    protected Order() {}                         // JPA требует конструктор без аргументов
}

@Entity
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")     // владелец связи — сторона с внешним ключом
    private Order order;
}` },
        { t: 'ul', items: [
          '**Владелец связи** — сторона с внешним ключом (@ManyToOne, @JoinColumn). mappedBy на другой стороне говорит «связь описана там». Изменения только на стороне mappedBy в базу не попадут — поэтому методы addItem поддерживают обе стороны.',
          '**Типы по умолчанию:** @ManyToOne и @OneToOne — **EAGER**, @OneToMany и @ManyToMany — LAZY. Практика: делать **все связи LAZY** и загружать нужное явно в запросе.',
          '**cascade** — какие операции распространяются на связанные сущности; orphanRemoval — удалить элемент, убранный из коллекции. Каскад ставят только от агрегата к его частям (заказ → позиции), никогда — к независимым сущностям (заказ → покупатель).',
          '**@ManyToMany** удобна только для простой таблицы связи; если у связи появляются атрибуты (дата, роль), её превращают в отдельную сущность.',
          '**GenerationType.IDENTITY** (автоинкремент) мешает пакетным вставкам: id известен только после INSERT. SEQUENCE с allocationSize (hi/lo) — выдаёт id блоками без запроса на каждую строку.',
          '**equals и hashCode сущностей:** не по всем полям (ленивые связи, изменяемость) и не наивно по id (null до persist). Безопасный вариант — по id с проверкой на null и постоянным hashCode на класс, или по неизменяемому бизнес-ключу.',
        ] },
        { t: 'h3', text: '1.30.4. Ленивая загрузка и LazyInitializationException' },
        { t: 'p', text: 'LAZY-связь вместо настоящего объекта содержит **прокси** (подкласс сущности, созданный ByteBuddy) или коллекцию-обёртку PersistentBag. При первом обращении к ней Hibernate делает SELECT — **если контекст ещё открыт**. Если транзакция уже закончилась (сущность detached) — **LazyInitializationException: could not initialize proxy - no Session**.' },
        { t: 'p', text: 'Неправильные решения: сделать связь EAGER (загрузка лишнего везде) или включить spring.jpa.open-in-view (в Spring Boot он включён по умолчанию и выдаёт предупреждение: соединение с базой держится весь HTTP-запрос, включая сериализацию JSON, а ленивые загрузки происходят незаметно в контроллере). Правильно — **загружать нужное в сервисе явно**: fetch join, entity graph или DTO-проекция. open-in-view в продакшене выключают.' },
        { t: 'h3', text: '1.30.5. Проблема N+1' },
        { t: 'code', text: `List<Order> orders = orderRepository.findByStatus(PAID);   // 1 запрос: 100 заказов
for (Order o : orders) {
    total += o.getItems().size();     // +1 запрос на КАЖДЫЙ заказ → 101 запрос
    o.getCustomer().getName();        // и ещё +1 на каждого покупателя
}` },
        { t: 'p', text: 'Один запрос за списком плюс N запросов за связями каждого элемента. Локально на 10 строках незаметно, в продакшене на 1000 строк — 1001 запрос и секунды задержки. Как обнаружить: включить логирование SQL (spring.jpa.show-sql или logging.level.org.hibernate.SQL=debug), статистику Hibernate (hibernate.generate_statistics), в тестах — проверять число запросов (библиотеки datasource-proxy, Hypersistence Utils).' },
        { t: 'table', caption: 'Таблица 28. Как решать N+1', headers: ['Способ', 'Как', 'Особенности'], rows: [
          ['**JOIN FETCH**', 'select o from Order o join fetch o.items where …', 'один запрос; для коллекций нужен distinct (в Hibernate 6 — автоматически); нельзя fetch join двух List-коллекций (MultipleBagFetchException); с пагинацией Hibernate пагинирует **в памяти** — опасно'],
          ['**@EntityGraph**', '@EntityGraph(attributePaths = {"items", "customer"}) на методе репозитория', 'декларативный аналог fetch join'],
          ['**@BatchSize** / default_batch_fetch_size', 'hibernate.default_batch_fetch_size=100', 'ленивые связи догружаются пачками: select … where order_id in (?, ?, … 100) — 1 + N/100 запросов, работает с пагинацией'],
          ['**DTO-проекция**', 'select new OrderSummary(…) или нативный SQL', 'загружается только нужное, сущности и контекст не участвуют — лучший вариант для чтения'],
          ['два запроса', 'страница id, затем fetch join по этим id', 'правильная пагинация с коллекциями'],
        ] },
        { t: 'h3', text: '1.30.6. Кеширование в Hibernate' },
        { t: 'ul', items: [
          '**Кеш первого уровня** — контекст персистентности, всегда включён, живёт в пределах транзакции (раздел 1.30.2).',
          '**Кеш второго уровня** — общий для всех сессий в пределах приложения, сущности по id: @Cacheable + @Cache(usage = READ_WRITE) и провайдер (Ehcache, Caffeine через JCache, Infinispan, Hazelcast). Уместен для **часто читаемых, редко меняемых** справочников. Каждый экземпляр сервиса держит свой локальный кеш — при нескольких подах нужен распределённый провайдер или аккуратная инвалидация, иначе поды видят разные данные.',
          '**Кеш запросов** (query cache) хранит id результатов запроса и сбрасывается при **любом** изменении участвующих таблиц — на часто меняющихся данных бесполезен и даже вреден.',
          'На практике в микросервисах чаще кешируют на уровне сервиса — Spring Cache (@Cacheable) с Caffeine или Redis, где явно управляют ключами и TTL (общие темы про кеширование).',
        ] },
        { t: 'h3', text: '1.30.7. Блокировки в JPA' },
        { t: 'ul', items: [
          '**Оптимистическая:** поле @Version — UPDATE … SET …, version = version + 1 WHERE id = ? AND version = ?. Если строку уже изменили — 0 строк, Hibernate бросает OptimisticLockException. Для редких конфликтов: редактирование карточки товара.',
          '**Пессимистическая:** @Lock(LockModeType.PESSIMISTIC_WRITE) на методе репозитория — SELECT … FOR UPDATE. Для частых конфликтов: списание остатков, балансы. Подробнее про блокировки и уровни изоляции — в главе 2.',
        ] },
        { t: 'example', label: 'Вопрос с собеседования', text: '«Сервис отдаёт список заказов за 3 секунды, хотя в базе 200 строк. Что проверишь?» Сильный ответ: включу логирование SQL и посчитаю запросы — скорее всего N+1 из-за ленивых связей, которые дёргаются при маппинге в DTO или при сериализации с включённым open-in-view; исправлю fetch join или entity graph для нужных связей, а для списка — DTO-проекцией; проверю EXPLAIN на индексы по внешним ключам и фильтрам; закреплю тестом, который проверяет число запросов.' },
      ],
      terms: [
        ['persistence context', 'кеш управляемых сущностей в рамках транзакции.'],
        ['dirty checking', 'автоматическое обнаружение изменённых сущностей при flush.'],
        ['N+1', 'один запрос за списком плюс по запросу на связи каждого элемента.'],
        ['HikariCP', 'пул соединений JDBC, используемый Spring Boot по умолчанию.'],
      ],
    },
  ],
}
