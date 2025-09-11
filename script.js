(function() {
    // Create the game grid factory function
    function GameGrid() {
        console.log("Creating gameGrid");
        return {
            // Create the grid itself
            grid: [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ],
            // Create a function to print the grid to the console
            printGrid() {
                for (let i = 0; i < this.grid.length; i++) {
                    let outputString = "";
                    let row = this.grid[i];
                    for (let j = 0; j < row.length; j++) {
                        if (row[j] != -1) {
                            outputString += row[j];
                        } else { outputString += " "; }
                        
                        if (j < row.length-1) { outputString += "|"; }
                    }
                    console.log(outputString);
                    if (i < this.grid.length-1) { console.log("-+-+-"); }
                }
            },
            // Create a function to change one of the grid characters
            changeGrid(x, y, character) {
                this.grid[y][x] = character;
            },
            detectVictory(character) {
                let victory = false;

                const winningCombinations = [
                    [0, 1, 2], // Top row
                    [3, 4, 5], // Middle row
                    [6, 7, 8], // Bottom row
                    [0, 3, 6], // Left column
                    [1, 4, 7], // Middle column
                    [2, 5, 8], // Right column
                    [0, 4, 8], // Diagonal one
                    [2, 4, 6]  // Daigonal two
                ];

                let indexes = [];
                for (let i = 0; i < this.grid.length; i++) {
                    let row = this.grid[i];
                    for (let j = 0; j < row.length; j++) {
                        console.log(character + " == " + row[j]);
                        if (row[j] == character) {
                            indexes.push((i * row.length) + j);
                        }
                    }
                }

                console.log("indexes: " + indexes);

                for (let i = 0; i < winningCombinations.length; i++) {
                    let winningCombination = winningCombinations[i];
                    if (indexes.some(index => winningCombination.includes(index))) {
                        victory = true;
                        break;
                    }
                }

                if (victory) {
                    console.log(character + " has won!");
                } else {
                    console.log(character + " has not won.");
                }
                
            }
        }
    }

    // use the game grid factory function
    grid = GameGrid();
    grid.printGrid();

})();

