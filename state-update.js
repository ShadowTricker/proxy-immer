const stateObj = {
  name: 'Shadow',
  age: 30,
  address: {
    street: 'Yulin Street',
    suite: 'No.28',
    city: 'Dalian',
    zipcode: '116030',
    detail: {
      unit: '6',
      number: '3'
    }
  },
  hobbies: ['reading']
};

const stateCopy = cloneSimple(stateObj);
stateCopy.address.zipcode = '111111',
stateCopy.address.detail.unit = '3';
console.log('clone', stateCopy.hobbies === stateObj.hobbies);  // false

const spreadNewState = {
  ...stateObj,
  address: {
    ...stateObj.address,
    zipcode: '111111',
    detail: {
      ...stateObj.address.detail,
      unit: '3'
    }
  }
};
console.log('spread', spreadNewState.hobbies === stateObj.hobbies);  // true

const immerNewState = produce(stateObj, draft => {
  draft.address.zipcode = '111111',
  draft.address.detail.unit = '3';
});
console.log('immer', immerNewState.hobbies ===stateObj.hobbies);  // true


/* this.store.update(state => ({
  ...state,
  address: {
    ...state.address,
    zipcode: '111111',
    detail: {
      ...state.address.detail,
      unit: '3'
    }
  }
}));


this.store.update(state => {
  const stateCopy = cloneSimple(state);
  stateCopy.address.zipcode = '111111',
  stateCopy.address.detail.unit = '3';
  return stateCopy;
});

this.store.update(state => {
  state.address.zipcode = '111111',
  state.address.detail.unit = '3';
}); */