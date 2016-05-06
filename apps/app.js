$(document).ready(function tictactoe() {
  var empty = '';
  var board = [empty, empty, empty, empty, empty, empty, empty, empty, empty];
  var x = "X";
  var o = "O";
  var current_player = x;
  var winner = "none";
  var move = 0;

  function resetGame() {
    board = [empty, empty, empty, empty, empty, empty, empty, empty, empty];
    current_player = x;
    winner = "none";
    move = 0;
    drawBoard();
    displayMessage("Your turn, X",'lightgray');
    $('#board').removeClass('gameOverColor');
    $('.topic-title').text("choose a square")
    // $('#game-over').css({display: 'none'});
    // $('#board').css({display: 'block'});
  }

  $('.cell').click(play);

  function play(event) {
    if(winner === "none" && move < 9){
      playerTurn(event);
    }
    endGame();
  }

  function playerTurn(event) {
    var position = $(event.target).attr('data-position');
    if(board[position] !== empty) {
      $(".topic-title").text("Oops. That one's occupied. Please choose another.");
    } else if(board[position] === empty) {
      board[position] = current_player;
      drawBoard();
      checkForWinner();
      if (current_player == "X") {
        current_player = o;
      } else {
          current_player = x;

        }

      displayMessage("Your turn, " + current_player, 'lightgray');
    }
  }

  function drawBoard() {
    for(var i = 0; i < 9; i++) {
      $('.cell[data-position="' + i + '"]').text(board[i]);
    }
  }

  function displayMessage(message, color) {
    $('.message').text(message).css;
  }

  function checkForWinner() {
    var winning_lines = [[0, 1 ,2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8],[2, 4, 6]];
    winning_lines.forEach(function(line) {
      var cell1 = line[0];
      var cell2 = line[1];
      var cell3 = line[2];
      if(current_player === board[cell1] && board[cell1] === board[cell2] && board[cell2] === board[cell3]) {
        winner = current_player;
      }
      console.log(move);
    });
  }


  function endGame() {
    if(board.indexOf(empty) === -1 && winner === "none") {
      // $('#board').css({display: 'none'});
      $('.topic-title').text("Stalemate! Try again.").css({display: 'block'});
    } else if(winner !== "none") {
      // $('#board').css({display: 'none'});
      $('#board').addClass('gameOverColor');
        // display: 'block',
        // color: '#555555',
        // fontSize: '44px',
        // textAlign: 'left',
        // lineHeight: '46px',
        // padding: '12px',
        // fontWeight: '300'
      // });
      $('.topic-title').text("Congrats, " + winner + "! You did it! Click here to play again!");
    }
    $('#play').one("click", resetGame);

  }
});
