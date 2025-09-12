(function() {
    // Create a delay function to be sued later
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Create the game grid factory function
    function GameGrid() {
        console.log("Creating gameGrid");
        // Initialize the grid
        grid = [];
        for (let i = 0; i < 9; i++) {
            grid.push(-1);
        }

        // build the gameGrid object itself
        return {
            // Create the gamegrid varaibles
            grid: grid,
            gameOver: false,
            playerOneTurn: true,
            twoPlayerMode: false,
            playerOneName: "Player",
            playerTwoName: "Computer",
            playerScore: 0,
            computerScore: 0,

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
                    const victoryMessage = document.getElementById("turn-tracker");
                    if (character === "X") {
                        victoryMessage.textContent = "The Player Wins!";
                        this.playerScore++;
                    }
                    else {
                        victoryMessage.textContent = "The Computer Wins!";
                        this.computerScore += 1;
                    }
                    this.updateScoreDisplay();

                }

                this.gameOver = victory;
                return victory;
                
            },
            computerTurn() {
                let position = Math.floor(Math.random() * (8 - 0 + 1)) + 0;

                while (this.grid[position] != -1) {
                    position = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
                }
                this.changeGrid(position, "O");

                const cell = document.getElementById(position);
                cell.classList.add("computer-cell");

                //console.log("Computer turn completed");
            },
            playerTurn(position, character) {
                this.changeGrid(position, character);

                const cell = document.getElementById(position);
                if (this.playerOneTurn) {
                    cell.classList.add("player-cell");
                } else {
                    cell.classList.add("computer-cell");
                }

                //console.log("Player turn completed");
            },
            updateScoreDisplay() {
                // Update player one's score
                const playerScoreDisplay = document.getElementById("player-score");
                playerScoreDisplay.textContent = this.playerOneName + " Score: " + this.playerScore;
                
                // Update player two's score
                const computerScoreDisplay = document.getElementById("computer-score");
                computerScoreDisplay.textContent = this.playerTwoName + " Score: " + this.computerScore;
                
            },
            async turnLogic(position) {
                const turnText = document.getElementById("turn-tracker");
                if (!this.gameOver && !this.twoPlayerMode) {
                    if (!this.playerOneTurn) { return; }
                    this.playerTurn(position, "X");

                    // Check if the player won
                    if (this.detectVictory("X")) {
                        this.playerOneScore--;
                        return;
                    }

                    // Check if all the squares are full
                    if (!this.grid.includes(-1)) {
                        this.gameOver = true;
                        turnText.textContent = "It's a draw";
                        return;
                    }

                    turnText.textContent = "Computer's turn...";
                    this.playerOneTurn = false;
                    await delay(2000);
                    this.computerTurn();

                    if (this.detectVictory("O")) {
                        this.computerScore--;
                        return;
                    }

                    turnText.textContent = "Player's turn..."
                    this.playerOneTurn = true;
                } else if (!this.gameOver && this.twoPlayerMode) {
                    if (this.playerOneTurn) {
                        this.playerTurn(position, "X");
                        turnText.textContent = "Player 2's turn.";

                        // Check for a victory
                        if (this.detectVictory("X")) {
                            this.gameOver = true;
                            turnText.textContent = "Player 1 wins!";
                            return;
                        }

                    } else {
                        this.playerTurn(position, "O");
                        turnText.textContent = "Player 1's turn";

                        // Check for a victory
                        if (this.detectVictory("O")) {
                            this.gameOver = true;
                            turnText.textContent = "Player 2 wins!";
                            return;
                        }

                    }
                    this.playerOneTurn = !this.playerOneTurn;
                }
            }
        }
    }

    // use the game grid factory function
    gameGrid = GameGrid();
    //grid.turnLogic();

    // Dom manipulation scripts
    // Create the squares to fill in the main grid
    function generateDomGrid() {
        const grid = document.getElementById("grid");
        grid.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            const row = document.createElement("div");
            row.classList.add("grid-row");
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.id = (3 * i) + j;

                // Create event listener for each of the grid cells
                cell.addEventListener("click", () => {
                    if (!cell.classList.contains("player-cell") && !cell.classList.contains("computer-cell")) {
                        gameGrid.turnLogic(cell.id);
                        //generateDomGrid();
                    }
                });

                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
    }

    // Reset the game when the player clicks the reset button
    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", () => {
        gameGrid.grid = [];
        gameGrid.gameOver = false;
        gameGrid.playerOneTurn = true;
        const turnText = document.getElementById("turn-tracker");
        if (gameGrid.twoPlayerMode) {
            turnText.textContent = "Player 1's turn..."
        } else {
            turnText.textContent = "Player's turn...";
        }
        for (let i = 0; i < 9; i++) {
            gameGrid.grid.push(-1);
        }
        generateDomGrid();

        console.log("Two player mode disabled: " + gameGrid.twoPlayerMode);
    });

    // Toggle between single player and multiplayer mode
    const toggleButton = document.getElementById("toggle-button");
    toggleButton.addEventListener("click", () => {
        const turnText = document.getElementById("turn-tracker");
        gameGrid.twoPlayerMode = !gameGrid.twoPlayerMode;
        if (gameGrid.twoPlayerMode) {
            turnText.textContent = "Player 1's turn..."
        } else {
            turnText.textContent = "Player's turn..."
        }
        gameGrid.grid = [];
        gameGrid.gameOver = false;

        this.playerScore = 0;
        this.computerScore = 0;

        for (let i = 0; i < 9; i++) {
            gameGrid.grid.push(-1);
        }
        generateDomGrid();

        console.log("Two player mode enabled: " + gameGrid.twoPlayerMode);
    });

    // Create the player one rename button event listener
    const playerOneButton = document.getElementById("player-1-button");
    playerOneButton.addEventListener("click", () => {
        gameGrid.playerOneName = prompt("What's player one's name?");
        gameGrid.updateScoreDisplay();
    });

    // Create the player two rename button event listener
    const playerTwoButton = document.getElementById("player-2-button");
    playerTwoButton.addEventListener("click", () => {
        gameGrid.playerTwoName = prompt("What's player two's name?");
        gameGrid.updateScoreDisplay();
    });

    generateDomGrid();

})();
