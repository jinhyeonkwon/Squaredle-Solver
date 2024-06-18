import words from './word_list.js';
import solve from './finder.js';

$(document).ready(function () {
  const makeWordCard = function (word) {
    return `<div class="word-card"><div class="word-content">${word}</div></div>`;
  };

  $('#input-form').on('submit', function (event) {
    event.preventDefault();
    const boardStr = $('#puzzle-board-input').val();
    const answers = solve(boardStr);
    const wordCounts = {};
    let totalCounts = 0;

    for (let [key, value] of Object.entries(answers)) {
      wordCounts[key] = value.size;
      totalCounts += value.size;
    }

    $('#result').empty();

    const resultSummary = `<div class="result-summary">
      <div class="result-summary-title">Results</div>
      <div class="words-count">Total word count : ${totalCounts}</div>
      </div>`;

    $('#result').append(resultSummary);

    // [TODO] No answer case
  });
  $('#info-button').on('click', function (event) {
    event.preventDefault();
    alert('TODO');
  });
});

/*
  <div class="result-summary">
    <div class="n-letter">
      <div class="n-letter-title>N-LETTER</div>
      <div class="n-letter-count>Total word count : CNT</div>
      <div class="words">
        {word cards}
      </div>
    </div>
  </div>

  <div class="word-card">
    <div class="word-content">WORD</div>
  </div>

*/
