var userClickPattern = [];
var gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour; 
var level = 0;

$(document).on("keydown", function(e) {
  console.log(e.key);
  if(e.key === 'a' || e.key === 'A') {
    nextSequence();
  }
})

function nextSequence() {
  userClickPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(100).fadeIn(100);
  soundPlay(randomChosenColour);
  level++;
  $("h1").text("Level "+ level);
}

$(".btn").on("click", function(){
  var userChosenColour = this.id;
  userClickPattern.push(userChosenColour);
  soundPlay(userChosenColour)
  animatePress(userChosenColour);
  if(userClickPattern.length === gamePattern.length){
    checkAnswer(level);
  }
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function soundPlay(currentColour) {
  var audio = new Audio("/sounds/" + currentColour + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  var userCorrect = true;
  for(var i = 0; i < currentLevel; i++) {
    if(userClickPattern[i] === gamePattern[i]) {
      continue;
    } else {
      userCorrect = false;
      break;
    }
  }

  if(userCorrect) {
    console.log("success");
    setTimeout(function() {
      nextSequence();}
      , 1000);
  } else {
    console.log("wrong");
    $("h1").text("Game Over, Press Any Key to Restart")
    soundPlay("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $(document).on("keydown", () => {
      startOver();
    })
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  nextSequence();
}
