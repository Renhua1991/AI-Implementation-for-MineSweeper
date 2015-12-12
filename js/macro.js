
/**
* 
*/

var canvas;

var ctx;

var b;

var num_row = 0;

var num_col = 0;

var num_mine = 0;

var size_grid = 22;

var size_blank = 1;

var start_time = 0;

var end_time = 0;

var first_time = true;


/** bugs:
*
*	1. mouse position wrong
*	2. (fixed) clean timer when user finish one game
*	3. (fixed) can't mark mine   
*
*
*
*
*
*/


/** next steps:
*
*	1. (done) count open number
*	2. (done) add timer
*	3. (done) show all mines when user clicks a mine 
*	4. (done) end the game when user clicks a mine
*	5. make sure user can only click grid with count equal 0 at the first try
*	6. (done) double click 
*
*
*/