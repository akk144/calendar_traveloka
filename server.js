const requireDir = require('require-dir');

const restify = require('restify');
const swagger = require('node-restify-swagger');

const _ = require('lodash');
const domain = require('domain');
const responseTime = require('response-time');

const CALENDAR_DIR = __dirname;
const utils = require('./utils');

const gracefulExit = () => {
    process.exit(0);
};

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

let server = restify.createServer({
    name: "calendar",
    version: "1.0.0"
  });

server.pre(restify.pre.sanitizePath());
server.use(restify.bodyParser());

server.use(utils.loadMiddlewares([
  function (request, response, next) {
    const requestDomain = domain.create();
    requestDomain.add(request);
    requestDomain.add(response);
    requestDomain.on('error', (error) => {
      logger.fatal(error.message);
    });
    next();
  },

  function crossOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'OPTIONS POST PUT GET DELETE');
    res.header('Access-Control-Expose-Headers', 'x-total-count');
    res.charSet('UTF-8');
    return next();
  },

  restify.acceptParser(server.acceptable),

  restify.queryParser()
]));


const eRoutes = requireDir(`${CALENDAR_DIR}/routes/`, { recurse: true });
for (const eRoute in eRoutes) {
  if (eRoutes.hasOwnProperty(eRoute)) {
      eRoutes[eRoute](server);
  }
}

server.get(/^\/\/?.*/, restify.serveStatic({ directory: './swagger' }));
server.get('/', (req, res, next) => {
  res.header('Location', '/');
  res.send(302);
  return next(false);
});

swagger.configure(server, {
  info: {
    contact: 'akansh',
    description: 'REST API Documentation.',
    title: 'API Docs'
  },
  apiDescriptions: {
    get: 'GET-API Resource',
    post: 'POST-API Resource'
  }
});

swagger.loadRestifyRoutes();



server.on('uncaughtException', (req, res, route, err) => {
  try {
    res.send({
      status: 500,
      message: 'An error occured. Please try again later'
    });
  } catch (e) {

  }
  console.log('Unhandled Error', err);
});

const port = 4040;

server.listen(port, () => {
  console.log(`calendar is running at localhost:4040`);
});

module.exports = server;

