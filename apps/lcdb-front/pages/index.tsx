import { FC } from 'react';
import { Grid } from '@mui/material';
import {
  DotsIndexPage,
  withContext,
  EntityContext,
} from '@dots.cool/dots-system';
import { LayoutMain } from '@dots.cool/components';

const Hello = () => <div>Hello</div>;

const ExamplePage: FC<{ context: EntityContext }> = (props) => {
  const { context } = props;

  return (
    <Grid container>
      <LayoutMain>
        <DotsIndexPage
          context={context}
          variant="details"
          componentProps={{
            filterBar: {
              actionText: 'Créer un kiff',
            },
            topbar: {
              fullscreenPage: {
                path: 'view.full',
                title: 'Hello la vie',
                Component: Hello,
              },
            },
          }}
        />
      </LayoutMain>
    </Grid>
  );
};

export default withContext('storage')(ExamplePage);
