import words from './word_list.js';
import solve from './finder.js';

$(document).ready(function () {
  const makeWordCard = function (word) {
    const wordCard = `<div class="word-card" id="wordcard-of-${word}"><div class="word-content">${word}</div></div>`;
    return wordCard;
  };

  $('#input-form').on('submit', function (event) {
    event.preventDefault();
    const boardStr = $('#puzzle-board-input').val();
    const answers = solve(boardStr);
    const wordCounts = {};
    const wordPathMap = {};
    let totalCounts = 0;

    console.log(answers);

    for (let key in answers) {
      const value = answers[key];
      wordCounts[key] = value.size;
      totalCounts += value.size;
    }

    $('#result').empty();

    const resultSummary = `<div class="result-summary">
      <div class="result-summary-title">Results</div>
      <div class="words-count">Total word count : ${totalCounts}</div>
      </div>`;

    $('#result').append(resultSummary);

    for (let key in answers) {
      const value = answers[key];
      const nLetter = `
        <div class="n-letter" id="${key}-letter">
          <div class="n-letter-title">${key}-letter</div>
          <div class="n-letter-count">Total word count : ${wordCounts[key]}</div>
          <div class="words" id="${key}-letter-words"></div>
          </div>`;
      $('#result').append(nLetter);

      for (let [word, path] of value) {
        wordPathMap[word] = path;
        const wordCard = makeWordCard(word);
        $(wordCard).on('hover', function (event) {
          console.log(wordPathMap[word]);
        });
        $(`#${key}-letter-words`).append(wordCard);
      }
    }
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
