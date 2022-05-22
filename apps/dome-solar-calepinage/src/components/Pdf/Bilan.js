import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { round } from 'lodash';

const ROW_HEIGHT = 21;
const MARGIN_GLOBAL = 6;
const BORDER_COLOR = '#999';
const BACKGROUND_COLOR = '#ffffff';

const styles = StyleSheet.create({
  page: {
    backgroundColor: BACKGROUND_COLOR,
    display: 'flex',
    flexDirection: 'column',
    padding: MARGIN_GLOBAL
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
    fontWeight: 'black'
  },
  body2: {
    fontSize: 9,
    lineHeight: 1
  },
  important: {
    color: 'red'
  },
  cellTitle: {
    fontSize: 7,
    fontWeight: 'black',
    color: '#999',
    textTransform: 'uppercase',
    lineHeight: 1,
    flexGrow: 0,
    textAlign: 'left',
    width: 36
  },
  cellBorderBottom: {
    borderBottom: '1px solid #333'
  },
  cellLong: {
    width: 50
  },
  cellBig: {
    fontWeight: 'black',
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

const classes = (...classNames) => classNames.reduce((acc, current) => ({
  ...acc,
  ...styles[current]
}), {});

export default function Bilan(props) {
  const { analytic, form } = props;
  return (
    <View style={styles.view}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>

          <View style={styles.tableRow}>
            <View style={classes('col12')}>
              <Text style={classes('body1', 'textBold')}>
                {`Puissance installée : ${round(analytic?.totalPower, 2)} kWc`}
              </Text>
            </View>
          </View>

          <View style={classes('tableRow', 'cellBorderBottom')}>
            <View style={classes('col2')}>
              <Text style={classes('body1', 'textBold')}>
                Références
              </Text>
            </View>
            <View style={classes('col5')}>
              <Text style={classes('body1', 'textBold')}>
                Désignation
              </Text>
            </View>
            <View style={classes('col2')}>
              <Text style={classes('body1', 'alignCenter', 'textBold')}>
                Total
              </Text>
            </View>
            <View style={classes('col3')}>
              <Text style={classes('body1', 'alignCenter', 'textBold')}>
                Livré par Dome Solar
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tableBody}>

          {/* Module */}
          <View
            style={styles.tableRow}
          >
            <View style={classes('col2')}>
              <Text style={classes('body1')}>
                Modules
              </Text>
            </View>
            <View style={classes('col5')}>
              <Text style={classes('body1')}>
                {form.useSolarPanel[0] && form.useSolarPanel[0].target.name}
              </Text>
            </View>
            <View style={classes('col2', 'alignCenter')}>
              <Text style={classes('body1')}>
                {round(analytic.totalModules, 2)}
              </Text>
            </View>
            <View style={classes('col3')}>
              <Text style={classes('body1', 'alignCenter')} />
            </View>
          </View>

          {/* Bac */}
          <View
            style={classes('tableRow', 'cellBorderBottom')}
          >
            <View style={classes('col2')}>
              <Text style={classes('body1')}>
                Bac
              </Text>
            </View>
            <View style={classes('col5')}>
              <Text style={classes('body1')}>
                {form.useCladding[0] && form.useCladding[0].target.name}
              </Text>
            </View>
            <View style={classes('col2', 'alignCenter')}>
              <Text style={classes('body1')} />
            </View>
            <View style={classes('col3')}>
              <Text style={classes('body1', 'alignCenter')} />
            </View>
          </View>

          {analytic.bilan.map((item) => {
            if (!item.ref?.guid) return null;
            return (
              <View
                style={classes('tableRow')}
                key={item.key}
              >
                <View style={classes('col2')}>
                  <Text style={classes('body1')}>
                    {item.ref?.guid ?? 'Info manquante'}
                  </Text>
                </View>
                <View style={classes('col5')}>
                  <Text style={classes('body1')}>
                    {item.ref?.name ?? 'Info manquante'}
                  </Text>
                </View>
                <View style={classes('col2', 'alignCenter')}>
                  <Text style={classes('body1')}>
                    {item.count ? round(item.count, 2) : '-'}
                  </Text>
                </View>
                <View style={classes('col3')}>
                  <Text style={classes('body1', 'alignCenter')}>
                    {item.delivery ? 'X' : '-'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

Bilan.propTypes = {
  analytic: PropTypes.any,
  form: PropTypes.any
};
