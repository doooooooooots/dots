import enumList from '../utils/enum-list';

const AreaField = enumList({
  type: 'category',
  values: {
    SEA: 1,
    OPEN_COUNTRY: 2,
    CAMPAIGN: 3,
    URBAN: 4,
    URBAN_LIGHT: 5,
  },
  colors: {
    SEA: 'tags.6',
    OPEN_COUNTRY: 'tags.1',
    CAMPAIGN: 'tags.3',
    URBAN: 'tags.8',
    URBAN_LIGHT: 'neutral.200',
  },
  labels: {
    fr: {
      SEA: "Mer ou zone côtière exposée aux vents de mer: lacs et plans d'eau parcourus par le vent sur une distance d'au moins 5km",
      OPEN_COUNTRY:
        'Rase campagne avec ou non quelques obstacles isolés (arbres, bâtiments, etc) séparés les uns des autres de plus de 40 fois leur hauteur',
      CAMPAIGN: 'Campagne avec haies; vignobles; bocage; habitat dispersé',
      URBAN: 'Zones urbanisée ou industrielles; bocage dense; vergers',
      URBAN_LIGHT:
        'Zones urbaines dont moins 15% de la surface sont recouverts de bâtiments dont la hauteur moyenne est supérieure à 15m; forêts',
    },
  },
});

export default AreaField;
