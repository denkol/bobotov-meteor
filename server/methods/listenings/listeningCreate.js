import { Listenings } from '../../../imports/api/listenings.js';

function randomWithProbability(probability) {
  var notRandomNumbers = [true, false];
  var idx = Math.floor(Math.random() * probability);
  return notRandomNumbers[idx];
}


Meteor.methods({
  listeningCreate(data) {
    var userId = this.userId;
    var user = Meteor.user();
    var ownerName = user.profile.userName;
    var ownerListeningList = user.profile.listeningsList;
    var date = new Date();
    
    /* reset listeningTech */
    if (data.listeningTech) {
      data.listeningTech = "";
    }

    /* listeningTech object */
    data.listeningTech = {
      "statusCode": 2,
      "public": false,
      "bonuses": {
        "bonus1": false,
        "bonus2": false,
        // "bonus3": Math.random() < 0.5 ? true : false
        "bonus3": false
      },
      "createdAt": date,
      "lastChangeDate": date,
      "ownerId": userId,
      "ownerName": ownerName,
      "views": 0,
      "favoritesCount": 0
    }

    if (userId) {
      /* Update DB */
      var userListenings = user.profile.listeningsList;
      /* Insert data to DB */
      Listenings.insert(data, function(err, id) {
        if (err) { console.log(err);
        } else {
          userListenings.push(id);
          Meteor.users.update(userId, {
            $set: { "profile.listeningsList": userListenings }
          });
        }
      });
    }
  }
});