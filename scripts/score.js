function submitScore(gameName, userId, score) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", "/functions/score.php", true);
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(JSON.stringify({
        game: gameName,
        user: userId,
        score: score
    }));
}

function createRandomID(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    
    for(var i = 0; i < length; i++) {
        var randomValue = Math.random();
        var multiplyValue = (randomValue * charactersLength);
        var floorValue = Math.floor(multiplyValue);
        result += characters.charAt(floorValue);
    }
    
    return result;
}

function createRandomScore(min, max) {
    var randomValue = Math.random();
    var subtractAdd = (max - min + 1);
    var multiplyValue = (randomValue * subtractAdd);
    var addMin = (multiplyValue + min);
    return Math.floor(addMin);
}