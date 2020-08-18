const compose = (...fns) => value => fns.reduceRight((acc, fn) => fn(acc), value);
const not = fn => (...args) => !fn(args);
