import { useWhyDidYouUpdate } from '@dots.cool/hooks';
import { useCallback, useState } from 'react';

const withSmartPopper = (Component) => (props) => {
  const { value, onChange, onCancel, onClose, children, ...other } = props;
  useWhyDidYouUpdate('SmartPopper', props);

  const [input, setInput] = useState(value);

  const handleChange = useCallback((data) => {
    setInput(data);
  }, []);

  const handleSubmit = useCallback(() => {
    onChange(input);
  }, [input, onChange]);

  const Content = (
    <Component
      value={input}
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
