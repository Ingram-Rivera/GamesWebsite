const maxLives = 10;
const defaultLives = 3;
const scorePerLife = 30_000;
const gameWidth = 500;
const gameHeight = 500;
const backgroundStarCount = 50;
const bulletCooldownTicks = 3;
const ticksPerSecond = 60;
const bulletSpeed = 3;

const keyIdLeft = 37;
const keyIdUp = 38;
const keyIdRight = 39;
const keyIdDown = 40;
const keyIdSpace = 32;

const shipColor = "#00FF00";
var enemyColor = "#FF0000";

var heldLeft = false;
var heldUp = false;
var heldRight = false;
var heldDown = false;
var heldSpace = false;

var isStarted = false;
var gameTaskId = 0;

var currentLives = defaultLives;
var currentScore = 0;

var shipCenterPosition = [250, 490];
var shipBulletPositions = [];
var nextShipBulletCooldown = 0;
var enemyBulletCooldown = 0;

var enemySpeed = 1;
var enemyPositions = [];
var enemyBulletPositions = [];
var nextEnemyBulletCooldown = 0;

function startGame() {
    if(isStarted) return;
    isStarted = true;
    
    alert("Space Invaders is currently a work in progress!");
    hideElement("playButton");
    showElement("information");
    
    gameTaskId = setInterval(gameLoop, 1000 / ticksPerSecond);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    createEnemies();
}

function createEnemies() {
    var screenDivision = (gameWidth / 8);
    for(var i = 0; i < 8; i++) {
        var enemyX = (screenDivision * (i + 1));
        var enemyY = screenDivision;
        if(i < 7) enemyPositions.push([enemyX, enemyY]);

        var midEnemyX = (enemyX - (screenDivision / 2));
        var midEnemyY = (screenDivision * 2);
        enemyPositions.push([midEnemyX, midEnemyY]);
    }
}

function gameLoop() {
    if(currentLives < 1) {
        gameOver();
        return;
    }
    
    drawBackground();
    drawRandomStars();
    checkKeys();
    
    drawShip();
    drawEnemies();
    drawBullets();
    
    checkEnemyHitboxes();
    checkShipHitbox();

    checkEnemyCount();
    triggerRandomEnemyWeapon();
    
    moveEnemies();
    moveBullets();
    
    updateInformation();
}

function onKeyDown(event) {
    var keyId = event.which;
    switch(keyId) {
        case keyIdLeft: heldLeft = true; break;
        case keyIdUp: heldUp = true; break;
        case keyIdRight: heldRight = true; break;
        case keyIdDown: heldDown = true; break;
        case keyIdSpace: heldSpace = true; break;
        default: break;
    }
}

function onKeyUp(event) {
    var keyId = event.which;
    switch(keyId) {
        case keyIdLeft: heldLeft = false; break;
        case keyIdUp: heldUp = false; break;
        case keyIdRight: heldRight = false; break;
        case keyIdDown: heldDown = false; break;
        case keyIdSpace: heldSpace = false; break;
        default: break;
    }
}

function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    var addSubtract = (max - min + 1);
    var randomMultiple = (Math.random() * addSubtract);
    var addMin = (randomMultiple + min);
    return Math.floor(addMin);
}

function hideElement(elementId) {
    var element = document.getElementById(elementId);
    if(element != null) element.style.display = "none";
}

function showElement(elementId) {
    var element = document.getElementById(elementId);
    if(element != null) element.style.display = "";
}

function increaseScore(amount) {
    currentScore += amount;
    if(currentScore != 0 && (currentScore % scorePerLife) == 0) {
        currentLives++;
        if(currentLives > maxLives) currentLives = maxLives;
    }
}

function getCanvas() {
    var canvasElement = document.getElementById("spaceInvaders");
    return canvasElement.getContext("2d");
}

function drawRectangle(x, y, width, height, color) {
    var canvas = getCanvas();
    canvas.fillStyle = color;
    canvas.fillRect(x, y, width, height);
}

function drawText(x, y, text, color, font) {
    var canvas = getCanvas();
    canvas.fillStyle = color;
    canvas.font = font;
    canvas.fillText(text, x, y);
}

function setPixel(x, y, color) {
    drawRectangle(x, y, 1, 1, color);
}

function drawBackground() {
    drawRectangle(0, 0, gameWidth, gameHeight, "#111111");
}

