# Calendar Alexa Skill using Node.js and AWS Lambda
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

---

## Overview

This project aims to create a custom Alexa skill that integrates with a backend developed using Quarkus. The backend facilitates access to Google Calendar, allowing users to interact with their calendars through Alexa voice commands.

## Repository Links

- **Quarkus Backend**: [https://github.com/math-ferreira/calendar-alexa-quarkus](https://github.com/math-ferreira/calendar-alexa-quarkus)
- **AWS Lambda Integration**: [https://github.com/math-ferreira/calendar-alexa-skill-awslambda](https://github.com/math-ferreira/calendar-alexa-skill-awslambda)

## Features

- **Alexa Skill Development**: Learn how to code an Alexa skill using AWS Lambda and serverless functions in Node.js.
  
- **Quarkus Backend Integration**: Understand the necessary configurations and code to integrate the Alexa skill with a Quarkus backend for accessing Google Calendar.

## Getting Started

### Alexa Skill Development

1. Clone the repository: `git clone https://github.com/math-ferreira/calendar-alexa-skill-awslambda.git`
2. Navigate to the project directory: `cd calendar-alexa-skill-awslambda`
3. Follow the instructions in the `README.md` file to set up and deploy your Alexa skill using AWS Lambda and Node.js.

### Quarkus Backend Integration

1. Clone the Quarkus backend repository: `git clone https://github.com/math-ferreira/calendar-alexa-quarkus.git`
2. Navigate to the backend project directory: `cd calendar-alexa-quarkus`
3. Review the documentation to configure and deploy the Quarkus backend for Google Calendar integration.

## Contributing

If you'd like to contribute to this project, please follow the [contribution guidelines](CONTRIBUTING.md).

### Skill Architecture
Each skill consists of two basic parts, a front end and a back end.
The front end is the voice interface, or VUI.
The voice interface is configured through the voice interaction model.
The back end is where the logic of your skill resides.

### Three Options for Skill Setup
There are a number of different ways for you to setup your skill, depending on your experience and what tools you have available.

 * If this is your first skill, choose the [Alexa-Hosted backend instructions](./instructions/setup-vui-alexa-hosted.md) to get started quickly.
 * If you want to manage the backend resources in your own AWS account, you can follow the [AWS-Hosted instructions](./instructions/setup-vui-aws-hosted.md).
 * Developers with the ASK Command Line Interface configured may follow the [ASK CLI instructions](./instructions/cli.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
