Meteor.startup(function() {
  spinnerHide();
  setInterval(logoLoading, 7000)
});

function spinnerHide() {
  var spinnerWrapper = $('#spinnerWrapper');
  var spinner = $('#spinner');  
  spinnerWrapper.remove();
  spinner.remove();
  
}

function logoLoading() {
  $('#glide').addClass('glide--loading');
  setTimeout(function() {
    $('#glide').removeClass('glide--loading');
  }, 1500);
}