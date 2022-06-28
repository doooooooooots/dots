const withMiddleware = (func: any) => (props: any) => (args: any) =>
  func({ ...args, ...props });

export default withMiddleware;
