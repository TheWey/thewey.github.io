$(document).ready(function() {

  var numberOfPictures = $('.carouselimage').length;

  $('#carousel').css('width', (numberOfPictures * window.innerWidth) + "px");
  $('.carousel-item').css('width', window.innerWidth + "px");

  $(window).resize(function() {
    $('#carousel').css('width', (numberOfPictures * window.innerWidth) + "px");
    $('.carousel-item').css('width', window.innerWidth + "px");
  });

  function mouseEnterNav() {
    $(this).addClass('navitem-hover');
  }

  function mouseLeaveNav() {
    $(this).removeClass('navitem-hover');
  }

  $('.navitem').hover(mouseEnterNav, mouseLeaveNav);

  $(window).scroll(function() {
    var navBoxHeight = $("#navbar").innerHeight();
    var h = $(window).scrollTop();
    var proportionalHeight = 18 + (navBoxHeight * h) / (window.innerHeight * 3.3);
    $("#pointer").css("top", proportionalHeight + "px");
  });

  $("#work").waypoint(function(direction) {

    $('#workbackgroundcover').delay(300).fadeIn(1000);

    $(".workbox").each(function(index) {
      $(this).delay(500 * (index + 1)).fadeIn(1000);
    });
  });

  var count = 0;

  function next() {
    var marginVal = parseInt($('#carousel').css('margin-left').replace("px", ""));
    var windowWidth = window.innerWidth;
    if (count == numberOfPictures - 1) {
      return false;
    } else {
      $('#carousel').css('margin-left', (marginVal - windowWidth) + 'px');
      count = count + 1;
    }
    if (count == numberOfPictures - 1) {
      $('#carousel-next').css('opacity','.5');
    } else {
      $('#carousel-next').css('opacity','1');
    }
    $('#carousel-prev').css('opacity','1');
  }

  function prev() {
    var marginVal = parseInt($('#carousel').css('margin-left').replace("px", ""));
    var windowWidth = window.innerWidth;
    if (count == 0) {
      return false;
    } else {
      $('#carousel').css('margin-left', (marginVal + windowWidth) + 'px');
      count = count - 1;
    }
    if (count == 0) {
      $('#carousel-prev').css('opacity','.5');
    } else {
      $('#carousel-prev').css('opacity','1');
    }
    $('#carousel-next').css('opacity','1');
  }

  $('#carousel-next').click(next);

  $('#carousel-prev').click(prev);

  $(document).keydown(function(event) {
    if (event.which == 37) {
      prev();
    } else if (event.which == 39) {
      next();
    }
  });

  $(function() {
      $("#typing").typed({
        strings: ["Half-stack web developer", "Master of HTML", "Scribe of CSS", "Titan of JavaScript",
        "Tamer of Python", "Guru of Java", "Reader of StackOverflow"],
        typeSpeed: 50,
        startDelay: 500,
        backSpeed: 25,
        backDelay: 1000,
        loop: true
      });
  });

  next();
  prev();

});
