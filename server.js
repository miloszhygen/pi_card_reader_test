"use strict";
const cardReader = require('./cardReader');
const player = require('play-sound')({})

const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');

firebase.initializeApp(firebaseConfig);


firebase.database().ref('users/').once('value').then(function(snapshot) {
  // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  console.log(snapshot.val());
  return snapshot.val()
});


cardReader.start(function(uidValue) {
  console.log(uidValue);

  player.play('BleepBlop.aif', function(err) {
    if (err) throw err
  })
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