function drawRandomStars() {
    var starCount = backgroundStarCount;
    while(starCount > 0) {
        starCount--;
        var x = getRandomInteger(1, gameWidth);
        var y = getRandomInteger(1, gameHeight);
        setPixel(x, y, "#FFFFFF");
    }
}

function updateInformation() {
    var scoreSpan = document.getElementById("score");
    scoreSpan.innerHTML = currentScore;
    
    var livesSpan = document.getElementById("lives");
    livesSpan.innerHTML = currentLives;
}

function checkKeys() {
    if(heldLeft) {
        var currentX = shipCenterPosition[0];
        shipCenterPosition[0] = Math.max(5, currentX - 3);
    }
    
    if(heldRight) {
        var currentX = shipCenterPosition[0];
        shipCenterPosition[0] = Math.min(gameWidth - 5, currentX + 3);
    }

    if(heldSpace) {
        if(nextShipBulletCooldown > 0) {
            nextShipBulletCooldown--;
        } else {
            var currentX = shipCenterPosition[0];
            var currentY = shipCenterPosition[1];
            shipBulletPositions.push([currentX, currentY]);
            nextShipBulletCooldown += bulletCooldownTicks;
        }
    }
}

function drawShip() {
    var centerX = shipCenterPosition[0];
    var centerY = shipCenterPosition[1];
    
    var topX = (centerX - 2);
    var topY = (centerY - 2);
    drawRectangle(topX, topY, 5, 5, shipColor);
    
}

function drawEnemies() {
    var enemyPositionsLength = enemyPositions.length;
    for(var index = 0; index < enemyPositionsLength; index++) {
        var enemyPosition = enemyPositions[index];
        var enemyCenterX = enemyPosition[0];
        var enemyCenterY = enemyPosition[1];
        
        var topX = (enemyCenterX - 2);
        var topY = (enemyCenterY - 2);
        drawRectangle(topX, topY, 5, 5, enemyColor);
    }
}

function drawBullets() {
    var shipBulletPositionsLength = shipBulletPositions.length;
    for(var index = 0; index < shipBulletPositionsLength; index++) {
        var shipBulletPosition = shipBulletPositions[index];
        drawBullet(shipBulletPosition, shipColor);
    }
    
    var enemyBulletPositionsLength = enemyBulletPositions.length;
    for(var index = 0; index < enemyBulletPositionsLength; index++) {
        var enemyBulletPosition = enemyBulletPositions[index];
        drawBullet(enemyBulletPosition, enemyColor);
    }
}

function drawBullet(position, color) {
    var positionX = position[0];
    var positionY = position[1];
    drawRectangle(positionX - 1, positionY - 1, 3, 3, color);
}

function checkBulletCollision(enemyPosition, bulletPosition) {
    var enemyX = enemyPosition[0] - 2;
    var enemyY = enemyPosition[1] - 2;
    var enemyWidth = 5;
    var enemyHeight = 5;

    var bulletX = bulletPosition[0] - 1;
    var bulletY = bulletPosition[1] - 1;
    var bulletWidth = 3;
    var bulletHeight = 3;

    return !(
        ((enemyY + enemyHeight) < bulletY) ||
        (enemyY > (bulletY + bulletHeight)) ||
        ((enemyX + enemyWidth) < bulletX) ||
        (enemyX > (bulletX + bulletWidth))
    );
}

function checkShipCollision(enemyPosition) {
    var enemyX = enemyPosition[0] - 2;
    var enemyY = enemyPosition[1] - 2;
    var enemyWidth = 5;
    var enemyHeight = 5;

    var shipX = shipCenterPosition[0] - 2;
    var shipY = shipCenterPosition[1] - 2;
    var shipWidth = 5;
    var shipHeight = 5;

    return !(
        ((enemyY + enemyHeight) < shipY) ||
        (enemyY > (shipY + shipHeight)) ||
        ((enemyX + enemyWidth) < shipX) ||
        (enemyX > (shipX + shipWidth))
    );
}

function checkEnemyHitboxes() {
    var enemyPositionsLength = enemyPositions.length;
    var newEnemyPositions = [];
    for(var i = 0; i < enemyPositionsLength; i++) {
        var enemyPosition = enemyPositions[i];
        var didCollide = false;

        var shipBulletPositionsLength = shipBulletPositions.length;
        var newShipBulletPositions = [];
        for(var j = 0; j < shipBulletPositionsLength; j++) {
            var shipBulletPosition = shipBulletPositions[j];
            if(checkBulletCollision(enemyPosition, shipBulletPosition)) {
                increaseScore(5);
                didCollide = true;
                continue;
            }

            newShipBulletPositions.push(shipBulletPosition);
        }
        shipBulletPositions = newShipBulletPositions;
        if(!didCollide) newEnemyPositions.push(enemyPosition);
    }
    enemyPositions = newEnemyPositions;
}

