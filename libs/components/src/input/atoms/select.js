import OptionUnstyled, {
  optionUnstyledClasses,
} from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import SelectUnstyled, {
  selectUnstyledClasses,
} from '@mui/base/SelectUnstyled';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import * as React from 'react';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

export const StyledButton = styled('button')(
  ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 220px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  display:flex;
  align-items:center;
  justify-content:space-between;
  flex-direction:row

  &:hover {
    // background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[600]};
    cursor:pointer;

    &::after {
      content: '▾';
      float: right;
      background-color:${grey[100]};
    }
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
    width:20px;
    height:20px;
    border-radius:50%;
    text-align: center;
    transition: all 0.3s;
  }
  `
);

export const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 220px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `
);

export const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 4px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected}, &.${optionUnstyledClasses.highlighted}.${
    optionUnstyledClasses.selected
  } {
    background-color: ${theme.palette.primary.main};
    color: white;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}):not(.${
    optionUnstyledClasses.selected
  }) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const Select = React.forwardRef(({ sx = {}, ...props }, ref) => {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  const { size = 'medium' } = props;

  return (
    <SelectUnstyled
      sx={[
        sx,
        size === 'small' && {
          paddingTop: 0.5,
          paddingBottom: 0.5,
          paddingLeft: 1,
          paddingRight: 1,
          minHeight: 'auto',
        },
      ]}
      {...props}
      ref={ref}
      components={components}
    />
  );
});

Select.propTypes = {
  components: PropTypes.any,
};

export default Select;
