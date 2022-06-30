import React from 'react';
import ButtonPopper from './button-popper';
import Container from './container';
import InputDate from './input-date';

function ButtonInput() {
  return (
    <ButtonPopper tooltip="help" label="Clickme">
      <Container>
        <InputDate />
      </Container>
    </ButtonPopper>
  );
}

export default ButtonInput;
