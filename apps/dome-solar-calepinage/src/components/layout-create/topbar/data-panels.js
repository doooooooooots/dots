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

const claddingFragment = `
  id
  name
  lengthX
  lengthY
  lengthZ
  numberOfWaves
  thickness
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
    where: ({ project }) => ({ project: { id: { equals: project.id } } }),
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
      cladding {
        ${claddingFragment}
      }
    `,
  },
  {
    name: 'cladding',
    title: 'Bac acier',
    dependencies: ['roof'],
    Icon: CalendarViewWeekOutlinedIcon,
    query: `
      ${claddingFragment}
    `,
  },
  {
    name: 'layout',
    title: 'Calepinage',
    Icon: StarBorderIcon,
    dependencies: ['project', 'roof'],
    // multiple
    where: ({ roof }) => ({ roof: { id: { equals: roof.id } } }),
    // single
    query: `
      id
      name
      solarEdge
      comments
      alignment
      overrideMassBalance
      numberOfColumns
      offsetX
      moduleSpaceBetweenX
      numberOfLines
      offsetY
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
