Org Calendar Application

Pre-requisuite

 - Install all depedencies - npm install
 - Run server - npm run start

REST API for Features:

{{base_url}}/employees -> It add employee

Sample:
{
    "name" : "akansh"
}

{{base_url}}/meetings -> Create meeting invite

Sample:
{
    "start_time" : 2,
    "end_time" : 4,
    "employees" : [2,4],
    "room" : 1
}

{{base_url}}/employees/employee:id/meetings -> List all meetings for an employee



{{base_url}}/rooms -> It add rooms

Sample:
{
    "floor" : "2"
}