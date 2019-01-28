$(document).ready(function() {

  var persoRyu = ".persoRyu";
  var minScreen = -5;
  var maxScreen = 355;
  var isRetourned = false;
  var maxScreenRight = "-325px";
  var maxScreenLeft = "-5px";
  var gameOver = false;

  // TOUCHES ACTION PERSO
    var punchLeft = 80;
    var punchRight = 75;
    var kickLeft = 76;
    var kickRight = 77;
    var shoryuken = 32;
    var hadouken = 65;
    var leftArrow = 39;
    var rightArrow = 37;
    var downArrow = 40;
    var jump = 38;
    var saltoAvant = 83;
    var damageRyu = 68;

    if ($('#js-lifebar-ryu').hasClass('life-bar-p2')){
      var leftArrow = 99;
      var rightArrow = 97;
      var downArrow = 98;
      var jump = 101;
      var punchLeft = 103;
      var punchRight = 104;
      var kickLeft = 100;
      var kickRight = 102;
      var shoryuken = 111;
      var hadouken = 106;
      var saltoAvant = 96;
      var damageRyu = 107;
    }
    else if ($('#js-lifebar-ryu').hasClass('life-bar-p1')){
      var punchLeft = 80;
      var punchRight = 75;
      var kickLeft = 76;
      var kickRight = 77;
      var shoryuken = 32;
      var hadouken = 65;
      var leftArrow = 39;
      var rightArrow = 37;
      var downArrow = 40;
      var jump = 38;
      var saltoAvant = 83;
      var damageRyu = 68;
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



// POSITION INITIAL DU PERSO
  var initialPosition = $(document).on("keyup", function() {
    // startIntervalMove();
    $(persoRyu).css({
      'background-position': '-8px 13px',
      'top': '115px',
      'height': '118px'
    });
  });



// ANIMATION DES COUPS STANDARD DU PERSO
  var animationFight = function(elem, position01, position02, position03){
    // stopIntervalMove();
    $(elem).css('background-position', position01);

    var timerPosition02 = setTimeout(function(){
    $(elem).css('background-position', position02);
    }, 150);

    var timerPosition03 = setTimeout(function(){
    $(elem).css('background-position', position03);
    }, 500);
  };


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

    // ANIMATION SHORYUKEN

    var animationShoryuken = function(){
      sound("soundFight", "./persos/ryu/sounds/Shoryuken.mp3", 1);
      animationFightSpecial($(persoRyu), [
        {
          spritePosition: '-8px -532px',
          spriteHeight: '118px',
          movementX: {
            direction: 'left',
            distance: '+=0px'
          },
          movementY: {
            direction: 'top',
            distance: '115px'
          },
          timeoutStep: 50
        },
        {
          spritePosition: '-66px -511px',
          spriteHeight: '118px',
          movementX: {
            direction: 'left',
            distance: '+=0px'
          },
          movementY: {
            direction: 'top',
            distance: '100px'
          },
          timeoutStep: 200
        },
        {
          spritePosition: '-138px -526px',
          spriteHeight: '118px',
          movementX: {
            direction: 'left',
            distance: '+=0px'
          },
          movementY: {
            direction: 'top',
            distance: '50px'
          },
          timeoutStep: 350
        },
        {
          spritePosition: '-210px -540px',
          spriteHeight: '118px',
          movementX: {
            direction: 'left',
            distance: '+=0px'
          },
          movementY: {
            direction: 'top',
            distance: '70px'
          },
          timeoutStep: 500
        },
        {
          spritePosition: '-286px -537px',
          spriteHeight: '118px',
          movementX: {
            direction: 'left',
            distance: '+=0px'
          },
          movementY: {
            direction: 'top',
            distance: '95px'
          },
          timeoutStep: 650
        },
        {
          spritePosition: '-8px 13px',
          spriteHeight: '118px',
          movementX: {
            direction: 'left',
            distance: '+=0px'
          },
          movementY: {
            direction: 'top',
            distance: '115px'
          },
          timeoutStep: 750
        },
      ])
    };


    // ANIMATION SALTO AVANT

    var animationSalto = function(direction, box){
      if (($(persoRyu).position().left) <= box - 70) {

        var jumps = [
          {
            id: 1,
            sound: "./persos/ryu/sounds/ryuJump1.mp3"
          },
          {
            id: 2,
            sound: "./persos/ryu/sounds/ryuJump2.mp3"
          },
        ];

        var jumpSound = jumps[Math.floor(Math.random() * jumps.length)];
        sound("soundFight", jumpSound.sound, 1);
        animationFightSpecial($(persoRyu), [
          // {
          //   spritePosition: '-80px -310px',
          //   spriteHeight: '118px',
          //   movementX: {
          //     direction: 'left',
          //     distance: '+=0px'
          //   },
          //   movementY: {
          //     direction: 'top',
          //     distance: '115px'
          //   },
          //   timeoutStep: 20
          // },
          {
            spritePosition: '-13px -415x',
            spriteHeight: '118px',
            movementX: {
              direction: 'left',
              distance: direction + '15px'
            },
            movementY: {
              direction: 'top',
              distance: '110px'
            },
            timeoutStep: 50
          },
          {
            spritePosition: '-80px -412px',
            spriteHeight: '95px',
            movementX: {
              direction: 'left',
              distance: direction + '15px'
            },
            movementY: {
              direction: 'top',
              distance: '90px'
            },
            timeoutStep: 150
          },
          {
            spritePosition: '-152px -407px',
            spriteHeight: '118px',
            movementX: {
              direction: 'left',
              distance: direction + '20px'
            },
            movementY: {
              direction: 'top',
              distance: '60px'
            },
            timeoutStep: 300
          },
          {
            spritePosition: '-234px 233px',
            spriteHeight: '118px',
            movementX: {
              direction: 'left',
              distance: direction + '15px'
            },
            movementY: {
              direction: 'top',
              distance: '90px'
            },
            timeoutStep: 450
          },
          {
            spritePosition: '-8px 13px',
            spriteHeight: '118px',
            movementX: {
              direction: 'left',
              distance: direction + '15px'
            },
            movementY: {
              direction: 'top',
              distance: '115px'
            },
            timeoutStep: 600
          },
        ])
      }
    };



  // var startIntervalMove = function (){
  //   console.log('startIntervalMove')
  //    stopIntervalMove();
  //   movingInterval = setInterval(function(){
  //     $('#js-perso').toggleClass('perso02');
  //   }, 1000);
  // }
  //
  // var stopIntervalMove = function(){
  //   console.log('stopIntervalMove')
  //   clearInterval(movingInterval)
  //   movingInterval = null
  // };




// DEPLACEMENTS DU PERSO

var background = document.getElementById("js-background");
background.style.backgroundPosition = '-15px';

    $(document).keydown(function (e) {

        if (e.which == leftArrow){
          isRetourned = false;
          var arene = $('.js-arene').attr('id');

          $(persoRyu).css("transform", "scaleX(+1)");

          if (($(persoRyu).position().left) >= maxScreen) {
            $(persoRyu).css("left", "+=0px");
              if(background.style.backgroundPosition == maxScreenRight+" center"){
              $('.psp-screen').css("background-position", "-=0px");
              }
              else {
              $('.psp-screen').css("background-position", "-=10px");
              }
          }
          else {
            sound("soundFight", "sounds/walk.mp3", 1);
            $(persoRyu).css("left", "+=15px");
          }
        }

        else if (e.which == rightArrow) {
          $(persoRyu).css("transform", "scaleX(-1)");
            isRetourned = true;
            if (($(persoRyu).position().left) <= minScreen) {
            $(persoRyu).css("left", "-=0px");
            if(background.style.backgroundPosition == maxScreenLeft+" center"){
            $('.psp-screen').css("background-position", "+=0px");
            }
            else {
            $('.psp-screen').css("background-position", "+=10px");
            }
          }
          else {
            sound("soundFight", "sounds/walk.mp3", 1);
            $(persoRyu).css("left", "-=15px");
          }
        }

         else if (e.which == downArrow) {
           $(persoRyu).off('perso02')
          $(persoRyu).css('background-position', '-520px 230px').css('top', '145px').css('height', '90px')
        }
    });


// LISTE DES COUPS

  $(document).on("keydown", function(e) {
    if (e.keyCode === punchLeft){
      sound("soundFight", "sounds/woosh.mp3", 1);
      animationFight(persoRyu, '-445px 10px', '-513px 10px', '-8px 13px');
    }
    else if (e.keyCode === punchRight){
      sound("soundFight", "sounds/woosh.mp3", 1);
      animationFight(persoRyu, '-456px -515px', '-524px -515px', '-8px 13px');
    }
    else if (e.keyCode === jump){
      sound("soundFight", "sounds/jump.mp3", 0.5);
      animationFight(persoRyu, '-80px -310px', '-140px -320px', '-8px 13px');
    }
    else if (e.keyCode === kickLeft){
      sound("soundFight", "sounds/woosh.mp3", 1);
      animationFight(persoRyu, '-16px -197px', '-390px -205px', '-8px 13px');
    }
    else if (e.keyCode === hadouken){
      sound("soundFight", "./persos/ryu/sounds/Hadouken.mp3", 1);
      animationFight(persoRyu, '-265px 10px', '-265px 10px', '-8px 13px');
      var positionPerso = ($(persoRyu).position().left)

        if (isRetourned === false){

          $(".boule-de-feu").css({
            'transform': 'scaleX(+1)',
            'display': 'block',
            'left': positionPerso += 60
          });

          var movementFireBall = setInterval(function (){
            var positionFireBall = $(".boule-de-feu").position().left

            if (positionFireBall >= maxScreen) {
              $(".boule-de-feu").fadeOut(200);
              clearInterval(movementFireBall)
            }
            else {
                $(".boule-de-feu").css('left', '+=25px')
            }
          }, 100)
        }

        else if (isRetourned === true){
          $(".boule-de-feu").css({
            'transform': 'scaleX(-1)',
            'display': 'block',
            'left': positionPerso -= 30
          });

          var movementFireBall = setInterval(function (){
            var positionFireBall = $(".boule-de-feu").position().left

            if (positionFireBall <= minScreen + 10) {
              $(".boule-de-feu").fadeOut(200);
              clearInterval(movementFireBall)
            }
            else {
                $(".boule-de-feu").css('left', '-=25px')
            }
          }, 100)
      }
    }
  });

  // GAME OVER
    var deathProgressRyu = document.getElementById("js-deathbar-ryu").style.width = 0;

    function loseGame(){
      $("#timer").css("transform", "translateX(-35%)")
      deathProgressRyu = 200;
      $(".death-bar").css('width', '200px;')

      document.getElementById('timer').innerHTML = '<span>GAME OVER</span>'

      gameOver = true;

      $(document).off('keydown');

    }



  // DEGATS
    function hitsRyu() {
      var grunts = [
        {
          id: 1,
          sound: "./persos/ryu/sounds/ryuGrunt1.mp3"
        },
        {
          id: 2,
          sound: "./persos/ryu/sounds/ryuGrunt2.mp3"
        },
        {
          id: 3,
          sound: "./persos/ryu/sounds/ryuGrunt3.mp3"
        },
      ];

      var grunt = grunts[Math.floor(Math.random() * grunts.length)];
      $(persoRyu).css({
        filter: "invert(0%) brightness(70%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2)"
      });
      setTimeout( function(){
      ($(persoRyu).css("filter", "none"))
      }, 200);

      deathProgressRyu += 30;
      if ($("#js-deathbar-ryu").hasClass("death-bar-p1")) {
        $(".death-bar-p1").css('width', '+=20px;');
      }
      else if ($("#js-deathbar-ryu").hasClass("death-bar-p2")) {
        $(".death-bar-p2").css('width', '+=20px;');
      }
      $(".perso-hit").css('display', 'block;');
      sound("soundFight", grunt.sound, 0.6);

      if (deathProgressRyu >= 300) {
        loseGame();
        sound("soundFight", "./persos/ryu/sounds/ryuGameOver.mp3", 1);

      }
    }


  $(document).on("keydown", function(e) {
    if (e.keyCode === shoryuken){
      animationShoryuken();
    }
    else if (e.keyCode === saltoAvant){
      animationSalto('+=', maxScreen);
    }
  });

  $(document).on("keydown", function(e) {
    if (e.keyCode === damageRyu && gameOver === false) {
      hitsRyu()
    }
  })


});
