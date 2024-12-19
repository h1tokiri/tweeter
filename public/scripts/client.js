/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png",
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
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ];

  const createTweetElement = function (tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <figure class="user-info">
            <img src="${tweet.user.avatars}" alt="User Avatar">
            <figcaption class="name">${tweet.user.name}</figcaption>
          </figure>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <p class="tweet-content"></p>
        <footer>
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    $tweet.find('.name').text(tweet.user.name);
    $tweet.find('.tweet-content').text(tweet.content.text);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    // Clear the tweet container before appending new tweets
    $('.tweet-container').empty();
    // Loop through tweets and prepend each one to the tweet container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  // Render the tweets
  // renderTweets(data);

  // Add event listener for form submission
  $('.new-tweet form').on('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const tweetText = $('#tweet-text').val(); // Get the tweet text

    // Validation checks
    if (!tweetText) {
      alert('Tweet content cannot be empty.');
      return; // Prevent form submission
    }

    if (tweetText.length > 140) {
      alert('Tweet content exceeds the 140 character limit.');
      return; // Prevent form submission
    }

    const serializedData = $(this).serialize(); // Serialize the form data

    // Send the serialized data to the server using an AJAX POST request
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: serializedData
    })
      .done(function (response) {
        console.log('Tweet submitted successfully:', response);
        // Refresh the list of tweets
        loadTweets();
        // Clear the form fields
        $('.new-tweet form')[0].reset();
      })
      .fail(function (error) {
        console.error('Error submitting tweet:', error);
      });
  });

  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
      .done(function (tweets) {
        renderTweets(tweets);
      })
      .fail(function (error) {
        console.error('Error fetching tweets:', error);
      });
  };

  loadTweets();
});