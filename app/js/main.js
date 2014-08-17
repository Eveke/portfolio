(function(){

  var items = $('#work .item').map(function(index,element){return $(element).data('category');});

  var activateTab = function activateTab() {
    var category = $('#work .item.active').data('category');
    $('.work-type-selector .btn').removeClass('active');
    $('.work-type-selector #'+category).addClass('active');
  };

  var init = function init() {
    activateTab();
  };

  $(document).on('click','#viewWork',function(e){
    e.preventDefault();
    $('body').css('margin-top',"-" +$('#bio').css('height')).addClass('is-showing-work');
  });

  $(document).on('click','.work-type-selector .btn',function(e) {
    e.preventDefault();
    var $this = $(this),
        index = $.inArray($this.attr('id'),items);
    $('#work').carousel(index);
  });

  $('#work').on('slid.bs.carousel', activateTab);

  $(document).ready(function() {
    init();
  });

})();
