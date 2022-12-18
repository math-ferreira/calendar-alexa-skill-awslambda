"use strict";

const Alexa = require('ask-sdk-core');
const { GET } = require("../constants");
const CONFIG = require("../config.json").data;
const https = require('https');
const buildOptions = require("./intents");

var GetCalendarsIntentObject = function () {

    this.build = async function () {
        var response = await getCalendarsRequest()
        return createResponse(response)
    }


    var getCalendarsRequest = function () {

        var serviceConfig = CONFIG.calendar_alexa_service
        console.log(`Starting to get calendars from ${serviceConfig.api_hostname}`);

        return new Promise(resolve => {

            var options = buildOptions(
                serviceConfig.get_calendars_path,
                GET,
            )

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

            request.end();

            console.log(`Finishing to get calendars with success from ${serviceConfig.api_hostname}, status ${response.statusCode}`);
        });

    };


    var createResponse = function (response) {

        var summaryList = response.map(function (element) {
            return `${element.summary}`
        }).join(', ')

        return `Okay, here are your calendars from Google. Today, you have ${response.length} kind of calendars created. And here is the list of them: ${summaryList}".`
    };

}

module.exports = {
    GetCalendarsIntentObject
}