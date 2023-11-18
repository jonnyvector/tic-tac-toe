const gameboard = document.querySelectorAll("[data-cell]");
const playerStatus = document.querySelector(".player-status");
const restartGame = document.querySelector(".restart-game");

function createGame(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const gameInstance = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    players: [
      {
        name: playerOneName,
        id: 1,
      },
      {
        name: playerTwoName,
        id: 2,
      },
    ],
    makeMove: function (player, row, column) {
      if (this.board[row][column] !== null) {
        console.log("This space is not empty");
      } else if (this.board[row][column] === null) {
        this.board[row][column] = player.id;
      }
    },
  };
  return gameInstance;
}

const game = createGame();

console.log(game);

function GameController() {
  let activePlayer = game.players[0];
  let hasWinner = false;
  let gameOver = false;

  const switchPlayer = () => {
    activePlayer =
      activePlayer === game.players[0] ? game.players[1] : game.players[0];
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (row, column) => {
    // make a move
    game.makeMove(getActivePlayer(), row, column);

    // render player's turn on screen
    if (getActivePlayer().name === "Player One") {
      playerStatus.textContent = "Player Two's Turn!";
    } else {
      playerStatus.textContent = "Player One's Turn!";
    }

    // check for winning conditions
    for (const row of game.board) {
      // check for row win
      if (row.every((cell) => cell === getActivePlayer().id)) {
        hasWinner = true;
      }
    }
    // check for column:
    for (let i = 0; i < 3; i++) {
      if (
        game.board[0][i] === getActivePlayer().id &&
        game.board[1][i] === getActivePlayer().id &&
        game.board[2][i] === getActivePlayer().id
      ) {
        hasWinner = true;
      }
    }
    // check for diagonal win:
    // [0,0][1,1][2,2]
    // [0,2][1,1][2,0]

    for (let i = 0; i < 3; i++) {
      if (
        game.board[0][0] === getActivePlayer().id &&
        game.board[1][1] === getActivePlayer().id &&
        game.board[2][2] === getActivePlayer().id
      ) {
        hasWinner = true;
        break;
      } else if (
        game.board[0][2] === getActivePlayer().id &&
        game.board[1][1] === getActivePlayer().id &&
        game.board[2][0] === getActivePlayer().id
      ) {
        hasWinner = true;
        break;
      }
    }

    //check for winner
    if (hasWinner) {
      gameOver = true;
      playerStatus.textContent = `${getActivePlayer().name} Wins!`;
      removeClickListeners();
    }

    //restart game
    restartGame.addEventListener("click", function () {
      activePlayer = game.players[0];
      hasWinner = false;
      gameOver = false;

      playerStatus.textContent = `${
        controlGame.getActivePlayer().name
      }'s turn!`;

      for (let i = 0; i < game.board.length; i++) {
        for (let j = 0; j < game.board[i].length; j++) {
          game.board[i][j] = null;
        }
      }
      for (const cell of gameboard) {
        cell.textContent = "";
      }
      for (const cell of gameboard) {
        cell.addEventListener("click", cellClickHandler);
      }

      console.log(game.board);
    });

    switchPlayer();
  };

  return { playRound, getActivePlayer, gameOver, restartGame };
}

const controlGame = GameController();

//add click handler
function cellClickHandler() {
  if (!controlGame.gameOver) {
    if (this.textContent === "") {
      var rowNumber = this.getAttribute("data-row");
      var colNumber = this.getAttribute("data-col");
      controlGame.playRound(rowNumber, colNumber);
      this.textContent =
        controlGame.getActivePlayer().name === "Player One" ? "O" : "X";
    }
  }
}

for (const cell of gameboard) {
  cell.addEventListener("click", cellClickHandler);
}

//  remove click handlers
function removeClickListeners() {
  for (const cell of gameboard) {
    cell.removeEventListener("click", cellClickHandler);
  }
}
