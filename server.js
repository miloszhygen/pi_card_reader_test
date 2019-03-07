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



  // function toggleStar(postRef, uid) {
    firebase.database().ref('users/'+uidValue).transaction(function(post) {
     if (post) {
       if (!post.count) {
         post.count = 1;
        //  post.stars[uid] = null;
       } else {
         post.count++;
        //  if (!post.stars) {
        //    post.stars = {};
        //  }
        //  post.stars[uid] = true;
       }
     }
     return post;
   });
  // }





});
