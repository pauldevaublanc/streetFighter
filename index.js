$(document).ready(function() {

  var persoRyu = ".persoRyu";
  var persoKen = ".persoKen";
  var persoChunLi = ".persoChunLi";
  var persoBalrog = ".persoBalrog";
  var timeGame = 100;
  var minScreen = -5;
  var maxScreen = 355;
  var movingInterval = null;
  var timer = null;
  var gameOver = false;
  var audioAccueil = document.getElementById("musicSelectPlayer");
  var maxScreenRight = "-325px";
  var maxScreenLeft = "-5px";
  var dead = false;

  // TOUCHES ACTION PERSO

    var damageRyu = 68;
    var damageKen = 107;
    var damageChunLi = 107;
    var damageBalrog = 107;



// PAUSE DECROISSANTE DE LA MUSIQUE
  function pauseAudio() {
    var volume04 = setTimeout(function(){
      audioAccueil.volume =  0.6;
    }, 600);

    var volume03 = setTimeout(function(){
    audioAccueil.volume =  0.3;
    }, 800);

    var volume02 = setTimeout(function(){
    audioAccueil.volume =  0.1;
    }, 1000);

    var volume01 = setTimeout(function(){
    audioAccueil.volume =  0.05;
    }, 1200);

    var volume00 = setTimeout(function(){
    audioAccueil.pause();
    }, 1400);
  };

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
    $(".accueil").fadeOut(800);

// CHOIX DU NIVEAU
    var changeStage = function(id){
        $(".psp-screen").css('background-image', 'url(./levels/images/arene'+id+'.gif)');
        $(".screen-select-level").fadeOut(800);
        pauseAudio();
        startGame();

    }

    $('.js-arene').on('click', function(){
      changeStage($(this).attr('id'))
    });
  });


  function startGame() {

    // startIntervalMove();
    timer = setInterval(timerClock, 1000)
    function timerClock (){
      if (timeGame > 1) {
        timeGame --;
        $("#timer").html(timeGame)
      }
      else {
        loseGame()
      }
    };
  }


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
  var deathProgressRyu = document.getElementById("js-deathbar-ryu").style.width = 0;
  var deathProgressKen = document.getElementById("js-deathbar-ken").style.width = 0;
  var deathProgressChunLi = document.getElementById("js-deathbar-chunli").style.width = 0;
  var deathProgressBalrog = document.getElementById("js-deathbar-balrog").style.width = 0;

  function loseGame(){
    $("#timer").css("transform", "translateX(-35%)")
    deathProgressRyu = 200;
    $(".death-bar").css('width', '200px;')

    document.getElementById('timer').innerHTML = '<span>GAME OVER</span>';
    clearInterval(timer)
    timeGame = 0;

    sound("soundFight", "sounds/youLose.mp3", 1);
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


    $(document).on("keydown", function(e) {
      if (e.keyCode === damageKen) {
        deathProgressKen += 30;
        if (deathProgressKen >= 300){
          clearInterval(timer)
        }
      }
    })

    $(document).on("keydown", function(e) {
      if (e.keyCode === damageChunLi) {
        deathProgressChunLi += 30;
        if (deathProgressChunLi >= 300){
          clearInterval(timer)
        }
      }
    })

    $(document).on("keydown", function(e) {
      if (e.keyCode === damageRyu) {
        deathProgressRyu += 30;
        if (deathProgressRyu >= 300){
          clearInterval(timer)
        }
      }
    })

    $(document).on("keydown", function(e) {
      if (e.keyCode === damageBalrog) {
        deathProgressBalrog += 30;
        if (deathProgressBalrog >= 300){
          clearInterval(timer)
        }
      }
    })





  $(document).on("keydown", function(e) {
    console.log(e.keyCode)
  })



});
