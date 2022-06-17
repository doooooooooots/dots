import { ProvidePopper } from '../../hooks/use-popper';

export default function withPopperContext(Component) {
  const ComponentWithPopperContext = (props) => {
    let { initialState, ...other } = props;
    return (
      // useContext so we have only one popper at time
      <ProvidePopper initialState={initialState}>
        <Component {...other} />
      </ProvidePopper>
    );
  };

  return ComponentWithPopperContext;
}
