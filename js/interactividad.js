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
});