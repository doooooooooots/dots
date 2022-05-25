import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import Logo from '../../../../public/logo-dark.png';

export const getField = (entity, fieldName) => {
  if (!entity) return undefined;
  const { entityFields } = entity;
  if (!entityFields) return undefined;
  const output = entityFields.find((field) => field.name === fieldName);
  return output?.value;
};

const ROW_HEIGHT = 21;
const MARGIN_GLOBAL = 6;
const BORDER_COLOR = '#999';
const BACKGROUND_COLOR = '#ffffff';

const styles = StyleSheet.create({
  page: {
    backgroundColor: BACKGROUND_COLOR,
    display: 'flex',
    flexDirection: 'column',
    padding: MARGIN_GLOBAL,
  },
  view: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    border: 1,
    borderBottom: 0,
    borderColor: BORDER_COLOR,
    padding: 24,
  },
  imageContainer: {
    border: 1,
    borderBottom: 0,
    borderColor: BORDER_COLOR,
    display: 'flex',
    flex: 1,
  },
  image: {
    flex: 1,
    margin: 'auto',
    width: '100%',
    maxWidth: '100%',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    borderLeft: 1,
    borderTop: 1,
    borderColor: BORDER_COLOR,
  },
  h4: {
    fontSize: 14,
    fontWeight: 600,
  },
  h6: {
    fontSize: 12,
    fontWeight: 800,
  },
  subtitle2: {
    fontSize: 10,
    fontWeight: 500,
  },
  caption: {
    fontSize: 7,
    fontStyle: 'italic',
    color: '#8a8a8a',
  },
  captionPosition: {
    paddingTop: 8,
  },
  body1: {
    fontSize: 10,
    padding: '3px 0',
  },
  textBold: {
    fontWeight: 'black',
  },
  body2: {
    fontSize: 9,
    lineHeight: 1,
  },
  cellTitle: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#999',
    textTransform: 'uppercase',
    lineHeight: 1,
    flexGrow: 0,
    textAlign: 'left',
    width: 36,
  },
  cellLong: {
    width: 50,
  },
  cellBig: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cellContent: {
    fontSize: 9,

    lineHeight: 1,
  },
  gutterBottom: {
    marginBottom: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brand: {
    margin: 'auto',
  },
  company: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  references: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  billing: {
    marginTop: 32,
  },
  notes: {
    marginTop: 32,
  },
  table: {
    display: 'flex',
    width: 'auto',
  },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
  },
  col1: {
    width: `${100 * (1 / 12)}%`,
  },
  col2: {
    width: `${100 * (2 / 12)}%`,
  },
  col3: {
    width: `${100 * (3 / 12)}%`,
  },
  col4: {
    width: `${100 * (4 / 12)}%`,
  },
  col5: {
    width: `${100 * (5 / 12)}%`,
  },
  col6: {
    width: `${100 * (6 / 12)}%`,
  },
  col7: {
    width: `${100 * (7 / 12)}%`,
  },
  col8: {
    width: `${100 * (8 / 12)}%`,
  },
  col9: {
    width: `${100 * (9 / 12)}%`,
  },
  col10: {
    width: `${100 * (10 / 12)}%`,
  },
  col11: {
    width: `${100 * (11 / 12)}%`,
  },
  col12: {
    width: `${100 * (12 / 12)}%`,
  },
  rowCell: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    flexGrow: 0,
    paddingLeft: 3,
    paddingRight: 3,
    height: '100%',
  },
  rowCellCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexGrow: 0,
    height: '100%',
    paddingRight: 3,
    paddingLeft: 3,
  },
  rowSmall: {
    height: (1 / 5) * 4 * ROW_HEIGHT,
  },
  row1: {
    height: ROW_HEIGHT,
  },
  row2: {
    height: 2 * ROW_HEIGHT,
  },
  row3: {
    height: 3 * ROW_HEIGHT,
  },
  row4: {
    height: 4 * ROW_HEIGHT,
  },
  top0: {
    top: 0,
  },
  top2: {
    top: 2 * ROW_HEIGHT,
  },
  alignRight: {
    textAlign: 'right',
  },
  alignCenter: {
    textAlign: 'center',
  },
  borderRight: {
    borderRight: 1,
    borderColor: BORDER_COLOR,
  },
  borderBottom: {
    borderBottom: 1,
    borderColor: BORDER_COLOR,
  },
  height1: {
    lineHeight: 1,
  },
  height2: {
    lineHeight: 2,
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  p0: {
    padding: 0,
  },
  p2: {
    padding: 4,
  },
  p4: {
    padding: 9,
  },
  pt4: {
    paddingTop: 4,
  },
  flexBetween: {
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  bottom0: {
    bottom: 0,
  },
});

