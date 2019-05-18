const restify = require('restify');

const Room = require('../controllers/room');

function RoomRoutes(api) {
  api.post({
    url: '/rooms',
    swagger: {},
    validation: {},
  }, Room.addRoom);
}

module.exports = RoomRoutes;
