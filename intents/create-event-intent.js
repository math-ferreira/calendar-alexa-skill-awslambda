const https = require('https');
const EventDialogue = require("../models/event-dialogue").EventDialogue;
const Alexa = require('ask-sdk-core');
const CONFIG = require("../config.json").data;


async function build(requestEnvelope) {
    var dialogueObject = createDialogueObject(requestEnvelope)
    var response = await postEventRequest(dialogueObject)
    return createResponse(response)
}

const postEventRequest = (dialogueObject) => {
    var serviceConfig = CONFIG.calendar_alexa_service
    console.log(`Starting to create Google event called ${dialogueObject.summary} from ${serviceConfig.api_hostname}`);

    var eventRequestBody = createRequest(dialogueObject)
    const dataString = JSON.stringify(eventRequestBody)

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
    for (var i in CONFIG.attendees) {
        if (CONFIG.attendees[i].name == dialogueObject.attendees) {
            possibleAtteendesList = CONFIG.attendees[i]
        }
    }

    if (possibleAtteendesList != Object) {
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
            "description": "",
            "event_type": "DEFAULT",
            "start_date": createDateTime(dialogueObject.startDate, dialogueObject.startTime),
            "end_date": createDateTime(dialogueObject.endDate, dialogueObject.endTime),
            "location": dialogueObject.location,
            "summary": dialogueObject.summary
        }
    } else {
        return {
            "send_updates": true,
            "attendees": [],
            "color_id": "8",
            "description": "",
            "event_type": "DEFAULT",
            "start_date": createDateTime(dialogueObject.startDate, dialogueObject.startTime),
            "end_date": createDateTime(dialogueObject.endDate, dialogueObject.endTime),
            "location": dialogueObject.location,
            "summary": dialogueObject.summary
        }
    }

}

const createDateTime = (date, time) => {
    return `${date}T${time}:00-03:00`
}

const createResponse = async function (response) {

    var speakOut = `Great, All right. I created the event called ${response.summary} to ${response.start_event.date}`

    if (response.attendees != null) {
        speakOut += ` and I sent to your ${response.attendees[0].display_name}`
    }

    return speakOut
};


const buildOptions = function () {
    var serviceConfig = CONFIG.calendar_alexa_service
    return {
        host: serviceConfig.api_hostname,
        port: serviceConfig.api_port,
        path: `${serviceConfig.create_event_path}/${CONFIG.calendars.principal}`,
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        auth: `${serviceConfig.api_username}:${serviceConfig.api_password}`,
    };
};

module.exports = {
    build
};