import { Trie, Board, wordsTrie } from './ds.js';

const solve = function (boardStr) {
  // try {
  alert(boardStr);
  const board = new Board(boardStr);
  const size = board.getSize();

  for (let i = 0; i < size[0] * size[1]; i++) {
    board.searchFrom(i, '', new Set(), wordsTrie.root);
  }
  console.log(board.getAnswer());
  // } catch (err) {
  //   $('#error-message').text(err.message);
  //   $('#error-message').css('display', 'block');
  // }
};

export default solve;
