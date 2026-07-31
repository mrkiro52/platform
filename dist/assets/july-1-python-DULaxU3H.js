function t(){return{tasks:[{text:`Что выведет код?

x = 7 // 2
print(x)`,type:"choice",answer:"3",options:["3.5","4","3","2"],hint:"// — целочисленное деление, отбрасывает дробную часть",difficulty:"Легко"},{text:"Какой тип данных у значения True?",type:"choice",answer:"bool",options:["int","str","None","bool"],hint:"True и False — логические значения",difficulty:"Легко"},{text:`Что выведет код?

s = "Python"
print(s[1:4])`,type:"choice",answer:"yth",options:["Pyt","yth","ytho","yt"],hint:"Срез [1:4] — символы с индекса 1 по 3 включительно",difficulty:"Средне"},{text:"Какой метод добавляет элемент в конец списка?",type:"choice",answer:"append()",options:["append()","add()","insert()","push()"],hint:"add() — для множеств, push() в Python нет",difficulty:"Легко"},{text:`Что выведет код?

for i in range(1, 6, 2):
    print(i, end=" ")`,type:"choice",answer:"1 3 5",options:["1 2 3 4 5","2 4","1 3 5 7","1 3 5"],hint:"range(start, stop, step): от 1 до 5 с шагом 2",difficulty:"Средне"},{text:'Как получить значение по ключу "age" из словаря d безопасно (без ошибки, если ключа нет)?',type:"choice",answer:'d.get("age")',options:['d["age"]',"d.age",'d.get("age")','d.find("age")'],hint:'d["age"] выбросит KeyError, если ключа нет; get вернёт None',difficulty:"Средне"},{text:`Что выведет код?

print(len("hello"))`,type:"choice",answer:"5",options:["5","4","6","hello"],hint:"len() возвращает количество символов",difficulty:"Легко"},{text:`Что выведет код?

nums = [1, 2, 3]
print([x * 2 for x in nums])`,type:"choice",answer:"[2, 4, 6]",options:["[1, 2, 3, 1, 2, 3]","[2, 4, 6]","[1, 4, 9]","[2, 4, 6, 8]"],hint:"List comprehension умножает каждый элемент на 2",difficulty:"Средне"},{text:`Какой результат выражения?

print(3 == 3.0)`,type:"choice",answer:"True",options:["False","Ошибка","None","True"],hint:"По значению int 3 и float 3.0 равны",difficulty:"Средне"},{text:`Что выведет код?

x = 5
if x > 10:
    print("A")
elif x > 3:
    print("B")
else:
    print("C")`,type:"choice",answer:"B",options:["A","C","B","A B"],hint:"x=5: первое условие ложно, второе (x>3) истинно",difficulty:"Легко"}]}}export{t as default};
