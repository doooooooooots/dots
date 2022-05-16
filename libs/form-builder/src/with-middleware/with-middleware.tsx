interface ComponentConfig {
  name?: string;
  label?: string;
  options?: string[];
  defaultValues?: string[];
  validation?: unknown;
}

interface withMiddlewareProps extends ComponentConfig {
  name: string;
  label: string;
  placeholder: string;
}

const withMiddleware =
  (Component: React.FC<withMiddlewareProps>) =>
  (config: ComponentConfig) =>
  ({ name, ...args }: withMiddlewareProps) => {
    const ComponentWithMiddleware = (props) => {
      const mergedProps = { ...props, ...config, ...args, name };
      return <Component {...mergedProps} />;
    };
    return ComponentWithMiddleware;
  };

export default withMiddleware;
