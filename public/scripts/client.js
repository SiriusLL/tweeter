/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


const createTweetElement = function(tweet) {
  const tweetDate = new Date(tweet.created_at).toLocaleDateString('en-gb');
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
      <p><i class="far fa-flag"></i></p><p><i class="fas fa-retweet"></i></p><p><i class="far fa-heart"></i></p>
    </div>
    
  </footer>
</article>`);
  return $tweet;
}

$(document).ready(function() {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      let createdTweet = createTweetElement(tweet)
      console.log('createdTweet', createdTweet);
      $('.tweet-container').prepend(createdTweet);
      console.log($('.tweet-container')); 
      console.log('file is running');
    }
  }

  
  
  //renderTweets(data);



  $("#submit-tweet").on("submit", function(event) {
    event.preventDefault();

    if ($('#tweet-text').val().length > 140) {
      $('#error-message').slideDown();
      //alert('Character count exceeds 140 characters');
      return;
    }

    if ($('#tweet-text').val() !== null || ('#tweet-text').val() !== '') {
      let url = 'http://localhost:8080/tweets';
      //let url = 'http://example.com'
      console.log(url);
      //console.log('renterTweets', renderTweets(data).serialize())
      const data = $(this).serialize();
      $.ajax({
        url: url,
        method: "POST",
        data: data
      }).then((result) => {
        console.log('POST ajax callback called');
        $('#error-message').slideUp();
        loadTweets();
        $('#tweet-text').val('');
        $('#tweet-text').siblings(".button-and-counter").find(".counter").html('0')
      }).catch(err => {
        console.log('POST ajax error caught');
        console.log(err);
      });
    }
  });


  const loadTweets = function() {
    let url = 'http://localhost:8080/tweets';

    $.ajax({
      url: url,
      method: "GET",
    }).then((result) => {
      console.log('GET ajax callback called')
      console.log(result)
      renderTweets(result);
    }).catch(err => {
      console.log('GET ajax error caught')
      console.log(err);
    });
  };

  loadTweets();
});