"use strict";
const cardReader = require('./cardReader');
const Sound = process.env.NODE_ENV === 'production' ? require('node-aplay') : function() {this.play = function () {}} ;
const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');
const stationId = process.env.station;

if (!stationId) {
  console.log('ERROR: No station ID provided');
  return;
} else {
  console.log('Initation station:', stationId);
}

firebase.initializeApp(firebaseConfig);

firebase.database().ref('users/').once('value').then(function(snapshot) {
  console.log('Connected to firebase');
});

let music = new Sound('./YappShort.wav');

cardReader.start(function(uidValue) {
  console.log(uidValue);
  music.play();
  /*firebase.database().ref('users/'+uidValue).transaction(function(post) {
   if (post) {
     if (!post.count) {
       post.count = 1;
     } else {
       post.count++;
     }
   }
   return post;
 });*/
});