function checkShipHitbox() {
    var enemyBulletPositionsLength = enemyBulletPositions.length;
    var newEnemyBulletPositions = [];
    for(var index = 0; index < enemyBulletPositionsLength; index++) {
        var enemyBulletPosition = enemyBulletPositions[index];
        if(checkBulletCollision(shipCenterPosition, enemyBulletPosition)) {
            increaseScore(-1);
            currentLives--;
            continue;;
        }

        newEnemyBulletPositions.push(enemyBulletPosition);
    }
    enemyBulletPositions = newEnemyBulletPositions;

    var enemyPositionsLength = enemyPositions.length;
    var newEnemyPositions = [];
    for(var index = 0; index < enemyPositionsLength; index++) {
        var enemyPosition = enemyPositions[index];
        if(checkShipCollision(enemyPosition, shipCenterPosition)) {
            increaseScore(-1);
            currentLives--;
            continue;
        }
        newEnemyPositions.push(enemyPosition);
    }
    enemyPositions = newEnemyPositions;
}

function moveEnemies() {
    var enemyPositionsLength = enemyPositions.length;
    for(var index = 0; index < enemyPositionsLength; index++) {
        var enemyPosition = enemyPositions[index];
        enemyPosition[1] += enemySpeed;
        
        if(enemyPosition[1] >= gameHeight) {
            enemyPosition[1] = 0;
        }
    }
}

function moveBullets() {
    var shipBulletPositionsLength = shipBulletPositions.length;
    var newShipBulletPositions = [];
    for(var index = 0; index < shipBulletPositionsLength; index++) {
        var shipBulletPosition = shipBulletPositions[index];
        shipBulletPosition[1] -= bulletSpeed;
        if(shipBulletPosition[1] <= 0) continue;
        newShipBulletPositions.push(shipBulletPosition);
    }
    shipBulletPositions = newShipBulletPositions;
    
    var enemyBulletPositionsLength = enemyBulletPositions.length;
    var newEnemyBulletPositions = [];
    for(var index = 0; index < enemyBulletPositionsLength; index++) {
        var enemyBulletPosition = enemyBulletPositions[index];
        enemyBulletPosition[1] += bulletSpeed;
        if(enemyBulletPosition[1] >= gameHeight) continue;
        newEnemyBulletPositions.push(enemyBulletPosition);
    }
    enemyBulletPositions = newEnemyBulletPositions;
}

function checkEnemyCount() {
    if(enemyPositions.length > 0) return;
    enemySpeed++;

    var randomHex = getRandomInteger(0, 16777215).toString(16);
    enemyColor = ("#" + randomHex);
    createEnemies();
}

function triggerRandomEnemyWeapon() {
    if(enemyBulletCooldown > 0) {
        enemyBulletCooldown--;
        return;
    }

    var enemyIndex = getRandomInteger(0, enemyPositions.length);
    var enemyPosition = enemyPositions[enemyIndex];
    enemyBulletPositions.push([enemyPosition[0], enemyPosition[1]]);
    enemyBulletCooldown += ((ticksPerSecond * 2) / enemySpeed);
}

function gameOver() {
    clearInterval(gameTaskId);
    drawRectangle(0, 0, gameWidth, gameHeight, "#000000");
    drawText(0, 0, "Game Over", "#FFFFFF", "48px sans-serif");
    
    hideElement("spaceInvaders");
    showElement("submitButton");
    
    alert("Game Over!");
}

function getCookie(cookieName) {
    var name = (cookieName + "=");
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");

    for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while(cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if(cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
}

function submitScoreButton() {
    var playerName = getCookie("player");
    var gameId = 4;
    $.ajax({
        type: "POST",
        url: "/includes/submit_score.php",
        data: ("username=" + playerName + "&game_id=" + gameId + "&score=" + currentScore),
        success: onScoreSubmitSuccess,
        failure: onScoreSubmitFailure
    });
}

function onScoreSubmitSuccess(data) {
    alert("Your score was successfully sent!");
    location.reload();
}

function onScoreSubmitFailure(data) {
    alert("Score Push Failure\n\nPlease send the following error to the site administrator:\n\n" + data);
}