$(document).ready(function(){
    var btnHome = $('.nav-home a'),
        navHome = $('.nav-home'),
        velo = $('.velo');

        navHome.on({
            mouseenter: function() {
              velo.addClass( "oculto" );
            }, mouseleave: function() {
              velo.removeClass( "oculto" );
            }
          });
    //Animar letras
    var lineDrawing = anime({
      targets: '.letra path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 4500,
      delay: function(el, i) { return i * 250 },
      direction: 'alternate',
      loop: false
    });

    //Vistas
    $('.vista-btn').on('click', function() {
      var vista = $(this).data('vista');
     
      console.log(vista);
      $('#fullwrap').attr('data-mirar', vista);
    });
});