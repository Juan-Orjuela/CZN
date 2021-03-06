//set default view mode
$defaultViewMode = "full"; //full (fullscreen background), fit (fit to window), original (no scale)
//cache vars
$bg = $("#bg");
$bgimg = $("#bg #bgimg");
$preloader = $("#preloader");
$outer_containerGal = $("#outer_containerGal");
$outer_containerGal_a = $("#outer_containerGal a.thumb_link");
$toolbar = $("#toolbar");
$nextimage_tip = $("#nextimage_tip");
$texto = $('#texto');

$(window).load(function () {
  $toolbar.data("imageViewMode", $defaultViewMode); //default view mode
  ImageViewMode($toolbar.data("imageViewMode"));
  //cache vars
  $customScrollBox = $("#customScrollBox");
  $customScrollBox_containerGal = $("#customScrollBox .containerGal");
  $customScrollBox_content = $("#customScrollBox .content");
  $dragger_containerGal = $("#dragger_containerGal");
  $dragger = $("#dragger");

  CustomScroller();

  function CustomScroller() {
    outerMargin = 0;
    innerMargin = 20;
    $customScrollBox.height($(window).height() - outerMargin);
    $dragger_containerGal.height($(window).height() - innerMargin);
    visibleHeight = $(window).height() - outerMargin;
    if ($customScrollBox_containerGal.height() > visibleHeight) { //custom scroll depends on content height
      $dragger_containerGal, $dragger.css("display", "block");
      totalContent = $customScrollBox_content.height();
      draggercontainerGalHeight = $(window).height() - innerMargin;
      animSpeed = 400; //animation speed
      easeType = "easeOutCirc"; //easing type
      bottomSpace = 1.05; //bottom scrolling space
      targY = 0;
      draggerHeight = $dragger.height();
      $dragger.draggable({
        axis: "y",
        containment: "parent",
        drag: function (event, ui) {
          Scroll();
        },
        stop: function (event, ui) {
          DraggerOut();
        }
      });

      //scrollbar click
      $dragger_containerGal.click(function (e) {
        var mouseCoord = (e.pageY - $(this).offset().top);
        var targetPos = mouseCoord + $dragger.height();
        if (targetPos < draggercontainerGalHeight) {
          $dragger.css("top", mouseCoord);
          Scroll();
        } else {
          $dragger.css("top", draggercontainerGalHeight - $dragger.height());
          Scroll();
        }
      });

      //mousewheel
      $(function ($) {
        $customScrollBox.bind("mousewheel", function (event, delta) {
          vel = Math.abs(delta * 10);
          $dragger.css("top", $dragger.position().top - (delta * vel));
          Scroll();
          if ($dragger.position().top < 0) {
            $dragger.css("top", 0);
            $customScrollBox_containerGal.stop();
            Scroll();
          }
          if ($dragger.position().top > draggercontainerGalHeight - $dragger.height()) {
            $dragger.css("top", draggercontainerGalHeight - $dragger.height());
            $customScrollBox_containerGal.stop();
            Scroll();
          }
          return false;
        });
      });

      function Scroll() {
        var scrollAmount = (totalContent - (visibleHeight / bottomSpace)) / (draggercontainerGalHeight - draggerHeight);
        var draggerY = $dragger.position().top;
        targY = -draggerY * scrollAmount;
        var thePos = $customScrollBox_containerGal.position().top - targY;
        $customScrollBox_containerGal.stop().animate({ top: "-=" + thePos }, animSpeed, easeType); //with easing
      }

      //dragger hover
      $dragger.mouseup(function () {
        DraggerOut();
      }).mousedown(function () {
        DraggerOver();
      });

      function DraggerOver() {
        $dragger.css("background", "url(round_custom_scrollbar_bg_over.png)");
      }

      function DraggerOut() {
        $dragger.css("background", "url(round_custom_scrollbar_bg.png)");
      }
    } else { //hide custom scrollbar if content is short
      $dragger, $dragger_containerGal.css("display", "none");
    }
  }

  //resize browser window functions
  $(window).resize(function () {
    FullScreenBackground("#bgimg"); //scale bg image
    $dragger.css("top", 0); //reset content scroll
    $customScrollBox_containerGal.css("top", 0);
    $customScrollBox.unbind("mousewheel");
    CustomScroller();
  });

  LargeImageLoad($bgimg);
});

