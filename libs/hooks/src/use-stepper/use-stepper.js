import { useCallback, useState } from 'react';

const useStepper = (init = {}) => {
  const [step, setStep] = useState({
    first: 1,
    last: 5,
    current: 1,
    ...init,
  });

  const nextStep = useCallback(() => {
    setStep((previous) => ({
      ...previous,
      current: Math.min(previous.current + 1, previous.last),
    }));
  }, [setStep]);

  const previousStep = useCallback(() => {
    setStep((previous) => ({
      ...previous,
      current: Math.max(previous.current - 1, previous.first),
    }));
  }, [setStep]);

  const goToStep = useCallback(
    (stepTo) => {
      setStep((previous) => ({
        ...previous,
        current: Math.min(previous.last, Math.max(stepTo, previous.first)),
      }));
    },
    [setStep]
  );

  const reset = useCallback(() => {
    setStep((previous) => previous.first);
  }, [setStep]);

  return {
    step,
    nextStep,
    previousStep,
    goToStep,
    reset,
  };
};

export default useStepper;
