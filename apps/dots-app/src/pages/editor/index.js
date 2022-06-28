import { Editor } from '@dots.cool/components';
import { Divider, Typography } from '@mui/material';
import { Container } from '@mui/system';
import debounce from 'lodash/debounce';
import { useEffect, useState } from 'react';

const EditorPage = (props) => {
  const [state, setState] = useState({
    readOnly: false,
    template: false,
    dark: localStorage.getItem('dark') === 'enabled',
    value: undefined,
  });

  const handleChange = debounce((value) => {
    const text = value();
    localStorage.setItem('saved', text);
  }, 250);

  useEffect(() => {
    const savedText = localStorage.getItem('saved');
    const exampleText = `
    # Welcome

    This is example content. It is persisted between reloads in localStorage.
    `;
    setState((current) => ({ ...current, value: savedText || exampleText }));
  }, []);

  return (
    <Container sx={{ height: '100vh' }}>
      <Typography variant="h1">This is cool</Typography>
      <Divider sx={{ my: 2 }} />
      <Editor
        defaultValue="Hello world!"
        value={state.value}
        onChange={handleChange}
      />
    </Container>
  );
};

export default EditorPage;
