import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/fonts/Roboto/Roboto-Regular.ttf'
    },
    {
      src: '/fonts/Roboto/Roboto-Bold.ttf',
      fontWeight: 'bold'
    },
    {
      src: '/fonts/Roboto/Roboto-Thin.ttf',
      fontWeight: 'thin'
    },
    {
      src: '/fonts/Roboto/Roboto-Italic.ttf',
      fontStyle: 'italic'
    }
  ]
});

const ROW_HEIGHT = 21;
const MARGIN_GLOBAL = 6;
const BORDER_COLOR = '#999';
const BACKGROUND_COLOR = '#ffffff';

export const styles = StyleSheet.create({
  page: {
    backgroundColor: BACKGROUND_COLOR,
    display: 'flex',
    flexDirection: 'column',
    padding: MARGIN_GLOBAL,
    fontFamily: 'Roboto'
  },
  view: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    border: 1,
    borderBottom: 0,
    borderColor: BORDER_COLOR,
    padding: 24
  },
  imageContainer: {
    border: 1,
    borderBottom: 0,
    borderColor: BORDER_COLOR,
    display: 'flex',
    flex: 1
  },
  image: {
    flex: 1,
    margin: 'auto',
    width: '100%',
    maxWidth: '100%'
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    borderLeft: 1,
    borderTop: 1,
    borderColor: BORDER_COLOR
  },
  h4: {
    fontSize: 14,
    fontWeight: 600
  },
  h6: {
    fontSize: 12,
    fontWeight: 800
  },
  subtitle2: {
    fontSize: 10,
    fontWeight: 500
  },
  body1: {
    fontSize: 10,
    padding: '3px 0'
  },
  textBold: {
    fontWeight: 'bold'
  },
  body2: {
    fontSize: 9,
    lineHeight: 1
  },
  cellTitle: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    lineHeight: 1,
    flexGrow: 0,
    textAlign: 'left',
    width: 36
  },
  cellLong: {
    width: 50
  },
  cellBig: {
    fontWeight: 'bold',
    fontSize: 24
  },
  cellContent: {
    fontSize: 9,

    lineHeight: 1
  },
  gutterBottom: {
    marginBottom: 4
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  brand: {
    margin: 'auto'
  },
  company: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  references: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32
  },
  billing: {
    marginTop: 32
  },
  notes: {
    marginTop: 32
  },
  table: {
    display: 'flex',
    width: 'auto'
  },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center'
  },
  col1: {
    width: `${100 * (1 / 12)}%`
  },
  col2: {
    width: `${100 * (2 / 12)}%`
  },
  col3: {
    width: `${100 * (3 / 12)}%`
  },
  col4: {
    width: `${100 * (4 / 12)}%`
  },
  col5: {
    width: `${100 * (5 / 12)}%`
  },
  col6: {
    width: `${100 * (6 / 12)}%`
  },
  col7: {
    width: `${100 * (7 / 12)}%`
  },
  col8: {
    width: `${100 * (8 / 12)}%`
  },
  col9: {
    width: `${100 * (9 / 12)}%`
  },
  col10: {
    width: `${100 * (10 / 12)}%`
  },
  col11: {
    width: `${100 * (11 / 12)}%`
  },
  col12: {
    width: `${100 * (12 / 12)}%`
  },
  rowCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    flexGrow: 0,
    paddingLeft: 3,
    paddingRight: 3,
    height: '100%'
  },
  rowSmall: {
    height: (1 / 5) * 4 * ROW_HEIGHT
  },
  row1: {
    height: ROW_HEIGHT
  },
  row2: {
    height: 2 * ROW_HEIGHT
  },
  row4: {
    height: 4 * ROW_HEIGHT
  },
  alignRight: {
    textAlign: 'right'
  },
  alignCenter: {
    textAlign: 'center'
  },
  borderRight: {
    borderRight: 1,
    borderColor: BORDER_COLOR
  },
  borderBottom: {
    borderBottom: 1,
    borderColor: BORDER_COLOR
  },
  height1: {
    lineHeight: 1
  },
  height2: {
    lineHeight: 2
  },
  alignSelfStart: {
    alignSelf: 'flex-start'
  },
  p0: {
    padding: 0
  },
  p2: {
    padding: 4
  },
  p4: {
    padding: 9
  },
  pt4: {
    paddingTop: 4
  },
  flexBetween: {
    justifyContent: 'space-between'
  },
  flex: {
    flex: 1
  }
});
