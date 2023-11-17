function createPlayer(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  return {
    name: name,
    id: id,
  };
}

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
    // addPlayer: function (player) {
    //   player.makeMove = function (row, col) {
    //     if (this.board[row][col] === null) {
    //       this.board[row][col] = player.name;
    //     }
    //   }.bind(gameInstance);
    //   this.players.push(player);
    // },
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

    console.log(activePlayer);
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (row, column) => {
    // function to play round

    game.makeMove(getActivePlayer(), row, column);

    switchPlayer();
  };

  return { playRound, getActivePlayer };
}

const controlGame = GameController();

controlGame.playRound(1, 2);
controlGame.playRound(0, 1);