//loading bg image
$bgimg.load(function () {
  LargeImageLoad($(this));
});

function LargeImageLoad($this) {
  $preloader.fadeOut("fast"); //hide preloader
  $this.removeAttr("width").removeAttr("height").css({ width: "", height: "" }); //lose all previous dimensions in order to rescale new image data
  $bg.data("originalImageWidth", $this.width()).data("originalImageHeight", $this.height());
  if ($bg.data("newTitle")) {
    $this.attr("title", $bg.data("newTitle")); //set new image title attribute
  }
  FullScreenBackground($this); //scale new image
  $bg.data("nextImage", $($outer_containerGal.data("selectedThumb")).next().attr("href")); //get and store next image
  if (typeof itemIndex != "undefined") {
    if (itemIndex == lastItemIndex) { //check if it is the last image
      $bg.data("lastImageReached", "Y");
      $bg.data("nextImage", $outer_containerGal_a.first().attr("href")); //get and store next image
    } else {
      $bg.data("lastImageReached", "N");
    }
  } else {
    $bg.data("lastImageReached", "N");
  }
  $this.fadeIn("slow"); //fadein background image
  if ( ($bg.data("nextImage") || $bg.data("lastImageReached") == "Y") && primeraVez > 1 ) { //don't close thumbs pane on 1st load
    SlidePanels("close"); //close the left pane
  }
  NextImageTip();
}
//slide in/out left pane
$outer_containerGal.hover(
  function () { //mouse over
    SlidePanels("open");
  },
  function () { //mouse out
    SlidePanels("close");
  }
);
var primeraVez = 0;
function cambiarFondo(event) {
  primeraVez++;
  event.preventDefault();
  var $this = this;
  var mini = $(this).children(".selected + img").attr('alt');
  $bgimg.css("display", "none");
  $preloader.fadeIn("fast"); //show preloader
  //style clicked thumbnail
  $outer_containerGal_a.each(function () {
    $(this).children(".selected").css("display", "none");
  });
  $(this).children(".selected").css("display", "block");
  //get and store next image and selected thumb 
  $outer_containerGal.data("selectedThumb", $this);
  $bg.data("nextImage", $(this).next().attr("href"));
  $bg.data("newTitle", $(this).children("img").attr("title")); //get and store new image title attribute
  itemIndex = getIndex($this); //get clicked item index
  lastItemIndex = ($outer_containerGal_a.length) - 1; //get last item index
  $bgimg.attr("src", "").attr("src", $this); //switch image
  $texto.text(mini);
}
//Clicking on thumbnail changes the background image
$outer_containerGal_a.click(cambiarFondo);
$('.thumb_link.inicial').trigger( "click" );
//clicking on large image loads the next one
$bgimg.click(function (event) {
  var $this = $(this);
  if ($bg.data("nextImage")) { //if next image data is stored
    $this.css("display", "none");
    $preloader.fadeIn("fast"); //show preloader
    $($outer_containerGal.data("selectedThumb")).children(".selected").css("display", "none"); //deselect thumb
    var mini = $($outer_containerGal.data("selectedThumb")).next().children(".selected + img").attr('alt');
    if ($bg.data("lastImageReached") != "Y") {
      $($outer_containerGal.data("selectedThumb")).next().children(".selected").css("display", "block"); //select new thumb
      $texto.text(mini);
    } else {
      $outer_containerGal_a.first().children(".selected").css("display", "block"); //select new thumb - first
      mini = $outer_containerGal_a.first().children(".selected + img").attr('alt');
      $texto.text(mini);
    }
    //store new selected thumb
    var selThumb = $outer_containerGal.data("selectedThumb");
    if ($bg.data("lastImageReached") != "Y") {
      $outer_containerGal.data("selectedThumb", $(selThumb).next());
    } else {
      $outer_containerGal.data("selectedThumb", $outer_containerGal_a.first());
    }
    $bg.data("newTitle", $($outer_containerGal.data("selectedThumb")).children("img").attr("title")); //get and store new image title attribute
    if ($bg.data("lastImageReached") != "Y") {
      itemIndex++;
    } else {
      itemIndex = 0;
    }
    $this.attr("src", "").attr("src", $bg.data("nextImage")); //switch image
  }
});

