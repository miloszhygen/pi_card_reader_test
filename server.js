"use strict";
const cardReader = require('./cardReader');

cardReader.start(function(uidValue) {
  console.log('uidValue');
});
