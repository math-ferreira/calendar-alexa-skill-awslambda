const https = require('https');
const EventDialogue = require("../models/event-dialogue").EventDialogue;
const Alexa = require('ask-sdk-core');
const CONFIG = require("../config.json").data;


async function build(requestEnvelope) {
    var dialogueObject = createDialogueObject(requestEnvelope)
    var response = await postEventRequest()
    return createResponse(dialogueObject)
}

const postEventRequest = (dialogueObject) => {
    var serviceConfig = CONFIG.calendar_alexa_service
    console.log(`Starting to create Google event called ${dialogueObject.summary} from ${serviceConfig.api_hostname}`);

    var request = createRequest(dialogueObject)

    return new Promise(resolve => {

        var options = buildOptions()

        var req = https.request(options, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            var returnData = '';
            res.on('data', function (chunk) {
                returnData = chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(returnData));
            });

        });

        req.on('error', (e) => {
            console.error(e);
        });

        req.write(dataString);
        req.end();

        console.log(`Finishing to create event called ${dialogueObject.summary} from ${serviceConfig.api_hostname} with success`);
    });
}

const createDialogueObject = (requestEnvelope) => {
    return new EventDialogue(
        Alexa.getSlotValue(requestEnvelope, 'attendees'),
        Alexa.getSlotValue(requestEnvelope, 'summary'),
        Alexa.getSlotValue(requestEnvelope, 'startDate'),
        Alexa.getSlotValue(requestEnvelope, 'startTime'),
        Alexa.getSlotValue(requestEnvelope, 'endDate'),
        Alexa.getSlotValue(requestEnvelope, 'endTime'),
        Alexa.getSlotValue(requestEnvelope, 'location'),
    )
}

const createRequest = (dialogueObject) => {

    var possibleAtteendesList = Object

    for (var possibleAtteende in CONFIG.attendees) {
        if (possibleAtteende.name == dialogueObject.attendees) {
            possibleAtteendesList = possibleAtteende
        }
        console.log(val.path);
    }

    return {
        "send_updates": true,
        "attendees": [
            {
                "display_name": possibleAtteendesList.name,
                "email": possibleAtteendesList.email,
                "is_optional": false,
                "response_status": "needsAction"
            }
        ],
        "color_id": "8",
        "event_type": "DEFAULT",
        "start_date": "2022-12-12T16:09:53-03:00",
        "end_date": "2022-12-12T18:09:53-03:00",
        "location": dialogueObject.location,
        "summary": dialogueObject.summary
    }

}

const createResponse = function (response) {

    // var summaryList = response.map(function (element) {
    //     return `${element.summary}`
    // }).join(', ')

    // return `Okay, here are your calendars from Google. Today, you have ${response.length} kind of calendars created. And here is the list of them: ${summaryList}".`

    return `Okay Matheus, your attendees is ${response.attendees} and location is ${response.location}`
};


const buildOptions = function (eventRequestBody) {
    var serviceConfig = CONFIG.calendar_alexa_service
    return {
        host: serviceConfig.api_hostname,
        port: serviceConfig.api_port,
        path: serviceConfig.create_event_path,
        method: "POST",
        json: true,
        body: eventRequestBody,
        auth: `${serviceConfig.api_username}:${serviceConfig.api_password}`,
    };
};

module.exports = {
    build
};