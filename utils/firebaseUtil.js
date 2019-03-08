// {
  //   "a44e81e": {
  //     "count":0,
  //     "userId":"e000001"
  //   },
  //   "d80d673":{
  //     "count":0,
  //     "userId":"e000002"
  //   }
  // }

const firebaseConfig = require('../firebaseConfig');
const firebase = require("firebase");
const stationId = process.env.station;

firebase.initializeApp(firebaseConfig);

module.exports = {
  getData: function (cardId) {
    firebase.database().ref('/cards/'+cardId).once('value').then(function(snapshot) {
      const userId = snapshot.val().userId;
      firebase.database().ref('cards/'+cardId).transaction(function(card) {
        if (card) {
          if (!card.count) {
            card.count = 1;
          } else {
            card.count++;
          }
        }
        return card;
      })

      firebase.database().ref('users/' + userId + '/yapps').push({station: stationId})
      firebase.database().ref('users/' + userId ).transaction(function(user) {
        if (user) {
          if (!user.count) {
            user.count = 1;
          } else {
            user.count++;
          }
        }
        return user;
      });
    });

    // Update dashboard
    firebase.database().ref('dashboard').transaction(function(dash) {
      if (dash) {
        if (!dash.countAll) {
          dash.countAll = 1;
        } else {
          dash.countAll++;
        }
      }
      return dash;
    });

    // Update Station
    firebase.database().ref('stations/'+stationId).transaction(function(station) {
      if (station) {
        if (!station.count) {
          station.count = 1;
        } else {
          station.count++;
        }
      }
      return station;
    });
  }
};