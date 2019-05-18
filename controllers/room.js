const _ = require('lodash');
var async = require('async');
const utils = require('../utils');
let Room = require('../models/room');

exports.addRoom = function (request, response, next) {
    var data = request.params;
    const room = new Room(data);
    response.send({
      success: true,
      data: {},
      message: {message: 'Room added successfully', code: 200}
    });
    next();
};