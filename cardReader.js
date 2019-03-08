"use strict";
let interval = null;
const cardArray = ['a44e81e', 'd80d673'];

if (process.env.NODE_ENV === 'production') {
  const _ = require("underscore");
  const mfrc522 = require("/usr/lib/node_modules/mfrc522-rpi/index.js");

  //# Init WiringPi with SPI Channel 0
  mfrc522.initWiringPi(0);

  const addToCount = _.debounce(function (callback) {
    callback();
  }, 1000, true);

  module.exports = {
    start: function (callback) {
      console.log('Listening for cards...');
      interval = setInterval(function(){
          //# reset card
          mfrc522.reset();
          let response = mfrc522.findCard();

          //# Get the UID of the card
          response = mfrc522.getUid();
          if (!response.status) {
              return;
          }

          const uid = response.data;
          const uidValue = uid[0].toString(16) + uid[1].toString(16) + uid[2].toString(16) + uid[3].toString(16);

          if (cardArray.indexOf(uidValue) >= 0) {
            addToCount(function () {
              callback(uidValue);
            })
          }
          //# Stop
          mfrc522.stopCrypto();
      }, 500);
    },
    stop: function () {
      clearInterval(interval);
    }
  }
} else {
  module.exports = {
    start: function (callback) {
      console.log('Running fake card readings ...');
      interval = setInterval(function() {
        const randomCardArrayIndex = Math.floor(Math.random()*cardArray.length);
          callback(cardArray[randomCardArrayIndex]);
      }, 5000);
    },
    stop: function () {
      clearInterval(interval);
    }
  }
}
