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
        this.board[row][col] = p.name;
      }.bind(gameInstance);
      this.players.push(p);
    },
  };
  return gameInstance;
}

const game = createGame();

const jonny = createPlayer("jonny");
const kevin = createPlayer("kevin");

game.addPlayer(jonny);
game.addPlayer(kevin);
kevin.makeMove(1, 1);

jonny.makeMove(1, 0);
jonny.makeMove(1, 1);

console.log(game);
