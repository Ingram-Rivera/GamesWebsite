//jquery code to se document working, apply to the main board and select the man
$(document).ready(function () {
    console.log('document ready')
    $('board_container').html(renderCboard())
    rendermen()
    
})
// function to render the chestboard
function renderCboard(){
    return`
    ${renderRow(1)}
    ${renderRow(2)}
    ${renderRow(3)}
    ${renderRow(4)}
    ${renderRow(5)}
    ${renderRow(6)}
    ${renderRow(7)}
    ${renderRow(8)}
`
}
// function to render the row to specific cells in the chestboard
function renderRow(rowNum){
    return`
<div id="row-${rowNum}" class="row">
    ${renderCell(rowNum, 1)}
    ${renderCell(rowNum, 2)}
    ${renderCell(rowNum, 3)}
    ${renderCell(rowNum, 4)}
    ${renderCell(rowNum, 5)}
    ${renderCell(rowNum, 6)}
    ${renderCell(rowNum, 7)}
    ${renderCell(rowNum, 8)}
    </div>
    `
}
// function to renders the cell to return the by cell color 
function renderCell(rowNum, cellNum){
if (cellColor(cellNum,rowNum) === 'white'){
    return`
    <div id ="cell-${rowNum}-${cellNum}" class= "cell black">
    </div>`
}else
return `<div id ="cell-${rowNum}-${cellNum}" class="cell white"></div>`
}

function clearBoard(){
    $('.white.cell').html('')
    $(`.white.cell`).unbind('click')
    $(`.out-play`).html('')
}