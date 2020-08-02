function TwoDArray(colm, rows) {
  var array = new Array(colm);
  for (var a = 0; a < array.length; a++) {
    array[a] = new Array(rows);



  }



  return array;



}





var myScore = 0;
var z = 20;
var rows;
var colm;
var totalBombs = 30
var gameStatus = false;






function setup() {
  createCanvas(300, 300);
  colm = floor(width / z);
  rows = floor(height / z);
  grid = TwoDArray(colm, rows);
  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      grid[a][b] = new rectangle(a, b, z);
      resetGame();




    }
  }



  // function buttonSetup(){//
  // createCanvas(100,100);//
  button = createButton("Play");
  //button.position(19,19);//
  button.mousePressed(resetGame);





  var options = [];
  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      options.push([a, b]);
    }
  }




  for (var m = 0; m < totalBombs; m++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var a = choice[0];
    var b = choice[1];



    options.splice(index, 1);
    grid[a][b].bomb = true;



  }



  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      grid[a][b].whatIsAround();
    }



  }
}



function gameOver() {
  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      grid[a][b].shows = true;




    }
  }



}



function mousePressed() {
  background(100);
  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      if (grid[a][b].whatsInsideRect(mouseX, mouseY)) {
        grid[a][b].displayTwo()
        myScore++;






        if (grid[a][b].bomb) {
          myScore = (myScore) - 1;
          gameOver();
          gameStatus = true;
          showScore();




        }
      }
    }
  }
}




function draw() {
  background(50);
  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      grid[a][b].display();
    }
  }



}



function showScore() {



  if (gameStatus == true) {
    alert('GAMEOVER! Your FINAL score is: ' + myScore);
  }



}



function resetGame() {



  resetScore()
  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      grid[a][b] = new rectangle(a, b, z);




    }
    //var button = createButton("Play");//
    // button.mousePressed(resetGame);//
  }



  var options = [];
  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      options.push([a, b]);
    }
  }




  for (var m = 0; m < totalBombs; m++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var a = choice[0];
    var b = choice[1];



    options.splice(index, 1);
    grid[a][b].bomb = true;



  }



  for (var a = 0; a < colm; a++) {
    for (var b = 0; b < rows; b++) {
      grid[a][b].whatIsAround();
    }
  }



  function resetScore() {
    if (myScore > 0) {}
    myScore = 0



  }
}
// function buttonSetup(){//
// createCanvas(100,100);//
// button = createButton("Play");//
//button.position(19,19);//
//   button.mousePressed(resetGame);//
