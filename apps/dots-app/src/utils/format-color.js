const formatColor = (color) => {
  if (
    ['primary', 'secondary', 'info', 'success', 'warning', 'error'].includes(
      color
    )
  )
    return `${color}.main`;
  return color;
};

export default formatColor;
