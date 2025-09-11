(function() {
    // Create the game grid factory function
    function GameGrid() {
        console.log("Creating gameGrid");
        grid = [];
        for (let i = 0; i < 9; i++) {
            grid.push(-1);
        }

        return {
            // Create the gamegrid varaibles
            grid: grid,
            gameOver: false,

            // Create a function to print the grid to the console
            printGrid() {
                console.log("printing grid");
                let outputString = "";
                for (let i = 0; i < this.grid.length; i++) {
                    if (this.grid[i] == -1) {
                        outputString += " ";
                    } else {
                        outputString += this.grid[i];
                    }
                    if ((i+1) % 3 == 0) {
                        outputString += "\n-+-+-\n";
                    } else {
                        outputString += "|";
                    }
                }
                console.log(outputString);
            },
            // Create a function to change one of the grid characters
            changeGrid(position, character) {
                this.grid[position] = character;
                this.printGrid();
            },
            detectVictory(character) {
                let victory = false;

                // TODO detect victory
                const winningCombinations = [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                    [0, 3, 6], [1, 5, 7], [2, 5, 8], // Columns
                    [0, 4, 8], [2, 4, 6]             // Diagonals
                ]

                for (const combination of winningCombinations) {
                    const [a, b, c] = combination;
                    if (this.grid[a] === character && this.grid[b] === character && this.grid[c] === character) {
                        victory = true;
                        break;
                    }
                }

                if (victory) {
                    console.log(character + " has won!");
                } else {
                    console.log(character + " has not won.");
                }
                return victory;
                
            },
            computerTurn() {
                let position = Math.floor(Math.random() * (8 - 0 + 1)) + 0;

                while (this.grid[position] != -1) {
                    position = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
                }
                this.changeGrid(position, "O");
            },
            playerTurn() {
                let position = prompt("What grid square do you want to change?");

                while (this.grid[position] != -1) {
                    position = prompt("What grid square do you want to change?");
                }
                this.changeGrid(position, "X");
            },
            turnLogic() {
                let gameOver = false
            }
        }
    }

    // use the game grid factory function
    grid = GameGrid();
    //grid.turnLogic();

    // Dom manipulation scripts
    // Create the squares to fill in the main grid
    function generateDomGrid() {
        const grid = document.getElementById("grid");
        for (let i = 0; i < 3; i++) {
            const row = document.createElement("div");
            row.classList.add("grid-row");
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");

                // Create event listener for each of the grid cells
                cell.addEventListener("click", () => {
                    cell.style.backgroundColor = "blue";
                });

                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    }

    generateDomGrid();

})();
