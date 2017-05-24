import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningAddToFavorite(e) {
    if(Meteor.userId()) {
      var listeningId = e.listeningId;
      var isFavorite = e.state;
      var currentFavoriteList = Meteor.user().profile.favoritesList;
      var listening = Listenings.find({_id: listeningId}).fetch()[0];
      var currentFavoritesCount = listening.listeningTech.favoritesCount;

      if (isFavorite) {
        removeFromFavorites(listeningId, currentFavoriteList, currentFavoritesCount);
      } else {
        addToFavorites(listeningId, currentFavoriteList, currentFavoritesCount);
      }
    } else {
      return false;
    }
  }
});


function addToFavorites(listeningId, currentFavoriteList, currentFavoritesCount) {
  currentFavoritesCount++;
  currentFavoriteList.unshift(listeningId);
  Meteor.users.update(Meteor.userId(), {
    $set: {
      'profile.favoritesList': currentFavoriteList
    }
  });
  Listenings.update({_id: listeningId}, {
    $set: {
      'listeningTech.favoritesCount' : currentFavoritesCount
    }
  });
}

function removeFromFavorites(listeningId, currentFavoriteList, currentFavoritesCount) {
  currentFavoritesCount == 0 ? currentFavoritesCount : currentFavoritesCount--;
  currentFavoriteList.splice(searchListening(currentFavoriteList, listeningId), 1);
  Meteor.users.update(Meteor.userId(), {
    $set: {
      'profile.favoritesList': currentFavoriteList
    }
  });
  Listenings.update({_id: listeningId}, {
    $set: {
      'listeningTech.favoritesCount' : currentFavoritesCount
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
