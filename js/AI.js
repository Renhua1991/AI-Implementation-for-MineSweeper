
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
		console.log(number_open_before);

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
		for (var i = 0; i < len; i++) {
			b.MarkPeripheryGrids(Math.floor(queue[i] / num_row), Math.floor(queue[i] % num_row));
		}
      

// 2. open

		for (var i = 0; i < len; i++) {
			b.OpenPeripheryGrids(Math.floor(queue[i] / num_row), Math.floor(queue[i] % num_row));
		}

		var number_open_after = b.get_number_open();

		//straight forward doesn't work, call tank
		if(number_open_after == number_open_before) {
			var min = 1000;
			var max = 0;
			var stats = TankSolver();
			var unknown = b.getUnknownBoundary();
			if (unknown.length == 0) {
				b.randomClick();
				return;
			}
			for (var i =0; i < stats.length; i++) {
				if (stats[i] == 0) {
					min = 0;
					var cur = unknown[i];
					var col = Math.floor(cur / num_row);
					var row = Math.floor(cur % num_row);
					b.open_grid(col, row);
				} else {
					min = Math.min(min, stats[i]);
					max = Math.max(max, stats[i]);
				}
			}
			if (min != 0) {
				//clickLeast(stats, min, unknown);

				// markLargest(stats, max, unknown);
				 compareLeastLargest(stats, min, max, unknown);
			}
		}
	
	}
	function clickLeast(stats, min, unknown) {
		console.log(stats);
		console.log("dangerous: " + "min = " + min);
		for (var i =0; i < stats.length; i++) {
			if (stats[i] == min) {
				var cur = unknown[i];
				var col = Math.floor(cur / num_row);
				var row = Math.floor(cur % num_row);
				b.open_grid(col, row);
				break;
			}
		}
	}
	function markLargest(stats, max, unknown) {
		console.log(stats);
		console.log("dangerous: " + "max = " + max);
		for (var i =0; i < stats.length; i++) {
			if (stats[i] == max) {
				var cur = unknown[i];
				var col = Math.floor(cur / num_row);
				var row = Math.floor(cur % num_row);
				b.mark_grid_AI(col, row);
				break;
			}
		}
	}
	function compareLeastLargest (stats, min, max, unknown) {

		var minCount = 0;
		var maxCount = 0;
		for (var i = 0; i < stats.length; i++) {
			var cur = stats[i];
			if (cur == min) {
				minCount++;
			} 
			if (cur == max) {
				maxCount++;
			}
		}
		if (minCount <= maxCount) {
			clickLeast(stats, min, unknown);
		} else {
			markLargest(stats, max, unknown);
		}

	}
	function TankSolver() {
		console.log("Tank");
		var unknown = b.getUnknownBoundary();
		var boundary = b.getOpenBoundary();
		var stats = new Array;
		for (var i = 0; i < unknown.length; i++) {
			stats[i] = 0;
		}

		recurse(unknown, boundary, stats, 0, b.getRemain());
		//recurse(unknown, boundary, stats, 0);
		return stats;
	}
	//using remain
	function recurse(unknown, boundary, stats, k, remain) {
		for (var i = 0; i < boundary.length; i++) {
			var cur = boundary[i];
			var col = Math.floor(cur / num_row);
			var row = Math.floor(cur % num_row);
			// too many mines
			if (b.surroundingMarked(col, row, 2) > b.getCount(col, row)) {
				return;
			}
			// too many empties
			if (b.surroundingMarked(col, row, 0) + b.surroundingMarked(col, row, 2)
				< b.getCount(col, row)) {
				return;
			}
		}
		if (k == unknown.length) {
			var total = 0;
			for (var i = 0; i < unknown.length; i++) {
				var cur = unknown[i];
				var col = Math.floor(cur / num_row);
				var row = Math.floor(cur % num_row);
				if (b.getFlag(col, row) == 2) {
					total++;
				}
			}
			if (total > remain){
				console.log("invalid");
				return;

			} 

			for (var i = 0; i < unknown.length; i++) {
				var cur = unknown[i];
				var col = Math.floor(cur / num_row);
				var row = Math.floor(cur % num_row);
				if (b.getFlag(col, row) == 2) {
					stats[i] = stats[i] + 1;
				}
			}
			return;
		}
		var cur = unknown[k];
		var col = Math.floor(cur / num_row);
		var row = Math.floor(cur % num_row);
		b.setFlag(col, row, 2);
		recurse(unknown, boundary, stats, k + 1);
		b.setFlag(col, row, 3);
		recurse(unknown, boundary, stats, k + 1);
		b.setFlag(col, row, 0);
	}
}

