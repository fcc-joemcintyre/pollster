// Freeze an object and all child objects
export default function freeze (object) {
  Object.freeze (object);
  const keys = Reflect.ownKeys (object);
  for (const key of keys) {
    const child = object[key];
    const type = typeof (child);
    if ((type === 'object') || (type === 'function')) {
      if (!Object.isFrozen (child)) {
        freeze (child);
      }
    }
  }
  return object;
}
