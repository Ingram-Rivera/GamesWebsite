document.addEventListener('DOMContentLoaded', () => {
	const gridView = document.querySelector('.matrix');
	const scoreView = document.getElementById('score_goes_here');
	const resultView = document.getElementById('win_or_lose');
	const width = 4;
	let squares = [];
	let score = 0;

	// create board
	function boardGenerator() {
		for (let i=0; i<width*width;i++) {
			square = document.createElement('div');
			square.innerHTML = 0;
			gridView.appendChild(square);
			squares.push(square);
		}
		makeMyNumber();
		makeMyNumber();
	}
	boardGenerator();
	toggleVisible();

	// make numbers
	function makeMyNumber() {
		let randomNumber = Math.floor(Math.random() * squares.length);
		if (squares[randomNumber].innerHTML == 0 ) {
			squares[randomNumber].innerHTML = 2;
			checkForGameOver();
		} else {
			makeMyNumber();
		}
	}

	function toggleVisible() {
		let matrix = document.querySelectorAll('.matrix div');
		for (let i=0; i < matrix.length; i++){
			if (matrix[i].innerHTML == 0){
				matrix[i].setAttribute("class", "tile-noshow");
			} else {
				matrix[i].setAttribute("class", "tile");
			}
		}
	}

	// right
	function right() {
		for (let i=0; i<16;i++){
			if (i % 4 === 0){
				let ttlOne = squares[i].innerHTML;
				let ttlTwo = squares[i+1].innerHTML;
				let ttlThree = squares[i+2].innerHTML;
				let ttlFour = squares[i+3].innerHTML;
				let row = [parseInt(ttlOne),parseInt(ttlTwo),
					parseInt(ttlThree),parseInt(ttlFour)];

				let filteredRow = row.filter(num => num);
				let missing = 4 - filteredRow.length;
				let zeros = Array(missing).fill(0);
				let newRow = zeros.concat(filteredRow);

				squares[i].innerHTML = newRow[0];
				squares[i+1].innerHTML = newRow[1];
				squares[i+2].innerHTML = newRow[2];
				squares[i+3].innerHTML = newRow[3];
			}
		}
	}

	// left
	function left() {
		for (let i=0; i<16;i++){
			if (i % 4 === 0){
				let ttlOne = squares[i].innerHTML;
				let ttlTwo = squares[i+1].innerHTML;
				let ttlThree = squares[i+2].innerHTML;
				let ttlFour = squares[i+3].innerHTML;
				let row = [parseInt(ttlOne),parseInt(ttlTwo),
					parseInt(ttlThree),parseInt(ttlFour)];

				let filteredRow = row.filter(num => num);
				let missing = 4 - filteredRow.length;
				let zeros = Array(missing).fill(0);
				let newRow = filteredRow.concat(zeros);

				squares[i].innerHTML = newRow[0];
				squares[i+1].innerHTML = newRow[1];
				squares[i+2].innerHTML = newRow[2];
				squares[i+3].innerHTML = newRow[3];
			}
		}
	}

	// down
	function down(){
		for (let i=0;i<4;i++){
			let ttlOne = squares[i].innerHTML;
			let ttlTwo = squares[i+width].innerHTML;
			let ttlThree = squares[i+(width*2)].innerHTML;
			let ttlFour = squares[i+(width*3)].innerHTML;
			let column = [parseInt(ttlOne),parseInt(ttlTwo),
			 parseInt(ttlThree),parseInt(ttlFour)];

			let filteredColumn = column.filter(num => num);
			let missing = 4 - filteredColumn.length;
			let zeros = Array(missing).fill(0);
			let newColumn = zeros.concat(filteredColumn);

			squares[i].innerHTML = newColumn[0];
			squares[i+width].innerHTML = newColumn[1];
			squares[i+(width*2)].innerHTML = newColumn[2];
			squares[i+(width*3)].innerHTML = newColumn[3];
		}
	}

	// up
	function up(){
		for (let i=0;i<4;i++){
			let ttlOne = squares[i].innerHTML;
			let ttlTwo = squares[i+width].innerHTML;
			let ttlThree = squares[i+(width*2)].innerHTML;
			let ttlFour = squares[i+(width*3)].innerHTML;
			let column = [parseInt(ttlOne),parseInt(ttlTwo),
			 parseInt(ttlThree),parseInt(ttlFour)];

			let filteredColumn = column.filter(num => num);
			let missing = 4 - filteredColumn.length;
			let zeros = Array(missing).fill(0);
			let newColumn = filteredColumn.concat(zeros);

			squares[i].innerHTML = newColumn[0];
			squares[i+width].innerHTML = newColumn[1];
			squares[i+(width*2)].innerHTML = newColumn[2];
			squares[i+(width*3)].innerHTML = newColumn[3];
		}
	}

	function rows(){
		for (let i=0;i<15;i++){
			if (squares[i].innerHTML === squares[i+1].innerHTML){
				let combinedTotal = parseInt(squares[i].innerHTML) + 
				 parseInt(squares[i+1].innerHTML);
				 squares[i].innerHTML = combinedTotal;
				 squares[i+1].innerHTML = 0;
				 score += combinedTotal;
				 scoreView.innerHTML = score;
			}
		}
		checkForWin();
	}

	function columns(){
		for (let i=0;i<12;i++){
			if (squares[i].innerHTML === squares[i+width].innerHTML){
				let combinedTotal = parseInt(squares[i].innerHTML) + 
				 parseInt(squares[i+width].innerHTML);
				 squares[i].innerHTML = combinedTotal;
				 squares[i+width].innerHTML = 0;
				 score += combinedTotal;
				 scoreView.innerHTML = score;
			}
		}
		checkForWin();
	}

	// keycodes
	function keyControl(e){
		if (e.keyCode === 39){
			kRight();
		}
		if (e.keyCode == 37){
			kLeft();
		}
		if (e.keyCode == 38){
			kUp();
		} 
		if (e.keyCode == 40){
			kDown();
		}
	}
	document.addEventListener('keyup',keyControl);

	function kRight(){
		right();
		rows();
		right();
		makeMyNumber();
		toggleVisible();
	}
	function kLeft(){
		left();
		rows();
		left();
		makeMyNumber();
		toggleVisible();
	}
	function kDown(){
		down();
		columns();
		down();
		makeMyNumber();
		toggleVisible();
	}
	function kUp(){
		up();
		columns();
		up();
		makeMyNumber();
		toggleVisible();
	}

	// check for win
	function checkForWin() {
		for (let i=0; i<squares.length; i++) {
			if (squares[i].innerHTML == 2048){
				resultView.innerHTML = '2048. You are a Winner!!!';
				document.removeEventListener('keyup',keyControl);
				let game_id = 3; // 2048
				let score = parseInt( document.getElementById('score_goes_here') );
				scorePush(game_id,score);
			}
		}
	}
	// zero check
	function checkForGameOver() {
		let zeros = 0;
		for (let i=0; i<squares.length; i++) {
			 if (squares[i].innerHTML == 0) {
			 	zeros++;
			 }
		}
		if (zeros === 0) {
			resultView.innerHTML = 'Sorry. You lost.'
			document.removeEventListener('keyup',keyControl);
			let game_id = 3; // 2048
			let score = parseInt( document.getElementById('score_goes_here') );
			scorePush(game_id,score);
		}
	}

});