import float from '../atoms/float';

const lengthZ = (label = 'Profondeur') => ({
  lengthZ: float({
    label: `${label} (↗)`,
  }),
});

export default lengthZ;
