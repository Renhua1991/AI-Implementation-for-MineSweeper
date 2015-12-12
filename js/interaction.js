
/**
* get mouse position relative to document when mouse clicks on canvas
*/
function leftClick(event) {

    /*
    * start the game 
    */
    if (start_time == 0) {
        start_time = new Date().getTime();
    }

    /*
    * px and py represent position relative to window
    */
    var px = event.x;
    var py = event.y;
    var canvas = document.getElementById("canvas");
    
    /**
    * canvas.offsetLeft and canvas.offsetTop are positions for canvas
    * document.body.scrollLeft and document.body.scrollTop are positions for documents scrolled
    * x and y represent positin relative to document
    */
    var x = px - canvas.offsetLeft + document.body.scrollLeft;
    var y = py - canvas.offsetTop + document.body.scrollTop;
    //console.log("x:" + x + " y:" + y);
    var index = getIndex(x, y);
    if (index != -1) {
        var i_y = index % num_row;
        var i_x = Math.floor(index / num_row);
        
        /*
        * make sure that user can't click a mine or a grid with count don't equal 0
        */
        if (first_time) {
            while (b.check_valid(i_x, i_y)) {
                b = new board(num_col, num_row, num_mine);
                b.init();
            }
            first_time = false;
        }

        b.open_grid(i_x, i_y);
    }
    
}


/**
* get mouse position relative to document when mouse right clicks on canvas
*/
function rightClick(event) {

    /*
    * start the game 
    */
    if (start_time == 0) {
        start_time = new Date().getTime();
    }

    /*
    * px and py represent position relative to window
    */
    var px = event.x;
    var py = event.y;
    var canvas = document.getElementById("canvas");
    
    /**
    * canvas.offsetLeft and canvas.offsetTop are positions for canvas
    * document.body.scrollLeft and document.body.scrollTop are positions for documents scrolled
    * x and y represent positin relative to document
    */
    var x = px - canvas.offsetLeft + document.body.scrollLeft;
    var y = py - canvas.offsetTop + document.body.scrollTop;
    //console.log("x:" + x + " y:" + y);
    var index = getIndex(x, y);
    if (index != -1) {
        var i_y = index % num_row;
        var i_x = Math.floor(index / num_row);
        b.mark_grid(i_x, i_y);
    }

    event.preventDefault();
}


/**
* get mouse position relative to document when mouse double clicks on canvas
*/
function doubleClick(event) {

    /*
    * start the game 
    */
    if (start_time == 0) {
        start_time = new Date().getTime();
        console.log("begin time: " + start_time);
    }

    /*
    * px and py represent position relative to window
    */
    var px = event.x;
    var py = event.y;
    var canvas = document.getElementById("canvas");
    
    /**
    * canvas.offsetLeft and canvas.offsetTop are positions for canvas
    * document.body.scrollLeft and document.body.scrollTop are positions for documents scrolled
    * x and y represent positin relative to document
    */
    var x = px - canvas.offsetLeft + document.body.scrollLeft;
    var y = py - canvas.offsetTop + document.body.scrollTop;
    //console.log("x:" + x + " y:" + y);
    var index = getIndex(x, y);
    if (index != -1) {
        var i_y = index % num_row;
        var i_x = Math.floor(index / num_row);
        b.double_grid(i_x, i_y);
    }
}


/**
* get the index in the board according to position x and y for mouse
*/
function getIndex(x, y) {
    var i = Math.floor(x / (size_grid + size_blank));
    var j = Math.floor(y / (size_grid + size_blank)); 
    
    /**
    * if the mouse is out of the board, return -1;
    * else return the index of mouse;
    */
    if (i * num_row + j >= num_row * num_col) {
        return -1;
    } else {
        return i * num_row + j;
    }
    
}

