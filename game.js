
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var eventOver = false;
var gameOver = false;

$(document).keydown(nextSequence);
$(document).keydown(function(){
  $(document).off("keydown");
});




$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  if(!gameOver){

  if(isEqual(userClickedPattern.length-1)){
    if(isAllEqual() && userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
      nextSequence();
      userClickedPattern = [];
      },500)
    }
    
    
  }


  else if(!isEqual(userClickedPattern.length-1)){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    gameOver = true;
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100)

    playSound("wrong");

    $(document).keydown(function(){
      level = 0;
      gamePattern = [];
      userClickedPattern = [];
      gameOver = false;
      nextSequence();
    })

    $(document).keydown(function(){
      $(document).off("keydown");
    })

  }
}else {
  $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100)
    playSound("wrong");
}

});  


  
  




function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

  
}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

  }

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+ currentColor).removeClass("pressed");
  }, 100)

}  

function isEqual(currentNumber){
    
  if(userClickedPattern[currentNumber] === gamePattern[currentNumber]){
    return true;
  }
      
    else {
        return false;
      }
}

function isAllEqual() {
  for (var i = 0; i >= userClickedPattern.length; i++) {
    if (userClickedPattern[i] === gamePattern[i]) {
      continue;
    }
    else{
      return false;
    }
  }
  return true;
}
    
    

