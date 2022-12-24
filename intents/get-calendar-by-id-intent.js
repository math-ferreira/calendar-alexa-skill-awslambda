const https = require('https');
const CONFIG = require("../config.json").data;

async function build(calendarId) {
    calendarId = (calendarId == "principal") ? CONFIG.calendars.principal : calendarId
    var response = await getCalendarRequest(calendarId)
    return createResponse(response)
}

const getCalendarRequest = (calendarId) => {
    var serviceConfig = CONFIG.calendar_alexa_service
    console.log(`Starting to get calendar by id from ${serviceConfig.api_hostname} with calendar id: ${calendarId}`);

    return new Promise(resolve => {

        var options = buildOptions(calendarId)

        const request = https.request(options, function (response) {

            response.setEncoding('utf8');

            var returnData = '';
            response.on('data', function (chunk) {
                returnData = chunk;
            });

            response.on('end', () => {
                resolve(JSON.parse(returnData));
            });
        });

        console.log(`Finishing to get calendar by id with success from ${serviceConfig.api_hostname}`);

        request.end();
    });
}

const createResponse = function (response) {
    var calendarDetails = ""
    if (response.summary == undefined) {
        calendarDetails = "There is no calendar with this name, please make sure you are correct and try again."
    } else {
        calendarDetails = `Here is the some details of your calendar. Summary: ${response.summary} and time zone: ${response.time_zone}`
    }

    return calendarDetails
};

const buildOptions = function (calendarId) {
    var serviceConfig = CONFIG.calendar_alexa_service
    return {
        host: serviceConfig.api_hostname,
        port: serviceConfig.api_port,
        path: `${serviceConfig.get_calendar_by_id_path}?calendarId=${calendarId}`,
        method: "GET",
        auth: `${serviceConfig.api_username}:${serviceConfig.api_password}`,
    };
};

module.exports = {
    build
};