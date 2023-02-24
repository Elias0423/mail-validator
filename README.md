
## Description

  

API for User Validator

  

## Requirements

The database model is in the file validator.sql

The following environment variables must be defined for the application to work correctly

  

```bash

PORT			--> Port on which the app will run, by default 3000
DB_HOST			--> Url where the database is hosted
DB_USER			--> Database user´s name
DB_PASS			--> Database user´s password
DB_NAME			--> Database name
MAILER_HOST		--> SMTP HOST FOR SEND MAILS
MAILER_USER		--> SMTP USER FOR SEND MAILS
MAILER_PASS		--> SMTP USER PASSWORD FOR SEND MAILS
JWT_KEY			--> KEY TO GENERATE TOKEN
BUSSINES_MAIL	--> MAIL WHERE THE INFORMATION REPORTS WILL BE DELIVERED

```

  

## Installation

  

  

```bash

  

$ npm install

  

```

  

  

## Running the app

  

  

```bash

  

# development

  

$ npm run dev

  

  

# production mode

  

$ npm run build

$ npm run start

  

```