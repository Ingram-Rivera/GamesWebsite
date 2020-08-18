document.addEventListener('DOMContentLoaded', () => {



let defaultRotation = 4
let secondRandom = 0
let setTime = 0
let Score = 0



const grid = document.querySelector('.grid')
let block =Array.from(grid.querySelectorAll('div'))
//Creating each piece
const w =10
const h =20
const firstPiece = [
    
    [1, w+1, w*2 +1, 2],
    [w, w+1, w+2, w*2+2],
    [1, w+1, w*2+1, w*2],
    [w, w*2, w*2+1, w*2+2]
 ]

 const secondPiece = [
    
    [0, w, w+1, w*2+1],
    [w+1, w+2, w*2, w*2+1],
    [0, w, w+1, w*2+1],
    [w+1, w+2, w*2, w*2+1]
 ]

 const thirdPiece = [
    
    [1,w+1, w+2, w*2+1],
    [1, w, w+1, w+2],
    [w, w+1, w+2, w*2+1],
    [1, w, w+1, w*2+1]
 ]

 const fourthPiece = [
    [0, 1, w, w+1],
    [0, 1, w, w+1],
    [0, 1, w, w+1],
    [0, 1, w, w+1],
 ]

 const fifthPiece = [
    
    [1, w+1, w*2+1, w*3+1],
    [w, w+1, w+2, w+3],
    [1, w+1, w*2+1, w*3+1],
    [w, w+1, w*2, w+3]
 ]

 const thePieces = [firstPiece, secondPiece,thirdPiece,fourthPiece,fifthPiece]
// random select
let random = Math.floor(Math.random()*thePieces.length)
let currentRotation = 0
let current = thePieces[random][currentRotation]

//Make the shape

function Make(){
    current.forEach( index => (
        block[defaultRotation + index].classList.add('item')
    ))
        
}

// unMake the shape
function unMake(){
    current.forEach(index => (
        block[defaultRotation + index].classList.remove('item')
    ))
    
}
Make()

//make the Pieces move down every second
//setTime = setInterval(downMovement, 1000)

//assign function to keyCodes
function control(e){
   if(e.keyCode === 37 ) {
      leftMovement()
    } else if (e.keyCode === 38) {
       rotate()
   }else if (e.keyCode === 39) {
      rightMovement()
   }else if (e.keyCode === 40) {
     downMovement()
    }
}
document.addEventListener('keyup', control)

//move down funciton 
function downMovement() {
    unMake()
    defaultRotation += w
    Make()
    stop()
}

//stop function
 function stop(){
     if(current.some(index => block[defaultRotation + index + w].classList.contains('item3'))){
         current.forEach(index => block[defaultRotation + index].classList.add('item3'))
         //start a new Pieces falling
         random = secondRandom
        secondRandom = Math.floor(Math.random() * thePieces.length)
         current = thePieces[random][currentRotation]
         defaultRotation = 4
         Make()
         showShape()
         addScore()
         gameOver()
     }
 }

 //here are the move functions for each piece. The first is the left one. We need to account for the edges.
 function leftMovement (){
    unMake()
    const leftEdge = current.some(index => (defaultRotation + index) % w === 0)
    if(!leftEdge) defaultRotation -=1
    if(current.some(index => block[defaultRotation + index].classList.contains('item3'))) {
        defaultRotation +=1
    }

    Make()

 }
// This is the move the pieces right one, unless is at the ede or there is a item
function rightMovement (){
    unMake()
    const rightEdge = current.some(index => (defaultRotation + index) % w === w -1)
if(!rightEdge) defaultRotation +=1
if(current.some(index => block[defaultRotation + index].classList.contains('item3'))) {
    defaultRotation -=1
}
Make()
}
   
//rotate the Pieces
function rotate(){
unMake()
currentRotation ++
if(currentRotation === current.length) { //if the current rotation gets to 4m, make it go back to 0
    currentRotation = 0
}
current = thePieces[random][currentRotation]
Make()

}

// show up-next Pieces in mini-grid show
const showblock = document.querySelectorAll('.mini-grid div')
const showw = 4 
let showIndex = 0

// the Piecess without rotations
const upNexthirdPiecees = [
    [1, showw+1, showw*2+1, 2], //firstPiece
    [0, showw, showw+1, showw*2+1], //secondPiece
    [1, showw, showw+1, showw+2], //thirdPiece
    [0, 1, showw, showw+1], //fourthPiece
    [1, showw+1, showw*2+1, showw*3+1] //fifthPiece
]

//show the shape in the mini grid
function showShape(){
    //remove any trace of a Pieces from the entire grid
    showblock.forEach(square => {
        square.classList.remove('item3')
    })
    upNexthirdPiecees[secondRandom].forEach(index => {
        showblock[showIndex + index].classList.add('item3')
    })
}

const StartBtn = document.querySelector('#start-button')

//add functionality to the button
StartBtn.addEventListener('click', ()=> {
    if(setTime){
        clearInterval(setTime)
        setTime = null
    } else {
        Make()
        setTime = setInterval(downMovement, 1000)
        secondRandom = Math.floor(Math.random()*thePieces.length)
        showShape()
    }
})
const scoreShow = document.querySelector('#score')
// add score
function addScore(){
for(let i = 0; i < 199; i +=w){
    const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
    if(row.every(index=> block[index].classList.contains('item3'))) {
        Score +=10
        scoreShow.innerHTML = Score
        row.forEach(index => {
            block[index].classList.remove('item3')
            block[index].classList.remove('item')
        })
        const blockRemoved = block.splice(i, w)
        block = blockRemoved.concat(block)
        block.forEach(cell => grid.appendChild(cell))
        }
     }

    }

//game over
function gameOver(){
    if(current.some(index => block[defaultRotation + index].classList.contains('item3'))) {
        console.log(score)
        scoreShow.innerHTML = 'Game Over!'
        console.log(score)
        clearInterval(setTime)

    }
}






})
// to work with each piece, change the array selection from random to the selection of piece you want to work with
// The numbers are from 1 -4. The lines to change are 69, 121, 160. Then you can work with the selected piece.
