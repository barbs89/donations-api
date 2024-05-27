# Raisely Technical Assessment - Backend Engineer

## Overview
A simplified version of the Raisely API for managing profiles and donations.

## Instructions
---
### Requirements
---
Before the application can be run, ensure **Node.js** has been installed on your computer by running the following command on your terminal:
```
$ node -v
```
*Output example:*
```
$ v20.13.1
```

If **Node** is not installed on your computer, you can follow the instructions outlined [here](https://nodejs.org/en/download/package-manager).

## Run application locally
---
To run the application locally, you will need to clone the repository from GitHub onto your computer to run the application.

Follow the steps below to get the application up and running.
1. On your terminal, enter the following command to clone the repository:

```
$ git clone https://github.com/barbs89/raisely-backend-test.git
```
2. Next, install the necessary node packages the application depends on:
```
$ npm install
```
3. Start the server locally
```
$ npm start
```
3. Visit `http://localhost:8080` on your browser.
```
[nodemon] 3.1.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server/index.js`
Raisely example app listening at http://localhost:8080
...
```
### Testing
---
This application uses the [Jest](https://jestjs.io/docs/getting-started) testing framework. It contains three test files, `index.test.js`, `profiles.test.js` and `donations.test.js`. 

Each test serves a different purpose that contributes to the overall quality, maintainability, and scalability of the application.

To begin testing, run the following command on your terminal:
```
$ npm test
```
If you wish to test specific files, such as `index.test.js`, you can pass one positional argument:
```
$ npm test index.test.js 
```
*Output example:*
```
> raisely-backend-test@1.0.0 test
> jest tests/index.test.js --no-cache  --forceExit && jest tests/profiles.test.js --no-cache  --forceExit && jest tests/donations.test.js --no-cache  --forceExit index.test.js

  console.log
    Raisely example app listening at http://localhost:8080

      at Server.log (server/index.js:110:10)

 PASS  tests/index.test.js
  Routes
    GET /
      ✓ server is running on correct port (1 ms)
    GET /profiles
      ✓ should return profiles  (1034 ms)
    GET /profiles/:id
      ✓ should return a single profile  (5 ms)
    GET /profiles/:id/donations
      ✓ should return a single profile's donations (1007 ms)
    POST /profiles/:id/donations
      ✓ should create a new donation and respond with status 201 and the updated donations list (29 ms)
      ✓ should respond with status 400 if the donation is invalid (3 ms)
    POST /donations
      ✓ should create a new donation and respond with status 201 and the updated donations list (4 ms)
      ✓ should respond with status 400 if the donation is invalid (2 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        2.392 s
Ran all test suites matching /tests\/index.test.js/i.
Force exiting Jest: Have you considered using `--detectOpenHandles` to detect async operations that kept running after all tests finished?

```
### Making POST requests
---
You can make `POST` request in your terminal by running a [cURL](https://curl.se/docs/) command such as the example below.

Example `POST` Request to local environment:

```bash
$ curl -X POST http://localhost:8080/profiles/<profileId>/donations -H 'Content-Type: application/json' -d '{ "donorName": "Andrew Smith", "amount": 100, "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2", "currency": "AUD"}'
```

When a successful request is made, you will be able to see the donations made in the `/donations` end point when a page is refreshed.

## Run application online
---
This repository has been cloned and added to a software development & deployment platform - REPLIT. This   and is available to view on [**REPLIT.io**](https://replit.com) for quick access and ease of use.

You can find the repository at [**@barbs89/raisely-backend-test**](https://replit.com/@barbs89/raisely-backend-test).

If you wish to test the application, I recommend using the **REPLIT Dev url** below:
```
https://1a814ae3-193c-46d4-af50-278e8dce4d68-00-a91mzu0ipquc.janeway.replit.dev/
```

### Making POST requests
---
You can also make `POST` request to the REPLIT Dev URL; just replace the localhost url with the dev url.

Example `POST` Request to REPLIT Dev URL:
```bash
$ curl -X POST <full-REPLIT-Dev-URL-path>/profiles/<profileId>/donations -H 'Content-Type: application/json' -d '{ "donorName": "Andrew Smith", "amount": 100, "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2", "currency": "AUD"}'
```