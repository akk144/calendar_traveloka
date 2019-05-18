const _ = require('lodash');

let employees = [];

function Employee(data) {
	_.set(data,'id',_.get(_.last(employees),'id',0) + 1);
    employees.push(data);
}

Employee.prototype.employees = function() {
    return employees;
}

module.exports = Employee;