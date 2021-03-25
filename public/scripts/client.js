/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetUrl = 'http://localhost:8080/tweets';

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createTweetElement = function(tweet) {
  const tweetDate = new Date(tweet.created_at).toLocaleString('en-gb');
  console.log("date", tweet.created_at);
  const $tweet = $(`<article class="display-tweet">
  <header class="display-tweet-header">
    
    <div class="profile-image">
      
      <div class="name-and-image"><img class="display-tweet-image" src=${tweet.user.avatars}><p>${tweet.user.name}</p></div>
      
      <div class="handler">${tweet.user.handle}</div>
    </div>

  </header>
  <section class="display-tweet-text">
    <p>${escape(tweet.content.text)}</p>
  </section>
  <footer class="display-tweet-date-icons">
    <div class="tweet-date">
      <p>${tweetDate}</p>
    </div>
    <div class="tweet-icons">
      <i class="far fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>
    
  </footer>
</article>`);
  return $tweet;
}

$(document).ready(function() {

  const $textLengthError = $('#text-length-error');
  const $emptyTextError = $('#empty-text-error');
  const $tweetContainer = $('.tweet-container');
  const $tweetText = $('#tweet-text')

  const renderTweets = function(tweets) {

    $tweetContainer.empty();
    
    for (const tweet of tweets) {
      let createdTweet = createTweetElement(tweet)
      $tweetContainer.prepend(createdTweet);
      console.log('file is running');
    }
  }

  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();

    const $characterCount = $(this).find(".counter")

    if ($tweetText.val().length > 140) {
      $textLengthError.slideDown();
      return;
    }

    if ($tweetText.val() === null || $tweetText.val() === '') {
      $emptyTextError.slideDown();
      return;
    } 
      
    const data = $(this).serialize();
    return $.ajax({
      url: tweetUrl,
      method: "POST",
      data: data
    }).then(function() {
      console.log('POST ajax callback called');
      $textLengthError.slideUp();
      $emptyTextError.slideUp();
      return loadTweets().then(function() {
        $tweetText.val('');
        $characterCount.html('0');
      })
    }).catch(error => {
      console.error(error)
    });
  });


  const loadTweets = function() {

    return $.ajax({
      url: tweetUrl,
      method: "GET",
    }).then((tweetResonse) => {
      renderTweets(tweetResonse);
    }).catch(error => {
      console.error(error);
    });
  };

  loadTweets();
});