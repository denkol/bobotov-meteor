import { Listenings } from '../../../imports/api/listenings.js';

function addToFavorites() {
  
}

function removeFromFavorites() {

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

Meteor.methods({
  listeningAddToFavorite(e) {
    if(Meteor.userId()) {
      var listeningId = e.listeningId;
      var state = e.state;
      var currentFavoriteList = Meteor.user().profile.favoritesList;
      
      var listening = Listenings.find({_id: listeningId}).fetch()[0];
      var currentFavoritesCount = listening.listeningTech.favoritesCount;


      if (state) { //Remove
        currentFavoritesCount == 0 ? currentFavoritesCount : currentFavoritesCount--;
        currentFavoriteList.splice(searchListening(currentFavoriteList, listeningId), 1);
        Meteor.users.update(Meteor.userId(), {
          $set: {
            'profile.favoritesList': currentFavoriteList
          }
        });
        console.log(currentFavoritesCount)
        Listenings.update({_id: listeningId}, {
          $set: {
            'listeningTech.favoritesCount' : currentFavoritesCount
          }
        });

      } else { 
        currentFavoritesCount++;
        currentFavoriteList.push(listeningId);
        Meteor.users.update(Meteor.userId(), {
          $set: {
            'profile.favoritesList': currentFavoriteList
          }
        });
        console.log(currentFavoritesCount)
        Listenings.update({_id: listeningId}, {
          $set: {
            'listeningTech.favoritesCount' : currentFavoritesCount
          }
        });
      }
    } else {
      return false;
    }
  }
});