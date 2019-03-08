"use strict";
const cardReader = require('./cardReader');
// let Sound = function() {};
// let music = null;
// if (process.env.NODE_ENV === 'production') {
    const Sound = require('node-aplay');
// }

const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');

firebase.initializeApp(firebaseConfig);


firebase.database().ref('users/').once('value').then(function(snapshot) {
  // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  console.log('Connected to firebase');
});

// if (process.env.NODE_ENV === 'production') {
  console.log('Set music');
  let music = new Sound('./Yapppp.wav');

  music.on('complete', function () {
    console.log('Sound has finished playing!');
  });
// }

cardReader.start(function(uidValue) {
  console.log(uidValue);
    console.log('Playing music');
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
