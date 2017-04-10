Meteor.methods({
  removeFromList(id, list) {
    if(this.userId) {
      var userId = this.userId;
      var listeningId = id;
      var listCurrent = list == "history" ? 'profile.historyList' : 'profile.favoritesList';
      var currentList = list == "history" ? Meteor.user().profile.historyList : Meteor.user().profile.favoritesList;
      currentList.splice(searchListening(currentList, listeningId), 1);
      if(list === "history") {
        removeFromHistory(userId, currentList);
      }
      if(list === "favorites") {
        removeFromFavorites(userId, currentList);
      }
    } else {
      return false;
    }
  }
});

function searchListening(arr, id) {
  var result;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === id) {
      result = i;
    }
  }
  return result;
}

function removeFromFavorites(userId, currentList) {
  Meteor.users.update(userId, {
    $set: {
      'profile.favoritesList': currentList
    }
  });
}

function removeFromHistory(userId, currentList) {
  Meteor.users.update(userId, {
    $set: {
      'profile.historyList': currentList
    }
  });
}