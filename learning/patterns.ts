// TS patterns:

// Singleton not allows you to create more than one copy of an object
class Counter {
  static instance: any;
  count!: number;
  constructor(count: number = 0) {
    if (typeof Counter.instance === 'object') {
      return Counter.instance;
    }
    this.count = count;
    Counter.instance = this;
    return this;
  }
  
  getCounter() {
    return this.count;
  }

  increaseCounter() {
    return this.count++;
  }
}

let kek = new Counter();
kek.increaseCounter();
kek.increaseCounter();

let mem = new Counter();
mem.increaseCounter();
mem.increaseCounter();
mem.increaseCounter();

console.log(`kek: ${kek.getCounter()}`);
console.log(`mem: ${mem.getCounter()}`);

// Class Factory
class Tesla {
  model: string; 
  weight: number;
  max_speed: number;
  constructor(model: string, weight: number, max_speed: number) {
    this.model = model;
    this.weight = weight;
    this.max_speed = max_speed;
  }

  produce() {
    return new Tesla(this.model, this.weight, this.max_speed);
  }
}

class TeslaFactory {
  create(type: string) {
    if (type === 'Model S') {
      return new Tesla(type, 2500, 300)
    }
    if (type === 'Model X') {
      return new Tesla(type, 2900, 340)
    }
  }
}

const factory = new TeslaFactory();

const model_s = factory.create("Model S")
const model_x = factory.create("Model X")

// Prototype
const prototypeCar = new Tesla("Model Y", 2400, 290)

const car1 = prototypeCar.produce();
const car2 = prototypeCar.produce();
const car3 = prototypeCar.produce();

console.log(car1);
console.log(car2);
console.log(car3);

// Builder
class SomeRandomCar {
  autopilot: boolean;
  parktronic: boolean;
  signaling: boolean;
  constructor() {
    this.autopilot = false;
    this.parktronic = false;
    this.signaling = false;
  }
};

class CarBuilder {
  car: any;
  constructor() {
    this.car = new SomeRandomCar();
  }
  
  addAutoPilot(autopilot: boolean) {
    this.car.autopilot = autopilot;
    return this;
  }

  addParktronic(parktronic: boolean) {
    this.car.parktronic = parktronic;
    return this;
  }

  addSignaling(signaling: boolean) {
    this.car.signaling = signaling;
    return this;
  }

  updateEngine(engine: any) {
    this.car.engine = engine;
    return this;
  }

  build() {
    return this.car;
  }
};

const myNewCar = new CarBuilder()
  .addAutoPilot(true)
  .addParktronic(true)
  .updateEngine("V12")
  .build();

console.log(myNewCar);

// Proxy
class CarAccess {
  open() {
    console.log("Opening the door!");
  }
  close() {
    console.log("Closing the door!")
  }
}

class Security {
  car: any;
  password: string;
  constructor(Car: any) {
    this.car = Car;
    this.password = "password"
  }

  open(password: string = '') {
    if (this.password === password) {
      this.car.open();
    } else {
      console.log("This is not your property!")
    }
  }

  close(password: string = '') {
    if (this.password === password) {
      this.car.close();
    } else {
      console.log("This is not your property!")
    }
  }
}

const carSecurity = new Security(new CarAccess());

carSecurity.open('kek');
carSecurity.open('password');

// Bridge
class Color {
  type: any;
  constructor(type: any) {
    this.type = type;
  }

  get() {
    return this.type;
  }
}

class Model {
  color: any;
  constructor(color: any) {
    this.color = color;
  }
}

class Black extends Color {
  constructor() {
    super('black');
  }
}

class White extends Color {
  constructor() {
    super('white');
  }
}

class BMW extends Model {
  constructor(color: any) {
    super(color);
  }

  paint() {
    return `Auto BMW is colored into a ${this.color.get()} color`;
  }
}

class Lamborghini extends Model {
  constructor(color: any) {
    super(color);
  }

  paint() {
    return `Auto Lamborghini is colored into a ${this.color.get()} color`;
  }
}

const lamborghini = new Lamborghini(new White());
console.log(lamborghini.paint());
const bmw = new BMW(new Black());
console.log(bmw.paint());

// Binding the context

// First Example:
let user = {
  firstName: "Вася",
  say(phrase: any) {
    console.log(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Привет");
say("Пока");

// Second Example:
function mul(a: number, b: number) {
  return a * b;
}

let triple = mul.bind(null, 3); // where null is a context

console.log( triple(3) ); // = mul(3, 3) = 9
console.log( triple(4) ); // = mul(3, 4) = 12
console.log( triple(5) ); // = mul(3, 5) = 15

function askPassword(ok: any, fail: any) {
  let password = 'rockstar';
  if (password == "rockstar") ok();
  else fail();
}

let user_N = {
  name!: 'Вася',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

askPassword(user_N.loginOk.bind(user_N), user_N.loginFail.bind(user_N));