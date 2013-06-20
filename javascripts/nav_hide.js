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
      if($(window).scrollTop() > $('#sidebar').height() - $('#sidebar > #menu').height()){
        fixNav();
      } else {
        unfixNav();
      }
    }
  });
  $(window).resize(function(){
    if($(window).width() < 980 && $('#no_distractions').length > 0){
      expandNav();
    } else if($(window).width() > 979 && $('.nav_fixed').length > 0) {
      unfixNav();
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

function fixNav(){
  var nav_height = $('#sidebar').height()
  var to_top = nav_height - $('#sidebar > #menu').height();
  $('#sidebar').css({  position: 'fixed', zIndex: '10000', top: -$(to_top), boxShadow: '0 0 10px rgba(0,0,0,0.1)'}).addClass('nav_fixed');
  $('#main').css({marginTop: nav_height});
}

function unfixNav(){
  $('#sidebar').css({  position: '', zIndex: '1', top: '', boxShadow: 'none'}).removeClass('nav_fixed');
  $('#main').css({marginTop: '-1px'});
}
