// U of M Coding Boot Camp in Saint Paul
// Trivia Game Homework - Allison Champlin
// May 2019

$(document).ready(function () {

    // Global Variables //
    var correctAnswers = [];
    var incorrectAnswers = [];
    var unAnswered = [];
    var questionIdCounter = 0;
    var gameOver = false;

    // QUESTION OBJECTS
    var myQuestions = []; // Empty array to hold trivia question objects    
    var currentQuestion = ""; // Variable to hold which question is active

    // Question object constructor
    function Question(query, answerArray, solutionId, questionId) {
        this.query = query;
        this.answers = answerArray;
        this.solutionId = solutionId;
        this.questionId = questionIdCounter;
        myQuestions.push(this);
        console.log("questionIdCounter", questionIdCounter);
        questionIdCounter = questionIdCounter + 1;
        console.log("questionIdCounter", questionIdCounter);
        console.log("myQuestions: ", myQuestions);
    }

    // Question Objects //
    var questionOne = new Question("Who was absent at the Council of Elrond?", ["Gimli", "Legolas", "Galadriel", "Gandalf"], 2);
    var questionTwo = new Question("Who made the One Ring?", ["Bilbo", "Saruman", "Elrond", "Sauron"], 3);
    var questionThree = new Question("By what name do the Elves call Gandalf?", ["The Grey Pilgrim", "Gandalf the Grey", "Incanus", "Mithrandir"], 3);
    var questionFour = new Question("Who is the proprietor of the Prancing Pony?", ["Bill Ferny", "Barliman Butterbur", "Forlong the Fat", "Tom Pickthorn"], 1);

    // Loads the current question
    function loadQuestion() {
        console.log("myQuestions: ", myQuestions);
        console.log("Hi loadQuestion", myQuestions);
        $('#question').empty();
        $('#answers').empty();
        currentQuestion = myQuestions[questionIdCounter];
        console.log("currentQuestion: ", currentQuestion);
        if (typeof currentQuestion === "undefined") {
            gameOver == true;
            processGameOver();
            return false;
        } else {
            // Replace the question div with a new question
            function displayQuestion() {
                if (typeof currentQuestion === "undefined") {
                    processGameOver();
                } else {
                    $('#question').html("<p>" + currentQuestion.query + "</p>");
                }
            };
            // Loops through the array of answers and appends the answer div with each answer array item
            function displayAnswers() {
                for (i = 0; i < currentQuestion.answers.length; i++) {
                    $('#answers').append("<button class='answer-button' value=" + i + ">" + currentQuestion.answers[i] + "</button>" + "<br>");
                };
            };
            displayQuestion();
            displayAnswers();
            questionIdCounter = questionIdCounter + 1;
            console.log("loaded question: ", currentQuestion);
        }
    }


    // Handles clicks on the multiple choice buttons
    $(document).on('click', '.answer-button', function () {
        console.log("hi" + this.value);
        console.log(currentQuestion.solutionId);
        console.log(currentQuestion.questionId)

        // Disables all 4 answer buttons after one is clicked
        $('.answer-button').attr("disabled", true);
        if (this.value == currentQuestion.solutionId) {
            console.log("correct answer");
            correctAnswers.push(currentQuestion.questionId);
            console.log("correctAnswer array: ", correctAnswers);
            loadQuestion();

        } else if (this.value !== currentQuestion.solutionId) {
            console.log("incorrect answer");
            incorrectAnswers.push(currentQuestion.questionId);
            console.log("incorrectAnswer array: ", incorrectAnswers);
            loadQuestion();
        } else {
            console.log("timeout?");
            unAnswered.push(currentQuestion.questionId);
            console.log("unAnswered array: ", unAnswered);
            loadQuestion();
        }
    });


    // Start button
    $("#start").on("click", start);
    function start() {
        console.log("function start");
        correctAnswers = [];
        incorrectAnswers = [];
        unAnswered = [];
        questionIdCounter = 0;
        gameOver = false;
        currentQuestion = myQuestions[0];
        console.log("currentQuestion: ", currentQuestion);
        $('#question').empty();
        $('#answers').empty();
        loadQuestion();
    }

    // Game Over stuff
    function processGameOver() {
        console.log("game over");
        $('#question').empty();
        $('#answers').empty();
        $('#question').append("hi");
    }


});