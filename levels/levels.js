$(document).ready(function() {



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
          sound("soundStage", "./levels/sounds/kenStage.mp3", 0.4)
        }
        else if (id == 02){
            sound("soundStage", "./levels/sounds/sagatStage.mp3", 0.2)
        }
        else if (id == 03){
            sound("soundStage", "./levels/sounds/thawkStage.mp3", 0.2)
        }
        else if (id == 04){
            sound("soundStage", "./levels/sounds/ryuStage.mp3", 0.2)
        }
        else if (id == 05){
            sound("soundStage", "./levels/sounds/zangiefStage.mp3", 0.3)
        }
        else if (id == 06){
            sound("soundStage", "./levels/sounds/chun-LiStage.mp3", 0.2)
        }
    }

    $('.js-arene').on('click', function(){
      changeStage($(this).attr('id'))
    });
  });

});
