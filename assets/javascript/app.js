$(document).ready(function () {

    // Variables for the player's score
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unAnswered = 0;

    var quest = "";
    var answer = "";

    // Empty array to hold trivia question objects
    var myQuestions = [];
    // Variable to hold which question is active    
    var currentQuestion = "";

    // Question object constructor
    function Question(query, answerArray) {
        this.query = query;
        this.answers = answerArray;
        myQuestions.push(this);
    }

    // Question objects
    var questionOne = new Question("Who was absent at the Council of Elrond?", ["Gimli", "Legolas", "Galadriel", "Gandalf"]);
    var questionTwo = new Question("Who made the One Ring?", ["Bilbo", "Saruman", "Elrond", "Sauron"]);
    var questionThree = new Question("By what name do the Elves call Gandalf?", ["The Grey Pilgrim", "Gandalf the Grey", "Incanus", "Mithrandir"]);
    var questionFour = new Question("Who is the proprietor of the Prancing Pony?", ["Bill Ferny", "Barliman Butterbur", "Forlong the Fat", "Tom Pickthorn"]);

    $(init);

    // Start new game
    function init() {
        console.log("hi init");
        $(loadQuestionAll);
        console.log("myQuestions array: ", myQuestions);
        console.log("currentQuestion: ", currentQuestion);        
        console.log("quest: ****", quest);        
        console.log("answer: ****", answer);
    }

    // Reset game button function
    $('#reset-button').on("click", function (event) {
        console.log("reset game!");
        correctAnswers = 0;
        incorrectAnswers = 0;
        unAnswered = 0;
        myQuestions = [];
        currentQuestion = "";
    });

    // Replace the question divs with a new question/answer combo
    function loadQuestionAll() {
        console.log("hi loadQuestion");        
        $('#question').empty();
        $('#answers').empty();
        currentQuestion = myQuestions.shift();
        // Replace the question div with a new question
        function loadQuestion() {
            quest = currentQuestion.query;
            $('#question').html("<p>" + quest + "</p>");
        };

        // Loops through the array of answers and appends the answer div with each answer array item
        function loadAnswers() {
            answer = currentQuestion.answers;
            for (i = 0; i < answer.length; i++) {
                $('#answers').append("<li>" + answer[i] + "</li>");
            };
        };
        loadQuestion();
        loadAnswers();
    }




    // Timer stuff
    var timeLeft = 3;
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
        console.log("function doSomething");
        console.log("currentQuestion: ", currentQuestion);
        loadQuestionAll();
    }


});