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
    for ( let i=0; i<men.length; i++){
        let man = men[i];
        console.log(man)
        $(`#cell-${man.row}-${man.cell}`).html(renderman(i, man.color))
        $(`#cell-${man.row}-${man.cell}`).click(undefined)
    }
    }
    
// function to render each piece (man)
function renderman(i, color){
    return`<div class ="man-wrapper"><div id="man-${i}" class="man ${color}-man"></div></div>`
}

// function to select the each man
    function selectman(){
        $(`.selected`).removeClass(`selected`);
        let man = $(this)
        let id = man.attr('id')
        console.log('selecting man:' , man)
        console.log (`the id of man is ${id}`)

        let stringParts = id.split('-')
        console.log(`string =`, stringParts)
        
        let manIndex = stringParts[1]
        console.log('manIndex==', manIndex)
       
        selectedman = men[manIndex]
        console.log(`finished selecting man:` , selectedman)
        
        man.addClass(`selected`)
        }

// function to uniform the pieces 
function parity(num){
    return(num %2 ==0) ? 'odd': 'even'
}
// function to separe and uniform the cell by color
function cellColor(cellNum,rowNum){
    return parity(cellNum)== parity(rowNum) ? 'white' :'black'
}
function moveSelectedManHere(){
    console.log('things')
    if (selectedman){
        console.log(`moveSelectedMan`)
        selectedman.row =4
        selectedman.cell = 1
        rendermen()
    }else{
        console.log(`select a man fool`)
    }
}
