// ES6 features

// Spread operator
let a = [1, 2, 3, 4];
let b = [5, 6, 7, 8];
let c = [...a, ...b];

console.log(c)

// Rest operator
function new_func(...REST: Array<number>) {
    console.log(REST);
}

let q = 1, w = 2, e = 3;

new_func(q, w, e);

// arrow function + Generics
let kek = <T>(a: T) => typeof a === 'number' ? a * 2 : 0;
console.log(kek('10'));
console.log(kek(10));

// IIFE
// 1 type:
console.log( ((x) => {return x})(a) );

// 2 type
console.log( (function mem(x) {return x})(a) );

// 3 type
console.log( function mem(x) {return x}(a) );

// functional string
let perosnName = "Jack", rout_number = 66;
console.log(`
    Hello, dear ${perosnName}! 
    Glad to see you on the road number ${rout_number}
`);

// Tagging (definitely unuseful func)
console.log(toUppercase`Hello, ${perosnName}!`)
function toUppercase<T1, T2>(litArr: T1, value: T2) {
    console.log(`
        First arg: ${litArr}
        Second arg: ${value}
    `)
}

// Cycles: for in and for of difference
let arr_one: Array<string> = ["Michael", "Trevor", "Franklin"];
for(let element in arr_one) {
    console.log(element);   // will output array's indexes
}

// BUT

for(let element of arr_one) {
    console.log(element);   // will output exactly elements of out array
}

// Classes:
class Person {
    name: string;
    age: number;
    
    constructor(name = 'DefaultName', age = 99) {
        this.name = name;
        this.age = age;
    }

    walk() {
        console.log(`*${this.name} walks*`);
    }

    introduce() {
        console.log(`Hello, my name is ${this.name}, I'm ${this.age} years old!`);
    }
}

let Jack = new Person("Jack", 24);
let DefaultPeson = new Person();

console.log(Jack);
console.log(DefaultPeson);
Jack.walk()
Jack.introduce()

// Classes extention:
interface male {
    gotMuscles: boolean;
};
interface female {
    gotLongHair: boolean
};

class Developer extends Person {
    JSskills: boolean;
    sex: string;
    occupation: string;

    constructor(name: string, age: number, JSskills = false, sex = 'undefined', occupation = 'unknown') {
        super(name, age);
        this.JSskills = JSskills;
        this.sex = sex;
        this.occupation = occupation;
    }

    walk() {
        super.walk();
    }

    showGender() {
        console.log(this.sex);
    }
}

let prekol = new Developer("Kek", 30, true, 'male', 'web-developer')
console.log(prekol);
prekol.showGender();

// Array destruction
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

[first, second] = [second, first] // swap
console.log(first);
console.log(second);

// Object destruction
let obj = {
    obj_a: "mem", 
    obj_b: 2,
    obj_c: "kek"
}

let {obj_a, obj_b, obj_c} = obj;

console.log(obj_a, obj_b, obj_c);   // "mem", 2, "kek"
console.log(typeof obj);    // object

// Symbol
let first_symbol = Symbol('mySymbol');
let second_symbol = Symbol('mySymbol');
console.log(first_symbol === second_symbol) // false cause every Symbol() object is unique

let tank = {
    a: "gusly",
    [Symbol.for("weapon")]: "dulo"
}

console.log(tank[Symbol.for("weapon")]);

// Promises

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(true) {
            resolve('promise completed');
        } else {
            reject();
        }
    }, 1000);
});

promise
    .then(data => console.log(data))
    .catch(() => console.log('error'));

// async / await
async function showAvatar() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000);
        console.log("Inner console.log");
    });
    console.log("Outer console.log");
    return true;
}

showAvatar();

// set / map
let set = new Set();

let elem_set1 = {a: 1, b: 2, c: 3};
let elem_set2 = {a: 3, b: 2, c: 1};

set
    .add(elem_set1)
    .add(elem_set2)
    .add(elem_set1)
    .add(elem_set2);

console.log(set.size);
set.forEach(element => {
    console.log(element);
});

let map = new Map<string, number>([
    ["key1", 1],
    ["key2", 433],
    ["key3", 123140]
]);

console.log(map.delete("key2"));
console.log(map.size);
console.log(map.clear());
console.log(map.size);

// modules
// Export
export const exp_a = 100;

let exp_b = 101, exp_c = 111;
export {exp_b, exp_c};

export interface exp_int {
    a: string,
    b: boolean,
    c: number
}

class exp_class {
    a: string;

    constructor(param: string) {
        this.a = param;
    }
}

function createClass(): object {
    return new exp_class("Some Param");
}

export {exp_class, createClass};

// Rename:
let one = 1, two = 2;
export { one as once, two as twice };

// Import
import { once as num1, twice as num2 } from './es6'

console.log(num1 + num2);   // cringe

export default class Per {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

// import Per from './index'    // in case if we haven't got such class inside a module