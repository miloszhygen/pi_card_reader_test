"use strict";
const cardReader = require('./cardReader');
const play = require('audio-play');
const load = require('audio-loader');

const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');

firebase.initializeApp(firebaseConfig);


firebase.database().ref('users/').once('value').then(function(snapshot) {
  // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  console.log(snapshot.val());
  return snapshot.val()
});

let audioBuffer = null;

load('./BleepBlop.wav').then(function (arg) {
    audioBuffer = arg;
});


cardReader.start(function(uidValue) {
  console.log(uidValue);

    if (audioBuffer) {
      play(audioBuffer)
    }

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
