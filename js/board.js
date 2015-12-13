
function board(h, w, number) {
	
	/**
	* x is height, y is width, num is the number of mines
	*/
	var x = h;
	var y = w;
	var num = number;

	var arr = [];

	/**
	* judge if the game is end or not
	*/
	var end = false;

	/**
	* x is height, y is width, num is the number of mines
	*/
	var num_open = 0;
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");


	/**
	* initialize the array of grid
	*
	*
	*/
	for (var i = 0; i < x; i++) {
		arr[i] = [];
		for (var j = 0; j < y; j++) {
			var g = new grid();
			arr[i].push(g);
		}
	}


	/**
	*  get all opened grid for use of AI
	*
	*/
	this.getOpenGrid = function() {
		var array = [];

		for (var i = 0; i < num_col; i++) {
			for (var j = 0; j < num_row; j++) {
				if (arr[i][j].flag == 1 && arr[i][j].count != 0) {
					array.push(i * num_row + j);
				}
			}
		}

		return array;
	}

	// get number of surrounding marked mine
	this.surroundingMarked = function(i, j, num) {
		var res = 0;
		// left 
		if (i > 0 && arr[i - 1][j].flag == num) {
			res++;
		}
		// right
		if (i < num_col - 1 && arr[i + 1][j].flag == num) {
			res++;
		}
		// up
		if (j > 0 && arr[i][j - 1].flag == num) {
			res++;
		}
		// down
		if (j < num_row - 1 && arr[i][j + 1].flag == num) {
			res++;
		}
		// left-up
		if (i > 0 && j > 0 && arr[i - 1][j - 1].flag == num) {
			res++;
		}
		// right-up
		if (i > 0 && j < num_row - 1 && arr[i - 1][j + 1].flag == num) {
			res++;
		}
		// left-down
		if (i < num_col - 1 && j > 0 && arr[i + 1][j - 1].flag == num) {
			res++;
		}
		// right-down
		if (i < num_col - 1 && j < num_row - 1 && arr[i + 1][j + 1].flag == num) {
			res++;
		}
		return res;

	}

	/**
	*  get opened boundary
	*
	*/	
	this.getOpenBoundary = function() {
		var array = [];
		for (var i = 0; i < num_col; i++) {
			for (var j = 0; j < num_row; j++) {
				if (arr[i][j].flag == 1 && arr[i][j].count != 0 && arr[i][j].count != this.surroundingMarked(i, j, 2)) {
					array.push(i * num_row + j);
				}
			}
		}
		return array;
	}


	this.besidesBoundary = function(i, j) {
		// left 
		if (i > 0 && arr[i - 1][j].flag == 1) {
			return true;
		}
		// right
		if (i < num_col - 1 && arr[i + 1][j].flag == 1) {
			return true;
		}
		// up
		if (j > 0 && arr[i][j - 1].flag == 1) {
			return true;
		}
		// down
		if (j < num_row - 1 && arr[i][j + 1].flag == 1) {
			return true;
		}
		// left-up
		if (i > 0 && j > 0 && arr[i - 1][j - 1].flag == 1) {
			return true;
		}
		// right-up
		if (i > 0 && j < num_row - 1 && arr[i - 1][j + 1].flag == 1) {
			return true;
		}
		// left-down
		if (i < num_col - 1 && j > 0 && arr[i + 1][j - 1].flag == 1) {
			return true;
		}
		// right-down
		if (i < num_col - 1 && j < num_row - 1 && arr[i + 1][j + 1].flag == 1) {
			return true;
		}
		return false;
	}


	this.getCount = function(i, j) {
		return arr[i][j].count;
	}
	this.getFlag = function(i, j) {
		return arr[i][j].flag;
	}

	/**
	*  get unknown boundary
	*
	*/		
	this.getUnknownBoundary = function() {
		var array = [];
		for (var i = 0; i < num_col; i++) {
			for (var j = 0; j < num_row; j++) {
				if (arr[i][j].flag == 0 && this.besidesBoundary(i, j)) {
					array.push(i * num_row + j);
				}
			}
		}
		return array;
	}

	this.setMark = function(i, j) {
		arr[i][j].flag = 2;
	}
	this.setUnknown = function(i, j) {
		arr[i][j].flag = 0;
	}
	/**
	 * get number of unopened grid around current index (AI)
	 */
	this.MarkPeripheryGrids = function(i, j) {
		var array = [];
		var res = 0;
		// console.log(i);
		// console.log(j);
		
		// left 
		if (i > 0 && arr[i - 1][j].flag != 1) {
			res++;
			array.push((i - 1) * num_col + j);
		}
		// right
		if (i < num_col - 1 && arr[i + 1][j].flag != 1) {
			res++;
			array.push((i + 1) * num_col + j);
		}
		// up
		if (j > 0 && arr[i][j - 1].flag != 1) {
			res++;
			array.push(i * num_col + j - 1);
		}
		// down
		if (j < num_row - 1 && arr[i][j + 1].flag != 1) {
			res++;
			array.push(i * num_col + j + 1);
		}
		// left-up
		if (i > 0 && j > 0 && arr[i - 1][j - 1].flag != 1) {
			res++;
			array.push((i - 1) * num_col + j - 1);
		}
		// right-up
		if (i > 0 && j < num_row - 1 && arr[i - 1][j + 1].flag != 1) {
			res++;
			array.push((i - 1) * num_col + j + 1);
		}
		// left-down
		if (i < num_col - 1 && j > 0 && arr[i + 1][j - 1].flag != 1) {
			res++;
			array.push((i + 1) * num_col + j - 1);
		}
		// right-down
		if (i < num_col - 1 && j < num_row - 1 && arr[i + 1][j + 1].flag != 1) {
			res++;
			array.push((i + 1) * num_col + j + 1);
		}
		// console.log("the number of unopend grid: " + res);
		// console.log("the actual count: " + arr[i][j].count);
		if (res == arr[i][j].count) {
			for (var x = 0; x < array.length; x++) {
				var index_x = array[x] / num_col;
				var index_y = array[x] % num_col;
				// console.log(Math.floor(index_x));
				// console.log(Math.floor(index_y));
				this.mark_grid_AI(Math.floor(index_x), Math.floor(index_y));
			}
		}
	}


	/**
	 * get how many grids are already opened (use for triggering advanced algorithm) 
	 */
	this.get_number_open = function() {
		return num_open;
	}


	/**
	 * get number of unopened grid around current index (AI)
	 */
	this.OpenPeripheryGrids = function(i, j) {
		this.double_grid(i, j);
	}


	/**
	*  get random number in range of [0, x * y]
	*
	*
	*
	*/
	this.randomSet = function() {
		var random_arr = [];
		//put random number withour duplicates into an array
		for (var i = 0; i < num; i++) {
			var cur = Math.floor(getRandomArbitrary(0, x * y));
			// use variable flag to mark if cur exists already
			var flag = false;
			for (var k = 0; k < random_arr.length; k++) {
				if (random_arr[k] == cur) {
					flag = true;
				}
			}
			if (flag) {
				i--;
			} else {
				random_arr.push(cur);
			}
		}
		return random_arr;
	}


	/**
	 * Returns a random number between min (inclusive) and max (exclusive)
	 */
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}


	/**
	* initialize the board
	*
	*
	*
	*
	*
	*/
	this.init = function() {

		/**
		* initialize canvas
		*/
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.canvas.width = 700;
		ctx.canvas.height = 600;
		

		/**
		* two dimensional array filled with mine
		*/
		var mine = this.randomSet();
		//console.log(mine);

		//loop through the array. if the index is in mine, set the isMine attribute with true.
		//var arr = [];
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				g = arr[i][j];
				var index = i * y + j;
				for (var k = 0; k < mine.length; k++) {
					if (mine[k] == index) {
						//console.log(i + "  h  " + j + " ! " + index);
						g.isMine = true;
					}
				}
			}
		}

		// count surrounding mines for each gird
		countMine(arr);

		// draw the board
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				// draw the interface.
				if (arr[i][j].isMine) {
					ctx.fillStyle = "grey";
					ctx.fillRect((size_grid + size_blank) * i, (size_grid + size_blank) * j, size_grid, size_grid);
					// ctx.fillStyle = "black";
					// ctx.font = '12pt Calibri';
					// ctx.fillText(arr[i][j].count.toString(), 23 * i + 10, 23 * j + 15);
					// ctx.stroke();
					
					// ctx.fillStyle = "grey";
					// ctx.fillRect((size_grid + size_blank) * i, (size_grid + size_blank) * j, size_grid, size_grid);
					
				} else {
					ctx.fillStyle = "grey";
					ctx.fillRect((size_grid + size_blank) * i, (size_grid + size_blank) * j, size_grid, size_grid);
					// ctx.fillStyle = "black";
					// ctx.font = '12pt Calibri';
					// ctx.fillText(arr[i][j].count.toString(), (size_grid + size_blank) * i + 10, (size_grid + size_blank) * j + 15);
					// ctx.stroke();
					
					// ctx.fillStyle = "grey";
					// ctx.fillRect((size_grid + size_blank) * i, (size_grid + size_blank) * j, size_grid, size_grid);
					
				}
			}
		}

	}


	/**
	* check if the given grid is qualified 
	*/
	this.check_valid = function(x, y) {
		if (arr[x][y].isMine || arr[x][y].count != 0) {
			return true;
		} else {
			return false;
		}
	}


	/**
	* open the grid at (x, y)
	* status code 1 means the grid is opened by user
	*
	* user can only open grid with status code 0
	*/
	this.open_grid = function(x, y) {
		if (!end) {
			if (arr[x][y].flag == 0) {
				arr[x][y].flag = 1;
				//console.log(arr[x][y].flag);
				if (arr[x][y].isMine) {
					show_mines();
					end = true;
					start_time = 0;
					document.getElementById("timer").innerHTML = "Oops! You lose the game!";
				} else {
					ctx.fillStyle = "yellow";
					ctx.fillRect((size_grid + size_blank) * x, (size_grid + size_blank) * y, size_grid, size_grid);
					ctx.fillStyle = "black";
					ctx.font = '12pt Calibri';
					ctx.fillText(arr[x][y].count.toString(), (size_grid + size_blank) * x + 10, (size_grid + size_blank) * y + 15);
					num_open++;
					if (arr[x][y].count == 0) {
						num_open--;
						open_adjacent(x, y, arr);
					}
				}
			} 
			if (num_open == num_col * num_row - num_mine) {
				timer();
				start_time = 0;
			}
		}
	}


	/**
	* mark the grid at (x, y)
	* status code 2 means the grid is marked as mine by user
	*
	* If user right clicks the grid with status code 0, it would change status code to 2;
	* If user right clicks the grid with status code 2, it would change status code to 0;
	*/
	this.mark_grid = function(x, y) {
		if (arr[x][y].flag == 0) {
			arr[x][y].flag = 2;
			ctx.fillStyle = "green";
			ctx.fillRect((size_grid + size_blank) * x, (size_grid + size_blank) * y, size_grid, size_grid);
			
		} else if (arr[x][y].flag == 2) {
			arr[x][y].flag = 0;
			ctx.fillStyle = "grey";
			ctx.fillRect((size_grid + size_blank) * x, (size_grid + size_blank) * y, size_grid, size_grid);
		}
		
	}


	/**
	* mark the grid at (x, y)
	* status code 2 means the grid is marked as mine by user
	*
	* the difference between mark_grid_AI() and mark_grid() is that mark_grid_AI function can't undo an marked grid 
	*
	*/
	this.mark_grid_AI = function(x, y) {
		if (arr[x][y].flag == 0) {
			arr[x][y].flag = 2;
			ctx.fillStyle = "green";
			ctx.fillRect((size_grid + size_blank) * x, (size_grid + size_blank) * y, size_grid, size_grid);	
		} 
	}


	/**
	* double click the grid at (x, y)
	*/
	this.double_grid = function(i, j) {
		/**
		* Use can only double click the opened grid.
		* For a open grid, click it means open around grids in 8 directions.
		*/
		var count = 0;

		// left 
		if (i > 0 && arr[i - 1][j].flag == 2) {
			count++;
		}
		// right
		if (i < num_col - 1 && arr[i + 1][j].flag == 2) {
			count++;
		}
		// up
		if (j > 0 && arr[i][j - 1].flag == 2) {
			count++;
		}
		// down
		if (j < num_row - 1 && arr[i][j + 1].flag == 2) {
			count++;
		}
		// left-up
		if (i > 0 && j > 0 && arr[i - 1][j - 1].flag == 2) {
			count++;
		}
		// right-up
		if (i > 0 && j < num_row - 1 && arr[i - 1][j + 1].flag == 2) {
			count++;
		}
		// left-down
		if (i < num_col - 1 && j > 0 && arr[i + 1][j - 1].flag == 2) {
			count++;
		}
		// right-down
		if (i < num_col - 1 && j < num_row - 1 && arr[i + 1][j + 1].flag == 2) {
			count++;
		}

		if (arr[i][j].flag == 1 && count == arr[i][j].count) {
			// left 
			if (i > 0 && arr[i - 1][j].flag == 0) {
				this.open_grid(i - 1, j);
			}
			// right
			if (i < num_col - 1 && arr[i + 1][j].flag == 0) {
				this.open_grid(i + 1, j);
			}
			// up
			if (j > 0 && arr[i][j - 1].flag == 0) {
				this.open_grid(i, j - 1);
			}
			// down
			if (j < num_row - 1 && arr[i][j + 1].flag == 0) {
				this.open_grid(i, j + 1);
			}
			// left-up
			if (i > 0 && j > 0 && arr[i - 1][j - 1].flag == 0) {
				this.open_grid(i - 1, j - 1);
			}
			// right-up
			if (i > 0 && j < num_row - 1 && arr[i - 1][j + 1].flag == 0) {
				this.open_grid(i - 1, j + 1);
			}
			// left-down
			if (i < num_col - 1 && j > 0 && arr[i + 1][j - 1].flag == 0) {
				this.open_grid(i + 1, j - 1);
			}
			// right-down
			if (i < num_col - 1 && j < num_row - 1 && arr[i + 1][j + 1].flag == 0) {
				this.open_grid(i + 1, j + 1);
			}
		}
	}


	/**
	* count the number of surrounding mines for each grid
	*
	*
	*
	*/
	function countMine(board) {
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
				var temp = helper(i, j, board);
				board[i][j].count = temp;
			}
		}
	}


	/**
	* count the mines around current grid(board[i][j])
	*
	*
	*
	*
	*/
	function helper(i, j, board) {
		var total = 0;
		// left
		if (i > 0 && board[i - 1][j].isMine) {
			total++;
		}
		// right
		if (i < x - 1 && board[i + 1][j].isMine) {
			total++;
		}
		// up
		if (j > 0 && board[i][j - 1].isMine) {
			total++;
		}
		// down
		if (j < y - 1 && board[i][j + 1].isMine) {
			total++;
		}
		// left-up
		if (i > 0 && j > 0 && board[i - 1][j - 1].isMine) {
			total++;
		}
		// right-up
		if (i > 0 && j < y - 1 && board[i - 1][j + 1].isMine) {
			total++;
		}
		// left-down
		if (i < x - 1 && j > 0 && board[i + 1][j - 1].isMine) {
			total++;
		}
		// right-down
		if (i < x - 1 && j < y - 1 && board[i + 1][j + 1].isMine) {
			total++;
		}

		return total;
	}


	/**
	* open all adjacent grids with count equals 0
	*
	*
	*
	*
	*
	*
	*
	*/
	function open_adjacent(x, y, board) {
		var queue = [];
		
		var index = x * num_col + y;
		queue.push(index);
		while (queue.length != 0) {
			var len = queue.length;
			num_open += len;
			for (var k = 0; k < len; k++) {
				var curr = queue.shift();
				var i = Math.floor(curr / num_col);
				var j = curr % num_col;
				board[i][j].isVisited = true;

				if (board[i][j].count == 0) {
					ctx.fillStyle = "yellow";
					ctx.fillRect((size_grid + size_blank) * i, (size_grid + size_blank) * j, size_grid, size_grid);
					// ctx.fillStyle = "black";
					// ctx.font = '12pt Calibri';
					// ctx.fillText(arr[i][j].count.toString(), (size_grid + size_blank) * i + 10, (size_grid + size_blank) * j + 15);
					
					// left 
					if (i > 0 && !board[i - 1][j].isVisited && board[i - 1][j].flag == 0) {
						queue.push((i - 1) * num_col + j);
						board[i - 1][j].isVisited = true;
						board[i - 1][j].flag = 1;
					}
					// right
					if (i < num_col - 1 && !board[i + 1][j].isVisited && board[i + 1][j].flag == 0) {
						queue.push((i + 1) * num_col + j);
						board[i + 1][j].isVisited = true;
						board[i + 1][j].flag = 1;
					}
					// up
					if (j > 0 && !board[i][j - 1].isVisited && board[i][j - 1].flag == 0) {
						queue.push(i * num_col + j - 1);
						board[i][j - 1].isVisited = true;
						board[i][j - 1].flag = 1;
					}
					// down
					if (j < num_row - 1 && !board[i][j + 1].isVisited && board[i][j + 1].flag == 0) {
						queue.push(i * num_col + j + 1);
						board[i][j + 1].isVisited = true;
						board[i][j + 1].flag = 1;
					}
					// left-up
					if (i > 0 && j > 0 && !board[i - 1][j - 1].isVisited && board[i - 1][j - 1].flag == 0) {
						queue.push((i - 1) * num_col + j - 1);
						board[i - 1][j - 1].isVisited = true;
						board[i - 1][j - 1].flag = 1;
					}
					// right-up
					if (i > 0 && j < num_row - 1 && !board[i - 1][j + 1].isVisited && board[i - 1][j + 1].flag == 0) {
						queue.push((i - 1) * num_col + j + 1);
						board[i - 1][j + 1].isVisited = true;
						board[i - 1][j + 1].flag = 1;
					}
					// left-down
					if (i < num_col - 1 && j > 0 && !board[i + 1][j - 1].isVisited && board[i + 1][j - 1].flag == 0) {
						queue.push((i + 1) * num_col + j - 1);
						board[i + 1][j - 1].isVisited = true;
						board[i + 1][j - 1].flag = 1;
					}
					// right-down
					if (i < num_col - 1 && j < num_row - 1 && !board[i + 1][j + 1].isVisited && board[i + 1][j + 1].flag == 0) {
						queue.push((i + 1) * num_col + j + 1);
						board[i + 1][j + 1].isVisited = true;
						board[i + 1][j + 1].flag = 1;
					}

				} else {
					ctx.fillStyle = "yellow";
					ctx.fillRect((size_grid + size_blank) * i, (size_grid + size_blank) * j, size_grid, size_grid);
					ctx.fillStyle = "black";
					ctx.font = '12pt Calibri';
					ctx.fillText(arr[i][j].count.toString(), (size_grid + size_blank) * i + 10, (size_grid + size_blank) * j + 15);
				}				
			}
		}
	}


	/**
	* show all mines when user die
	*
	*/
	function show_mines() {
		for (var i = 0; i < num_col; i++) {
			for (var j = 0; j < num_row; j++) {
				if (arr[i][j].isMine) {
					ctx.fillStyle = "blue";
					ctx.fillRect((size_grid + size_blank) * i, (size_grid + size_blank) * j, size_grid, size_grid);
				}
			}
		}
	}


	/**
	* get current when game ends.
	*/
	function timer() {
		end_time = new Date().getTime();
		var time = end_time - start_time;
		document.getElementById("timer").innerHTML = "Congratulations! You use " + (time / 1000) + " seconds to win!";
		console.log("time used:" + time);
	}


}
