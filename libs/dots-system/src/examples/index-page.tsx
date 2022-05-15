import withContext from '../hoc/with-context';
import DotsIndexPage from '../pages/dots-index-page';

const ExamplePage = (props: any) => {
  const { context } = props;

  return <DotsIndexPage context={context} />;
};

export default withContext('stockUnit')(ExamplePage);
