const obj = {
  a: 123,
  b: 321,
  c: {
    d: 'test'
  }
};
// references in memories are same
const objRefClone = obj;
// or use `Object.assign({}, obj)` to shallow copy
// the reference of this new object will create in memories
const objImm = {
  ...obj,
};

obj.a = 3344;

// mutable
objRefClone.b = 4433;
console.table({ obj, objRefClone });
console.log(obj === objRefClone);
console.log(obj.c === objRefClone.c);


// immutable
objImm.b = 4433;
console.table({ obj, objImm });
console.log(obj === objImm);
console.log(obj.c === objImm.c);

