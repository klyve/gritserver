"use strict"

let express     = require('express'),
    bodyParser  = require('body-parser'),
    https       = require('https'),
    http        = require('http'),
    fs          = require('fs'),
    app         = express(),
    api         = express.Router()


let mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/challenge')
mongoose.Promise = require('bluebird') // Use a promise library for mongoose

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}))
app.use('/api/images', express.static('public'))
app.use('/stats', express.static('dashboard'))
app.use('/', express.static('public'))

app.get('/*', function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null ) {
    res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();
  }
})

require('./api/groups')(api)
require('./api/user')(api)
app.use('/api', api)

app.get('/', (req, res) => {
  res.sendfile('public/index.html', {root: __dirname })
})

app.all('*', (req,res) => {
  res.send({
    "error": "bad_request",
    "error_message": "Bad request, 404 not founds"
  })
})

if(process.env.NODE_ENV == 'development') {
  app.listen(3000, function () {
    console.log('app development mode on port 3000!')
  })
}else {
  // HTTPS Server using letsencrypt
  http.createServer(function(req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
    res.end()
  }).listen(80)

  https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/archive/gritapp.net/privkey1.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/archive/gritapp.net/fullchain1.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/archive/gritapp.net/chain1.pem")
  }, app).listen(443)
  // https.addListener("request", (req, res) => {
  //
  // });

}
