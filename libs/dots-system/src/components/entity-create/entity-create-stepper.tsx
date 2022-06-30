import * as React from 'react';

import Image from 'next/image';
import { useMutation } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';

import { Box } from '@mui/system';
import { Button, Grid, Stack, Typography, Divider } from '@mui/material';

import ButtonBar from '../button-bar/button-bar';
import FormInput from './input';

import { GRAPHQL_ACTIONS } from '@dots.cool/tokens';
import { useDots } from '@dots.cool/schema';
import toast from 'react-hot-toast';

export default function EntityCreateStepper(props) {
  const { entityName, onSubmitCallback, onCancel, boundary } = props;

  const { getSchema } = useDots();
  const {
    copyright,
    pictures,
    formApi,
    graphql,
    fields,
    fragments: { details: _query },
  } = getSchema(entityName);

  const steps = Object.keys(formApi.form);

  const { control, handleSubmit } = useForm({
    defaultValues: {},
    resolver: undefined,
  });

  const query = graphql[GRAPHQL_ACTIONS.CreateOne](_query);
  const [create] = useMutation(query);

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const isActiveStep = (index) => {
    return activeStep === index + 1;
  };

  const isLastSlide = (index) => {
    return totalSteps() === index + 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step: number) => () => {
    let node;
    if (step === 0) {
      node = document.getElementById(`form-start`);
    } else {
      node = document.getElementById(`form-${step}`);
    }

    if (boundary) {
      scrollIntoView(node, {
        behavior: 'smooth',
        block: 'center',
        scrollMode: 'always',
        boundary: document.getElementById(boundary),
      });
    } else {
      scrollIntoView(node, {
        behavior: 'smooth',
        block: 'center',
      });
    }
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const onSubmit = (data, e) => {
    toast.promise(
      create({
        variables: { data: data },
      }).then(() => {
        if (typeof onSubmitCallback === 'function') onSubmitCallback();
      }),
      {
        loading: 'Sauvegarde',
        success: <b>Ok.</b>,
        error: <b>Erreur.</b>,
      }
    );
    handleReset();
    onCancel();
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <>
      <Box
        id="form-start"
        sx={[
          {
            height: (theme) => `calc(100vh - ${theme.spacing(4 * 2 + 4 * 4)} )`,
            mb: 7,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.3s',
          },
          activeStep === 0 && {
            backgroundImage: (theme) =>
              `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23${theme.palette.neutral[200].replace(
                '#',
                ''
              )}FF' stroke-width='2' stroke-dasharray='2%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");border-radius: 8px;`,
          },
          activeStep !== 0 && {
            opacity: 0.4,
          },
        ]}
      >
        <Typography variant="h2" mt="120px">
          {copyright?.form ?? `Vous allez créer un ${entityName}`}
        </Typography>
        <Typography variant="body2">{`Ce formulaire comporte ${totalSteps()} étapes`}</Typography>
        <ButtonBar
          primary="Démarrer"
          primaryOnClick={handleStep(1)}
          secondaryOnClick={onCancel}
        />
        <Image
          alt="create"
          src={pictures?.form ?? '/assets/illustrations/create.svg'}
          width={250}
          height={250}
        />
      </Box>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {Object.entries(formApi.form).map(
          ([sectionName, sectionInfo], index) => {
            return (
              <Box
                id={`form-${index + 1}`}
                key={sectionName}
                mb="15vh"
                sx={[
                  {
                    color: 'neutral.200',
                  },
                  !isActiveStep(index) && {
                    '&:hover': {
                      '& .action-title': {
                        color: 'neutral.500',
                      },
                    },
                  },
                  isActiveStep(index) && {
                    color: 'neutral.900',
                  },
                  isLastSlide(index) && {
                    mb: '30vh',
                  },
                ]}
              >
                <Typography variant="overline" color="neutral.400">
                  {`${index + 1}. ${sectionInfo.primary}`}
                </Typography>
                {sectionInfo.secondary && (
                  <Box
                    onClick={handleStep(index + 1)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography className="action-title" variant="h5">
                      {sectionInfo.secondary}
                    </Typography>
                  </Box>
                )}
                <Divider sx={{ mt: 1, mb: 3 }} />
                <Grid container spacing={2}>
                  {Object.entries(sectionInfo.fields).map(
                    ([fieldName, fieldInfos]) => {
                      const { type, options } = fields[fieldName];
                      return (
                        <Grid key={fieldName} item xs={fieldInfos.col || 12}>
                          <Typography variant="h6" mb={3}>
                            {fieldName}
                          </Typography>
                          <Controller
                            name={fieldName}
                            control={control}
                            render={({ field }) => (
                              <FormInput
                                {...field}
                                type={type}
                                options={options}
                                fullWidth
                              />
                            )}
                          />
                        </Grid>
                      );
                    }
                  )}
                </Grid>
                {!isLastSlide(index) ? (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                    textAlign="center"
                    mt={2}
                  >
                    <Button
                      variant="outlined"
                      type="submit"
                      disabled={!isActiveStep(index)}
                      onClick={handleStep(Math.max(0, index))}
                    >
                      Précédent
                    </Button>
                    <Button
                      variant={isActiveStep(index) ? 'contained' : 'outlined'}
                      type="submit"
                      disabled={!isActiveStep(index)}
                      onClick={handleStep(index + 2)}
                    >
                      Suivant
                    </Button>
                  </Stack>
                ) : (
                  <Grid item xs>
                    <Box
                      sx={{ bgcolor: 'background.default', borderRadius: 2 }}
                    >
                      <Box mt={4}>
                        <Stack direction="row" justifyContent="center">
                          <Button variant="contained" type="submit">
                            Enregistrer
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  </Grid>
                )}
              </Box>
            );
          }
        )}
      </form>
    </>
  );
}
