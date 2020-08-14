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
                blackCheckerElement.setAttribute("class", "man black-man king-man");
                cellElement.appendChild(blackCheckerElement);
            }
        
            if(row > 5 && isWhite(row, column)) {
                var greyCheckerElement = document.createElement("div");
                greyCheckerElement.setAttribute("class", "man grey-man king-man");
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

function generateCell(rowElement, cellId) {
    var cellElement = document.createElement("div");
    cellElement.setAttribute("id", cellId);

    rowElement.appendChild(cellElement);
    return cellElement;
}

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

function onClickCell(event) {

}

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

function showPossibleMoves() {
    var cellElement = selectedPiece.parentElement;
    var cellId = cellElement.getAttribute("id");
    var cellIdSplit = cellId.split("-");

    var currentRow = parseInt(cellIdSplit[1]);
    var currentColumn = parseInt(cellIdSplit[2]);

    if(greyTurn) {
        if(isKing(selectedPiece)) {

        }

        if(currentRow == 6) {

        }
    } else {

    }
}

function hidePossibleMoves() {

}

function hasMan(cellId) {
    var cellElement = document.getElementsById(cellId);
    for(var i = 0; i < cellElement.children.length; i++) {
        var child = cellElement.children[i];
        if(child.classList.contains("man")) return true;
    }
    return false;
}

function getMan(cellId) {
    var cellElement = document.getElementsById(cellId);
    for(var i = 0; i < cellElement.children.length; i++) {
        var child = cellElement.children[i];
        if(child.classList.contains("man")) return child;
    }
    return null;
}

function isEnemy(manElement) {
    return manElement.classList.contains(greyTurn ? "black-man" : "grey-man");
}

function isKing(manElement) {
    return manElement.classList.contains("king-man");
}