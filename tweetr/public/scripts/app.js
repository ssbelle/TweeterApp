/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function escape(str) {
  var article = document.createElement('article')
  article.appendChild(document.createTextNode(str)); //or this
  return article.innerHTML;
}


function createTweetElement(tweetData){
  let newTweet =
    '<header class="tweet-header">' +
      '<img class="tweeter-user-icon" src="' + tweetData.user.avatars.small + '">' +
      '<h2>' + tweetData.user.name + '</h2>' +
      '<h4>'+ tweetData.user.handle + '</h4>' +
    '</header>' +
    '<article class="tweet-article">' +
      '<p>'+ escape(tweetData.content.text) +'</p>' +
    '</article>' +
    '<footer class="tweet-footer">' +
      '<h6>'+ new Date(tweetData.created_at).toString().slice(0, -18) +'</h6>' +
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
    $('#tweets-container').prepend(createTweetElement(tweet));
  });
};


function loadTweets(){
  $.get('/tweets', function(tweets){
    renderTweets(tweets);
  })
};


function connectMe(linkURL, formData) {
  $.ajax({
    url: linkURL,
    method: 'POST',
    data: formData,

    success: function (data, textStatus, xhr) {
      var msg = xhr.responseJSON.message;
      var msgType = xhr.responseJSON.type;
      $(".flash-alert").addClass(msgType).html(msg);
      // console.log(JSON.stringify(xhr.responseJSON.user));
      loggedInChangeOver(JSON.stringify(xhr.responseJSON.user));
    },
    error: function(xhr, textStatus, errorThrow) {
      var msg = xhr.responseJSON.message;
      var msgType = xhr.responseJSON.type;
      $(".flash-alert").addClass(msgType).html(msg);
    }
  })
}


function registerSubmit(event) {
  event.preventDefault()
  $(".register").slideUp()
  var formData = $('#register-form').serialize();
  connectMe('/register', formData);
}


function loginSubmit(event) {
  event.preventDefault()
  var formData = $('#login-form').serialize();
  connectMe('/login', formData);
}


function loggedInChangeOver(user) {
   $(".login").slideUp();
   $(".register-button").hide();
   $(".login-button").hide();
   $(".compose-button").show();
   $(".logout-button").show();
   $(".flash-alert").delay( 3000 ).fadeOut( 500 );
   $("#compose-form #userInfo").val(user);
}


function logout(event) {
  $(".logout-button").click(event)
}



$(document).ready(function(event){
  loadTweets();

  //listener for compose button
  $( ".compose-button").click(function() {
    $("flash-alert").hide();
    $( ".tweet-wrapper" ).slideToggle( "fast", function() {
       $(".tweet-textarea").trigger('focus')
    });
  });

  //listener for register button
  $(".register-button").click(function(){
    $(".login").slideUp()
    $(".register").slideToggle("fast", function(){
      $("#reg-name").trigger('focus')
      $("#register-button").click(registerSubmit);
    });
  });

  //listener for login button
  $(".login-button").click(function(){
    $(".register").slideUp()
    $(".login").slideToggle("fast", function() {
      $("#log-name").trigger('focus')
      $("#login-button").click(loginSubmit);
    });
  });
});






