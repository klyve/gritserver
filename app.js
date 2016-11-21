"use strict"                                               // Use strict: ECMA script 6 http://www.w3schools.com/js/js_strict.asp

let express     = require('express'),                      // Node web framework from http://expressjs.com
    bodyParser  = require('body-parser'),                  // Parse incoming request bodies in a middleware before your handlers.  https://github.com/expressjs/body-parser
    https       = require('https'),                        // HTTPS module from https://nodejs.org/api/https.html
    http        = require('http'),                         // HTTP  module from https://nodejs.org/api/http.html
    fs          = require('fs'),                           // File I/O     from https://nodejs.org/api/fs.html
    app         = express(),                               // Init app. Demo: app.get('/', function(req, res) {   })
    api         = express.Router()                         // Confusing object that can do the same as app in some instances.
                                                           //   Can only perform middleware and routing functions

let mongoose = require('mongoose')                         // mongoDB library form http://mongoosejs.com
mongoose.connect('mongodb://127.0.0.1:27017/challenge')    // Connecting to localhost database

app.use(bodyParser.urlencoded({ extended: false }))        // Middleware, parses https requests get/POST, so that they arrive as objects.
app.use(bodyParser.json())                                 // Middleware, does the same for JSON requests. No parsing needed in code.

require('./api/groups')(api);                         // require group and user module
require('./api/user')(api);                           // and puts them in api ????
app.use('/api', api)                                  // Enable the api

app.all('*', (req,res) => {                           // Sets up an error message for all routes in domain which is not handled. Catch all.
  res.send({                                          // Req = request object which contains payload from client
    "error": "bad_request",                           // Res = result object that is sent back to client
    "error_message": "Bad request, 404 not found"
  })
})

app.listen(80, function () {
  console.log('app listening on port 80!')
})

// http.createServer(function(req, res) {
//   res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
//   res.end();
// }).listen(80);
//
// https.createServer({
//   key: fs.readFileSync("/etc/letsencrypt/archive/bjartelarsen.com/privkey1.pem"),
//   cert: fs.readFileSync("/etc/letsencrypt/archive/bjartelarsen.com/fullchain1.pem"),
//   ca: fs.readFileSync("/etc/letsencrypt/archive/bjartelarsen.com/chain1.pem")
// }, app).listen(443);
