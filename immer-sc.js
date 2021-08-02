const state = {
  name: {
    firstName: 'Shadow',
    lastName: 'Tricker'
  },
  phone: {
    mobile: '123-1234-1234',
    fix: '8888-8888'
  },
  age: 30,
  test: '111111'
};

const newState = produceFn(state, draft => {
  draft.age = 28;
  draft.test = '2222';
  draft.name.lastName = '333333';
});
console.log(newState);
console.log(newState.name === state.name);
console.log(newState.phone === state.phone);

// produce function 2nd version
function produceFn(baseState, updateFn) {
  const copies = new Map();
  const handler = {
    get(target, prop) {
      return new Proxy(target[prop], handler);
    },
    set(target, prop, value) {
      if (target[prop] !== value) {
        console.log(prop);
        const copy = shallowCopy(target);
        copy[prop] = value;
        copies.set(target, copy);
      }
      return true;
    }
  };

  function finalize(state) {
    const result = copies.get(state);
    Object.keys(state).forEach(k => {
      const copy = copies.get(state[k]);
      if (copy) {
        result[k] = copy;
      }
    });
    return result;
  }

  const proxy = new Proxy(baseState, handler);
  updateFn(proxy);
  return finalize(baseState);
}
