const getCriticityColor = (index, max) => {
  if (index / max <= 0.25) return 'neutral.dark';
  if (index / max <= 0.5) return 'success.main';
  if (index / max <= 0.75) return 'warning.main';
  return 'error.main';
};

export default getCriticityColor;
