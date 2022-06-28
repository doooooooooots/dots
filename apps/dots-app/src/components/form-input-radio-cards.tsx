import { Grid, Radio, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import React from 'react';
import useEnum from '../hooks/use-enums';
import getEnumIconComponent from '../utils/get-enum-icon-component';

import { LoadingOverlay, ErrorPage } from '@dots.cool/components';

function FormInputRadioCards(props) {
  const { options } = props;
  const { data, loading, error } = useEnum(options);

  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (newValue: string) => {
    setSelectedValue(newValue);
  };

  if (loading) return <LoadingOverlay />;
  if (error) return <ErrorPage />;

  return (
    <>
      <Grid container spacing={1} alignItems="stretch">
        {!isEmpty(data?.options) &&
          data.options.map((option) => {
            const { key, value, label, index } = option;
            const Icon = getEnumIconComponent(options);
            return (
              <Grid item xs={3} key={index}>
                <Stack
                  direction="column"
                  onClick={() => handleChange(`${value}`)}
                  sx={[
                    {
                      p:
                        data.options.length > 8
                          ? 1
                          : data.options.length > 4
                          ? 3
                          : 5,
                      border: 1,
                      borderRadius: 2,
                      borderColor: 'divider',
                      cursor: 'pointer',
                      height: '100%',
                      '&:hover': { bgcolor: 'neutral.25' },
                    },
                    selectedValue === `${value}` && {
                      borderColor: 'neutral.500',
                      bgcolor: 'neutral.25',
                    },
                  ]}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1}>
                      {Icon && <Icon {...Icon.bindProps(option)} />}
                      <Typography variant="body2" fontWeight={600}>
                        {label}
                      </Typography>
                    </Stack>
                    <Radio
                      checked={selectedValue === `${value}`}
                      value={`${value}`}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': 'A' }}
                      size="small"
                      sx={{ color: 'neutral.200' }}
                    />
                  </Stack>
                </Stack>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}

export default FormInputRadioCards;
