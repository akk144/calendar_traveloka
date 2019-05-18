const _ = require('lodash');

let meetings = [];

function Meeting(data) {
	_.set(data,'id',_.get(_.last(meetings),'id',0) + 1);
    meetings.push(data);
}

Meeting.prototype.meetings = function() {
    return meetings;
}

module.exports = Meeting;