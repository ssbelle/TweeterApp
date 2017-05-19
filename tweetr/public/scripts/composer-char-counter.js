$(document).ready(function(){
  // This adds the error functionality to the "tweet" button
  // when the app loads initially (the textarea is empty)
  $('.tweet-wrapper input')
        .addClass("disabled")
        .off("click.tweet")
        .on("click.error", function(event){
          event.preventDefault(event);
          $('.compose-flash-message').show().text("Tweet can't be empty!!!");
        });

  // Now we add the event listener for the text area,
  // along with all the counter's functionalities
  $('form').on('keyup', 'textarea', function(){

    var max = 140;
    var counter = $(this).siblings('div').find('span');
    var count = $(this).val().length;
    var remaining = max - count;
    counter.text(remaining);

  // check if the textarea is empty
    if(remaining === max){
      $('.tweet-wrapper input')
        .addClass("disabled")
        .off("click.tweet")
        .on("click.error", function(event){
          event.preventDefault(event);
          $('.compose-flash-message').show().text("Tweet can't be empty!!!");
        });
    } // or check if we've exceeded the maximum characters
    else if(remaining < 0) {
      counter.addClass('red');
      $('.tweet-wrapper input')
        .addClass("disabled")
        .off("click.tweet")
        .on("click.error", function(event){
          event.preventDefault(event);
          $('.compose-flash-message').show().text("Your tweet is too long!!!");
        });
    } // and then do these if we have between 1 and 140 (max) characters
    else {
      counter.removeClass('red');
      $('.compose-flash-message').hide().text("");
      $('.tweet-wrapper input')
        .removeClass("disabled")
        .off("click.error")
        // this removes previously added click.tweets to avoid duplicates
        .off('click.tweet')
        // and then we add a single new one.
        .on('click.tweet', function(event) {
          event.preventDefault(event);

          var formData = $('#compose-form').serialize()
-
          $.ajax({
            url: '/tweets',
            method: 'POST',
            data: formData
          }).done(() => {
            loadTweets();
            // we clear the textarea after posting
            // so it's ready for a new tweet.
            $('.tweet-wrapper input')
              .closest("div").siblings("textarea").val("")
            // then we have to redisable the button again,
            // since the textarea is empty
              .addClass("disabled")
              .off("click.tweet")
              .on("click.error", function(event){
                event.preventDefault(event);
                $('.compose-flash-message').show().text("Tweet can't be empty!!!");
              });
          });
        });
    };
  });
});

//$('.submit-tweet-button').on('click.tweet',function(event) {
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


//error over 140 or empty

