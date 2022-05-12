import { createSchema } from '@dots.cool/schemas';
import { Alert } from '@mui/material';
import { useMemo } from 'react';

interface WithSchemaProps {
  id: string;
  singular: string;
  plurial: string;
}

const withSchema = (Component: any, { singular, plurial }: WithSchemaProps) => {
  const SchemedComponent = (props: any) => {
    // Generate context
    const context = useMemo(() => {
      return createSchema(singular, plurial);
    }, []);

    if (!singular || !plurial)
      return <Alert severity="error">Singular or plurial are missing</Alert>;

    return <Component {...props} context={context} />;
  };
  return SchemedComponent;
};
export default withSchema;
