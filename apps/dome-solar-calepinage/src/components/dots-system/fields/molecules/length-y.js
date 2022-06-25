import float from '../atoms/float';

const lengthY = (label = 'Largeur') => ({
  lengthY: float({
    label: `${label} (↕︎)`,
  }),
});

export default lengthY;
