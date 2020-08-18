function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function load_game(gameName) {
    var gameSource = getSource(gameName);
    if(gameSource == null) return;
    $("#game_loads_here").empty();

    var customFrame = document.createElement("iframe");
    customFrame.setAttribute("src", gameSource);
    customFrame.setAttribute("style", "overflow: hidden; width: 100%; height: 100%;");
    customFrame.setAttribute("scrolling", "no");
    
    var gameLoadDiv = document.getElementById("game_loads_here");
    gameLoadDiv.appendChild(customFrame);
}

function getSource(gameName) {
    var baseUrl = "/includes/games/";
    switch(gameName) {
        case "2048": return (baseUrl + "2048/index.html");
        case "blackjack": return (baseUrl + "blackjack/blackjack.html");
        case "checkers": return (baseUrl + "checkers/checkers.html");
        case "hangman": return (baseUrl + "hangman/index.html");
        case "minesweeper": return (baseUrl + "minesweeper/index.html");
        case "space_invaders": return (baseUrl + "space_invaders/space_invaders.html");
		case "tetris": return (baseUrl + "tetris/tetris.html");
    }

    return null;
}

function startToggleInit() {
    let player = getCookie('player');
    document.getElementById('choose_game').innerHTML = player + '<br>Please Choose a Game';
    document.getElementById('quit_game').style.display = 'none';
    document.getElementById('choose_game').style.display = 'inline-block';
    document.getElementById('game_selection').style.display = 'block';
}

function startToggle() {
    document.getElementById('choose_game').style.display = 'none';
    document.getElementById('game_selection').style.display = 'none';
    document.getElementById('quit_game').style.display = 'block';
}

function quit_game() {
    $('#game_loads_here').empty($('canvas#defaultCanvas0'));

    var customImage = document.createElement("img");
    customImage.setAttribute("src", "/assets/img/splash-screen.jpg");
    customImage.setAttribute("style", "width: 100%; height: 100%;");
    document.getElementById("game_loads_here").appendChild(customImage);
}
function quitToggle() {
    document.getElementById('quit_game').style.display = 'none';
    document.getElementById('choose_game').style.display = 'inline-block';
    document.getElementById('game_selection').style.display = 'block';
}

// form action
$(document).ready(function () {
    $('form#gameNameCreate').on('submit', function (e) {
        e.preventDefault();
        var name = $('#username').val();
        if (name == '') {
            $('.message_box').html('<span style="color:red;">Enter Your Name!</span>');
            $('#username').focus();
            return false;
        } else {

            $.ajax({
                type: "POST",
                url: '/includes/create_gamer.php',
                data: "username=" + name,
                success: function (data) {
                    document.getElementById('gameNameCreate').style.display = 'none';
                },
                complete: function (data) {
                    startToggleInit();
                }
            });
        }
    }); // submit form

    function scorePush(game_id, score) {
        let player = getCookie('player');
        $.ajax({
            type: "POST",
            url: '/includes/submit_score.php',
            data: "username=" + player + "&game_id=" + game_id + "&score=" + score,
            success: function (data) {
                console.log('score pushed');
            },
            error: function (data) {
                console.log('push failed')
            }
        });
    }

});