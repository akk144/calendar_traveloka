const _ = require('lodash');
var async = require('async');
const utils = require('../utils');
let Meeting = require('../models/meeting');

exports.addMeeting = function (request, response, next) {
    var data = request.params;
    const meeting = new Meeting(data);
    response.send({
      success: true,
      data: {},
      message: {message: 'Meeting added successfully', code: 200}
    });
    next();
};