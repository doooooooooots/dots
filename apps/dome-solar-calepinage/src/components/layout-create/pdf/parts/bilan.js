import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from '@react-pdf/renderer';
import { round } from 'lodash';
import { styles } from '../pdf-layout-template-style';

const classes = (...classNames) =>
  classNames.reduce(
    (acc, current) => ({
      ...acc,
      ...styles[current],
    }),
    {}
  );

export default function Bilan(props) {
  const { solarModule, cladding, summary } = props;
  const { balance, modules, totalPower } = summary;
  return (
    <View style={styles.view}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={styles.tableRow}>
            <View style={classes('col12')}>
              <Text style={classes('body1', 'textBold')}>
                {`Puissance installée : ${totalPower} kWc`}
              </Text>
            </View>
          </View>

          <View style={classes('tableRow', 'cellBorderBottom')}>
            <View style={classes('col2')}>
              <Text style={classes('body1', 'textBold')}>Références</Text>
            </View>
            <View style={classes('col5')}>
              <Text style={classes('body1', 'textBold')}>Désignation</Text>
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
          <View style={styles.tableRow}>
            <View style={classes('col2')}>
              <Text style={classes('body1')}>Modules</Text>
            </View>
            <View style={classes('col5')}>
              <Text style={classes('body1')}>{solarModule.name}</Text>
            </View>
            <View style={classes('col2', 'alignCenter')}>
              <Text style={classes('body1')}>{modules.total}</Text>
            </View>
            <View style={classes('col3')}>
              <Text style={classes('body1', 'alignCenter')} />
            </View>
          </View>

          {/* Bac */}
          <View style={classes('tableRow', 'cellBorderBottom')}>
            <View style={classes('col2')}>
              <Text style={classes('body1')}>Bac</Text>
            </View>
            <View style={classes('col5')}>
              <Text style={classes('body1')}>{cladding.name}</Text>
            </View>
            <View style={classes('col2', 'alignCenter')}>
              <Text style={classes('body1')} />
            </View>
            <View style={classes('col3')}>
              <Text style={classes('body1', 'alignCenter')} />
            </View>
          </View>

          {balance.map(({ key, reference, designation, count, delivery }) => {
            if (!key) return null;
            return (
              <View style={classes('tableRow')} key={key}>
                <View style={classes('col2')}>
                  <Text style={classes('body1')}>
                    {reference ?? 'Info manquante'}
                  </Text>
                </View>
                <View style={classes('col5')}>
                  <Text style={classes('body1')}>
                    {designation ?? 'Info manquante'}
                  </Text>
                </View>
                <View style={classes('col2', 'alignCenter')}>
                  <Text style={classes('body1')}>
                    {count ? round(count, 2) : '-'}
                  </Text>
                </View>
                <View style={classes('col3')}>
                  <Text style={classes('body1', 'alignCenter')}>
                    {delivery ? 'X' : '-'}
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
  form: PropTypes.any,
};
