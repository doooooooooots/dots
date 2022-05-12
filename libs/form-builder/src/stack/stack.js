import React from 'react';
import MuiStack from '@mui/material/Stack';

function Stack({ register = null, control = null, children, ...rest }) {
  return (
    <MuiStack {...rest}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: register,
                control: control,
                key: child.props.name,
              },
            })
          : child;
      })}
    </MuiStack>
  );
}

export default Stack;
