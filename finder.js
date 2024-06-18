import { Trie, Board, wordsTrie } from './ds.js';

const regex = /^(?!\/)[A-Za-z/@]+(?<!\/)$/;
let answers = {};

const solve = function (rawBoardStr) {
  try {
    validateBoardStr(rawBoardStr);
    const boardStr = rawBoardStr.replace(/[A-Z]/g, (char) =>
      char.toLowerCase()
    );
    const board = new Board(boardStr);
    answers = board.search();
  } catch (err) {
    $('#error-message').text(err.message);
    $('#error-message').css('display', 'block');
    return;
  }
  $('#error-message').text('');
  $('#error-message').css('display', 'none');
  return answers;
};

const validateBoardStr = function (boardStr) {
  if (!regex.test(boardStr)) {
    throw new Error('Invalid board string format');
  }
};

export default solve;
