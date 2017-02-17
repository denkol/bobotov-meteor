Meteor.methods({
  facebookSign() {
    var facebookUser = Meteor.user().services.facebook;
    var userName = Meteor.user().profile.userName;
    var userFavoritesList = Meteor.user().profile.favoritesList;
    if (userFavoritesList) {
      console.log(userName + " sign in with Facebook");
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

      Meteor.users.update({ _id: Meteor.userId() }, {
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
      console.log(userName + " sign up with Facebook")
    }
  }
});