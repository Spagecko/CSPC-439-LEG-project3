# CSPC-439-ECW--project3
CSPC-439-ECW -project03

Bennett Lawrenz 889955969
Kim-Lan Hoang 895005478
Steven Tran 890741564



This project is a TM simulation of Conways game of life

Game of Life Page Functionality:
	Each canvas has a different function. Most of the functionality is related to the turing machine:
	RLeft_up: Turing machine reads upper left of cell
	RMid_up: Turing machine reads upper middle of cell
	RRight_up: read upper right of cell
	RLeft: read left
	Check Pop.: Check total population of cells
	RRight: read right
	RLeft_down: read down left
	RMid_down: read down middle
	RRight_down: read down right
	Move: Turing machine is moving
	death: Turing machine delete a cell at current location
	Birth: Turing machine writes a cell at current location
	
	TM Simulation: This is visually displaying what the turing machine's current location. It displays different colors based on what the current function is.

	Real Time Simulation: This is where the cells are visibly displayed. It will update based on both real time or turing machine simulaton.
			      Real time will continue to display the movement of Game of Life indefinitely.
			      Turing machine will only change on what current cells its at, and after it reach at end of the array.
	

Turing Machine Simulation Algorithm:
	Pushing the "TM simulation" button will activate the turing machine that runs at a set interval. Each run will have the machine do something based on each state:
	State 0:If the turing machine reach the end of the row, move down one column and reset row position.
		If the turing machine reach the end of the column, update the Real Time Simulation graph with along with new birth/death cells. Reset machine to beginnnng.
		Else, the turing machine will move down one row and move to state 1.
	
	State 1: The machine will begin reading the cells. It will read the cell that is on the upper left.
	State 2: The maching will read the cell on the upper middle.
	State 3: The machine will read on the upper right.
	State 4: The machine will read on the right.
	State 5: The machine will read on the lower right.
	State 6: The machine will read on the lower middle.
	Stage 7: The machine will read on the lower left.
	Stage 8: The machine will read on the left.
	
	Stage 9: The turing machine returns to original position and check total population.
		 If the population is 3 and there are no active cell in its current location, move to state 10.
		 Else if the population is less than 2 or greater than 3, and there is an active cell in its current location, move to state 11.
		 Else, ignore the cell and move to state 0.
	
	Stage 10: The turing machine will write a new cell. This is indicated with white color on "TM Simulation" and "Real Time Simulation" Graph. Move to state 0.
	Stage 11: The turing machine will delete a new cell. This is indicated with purple color on "TM Simulation" and "Real Time Simulation" Graph. Move to state 0.

	There is no counter and the turing machine will continue to run until the page is reseted. 