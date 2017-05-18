   function loadTweets(arr){
      let newTweet = $('.tweet-textarea').val();
      $.ajax('/tweets', cb {
        url: '/tweets',
        method: 'POST',
        data: {
          tweet: loadTweets
        }
      }).done(function(tweet){
        let html = createTweetElement(tweet);
        $('#tweets-container').append(html);
        $('.submit-tweet-button').val('').focus();
      })
      }

      loadTweets()






















      //jq hides icons div until hover
      $(".new-tweet-prototype").hover(
        function() {
          $(this).find(".tweet-icons").css("display","block");
        },
        function() {
          $(this).find(".tweet-icons").css("display","none");
        }
        );
        //renders db data to page
        renderTweets(data);
      });
