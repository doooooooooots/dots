// import { format } from 'date-fns';
// import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Document, Page, View, Image } from '@react-pdf/renderer';
import { isEmpty } from 'lodash';
import Footer from './parts/footer';
import Bilan from './parts/bilan';
import { styles } from './pdf-layout-template-style';

const PdfTemplateLayout = (props) => {
  const { snaps, analytic, form, related, date, comments, pages } = props;

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
        {!isEmpty(analytic) && <Bilan analytic={analytic} form={form} />}

        {/* Markup */}
        {!isEmpty(snaps) && (
          <>
            {Object.entries(snaps).map(([key, item], index) => {
              if (isEmpty(item)) {
                console.log('erf');
                return null;
              }
              return (
                <View
                  key={key}
                  style={styles.imageContainer}
                  break={index > 0 || (index === 0 && !isEmpty(analytic))}
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
          form={form}
          related={related}
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
