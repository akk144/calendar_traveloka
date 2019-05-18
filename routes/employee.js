const restify = require('restify');

const Employee = require('../controllers/employee');

function EmployeeRoutes(api) {
  api.post({
    url: '/employees',
    swagger: {},
    validation: {},
  }, Employee.addEmployee);

  api.get({
    url: '/employees/:employee_id/meetings',
    swagger: {},
    validation: {},
  }, Employee.getMeetings);
}

module.exports = EmployeeRoutes;
