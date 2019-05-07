$(document).ready(function () {

    // Variables for the player's score
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unAnswered = 0;

    var myQuestions = [];

    // Question object constructor
    function Question(query, opt1, opt2, opt3, opt4) {
        this.query = query;
        this.optionOne = opt1;
        this.optionTwo = opt2;
        this.optionThree = opt3;
        this.optionFour = opt4;
        myQuestions.push(this);
    }

    // Question objects
    var questionOne = new Question("Who was absent at the Council of Elrond?", "Gimli", "Legolas", "Galadriel", "Gandalf");
    var questionTwo = new Question("Who made the One Ring?", "Bilbo", "Saruman", "Elrond", "Sauron");
    var questionThree = new Question("By what name do the Elves call Gandalf?", "The Grey Pilgrim", "Gandalf the Grey", "Incanus", "Mithrandir");
    var questionFour = new Question("Who is the proprietor of the Prancing Pony?", "Bill Ferny", "Barliman Butterbur", "Forlong the Fat", "Tom Pickthorn");

    $(loadQuestion);
    $(loadAnswers);

    // Replace the question div with a new question
    function loadQuestion() {
        var e = myQuestions.shift();
        $('#question').replaceWith("<p>" + e.query + "</p>");
    }
    // Replace the answer div with the answers
    function loadAnswers() {
        $('#answers').replaceWith("<p>" + questionOne.optionOne + "<br>" + questionOne.optionTwo + "<br>" + questionOne.optionThree + "<br>" + questionOne.optionFour + "</p>");
    }

    // Timer stuff
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            doSomething();
        } else {
            elem.innerHTML = timeLeft;
            timeLeft--;
        }
    }

    function doSomething() {
        console.log("hi"); console.log("hi");
        $.each(Question, function (index, value) {
            console.log(index + ': ' + value);
        });
    }

    console.log("myQuestions: ", myQuestions);

    // Shift questions out

});