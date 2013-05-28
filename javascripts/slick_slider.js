$.fn.initSlickSlider = function(options){
  var goToMargin;

  // set default options
  var settings = jQuery.extend({
    transitionDuration: 300, fade: true
  }, options);

  // $(this) should be a group of li's
  var menu = $(this);

  // set the #slides-window's height to the first .slide's height
  $(this).closest('div').find('#slides').animate({height: $(this).closest('div').find('#1').height()}, 800);

  // fade content-area away and new one in
  $(menu).live('click', function(event) {

    // get the parent div incase there are multiple tabbed sliders on one page
    var parent = $(this).closest('div');

    // get the ID of the current slide
    var currentId = parseInt($(this).siblings('.active').data('index'));

    // get the ID of the div that will be positioned in view
    var newId = parseInt($(this).data('index'));

    // get the div currently in view
    var currentSlide = $(parent).find('#' + currentId);

    // get the #slides div
    var slides = $(parent).find('#slides');

    //  get the current slide
    var newSlide = $(slides).find('#' + (newId));

    var height = $(this).data('height');
    height = height === undefined ? $(newSlide).height() : height;

    $(slides).children().stop().css('opacity', 1);

    var range;
    var time;

    if(settings.fade === true) {
      if(currentId > newId) {
        range = currentId - newId;
        time = (settings.transitionDuration / range) * 0.8;
        for(var i = currentId; i > newId; i--) {
          $('#' + i).delay(time * (range - (i - newId))).animate({opacity:0}, time, 'linear');
        }
      } else {
        range = newId - currentId;
        time = (settings.transitionDuration / range) * 0.8;
        for(var i = currentId; i < newId; i++) {
          $('#' + i).delay(time * (range - (newId - i))).animate({opacity:0}, time, 'linear');
        }
      }
    }

    goToMargin = -((newId - 1) * 120);

    // slide the #slides div to the correct posisiton and change the height
    $(slides).stop().animate({height: height, marginLeft: goToMargin + '%'}, settings.transitionDuration, 'linear', function(){
      $(slides).children().css('opacity', 1);
    });

    // deactivate the current slide
    $(currentSlide).removeClass('active');

    // activate the new slide
    $(newSlide).addClass('active');

    // set the menu button to active
    $(this).addClass('active').siblings().removeClass('active');
  });
};

$(window).load(function(){
  $('#menu li').initSlickSlider({transitionDuration: 800});
});
