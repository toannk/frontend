function rotateBanners(elem) {
  var active = $(elem+" img.active");
  var next = active.next();
  if (next.length == 0) 
    next = $(elem+" img:first");
  active.removeClass("active").fadeOut(200);
  next.addClass("active").fadeIn(200);
}

function prepareRotator(elem) {
  $(elem+" img").fadeOut(0);
  $(elem+" img:first").fadeIn(0).addClass("active");
}

function startRotator(elem) {
  prepareRotator(elem);
  setInterval("rotateBanners('"+elem+"')", 2500);
}
