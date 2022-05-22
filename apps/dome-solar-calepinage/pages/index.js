import {
  Alert,
  Box,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import Link from '../src/components/Link';
import { styled } from '@mui/system';

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
  const GET_LAST_PROJECTS = gql`
    query GetLastProjects($take: Int) {
      projects(take: $take) {
        id
        name
      }
    }
  `;
  const {
    data = {},
    loading,
    error,
  } = useQuery(GET_LAST_PROJECTS, { variables: { take: 20 } });

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <Alert severity="error">Erreur pendant le chargement</Alert>;
  }

  return (
    <Container>
      <Box my={2}>
        <Typography variant="h1">Hello</Typography>
      </Box>
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
