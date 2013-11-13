$(function() {
  $('.color_settings_box').animate({'right' : '0px'}, 'slow').addClass('active');

  if($('.content-wrapper').hasClass('wood-wrapper')){
    $('#wood-wrapper-checkbox').prop('checked', true);
  }

  $('#wood-wrapper-checkbox').on( 'change', function(){
    if($(this).is(':checked')){
      $('.content-wrapper').addClass('wood-wrapper');
    }else{
      $('.content-wrapper').removeClass('wood-wrapper');
    }
  });

  $('.toggle-color-settings').on('click', function(){
    if($('.color_settings_box').hasClass('active')){
      $('.color_settings_box').animate({'right' : '-200px'}, 'slow').removeClass('active');
      $('.toggle-color-settings span').text('show');
    }else{
      $('.color_settings_box').animate({'right' : '0px'}, 'slow').addClass('active');
      $('.toggle-color-settings span').text('hide');
    }
    return false;
  });

  $('.color-tooltip').tooltip();

  $('.color-box').on('click', function(){
    $(this).closest('.color-settings-w').find('.color-box').removeClass('active');
    $(this).addClass('active');
    var replace_element = $(this).closest('.color-settings-w').data('replace-element');
    var leave_class = $(this).closest('.color-settings-w').data('leave-class');
    var add_class = $(this).data('replace-with');
    $(replace_element).prop('class', leave_class);
    $(replace_element).addClass(add_class);
    $('#wood-wrapper-checkbox').prop('checked', false);
    $('.content-wrapper').removeClass('wood-wrapper');
    return false;
  });
});