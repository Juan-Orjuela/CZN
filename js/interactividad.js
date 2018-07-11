$(document).ready(function () {
  var btnHome = $('.nav-home a'),
    navHome = $('.nav-home'),
    velo = $('.velo');

  navHome.on({
    mouseenter: function () {
      velo.addClass("oculto");
    }, mouseleave: function () {
      velo.removeClass("oculto");
    }
  });
  //Desplegar menu
  $('.btn-nav, #hide-nav').on('click', function(e){
    e.preventDefault();
    $('#nav-main').toggleClass('mostrar');
    $('#hide-nav').fadeToggle();
  });
  //Animar letras
  function anim_letras() {
    anime({
      targets: '.letra path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      duration: 4500,
      delay: function (el, i) { return i * 250 },
    })
  };

  //Vistas
  $('#lugar_04 .vista-btn').on('click', function () {
    var vista = $(this).data('vista');
    $('#fullwrap').attr('data-mirar', vista);
  });

  //Slider Area
  $("#area-slider")
    .slider({
      max: 85,
      min: 45,
      range: true,
      values: [50, 80],
      step: 2.5
    })
    .slider("pips", {
      first: "pip",
      last: "pip"
    }).on("slidechange", function (e, ui) {
      $("#metros").html("Entre " + ui.values[0] + " y " + ui.values[1] + " MT<span>2</span>");
    });

  //Slider pisos
  $("#pisos-slider")
    .slider({
      max: 25,
      min: 10,
      range: true,
      values: [10, 25],
      step: 1
    })
    .slider("pips", {
      first: "pip",
      last: "pip"
    }).on("slidechange", function (e, ui) {
      $("#pisos").html("Entre " + ui.values[0] + " y " + ui.values[1]);
    });

  //Animacion lineas
  var anim_lineasH = anime({
    targets: '.linea-h',
    width: '100%',
    easing: 'linear',
    duration: 1500,
    delay: function (el, i, l) {
      return 200 + (i * 400);
    }
  });
  var anim_lineasV = anime({
    targets: '.linea-v',
    height: '100%',
    easing: 'linear',
    duration: 1000,
    delay: function (el, i, l) {
      return 200 + (i * 400);
    }
  });
  //Animacion final
  function anim_Final() {
    anime.timeline()
      .add({
        targets: '.btn-nav',
        width: [0, 135],
        easing: 'linear',
        duration: 400
      })
      .add({
        targets: '.btn-nav span',
        width: [0, '100%'],
        easing: 'easeOutBack',
        duration: 300,
        delay: function (el, i, l) {
          return 100 + (i * 200);
        }
      })
      .add({
        targets: '#logo-cusezar',
        width: [0, 135],
        duration: 400,
        easing: 'linear',
      })
      .add({
        targets: '#logo-cusezar img',
        opacity: [0, 1],
        duration: 600,
        easing: 'linear',
      });
    console.log('animFinal')
  }
  //Animaciones por pantalla
  var anim_inicio = anime.timeline();

  anim_inicio.add({
    targets: '.inicio .logo',
    opacity: [0, 1],
    width: [0, 135],
    duration: 500,
    easing: 'easeOutSine',
    delay: 2000,
    complete: anim_Final
  })
    .add({
      targets: '.inicio .logo img',
      opacity: [0, 1],
      duration: 900
    })
    .add({
      targets: '.inicio .nav-home',
      duration: 1000,
      opacity: [0, 1],
      easing: 'linear'

    });
});