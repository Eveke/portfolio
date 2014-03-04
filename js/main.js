require(["jquery"], function($) {

    $(document).ready(function() {

      $(window).on('scroll',function() {
          var height = $(window).scrollTop();

          console.log("Height: "+height);

          if(height  > 0) {
              $('nav').addClass('scrolled');
          }
          else {
              $('nav').removeClass('scrolled');
          }
      });

    });

});
