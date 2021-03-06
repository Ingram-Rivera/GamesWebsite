var deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var playerOneCards = [];
var dealerCards = [];
var hitNewCard = [];

// Picks a random number between 1 and 11 and returns that value
function randomDraw(deck) {
    var randomValue = (Math.random() * deck.length);
    var randomIndex = Math.floor(randomValue);
    return deck[randomIndex];
}

// Starts the game and assigns two random cards to each player.
function blackJack() {
    playerOneCards = [randomDraw(deck), randomDraw(deck)];
    dealerCards = [randomDraw(deck), randomDraw(deck)];
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("playerCards").innerHTML = playerOneCards;
    document.getElementById("dealerCards").innerHTML = dealerCards;
}

// Adds up the total value of the cards
function cardValue(hand) {
    var total = 0;
    for(var i = 0; i < hand.length; i++) {
        total += hand[i];
    }

    return total;
}

// Allow the player to "hit" (add another card to their hand)
function hit() {
    alert("Player requested a hit!");
    playerOneCards.push(randomDraw(deck));

    alert("New Hand: " + playerOneCards);
    var playerCardValues = cardValue(playerOneCards);
    var dealerCardValues = cardValue(dealerCards);
    updateDisplay();

    if(playerCardValues > 21) {
        alert("You have busted, gg.");
        let game_id = 1; // blackjack
        let score = parseInt( document.getElementById('playerCards').innerHTML );
        scorePush(game_id,score);
        return;
    }

    if(playerCardValues < 21) {
        alert("Would you like to hit, stand, or split?");
        return;
    }

    if(playerCardValues == dealerCardValues) {
        alert("You have tied with the dealer!");
        let game_id = 1; // blackjack
        let score = parseInt( document.getElementById('playerCards').innerHTML );
        scorePush(game_id,score);
        return;
    }

    if(dealerCardValues < playerCardValues) {
        alert("You win, gg!");
        let game_id = 1; // blackjack
        let score = parseInt( document.getElementById('playerCards').innerHTML );
        scorePush(game_id,score);
    }
}

// While hand is < 17, do a hit
// If hand > 17, stand
// else if 21, determine winner
function dealerHit() {
    while(cardValue(dealerCards) < 17) {
        dealerCards.push(randomDraw(deck));
        updateDisplay();
        if(cardValue(dealerCards) > 21) {
            alert("The dealer has busted, gg!");
            let game_id = 1; // blackjack
            let score = parseInt( document.getElementById('playerCards').innerHTML );
            scorePush(game_id,score);
            break;
        }
    }
}

function stand() {
    alert("Player requested to stand.");

    // Check if player beat the dealer
    var playerCardValues = cardValue(playerOneCards);
    var dealerCardValues = cardValue(dealerCards);

    if(dealerCardValues == playerCardValues) {
        alert("You have tied with the dealer!");
        let game_id = 1; // blackjack
        let score = parseInt( document.getElementById('playerCards').innerHTML );
        scorePush(game_id,score);
        return;
    }

    if(dealerCardValues < playerCardValues) {
        alert("You win, gg!");
        let game_id = 1; // blackjack
        let score = parseInt( document.getElementById('playerCards').innerHTML );
        scorePush(game_id,score);
    }

    if(playerCardValues < dealerCardValues){
        alert("The dealer has won, gg!");
        let game_id = 1; // blackjack
        let score = parseInt( document.getElementById('playerCards').innerHTML );
        scorePush(game_id,score);
    }
    updateDisplay();
}

function split() {
    alert("Player requested to split hand.");
    updateDisplay();
    // TODO: Split cards, turn into two different hands.
}
