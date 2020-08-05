const maxLives = 10;
const defaultLives = 3;
const scorePerLife = 30_000;
const gameWidth = 800;
const gameHeight = 800;
const backgroundStarCount = 50;
const bulletCooldownTicks = 5;

const keyIdLeft = 37;
const keyIdUp = 38;
const keyIdRight = 39;
const keyIdDown = 40;
const keyIdSpace = 32;

const shipColor = "#00FF00";
const enemyColor = "#FF0000";

var heldLeft = false;
var heldUp = false;
var heldRight = false;
var heldDown = false;
var heldSpace = false;

var isStarted = false;
var gameTaskId = 0;

var currentLives = defaultLives;
var currentScore = 0;

var shipCenterPosition = [400, 790];
var shipBulletPositions = [];
var nextShipBulletCooldown = 0;

var enemyPositions = [];
var enemyBulletPositions = [];
var nextEnemyBulletCooldown = 0;

function startGame() {
    if(isStarted) return;
    isStarted = true;
    
    alert("Space Invaders is currently a work in progress!");
    hideElement("playButton");
    showElement("information");
    
    gameTaskId = setInterval(gameLoop, 50);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    
    for(var i = 0; i < 8; i++) {
        var enemyX = (100 * (i + 1));
        var enemyY = 100;
        if(i < 7) enemyPositions.push([enemyX, enemyY]);

        var midEnemyX = (enemyX - 50);
        var midEnemyY = 200;
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
        var x = getRandomInteger(1, 800);
        var y = getRandomInteger(1, 800);
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
        shipCenterPosition[0] = Math.max(5, currentX - 5);
    }
    
    if(heldRight) {
        var currentX = shipCenterPosition[0];
        shipCenterPosition[0] = Math.min(795, currentX + 5);
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
    drawRectangle(positionX, positionY - 1, 1, 3, color);
}

function checkEnemyHitboxes() {
    
}

function checkShipHitbox() {
    
}

function moveEnemies() {
    var enemyPositionsLength = enemyPositions.length;
    for(var index = 0; index < enemyPositionsLength; index++) {
        var enemyPosition = enemyPositions[index];
        enemyPosition[1]++;
        
        if(enemyPosition[1] >= 800) {
            enemyPosition[1] = 0;
        }
    }
}

function moveBullets() {
    var shipBulletPositionsLength = shipBulletPositions.length;
    for(var index = 0; index < shipBulletPositionsLength; index++) {
        var shipBulletPosition = shipBulletPositions[index];
        shipBulletPosition[1] -= 10;
        if(shipBulletPosition[1] <= 0) {
            shipBulletPositions.splice(index, 1);
        }
    }
    
    var enemyBulletPositionsLength = enemyBulletPositions.length;
    for(var index = 0; index < enemyBulletPositionsLength; index++) {
        var enemyBulletPosition = enemyBulletPositions[index];
        enemyBulletPosition[1] += 10;
        if(enemyBulletPosition[1] >= gameHeight) {
            enemyBulletPositions.splice(index, 1);
        }
    }
}

function gameOver() {
    clearInterval(gameTaskId);
    drawRectangle(0, 0, gameWidth, gameHeight, "#000000");
    drawText(0, 0, "Game Over", "#FFFFFF", "48px sans-serif");
    
    hideElement("spaceInvaders");
    showElement("submitButton");
    
    alert("Game Over!");
}

function submitScoreButton() {
    alert("Score submission is currently disabled.\nSorry for the inconvenience.");
}