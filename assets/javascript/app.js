// U of M Coding Boot Camp in Saint Paul
// Trivia Game Homework - Allison Champlin
// May 2019

$(document).ready(function () {

    $(".progress").hide();

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
        questionIdCounter = questionIdCounter + 1;
    }

    // Question Objects //
    var questionOne = new Question("Who was absent at the Council of Elrond?", ["Gimli", "Legolas", "Galadriel", "Gandalf"], 2);
    var questionTwo = new Question("Who made the One Ring?", ["Bilbo", "Saruman", "Elrond", "Sauron"], 3);
    var questionThree = new Question("By what name do the Elves call Gandalf?", ["The Grey Pilgrim", "Gandalf the Grey", "Incanus", "Mithrandir"], 3);
    var questionFour = new Question("Who is the proprietor of the Prancing Pony?", ["Bill Ferny", "Barliman Butterbur", "Forlong the Fat", "Tom Pickthorn"], 1);

    // Loads the current question
    function loadQuestion() {
        console.log("Hi loadQuestion", myQuestions);

        $("#next-button").empty();
        $("#start").hide();
        
        if (questionIdCounter == 0) {
            $('#timer').empty();
        }

        // Set the current question
        currentQuestion = myQuestions[questionIdCounter];        

        if (typeof currentQuestion === "undefined") {
            gameOver == true;
            processGameOver();
            return false;
        } else {
            // Clear the display divs
            $(".changer").empty();
            $('#question').empty();
            $('#answers').empty();

            // Replace changer with question number
            function displayQuestionNumber() {
                var x = (questionIdCounter + 1);
                var n = myQuestions.length;
                $('.changer').prepend("<p>Question " + x + " of " + n + "</p>");
            }
            // Replace the changer div with a new question
            function displayQuestion() {
                if (typeof currentQuestion === "undefined") {
                    processGameOver();
                } else {
                    $('.changer').append(currentQuestion.query);
                }
            };
            // Loops through the array of answers and appends the answer div with each answer array item
            function displayAnswers() {
                for (i = 0; i < currentQuestion.answers.length; i++) {
                    $('#answers').append("<button class='answer-button shadow-sm rounded' value=" + i + ">" + currentQuestion.answers[i] + "</button>" + "<br>");
                };
            };

            displayQuestionNumber();
            displayQuestion();
            displayAnswers();
            questionIdCounter = questionIdCounter + 1;
            startTiming();
        }
    }


    // Handles clicks on the multiple choice buttons
    $(document).on('click', '.answer-button', function () {

        // Stops timer
        stop();
        recordLap();
        nextQuestion();

        // Adds a class to the button that was clicked
        $(this).addClass('selectedAnswer');

        // Disables all 4 answer buttons after one is clicked
        $('.answer-button').attr("disabled", true);


        // If user guesses the correct answer
        if (this.value == currentQuestion.solutionId) {
            console.log("correct answer");
            correctAnswers.push(currentQuestion.questionId);
            console.log("correctAnswer array: ", correctAnswers);
            // Incorrect answer
        } else if (this.value !== currentQuestion.solutionId) {
            console.log("incorrect answer");
            incorrectAnswers.push(currentQuestion.questionId);
            console.log("incorrectAnswer array: ", incorrectAnswers);

            // Timer ran out
        } else {
            console.log("timeout?");
        }
    });


    // Timer Stuff // // // // // // //
    //  Variable that will hold our setInterval that runs the timer 
    var intervalId;
    // prevents the clock from being sped up unnecessarily
    var clockRunning = false;
    var time = 10;

    function reset() {
        time = 10;
        lap = 1;
        // Change the "display" div to "6"
        $("#display").text("6");
        // Empty the "laps" div.
        $("#laps").text("");
        stop();
    }

    function startTiming() {
        time = 10;
        $("#display").text(time);
        // Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;            
        $(".progress").show();
        }
    }

    function stop() {
        console.log("STOP");
        // Use clearInterval to stop the count
        clearInterval(intervalId);
        // Set the clock to not be running.
        clockRunning = false;
        $("#display").text(time);
    }

    function recordLap() {
        // Get the current time, and save the result in a variable.
        var timeResponse = time;
        // Add the current lap and time to the "laps" div.
        // $("#laps").append("<p>Lap " + lap + " : " + timeResponse + "</p>");
        // Increment lap by 1. Remember, we can't use "this" here.
        // lap++;
        return time;
    }

    function processUnanswered() {
        unAnswered.push(currentQuestion.questionId);
        console.log("unAnswered array: ", unAnswered);
        $('.answer-button').attr("disabled", true);
        nextQuestion();
    }

    function count() {
        if (time == 0) {
            stop();
            processUnanswered();
        } else {
            // decrement time by 1
            time--;
        }
        $("#display").text(time);
        progressBar(time);
    }

    // Reset button
    $("#reset").on("click", reset);
    function reset() {
        stop();        
        $(".progress").hide();
        correctAnswers = [];
        incorrectAnswers = [];
        unAnswered = [];
        questionIdCounter = 0;
        gameOver = false;
        currentQuestion = myQuestions[0];
        console.log("currentQuestion: ", currentQuestion);
        time = 10;
        $("#display").empty();
        $('#question').empty();
        $('#answers').empty();
        $("#next-button").empty();
        $(".progress").empty();
    }


    // Main Code // // // // //

    // Start button
    $("#start").on("click", start);
    function start() {
        stop();        
        $(".progress").hide();
        $(".changer").empty();
        correctAnswers = [];
        incorrectAnswers = [];
        unAnswered = [];
        questionIdCounter = 0;
        gameOver = false;
        currentQuestion = myQuestions[0];
        time = 10;
        $("#display").text(time);
        $('#question').empty();
        $('#answers').empty();
        $("#next-button").empty();
        $(".progress").empty();
        loadQuestion();
    }


    // Next Question
    function nextQuestion() {
        $("#next-button").empty();
        var nextButton = $("<button>");
        nextButton.addClass("next");
        if (questionIdCounter < 4) {
            nextButton.text("Next Question");
        } else {
            nextButton.text("Score Quiz");
        }
        $("#next-button").append(nextButton);
    }


    // Adding click event listeners to all elements with a class of ".next"
    $(document).on("click", ".next", loadQuestion);


    // Game Over stuff
    function processGameOver() {
        console.log("game over");
        $('#question').empty();
        $('#answers').empty();
        $("#next-button").empty();
        $('#question').append("<div class=gameover>" + "Game Over! Here's how you did:" + "</div>" + "<div class=correct>" + correctAnswers.length + " correct.</div>" + "<div class=incorrect>" + incorrectAnswers.length + " incorrect.</div>" + "<div class=unanswered>" + unAnswered.length + " unanswered.</div>");
        $('.progress').hide();
        $("#start").text("Start a new game");
        $("#start").show();
    };


    function progressBar(t) {
        var percent = (t * 100) / 10;
        $(".progress").empty();
        var progressDiv = $("<div>");
        progressDiv.addClass("progress-bar");
        progressDiv.attr("role", "progressbar");
        progressDiv.attr("style", "width: " + percent + "%");
        progressDiv.attr("aria-valuenow='t'");
        progressDiv.attr("aria-valuemin='0'");
        progressDiv.attr("aria-valuemax='100'");
        progressDiv.text(t);
        $('.progress').append(progressDiv);
    }


});