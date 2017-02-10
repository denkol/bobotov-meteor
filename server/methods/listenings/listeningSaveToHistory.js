import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningSaveToHistory(data) {
    var viewedId = data.id;
    var viewedListening = Listenings.find({
      _id: viewedId
    }).fetch();
    var listeningOwnerId = viewedListening[0].listeningTech.ownerId;
    var currentListeningsViews = viewedListening[0].listeningTech.views;
    var newListeningViews = currentListeningsViews + 1;

    if (listeningOwnerId != Meteor.userId()) {
      Listenings.update(viewedId, {
        $set: {
          "listeningTech.views": newListeningViews
        }
      });
    }

    if (Meteor.user()) {
      var currentHistoryList = Meteor.user().profile.historyList;
      var currentHistoryListLast = Meteor.user().profile.historyList.length - 1;
      if (currentHistoryList[currentHistoryListLast] !== viewedId) {
        currentHistoryList.push(viewedId);
        Meteor.users.update(Meteor.userId(), {
          $set: {
            "profile.historyList": currentHistoryList
          }
        });
      }
    }
  }
});