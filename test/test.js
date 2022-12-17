// include the testing framework
const alexaTest = require('alexa-skill-test-framework');
// initialize the testing framework
alexaTest.initialize(
    require('../index.js'),
    "amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
    "amzn1.ask.account.VOID");

describe("Hello World Skill", function () {
    // tests the behavior of the skill's LaunchRequest  
    describe("LaunchRequest", function () {
        alexaTest.test([
            {
                request: alexaTest.getLaunchRequest(),
                says: "Welcome to the Alexa Skills Kit, you can say hello?",
                repromptsNothing: false,
                shouldEndSession: false
            }
        ]);
    });

});

//tests the behavior of the Skill's HelloWorldIntent

describe("HelloWorldIntent", function () {

    alexaTest.test([

        {
            request: alexaTest.getIntentRequest("HelloWorldIntent"),
            says: "Hello World!", repromptsNothing: true, shouldEndSession: true,
        }
    ]);
});
    