import { Listenings } from '../../../imports/api/listenings.js';

function sendEmailToOwner(data) {
  if(data) {
    /* Save all data to vars */
    var email = data.email;
    var name = data.ownerName;
    var listeningLink = data.listeningLink;


    var sendObj = {
      from: "Bobotov",
      to: email,
      subject: "Your ad on Bobotov has been approved!",
      text: 'Dear, '+name+'!' + '\n\n' + 'Thank you for publishing your ad on our website! Your ad has been verified, and published!' + '\n\n' + 'Now your ad is available by the link: ' + listeningLink + '\n\n' + 'Yours faithfully, '+'\n'+'The team of Bobotov'
    }

    /* SMPT send to email */
    Email.send(sendObj);
  }
}

Meteor.methods({
  listeningApprove(listeningId) {
    /* Current user master? */
    var userId = this.userId;
    var userIsMaster = Meteor.users.find({_id: userId}).fetch()[0].profile.master;

    /* Define approving listening */
    var listeningId = listeningId + "";
    var listening = Listenings.find({_id: listeningId}).fetch()[0];
    var listeningTech = listening.listeningTech;

    /* Define listening owner email */
    var listeningOwnerId = listeningTech.ownerId;
    var ownerObj = Meteor.users.find({_id: listeningOwnerId}).fetch()[0];
    var ownerEmail = ownerObj.emails[0].address;
    var ownerName = ownerObj.profile.userName;
    
    if (userIsMaster) {
      Listenings.update({_id: listeningId}, { 
        $set: {
          "listeningTech.statusCode" : 1,
          "listeningTech.public": true
        } 
      });

      if(ownerEmail) {
        /* Send mail to owner */
        sendEmailToOwner({
          email: ownerEmail,
          ownerName: ownerName,
          listeningLink: "https://bobotov.me/listening/" + listeningId,
        });
      }

      return true;
    }
  }
});