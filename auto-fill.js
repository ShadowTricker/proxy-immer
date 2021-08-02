
function createAutoFillObject(origin) {
  return new Proxy(origin, {
    get(target, key) {
      if (!Reflect.has(target ,key)) {
        Reflect.set(target, key, createAutoFillObject({}));
      }
      return Reflect.get(target, key);
    }
  });
}

const obj = createAutoFillObject({});

obj.test1.test2.test3 = 123;
console.log(obj);
obj.test1.test2 = 456;
console.log(obj);

/* function changeObjVal (obj, keysStr, value) {
  const keys = keysStr.split('.');
  function test(o, kArray, val) {
    if (kArray.length === 1) {
      o[kArray[0]] = val;
      return;
    };
    if (!(kArray[0] in o)) {
      o[kArray[0]] = {};
    }
    test(o[kArray[0]], kArray.slice(1), val);
  }
  test(obj, keys, value);
}

const obj = {};
changeObjVal(obj, 'test1.test2.test3', 123);
console.log(obj); */