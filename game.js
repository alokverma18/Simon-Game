
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$(document).keypress(function(){
    if(!started){
        $('h1').text('Level 0');
        nextSequence();
        started = true;
    }
});


$('.btn').click(function(){
    var chosenColor = this.id;
    userClickedPattern.push(chosenColor);
    playSound(chosenColor);
    animatePress(chosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log('success');
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000);
        }
    }
    else{
        console.log('Wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }), 200;
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];

    level++;
    $('h1').text('Level ' + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);
    $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

function playSound(name){
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');

    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed')
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}