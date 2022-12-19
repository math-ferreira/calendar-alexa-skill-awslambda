'use strict';
const Alexa = require('ask-sdk-core');
const { GetCalendarsIntent, HelloWorldIntentHandler, GetCalendarByIdIntent } = require('./intents/intents');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to your custom Google Calendar. What do you want?';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello User', speechText)
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    GetCalendarsIntent,
    GetCalendarByIdIntent,
    HelloWorldIntentHandler
  ).lambda();