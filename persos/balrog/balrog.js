$(document).ready(function() {

  var persobalrog = ".persoBalrog";
  var minScreen = 15;
  var maxScreen = 355;
  var isRetourned = true;
  var maxScreenRight = "-325px";
  var maxScreenLeft = "-5px";
  var dead = false;
  var gameOver = false;
  var deathProgressBalrog = document.getElementById("js-deathbar-balrog").style.width = 0;

  // TOUCHES ACTION PERSO
    if ($('#js-lifebar-balrog').hasClass('life-bar-p2')){
      var leftArrow = 99;
      var rightArrow = 97;
      var downArrow = 98;
      var jump = 101;
      var punchBalrog = 103;
      var kickBalrog = 104;
      var damageBalrog = 107;
    }
    else if ($('#js-lifebar-balrog').hasClass('life-bar-p1')){
      var leftArrow = 39;
      var rightArrow = 37;
      var downArrow = 40;
      var jump = 38;
      var punchBalrog = 80;
      var kickBalrog = 77;
      var damageBalrog = 68;
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
    // startIntervalMove();
    $(persobalrog).removeClass('balrog-walk');
    $(persobalrog).removeClass('balrog-punch-right');
    $(persobalrog).removeClass('balrog-punch-left');
    $(persobalrog).removeClass('balrog-jump');
    if (dead === false){
      $(persobalrog).css({
        'background-position': '-79px 0px',
        'top': '149px',
        'height': '80px',
        'width': '40px'
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
          $(persobalrog).addClass('balrog-walk');
          isRetourned = false;
          var arene = $('.js-arene').attr('id');

          $(persobalrog).css("transform", "scaleX(+1)");

          if (($(persobalrog).position().left) >= maxScreen) {

            $(persobalrog).css("left", "+=0px");
            if (background.style.backgroundPosition == maxScreenRight+" center"){
            $('.psp-screen').css("background-position", "-=0px");
            }
            else {
            $('.psp-screen').css("background-position", "-=10px");
            }
          }
          else {

            sound("soundFight", "sounds/walk.mp3", 1);
            $(persobalrog).css("left", "+=15px");

          }
        }

        else if (e.which == rightArrow) {
          $(persobalrog).addClass('balrog-walk');
          $(persobalrog).css("transform", "scaleX(-1)");
            isRetourned = true;
            if (($(persobalrog).position().left) <= minScreen) {
            $(persobalrog).css("left", "-=0px");
            if(background.style.backgroundPosition == maxScreenLeft+" center"){
            $('.psp-screen').css("background-position", "+=0px");
            }
            else {
            $('.psp-screen').css("background-position", "+=10px");
            }
          }
          else {

            sound("soundFight", "sounds/walk.mp3", 1);
            $(persobalrog).css("left", "-=15px");
          }
        }

         else if (e.which == downArrow) {

          $(persobalrog).css('background-position', '2px 0px').css('top', '174px').css('height', '57px').css('width', '40px')
        }

        else if (e.which == jump) {
          $(persobalrog).addClass('balrog-jump');
         sound("soundFight", "sounds/jump.mp3", 1);

       }
    });


// LISTE DES COUPS

  $(document).on("keydown", function(e) {
    if (e.keyCode === punchBalrog){
    sound("soundFight", "./persos/balrog/sounds/balrogPunch1.mp3", 1);
    $(persobalrog).addClass('balrog-punch-right');
    }
    else if (e.keyCode === kickBalrog){
      $(persobalrog).addClass('balrog-punch-left');
    sound("soundFight", "./persos/balrog/sounds/balrogPunch2.mp3", 1);
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

var animationKOBalrog = function(){

  animationKO($(persobalrog), [
    {
      spritePosition: '-122px -388px',
      spriteHeight: '73px',
      spriteWidth: '44px',
      spritePlacement: '157px',
      timeoutStep: 250
    },
    {
      spritePosition: '-59px -143px',
      spriteHeight: '38px',
      spriteWidth: '71px',
      spritePlacement: '192px',
      timeoutStep: 500
    },
    {
      spritePosition: '-60px -180px',
      spriteHeight: '34px',
      spriteWidth: '80px',
      spritePlacement: '199px',
      timeoutStep: 750
    },
  ])

};


// DEGATS
  function hitsBalrog() {
    var grunts = [
      {
        id: 1,
        sound: "./persos/balrog/sounds/balrogGrunt1.mp3"
      },
      {
        id: 2,
        sound: "./persos/balrog/sounds/balrogGrunt2.mp3"
      },
      {
        id: 3,
        sound: "./persos/balrog/sounds/balrogGrunt3.mp3"
      },
    ];

    var grunt = grunts[Math.floor(Math.random() * grunts.length)];
    $(persobalrog).css({
      filter: "invert(0%) brightness(70%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2)"
    });
    setTimeout( function(){
    ($(persobalrog).css("filter", "none"))
    }, 200);

    deathProgressBalrog += 30;
    if ($("#js-deathbar-balrog").hasClass("death-bar-p1")) {
      $(".death-bar-p1").css('width', '+=20px;');
    }
    else if ($("#js-deathbar-balrog").hasClass("death-bar-p2")) {
      $(".death-bar-p2").css('width', '+=20px;');
    }

    $(".perso-hit").css('display', 'block;');
    sound("soundFight", grunt.sound, 0.6);

    if (deathProgressBalrog >= 300) {
      loseGame();
      animationKOBalrog();
      sound("soundFight", "./persos/balrog/sounds/balrogGameOver.mp3", 1);

    }
  }

  $(document).on("keydown", function(e) {
    if (e.keyCode === damageBalrog && gameOver === false) {
      hitsBalrog();
    }
  })




});
