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
                $('#success').addClass('is-shown').delay(600).find('.message').fadeIn(1000);
              },
              error: function(jqXHR, textStatus, errorThrown)
              {
                $('#error').addClass('is-shown')
                           .delay(600)
                           .find('.message p')
                           .html(jqXHR.responseJSON.error)
                           .parent()
                           .fadeIn(1000);
              }
            });
      });

      $(document).on('blur', '#name', function(e){
        e.preventDefault();
        var $this = $(e.target);
        var $parent = $this.parent();
        if ($this.val().match(/^[a-z0-9_-\s]{2,56}$/i))
          $parent.removeClass('error').addClass('success');
        else
          $parent.removeClass('success').addClass('error');
      });

      $(document).on('blur', '#email', function(e){
        e.preventDefault();
        var $this = $(e.target);
        var $parent = $this.parent();
        if ($this.val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i))
          $parent.removeClass('error').addClass('success');
        else
          $parent.removeClass('success').addClass('error');

      });

      $(document).on('click','.form-message .close',function(e){
        e.preventDefault();
        var $this = $(e.target);
        var $form = $('#contactMe form');
        if ($('#success').hasClass('is-shown'))
          $form.trigger('reset');

        $form.find('.error, .success').each(function(index, value){
            $(value).removeClass('error').removeClass('success');
        });

        $('.form-message').removeClass('is-shown')
      });

    });

});
