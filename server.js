// "use strict";
const _ = require("underscore");
const mfrc522 = require("./node_modules/mfrc522-rpi/index.js");

const cardArray = ['a44e81e', 'd80d673'];
let COUNT = 0;

//# Init WiringPi with SPI Channel 0
mfrc522.initWiringPi(0);
console.log('READY!');
// addToCount()
//# This loop keeps checking for chips. If one is near it will get the UID and authenticate
// console.log("scanning...");
// console.log("Please put chip or keycard in the antenna inductive zone!");
// console.log("Press Ctrl-C to stop.");

setInterval(function(){

    //# reset card
    mfrc522.reset();

    //# Scan for cards
    let response = mfrc522.findCard();
    if (!response.status) {
        // console.log("No Card");
        return;
    }
    // console.log("Card detected, CardType: " + response.bitSize);

    //# Get the UID of the card
    response = mfrc522.getUid();
    if (!response.status) {
        console.log("UID Scan Error");
        return;
    }
    //# If we have the UID, continue
    const uid = response.data;
    // console.log("Card read UID: %s %s %s %s", uid[0].toString(16), uid[1].toString(16), uid[2].toString(16), uid[3].toString(16));
    // console.log('UID');
    // console.log(uid+ '\n');
    const uidValue = uid[0].toString(16) + uid[1].toString(16) + uid[2].toString(16) + uid[3].toString(16);

    // console.log(cardArray.indexOf(uidValue));

    if (cardArray.indexOf(uidValue) >= 0) {
      console.log(uidValue);
      // addToCount()
      countTest()

      // count++
      // debounce(addToCount, 1100, {leading:true} )
      // throttle(function(){ return count++} , 500)

    }




    // //# Select the scanned card
    // const memoryCapacity = mfrc522.selectCard(uid);
    // console.log("Card Memory Capacity: " + memoryCapacity);

    // //# This is the default key for authentication
    // const key = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF];

    // //# Authenticate on Block 8 with key and uid
    // if (!mfrc522.authenticate(8, key, uid)) {
    //     console.log("Authentication Error");
    //     return;
    // }

    // //# Dump Block 8
    // console.log("Block: 8 Data: " + mfrc522.getDataForBlock(8));

    //# Stop
    mfrc522.stopCrypto();

    // console.log(count);


}, 500);

const countTest = _.debounce(function () {
  COUNT++
  console.log('debounce');
  console.log(COUNT);
}, 1000, true);


// function addToCount() {
  // _.debounce(run(), 100, true )

// }



// const throttle = (func, limit) => {
//   let inThrottle
//   return function() {
//     const args = arguments
//     const context = this
//     if (!inThrottle) {
//       func.apply(context, args)
//       inThrottle = true
//       setTimeout(() => inThrottle = false, limit)
//     }
//   }
//  }