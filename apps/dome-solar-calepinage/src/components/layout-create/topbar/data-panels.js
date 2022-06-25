// Icons
import CalendarViewWeekOutlinedIcon from '@mui/icons-material/CalendarViewWeekOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import SolarPowerIcon from '@mui/icons-material/SolarPowerOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RoofingIcon from '@mui/icons-material/Roofing';

const solarModuleFragment = `
  id
  name
  frameType,
  lengthX
  lengthY
  lengthZ
  electricalPower
`;

const productFragment = `
  id
  name
  lengthX
  lengthY
  lengthZ
`;

const panels = [
  {
    name: 'project',
    title: 'Projet',
    Icon: InfoIcon,
    dependencies: [],
    query: `
      id
      name
      identifier
      step
      dateReception
      dateDelivery
      typeEmergency
      altitude
      areaField
      areaWind
      areaSea
      areaSnow
      hasCommercial {
        id
        givenName
        familyName
      }
    `,
  },
  {
    name: 'roof',
    title: 'Toiture',
    dependencies: ['project'],
    Icon: RoofingIcon,
    query: `
      id
      name
      lengthX
      lengthY
      purlinType
      purlinBetweenAxis
      purlinThickness
      incline
      obstacles
    `,
  },
  {
    name: 'cladding',
    title: 'Bac acier',
    dependencies: ['roof'],
    Icon: CalendarViewWeekOutlinedIcon,
    query: `
      id
      name
      lengthX
      lengthY
      lengthZ
      numberOfWaves
      thickness
    `,
  },
  {
    name: 'layout',
    title: 'Calepinage',
    dependencies: ['project', 'roof'],
    Icon: StarBorderIcon,
    query: `
      id
      name
      solarEdge
      numberOfColumns
      numberOfLines
      comments
      alignment
      offsetX
      offsetY
      overrideMassBalance
      moduleSpaceBetweenX
      moduleSpaceBetweenY
      solarModule {
        ${solarModuleFragment}
      }
      product {
        ${productFragment}
      }
    `,
  },
  {
    name: 'solarModule',
    title: 'Panneau solaire',
    dependencies: ['layout'],
    Icon: SolarPowerIcon,
    query: `
      ${solarModuleFragment}
    `,
  },
  {
    name: 'product',
    title: 'Produit',
    dependencies: ['layout'],
    Icon: StarBorderIcon,
    query: `
      ${productFragment}
    `,
  },
];

export default panels;
