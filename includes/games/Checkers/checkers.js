// Function that creates the board
function generateBoard() {
    var boardContainer = document.getElementById("board_container");
    for(var row = 1; row <= 8; row++) {
        var rowId = ("row-" + row);
        var rowElement = generateRow(boardContainer, rowId);

        for(var column = 1; column <= 8; column++) {
            var cellId = ("cell-" + row + "-" + column);
            var cellElement = generateCell(rowElement, cellId);

            var cellClass = ("cell " + (isWhite(row, column) ? "white" : "black"));
            cellElement.setAttribute("class", cellClass);
        
            if(row < 4 && isWhite(row, column)) {
                var blackCheckerElement = document.createElement("div");
                blackCheckerElement.setAttribute("class", "man black-man");
                cellElement.appendChild(blackCheckerElement);
            }
        
            if(row > 5 && isWhite(row, column)) {
                var greyCheckerElement = document.createElement("div");
                greyCheckerElement.setAttribute("class", "man grey-man");
                cellElement.appendChild(greyCheckerElement);
            }
        }
    }

}


// If a number divided by 2 has no remainder, the number is even
function isEven(number) {
    return ((number % 2) == 0);
}

// If a number divided by 2 has a remainder, the number is odd
function isOdd(number) {
    return ((number % 2) != 0);
}

// A cell will be white if one of these 2 conditions is met:
// - row and column are both even
// - row and column are both odd
function isWhite(row, column) {
    var bothEven = (isEven(row) && isEven(column));
    var bothOdd = (isOdd(row) && isOdd(column));
    return (bothEven || bothOdd);
}

// This function creates a row for the board
function generateRow(boardContainer, rowId) {
    var rowElement = document.createElement("div");
    rowElement.setAttribute("id", rowId);
    rowElement.setAttribute("class", "row");

    boardContainer.appendChild(rowElement);
    return rowElement;
}
// Function to generate a cell
function generateCell(rowElement, cellId) {
    var cellElement = document.createElement("div");
    cellElement.setAttribute("id", cellId);

    rowElement.appendChild(cellElement);
    return cellElement;
}
// Function to click on checkers "man"
function enableClicking() {
    var manArray = document.getElementsByClassName("man");
    for(var i = 0; i < manArray.length; i++) {
        var man = manArray[i];
        man.addEventListener("click", onClickMan);
    }

    var cellArray = document.getElementsByClassName("cell");
    for(var i = 0; i < cellArray.length; i++) {
        var cell = cellArray[i];
        cell.addEventListener("click", onClickCell);
    }
}

// True if grey should move, false if black should move
var greyTurn = true;
var selectedPiece = undefined;

function onClickMan(event) {
    var manDiv = event.target;
    var manDivGrey = manDiv.classList.contains("grey-man");
    if(manDivGrey != greyTurn) return;

    var manCell = manDiv.parentElement;
    var manCellId = manCell.getAttribute("id");
    var manCellIdSplit = manCellId.split("-");

    var currentRow = parseInt(manCellIdSplit[1]);
    var currentColumn = parseInt(manCellIdSplit[2]);
    onSelectPiece(manDiv);
}
// function to select the cell where to more
function onClickCell(event) {
    if(selectedPiece == null) return;

    var cellElement = event.target;
    var cellId = cellElement.getAttribute("id");
    if(cellId == null) {
        console.log("Element " + cellElement.parentElement.innerHTML + " has null ID!");
        return;
    }

    var cellIdSplit = cellId.split("-");
    var newRow = parseInt(cellIdSplit[1]);
    var newColumn = parseInt(cellIdSplit[2]);

    var oldCellId = selectedPiece.parentElement.getAttribute("id");
    var oldCellIdSplit = oldCellId.split("-");
    var oldRow = parseInt(oldCellIdSplit[1]);
    var oldColumn = parseInt(oldCellIdSplit[2]);

    if(isPossibleMove(newRow, newColumn)) {
        var movementX = (newColumn - oldColumn);
        var movementY = (newRow - oldRow);
        if(Math.abs(movementX) == 2 && Math.abs(movementY) == 2) {
            var enemyCheckX = (movementX < 0 ? -1 : 1);
            var enemyCheckY = (movementY < 0 ? -1 : 1);
            enemyCheckX = (oldColumn + enemyCheckX);
            enemyCheckY = (oldRow + enemyCheckY);

            var enemyCellId = ("cell-" + enemyCheckY + "-" + enemyCheckX);
            var manElement = getMan(enemyCellId);
            if(isEnemy(manElement)) {
                manElement.parentElement.removeChild(manElement);
                console.log("Man '" + enemyCellId + "' should be removed!");
                if(greyTurn) {
                    var outPlayBlack = document.getElementById("out-play-black");
                    outPlayBlack.appendChild(manElement);
                } else {
                    var outPlayGrey = document.getElementById("out-play-grey");
                    outPlayGrey.appendChild(manElement);
                }
            }
        }
    

        selectedPiece.parentElement.removeChild(selectedPiece);
        cellElement.appendChild(selectedPiece);
        selectedPiece.classList.remove("selected");


        var shouldKing = ((greyTurn && newRow == 1) || (!greyTurn && newRow == 8))
        if(shouldKing) selectedPiece.classList.add("king-man");

        selectedPiece = undefined;
        greyTurn = !greyTurn;
        hidePossibleMoves();
        score();
    }
}
// Funtion for the pieces that are selected
function onSelectPiece(element) {
    if(selectedPiece != null) {
        var oldSelectedPiece = selectedPiece;
        selectedPiece = undefined;
        oldSelectedPiece.classList.remove("selected");
        if(oldSelectedPiece.getAttribute("id") == element.getAttribute("id")) {
            hidePossibleMoves();
            return;
        }
    }

    element.classList.add("selected");
    selectedPiece = element;
    showPossibleMoves();
}
// function to show where to go
function showPossibleMoves() {
    var cellElement = selectedPiece.parentElement;
    var cellId = cellElement.getAttribute("id");
    var cellIdSplit = cellId.split("-");

    var currentRow = parseInt(cellIdSplit[1]);
    var currentColumn = parseInt(cellIdSplit[2]);

    var coordChecks = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    var enemyChecks = [[-2, -2], [-2, 2], [2, -2], [2, 2]];
    for(var i = 0; i < coordChecks.length; i++) {
        var coord = coordChecks[i];
        var xChange = coord[0];
        var yChange = coord[1];

        var rowToCheck = (currentRow + yChange);
        if(rowToCheck < 1 || rowToCheck > 8) continue;

        var columnToCheck = (currentColumn + xChange);
        if(columnToCheck < 1 || columnToCheck > 8) continue;

        var cellToCheckId = ("cell-" + rowToCheck + "-" + columnToCheck);
        if(isEnemy(getMan(cellToCheckId))) {
            var jumpCoord = enemyChecks[i];
            var xJump = jumpCoord[0];
            var yJump = jumpCoord[1];

            rowToCheck = (currentRow + yJump);
            if(rowToCheck < 1 || rowToCheck > 8) continue;
    
            columnToCheck = (currentColumn + xJump);
            if(columnToCheck < 1 || columnToCheck > 8) continue;
            cellToCheckId = ("cell-" + rowToCheck + "-" + columnToCheck);
        }

        if(isPossibleMove(rowToCheck, columnToCheck)) {
            var cellToCheckElement = document.getElementById(cellToCheckId);
            cellToCheckElement.classList.add("possible");
            console.log("Moving [" + currentRow + ", " + currentColumn + "] to [" + rowToCheck + ", " + columnToCheck + "] is possible.");
        } else {
            console.log("Moving [" + currentRow + ", " + currentColumn + "] to [" + rowToCheck + ", " + columnToCheck + "] is NOT possible!");
        }
    }
}

