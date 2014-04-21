require(["jquery"], function($) {

    $(document).ready(function() {

      $(document).on('focus','#contactMe .input',function(e) {
          $('#contactMe .background-image').addClass('focused');
      });

      $(document).on('blur','#contactMe .input',function(e) {
          $('#contactMe .background-image').removeClass('focused');
      });

      $(document).on('click','#workNav li > a',function(e){
          e.preventDefault();
          var $this = $(e.target);
          $('#workNav li').removeClass('active');
          $this.parent('li').addClass('active');
      });

      $(document).on('submit','#contactMe form',function(e){
          e.preventDefault();
          var $this = $(e.target);

          if (checkValidEmail($('#email').val()) && checkValidName($('#name').val()))
          {
            console.log('submitting form');
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
          } else {
            $this.addClass('shake animated');
          }
      });

      var checkValidName = function(val)
      {
        return val.match(/^[a-z0-9_-\s]{2,56}$/i);
      }

      var checkValidEmail = function(val)
      {
        return val.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
      }

      $(document).on('blur', '#name', function(e){
        e.preventDefault();
        var $this = $(e.target);
        var $parent = $this.parent();
        if (checkValidName($this.val()))
          $parent.removeClass('error').addClass('success');
        else
          $parent.removeClass('success').addClass('error shake animated');
      });

      $(document).on('blur', '#email', function(e){
        e.preventDefault();
        var $this = $(e.target);
        var $parent = $this.parent();
        if (checkValidEmail($this.val()))
          $parent.removeClass('error').addClass('success');
        else
          $parent.removeClass('success').addClass('error shake animated');

      });

      $(document).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(e){
        var $this = $(e.target);
        $this.removeClass('animated shake');
      })

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
