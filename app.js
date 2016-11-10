"use strict"

let express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    api =       express.Router()













require('./api/user.js')(api);
require('./api/groups.js')(api);





// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())









// Some default html shit
app.get('/', (req, res) => {
  res.send("HELLO WORLD")
})
// Some default html shit
app.get('/test', (req, res) => {
  res.send('Hello Get random number: ' + Math.floor(Math.random() * 1000));
})



app.get('/api', (req, res) => {
  res.send("HELLO API!")
})





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
