$(function() {

  var questionSet  = []
    , choices      = []
    , choiceSet    = []
    , answer       = []
    , questionName = []
    , questionList = $('.js-question')
    , i = 0
    ;

  questionList.each(function(index) {

    questionName.push($(this).find('.js-question-name').text());

    $(this).find('.ar').each(function() {
      choices.push( ($(this).text()) )
    });

    choiceSet[index] = choices;
    answer[index] = choices[0];
    choices = [];
    choiceSet[index] = shuffle(choiceSet[index]);

  });

  questionList.each(function(index) {
    printChoices(choiceSet[index], answer[index], $(this));
  });

  questionList = printQuestions(questionList);


});


/**
 * Shuffle's arrays in a random Fisher-Yates algorithm.
 * Taken from:
 *   http://stackoverflow.com/a/2450976/3099842
**/

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function printChoices(choices, answer, el) {
  var temp, letters = ['A', 'B', 'C', 'D', 'E'];

  el.find('.ar').each(function(index) {
    temp = $(this).empty().append(choices[index]);
    if (temp.text() === answer) { temp.addClass('ak'); }
    temp.prepend("<span class='letter'>" + letters[index] + "</span>");
  });

}

function printQuestions(array) {
  var questions = $('.js-questions');
  questions.html('');

  array = shuffle(array);

  for (var i = 0; i < array.length; i++) {
    questions = questions.append(array[i]);
    $('.js-question:last-child .js-question-number').text(i+1);
  }

  return array;
}