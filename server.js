"use strict";
const cardReader = require('./cardReader');

const firebase = require("firebase");
const firebaseConfig = require('./firebaseConfig');

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

cardReader.start(function(uidValue) {
  console.log(uidValue);
});
