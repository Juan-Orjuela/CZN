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

  //Animar letras
  var lineDrawing = anime({
    targets: '.letra path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 4500,
    delay: function (el, i) { return i * 250 },
    direction: 'alternate',
    loop: false
  });

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
});