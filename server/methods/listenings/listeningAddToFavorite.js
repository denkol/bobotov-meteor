import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningAddToFavorite(e) {
    if(Meteor.userId()) {
      var listeningId = e.listeningId;
      var state = e.state;
      var currentFavoriteList = Meteor.user().profile.favoritesList;
      if (state) { //Remove
        currentFavoriteList.splice(searchListening(currentFavoriteList, listeningId), 1);
        Meteor.users.update(Meteor.userId(), {
          $set: {
            'profile.favoritesList': currentFavoriteList
          }
        });
      } else { //Add
        currentFavoriteList.push(listeningId);
        Meteor.users.update(Meteor.userId(), {
          $set: {
            'profile.favoritesList': currentFavoriteList
          }
        });
      }

      function searchListening(arr, id) {
        var result;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === id) {
            result = i;
          }
        }
        return result;
      }
    } else {
      return false;
    }
  }
});