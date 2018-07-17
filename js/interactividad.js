//Desplegar menu
$('.btn-nav, #hide-nav').on('click', function (e) {
  e.preventDefault();
  $('#nav-main').toggleClass('mostrar');
  $('#hide-nav').fadeToggle();
});
//Desplegar menu Aptos relacionados
$('#mostrar-aptos').on('click', function (e) {
  e.preventDefault();
  $('.aptos-rel').toggleClass('oculto');
});
//Animar letras
function anim_letras() {

  anime.timeline()
    .add({
      targets: '.letra',
      opacity: [0, 1],
      duration: 200,
      easing: 'linear',
      delay: function (el, i) { return 800 + (i * 1000) }
    })
    .add({
      targets: '.letra path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      duration: 4500,
      delay: function (el, i) { return 800 + (i * 1000) }
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
}
/*
===========================
Animaciones por pantalla
===========================
*/

//Inicio
function anim_inicio() {
  anime.timeline().add({
    targets: '#inicio .logo',
    opacity: [0, 1],
    width: [0, 135],
    duration: 500,
    easing: 'easeOutSine',
    delay: 2000,
    complete: anim_Final
  })
    .add({
      targets: '#inicio .logo img',
      opacity: [0, 1],
      duration: 900
    })
    .add({
      targets: '#inicio .nav-home',
      duration: 1000,
      opacity: [0, 1],
      easing: 'linear'

    });

}
$('.nav-home').on({
  mouseenter: function () {
    $('.velo').addClass("oculto");
  }, mouseleave: function () {
    $('.velo').removeClass("oculto");
  }
});

//Lugar 01
function anim_lugar01() {
  anim_letras();
  anime.timeline()
    .add({
      targets: '.bloque',
      opacity: [0, 1],
      duration: 2000,
      easing: 'linear',
      delay: 1000
    })
    .add({
      targets: 'h1',
      width: [0, '100%'],
      duration: 800,
      easing: 'easeOutSine',

    })
    .add({
      targets: 'h1 span',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear'
    })
    .add({
      targets: '.bloque p, .bloque a',
      opacity: [0, 1],
      easing: 'easeOutSine',
      duration: 600,
      delay: function (el, i, l) {
        return (i * 400);
      },
      complete: anim_Final
    })
    .add({
      targets: '.videowrap',
      opacity: [0, 1],
      duration: 2000,
      easing: 'linear',
      offset: '-=1000'
    })
}
//Lugar 02
function anim_lugar02() {
  anim_letras();
  anime.timeline()
    .add({
      targets: 'h1',
      width: [0, '150%'],
      duration: 800,
      easing: 'easeOutSine',

    })
    .add({
      targets: 'h1 span',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear'
    })
    .add({
      targets: '#rango-area',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear'
    })
    .add({
      targets: 'a',
      translateX: [-100, 0],
      opacity: [0, 1],
      easing: 'easeOutSine',
      duration: 400,
      complete: anim_Final
    });
}
//Lugar 03
function anim_lugar03() {
  anim_letras();
  anime.timeline()
    .add({
      targets: 'h1 ',
      width: [0, '100%'],
      duration: 800,
      easing: 'easeOutSine',
      delay: 1000

    })
    .add({
      targets: 'h1 span',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear',
      delay: function (el, i) {
        return (i * 400);
      }
    })
    .add({
      targets: '.custom-control',
      opacity: [0, 1],
      duration: 400,
      easing: 'linear',
      offset: '-=400',
      delay: function (el, i) {
        return (i * 300);
      }
    })
    .add({
      targets: 'a',
      translateX: [-100, 0],
      opacity: [0, 1],
      easing: 'easeOutSine',
      duration: 400,
      complete: anim_Final
    });
}
//Lugar 04
function anim_lugar04() {
  anim_letras();
  anime.timeline()
    .add({
      targets: 'h1 ',
      width: [0, 165],
      duration: 400,
      easing: 'easeOutSine',
      delay: 1000

    })
    .add({
      targets: 'h1 span',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear'
    })
    .add({
      targets: '.custom-control',
      opacity: [0, 1],
      duration: 400,
      easing: 'linear',
      offset: '-=400',
      delay: function (el, i) {
        return (i * 300);
      }
    })
    .add({
      targets: 'a',
      translateX: [-100, 0],
      opacity: [0, 1],
      easing: 'easeOutSine',
      duration: 400,
      complete: anim_Final
    });
}
//Lugar 05
function anim_lugar05() {
  anim_letras();
  anime.timeline()
    .add({
      targets: 'h1 .bg-rojo',
      width: [0, 322],
      paddingRight: 20,
      duration: 400,
      easing: 'easeOutSine',
      delay: 1000
    })
    .add({
      targets: 'h1 span',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear'
    })
    .add({
      targets: '#filtros h2',
      color: ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
      duration: 500,
      easing: 'linear'
    })
    .add({
      targets: '#filtros .filtros-wrap',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear',
      complete: anim_Final
    })
    .add({
      targets: '#aptos .apto',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 400,
      easing: 'easeOutSine',
      offset: '-=500',
      delay: function (el, i) {
        return (i * 300);
      }
    })
}
//Lugar 06
function anim_lugar06() {
  anim_letras();
  anime.timeline()
    .add({
      targets: 'h1 span',
      width: [0, '100%'],
      paddingLeft: [0, 20],
      duration: 400,
      easing: 'easeOutSine',
      delay: 1000
    })
    .add({
      targets: 'h1 .bg-trans',
      color: ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
      duration: 1000,
      easing: 'linear'
    })
    .add({
      targets: 'h1 .bg-rojo',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear',
      offset: '-=500'
    })
    .add({
      targets: 'table.data',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 400,
      easing: 'linear',
      complete: anim_Final
    })
    .add({
      targets: '.aptos-rel',
      marginBottom: [-150, 0],
      duration: 400,
      easing: 'linear',
    })
    .add({
      targets: '#planta-apto',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear',
      offset: '-=200'
    })
    .add({
      targets: '.btn-volver',
      opacity: [0, 1],
      duration: 1000,
      easing: 'linear',
      offset: '-=400'
    })
}
//Galeria
function anim_galeria() {
  anime.timeline()
    .add({
      targets: 'h1 span',
      width: [0, '100%'],
      paddingLeft: [0, 20],
      duration: 400,
      easing: 'easeOutSine',
      delay: 1000
    })
    .add({
      targets: 'h1 .bg-trans',
      color: ['rgba(0,0,0,0)', 'rgba(0,0,0,1)'],
      duration: 1000,
      easing: 'linear'
    })
    .add({
      targets: 'h1 .bg-rojo',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear',
      offset: '-=500',
      complete: anim_Final
    })
    .add({
      targets: '.thumb_link',
      opacity: [0, 1],
      duration: 900,
      easing: 'linear',
      delay: function (el, i) {
        return (i * 300);
      }
    })
}
//Proyecto
function anim_proyecto() {
  anim_letras();
  anime.timeline()
    .add({
      targets: 'h1 span',
      width: [0, '100%'],
      paddingLeft: [0, 20],
      duration: 400,
      easing: 'easeOutSine',
      delay: 1000
    })
    .add({
      targets: 'h1 .bg-trans',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear',
      complete: anim_Final
    })
    .add({
      targets: 'h1 .bg-rojo',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear',
      offset: '-=500'
    })
    .add({
      targets: '#proyecto .nav-proyecto',
      duration: 1000,
      opacity: [0, 1],
      easing: 'linear'

    });
}
//Nueva Vista
function anim_proyVis() {
  anim_letras();
  anime.timeline()
    .add({
      targets: '.col-full, .bloque',
      opacity: [0, 1],
      duration: 2000,
      easing: 'linear',
      delay: function (el, i) {
        return (i * 1000);
      }
    })
    .add({
      targets: 'h1',
      width: [0, '100%'],
      duration: 800,
      easing: 'easeOutSine',
    })
    .add({
      targets: 'h1 span',
      paddingLeft: [0, 135],
      duration: 400,
      easing: 'easeOutSine'
    })
    .add({
      targets: 'h1 span',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear',
      delay: function (el, i) {
        return (i * 500);
      },
      complete: anim_Final
    })
    .add({
      targets: '.bloque p',
      opacity: [0, 1],
      easing: 'easeOutSine',
      duration: 600
    })
}
//Ubicacion
function anim_ubicacion() {
  anim_letras();
  anime.timeline()
    .add({
      targets: 'h1',
      width: [0, '100%'],
      duration: 800,
      easing: 'easeOutSine',
    })
    .add({
      targets: 'h1 span',
      paddingLeft: [0, 20],
      duration: 400,
      easing: 'easeOutSine'
    })
    .add({
      targets: 'h1 span',
      color: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      duration: 1000,
      easing: 'linear',
      delay: function (el, i) {
        return (i * 500);
      },
      complete: anim_Final
    })
    .add({
      targets: '.mapa',
      opacity: [0, 1],
      easing: 'linear',
      duration: 1200
    })
}