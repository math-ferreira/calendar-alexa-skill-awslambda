"use strict";

const { GetCalendarsIntentObject } = require("./get-calendar-intent");

const CONFIG = require("../config.json").data;

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === CONFIG.intents.heelo_world;
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World!', speechText)
      .getResponse();
  }
};


const GetCalendarsIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === CONFIG.intents.get_calendars;
  },
  async handle(handlerInput) {

    var response = new GetCalendarsIntentObject().build()

    return handlerInput.responseBuilder
      .speak(response)
      .withSimpleCard('Hello!', result)
      .getResponse();
  }
};

var buildOptions = function (path, method) {
  var serviceConfig = CONFIG.calendar_alexa_service
  return options = {
    host: serviceConfig.api_hostname,
    port: serviceConfig.api_port,
    path: path,
    method: method,
    auth: `${serviceConfig.api_username}:${serviceConfig.api_password}`,
  };
}

module.exports = {
  buildOptions,
  HelloWorldIntentHandler,
  GetCalendarsIntent
};