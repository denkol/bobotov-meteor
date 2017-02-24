Meteor.methods({
  removeFromList(id, list) {
    if(Meteor.userId()) {
      var userId = this.userId;
      var listeningId = id;
      var listCurrent = list == "history" ? 'profile.historyList' : 'profile.favoritesList';
      var currentList = list == "history" ? Meteor.user().profile.historyList : Meteor.user().profile.favoritesList;
      console.log(listCurrent, currentList)
      
      currentList.splice(searchListening(currentList, listeningId), 1);
      if(list === "history") {
        Meteor.users.update(userId, {
          $set: {
            'profile.historyList': currentList
          }
        });
      } else {
        Meteor.users.update(userId, {
          $set: {
            'profile.favoritesList': currentList
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