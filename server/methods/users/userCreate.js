Meteor.methods({
  userCreate(userInfo) {
    if(userInfo) {
      var user = Meteor.user();
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
        "userDesc": "user",
        "userPhoto": userInfo.profile.userPhoto,
        "favoritesList": [],
        "listeningsList": [],
        "historyList": []
      };

      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          "profile.userDesc": profileAdd.userDesc,
          "profile.userPhoto": profileAdd.userPhoto,
          "profile.favoritesList": profileAdd.favoritesList,
          "profile.listeningsList": profileAdd.listeningsList,
          "profile.historyList": profileAdd.historyList,
          "services.secret": secret
        }
      });
      console.log(user)
    } else {
      return false;
    }
  }
});