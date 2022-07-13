function getCookie(cookieName) {
    var name = (cookieName + "=");
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieSplit = decodedCookie.split(";");
    
    for(var i = 0; i < cookieSplit.length; i++) {
        var part = cookieSplit[i];
        while(part.charAt(0) == " ") {
            part = part.substring(1);
        }

        if(part.indexOf(name) == 0) {
            return part.substring(name.length, part.length);
        }
    }

    return "";
}

function scorePush(gameId, score) {
    fetch("/includes/submit_score.php", {
        method: 'post',
        body: JSON.stringify({
            username: getCookie("player"),
            game_id: gameId,
            score: score
        }),
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => scorePushResult(response));
}

function scorePushResult(response) {
    if(response.status != 200) {
        console.log("Score Push Error:", response.status, response.text());
    } else {
        console.log("Score Push Success:", response.text());
    }
}
