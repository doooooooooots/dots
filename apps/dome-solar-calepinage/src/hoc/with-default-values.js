import { useMemo } from 'react';

export default function withDefaultValues(Component, defaultValues) {
  const ComponentWithCustomDefaultValues = (props) => {
    const mergedProps = useMemo(
      () => ({
        ...defaultValues,
        ...props,
      }),
      [props]
    );
    return <Component {...mergedProps} />;
  };
  return ComponentWithCustomDefaultValues;
}
