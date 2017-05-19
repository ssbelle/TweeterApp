/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function escape(str) {
  var article = document.createElement('article')
  article.appendChild(document.createTextNode(str)); //or this
  return article.innerHTML;
}


function createTweetElement(tweetData){
  let newTweet =
    '<header class="tweet-header">' +
      '<img class="tweeter-user-icon" src="'+ tweetData.user.avatars.small +'">' +
      '<h2>' + tweetData.user.name + '</h2>' +
      '<h4>'+ tweetData.user.handle +'</h4>' +
    '</header>' +
    '<article class="tweet-article">' +
      '<p>'+ escape(tweetData.content.text) +'</p>' +
    '</article>' +
    '<footer class="tweet-footer">' +
      '<h6>'+ tweetData.created_at +'</h6>' +
      '<div class="tweet-icons">' +
        '<a href="#">' +
          '<img src="/images/tweeter-flag-icon.jpg">' +
        '</a>' +
        '<a href="#">' +
          '<img src="/images/tweeter-retweet-icon.jpg">' +
        '</a>' +
        '<a href="#">' +
          '<img src="/images/tweeter-heart-icon.png">' +
        '</a>' +
      '</div>' +
    '</footer>';
  var article = document.createElement('article')
  $(article).addClass('new-tweet-prototype').html(newTweet)
  return article;
};



function renderTweets(arr) {
  $('#tweets-container').empty();
  arr.forEach(function(tweet){
    console.log(tweet)
    $('#tweets-container').prepend(createTweetElement(tweet));
  });
};


//loadtweets
function loadTweets(){
  $.get('/tweets', function(tweets){

    renderTweets(tweets);
  })
};
loadTweets()

//form submit handler
$(document).ready(function(event){
  // moved to composer-char-counter.js, line 37
  // $('.submit-tweet-button').on('click.tweet',function(event) {
  //    event.preventDefault(event);
  //    var formData = $('#compose-form').serialize()

  //    $.ajax({
  //     url: '/tweets',
  //     method: 'POST',
  //     data: formData
  //   }).done(() => {
  //     loadTweets();
  //   })
  // })
  $( ".compose-button").click(function() {

    $( ".tweet-wrapper" ).slideToggle( "fast", function() {
    });
  });
});




// $.ajax({
//   url: '/',
//   method: 'GET',

// })

//on submit ajax to /home again

