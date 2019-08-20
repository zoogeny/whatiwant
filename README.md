# What I Want

## Installation

### Project Setup

* install dependencies  
  `npm install`

* initialize the database  
  `npm run init`

### Run production

* Build the production client  
  `npm run build`  
  output will appear in `/build` directory

* Run the express server  
  `npm start`  
  application is served from: http://localhost:4000/

### Debug application

* To debug the api server  
  `npm run start:dev`  
  debug api server will run on http://localhost:4000/api

* To debug the client application (hot reloading of React app)  
  `npm run start:react`  
  debug client server will run on http://localhost:3000/

NOTE: both the api and client debug servers can be run simultaneously

### Test application

* To run interactive tests:  
  `npm test`
