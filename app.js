"use strict"

let express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    api =       express.Router()

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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
