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
      if (this.board[row][column] === null) {
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

  const switchPlayer = () => {
    activePlayer =
      activePlayer === game.players[0] ? game.players[1] : game.players[0];
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (row, column) => {
    // function to play round
    console.log(
      `${getActivePlayer().name} moved to row ${row}, column ${column}`
    );
    game.makeMove(getActivePlayer(), row, column);

    // check for winning conditions

    let hasWinner = false;
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

    console.log(hasWinner);

    switchPlayer();
  };

  return { playRound, getActivePlayer };
}

const controlGame = GameController();

controlGame.playRound(0, 0);
controlGame.playRound(1, 0);
controlGame.playRound(1, 1);
controlGame.playRound(1, 2);
controlGame.playRound(2, 2);
