// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const { i18n } = require('./next-i18next.config');


/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  i18n,
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: ['flagcdn.com', 'static.cardmarket.com'],
  },
};

module.exports = withNx(nextConfig);
