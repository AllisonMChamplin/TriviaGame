// U of M Coding Boot Camp in Saint Paul
// Trivia Game Homework - Allison Champlin
// May 2019

$(document).ready(function () {

    $(".progress").hide();
    $("#answers").hide();
    $(".card").hide();
    $('#reset').hide();

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
    function Question(query, answerArray, solutionId, questionImg, questionFact, questionId) {
        this.query = query;
        this.answers = answerArray;
        this.solutionId = solutionId;
        this.questionId = questionIdCounter;
        this.questionImg = questionImg;
        this.questionFact = questionFact;
        myQuestions.push(this);
        questionIdCounter = questionIdCounter + 1;
    }

    // Question Objects //
    var questionOne = new Question("Who was absent at the Council of Elrond?", ["Gimli", "Legolas", "Galadriel", "Gandalf"], 2, "assets/images/quest1.jpg", "blah");
    var questionTwo = new Question("Who made the One Ring?", ["Bilbo", "Saruman", "Elrond", "Sauron"], 3, "assets/images/quest2.jpg", "blah 2");
    var questionThree = new Question("By what name do the Elves call Gandalf?", ["The Grey Pilgrim", "Gandalf the Grey", "Incanus", "Mithrandir"], 3, "assets/images/quest3.jpg", "blah 3");
    var questionFour = new Question("Who is the proprietor of the Prancing Pony?", ["Bill Ferny", "Barliman Butterbur", "Forlong the Fat", "Tom Pickthorn"], 1, "assets/images/quest4.jpg", "blah 4");




    // Loads the current question
    function loadQuestion() {
        console.log("Hi loadQuestion", myQuestions);
        $('.progress').empty();
        $('.progress-bar').addClass('progress');
        $('.next').remove();
        $('.card').show();
        $('#start').hide();
        $('#question').show();
        // $("#next-button").empty();
        // $('.progress').empty();
        
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
            $('.changer').empty();
            $('#answers').empty();
            $('.card').empty();
            // Replace changer with question number
            function displayQuestionNumber() {
                var x = (questionIdCounter + 1);
                var n = myQuestions.length;
                $('.changer').prepend("<p>Question " + x + " of " + n + "</p>");
            }
            // Replace the changer div with a new question, card div with image
            function displayQuestion() {
                if (typeof currentQuestion === "undefined") {
                    processGameOver();
                } else {
                    $('.changer').append(currentQuestion.query);
                    $('.card').append("<img src=" + currentQuestion.questionImg + ">");
                }
            };
            // Loops through the array of answers and appends the answer div with each answer array item
            function displayAnswers() {
                for (i = 0; i < currentQuestion.answers.length; i++) {
                    $('#answers').append("<button class='answer-button shadow-sm rounded' value=" + i + ">" + (i + 1) + ") " + currentQuestion.answers[i] + "</button>" + "<br>");
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
        $('.progress-bar').empty();
        
        // Adds a class to the button that was clicked
        $(this).addClass('selectedAnswer');

        // Disables all 4 answer buttons after one is clicked
        $('.answer-button').attr("disabled", true);


        // If user guesses the correct answer
        if (this.value == currentQuestion.solutionId) {
            correctAnswers.push(currentQuestion.questionId);
            $("button[value='" + currentQuestion.solutionId + "']").addClass('correct');
            $('.card').append("<span class='fact'>Correct! " + currentQuestion.questionFact + "</span>");

            // Incorrect answer
        } else if (this.value !== currentQuestion.solutionId) {
            incorrectAnswers.push(currentQuestion.questionId);
            console.log("HERE");
            $('.card').append("<span class='fact'>Incorrect. " + currentQuestion.questionFact + "</span>");
            $(this).addClass('incorrect');
            $("button[value='" + currentQuestion.solutionId + "']").addClass('correct');

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
    var time = 11;

    function reset() {
        time = 11;
        lap = 1;
        // Change the "display" div to "6"
        $("#display").text("6");
        // Empty the "laps" div.
        $("#laps").text("");
        stop();
    }

    function startTiming() {
        time = 11;
        $("#display").text(time);
        // Use setInterval to start the count here and set the clock to running.
        if (!clockRunning) {
            intervalId = setInterval(count, 1000);
            clockRunning = true;
            $(".progress").show();
            $("#answers").show();
            $(".card").show();
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
        $('.answer-button').addClass("incorrect");
        $("button[value='" + currentQuestion.solutionId + "']").addClass('correct');
        nextQuestion();
        $('.card').append("<span class='fact'>" + currentQuestion.questionFact + "</span>");
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


    // Next Question
    function nextQuestion() {        
        // $('.progress-bar').removeClass('progress');
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
        $('.progress').hide();
        $('#question').empty();
        $('#answers').empty();
        $('.changer').empty();
        $('.main-row').hide();
        $('.changer').append("<div class=gameover>" + "Game Over!" + "</div>");
        $('#question').append("<div>Here's how you did:<br><br>" + correctAnswers.length + " correct.<br><br></div>" + "<div>" + incorrectAnswers.length + " incorrect.<br><br></div>" + "<div class=unanswered>" + unAnswered.length + " unanswered.<br><br></div>" + "<br><br><br>");
        $('#reset').show();
        $('.card').empty();
        $('.card').hide();
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

    
    // Start button
    $("#start").on("click", start);
    function start() {
        $(".changer").html("Are you a fan of J. R. R. Tolkien?<br>Test your knowledge with this timed trivia game! Good luck!");
        stop();
        $(".progress").hide();
        $(".changer").empty();
        $(".intro-row").empty();
        correctAnswers = [];
        incorrectAnswers = [];
        unAnswered = [];
        questionIdCounter = 0;
        gameOver = false;
        currentQuestion = myQuestions[0];
        time = 11;
        $("#display").text(time);
        $('#question').empty();
        $('#answers').empty();
        $(".progress").empty();
        loadQuestion();
    }


    // Reset button 
    $('#reset').on("click", reset);
    function reset() {
        console.log("hi reset button");
        stop();
        $(".progress").hide();
        $(".changer").empty();
        $(".changer").html("Are you a fan of J. R. R. Tolkien?<br>Test your knowledge with this timed trivia game! Good luck!");
        correctAnswers = [];
        incorrectAnswers = [];
        unAnswered = [];
        questionIdCounter = 0;
        gameOver = false;
        currentQuestion = myQuestions[0];
        time = 11;
        // $("#display").text(time);
        $('.intro-row').html("<img src='assets/images/intro.png'>");
        $('#question').empty();
        $('#answers').empty();
        $(".progress").empty();
        // loadQuestion();
        $('#reset').hide();
        $('#start').show();
        $('.main-row').show();
        $('#answers').show();

    }

});