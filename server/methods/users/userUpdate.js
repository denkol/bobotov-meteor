Meteor.methods({
  userUpdate(data) {
    console.log(data)
    var userId = this.userId;
    if(userId && data) {
      console.log('dsa')
      var userInDb = Meteor.users.find({_id: userId});
      if(userInDb) {
        Meteor.users.update({_id: userId}, {
          $set: {
            "profile.userDesc": data.userDesc + "",
            "profile.userName": data.userName + ""
          }
        });
      }
    } 
  }
}); 