const _ = require('lodash');

let rooms = [];

function Room(data) {
	_.set(data,'id',_.get(_.last(rooms),'id',0) + 1);
    rooms.push(data);
}

Room.prototype.rooms = function() {
    return rooms;
}

module.exports = Room;