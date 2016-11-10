"use strict"

let bluebird  = require('bluebird')

function Group(){
  this.id = 0;
  this.name = "";
  this.picturePath = "";
  this.description = "";
  this.unread = 0;
}

// Testdata
var ntnu = new Group();
  ntnu.id = 0;
  ntnu.name = "NTNU";
  ntnu.picturePath = "https://pbs.twimg.com/profile_images/661115078964412416/T9t1CC_W.png";
  ntnu.description = "Offentlig gruppe for NTNU! :)";
  ntnu.unread = 3;

var gjovik = new Group();
  gjovik.id = 1;
  gjovik.name = "Gjøvik";
  gjovik.picturePath = "http://pilegrimsleden.no/uploads/made/uploads/images/Om/POI/Kommunevaapen/390px-Gjoevik_komm.svg_600_738_s.png";
  gjovik.description = "Vi utfordrer Gjøvik!";
  gjovik.unread = 23;

var polse = new Group();
  polse.id = 1;
  polse.name = "Pølsefest";
  polse.picturePath = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Reunion_sausages_dsc07796.jpg/220px-Reunion_sausages_dsc07796.jpg";
  polse.description = "Jeg liker milfs...";
  polse.unread = 143;

var groups = [ntnu, gjovik, polse];

module.exports = (api) => {

  api.route('/groups')
    .get((req, res) => {
      res.send({
        groups
      })
    })


}
