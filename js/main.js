require(["jquery"], function($) {

    $(document).ready(function() {

      $(window).on('scroll',function() {
          var height = $(window).scrollTop();

          if(height  > 0) {
              $('nav').addClass('scrolled');

              if (height >= 657)
              {
                $('#masthead').addClass('scrolled');
              }
              else
              {
                $('#masthead').removeClass('scrolled');
              }
          }
          else {
              $('nav').removeClass('scrolled');
              $('#masthead').removeClass('scrolled');
          }
      });

      $(document).on('focus','#contactMe .input',function(e) {
          $('#contactMe .background-image').addClass('focused');
      });

      $(document).on('blur','#contactMe .input',function(e) {
          $('#contactMe .background-image').removeClass('focused');
      });

      $(document).on('submit','#contactMe form',function(e){
          e.preventDefault();
          var $this = $(e.target);

          $.ajax({
              headers : {
                 "X-Parse-Application-Id" : "T2u9K77ww0zPTmfTEB9mTk2TROLoaGSNEw4u8lqD",
                 "X-Parse-REST-API-Key"   : "jLvRGi2vvEvrrR6orHP9zjLBMEC4U2V3NydbtzEu"
              },
              url: $this.attr('action'),
              data: $this.serialize(),
              dataType: 'json',
              method: 'post',
              success: function(data)
              {
                console.log(data);
              }
            });
      });

    });

});
