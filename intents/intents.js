"use strict";

const { build: buildGetCalendars } = require("./get-calendars-intent");
const { build: buildGetCalendarById } = require("./get-calendar-by-id-intent");
const { build: buildCreateEvent } = require("./create-event-intent");
const CONFIG = require("../config.json").data;
const Alexa = require('ask-sdk-core');

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === CONFIG.intents.hello_world;
  },
  handle(handlerInput) {

    const name = Alexa.getSlotValue(handlerInput.requestEnvelope, 'name')
    const speechText = name ? `Hello ${name}, nice to meet you!` : "Hello world!";

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

    var result = await buildGetCalendars()

    return handlerInput.responseBuilder
      .speak(result)
      .withSimpleCard('Hello!', result)
      .getResponse();
  }
};

const GetCalendarByIdIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === CONFIG.intents.get_calendar_by_id;
  },
  async handle(handlerInput) {
    
    const calendarId = Alexa.getSlotValue(handlerInput.requestEnvelope, 'calendarId')
    const result = await buildGetCalendarById(calendarId)
    
    return handlerInput.responseBuilder
      .speak(result)
      .withSimpleCard('Hello!', result)
      .getResponse();
  }
};


const CreateEventIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' && handlerInput.requestEnvelope.request.intent.name === CONFIG.intents.create_event;
  },
 async handle(handlerInput) {
      const {requestEnvelope, responseBuilder} = handlerInput;
      
      let speakOutput = await buildCreateEvent(requestEnvelope)
      console.log('TESTSTSTSTSTSTSTTSTSTTSS  1111111111111')
      console.log(speakOutput)
      console.log('TESTSTSTSTSTSTSTTSTSTT    22222222222222')

      return handlerInput.responseBuilder
          .speak(speakOutput)
          .getResponse();
  }
};




module.exports = {
  HelloWorldIntentHandler,
  GetCalendarsIntent,
  GetCalendarByIdIntent,
  CreateEventIntent
};