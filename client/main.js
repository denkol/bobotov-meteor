Meteor.startup(function() {
  spinnerHide();
});

function spinnerHide() {
  var spinnerWrapper = $('#spinnerWrapper');
  var spinner = $('#spinner');
  spinnerWrapper.remove();
  spinner.remove();
}