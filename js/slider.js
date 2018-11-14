// // $('.vacancy').width() * $('.vacancy').length
// // $('.vacancy').width() + $('.vacancy').width() + $('.vacancy').width() + $('.vacancy').width()


// $("#type_1").click(function(){
//   // $(".wrapper").animate({top: 0, left: -920, position:'absolute'});
//   // $(".wrapper").parent().css({position: 'relative'});
//   $(".wrapper").animate({top: 0, left: -920,});
// });

// $("#type_0").click(function(){
//   // $(".wrapper").animate({top: 0, left: -920, position:'absolute'});
//   // $(".wrapper").parent().css({position: 'relative'});
//   $(".wrapper").animate({top: 0, left: 0,});
// });


function getColumns() {
  var resolution = $(window).width();
  var desktop = 1024;
  var mobile = 480;
  if (resolution >= desktop) {
    return 3;
  }else if (resolution <= mobile) {
    return 1;
  }else {
    return 2;
  }
}

function init() {
  $(".wrapper").css({top: 0, left: 0});
  $('.vacancy').css('width', $('.vacancies').width()/getColumns()-5) 
  $('.wrapper').css('width', ($('.vacancy').outerWidth()+5)*$('.vacancy').length);

  var slides = $('.vacancy').length;
  var dots = Math.ceil(slides/getColumns());

  $('.dotsv').html('');

  for(var i = 0; i < dots; i++) $('.dotsv').append($('<div class="dotv"></div>'));

}
$(function(){
 init();

$('.dotsv').on('click', '.dotv', function() {
    var index = $(this).index();
    $(".wrapper").animate({top: 0, left: -1*index*$('.vacancies').outerWidth()});
  });

 $(window).resize(init);
})
