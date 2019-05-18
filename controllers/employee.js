var _ = require('lodash');
var async = require('async');
const utils = require('../utils');
const Employee = require('../models/employee');
const Meeting = require('../models/meeting');


exports.addEmployee = function (request, response, next) {
    var data = request.params;
     if(_.isEmpty(data.name)) return next('Please enter employee name');
    const employee = new Employee(data);
    response.send({
      success: true,
      data: {},
      message: {message: 'Employee added successfully', code: 200}
    });
    next();
};

exports.getMeetings = function (request, response, next) {
    var data = request.params;
    const employee_id = _.get(data,'employee_id');
    if(_.isEmpty(data.employee_id)) return next('Please enter employee id');
    const meetings = Meeting.prototype.meetings();
    const employee_meetings = _.filter(meetings,meeting => 
    	(_.findIndex(meeting.employees,function(employee) { return employee === _.toNumber(employee_id) })+1)
    );
    response.send({
      success: true,
      data: employee_meetings,
      message: {message: 'Employee meetings retrieved successfully', code: 200}
    });
    next();
};