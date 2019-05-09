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

        // Set the current question
        currentQuestion = myQuestions[questionIdCounter];
        console.log("currentQuestion: ", currentQuestion);

        if (typeof currentQuestion === "undefined") {
            gameOver == true;
            processGameOver();
            return false;
        } else {
            // Clear the display divs
            $('#question').empty();
            $('#answers').empty();
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
            startTiming();
            console.log("loaded question: ", currentQuestion);
        }
    }


    // Handles clicks on the multiple choice buttons
    $(document).on('click', '.answer-button', function () {

        // Stops timer
        stop();

        console.log("hiasdfasdfasdfasdf" + this.value);
        console.log(currentQuestion.solutionId);
        console.log(currentQuestion.questionId)

        // Disables all 4 answer buttons after one is clicked
        $('.answer-button').attr("disabled", true);


        // If user guesses the correct answer
        if (this.value == currentQuestion.solutionId) {
            console.log("correct answer");
            correctAnswers.push(currentQuestion.questionId);
            console.log("correctAnswer array: ", correctAnswers);
            loadQuestion();
            // Incorrect answer
        } else if (this.value !== currentQuestion.solutionId) {
            console.log("incorrect answer");
            incorrectAnswers.push(currentQuestion.questionId);
            console.log("incorrectAnswer array: ", incorrectAnswers);
            loadQuestion();
            // Timer ran out
        } else {
            console.log("timeout?");
            unAnswered.push(currentQuestion.questionId);
            console.log("unAnswered array: ", unAnswered);
            loadQuestion();
        }
    });


    // Timer Stuff // // // // // // //
    //  Variable that will hold our setInterval that runs the timer 
    var intervalId;
    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;
    var time = 0;

    function reset() {
        time = 0;
        lap = 1;
        // Change the "display" div to "5"
        $("#display").text("5");
        // Empty the "laps" div.
        $("#laps").text("");
        stop();
    }

    function startTiming() {
        // Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
        }
    }

    function stop() {
        console.log("STOP");
        // Use clearInterval to stop the count
        clearInterval(intervalId);
        // Set the clock to not be running.
        clockRunning = false;
        console.log("time: ", time);
        time = 0;
        $("#display").text(time);
    }

    function recordLap() {
        // Get the current time, and save the result in a variable.
        var timeResponse = time;
        // Add the current lap and time to the "laps" div.
        $("#laps").append("<p>Lap " + lap + " : " + timeResponse + "</p>");
        // Increment lap by 1. Remember, we can't use "this" here.
        lap++;
    }

    function count() {
        // increment time by 1, remember we cant use "this" here.
        time++;
        // Use the variable we just created to show the converted time in the "display" div.
        $("#display").text(time);
    }

    // Reset button
    $("#reset").on("click", reset);
    function reset() {
        stop();
        console.log("function reset");
        correctAnswers = [];
        incorrectAnswers = [];
        unAnswered = [];
        questionIdCounter = 0;
        gameOver = false;
        currentQuestion = myQuestions[0];
        console.log("currentQuestion: ", currentQuestion);
        $('#question').empty();
        $('#answers').empty();
    }


    // Main Code // // // // //

    // Start button
    $("#start").on("click", start);
    function start() {
        stop();
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
        $('#question').append("<div class=gameover>" + "Game Over! Here's how you did:" + "</div>" + "<div class=correct>" + correctAnswers.length + " correct.</div>" + "<div class=incorrect>" + incorrectAnswers.length + " incorrect.</div>" + "<div class=unanswered>" + unAnswered.length + " unanswered.</div>");
    };


});