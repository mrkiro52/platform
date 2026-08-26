import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#FFD60A', green: '#4ade80', blue: '#60a5fa', red: '#f87171', yellow: '#facc15', border: '#2a2a3a' }

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: '#12121e', border: '1px solid #2a2a3a',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 640 }}>{caption}</figcaption>}
    </figure>
  )
}

function Term({ name, children }) {
  return (
    <div style={{ margin: '12px 0', paddingLeft: 14, borderLeft: '2px solid var(--accent-lime)' }}>
      <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>{name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}> — {children}</span>
    </div>
  )
}

function P({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '14px 0', alignItems: 'flex-start' }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%', border: '1.5px solid var(--accent-lime)',
        color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginTop: 2,
      }}>{n}</span>
      <p style={{ margin: 0, flex: 1 }}>{children}</p>
    </div>
  )
}

// Блок с кодом на двух языках рядом
function DualCode({ jsCode, pyCode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '14px 0', width: '100%' }}>
      <div style={{ width: '100%' }}>
        <div style={{ color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>JavaScript</div>
        <TheoryCode language="js" code={jsCode} />
      </div>
      <div style={{ width: '100%' }}>
        <div style={{ color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Python</div>
        <TheoryCode language="python" code={pyCode} />
      </div>
    </div>
  )
}

export default function July13OopTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">ООП: основы</h1>
        <p className="theory-subtitle">Треки: Frontend и Backend</p>
        <p className="theory-date">13 июля 2026</p>
        <p>
          <strong>Объектно-ориентированное программирование (ООП)</strong> — способ организации кода, при котором
          данные и функции, работающие с ними, объединяют в единые сущности — объекты. Сегодня разберём базовые
          понятия ООП и покажем каждое сразу на двух языках — <strong>JavaScript</strong> и{' '}
          <strong>Python</strong> — синтаксис отличается, но идеи одинаковые в любом объектно-ориентированном
          языке.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужно ООП</h2>
        <P n={1}>
          Без ООП данные и обрабатывающие их функции существуют отдельно: массив пользователей и функция{' '}
          <code>printUser(user)</code> живут сами по себе, и ничто не мешает случайно вызвать не ту функцию не с
          теми данными. ООП группирует их вместе — объект «пользователь» сам знает, как себя печатать, проверять,
          сохранять. Это упрощает поддержку большого кода: логика, связанная с сущностью, лежит в одном месте.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Класс и объект</h2>
        <Term name="Класс">
          «чертёж» — описание того, какие данные (свойства) и поведение (методы) будут у объектов этого типа.
          Класс сам по себе не данные, а шаблон для их создания.
        </Term>
        <Term name="Объект (экземпляр)">
          конкретный «предмет», созданный по чертежу класса, с реальными значениями свойств. Из одного класса{' '}
          <code>Car</code> можно создать множество разных объектов-автомобилей с разным цветом и пробегом.
        </Term>
        <DualCode
          jsCode={`class Car {
  constructor(brand, color) {
    this.brand = brand   // свойство объекта
    this.color = color
  }

  drive() {              // метод объекта
    console.log(\`\${this.brand} едет\`)
  }
}

const car1 = new Car('Toyota', 'red')   // создаём объект (экземпляр)
car1.drive()   // Toyota едет`}
          pyCode={`class Car:
    def __init__(self, brand, color):   # конструктор
        self.brand = brand               # свойство объекта
        self.color = color

    def drive(self):                     # метод объекта
        print(f'{self.brand} едет')

car1 = Car('Toyota', 'red')   # создаём объект (экземпляр)
car1.drive()   # Toyota едет`}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Конструктор</h2>
        <P n={2}>
          <strong>Конструктор</strong> — специальный метод, который вызывается автоматически при создании объекта
          и задаёт его начальное состояние. В JS это метод <code>constructor</code>, в Python — метод{' '}
          <code>__init__</code>. Первый параметр Python-методов, <code>self</code>, — это ссылка на сам объект
          (аналог <code>this</code> в JS), но в Python его нужно писать явно первым аргументом каждого метода.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Инкапсуляция</h2>
        <Term name="Инкапсуляция">
          сокрытие внутреннего устройства объекта — наружу открывают только то, что нужно для использования
          (публичный интерфейс), а детали реализации и внутреннее состояние прячут от прямого доступа снаружи.
          Защищает от случайной порчи внутреннего состояния объекта извне.
        </Term>
        <DualCode
          jsCode={`class BankAccount {
  #balance = 0   // # делает свойство приватным (не видно снаружи)

  deposit(amount) {
    if (amount > 0) this.#balance += amount
  }

  getBalance() {
    return this.#balance   // доступ только через метод
  }
}

const acc = new BankAccount()
acc.deposit(100)
// acc.#balance = 999   // ошибка — нет прямого доступа`}
          pyCode={`class BankAccount:
    def __init__(self):
        self.__balance = 0   # __ — соглашение о приватности (name mangling)

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance   # доступ только через метод

acc = BankAccount()
acc.deposit(100)
# в Python приватность не абсолютная (это соглашение),
# но напрямую менять __balance снаружи не принято`}
        />
        <TheoryExample title="Разница в строгости">
          В JavaScript <code>#приватность</code> — настоящая, движок физически не даст обратиться к полю снаружи.
          В Python приватность через <code>__</code> — договорённость («не лезь сюда»), а не жёсткий запрет:
          технически доступ получить можно, но это считается плохим тоном.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Наследование</h2>
        <Term name="Наследование">
          механизм, позволяющий одному классу (потомку) взять свойства и методы другого класса (родителя) и
          дополнить или переопределить их — избегает дублирования кода между похожими сущностями.
        </Term>
        <DualCode
          jsCode={`class Animal {
  constructor(name) {
    this.name = name
  }
  speak() {
    console.log(\`\${this.name} издаёт звук\`)
  }
}

class Dog extends Animal {   // Dog наследует от Animal
  speak() {                  // переопределяем метод
    console.log(\`\${this.name} лает\`)
  }
}

new Dog('Рекс').speak()   // Рекс лает`}
          pyCode={`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f'{self.name} издаёт звук')

class Dog(Animal):   # Dog наследует от Animal
    def speak(self):  # переопределяем метод
        print(f'{self.name} лает')

Dog('Рекс').speak()   # Рекс лает`}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Полиморфизм</h2>
        <Term name="Полиморфизm">
          способность объектов разных классов отвечать на один и тот же вызов метода по-разному, каждый по-своему
          — единый интерфейс, разное поведение. Позволяет писать код, который работает с разными типами объектов
          одинаково, не зная заранее, с каким конкретно классом имеет дело.
        </Term>
        <DualCode
          jsCode={`class Cat extends Animal {
  speak() { console.log(\`\${this.name} мяукает\`) }
}

const animals = [new Dog('Рекс'), new Cat('Барсик')]
animals.forEach(a => a.speak())
// Рекс лает
// Барсик мяукает
// — один и тот же вызов .speak(), разное поведение`}
          pyCode={`class Cat(Animal):
    def speak(self):
        print(f'{self.name} мяукает')

animals = [Dog('Рекс'), Cat('Барсик')]
for a in animals:
    a.speak()
# Рекс лает
# Барсик мяукает
# — один и тот же вызов .speak(), разное поведение`}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Абстракция</h2>
        <Term name="Абстракция">
          выделение существенных для задачи характеристик объекта и отбрасывание несущественных деталей. На
          практике часто выражается через «контракт» — метод, который обязаны реализовать все классы-потомки, но
          сам родительский класс не знает, КАК именно это будет сделано.
        </Term>
        <DualCode
          jsCode={`class Shape {
  area() {
    throw new Error('Метод area() должен быть переопределён')
  }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r }
  area() { return Math.PI * this.r ** 2 }
}`}
          pyCode={`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass   # контракт: обязаны реализовать наследники

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14159 * self.r ** 2`}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Четыре принципа ООП — сводная таблица</h2>
        <TheoryTable
          headers={['Принцип', 'Суть одной фразой']}
          rows={[
            ['Инкапсуляция', 'прячем внутреннее состояние, открываем только нужный интерфейс'],
            ['Наследование', 'переиспользуем и расширяем поведение родительского класса'],
            ['Полиморфизм', 'один и тот же вызов работает по-разному для разных классов'],
            ['Абстракция', 'выделяем контракт «что делать», прячем детали «как именно»'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. this / self и статические свойства</h2>
        <P n={3}>
          Внутри метода нужно как-то обратиться к «текущему» объекту, для которого метод вызван — в JS это
          неявное ключевое слово <code>this</code>, в Python — явный первый параметр, который по соглашению
          называют <code>self</code> (можно назвать иначе, но так не делают). Кроме обычных («полевых») методов,
          у класса бывают <strong>статические</strong> — принадлежат самому классу, а не конкретному объекту, и
          вызываются без создания экземпляра.
        </P>
        <DualCode
          jsCode={`class MathUtils {
  static square(x) {   // static — метод класса, не объекта
    return x * x
  }
}

MathUtils.square(5)   // 25 — вызвали без new`}
          pyCode={`class MathUtils:
    @staticmethod
    def square(x):        # декоратор помечает метод статическим
        return x * x

MathUtils.square(5)   # 25 — вызвали без создания объекта`}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={4}>
          ООП объединяет данные и поведение в <strong>объекты</strong>, создаваемые по шаблону-<strong>классу</strong>{' '}
          через <strong>конструктор</strong> (<code>constructor</code> в JS, <code>__init__</code> в Python).
          Четыре столпа ООП: <strong>инкапсуляция</strong> (скрыть детали), <strong>наследование</strong>{' '}
          (переиспользовать поведение родителя), <strong>полиморфизм</strong> (один вызов — разное поведение) и{' '}
          <strong>абстракция</strong> (контракт без деталей реализации). Синтаксис JavaScript и Python различается
          (<code>this</code> vs <code>self</code>, <code>#private</code> vs <code>__private</code>), но идеи
          одинаковы — освоив их на одном языке, легко перенести на любой другой объектно-ориентированный.
        </P>
      </section>
    </div>
  )
}
