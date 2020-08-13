// variable for the selected man piece
var selectedman = undefined
// array to specific the man potition in the cells

  var men = [
    {row:8, cell:2, color: 'grey'},
    {row:8, cell:4, color: 'grey'},
    {row:8, cell:6, color: 'grey'},
    {row:8, cell:8, color: 'grey'},
    {row:7, cell:1, color: 'grey'},
    {row:7, cell:3, color: 'grey'},
    {row:7, cell:5, color: 'grey'},
    {row:7, cell:7, color: 'grey'},
    {row:6, cell:2, color: 'grey'},
    {row:6, cell:4, color: 'grey'},
    {row:6, cell:6, color: 'grey'},
    {row:6, cell:8, color: 'grey'},
    {row:3, cell: 1, color: 'black'},
    {row:3, cell: 3, color: 'black'},
    {row:3, cell: 5, color: 'black'},
    {row:3, cell: 7, color: 'black'},
    {row:2, cell: 2, color: 'black'},
    {row:2, cell: 4, color: 'black'},
    {row:2, cell: 6, color: 'black'},
    {row:2, cell: 8, color: 'black'},
    {row:1, cell: 1, color: 'black'},
    {row:1, cell: 3, color: 'black'},
    {row:1, cell: 5, color: 'black'},
    {row:1, cell: 7, color: 'black'},
    
]

//function to render the potition of the men
function rendermen(){
    console.log('rendering men')
    clearBoard()
    $(`.white.cell`).click(moveSelectedManHere)
    for ( let i=0; i<men.length; i++){
        let man = men[i];
        console.log(man)
        if(man.row && man.cell){
        $(`#cell-${man.row}-${man.cell}`).html(renderman(i, man.color))
        $(`#cell-${man.row}-${man.cell}`).unbind('click')
    }else {
        console.log(`put`, man, `into out of play`)
        $(`#out-play-${man.color}`).append(`<div class= "cell">${renderman(i, man.color)}</div>`)
    }
}

    $('.man').click(selectman)
}
    
// function to render each piece (man)
function renderman(i, color){
    if (men[i].isKing){

    return `<div id="man-${i}" class="man ${color}-man">
    <img src="Images\Black Checker Symbol.png" style= "with:100%; height: 100%"
    </div>`
    
}else
return  `<div id="man-${i}" class="man ${color}-man"></div>`
}

// function to select the each man
    function selectman(){
        let man = $(this)
        if(man.hasClass(`selected`)){
            console.log(`this mas already selected`)
            remove()
            return
        }
        $(`.selected`).removeClass(`selected`)
        
        let id = man.attr('id')
        console.log('selecting man:' , man)
        console.log (`the id of man is ${id}`)

        let stringParts = id.split('-')
        console.log(`string =`, stringParts)
        
        let manIndex= stringParts[1]
        console.log('manIndex==', manIndex)
       
        selectedman = men[manIndex]
        console.log(`finished selecting man:` , selectedman)
        
        man.addClass(`selected`)
        }
    function remove(){
            console.log(`removing this...`, selectedman)
            selectedman.row= undefined
            selectedman.cell= undefined
            selectedman = undefined
            rendermen()
            
    }
        

// function to uniform the pieces 
function parity(num){
    return(num %2 ==0) ? 'odd': 'even'
}
// function to separe and uniform the cell by color
function cellColor(cellNum,rowNum){
    return parity(cellNum)== parity(rowNum) ? 'white' :'black'
}
//Funtion to move the selected man
function moveSelectedManHere(){
    console.log('things')
    if (selectedman){
        console.log(`move man here`)
        let whiteCell = $(this)
        let id = whiteCell.attr('id')
        console.log(`id:`, id)
        console.log(`white cell:`, whiteCell)
        let idParts = id.split('-')
        console.log(`idParts =`, idParts)

        selectedman.row= idParts[1]
        selectedman.cell=idParts[2]
        

        console.log(` the man Im moving is`, selectedman.color)
        if (selectedman.color ==`grey` && selectedman.row == 1) {
            console.log(`Im moving a grey man to the white home row`)
            selectedman.isKing = true
        }
        selectedman=undefined
        rendermen()
    }else{
        console.log(`select a man invalid`)
    }
}
