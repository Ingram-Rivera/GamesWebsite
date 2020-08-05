function score_test() {
    for(var i = 0; i < 5; i++) {
        var randomId = createRandomID(36);
        var randomScore = createRandomScore(1, 50);
        submitScore("blackjack", randomId, randomScore);
    }
}