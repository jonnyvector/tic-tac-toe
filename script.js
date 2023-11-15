function createPlayer(name) {
  return {
    name: name,
  };
}

function createGame() {
  const gameInstance = {
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    players: [],
    addPlayer: function (p) {
      p.makeMove = function (row, col) {
        if (this.board[row][col] === null) {
          this.board[row][col] = p.name;
        }
      }.bind(gameInstance);
      this.players.push(p);
    },
  };
  return gameInstance;
}

const game = createGame();

const jonny = createPlayer("jonny");
const kevin = createPlayer("kevin");

console.log(game.board);

console.log(game.players);

game.addPlayer(jonny);
game.addPlayer(kevin);
kevin.makeMove(1, 1);
jonny.makeMove(0, 1);
kevin.makeMove(0, 2);
jonny.makeMove(0, 0);

console.log(game);

let activePlayer = game.players[0];
console.log(activePlayer);

const switchPlayer = () => {
  activePlayer =
    activePlayer === game.players[0] ? game.players[1] : game.players[0];
};

console.log(activePlayer);