function hidePossibleMoves() {
    var possibleMoveList = document.getElementsByClassName("possible");
    if(possibleMoveList == null) return;

    var elementArray = [];
    for(var i = 0; i < possibleMoveList.length; i++) {
        var element = possibleMoveList.item(i);
        elementArray.push(element);
    }

    elementArray.forEach(element => {
        if(element == null) return;
        element.classList.remove("possible");
    });
}

function isPossibleMove(row, column) {
    if(!isWhite(row, column)) return false;
    var cellId = selectedPiece.parentElement.getAttribute("id");
    var cellIdSplit = cellId.split("-");
    var currentRow = parseInt(cellIdSplit[1]);
    var currentColumn = parseInt(cellIdSplit[2]);

    var cellToCheckId = ("cell-" + row + "-" + column);
    if(hasMan(cellToCheckId)) return false;

    if(greyTurn) {
        if(isKing(selectedPiece)) return true;
        return (row < currentRow && column != currentColumn);
    } else {
        if(isKing(selectedPiece)) return true;
        return (row > currentRow && column != currentColumn);
    }
}

function hasMan(cellId) {
    var cellElement = document.getElementById(cellId);
    for(var i = 0; i < cellElement.children.length; i++) {
        var child = cellElement.children[i];
        if(child.classList.contains("man")) return true;
    }
    return false;
    score = score + 1
}

function getMan(cellId) {
    var cellElement = document.getElementById(cellId);
    for(var i = 0; i < cellElement.children.length; i++) {
        var child = cellElement.children[i];
        if(child.classList.contains("man")) return child;
    }
    return null;
}

function isEnemy(manElement) {
    if(manElement == null) return false;
    return manElement.classList.contains(greyTurn ? "black-man" : "grey-man");
}

function isKing(manElement) {
    if(manElement == null) return false;
    return manElement.classList.contains("king-man");
}

function score(){
    var outPlayGreyElement = document.getElementById("out-play-grey");
    var outPlayGreyCount = outPlayGreyElement.childElementCount;

    var outPlayBlackElement = document.getElementById("out-play-black");
    var outPlayBlackCount = outPlayBlackElement.childElementCount;

    var blackScore = (outPlayGreyCount - outPlayBlackCount);
    var greyScore = (outPlayBlackCount - outPlayGreyCount);
    var textOutput = ("Grey Score: " +greyScore + " | Black Score: " + blackScore);

    var score = document.getElementById("score");
    score.innerHTML = textOutput;

    if (greyScore == 8 || blackScore == 8){
        let game_id = 5; // checkers
        let score = parseInt( document.getElementById('greyScore').innerHTML );
        scorePush(game_id,score);
    }
    
}