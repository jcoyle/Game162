var questionNumber  = 1
  , questionCount   = $('.js-question').length
  , questionCorrect = 0
  , questionTotal   = 0
  ;

$(function() {

  var questionSet    = []
    , choices        = []
    , choiceSet      = []
    , answer         = []
    , questionName   = []
    , questionList   = $('.js-question')
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
  displayQuestion(1);

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
    $('.js-question:last-child').addClass('js-q-'+(i+1));
  }

  $('.js-q-' + array.length).addClass('js-last-question');

  return array;
}


function displayQuestion(number) {
  number = $('.js-q-'+number);
  $('.js-question').removeClass('is-visible');
  number.addClass('is-visible');
  if (!(number.hasClass('js-question-answered'))) { hideNextButton(); }
}

function correctAnswer(choice) {
  questionCorrect++;
  questionTotal++;
  updateUserScore(questionCorrect, questionTotal);
  choice.addClass('highlight-right');
  choice.parents('.js-question').addClass('js-question-answered');
  $('.js-right').addClass('is-visible')
}

function incorrectAnswer(choice) {
  questionTotal++;
  updateUserScore(questionCorrect, questionTotal);
  choice.addClass('highlight-wrong');
  choice.parents('.js-question').addClass('js-question-answered');
  $('.js-wrong').addClass('is-visible').children().text(choice.parents('.js-question').find('.ak').clone().children().remove().end().text());
}

function showNextButton() {
  $('.js-next').removeClass('is-disabled'); console.log('hey');
}

function hideNextButton() {
  $('.js-next').addClass('is-disabled');
}

function updateUserScore(correct, total) {
  $('.js-q-correct').text(correct);
  $('.js-q-total').text(total);
  $('.js-q-ba').text((correct/total).toFixed(3));  
}

function showResults() {
  $('#results').removeClass('is-hidden').delay(100).queue(function(){
    $(this).addClass('is-opaque');
  });

  document.location = '#results';
}

$('.js-question-nav').click(function() {
  var that = $(this);

  if (that.hasClass('js-next') && !(that.hasClass('is-disabled'))) {
    if (questionNumber < questionCount) { 
      $('.js-question-nav').removeClass('is-disabled');
      questionNumber++;
      displayQuestion(questionNumber); 
      $('.js-quick-answer-display').children().removeClass('is-visible');
    }
  }

  else if (that.hasClass('js-prev') && !(that.hasClass('is-disabled'))) {
    if (questionNumber > 1) { 
      $('.js-question-nav').removeClass('is-disabled');
      questionNumber--;
      displayQuestion(questionNumber); 
      if (questionNumber === 1) { that.addClass('is-disabled'); }
    } 
  } 
});

$('#questions').on('click', '.js-letter', function() { 
  if (($(this).parents('.js-question').hasClass('js-question-answered')) === false) {
    if ($(this).hasClass('ak')) { correctAnswer($(this)); }
    else { incorrectAnswer($(this)); }
    if (questionNumber <= questionCount - 1) { showNextButton(); }
    else { showResults(); }
  } 
});