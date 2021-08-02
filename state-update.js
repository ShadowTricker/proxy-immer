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
      numbr: '3'
    }
  },
  hobbies: ['reading']
};

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
  state.address.zipcode = '111111',
  state.address.detail.unit = '3';
});


this.store.update(state => {
  const stateCopy = cloneSimple(state);
  stateCopy.address.zipcode = '111111',
  stateCopy.address.detail.unit = '3';
  return stateCopy;
}); */

const stateCopy = cloneSimple(stateObj);
stateCopy.address.zipcode = '111111',
stateCopy.address.detail.unit = '3';
console.log(stateCopy);
console.log(stateObj);
console.assert(stateCopy.hobbies !== stateObj.hobbies, 'Not Equal');

function cloneSimple(obj) {
  return JSON.parse(JSON.stringify(obj));
}