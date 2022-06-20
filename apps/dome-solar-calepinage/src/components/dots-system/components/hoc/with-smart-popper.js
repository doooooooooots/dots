import { isEmpty, last } from 'lodash';
import { useCallback, useState } from 'react';

const withSmartPopper = (Component) => (props) => {
  const { value, multiple, onChange, onCancel, onClose, children, ...other } =
    props;

  // Pending Value
  const [input, setInput] = useState(value);

  // Update pending value onChange events
  const handleChange = useCallback((data) => {
    setInput(data);
  }, []);

  // Update sumbit function when input changes
  const handleSubmit = useCallback(() => {
    const getValue = (value, multiple) => {
      if (isEmpty(value)) return { set: [] };
      if (multiple)
        return {
          set: value.map(({ id }) => ({
            id,
          })),
        };
      return { set: { id: last(value)?.id } };
    };

    // [ ](Adrien): Improve compare method
    if (value !== input) {
      onChange(getValue(input, multiple));
    }
    onClose();
  }, [input, multiple, onChange, onClose, value]);

  const Content = (
    <Component
      value={input}
      multiple={multiple}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      {...other}
    />
  );

  return children({
    content: Content,
    submit: handleSubmit,
    cancel: onCancel,
  });
};

export default withSmartPopper;
