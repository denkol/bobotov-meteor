Meteor.methods({
  userDelete(data) {
    
  },
  userDeletePhoto(){
    var userId = this.userId;
    if(userId) {
      var userInDb = Meteor.users.find({_id: userId});
      if(userInDb) {
        Meteor.users.update({_id: userId}, {
          $set: {
            "profile.userPhoto": "",
          }
        });
      }
    }
  }
});