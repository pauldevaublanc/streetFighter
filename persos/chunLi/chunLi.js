$(document).ready(function() {

  var persochunLi = ".persoChunLi";
  var minScreen = 15;
  var maxScreen = 355;
  var isRetourned = true;
  var maxScreenRight = "-325px";
  var maxScreenLeft = "-5px";
  var dead = false;
  var gameOver = false;
  var deathProgressChunLi = document.getElementById("js-deathbar-chunli").style.width = 0;

  // TOUCHES ACTION PERSO
    if ($('#js-lifebar-chunli').hasClass('life-bar-p2')){
      var leftArrow = 99;
      var rightArrow = 97;
      var downArrow = 98;
      var jump = 101;
      var punchChunLi = 103;
      var kickChunLi = 104;
      var damageChunLi = 107;
    }
    else if ($('#js-lifebar-chunli').hasClass('life-bar-p1')){
      var leftArrow = 39;
      var rightArrow = 37;
      var downArrow = 40;
      var jump = 38;
      var punchChunLi = 80;
      var kickChunLi = 77;
      var damageChunLi = 68;
    }



// MUSIQUE DES NIVEAUX ET SONS DES COUPS
  function sound(idElement, src, volume) {
    this.sound = document.getElementById(idElement)
    this.sound.src = src;
    this.sound.volume = volume;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("autoplay", "true");
    this.sound.style.display = "none";
    this.play = function(){
        this.sound.play();
    }

}

// POSITION INITIAL CHUNLI
  var initialPosition = $(document).on("keyup", function() {
    $(persochunLi).removeClass('chunli-walk');
    // startIntervalMove();
    if (dead === false){
      $(persochunLi).css({
        'background-position': '-44px 13px',
        'top': '146px',
        'height': '80px',
        'width': '48px'
      });
    }
  });


// LANCEMENT DE LA PARTIE
  $(".js-button").on("click", function () {


// CHOIX DU NIVEAU
    var changeStage = function(id){
        if (id == 01){
          maxScreenRight = "-65px";
        }
        else if (id == 05){
            maxScreenRight = "-155px"
        }
        else if (id == 06){
            maxScreenRight = "-315px"
        }
    }

    $('.js-arene').on('click', function(){
      changeStage($(this).attr('id'))
    });
  });


  var animationFightClassic = function(elem, sequences) {
    sequences.map(function (sequence){
      setTimeout(function(){
        $(elem).css('background-position', sequence.spritePosition)
        $(elem).css('height', sequence.spriteHeight)
        $(elem).css('width', sequence.spriteWidth)
        $(elem).css('top', sequence.spritePlacement)
      }, sequence.timeoutStep)
    })
  }


  var animationPunch = function(){
    animationFightClassic($(persochunLi), [
      {
        spritePosition: '-134px 0px',
        spriteHeight: '66px',
        spriteWidth: '49px',
        spritePlacement: '162px',
        timeoutStep: 50
      },
      {
        spritePosition: '-235px -0px',
        spriteHeight: '69px',
        spriteWidth: '66px',
        spritePlacement: '160px',
        timeoutStep: 200
      },
      {
        spritePosition: '-44px 13px',
        spriteHeight: '80px',
        spriteWidth: '48px',
        spritePlacement: '146px',
        timeoutStep: 500
      },
    ])
  }


  var animationKick = function(){
    animationFightClassic($(persochunLi), [
      {
        spritePosition: '-132px 189px',
        spriteHeight: '79px',
        spriteWidth: '64px',
        spritePlacement: '146px',
        timeoutStep: 100
      },
      {
        spritePosition: '9px 189px',
        spriteHeight: '80px',
        spriteWidth: '77px',
        spritePlacement: '146px',
        timeoutStep: 200
      },
      {
        spritePosition: '9px 109px',
        spriteHeight: '70px',
        spriteWidth: '85px',
        spritePlacement: '153px',
        timeoutStep: 300
      },
      {
        spritePosition: '-67px 185px',
        spriteHeight: '72px',
        spriteWidth: '64px',
        spritePlacement: '150px',
        timeoutStep: 400
      },
      {
        spritePosition: '9px 109px',
        spriteHeight: '70px',
        spriteWidth: '85px',
        spritePlacement: '153px',
        timeoutStep: 500
      },
      {
        spritePosition: '9px 189px',
        spriteHeight: '80px',
        spriteWidth: '77px',
        spritePlacement: '146px',
        timeoutStep: 600
      },
      {
        spritePosition: '9px 109px',
        spriteHeight: '70px',
        spriteWidth: '85px',
        spritePlacement: '153px',
        timeoutStep: 700
      },
      {
        spritePosition: '-67px 185px',
        spriteHeight: '72px',
        spriteWidth: '64px',
        spritePlacement: '150px',
        timeoutStep: 800
      },
      {
        spritePosition: '9px 109px',
        spriteHeight: '70px',
        spriteWidth: '85px',
        spritePlacement: '153px',
        timeoutStep: 900
      },
      {
        spritePosition: '-67px 185px',
        spriteHeight: '72px',
        spriteWidth: '64px',
        spritePlacement: '150px',
        timeoutStep: 1000
      },
      {
        spritePosition: '-44px 13px',
        spriteHeight: '80px',
        spriteWidth: '48px',
        spritePlacement: '146px',
        timeoutStep: 1100
      }
    ])
  }



  // ANIMATION DES COUPS SPECIAUX DU PERSO
    var animationFightSpecial = function(elem, sequences) {
      sequences.map(function (sequence){
        setTimeout(function(){
          $(elem).css('background-position', sequence.spritePosition)
          $(elem).css('height', sequence.spriteHeight)
          $(elem).css({
            [sequence.movementX.direction]: sequence.movementX.distance,
            [sequence.movementY.direction]: sequence.movementY.distance
          })
        }, sequence.timeoutStep)
      })
    }


// DEPLACEMENTS DU PERSO

var background = document.getElementById("js-background");
background.style.backgroundPosition = '-15px';

    $(document).keydown(function (e) {

        if (e.which == leftArrow){
          $(persochunLi).addClass('chunli-walk');
          isRetourned = false;
          var arene = $('.js-arene').attr('id');

          $(persochunLi).css("transform", "scaleX(+1)");

          if (($(persochunLi).position().left) >= maxScreen) {
            $(persochunLi).css("left", "+=0px");
            if (background.style.backgroundPosition == maxScreenRight+" center"){
            $('.psp-screen').css("background-position", "-=0px");
            }
            else {
            $('.psp-screen').css("background-position", "-=10px");
            }
          }
          else {
            sound("soundFight", "sounds/walk.mp3", 1);
            $(persochunLi).css("left", "+=15px");
          }
        }

        else if (e.which == rightArrow) {
          $(persochunLi).addClass('chunli-walk');
          $(persochunLi).css("transform", "scaleX(-1)");
            isRetourned = true;
            if (($(persochunLi).position().left) <= minScreen) {
            $(persochunLi).css("left", "-=0px");
            if(background.style.backgroundPosition == maxScreenLeft+" center"){
            $('.psp-screen').css("background-position", "+=0px");
            }
            else {
            $('.psp-screen').css("background-position", "+=10px");
            }
          }
          else {
            sound("soundFight", "sounds/walk.mp3", 1);
            $(persochunLi).css("left", "-=15px");
          }
        }

         else if (e.which == downArrow) {

          $(persochunLi).css('background-position', '-125px -64px').css('top', '173px').css('height', '54px').css('width', '47px')
        }

        else if (e.which == jump) {
         sound("soundFight", "sounds/jump.mp3", 1);
         $(persochunLi).css('background-position', '-41px -66px').css('top', '143px').css('height', '49px').css('width', '37px')
       }
    });


// LISTE DES COUPS

  $(document).on("keydown", function(e) {
    if (e.keyCode === punchChunLi){
    sound("soundFight", "sounds/woosh.mp3", 1);
    animationPunch();
    }
    else if (e.keyCode === kickChunLi){
    sound("soundFight", "./persos/chunLi/sounds/chunLiSpecial.mp3", 1);
    animationKick();
    }
});



// GAME OVER
  function loseGame(){
    $("#timer").css("transform", "translateX(-35%)")
    document.getElementById('timer').innerHTML = '<span>GAME OVER</span>'
    gameOver = true;
    $(document).off('keydown');
  }

// ANIMATION KO

  var animationKO = function(elem, sequences) {
    sequences.map(function (sequence){
      setTimeout(function(){
        $(elem).css('background-position', sequence.spritePosition)
        $(elem).css('height', sequence.spriteHeight)
        $(elem).css('width', sequence.spriteWidth)
        $(elem).css('top', sequence.spritePlacement)
      }, sequence.timeoutStep)
        dead = true;
    })
  }

var animationKOChunLi = function(){

  animationKO($(persochunLi), [
    {
      spritePosition: '-256px -172px',
      spriteHeight: '70px',
      spriteWidth: '56px',
      spritePlacement: '158px',
      timeoutStep: 250
    },
    {
      spritePosition: '-47px -222px',
      spriteHeight: '30px',
      spriteWidth: '80px',
      spritePlacement: '197px',
      timeoutStep: 500
    },
    {
      spritePosition: '-48px -252px',
      spriteHeight: '32px',
      spriteWidth: '86px',
      spritePlacement: '204px',
      timeoutStep: 750
    },
  ])

};


// DEGATS
  function hitsChunLi() {
    var grunts = [
      {
        id: 1,
        sound: "./persos/chunLi/sounds/chunLiGrunt1.mp3"
      },
      {
        id: 2,
        sound: "./persos/chunLi/sounds/chunLiGrunt2.mp3"
      },
      {
        id: 3,
        sound: "./persos/chunLi/sounds/chunLiGrunt3.mp3"
      },
    ];

    var grunt = grunts[Math.floor(Math.random() * grunts.length)];
    $(persochunLi).css({
      filter: "invert(0%) brightness(70%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2)"
    });
    setTimeout( function(){
    ($(persochunLi).css("filter", "none"))
    }, 200);

    deathProgressChunLi += 30;
    if ($("#js-deathbar-chunli").hasClass("death-bar-p1")) {
      $(".death-bar-p1").css('width', '+=20px;');
    }
    else if ($("#js-deathbar-chunli").hasClass("death-bar-p2")) {
      $(".death-bar-p2").css('width', '+=20px;');
    }

    $(".perso-hit").css('display', 'block;');
    sound("soundFight", grunt.sound, 0.6);

    if (deathProgressChunLi >= 300) {
      loseGame();
      animationKOChunLi();
      sound("soundFight", "./persos/chunLi/sounds/chunLiGameOver.mp3", 1);

    }
  }

  $(document).on("keydown", function(e) {
    if (e.keyCode === damageChunLi && gameOver === false) {
      hitsChunLi();
    }
  })




});
