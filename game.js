
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // this.id also works!
    userClickedPattern.push(userChosenColour);    

    // play the corresponding sound to the button
    playSound(userChosenColour);

    animatePress(userChosenColour);

    // pass the last index of the userClickedPattern array
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function() {        
    if (!gameStarted) {
        nextSequence();

        $("#level-title").text("Level " + level);

        gameStarted = true;
    }   
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    // select button with the same id as randomChosenColour    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    animatePress(randomChosenColour);

    // increase level by 1 and update h1 text with the level value
    level++;
    $("#level-title").text("Level " + level);    
    userClickedPattern = [];
}

function playSound(name) {
    // play the sound for the button
    var colourSound = new Audio("sounds/" + name + ".mp3");
    colourSound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    // delay 100 miliseconds
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) { 
    // check if last user answer is the same as the game pattern
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {  
        // check if user has finish their sequence
        if (userClickedPattern.length === level) {
            // show the next sequence after 1000 miliseconds
            setTimeout(function() {                   
                nextSequence();
            }, 1000); 
    
            // once the nextSequence is triggered empty the array
            userClickedPattern = [];
        }        
    } else {                
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        // change the h1 title
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }    
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
