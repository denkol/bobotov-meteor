import { Listenings } from '../../../imports/api/listenings.js';

Meteor.methods({
  listeningSaveToHistory(data) {
    var viewedId = data.id;
    var viewedListening = Listenings.find({
      _id: viewedId
    }).fetch()[0];
    var listeningOwnerId = viewedListening.listeningTech.ownerId;
    var currentListeningsViews = viewedListening.listeningTech.views;
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
        currentHistoryList.unshift(viewedId);
        Meteor.users.update(Meteor.userId(), {
          $set: {
            "profile.historyList": currentHistoryList
          }
        });
      }
    }
  }
});
