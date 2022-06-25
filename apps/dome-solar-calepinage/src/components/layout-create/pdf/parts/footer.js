import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, View } from '@react-pdf/renderer';
import Logo from '../../../../../public/logo-dark.png';
import { styles } from '../pdf-layout-template-style';

const classes = (...classNames) =>
  classNames.reduce(
    (acc, current) => ({
      ...acc,
      ...styles[current],
    }),
    {}
  );

export default function Footer(props) {
  const { project, product, pages, date, comments, fixed = false } = props;

  return (
    <View style={styles.footer} fixed={fixed}>
      <View style={classes('col2', 'borderRight')}>
        <View style={classes('rowCell', 'borderBottom', 'row2', 'p4')}>
          <Image alt="logo" src={Logo} style={styles.brand} />
        </View>
        <View style={classes('rowCell', 'borderBottom', 'row1')}>
          <Text style={classes('cellTitle')}>Projet</Text>
          <Text style={classes('cellContent')}>{project.name}</Text>
        </View>
        <View style={classes('rowCell', 'borderBottom', 'row1')}>
          <Text style={classes('cellTitle')}>Statut</Text>
          <Text style={classes('cellContent')}>
            {project.status || 'Statut du projet'}
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
            {project.client?.name || ''}
          </Text>
        </View>
        <View style={classes('rowCell', 'borderBottom', 'row1', 'p0')}>
          <View style={classes('col6', 'rowCell', 'borderRight')}>
            <Text style={classes('cellTitle')}>Produit</Text>
            <Text style={classes('cellContent')}>{product.name}</Text>
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
          <Text style={classes('cellContent')}>{project.identifier}</Text>
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
            {project.hasTechnician?.fullName}
          </Text>
        </View>
        <View
          style={classes('rowCell', 'borderBottom', 'rowSmall', 'flexBetween')}
        >
          <Text style={classes('cellTitle')}>Dpt</Text>
          <Text style={classes('cellContent')}>
            {project?.zipCode?.substring(0, 2) || ''}
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
