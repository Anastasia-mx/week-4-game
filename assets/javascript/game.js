$(document).ready(function() {
console.log("you are in js!");
  // Gets Link for Theme Song

// Gets Link for Theme Song
var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "theme1.mp3");
audioElement.setAttribute("type", "audio/mp3");
console.log(audioElement);

// Theme Button
$(".theme-button").on("click", function() {
  console.log("in theme button loop");
  audioElement.play();
});

$(".pause-button").on("click", function() {
  audioElement.pause();
});

var moveleft = false
  
var HERO = "";
var VILLAN = "";
var vTOHIDE;

var characterPoints = {};

characterPoints["rey"] = {
  AP: 50,
  HP: 60,
  CAP: 20
};

characterPoints["padme"] = {
  AP: 20,
  HP: 120,
  CAP: 50  
  };

characterPoints["leia"] = {
  AP: 70,
  HP: 80,
  CAP: 70  
  };

characterPoints["atat"] = {
  AP: 10,
  HP: 200,
  CAP: 20  
  };   

function reset(){       //starts a new game
  $("#atat").show().css("background-color","grey");
  $("#padme").show().css("background-color","grey");
  $("#leia").show().css("background-color","grey");
  $("#rey").show().css("background-color","grey");
  HERO = "";
  VILLAN = "";
  moveleft = false;
  $(".instructions").text("Click your Hero to start battling!");
  $(".characterB").each(function(){
    $("#Lpanel").prepend(this)
    });
  $(".reset-button").hide();
  $(".attack-button").hide();
  console.log("reset complete");

  characterPoints["rey"] = {AP: 50, HP: 60, CAP: 20};
  characterPoints["padme"] = {AP: 20, HP: 130, CAP: 50  };
  characterPoints["leia"] = {AP: 70, HP: 70, CAP: 70};
  characterPoints["atat"] = {AP: 10, HP: 200, CAP: 20}; 
};     
// reset() 

 //starting function
$(".characterB").on("click", function() {
  if ($(this).parent().attr('id') == "Lpanel"){
    HERO = $(this).attr("id");
    console.log(HERO)
    $(this).css("background-color","green");
    $("#hero_row").prepend(this);
    var others = $("#Lpanel").children("button");
    $("#Rpanel").append(others);
    moveleft = true;
    $(".instructions").text("Choose a character from the bull pen to start your first battle.")
  };    
});

//chose the villan
$(".characterB").on("click", function() {
  if ((moveleft == true) && ($(this).parent().attr('id') != "hero_row")){
    console.log("inside vilan if loop");
    $(this).css("background-color","red");
    $("#villan_row").prepend(this);
    $(".instructions").text("Click attack to begin the battle.");
    VILLAN = $(this).attr("id");
    console.log("villan", VILLAN);
    $(".attack-button").show();
    moveleft = false;
  };    
});

// battle mode 
$(".attack-button").on("click", function() {
  console.log("start of attack", HERO, VILLAN);
  $(".instructions").text("Keep attacking!");
  console.log("PRE //  hero HP: ", characterPoints[HERO].HP, "  //villan HP: ",characterPoints[VILLAN].HP, "  //hero AP: ",characterPoints[HERO].AP);
  characterPoints[HERO].HP = characterPoints[HERO].HP - characterPoints[VILLAN].CAP;
  characterPoints[VILLAN].HP = characterPoints[VILLAN].HP - characterPoints[HERO].AP;
  characterPoints[HERO].AP = characterPoints[HERO].AP * 2;      
  console.log("POST //  hero HP: ", characterPoints[HERO].HP, "  //villan HP: ",characterPoints[VILLAN].HP, "  //hero AP: ",characterPoints[HERO].AP);
  //check that battle should continue
  if((characterPoints[HERO].HP>0) && (characterPoints[VILLAN].HP>0)){
    console.log("continue")
  }  
  //when villan is defeated
  else if ((characterPoints[VILLAN].HP<=0) &&(characterPoints[HERO].HP>=0)){
    console.log("villan hp <0 how many left is: ", $('#Rpanel').children().size())
    if ($('#Rpanel').children().size()>0) {
      $(".instructions").text("You beat " + $('#'+VILLAN).text() +", pick a new challenger!");
      $('#'+VILLAN).hide();
      $(".attack-button").hide();
      moveleft=true;
    }
    else{
      $(".instructions").text("YOU WON! Press reset to play again.");
      $(".reset-button").show();
      $(".attack-button").hide();
    }    
  }
  //when hero dies
  else if ((characterPoints[VILLAN].HP>=0) &&(characterPoints[HERO].HP<=0)){
    console.log("hero hp <0")
    $(".instructions").text("You lost. Press Reset to try again.");
    $(".reset-button").show();
    $(".attack-button").hide();
  }
  //if both die in same move
  else if ((characterPoints[VILLAN].HP<=0) &&(characterPoints[HERO].HP<=0)){
    console.log("hero hp <0")
    $(".instructions").text("You lost. Press Reset to try again.");
    $(".reset-button").show();
    $(".attack-button").hide();
  }   
  //something is wrong
  else {
    console.log("error");
  }     
});

$(".reset-button").on("click", function() {
  reset();
});


}); // end of document ready