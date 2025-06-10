// --- DOM Elements ---
        // Get references to the login and game sections to toggle their visibility
        const loginSection = document.getElementById("login-section");
        const gameSection = document.getElementById("game-section");

        // Get reference to the paragraph tag within the message div
        const textmessage = document.getElementById("message").querySelector("p");

        // Get reference to the game board div
        const gameboard = document.querySelector(".board");

        // Get references to the player name input fields and the submit button
        const player1Input = document.getElementById("player-1");
        const player2Input = document.getElementById("player-2");
        const submitBtn = document.getElementById("submit");

        // Get reference to the reset game button
        const resetButton = document.getElementById("reset-button");

        // --- Game State Variables ---
        let currentPlayer = 'X'; // 'X' or 'O' - X always starts
        let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board state (9 empty strings)
        let gameActive = false; // Flag to indicate if the game is currently in progress
        let playerXName = ''; // Stores the name of Player X
        let playerOName = ''; // Stores the name of Player O

        // Win conditions: Array of arrays, each sub-array represents a winning combination of cell indices
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        // --- Functions ---

        /**
         * Initializes or resets the game board.
         * Clears existing cells, resets the board state, and creates 9 new clickable cells.
         * Each cell is assigned a unique ID from 1 to 9 as required.
         */
        function initializeBoard() {
            // Clear any previously created cells from the game board
            gameboard.innerHTML = "";

            // Reset the internal board state to all empty strings
            board = ['', '', '', '', '', '', '', '', ''];

            // Ensure the current player is 'X' for a new game
            currentPlayer = 'X';

            // Create 9 new div elements for the game cells
            for (let i = 0; i < 9; i++) {
                let cell = document.createElement("div");
                // Add CSS classes for styling and layout
                cell.classList.add("cell");
                // Assign a unique ID from 1 to 9 (as per requirements)
                cell.id = (i + 1).toString();
                // Store the numerical index as a data attribute for easier JavaScript logic
                cell.dataset.index = i;
                // Add a click event listener to each cell
                cell.addEventListener("click", handleCellClick);
                // Append the created cell to the game board container
                gameboard.appendChild(cell);
            }
        }

        /**
         * Handles a click event on a game cell.
         * Prevents moves if the cell is already taken or the game is not active.
         * Updates the board, checks for win/draw, and switches player turn.
         * @param {Event} event - The click event object.
         */
        function handleCellClick(event) {
            const clickedCell = event.target;
            // Get the numerical index of the clicked cell from its data attribute
            const clickedCellIndex = parseInt(clickedCell.dataset.index);

            // If the cell is already filled or the game is not active, do nothing
            if (board[clickedCellIndex] !== '' || !gameActive) {
                return;
            }

            // Update the internal board array with the current player's mark ('X' or 'O')
            board[clickedCellIndex] = currentPlayer;
            // Update the visual content of the clicked cell on the screen
            clickedCell.innerHTML = currentPlayer;

            // Check if the current move resulted in a win
            if (checkWin()) {
                endGame(false); // Game ended with a winner (isDraw is false)
            }
            // Else, check if the game resulted in a draw
            else if (checkDraw()) {
                endGame(true); // Game ended in a draw (isDraw is true)
            }
            // If no win or draw, switch to the next player's turn
            else {
                switchPlayer();
            }
        }

        /**
         * Switches the current player from 'X' to 'O' or vice-versa.
         * Updates the message displayed on the screen to indicate whose turn it is.
         */
        function switchPlayer() {
            // Toggle the current player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            // Get the name of the player whose turn it is
            const currentTurnPlayerName = currentPlayer === 'X' ? playerXName : playerOName;
            // Update the message display
            textmessage.innerHTML = `${currentTurnPlayerName}, you're up`;
        }

        /**
         * Checks if the current board state results in a win for the current player.
         * Iterates through all defined win conditions.
         * @returns {boolean} - True if there's a winner, false otherwise.
         */
        function checkWin() {
            // Loop through each winning combination
            for (let i = 0; i < winConditions.length; i++) {
                const condition = winConditions[i];
                // Get the values from the board for the three cells in the current condition
                let a = board[condition[0]];
                let b = board[condition[1]];
                let c = board[condition[2]];

                // If any cell in the condition is empty, it's not a win yet for this condition
                if (a === '' || b === '' || c === '') {
                    continue; // Move to the next condition
                }

                // If all three cells in the condition match, it's a win
                if (a === b && b === c) {
                    return true; // A winning condition has been met
                }
            }
            return false; // No winning condition found
        }

        /**
         * Checks if the game is a draw.
         * A draw occurs if all cells are filled and no player has won.
         * @returns {boolean} - True if it's a draw, false otherwise.
         */
        function checkDraw() {
            // If the board array does not contain any empty strings, all cells are filled
            return !board.includes('');
        }

        /**
         * Ends the game, displays the final message (winner or draw),
         * and makes the reset button visible.
         * @param {boolean} isDraw - True if the game ended in a draw, false if a player won.
         */
        function endGame(isDraw) {
            gameActive = false; // Set game to inactive to prevent further moves

            if (isDraw) {
                textmessage.innerHTML = `It's a draw!`; // Display draw message
            } else {
                // Get the name of the winning player
                const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
                // Display the specific win message format
                textmessage.innerHTML = `${winnerName} congratulations you won!`;
            }
            // Show the reset button to allow playing again
            resetButton.style.display = 'block';
        }

        /**
         * Resets the game to its initial state (after player names are entered).
         * Hides the reset button and starts a new round.
         */
        function resetGame() {
            gameActive = true; // Set game to active
            initializeBoard(); // Reset and set up the board cells
            resetButton.style.display = 'none'; // Hide the reset button again
            // Display the message for the first player's turn in the new game
            textmessage.innerHTML = `${playerXName}, you're up`;
        }

        // --- Event Listeners ---

        // Event listener for the "Start Game" button click
        submitBtn.addEventListener("click", function () {
            // Get player names from input fields, trimming whitespace
            playerXName = player1Input.value.trim();
            playerOName = player2Input.value.trim();

            // Set default names if input fields are left empty
            if (playerXName === '') playerXName = 'Player X';
            if (playerOName === '') playerOName = 'Player O';

            // Start the game by setting gameActive to true
            gameActive = true;
            // Initialize the game board (create cells)
            initializeBoard();

            // Display the initial turn message for Player X
            textmessage.innerHTML = `${playerXName}, you're up`;

            // Hide the login section (name inputs and submit button)
            loginSection.style.display = 'none';
            // Show the game board section
            gameSection.style.display = 'block';
        });

        // Event listener for the "Reset Game" button click
        resetButton.addEventListener("click", resetGame);

        // --- Initial Setup on Page Load ---
        // This ensures initial messages and visibility are set correctly when the page loads
        window.onload = function() {
            // Initially display the "Enter player names to start!" message
            textmessage.innerHTML = `Enter player names to start!`;
            // Ensure the game section (board and reset button) is hidden initially
            gameSection.style.display = 'none';
            // Ensure the reset button is hidden even if the game section is somehow visible
            resetButton.style.display = 'none';
        };