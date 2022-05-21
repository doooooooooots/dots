interface ComponentConfig {
  name?: string;
  target?: string; // Relationhship Components
  label?: string;
  options?: string[];
  defaultValues?: string[];
  validation?: unknown;
  multiple?: boolean;
}

interface withMiddlewareProps extends ComponentConfig {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
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
