Meteor.methods({
  facebookSign() {
    var facebookUser = Meteor.user().services.facebook;
    if (Meteor.user().profile.favoritesList) {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          "profile.userName": facebookUser.name,
          "profile.userPhoto": "http://graph.facebook.com/" + facebookUser.id + "/picture/?type=large"
        }
      });
      console.log("user signin with facebook")
    } else {
      var secret = {
        "techInfo": {
          "browser": "",
          "resolution": "",
          "country": "",
          "browserLanguage": ""
        },
        "settings": {},
        "notification": {
          "new": 0,
          "history": []
        },
        "messages": {
          "history": {}
        },
        "money": {
          "balance": 0,
          "paymentHistory": [{
            "paymentId": "",
            "paymentDate": "",
            "paymentSum": 323,
            "paymentSystem": "yandex",
            "paymentsStatus": ""
          }]
        }
      };
      var profileAdd = {
        "userDesc": "Пользователь",
        "userName": facebookUser.name,
        "userPhoto": "http://graph.facebook.com/" + facebookUser.id + "/picture/?type=large",
        "favoritesList": [],
        "listeningsList": [],
        "historyList": []
      };

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          "profile.userDesc": profileAdd.userDesc,
          "profile.userName": profileAdd.userName,
          "profile.userPhoto": profileAdd.userPhoto,
          "profile.favoritesList": profileAdd.favoritesList,
          "profile.listeningsList": profileAdd.listeningsList,
          "profile.historyList": profileAdd.historyList,
          "services.secret": secret
        }
      });
      console.log("user signup with facebook")
    }
  }
});