const Alexa = require('alexa-sdk');
const snacks = require('./snacks.js');

const APP_ID = undefined;

const SKILL_NAME = 'Snack suggestion';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.response.cardRenderer("Suggestion", "Yummy or healthy?");
        this.emit(':ask', "Yummy or healthy?", "What kind of snack do you want? You can respond with yummy or healthy.");
    },
    'StartIntent': function () {
        this.response.speak("What kind of snack do you want? Yummy or Healthy?");
        this.emit(':responseReady');
    },
    'YummySnackIntent': function () {
        var snack = snacks.yummy[Math.floor(Math.random() * snacks.yummy.length)];
        const speechOutput = snack.speech;

        this.response.speak(speechOutput);
        this.response.cardRenderer("Suggestion", snack.name);
        this.emit(':responseReady');
    },
    'HealthySnackIntent': function () {
        var snack = snacks.healthy[Math.floor(Math.random() * snacks.healthy.length)];
        const speechOutput = snack.speech;

        this.response.cardRenderer(SKILL_NAME, snack.name);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = "I can give you good snack suggestions.";
        const reprompt = "To start, ask me to open snack suggestion.";

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.SessionEndedRequest': function(){
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'Unhandled': function(){
    
                this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    }
    
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
