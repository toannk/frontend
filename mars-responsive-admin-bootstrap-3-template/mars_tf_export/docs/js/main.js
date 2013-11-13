(function() {
  $(function() {
    return $('img.screenshot').click(function() {
      return $(this).toggleClass('full');
    });
  });

}).call(this);