const classes = (...classNames) =>
  classNames.reduce(
    (acc, current) => ({
      ...acc,
      ...styles[current],
    }),
    {}
  );

export default function Footer(props) {
  const { form, related, pages, date, comments, fixed = false } = props;

  return (
    <View style={styles.footer} fixed={fixed}>
      <View style={classes('col2', 'borderRight')}>
        <View style={classes('rowCell', 'borderBottom', 'row2', 'p4')}>
          <Image alt="logo" src={Logo} style={styles.brand} />
        </View>
        <View style={classes('rowCell', 'borderBottom', 'row1')}>
          <Text style={classes('cellTitle')}>Projet</Text>
          <Text style={classes('cellContent')}>{related?.project?.name}</Text>
        </View>
        <View style={classes('rowCell', 'borderBottom', 'row1')}>
          <Text style={classes('cellTitle')}>Statut</Text>
          <Text style={classes('cellContent')}>
            {related?.project?.status || 'Statut du projet'}
          </Text>
        </View>
      </View>
      <View style={classes('col4', 'borderRight')}>
        <View style={classes('rowCell', 'borderBottom', 'row2')}>
          <Text style={classes('cellTitle', 'alignSelfStart', 'pt4', 'pt4')}>
            Vue
          </Text>
          <Text
            style={classes('cellBig')}
            render={({ pageNumber }) => `${pages[pageNumber]?.name || ''}`}
          />
        </View>
        <View style={classes('rowCell', 'borderBottom', 'row1')}>
          <Text style={classes('cellTitle')}>Client</Text>
          <Text style={classes('cellContent')}>
            {related?.client?.name || ''}
          </Text>
        </View>
        <View style={classes('rowCell', 'borderBottom', 'row1', 'p0')}>
          <View style={classes('col6', 'rowCell', 'borderRight')}>
            <Text style={classes('cellTitle')}>Produit</Text>
            <Text style={classes('cellContent')}>
              {form?.hasProduct && form?.hasProduct[0]?.target?.name}
            </Text>
          </View>
          <View style={classes('col6', 'rowCell')}>
            <Text style={classes('cellTitle')}>Date</Text>
            <Text style={classes('cellContent')}>{date}</Text>
          </View>
        </View>
      </View>
      <View style={classes('col4', 'borderRight')}>
        <View style={classes('rowCellCol', 'row4', 'borderBottom')}>
          <View style={classes('row1')}>
            <Text style={classes('cellTitle')}>Notes</Text>
          </View>
          <View style={classes('row2')}>
            <Text
              style={classes('cellContent')}
              render={({ pageNumber }) => {
                const pageName = pages && pages[pageNumber]?.id;
                return `${(comments && comments[pageName]) || ''}`;
              }}
            />
          </View>
          <View style={classes('row1')}>
            <Text style={classes('caption', 'captionPosition')}>
              Toutes les cotes sont indiquées en mm
            </Text>
          </View>
        </View>
      </View>
      <View style={classes('col2', 'borderRight')}>
        <View
          style={classes('rowCell', 'borderBottom', 'rowSmall', 'flexBetween')}
        >
          <Text style={classes('cellTitle')}>Réf</Text>
          <Text style={classes('cellContent')}>
            {(related?.project?.guid && related?.project?.guid.toUpperCase()) ||
              ''}
          </Text>
        </View>
        <View
          style={classes('rowCell', 'borderBottom', 'rowSmall', 'flexBetween')}
        >
          <Text style={classes('cellTitle')}>Indice</Text>
          <Text style={classes('cellContent')}>0</Text>
        </View>
        <View
          style={classes('rowCell', 'borderBottom', 'rowSmall', 'flexBetween')}
        >
          <Text style={classes('cellTitle', 'cellLong')}>Dessinateur</Text>
          <Text style={classes('cellContent')}>
            {form?.hasTechnician && form?.hasTechnician[0]?.target?.name}
          </Text>
        </View>
        <View
          style={classes('rowCell', 'borderBottom', 'rowSmall', 'flexBetween')}
        >
          <Text style={classes('cellTitle')}>Dpt</Text>
          <Text style={classes('cellContent')}>
            {getField(related?.project, 'zipCode')?.substring(0, 2) || ''}
          </Text>
        </View>
        <View
          style={classes('rowCell', 'borderBottom', 'rowSmall', 'flexBetween')}
        >
          <Text style={classes('cellTitle')}>Page</Text>
          <Text
            style={classes('cellContent')}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} | ${totalPages}`
            }
          />
        </View>
      </View>
    </View>
  );
}

Footer.propTypes = {
  comments: PropTypes.any,
  date: PropTypes.any,
  form: PropTypes.any,
  pages: PropTypes.any,
  related: PropTypes.any,
  fixed: PropTypes.any,
};
