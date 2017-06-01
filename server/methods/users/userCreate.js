function sendEmailUser(data) {
  if(data) {
    /* Save all data to vars */
    var email = data.email;
    var name = data.name;


    var sendObj = {
      from: "hello@bobotov.me",
      to: email,
      subject: "Welcome to Bobotov!",
      text: "Hello " + name + "! \n\n" + "Thank you for registration on Bobotov! You're welcome!" + '\n\n' + 'Yours faithfully, '+'\n'+'The team of Bobotov'
    }

    /* Send to email */
    Email.send(sendObj);
  }
}

Meteor.methods({
  userCreate(userInfo) {
    if(userInfo) {
      var user = Meteor.user();
      var userEmail = user.emails[0].address;
      var userName = user.profile.userName;

      var secret = {
        "techInfo": {
          "browser": "",
          "resolution": "",
          "country": "",
          "browserLanguage": ""
        },
        "settings": {
          "admin": false
        },
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
      if(userEmail) {
        sendEmailUser({
          email: userEmail,
          name: userName,
        });
      }
      
    } else {
      return false;
    }
  }
});