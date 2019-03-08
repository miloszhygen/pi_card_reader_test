"use strict";
const cardReader = require('./cardReader');
const Sound = require('node-aplay');
const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');

firebase.initializeApp(firebaseConfig);

firebase.database().ref('users/').once('value').then(function(snapshot) {
  console.log('Connected to firebase');
});

let music = new Sound('./BleepBlop.wav');

music.on('complete', function () {
  console.log('Sound has finished playing!');
});

cardReader.start(function(uidValue) {
  console.log(uidValue);
  music.play();
  firebase.database().ref('users/'+uidValue).transaction(function(post) {
   if (post) {
     if (!post.count) {
       post.count = 1;
     } else {
       post.count++;
     }
   }
   return post;
  });
});
