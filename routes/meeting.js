const restify = require('restify');

const Meeting = require('../controllers/meeting');

function MeetingRoutes(api) {
  api.post({
    url: '/meetings',
    swagger: {},
    validation: {},
  }, Meeting.addMeeting);
}

module.exports = MeetingRoutes;
