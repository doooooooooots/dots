import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import Link from '../src/components/Link';
import { styled } from '@mui/system';
import { useRouter } from 'next/router';

const GET_LAST_PROJECTS = gql`
  query GetLastProjects($take: Int) {
    projects(take: $take) {
      id
      name
    }
  }
`;

const StyledLink = styled(Link)(
  ({ theme }) => `
  background-color:${theme.palette.primary.main};
  padding: 10px 15px;
  border-radius:10px;
  color:${theme.palette.primary.contrastText};
  text-decoration: none;
  &:hover {
    text-decoration: none;
    background-color:${theme.palette.primary.dark};
  }
`
);

export default function Home() {
  const {
    data = {},
    loading,
    error,
  } = useQuery(GET_LAST_PROJECTS, { variables: { take: 20 } });

  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Alert severity="error">Erreur pendant le chargement</Alert>;
  }

  return (
    <Container>
      <Stack
        my={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h1">Hello</Typography>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => router.push('/project/create')}
            variant="outlined"
            size="small"
          >
            Creér un projet
          </Button>
          <Button
            onClick={() => router.push('/layout/create')}
            variant="contained"
            size="small"
          >
            Creér un calepinage
          </Button>
        </Stack>
      </Stack>
      <Divider variant="middle" />
      <Box my={2}>
        {data.projects.map((item) => (
          <Stack
            direction="row"
            key={item.id}
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Typography>{item.name}</Typography>
            <StyledLink href={`/layout/${item.id}`} variant="contained">
              Creér un calepinage
            </StyledLink>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}

Home.getLayout = function getLayout(page) {
  return <>{page}</>;
};
