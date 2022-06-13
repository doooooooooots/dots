import PopperContainer from '../popper/popper-container';

export default function AutocompletePopper(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <PopperContainer {...other} />;
}
