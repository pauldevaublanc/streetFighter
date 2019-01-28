$(document).ready(function() {

  var persoKen = ".persoKen";
  var minScreen = 15;
  var maxScreen = 355;
  var isRetourned = true;
  var maxScreenRight = "-325px";
  var maxScreenLeft = "-5px";
  var dead = false;
  var gameOver = false;
  var deathProgressKen = document.getElementById("js-deathbar-ken").style.width = 0;

  // TOUCHES ACTION PERSO

    if ($('#js-lifebar-ken').hasClass('life-bar-p2')){
      var leftArrow = 99;
      var rightArrow = 97;
      var downArrow = 98;
      var jump = 101;
      var punchKen = 103;
      var kickKen = 104;
      var damageKen = 107;
      var haduken = 109;
  }
  else if ($('#js-lifebar-ken').hasClass('life-bar-p1')){
    var leftArrow = 39;
    var rightArrow = 37;
    var downArrow = 40;
    var jump = 38;
    var punchKen = 80;
    var kickKen = 77;
    var damageKen = 68;
    var haduken = 65;
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

// POSITION INITIAL KEN
  var initialPosition = $(document).on("keyup", function() {
    $(persoKen).removeClass('ken-walk');
    // startIntervalMove();
    if (dead === false){
      $(persoKen).css({
        'background-position': '-40px 13px',
        'top': '142px',
        'height': '85px',
        'width': '38px'
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

  var animationHadukenKen = function(){
    animationFightClassic($(persoKen), [
      {
        spritePosition: '-250px -260px',
        spriteHeight: '84px',
        spriteWidth: '70px',
        spritePlacement: '162px',
        timeoutStep: 50
      },
      {
        spritePosition: '-40px 13px',
        spriteHeight: '85px',
        spriteWidth: '38px',
        spritePlacement: '142px',
        timeoutStep: 800
      },
    ])
  }

  var animationPunch = function(){
    animationFightClassic($(persoKen), [
      {
        spritePosition: '-237px -98px',
        spriteHeight: '84px',
        spriteWidth: '50px',
        spritePlacement: '142px',
        timeoutStep: 50
      },
      {
        spritePosition: '-258px -188px',
        spriteHeight: '72px',
        spriteWidth: '61px',
        spritePlacement: '155px',
        timeoutStep: 200
      },
      {
        spritePosition: '-40px 13px',
        spriteHeight: '85px',
        spriteWidth: '38px',
        spritePlacement: '142px',
        timeoutStep: 500
      },
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
          $(persoKen).addClass('ken-walk');
          isRetourned = false;
          var arene = $('.js-arene').attr('id');

          $(persoKen).css("transform", "scaleX(+1)");

          if (($(persoKen).position().left) >= maxScreen) {
            $(persoKen).css("left", "+=0px");
            if (background.style.backgroundPosition == maxScreenRight+" center"){
            $('.psp-screen').css("background-position", "-=0px");
            }
            else {
            $('.psp-screen').css("background-position", "-=10px");
            }
          }
          else {
            sound("soundFight", "sounds/walk.mp3", 1);
            $(persoKen).css("left", "+=15px");
          }
        }

        else if (e.which == rightArrow) {

          $(persoKen).css("transform", "scaleX(-1)");
          $(persoKen).addClass('ken-walk');
            isRetourned = true;
            if (($(persoKen).position().left) <= minScreen) {
            $(persoKen).css("left", "-=0px");
            if(background.style.backgroundPosition == maxScreenLeft+" center"){
            $('.psp-screen').css("background-position", "+=0px");
            }
            else {
            $('.psp-screen').css("background-position", "+=10px");
            }
          }
          else {
            sound("soundFight", "sounds/walk.mp3", 1);
            $(persoKen).css("left", "-=15px");
          }
        }

         else if (e.which == downArrow) {

          $(persoKen).css('background-position', '2px -120px').css('top', '175px').css('height', '52px').css('width', '43px')
        }

        else if (e.which == jump) {
         sound("soundFight", "sounds/jump.mp3", 1);
         $(persoKen).css('background-position', '-40px -73px').css('top', '137px').css('height', '84px').css('width', '30px')
       }
    });


// LISTE DES COUPS

  $(document).on("keydown", function(e) {
    if (e.keyCode === haduken){
    sound("soundFight", "./persos/ken/sounds/hadouken.mp3", 1);
    animationHadukenKen();
    var positionPerso = ($(persoKen).position().left)

      if (isRetourned === false){

        $(".fireBall-ken").css({
          'transform': 'scaleX(+1)',
          'display': 'block',
          'left': positionPerso += 30
        });

        var movementFireBall = setInterval(function (){
          var positionFireBall = $(".fireBall-ken").position().left

          if (positionFireBall >= maxScreen) {
            $(".fireBall-ken").fadeOut(200);
            clearInterval(movementFireBall)
          }
          else {
              $(".fireBall-ken").css('left', '+=25px')
          }
        }, 100)
      }

      else if (isRetourned === true){
        $(".fireBall-ken").css({
          'transform': 'scaleX(-1)',
          'display': 'block',
          'left': positionPerso -= 30
        });

        var movementFireBall = setInterval(function (){
          var positionFireBall = $(".fireBall-ken").position().left

          if (positionFireBall <= minScreen + 10) {
            $(".fireBall-ken").fadeOut(200);
            clearInterval(movementFireBall)
          }
          else {
              $(".fireBall-ken").css('left', '-=25px')
          }
        }, 100)
    }
  }

  else if (e.keyCode === punchKen){
  sound("soundFight", "sounds/woosh.mp3", 1);
  animationPunch();
  }
});




// var startIntervalMove = function (){
//   console.log('startIntervalMove')
//    stopIntervalMove();
//   movingInterval = setInterval(function(){
//     $('#js-perso').toggleClass('persoKen');
//   }, 1000);
// }
//
// var stopIntervalMove = function(){
//   console.log('stopIntervalMove')
//   clearInterval(movingInterval)
//   movingInterval = null
// };


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

var animationKOKen = function(){

  animationKO($(persoKen), [
    {
      spritePosition: '-82px -176px',
      spriteHeight: '71px',
      spriteWidth: '47px',
      spritePlacement: '155px',
      timeoutStep: 250
    },
    {
      spritePosition: '-76px -404px',
      spriteHeight: '55px',
      spriteWidth: '65px',
      spritePlacement: '179px',
      timeoutStep: 500
    },
    {
      spritePosition: '-81px -247px',
      spriteHeight: '37px',
      spriteWidth: '89px',
      spritePlacement: '195px',
      timeoutStep: 750
    },
  ])

};


// DEGATS
  function hitsKen() {
    var grunts = [
      {
        id: 1,
        sound: "./persos/ken/sounds/kenGrunt1.mp3"
      },
      {
        id: 2,
        sound: "./persos/ken/sounds/kenGrunt2.mp3"
      },
      {
        id: 3,
        sound: "./persos/ken/sounds/kenGrunt3.mp3"
      },
    ];

    var grunt = grunts[Math.floor(Math.random() * grunts.length)];
    $(persoKen).css({
      filter: "invert(0%) brightness(70%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2)"
    });
    setTimeout( function(){
    ($(persoKen).css("filter", "none"))
    }, 200);

    deathProgressKen += 30;
    if ($("#js-deathbar-ken").hasClass("death-bar-p1")) {
      $(".death-bar-p1").css('width', '+=20px;');
    }
    else if ($("#js-deathbar-ken").hasClass("death-bar-p2")) {
      $(".death-bar-p2").css('width', '+=20px;');
    }

    $(".perso-hit").css('display', 'block;');
    sound("soundFight", grunt.sound, 0.6);

    if (deathProgressKen >= 300) {
      loseGame();
      animationKOKen();
      sound("soundFight", "./persos/ken/sounds/kenGameOver.mp3", 1);

    }
  }

  $(document).on("keydown", function(e) {
    if (e.keyCode === damageKen && gameOver === false) {
      hitsKen();
    }
  })




});
