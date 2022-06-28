import * as React from 'react';
import { Box } from '@mui/system';
import {
  Button,
  Grid,
  Stack,
  Container,
  Typography,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDots } from '@dots.cool/schema';
import FormInput from '../../dots-system/components/form-input';

export default function EntityCreate(props) {
  const { entityName, model } = props;

  const { getSchema } = useDots();
  const { form, fields } = getSchema(entityName);

  const { control, handleSubmit } = useForm({
    defaultValues: {},
    resolver: undefined,
  });

  const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e);

  return (
    <Container maxWidth="lg">
      <Typography variant="h1">{entity.singular}</Typography>
      <Grid container spacing={2}>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {Object.entries(entity.form).map(([sectionName, sectionInfo]) => {
            return (
              <Grid key={sectionName} item xs={12}>
                <Typography variant="h2">{sectionInfo.primary}</Typography>
                <Grid container spacing={2}>
                  {Object.entries(sectionInfo.fields).map(
                    ([fieldName, fieldInfos]) => {
                      const fieldData = fields[fieldName];
                      return (
                        <Grid key={fieldName} item xs={fieldInfos.col || 6}>
                          <Controller
                            name={fieldName}
                            control={control}
                            render={({ field }) => (
                              <FormInput {...field} type={fieldData} />
                            )}
                          />
                        </Grid>
                      );
                    }
                  )}
                </Grid>
              </Grid>
            );
          })}

          <Grid item xs>
            <Box sx={{ bgcolor: 'background.default', borderRadius: 2 }}>
              <Box mt={4}>
                <Stack direction="row" justifyContent="flex-end">
                  <Button variant="contained" type="submit" fullWidth>
                    Enregistrer
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
}
