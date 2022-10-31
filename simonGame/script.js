let color_array = ["green", "red", "yellow", "blue"];
let game_pattern = [];
let level = 0;
let user_pattern = [];
let started = false;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        play_game();
        started = true;
    }
});
$(".restart").click(function () {
    start_again();
    play_game();});

function play_game() {
    user_pattern = [];
    level++;
    $("h1").text(`level ${level}`);
    let random_number = Math.floor(Math.random() * 4);
    let random_chosen_color = color_array[random_number];
    game_pattern.push(random_chosen_color);
    playsound("sounds/" + random_chosen_color + ".mp3");
    $("#" + random_chosen_color).fadeIn(100).fadeOut(100).fadeIn(100);
}

function match_pattern(index) {
    if (game_pattern[index] === user_pattern[index]) {
        if (user_pattern.length === game_pattern.length) {
            setTimeout(function () {
                play_game();
            }, 1000);
        }
    }
    else {
        playsound("sounds/wrong.mp3");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        start_again();
    }
}

function playsound(name) {
    let audio = new Audio(name);
    audio.play();
}

$(".btn").click(function () {
    var userchosencolor = $(this).attr("id");
    user_pattern.push(userchosencolor);
    playsound("sounds/" + userchosencolor + ".mp3");
    $("#" + userchosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
    match_pattern(user_pattern.length - 1);
});

function start_again() {
    user_pattern = [];
    game_pattern = [];
    level = 0;
    started = false;
}
