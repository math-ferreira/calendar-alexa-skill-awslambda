const https = require('https');
const CONFIG = require("../config.json").data;

async function build() {
    var response = await getCalendarsRequest()
    return createResponse(response)
}

const getCalendarsRequest = () => {
    var serviceConfig = CONFIG.calendar_alexa_service
    console.log(`Starting to get calendars from ${serviceConfig.api_hostname}`);

    return new Promise(resolve => {

        var options = buildOptions()

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

        console.log(`Finishing to get calendars with success from ${serviceConfig.api_hostname}`);

        request.end();
    });
}

const createResponse = function (response) {

    var summaryList = response.map(function (element) {
        return `${element.summary}`
    }).join(', ')

    return `Okay, here are your calendars from Google. Today, you have ${response.length} kind of calendars created. And here is the list of them: ${summaryList}".`
};


const buildOptions = function () {
    var serviceConfig = CONFIG.calendar_alexa_service
    return {
        host: serviceConfig.api_hostname,
        port: serviceConfig.api_port,
        path: serviceConfig.get_calendars_path,
        method: "GET",
        auth: `${serviceConfig.api_username}:${serviceConfig.api_password}`,
    };
};

module.exports = {
    build
};