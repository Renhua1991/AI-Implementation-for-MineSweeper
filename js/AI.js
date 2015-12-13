
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
		
		var number_open_before = b.get_number_open();

		/*
        * make sure that user can't click a mine or a grid with count don't equal 0
        */
		if (first_time) {
            while (b.check_valid(x, y)) {
                b = new board(num_col, num_row, num_mine);
                b.init();
            }
            first_time = false;
            start_time = new Date().getTime();
            // open the grid with 0 mines around
	        b.open_grid(x, y);

        }


		var queue = b.getOpenGrid();
		var len = queue.length;
// 1. mark

  //       setTimeout(function(){
		// 	for (var i = 0; i < len; i++) {
		// 		//sleep(1000);
		// 		// console.log(Math.floor(queue[i] / num_row));
		// 		// console.log(Math.floor(queue[i] % num_row));
		// 		b.MarkPeripheryGrids(Math.floor(queue[i] / num_row), Math.floor(queue[i] % num_row));
		// 		console.log("haha1");
		// 	}
		// }, 2000);
		for (var i = 0; i < len; i++) {
			//sleep(1000);
			// console.log(Math.floor(queue[i] / num_row));
			// console.log(Math.floor(queue[i] % num_row));
			b.MarkPeripheryGrids(Math.floor(queue[i] / num_row), Math.floor(queue[i] % num_row));
		}
      

// 2. open
		// setTimeout(function(){
		// 	for (var i = 0; i < len; i++) {
		// 		//console.log(new Date().getTime());
		// 		b.OpenPeripheryGrids(Math.floor(queue[i] / num_row), Math.floor(queue[i] % num_row));
		// 		console.log("haha2");
		// 	}
		// }, 2000);
		for (var i = 0; i < len; i++) {
			//console.log(new Date().getTime());
			b.OpenPeripheryGrids(Math.floor(queue[i] / num_row), Math.floor(queue[i] % num_row));
		}

		var number_open_after = b.get_number_open();
<<<<<<< HEAD
		console.log(number_open_after);
		if(number_open_after == number_open_before) {
			console.log(TankSolver());
		}
=======
>>>>>>> origin/master
	
	}
	function TankSolver() {
		var unknown = b.getUnknownBoundary();
		var boundary = b.getOpenBoundary();
		var stats = new Array;
		for (var i = 0; i < unknown.length; i++) {
			stats[i] = 0;
		}
		recurse(unknown, boundary, stats, 0);
		return stats;
	}
	function recurse(unknown, boundary, stats, k) {
		//console.log(k);
		for (var i = 0; i < boundary.length; i++) {
			var cur = boundary[i];
			var col = Math.floor(cur / num_row);
			var row = Math.floor(cur % num_row);
			if (b.surroundingMarked(col, row, 2) > b.getCount(col, row)) {
				return;
			}
			if (b.surroundingMarked(col, row, 0) < b.getCount(col, row) - b.surroundingMarked(col, row, 2)) {
				return;
			}
		}
		if (k == unknown.length) {
			console.log("findAnswer");
			for (var i = 0; i < unknown.length; i++) {
				var cur = unknown[i];
				var col = Math.floor(cur / num_row);
				var row = Math.floor(cur % num_row);
				if (b.getFlag(col, row) == 2) {
					console.log("find mine:" + cur);
					stats[i] = stats[i] + 1;
				}
			}
			return;
		}
		var cur = unknown[k];
		var col = Math.floor(cur / num_row);
		var row = Math.floor(cur % num_row);
		b.setMark(col, row);
		recurse(unknown, boundary, stats, k + 1);
		b.setUnknown(col, row);
		recurse(unknown, boundary, stats, k + 1);

	}

}

