"use strict"

let express     = require('express'),
    bodyParser  = require('body-parser'),
    https       = require('https'),
    http        = require('http'),
    app         = express(),
    api         = express.Router()

let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/challenge')
// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./api/groups')(api);
require('./api/user')(api);
// Enable the api
app.use('/api', api)

app.all('*', (req,res) => {
  res.send({
    "error": "bad_request",
    "error_message": "Bad request, 404 not found"
  })
})


http.createServer(function(req, res) {
  res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
  res.end();
}).listen(80);

https.createServer({
  key: fs.readFileSync("/etc/letsencrypt/archive/bjartelarsen.com/privkey1.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/archive/bjartelarsen.com/fullchain1.pem"),
  ca: fs.readFileSync("/etc/letsencrypt/archive/bjartelarsen.com/chain1.pem")
}, app).listen(443);
