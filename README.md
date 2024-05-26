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
$ v14.16.1
```

If **Node** is not installed on your computer, you can follow the instructions outlined [here](https://nodejs.org/en/download/package-manager).

### Run locally
---
You'll need to run the following command in your terminal to install the necessary node packages the application depends on:
```
$ npm install
```
To run the application:
```
$ npm start
```

### Run online

This application has been cloned and is available to view on REPLIT.io for quick access and ease of use.

You can find it available at [**REPLIT repository**](https://replit.com/@barbs89/raisely-backend-test).

If you wish to test the application, I recommend using the REPLIT dev url below:
```
https://1a814ae3-193c-46d4-af50-278e8dce4d68-00-a91mzu0ipquc.janeway.replit.dev/
```

You can make POST request in your terminal by running a cURL command such as the example below.

Example POST Request:
```bash
$ curl -X POST <full-REPLIT-Dev-URL-path>/profiles/2ad19172-9683-407d-9732-8397d58ddcb2/donations -H 'Content-Type: application/json' -d '{ "donorName": "Andrew Smith", "amount": 100, "profileId": "2ad19172-9683-407d-9732-8397d58ddcb2", "currency": "AUD"}'
```

When a successful request is made, you will be able to see the updated donations in real-time in the url.