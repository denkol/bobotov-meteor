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
  $('#glide-shadow').addClass('glide__shadow--loading');
  setTimeout(function() {
    $('#glide-shadow').removeClass('glide__shadow--loading');
  }, 1500);
}