
function grid() {
    
    /**
    * mark if the grid is mine or not 
    */
    this.isMine = false;


    /**
    * mark the number of mines around the current grid
    */
    this.count = 0;


    /**
    * use flag to makr the status.
    * 0 for normal grid;
    * 1 for open grid;
    * 2 for grid marked as mine;
    */
    this.flag = 0;


    /**
    * mark if the grid is visited or not
    */
    this.isVisited = false;

};