import words from './word_list.js';
import solve from './finder.js';

$(document).ready(function () {
  $('#input-form').on('submit', function (event) {
    event.preventDefault();
    const boardStr = $('#puzzle-board-input').val();
    console.log(boardStr);
    solve(boardStr);
  });
  $('#info-button').on('click', function (event) {
    event.preventDefault();
    alert('TODO');
  });
});
