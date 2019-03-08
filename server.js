"use strict";
const cardReader = require('./cardReader');
const fire =require('./utils/firebaseUtil');
const Sound = process.env.NODE_ENV === 'production' ? require('node-aplay') : function() {this.play = function () {}} ;
const stationId = process.env.station;

if (!stationId) {
  console.log('ERROR: No station ID provided');
  return;
} else {
  console.log('Initation station:', stationId);
}
let music = new Sound('./YappShort.wav');

cardReader.start(function(uidValue) {
  console.log(uidValue);
  music.play();

  fire.getData(uidValue)

});
