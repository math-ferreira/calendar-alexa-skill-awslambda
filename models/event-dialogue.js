class EventDialogue {
    attendees;
    summary;
    startDate;
    startTime;
    endDate;
    endTime;
    location;

    constructor(attendees, summary, startDate, startTime, endDate, endTime, location) {
        this.attendees = attendees
        this.summary = summary
        this.startDate = startDate
        this.startTime = startTime
        this.endDate = endDate
        this.endTime = endTime
        this.location = location
    }

};

module.exports = {
    EventDialogue
};