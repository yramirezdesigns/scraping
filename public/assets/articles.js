$(document).ready(function() {

  navbar();

  $(".comment-section").hide();
  $(document).on('click', '.view-comments', function() {
    var articleTitle = $(this).data("id");
     $($(this).parents().eq(1).children()[1]).slideToggle();
    getComments(articleTitle, $(this));
  });
  var getComments = function(title, thisbtn) {

    $.ajax({
    method: "GET",
    url: "/comments/" + title
    })
      .done(function(data) {

        var commentsDiv = "";
        if(thisbtn.hasClass("view-comments")) {

          commentsDiv = thisbtn.parents().eq(1).find("span");
        } else if (thisbtn.hasClass("submitbtn")) {

          commentsDiv = thisbtn.parents().eq(2).find("span");

        } else {
          console.log("unrecognized button");
        }
        console.log("JPL-commentsDiv", commentsDiv);
        commentsDiv.empty();

        var comments = data.comments;
        if (comments) {
          for (i = 0; i < comments.length; i++) {
            var $comments = $('<div>')
            .addClass('comment-text');
            var $name = $('<div>');
            var $comment = $('<div>');
            $name.append(comments[i].name+": ")
            .addClass('name');
            $comment.append(comments[i].comment)
            .addClass('comment');
            $comments.append($name);
            var $btn = $("<button>");
        		var $span = $("<span>");
        		$btn.addClass("remove-button");
        		$btn.attr("data-id", comments[i]._id);
            $btn.attr("data-name", comments[i].title);
        		$span.addClass("glyphicon glyphicon-trash");
        		$span.attr("aria-hidden", "true");
        		$btn.append($span);
            $comment.append($btn);
        		$comments.append($comment);
            commentsDiv.append($comments);
          }
        }
      });
  }

   $(document).on('click', '.remove-button', function(){
    var commentId = $(this).data("id");
    var articleTitle = $(this).data("name");
    var thisButton = $(this);
    $.ajax({
      method: "DELETE",
      url: "/comments/delete/" + commentId,
    }).done(function(data) {
        console.log("delete button", thisButton.parent());
        thisButton.parents().eq(1).empty().removeClass('comment-text');

    });
  });

  $(document).on('click','.submitbtn', function(){
    event.preventDefault();
    var thisButton = $(this);
    console.log("asdf", thisButton);
    var nbName = "#name-box" + $(this).data("idnum");
    var cbName = "#comment-box" + $(this).data("idnum");

    var articleTitle = $(this).data("id");

		if($(cbName).val() != '') {

      $.ajax({
        method: "POST",
        url: "/comments/" + articleTitle,
        data: {
          name: $(nbName).val(),
          comment: $(cbName).val()
        }
      })
      .done(function(data) {
        console.log("data from post comment articlesjs", data);
        console.log("zxcv", thisButton);
  			getComments(articleTitle, thisButton);
      });

		}
    $(nbName).val('');
    $(cbName).val('');
	});

  function navbar() {
    console.log("navbar called");

    if (window.location.origin === "/") {
      $('.a-latest').css("background","yellow")
    }

    if (window.location.href === "/archive") {
      $('.a-archive').css("background", "yellow");
    };
  }


});
