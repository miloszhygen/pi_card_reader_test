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

  firebase.database().runTransaction(t => {
    return t.get('users/'+uidValue)
      .then(doc => {
        // Add one person to the city population
        var newPopulation = doc.data().population + 1;
        t.update(firebase.database().collection('users/'+uidValue), {population: 'newPopulation'});
      });
  }).then(result => {
    console.log('Transaction success!');
  }).catch(err => {
    console.log('Transaction failure:', err);
  });

});
