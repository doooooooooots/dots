import float from '../atoms/float';

const lengthX = (label = 'Longueur') => ({
  lengthX: float({
    label: `${label} (⟷)`,
  }),
});

export default lengthX;
