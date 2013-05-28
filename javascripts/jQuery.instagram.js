$(window).load(function(){
  loadInstagram();
});

function loadInstagram() {
  var goToMargin;
  var opts = {
    lines: 11, // The number of lines to draw
    length: 30, // The length of each line
    width: 20, // The line thickness
    radius: 40, // The radius of the inner circle
    rotate: 9, // The rotation offset
    color: '#000', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 100, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '1', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
  var target = document.getElementById('instagram-loading');
  $(target).children().remove();
  var spinner = new Spinner(opts).spin(target);
  $(target).data('spinner', spinner);

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    timeout: 10000,
    url: "https://api.instagram.com/v1/users/6143263/media/recent/?access_token=6143263.09a5c02.f52e35ef4c2f44769568ca1401ee474d",
    success: function(data) {
      $('.instagram').css('opacity', 0).append('<img class="instagram-avatar" src="' + data.data[0].user.profile_picture + '"></img><h2>'+ data.data[0].user.username +'\'s recent instagrams</h2>');
      var i = 0;
      for(i; i < 4; i++){
        $(".instagram").append("<img class='instagram-image' src='" + data.data[i].images.standard_resolution.url +"' />");
      }
      if (!$.isEmptyObject(data.data[i+1].images.standard_resolution.url)) {
        $('.instagram').append('<div class="more-btn">Show more</div>');
        $('.more-btn').data('urls', data.data).data('position', i);
        $('.more-btn').click(function() {
          showMore();
        });
        if(parseInt($('.more-btn').position().top - $(window).scrollTop()) < $(window).height() + 100){
          showMore();
        }
        $(window).scroll(function(){
          if(parseInt($('.more-btn').position().top - $(window).scrollTop()) < $(window).height() + 100){
            showMore();
          }
        });
      }
      $('#instagram-loading').fadeOut(300, function(){
        $(this).data('spinner').stop()
        $('.instagram').stop().animate({opacity: 1},200);
      });
    }, error: function(XMLHttpRequest, textStatus, errorThrown){
      $(target).data('spinner').stop();
      $(target).css({'margin': 0, 'opacity': 1}).append('<h1>Sorry, there seems to be a problem.</h1>');
    }
  });
};


function showMore() {
  var data = $('.more-btn').data('urls');
  var i = $('.more-btn').data('position');
  var j = i + 4;
  if(data.length < j) {
    j = data.length;
  }
  for(i; i < j; i++){
    $(".more-btn").before("<img class='instagram-image' src='" + data[i].images.standard_resolution.url +"' />");
  }
  $('.more-btn').data('position', i);
  if ($.isEmptyObject(data[i])) {
    $('.more-btn').remove();
    $(window).unbind('scroll');
  }
}
