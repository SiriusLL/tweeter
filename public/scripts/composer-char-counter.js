$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let count = $('#tweet-text').val().length;
    if (count > 140) {
      count = -Math.abs(count - 140);
    }
    
    console.log($(this.siblings));
    if (count < 0) {
      $(this).siblings(".button-and-counter").find(".counter").html(count).addClass('counter-color');
    } else {
      $(this).siblings(".button-and-counter").find(".counter").html(count).removeClass('counter-color');
    }
  });
});