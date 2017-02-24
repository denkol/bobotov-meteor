Meteor.methods({
  userUpdate(data) {
    var validHost = Meteor.absoluteUrl(); //current url

    var userId = this.userId;
    var userPhoto = data.userPhoto + "";
    var userName = data.userName + "";
    var userDesc = data.userDesc + "";

    /* Validate */
    if(userDesc !== "agency" && userDesc !== "user" && userDesc !== "realtor") { 
      userDesc = "user";
    }
    if(userPhoto.indexOf(validHost) === -1) {
      userPhoto = "";
    }
    

    /* Check */
    if(userId && data) {
      var userInDb = Meteor.users.find({_id: userId});

      if(userInDb) {
        Meteor.users.update({_id: userId}, {
          $set: {
            "profile.userDesc": userDesc,
            "profile.userName": userName,
            "profile.userPhoto": userPhoto,
          }
        });
      } else {
        console.log("Ошибка при попытке обновить данные пользователя, пользователь не найден в БД");
      }
    }

  }
}); 