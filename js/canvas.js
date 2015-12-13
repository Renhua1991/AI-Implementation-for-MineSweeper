
window.onload = function(){

	num_row = 9;
	num_col = 9;
	num_mine = 10;

	initialize(num_col, num_row, num_mine);


	document.getElementById('easy').onclick = function() {
		num_row = 9;
		num_col = 9;
		num_mine = 10;
		document.getElementById("timer").innerHTML = null;
		first_time = true;
		initialize(num_col, num_row, num_mine);
	};


	document.getElementById('intermediate').onclick = function() {
		num_row = 16;
		num_col = 16;
		num_mine = 40;
		document.getElementById("timer").innerHTML = null;
		first_time = true;
		initialize(num_col, num_row, num_mine);
	};


	document.getElementById('hard').onclick = function() {
		num_row = 16;
		num_col = 30;
		num_mine = 99;
		document.getElementById("timer").innerHTML = null;
		first_time = true;
		initialize(num_col, num_row, num_mine);
	};


	document.getElementById('AI').onclick = function() {
		console.log("ai show");
		var ai = new AIshow();
		ai.straightForward();
		//ai.getPeripheryIndex();
	};
	

	document.getElementById('answer').onclick = function() {
		b.show_mines();
		//ai.getPeripheryIndex();
	};

	document.getElementById('autoPlay').onclick = function() {
		var ai = new AIshow();
		ai.autoSolver();
	};

	/**
	* add left click listener on canvas 
	* get the mouse position
	*/
	document.getElementById('canvas').addEventListener('click', leftClick, false);


	/**
	* add right click listener on canvas 
	* get the mouse position
	*/
	document.getElementById('canvas').addEventListener('contextmenu', rightClick, false);


	/**
	* add double click listener on canvas 
	*/
	document.getElementById('canvas').addEventListener('dblclick', doubleClick, false);

};


/**
* initialize the game
*/
function initialize(x, y, number) {
	b = new board(x, y, number);
	b.init();
};

