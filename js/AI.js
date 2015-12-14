
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
			var unknown = b.getUnknownBoundary();
			if (unknown.length == 0) {
				b.randomClick();
				return;
			}
			if (b.getUnknownBoundary().length <= 10) {
				singleAreaSolve();
			}
			//singleAreaSolve();
			else islandSolve();
		}
	
	}
	function islandSolve() {
		console.log("Tank");
		var islands = b.numberOfIsland();
		var res = new Array;
		var min = 1000;
		for (var i = 0; i < islands.length; i++) {
			console.log("tank islands" );
			console.log(islands[i]);
			var cur = TankSolver(islands[i]);

			res.push(cur);
		}
		for (var i = 0; i < res.length; i++) {
			var cur = res[i];
			for (var j = 0; j < cur.length; j++) {
				if (cur[j] == 0) {
					min = 0;
					var num = islands[i][j];
					var col = Math.floor(num / num_row);
					var row = Math.floor(num % num_row);
					b.open_grid(col, row);
				}
			}
		}
		if (min == 0) {
			return;
		}
		console.log("calculate");
		
		var little = 1;
		var big = 0;
		var littleIndex = 0;
		var bigIndex = 0;
		var resIndex = new Array;
		for (var i = 0; i < islands.length; i++) {
			var cur = islands[i];
			var curRes = new Array;
			var remain = b.getRemain();
			recurseII(cur, b.getOpenBoundary(), curRes, 0, remain);
			resIndex.push(curRes);
			var solutionNum = curRes.length;
			for (var j = 0; j < res[i].length; j++) {
				if (res[i][j] / solutionNum < little) {
					littleIndex = cur[j];
					little = res[i][j] / solutionNum;
				}
				if (res[i][j] / solutionNum > big) {
					bigIndex = cur[j];
					big = res[i][j] / solutionNum;
				}
			}
		}
		if (little <= 1 - big) {
			var col = Math.floor(littleIndex / num_row);
			var row = Math.floor(littleIndex % num_row);
			console.log("click" + col + " " + row);
			b.open_grid(col, row);
		} else {
			var col = Math.floor(bigIndex / num_row);
			var row = Math.floor(bigIndex % num_row);
			console.log("mark" + col + " " + row);
			b.mark_grid_AI(col, row);
		}

	}

	function recurseII(unknown, boundary, result, k, remain) {
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
				console.log(total + " " + remain);
				console.log("invalid");
				return;
			} 
			var res = new Array;
			for (var i = 0; i < unknown.length; i++) {
				var cur = unknown[i];
				var col = Math.floor(cur / num_row);
				var row = Math.floor(cur % num_row);
				if (b.getFlag(col, row) == 2) {
					res.push(cur);
				}
			}
			result.push(res);
			return;
		}
		var cur = unknown[k];
		var col = Math.floor(cur / num_row);
		var row = Math.floor(cur % num_row);
		b.setFlag(col, row, 2);
		recurse(unknown, boundary, result, k + 1, remain);
		b.setFlag(col, row, 3);
		recurse(unknown, boundary, result, k + 1, remain);
		b.setFlag(col, row, 0);
	}





	function singleAreaSolve() {
		var min = 1000;
		var max = 0;
		var unknown = b.getUnknownBoundary();
		var stats = TankSolver(unknown);
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
	function TankSolver(unknown) {
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
		recurse(unknown, boundary, stats, k + 1, remain);
		b.setFlag(col, row, 3);
		recurse(unknown, boundary, stats, k + 1,remain);
		b.setFlag(col, row, 0);
	}

	/**
	 * automatically solve minesweeper using AI algo
	 */
	this.autoSolver = function() {
		for (var i = 0; i < 10; i++) {
			console.log("aaaaa");
			this.straightForward();
			console.log(b.getGameStatus());
		}
	}


}

