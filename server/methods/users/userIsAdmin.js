Meteor.methods({
  userIsAdmin(){
    var userId = this.userId;
    var userObj;
    var adminField;

    if(userId) {
      userObj = Meteor.users.find({_id: userId}).fetch()[0];
      adminField = userObj.services.secret.settings.admin;
      console.log(userObj.services.secret.settings)
      if(adminField) {
        return true
      } else {
        return false
      }
    }
  }
});

