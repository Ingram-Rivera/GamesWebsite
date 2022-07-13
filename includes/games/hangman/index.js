var cities = [
    "phoenix", "austin", "seattle", "orlando", "boston", "jackson", "salem", "montgomery", "springfield", "albany", "raleigh", "madison", "nashville", "lincoln"
];
var categories;

var gameState = {
    lives: 7,
    targetWord: "",
    guess: "",
    score: ""
}

document.querySelectorAll(".btn-group button").forEach(button => {
    button.onclick = () => {
        tick(button.id);
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function hangman() {
    console.log("Guess a word");
    var word = cities[getRandomInt(cities.length)];
    gameState["lives"] = 7
    gameState["targetWord"] = word
    gameState["guess"] = "_".repeat(word.length)
    gameState["score"] = 0

    console.log(word);
    /*
        While a letter of guess does not match up with each part of word
        replace word with _
    */

    tick()
}

function tick(userLetter) {
    if (userLetter) {
        if (gameState["targetWord"].includes(userLetter)) {
            var new_guess = []
            for (var i = 0; i < gameState["targetWord"].length; i++) {
                if (gameState["targetWord"][i] == userLetter) {
                    gameState["score"] = gameState["score"] + 1
                    console.log(gameState["score"])
                    new_guess.push(userLetter)
                    if (gameState["score"] == gameState["targetWord"].length) {
                        alert("You win!");
                        submitScore();
                    }
                }
                else new_guess.push(gameState["guess"][i])
            }
            gameState["guess"] = new_guess.join("")

            alert("You guessed correctly.");
        }
        else {
            alert("You guessed incorrectly.");
            gameState["lives"]--;
            alert("You have " + gameState["lives"] + " lives remaining.");
            if (gameState["lives"] < 1) {
                alert("You lose.");
                submitScore();
            }
        }

    }
    document.getElementById("test").innerHTML = gameState["guess"]
    document.getElementById("score").innerHTML = "Score: " + gameState["score"]
}

function displayHint() {
    alert("Your category is: cities.");
}

function submitScore() {
    scorePush(6, gameState["score"]);
}