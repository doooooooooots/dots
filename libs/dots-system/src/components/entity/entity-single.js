import React from 'react';
import Entity from './entity';
import { useDots } from '@dots.cool/schema';
import { Container } from '@mui/system';
import { DotsDatagrid } from '../../pages';
import { isEmpty } from 'lodash';
import { Box, Divider, Stack, Typography } from '@mui/material';

function EntitySingle(props) {
  const { entityName, filter } = props;

  const { getSchema } = useDots();
  const { fragments, fieldApi } = getSchema(entityName);

  const related = fieldApi.getRelationship();

  return (
    <Container maxWidth="lg" sx={{ bgcolor: 'neutral.50' }}>
      <Box py={4}>
        <Box bgcolor="background.default" p={4} borderRadius={2} mb={4}>
          <Entity select={entityName} query={fragments.single} where={filter} />
        </Box>
        <Stack spacing={4}>
          {!isEmpty(related) &&
            Object.entries(related).map(([fieldName, field]) => (
              <Box
                key={fieldName}
                bgcolor="background.default"
                p={4}
                borderRadius={2}
              >
                <Typography variant="h3">{field.label}</Typography>
                <Divider sx={{ mt: 2, mb: 1 }} />
                <DotsDatagrid
                  variant="preview"
                  entityName={field.options}
                  filter={
                    field.many
                      ? {
                          [field.target]: {
                            some: { id: { equals: filter.id } },
                          },
                        }
                      : {
                          [field.target]: { id: { equals: filter.id } },
                        }
                  }
                />
              </Box>
            ))}
        </Stack>
      </Box>
    </Container>
  );
}

export default EntitySingle;
