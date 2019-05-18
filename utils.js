const async = require('async');
const _ = require('lodash');
const errors = require('restify-errors');


exports.loadMiddlewares = function (middlewares) {
  const func = function (request, response, next) {
    const iterator = function (middleware, callback) {
      middleware(request, response, callback);
    };
    async.each(middlewares, iterator, next);
  };
  return func;
};

exports.debugTrace = function (error) {
  const obj = {};
  if (_.isString(error)) {
    obj.code = 500;
    obj.message = error;
    obj.display = '';
    obj.status = 500;
  } else {
    obj.code = error.code;
    obj.message = error.message;
    obj.display = !_.isEmpty(error.display) ? error.display : error.message;
    obj.stack = error.stack;
    obj.status = 500;
  }
  return new errors.InternalServerError(obj);
};