// import { format } from 'date-fns';
// import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Document, Page, View, Image } from '@react-pdf/renderer';
import { isEmpty } from 'lodash';
import Footer from './parts/footer';
import Bilan from './parts/bilan';
import { styles } from './pdf-layout-template-style';

const PdfTemplateLayout = (props) => {
  const {
    pages,
    summary,
    snaps,
    project,
    roof,
    cladding,
    layout,
    product,
    solarModule,
    date,
    comments,
  } = props;

  // if (isEmpty(analytic) || isEmpty(snaps)) return <Document />;

  return (
    <Document>
      <Page
        size="A4" // A4 : [595.28, 841.89]
        orientation="landscape"
        style={styles.page}
        wrap
      >
        {/* Bilan */}
        {!isEmpty(summary) && (
          <Bilan
            solarModule={solarModule}
            cladding={cladding}
            summary={summary}
          />
        )}

        {/* Markup */}
        {!isEmpty(snaps) && (
          <>
            {Object.entries(snaps).map(([key, item], index) => {
              if (isEmpty(item)) {
                return null;
              }

              return (
                <View
                  key={key}
                  style={styles.imageContainer}
                  break={index > 0 || (index === 0 && !isEmpty(summary))}
                >
                  <Image
                    alt={key}
                    style={{ ...styles.image, aspectRatio: item.aspectRatio }}
                    src={item.snap}
                  />
                </View>
              );
            })}
          </>
        )}

        {/* Footer */}
        <Footer
          project={project}
          product={product}
          pages={pages}
          date={date}
          comments={comments}
          fixed
        />
      </Page>
    </Document>
  );
};

PdfTemplateLayout.propTypes = {
  analytic: PropTypes.any,
  comments: PropTypes.any,
  pages: PropTypes.any,
  date: PropTypes.any,
  form: PropTypes.any,
  snaps: PropTypes.any,
  related: PropTypes.any,
};

export default PdfTemplateLayout;
