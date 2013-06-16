$(window).load(function(){
  $(window).scroll(function(){
    if($(window).width() < 980){
      if($(window).scrollTop() > 216){
        $('#sidebar').css({  position: 'fixed', zIndex: '10000', top: '-216px'});
        $('#main').css({marginTop: 254})
      } else {
        $('#sidebar').css({  position: '', zIndex: '1', top: ''});
        $('#main').css({marginTop: '-1px'})
      }
    }
  });
});
