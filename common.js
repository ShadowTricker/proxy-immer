
function shallowCopy(base) {
  return Object.assign(
    Object.create(Reflect.getPrototypeOf(base)),
    base
  );
}