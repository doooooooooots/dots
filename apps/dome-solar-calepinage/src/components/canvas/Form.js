import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import InputNumber from '../InputNumber';
import InputSelect from '../InputSelect';
import InputCheckbox from '../InputCheckbox';
import InputString from '../InputString';
import * as Rows from '../../../components/layouts/form/rows';
import { useStore } from '../context/useStore';

const Container = ({ variant, ...other }) => {
  switch (variant) {
    case 'block':
      return Rows.BlockRow(other);

    case 'table':
    default:
      return Rows.TableRow(other);

    case 'single':
      return Rows.RowSingle(other);

    case 'details':
      return Rows.DetailRow(other);

    case 'card':
      return Rows.CardRow(other);

    case 'embed':
      return Rows.EmbedRow(other);
  }
};

const Row = ({ element }) => {
  switch (element.type) {
    case 'number':
      return <InputNumber element={element} />;
    case 'string':
      return <InputString element={element} />;
    case 'select':
      return <InputSelect element={element} />;
    case 'checkbox':
      return <InputCheckbox element={element} />;
    default:
      return null;
  }
};

const Form = (props) => {
  const { fields, variant } = props;
  const store = useStore();

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {fields.map((element) => {
        if (element.id === 'X0' && store.getAnchorPoint().includes('center')) return null;

        if (element.id === 'Y0' && store.getAnchorPoint().includes('middle')) return null;

        return (
          <Container key={element.id} variant={variant} label={element.label} description={element.description}>
            <Row element={element} />
          </Container>
        );
      })}
    </Box>
  );
};

Row.propTypes = {
  element: PropTypes.any
};

Form.propTypes = {
  fields: PropTypes.any,
  variant: PropTypes.any
};

export default observer(Form);
