$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let count = 140 - $('#tweet-text').val().length;
    const $tweetCharCounter = $(this).siblings(".button-and-counter").find(".counter").html(count)

    if (count < 0) {
      $tweetCharCounter.addClass('counter-color');
      return;
    }
      $tweetCharCounter.removeClass('counter-color');
      return;
  });
});