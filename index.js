const express = require('express');
const timeout = require('connect-timeout');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./bin/configs/config');
const fileUpload = require('express-fileupload');

let server = express();
let create;
let start;

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next();
};

create = function() {
  let routes = require('./bin/routes');

  const corsOption = {
    maxAge: 5,
    allowedHeaders: ['Authorization'],
    exposedHeaders: ['Authorization']
  };

  // Server settings
  server.set('env', config.env);
  server.set('port', config.port);
  server.set('hostname', config.hostname);

  // Returns middleware that parses json
  server.use(timeout('30s'));
  server.use(morgan('dev'));
  server.use(fileUpload());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  server.use(haltOnTimedout);
  server.options('*', cors());
  server.use(cors(corsOption));
  server.use(compression());
  server.use('/file/upload', express.static('./bin/assets/file'))

  // Set up routes
  routes.init(server);
};

start = function() {
  console.log(server.get('hostName'));
  let hostname = server.get('hostname');
  let port = server.get('port');

  server.listen(port, () => {
    console.log('Initiate App, server-listen on port ' + port);
  });
};

create();
start();
