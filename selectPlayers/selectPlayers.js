$(document).ready(function() {

  var player1Selected = false;
  var player2Selected = false;


  function AddScript (scriptUrl){
    var div = document.getElementById("scripts-js");
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = scriptUrl;
    div.appendChild(newScript);
  }



  $(".player").on("click", function () {
    if (!$(this).hasClass("choosed") && player1Selected === false){
        $(this).addClass("choosed choosedP1");
        $(this).clone().fadeIn().addClass("playerSelected01").removeClass("choosedP1").appendTo(".playersSelected");
        $(".title-player-select").fadeOut(function () {
            $(".title-player-select").text(($(".title-player-select").text() == 'Select Player 1') ? 'Select Player 2' : 'Select Player 1').fadeIn();
        })

      player1Selected = true;
      console.log(this.id)
      if (this.id == "fighter01"){
          $('#ryu').removeClass('noSelectedPlayer')
          $('#ryu').find("p").addClass('position-name-player-one')
          $('#js-lifebar-ryu').addClass('life-bar-p1')
          $('#js-deathbar-ryu').addClass('death-bar-p1')
          $('#js-persoRyu').addClass('player1-position')
          AddScript('./persos/ryu/ryu.js');
      }
      else if (this.id == "fighter02"){
          $('#ken').removeClass('noSelectedPlayer')
          $('#ken').find("p").addClass('position-name-player-one')
          $('#js-lifebar-ken').addClass('life-bar-p1')
          $('#js-deathbar-ken').addClass('death-bar-p1')
          $('#js-persoKen').addClass('player1-position')
          AddScript('./persos/ken/ken.js');
      }
      else if (this.id == "fighter03"){
          $('#chunli').removeClass('noSelectedPlayer')
          $('#chunli').find("p").addClass('position-name-player-one')
          $('#js-lifebar-chunli').addClass('life-bar-p1')
          $('#js-deathbar-chunli').addClass('death-bar-p1')
          $('#js-persoChunLi').addClass('player1-position')
          AddScript('./persos/chunLi/chunLi.js');
      }
      else if (this.id == "fighter04"){
          $('#balrog').removeClass('noSelectedPlayer')
          $('#balrog').find("p").addClass('position-name-player-one')
          $('#js-lifebar-balrog').addClass('life-bar-p1')
          $('#js-deathbar-balrog').addClass('death-bar-p1')
          $('#js-persoBalrog').addClass('player1-position')
          AddScript('./persos/balrog/balrog.js');
      }

    }
    else if (!$(this).hasClass("choosed") && player1Selected === true && player2Selected === false) {
      $(this).addClass("choosed choosedP2");
      $(this).clone().fadeIn().addClass("playerSelected02").removeClass("choosedP2").appendTo(".playersSelected");
      player2Selected = true;
      if (this.id == "fighter01"){
          $('#ryu').removeClass('noSelectedPlayer')
          $('#ryu').find("p").addClass('position-name-player-two')
          $('#js-lifebar-ryu').addClass('life-bar-p2')
          $('#js-deathbar-ryu').addClass('death-bar-p2')
          $('#js-persoRyu').addClass('player2-position')
          AddScript('./persos/ryu/ryu.js');
      }
      else if (this.id == "fighter02"){
          $('#ken').removeClass('noSelectedPlayer')
          $('#ken').find("p").addClass('position-name-player-two')
          $('#js-lifebar-ken').addClass('life-bar-p2')
          $('#js-deathbar-ken').addClass('death-bar-p2')
          $('#js-persoKen').addClass('player2-position')
          AddScript('./persos/ken/ken.js');
      }
      else if (this.id == "fighter03"){
          $('#chunli').removeClass('noSelectedPlayer')
          $('#chunli').find("p").addClass('position-name-player-two')
          $('#js-lifebar-chunli').addClass('life-bar-p2')
          $('#js-deathbar-chunli').addClass('death-bar-p2')
          $('#js-persoChunLi').addClass('player2-position')
          AddScript('./persos/chunLi/chunLi.js');
      }
      else if (this.id == "fighter04"){
          $('#balrog').removeClass('noSelectedPlayer')
          $('#balrog').find("p").addClass('position-name-player-two')
          $('#js-lifebar-balrog').addClass('life-bar-p2')
          $('#js-deathbar-balrog').addClass('death-bar-p2')
          $('#js-persoBalrog').addClass('player2-position')
          AddScript('./persos/balrog/balrog.js');
      }
    }
    animationReadyFight();

  })

    var animationReadyFight = function(){
      if (player1Selected === true && player2Selected === true){
        setTimeout(function(){
          $(".title-player-select").fadeOut(800);
          $(".players").fadeOut(800);
          $("#animPreFight").addClass("animation");
        }, 900)
        setTimeout(function(){
          $(".prefight-fight").css('display', 'block');
        }, 2000)
        setTimeout(function(){
          $(".screen-select-player").fadeOut(800);
        }, 4000)
      }
    }
});
