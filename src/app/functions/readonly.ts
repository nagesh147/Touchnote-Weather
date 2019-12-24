//utility function to make properties Readonly

// *************WORK IN PROGRESS************* 

export function Readonly(value) {
  return function (target, key) {
    Object.defineProperty(target, key, {
      set: () => target.key = value,
      get: () => value,
      configurable: false
    });
  }
}