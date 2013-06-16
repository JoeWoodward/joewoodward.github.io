$(window).load(function(){
  $('#no_distractions_toggle').click( function(){
    if($('#no_distractions').length > 0){
      expandNav();
    } else {
      expandArticle();
    }
  });
  $(window).scroll(function(){
    if($(window).width() < 980){
      if($(window).scrollTop() > 216){
        $('#sidebar').css({  position: 'fixed', zIndex: '10000', top: '-216px', boxShadow: '0 0 10px rgba(0,0,0,0.1)'});
        $('#main').css({marginTop: 254})
      } else {
        $('#sidebar').css({  position: '', zIndex: '1', top: '', boxShadow: 'none'});
        $('#main').css({marginTop: '-1px'})
      }
    }
  });
  $(window).resize(function(){
    if($(window).width() < 980 && $('#no_distractions').length > 0){
      expandNav();
    }
  });
});

function expandNav(){
  $('#no_distractions').attr('id', 'main');
  $('#no_distractions_toggle').css({left: '27%', backgroundImage: '', borderRadius: 0, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderRight: 'none', borderLeft: '1px solid #e8e8e8'}).text('<');
}

function expandArticle(){
  $('#main').attr('id', 'no_distractions');
  $('#no_distractions_toggle').css({left: 30, backgroundImage: 'url(/images/line-tile.png)', borderRadius: 0, borderTopRightRadius: 5, borderBottomRightRadius: 5, borderLeft: 'none', borderRight: '1px solid #e8e8e8'}).text('>');
}
