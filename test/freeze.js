// Freeze an object and all child objects
export default function freeze (object) {
  Object.freeze (object);
  let keys = Reflect.ownKeys (object);
  for (let key of keys) {
    let child = object[key];
    let type = typeof (child);
    if ((type === 'object') || (type === 'function')) {
      if (! Object.isFrozen (child)) {
        freeze (child);
      }
    }
  }
  return object;
}
