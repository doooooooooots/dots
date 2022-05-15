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
  (args: withMiddlewareProps) => {
    const ComponentWithMiddleware = (props: unknown) => {
      return <Component {...props} {...config} {...args} />;
    };
    return ComponentWithMiddleware;
  };

export default withMiddleware;
