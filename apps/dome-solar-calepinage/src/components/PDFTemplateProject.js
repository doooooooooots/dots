// import { format } from 'date-fns';
// import numeral from 'numeral';
import PropTypes from 'prop-types';
import { Document, Page, View, Image } from '@react-pdf/renderer';
import { isEmpty } from 'lodash';
import Footer from './Pdf/Footer';
import Bilan from './Pdf/Bilan';
import { styles } from './Pdf/style';

const PDFTemplateProject = (props) => {
  const { snaps, analytic, form, related, date, comments, pages } = props;

  if (isEmpty(analytic) || isEmpty(snaps)) return <Document />;

  return (
    <Document>
      <Page
        size="A4" // A4 : [595.28, 841.89]
        orientation="landscape"
        style={styles.page}
        wrap
      >

        {/* Bilan */}
        <Bilan
          analytic={analytic}
          form={form}
        />

        {/* Markup */}
        {Object.entries(snaps).map(([key, item]) => (
          <View
            key={key}
            style={styles.imageContainer}
            break
          >
            <Image
              style={{ ...styles.image, aspectRatio: item.aspectRatio }}
              src={item.snap}
            />
          </View>
        ))}

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

PDFTemplateProject.propTypes = {
  analytic: PropTypes.any,
  comments: PropTypes.any,
  pages: PropTypes.any,
  date: PropTypes.any,
  form: PropTypes.any,
  snaps: PropTypes.any,
  related: PropTypes.any
};

export default PDFTemplateProject;
