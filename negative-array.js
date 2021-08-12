
function createNegativeArray(array) {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected an array');
  }

  const calcArrayIndex = (idx, max) => idx < 0 ? max + idx : idx;

  return new Proxy(array, {
    get(target, index) {
      const idx = +index;
      let i = calcArrayIndex(idx, target.length);
      return Reflect.get(target, i);
    },
    set(target, index, val) {
      const idx = +index;
      let i = calcArrayIndex(idx, target.length);
      return Reflect.set(target, i, val);
    }
  });
}

const array = Array.from({ length: 3 }, (v, i) => `${i}`);
console.log('array', array);
const negaArray = createNegativeArray(array);
console.log('index=-3 ', negaArray[-3]);
negaArray[-3] = '123';
console.log('index=-3 ', negaArray[-3]);
console.log('array', array);
console.log('proxyArray', negaArray);