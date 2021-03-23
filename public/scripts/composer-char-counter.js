$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let count = $('#tweet-text').val().length;
    if (count > 140) {
      count = -Math.abs(count - 140);
    }
    
    console.log($(this.siblings));
    // $(this).siblings(".button-and-counter").find(".counter").html(count)
    if (count < 0) {
      $(this).siblings(".button-and-counter").find(".counter").html(count).addClass('counter-color');
    } else {
      $(this).siblings(".button-and-counter").find(".counter").html(count).removeClass('counter-color');
    }
  });
  // traverse the dome using this inside $() to parse as jquery object, sibling will find elements on teh same level and find or children will find elements deeper
  // monitorEvents(window, "input");
  // console.log(this);
});