/* eslint-disable @typescript-eslint/no-explicit-any */
const compose =
  (...functions: any[]): any =>
  (args: any): any =>
    functions.reduceRight((arg, fn: any) => fn(arg), args);

export default compose;