//function to get element index (fuck you IE!)
function getIndex(theItem) {
  for (var i = 0, length = $outer_containerGal_a.length; i < length; i++) {
    if ($outer_containerGal_a[i] === theItem) {
      return i;
    }
  }
}

//toolbar (image view mode button) hover
$toolbar.hover(
  function () { //mouse over
    $(this).stop().fadeTo("fast", 1);
  },
  function () { //mouse out
    $(this).stop().fadeTo("fast", 0.8);
  }
);
$toolbar.stop().fadeTo("fast", 0.8); //set its original state

//Clicking on toolbar changes the image view mode
$toolbar.click(function (event) {
  if ($toolbar.data("imageViewMode") == "full") {
    ImageViewMode("fit");
  } else if ($toolbar.data("imageViewMode") == "fit") {
    ImageViewMode("original");
  } else if ($toolbar.data("imageViewMode") == "original") {
    ImageViewMode("full");
  }
});

//next image balloon tip
function NextImageTip() {
  if ($bg.data("nextImage")) { //check if this is the first image
    $nextimage_tip.stop().css("right", 20).fadeIn("fast").fadeOut(2000, "easeInExpo", function () { $nextimage_tip.css("right", $(window).width()); });
  }
}

//slide in/out left pane function
function SlidePanels(action) {
  var speed = 400;
  var easing = "easeInOutSine";
  if (action == "open") {
    $("#arrow_indicator").fadeTo("fast", 0);
    $outer_containerGal.stop().animate({ left: 0 }, speed, easing);
    $bg.stop().animate({ left: 570 }, speed, easing);
  } else {
    $outer_containerGal.stop().animate({ left: -570 }, speed, easing);
    $bg.stop().animate({ left: 0 }, speed, easing, function () { $("#arrow_indicator").fadeTo("fast", 1); });
  }
}

//Image scale function
function FullScreenBackground(theItem) {
  var winWidth = $(window).width();
  var winHeight = $(window).height();
  var imageWidth = $(theItem).width();
  var imageHeight = $(theItem).height();
  if ($toolbar.data("imageViewMode") != "original") { //scale
    $(theItem).removeClass("with_border").removeClass("with_shadow"); //remove extra styles of orininal view mode
    var picHeight = imageHeight / imageWidth;
    var picWidth = imageWidth / imageHeight;
    if ($toolbar.data("imageViewMode") != "fit") { //image view mode: full
      if ((winHeight / winWidth) < picHeight) {
        $(theItem).css("width", winWidth).css("height", picHeight * winWidth);
      } else {
        $(theItem).css("height", winHeight).css("width", picWidth * winHeight);
      };
    } else { //image view mode: fit
      if ((winHeight / winWidth) > picHeight) {
        $(theItem).css("width", winWidth).css("height", picHeight * winWidth);
      } else {
        $(theItem).css("height", winHeight).css("width", picWidth * winHeight);
      };
    }
    //center it
    $(theItem).css("margin-left", ((winWidth - $(theItem).width()) / 2)).css("margin-top", ((winHeight - $(theItem).height()) / 2));
  } else { //no scale
    //add extra styles for orininal view mode
    $(theItem).addClass("with_border").addClass("with_shadow");
    //set original dimensions
    $(theItem).css("width", $bg.data("originalImageWidth")).css("height", $bg.data("originalImageHeight"));
    //center it
    $(theItem).css("margin-left", ((winWidth - $(theItem).outerWidth()) / 2)).css("margin-top", ((winHeight - $(theItem).outerHeight()) / 2));
  }
}

//image view mode function - full or fit
function ImageViewMode(theMode) {
  $toolbar.data("imageViewMode", theMode); //store new mode
  FullScreenBackground($bgimg); //scale bg image
  //re-style button
  if (theMode == "full") {
    $toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> FULL");
  } else if (theMode == "fit") {
    $toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> FIT");
  } else {
    $toolbar.html("<span class='lightgrey'>IMAGE VIEW MODE &rsaquo;</span> ORIGINAL");
  }
}

//preload script images
var images = ["gal/ajax-loader_dark.gif", "gal/round_custom_scrollbar_bg_over.png"];
$.each(images, function (i) {
  images[i] = new Image();
  images[i].src = this;
});