const { produce } = immer;

function shallowCopy(base) {
  return Object.assign(
    Object.create(Reflect.getPrototypeOf(base)),
    base
  );
}

function cloneSimple(obj) {
  return JSON.parse(JSON.stringify(obj));
}