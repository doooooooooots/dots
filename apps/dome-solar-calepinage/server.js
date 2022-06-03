//REF: https://dev.to/nightbr/local-https-for-nestjs-app-api-in-nx-workspace-54n2

const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: path.join(__dirname),
});
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, './certs/local-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, './certs/local-cert.pem')),
};

module.exports = (app) => {
  app.prepare().then(() => {
    createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log('ready - started server on url: https://localhost:' + port);
    });
  });
};
