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
  draft.name.lastName = '3333';
});
console.log(newState);
console.log('name: ', newState.name === state.name);
console.log('phone: ', newState.phone === state.phone);

// produce function 1st version
function produceFn(baseState, updateFn) {
  let copy;
  const handler = {
    set(target, prop, value) {
      console.log('changedPropName: ', prop);
      if (target[prop] !== value) {
        if (!copy) {
          copy = shallowCopy(target);
        }
        return Reflect.set(copy, prop, value);
      }
      return true;
    }
  };

  const proxy = new Proxy(baseState, handler);
  updateFn(proxy);
  return copy;
}
