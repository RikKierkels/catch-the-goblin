export const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);
export const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
export const not = (fn) => (...args) => !fn(args);
