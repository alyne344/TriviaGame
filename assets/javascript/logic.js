//when document ready, start game
$(document).ready(function() {
    $('#play').on('click', game.restart);
});

game = {
    // time allowed to answer each question
    maxTime: 30,
    selection: 0,

    questions: [
        {
            question: 'Which Russell Crowe-starring film won Best Picture category in 2001?',
            options: ['A Beautiful Mind', 'L.A. Confidential', 'Gladiator', '3:10 to Yuma'],
            answer: 2,
        },
        {
            question: 'Who has won the mosting acting Oscars to date?',
            options: ['Meryl Streep', 'Jack Nicholson',
                'Daniel Day-Lewis', 'Katharine Hepburn',],
            answer: 3,
        },
        {
            question: 'Who has won the most directing awards?',
            options: ['John Ford', 'Clint Eastwood', 'Mel Gibson',
                'Tom Hooper'],
            answer: 0,
        },
        {
            question: 'Which of these individuals has received the Most awards at the Oscars?',
            options: ['Edith Head', 'Dennis Muren', 'Katharine Hepburn', 'Walt Disney'],
            answer: 3,
        },
        {
            question: 'Who was the youngest person to receive an Academy Award?',
            options: ['Shirley Temple, 6', 'Tatum ONeal, 10', 'Justin Henry, 8', 'Haley Joel Osment, 10'],
            answer: 1,
        },
    ],

    restart: function() {
        //stop countdown timer if it happens to be running
        game.clockRunning = false;
        //reset starting values
        game.round = 0;
        game.score = 0;
        selection = 0;
        //start new round
        game.newRound();
    },

    newRound: function() {
        //check if there are questions left, if so...
        if (game.questions.length > game.round) {
            $('#compare').html("Result");
            game.round++;
            //refresh display values for new question
            $('#question').html(game.questions[game.round - 1].question);

            //create buttons
            game.renderButtons();

            //start timer
            game.timer.restart();

        //if no questions left, game over
        } else {
            $('#question').html("Game Over!");
            $('#answers').empty()
            game.end();
        }
    },

    renderButtons: function() {
        //create answer choice buttons with class 'btn' and id
        $('#buttonA').html(game.questions[game.round - 1].options[0]);
        $('#buttonB').html(game.questions[game.round - 1].options[1]);
        $('#buttonC').html(game.questions[game.round - 1].options[2]);
        $('#buttonD').html(game.questions[game.round - 1].options[3]);

        var pickA = function() {
            selection = 0;
            game.guess();
        }

        var pickB = function() {
            selection = 1;
            game.guess();
        }

        var pickC = function() {
            selection = 2;
            game.guess();
        }

        var pickD = function() {
            selection = 3;
            game.guess();
        }

        $('#buttonA').click(pickA);
        $('#buttonB').click(pickB);
        $('#buttonC').click(pickC);
        $('#buttonD').click(pickD);

        

            // $('#answer').empty();
            // $.each(game.questions[game.round - 1].options, function(i, val) {
            //     var li = $('<li>');
            //     var button = $('<button>');
            //     //add on click event for all with class 'btn'
            //     button.addClass('btn');
            //     button.attr('id','btn-' + i);
            //     button.attr('onclick', 'game.guess(' + i + '); return false;');
            //     button.html(val);
            //     li.append(button);
            //     $('#answer').append(li);

            // //enable answer choice buttons
            // $(".btn").prop("disabled", false);
            // })
    },

    guess: function() {
        //upon click of answer choice button...
        game.timer.stop();
        //if guessed answer is correct...
        if (selection === game.questions[game.round - 1].answer) {
            //increase score and refresh screen values
            game.score++;
            $('#score').html(game.score);

            $('#compare').html('Correct!');

            //wait then start new round
            setTimeout(game.newRound, 1000);

        //if guessed answer is incorrect...
        } else {
            //refresh screen values
            $('#compare').html('Incorrect!');

            //wait then start new round
            setTimeout(game.newRound, 1000);
        }
    },

    timeout: function() {
        //when timer runs out, disable buttons
        $('.btn').prop('disabled', true);

        //animate correct answer background color
        $('#btn-' + game.questions[game.round - 1].answer).animate({
            backgroundColor: "#80ff80"
        }, 1000);

        //wait then start new round
        setTimeout(game.newRound, 7000);
    },

    // end: function() {
    //     //when game is over, disable buttons
    //     $('.btn').prop('disabled', true);

    //     //refresh display values
    //     $('#timer').html('00:00');
    //     $('#answer').empty();
    //     $('#questionTitle').html(
    //         'Final Score: '
    //         + game.score + ' / '
    //         + game.round
    //     );
    //     $('#question').empty();
    //     $('#link').html('<img src="assets/images/end.jpg">');
    //     $('#answerTitle').empty();

    // },

    timer: {

        restart: function() {
            // reset timer to max allowed time
            game.timer.time = game.maxTime;
            var converted = game.timer.timeConverter(game.timer.time);
            $('#timer').text(converted);
            if (!game.clockRunning) {
                game.clockRunning = true;
                intervalId = setInterval(game.timer.count, 1000);
            }
        },

        count: function() {
            if (game.timer.time === 0) {
                game.timer.stop();
                game.timeout();
            }

            else {
                // Increment time by 1, remember we cant use "this" here.
                game.timer.time--;
                // Get the current time, pass that into the
                // timer.timeConverter function, and save the result in a
                // variable.
                var converted = game.timer.timeConverter(game.timer.time);
                // Use the variable we just created to show the converted time
                // in the "time" element.
                $('#timer').text(converted);
            }
        },

        timeConverter: function(t) {
            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
              seconds = '0' + seconds;
            }

            if (minutes === 0) {
              minutes = '00';
            }
            else if (minutes < 10) {
              minutes = '0' + minutes;
            }

            return minutes + ':' + seconds;
        },

        stop: function() {
            // Use clearInterval to stop the count here and set the clock
            // to not be running.
            clearInterval(intervalId);
            game.clockRunning = false;
        },
    },
}
