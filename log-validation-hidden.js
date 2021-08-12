const user = {
  name: 'Shadow Tricker',
  age: 30,
  job: 'Web Developer'
};

function createLogProxy(obj) {
  return new Proxy(obj, {
    get(target, key) {
      // console.log('Log Proxy');
      console.log(`Data[${ key }] get!`);
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log(`Data[${ key }] has changed!`);
      return Reflect.set(target, key, value);
    }
  });
}

function createHiddenProxy(obj, keysExclude) {
  return new Proxy(obj, {
    get(target, key) {
      // console.log('Hidden Proxy');
      if (keysExclude.includes(key)) {
        return `There is no property named [${ key }]!`;
      }
      return Reflect.get(...arguments);
    }
  });
}

function createValidationProxy(obj, validationMap) {
  return new Proxy(obj, {
    get(target, key) {
      // console.log('Valid Proxy');
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      const valid = validationMap[key] ? validationMap[key](value) : null;
      if (typeof valid === 'boolean') {
        return valid;
      }
      return Reflect.set(target, key, value);
    }
  });
}

const hiddenProxy = createHiddenProxy(user, ['job']);
const loggerProxy = createLogProxy(hiddenProxy);
const validProxy = createValidationProxy(loggerProxy, {
  name: v => true,
  age: v => {
    if (typeof v !== 'number') {
      // return false;
      throw TypeError(`Age must set a number!`);
    }
    return null;
  }
});

console.log(validProxy.name);
console.log(validProxy.age);
console.log(validProxy.job);
console.log(user);
validProxy.name = 'Above the time';
validProxy.age = '28';
// validProxy.age = 28;
validProxy.job = 'Test Developer';
console.log(validProxy.name);
console.log(validProxy.age);
console.log(user);