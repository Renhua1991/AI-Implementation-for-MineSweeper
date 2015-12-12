
function AIshow() {
	/**
	 * Returns a random number between 0 and num_row * num_col
	 */
	function getRandomArbitrary() {
		return Math.random() * (num_row * num_col);
	}


	/**
	 * straightforward AI method
	 */
	this.straightForward = function() {
		var index = getRandomArbitrary();
		var x = Math.floor(index / num_row);
		var y = Math.floor(index % num_row);
		
		/*
        * make sure that user can't click a mine or a grid with count don't equal 0
        */
		if (first_time) {
            while (b.check_valid(x, y)) {
                b = new board(num_col, num_row, num_mine);
                b.init();
            }
            first_time = false;

            // open the grid with 0 mines around
	        b.open_grid(x, y);

	        var queue = b.getOpenGrid();
			var len = queue.length;
			for (var i = 0; i < len; i++) {
				// console.log(Math.floor(queue[i] / num_row));
				// console.log(Math.floor(queue[i] % num_row));
				b.checkNumberOfPeripheryGrids(Math.floor(queue[i] / num_row), Math.floor(queue[i] % num_row));
			}	

        }
	
	}

}

