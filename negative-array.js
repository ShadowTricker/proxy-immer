
function createNegativeArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array');
  }

  return new Proxy(array, {
    get(target, index) {
      const idx = +index;
      let i = idx < 0 ? target.length + idx : idx;
      return Reflect.get(target, i);
    },
    set(target, index, val) {
      const idx = +index;
      let i = idx < 0 ? target.length + idx : idx;
      return Reflect.set(target, i, val);
    }
  });
}

const array = Array.from({ length: 3 }, (v, i) => (i + ''));
console.log(array);
const negaArray = createNegativeArray(array);
console.log(negaArray[-3]);
negaArray[-3] = '123';
console.log(negaArray[-3]);
console.log(array);
console.log(negaArray);