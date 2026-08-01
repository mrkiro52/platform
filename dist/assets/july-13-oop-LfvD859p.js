import{j as e}from"./index-COKtlNDI.js";import{a as i,b as l,T as t}from"./TheoryTable-Dymn9neR.js";function s({name:a,children:r}){return e.jsxs("div",{style:{margin:"12px 0",paddingLeft:14,borderLeft:"2px solid var(--accent-lime)"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700},children:a}),e.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75},children:[" — ",r]})]})}function c({n:a,children:r}){return e.jsxs("div",{style:{display:"flex",gap:12,margin:"14px 0",alignItems:"flex-start"},children:[e.jsx("span",{style:{flexShrink:0,width:26,height:26,borderRadius:"50%",border:"1.5px solid var(--accent-lime)",color:"var(--accent-lime)",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2},children:a}),e.jsx("p",{style:{margin:0,flex:1},children:r})]})}function n({jsCode:a,pyCode:r}){return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14,margin:"14px 0",width:"100%"},children:[e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{style:{color:"var(--accent-lime)",fontSize:12,fontWeight:700,marginBottom:4},children:"JavaScript"}),e.jsx(t,{language:"js",code:a})]}),e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{style:{color:"var(--accent-lime)",fontSize:12,fontWeight:700,marginBottom:4},children:"Python"}),e.jsx(t,{language:"python",code:r})]})]})}function h(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"ООП: основы"}),e.jsx("p",{className:"theory-subtitle",children:"Треки: Frontend и Backend"}),e.jsx("p",{className:"theory-date",children:"13 июля 2026"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Объектно-ориентированное программирование (ООП)"})," — способ организации кода, при котором данные и функции, работающие с ними, объединяют в единые сущности — объекты. Сегодня разберём базовые понятия ООП и покажем каждое сразу на двух языках — ",e.jsx("strong",{children:"JavaScript"})," и"," ",e.jsx("strong",{children:"Python"})," — синтаксис отличается, но идеи одинаковые в любом объектно-ориентированном языке."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Зачем нужно ООП"}),e.jsxs(c,{n:1,children:["Без ООП данные и обрабатывающие их функции существуют отдельно: массив пользователей и функция"," ",e.jsx("code",{children:"printUser(user)"})," живут сами по себе, и ничто не мешает случайно вызвать не ту функцию не с теми данными. ООП группирует их вместе — объект «пользователь» сам знает, как себя печатать, проверять, сохранять. Это упрощает поддержку большого кода: логика, связанная с сущностью, лежит в одном месте."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Класс и объект"}),e.jsx(s,{name:"Класс",children:"«чертёж» — описание того, какие данные (свойства) и поведение (методы) будут у объектов этого типа. Класс сам по себе не данные, а шаблон для их создания."}),e.jsxs(s,{name:"Объект (экземпляр)",children:["конкретный «предмет», созданный по чертежу класса, с реальными значениями свойств. Из одного класса"," ",e.jsx("code",{children:"Car"})," можно создать множество разных объектов-автомобилей с разным цветом и пробегом."]}),e.jsx(n,{jsCode:`class Car {
  constructor(brand, color) {
    this.brand = brand   // свойство объекта
    this.color = color
  }

  drive() {              // метод объекта
    console.log(\`\${this.brand} едет\`)
  }
}

const car1 = new Car('Toyota', 'red')   // создаём объект (экземпляр)
car1.drive()   // Toyota едет`,pyCode:`class Car:
    def __init__(self, brand, color):   # конструктор
        self.brand = brand               # свойство объекта
        self.color = color

    def drive(self):                     # метод объекта
        print(f'{self.brand} едет')

car1 = Car('Toyota', 'red')   # создаём объект (экземпляр)
car1.drive()   # Toyota едет`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Конструктор"}),e.jsxs(c,{n:2,children:[e.jsx("strong",{children:"Конструктор"})," — специальный метод, который вызывается автоматически при создании объекта и задаёт его начальное состояние. В JS это метод ",e.jsx("code",{children:"constructor"}),", в Python — метод"," ",e.jsx("code",{children:"__init__"}),". Первый параметр Python-методов, ",e.jsx("code",{children:"self"}),", — это ссылка на сам объект (аналог ",e.jsx("code",{children:"this"})," в JS), но в Python его нужно писать явно первым аргументом каждого метода."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Инкапсуляция"}),e.jsx(s,{name:"Инкапсуляция",children:"сокрытие внутреннего устройства объекта — наружу открывают только то, что нужно для использования (публичный интерфейс), а детали реализации и внутреннее состояние прячут от прямого доступа снаружи. Защищает от случайной порчи внутреннего состояния объекта извне."}),e.jsx(n,{jsCode:`class BankAccount {
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
// acc.#balance = 999   // ошибка — нет прямого доступа`,pyCode:`class BankAccount:
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
# но напрямую менять __balance снаружи не принято`}),e.jsxs(i,{title:"Разница в строгости",children:["В JavaScript ",e.jsx("code",{children:"#приватность"})," — настоящая, движок физически не даст обратиться к полю снаружи. В Python приватность через ",e.jsx("code",{children:"__"})," — договорённость («не лезь сюда»), а не жёсткий запрет: технически доступ получить можно, но это считается плохим тоном."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Наследование"}),e.jsx(s,{name:"Наследование",children:"механизм, позволяющий одному классу (потомку) взять свойства и методы другого класса (родителя) и дополнить или переопределить их — избегает дублирования кода между похожими сущностями."}),e.jsx(n,{jsCode:`class Animal {
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

new Dog('Рекс').speak()   // Рекс лает`,pyCode:`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f'{self.name} издаёт звук')

class Dog(Animal):   # Dog наследует от Animal
    def speak(self):  # переопределяем метод
        print(f'{self.name} лает')

Dog('Рекс').speak()   # Рекс лает`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Полиморфизм"}),e.jsx(s,{name:"Полиморфизm",children:"способность объектов разных классов отвечать на один и тот же вызов метода по-разному, каждый по-своему — единый интерфейс, разное поведение. Позволяет писать код, который работает с разными типами объектов одинаково, не зная заранее, с каким конкретно классом имеет дело."}),e.jsx(n,{jsCode:`class Cat extends Animal {
  speak() { console.log(\`\${this.name} мяукает\`) }
}

const animals = [new Dog('Рекс'), new Cat('Барсик')]
animals.forEach(a => a.speak())
// Рекс лает
// Барсик мяукает
// — один и тот же вызов .speak(), разное поведение`,pyCode:`class Cat(Animal):
    def speak(self):
        print(f'{self.name} мяукает')

animals = [Dog('Рекс'), Cat('Барсик')]
for a in animals:
    a.speak()
# Рекс лает
# Барсик мяукает
# — один и тот же вызов .speak(), разное поведение`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Абстракция"}),e.jsx(s,{name:"Абстракция",children:"выделение существенных для задачи характеристик объекта и отбрасывание несущественных деталей. На практике часто выражается через «контракт» — метод, который обязаны реализовать все классы-потомки, но сам родительский класс не знает, КАК именно это будет сделано."}),e.jsx(n,{jsCode:`class Shape {
  area() {
    throw new Error('Метод area() должен быть переопределён')
  }
}

class Circle extends Shape {
  constructor(r) { super(); this.r = r }
  area() { return Math.PI * this.r ** 2 }
}`,pyCode:`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass   # контракт: обязаны реализовать наследники

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14159 * self.r ** 2`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Четыре принципа ООП — сводная таблица"}),e.jsx(l,{headers:["Принцип","Суть одной фразой"],rows:[["Инкапсуляция","прячем внутреннее состояние, открываем только нужный интерфейс"],["Наследование","переиспользуем и расширяем поведение родительского класса"],["Полиморфизм","один и тот же вызов работает по-разному для разных классов"],["Абстракция","выделяем контракт «что делать», прячем детали «как именно»"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. this / self и статические свойства"}),e.jsxs(c,{n:3,children:["Внутри метода нужно как-то обратиться к «текущему» объекту, для которого метод вызван — в JS это неявное ключевое слово ",e.jsx("code",{children:"this"}),", в Python — явный первый параметр, который по соглашению называют ",e.jsx("code",{children:"self"})," (можно назвать иначе, но так не делают). Кроме обычных («полевых») методов, у класса бывают ",e.jsx("strong",{children:"статические"})," — принадлежат самому классу, а не конкретному объекту, и вызываются без создания экземпляра."]}),e.jsx(n,{jsCode:`class MathUtils {
  static square(x) {   // static — метод класса, не объекта
    return x * x
  }
}

MathUtils.square(5)   // 25 — вызвали без new`,pyCode:`class MathUtils:
    @staticmethod
    def square(x):        # декоратор помечает метод статическим
        return x * x

MathUtils.square(5)   # 25 — вызвали без создания объекта`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs(c,{n:4,children:["ООП объединяет данные и поведение в ",e.jsx("strong",{children:"объекты"}),", создаваемые по шаблону-",e.jsx("strong",{children:"классу"})," ","через ",e.jsx("strong",{children:"конструктор"})," (",e.jsx("code",{children:"constructor"})," в JS, ",e.jsx("code",{children:"__init__"})," в Python). Четыре столпа ООП: ",e.jsx("strong",{children:"инкапсуляция"})," (скрыть детали), ",e.jsx("strong",{children:"наследование"})," ","(переиспользовать поведение родителя), ",e.jsx("strong",{children:"полиморфизм"})," (один вызов — разное поведение) и"," ",e.jsx("strong",{children:"абстракция"})," (контракт без деталей реализации). Синтаксис JavaScript и Python различается (",e.jsx("code",{children:"this"})," vs ",e.jsx("code",{children:"self"}),", ",e.jsx("code",{children:"#private"})," vs ",e.jsx("code",{children:"__private"}),"), но идеи одинаковы — освоив их на одном языке, легко перенести на любой другой объектно-ориентированный."]})]})]})}export{h as default};
