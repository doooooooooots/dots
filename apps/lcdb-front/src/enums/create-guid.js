export const createGUID = (item) =>
  `${item.product_id}-${item.condition}-${item.language_id}-${item.is_first_ed.toLowerCase() === 'true' ? 'T' : 'F'}`;


export const createGUIDPokemon = (item) =>
  `${item.product_id}-${item.condition}-${item.language_id}-${
    item.is_reverse_holo.toLowerCase() === 'true' ? 'T' : 'F'
  }-${item.is_first_ed.toLowerCase() === 'true' ? 'T' : 'F'}`;
