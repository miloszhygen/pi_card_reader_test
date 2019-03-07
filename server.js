"use strict";
const cardReader = require('./cardReader');

const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);


firebase.database().ref('users/').once('value').then(function(snapshot) {
  // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  console.log(snapshot.val());
  return snapshot.val()
});


cardReader.start(function(uidValue) {
  console.log(uidValue);
});
