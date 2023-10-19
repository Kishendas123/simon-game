//Selecting random colours:
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = []; //Store clicked pattern

var started = false; //Keeping track if the game has started or not

var level = 0; //Start at level 0:

$(document).keydown(function(){
  if(!started){
    //changes h1 title as the game level progresses:
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); //storing the id of button that clicked.
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); //corresponding sound played when button is pressed.
  animatePress(userChosenColour); //corresponding animation played

  checkAnswer(userClickedPattern.length - 1);
})

function checkAnswer(currentLevel){
  //check answer if correct and print "success"
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      },100);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver(); //call startOver
  }
}


function nextSequence() {

  //reset the userClickedPattern to an empty array, ready for the next level!
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // jQuery to select the button and add animation:
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //Add in audio when button is pressed:
  playSound(randomChosenColour)
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  //Removing class after 100milliseconds:
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  //restart all the level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
