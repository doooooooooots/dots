const pipe =
  (...functions:Function[]):Function =>
  (args:any):any =>
    functions.reduce((arg, fn) => fn(arg), args);

export default pipe;