import React from "react";
import "../App.css";

//Global Scoope Var
let boxes = [["", "", ""], ["", "", ""], ["", "", ""]];
let easy = 0;
let board = document.querySelector(".Board");


//Players Opponent will be computer in single Player and Player 2 in multiplayer
const player = "X"; //Computer
const opponent = "O"; //Human or player which is computers opponent
const Hard = "Hard";
const Easy = "Easy";

//Display the Board
function displayBoard() {

  //Grabbing all the elements and refiling them
  let boxEle = document.querySelectorAll(".box");
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      boxEle[i * 3 + j].textContent = boxes[i][j];
    }
  }

}



// Javascript program to find the
// next optimal move for a player
class Move {
  constructor() {
    let row, col;
  }
}

function random() {
  let col = Math.floor(Math.random() * 3);
  let row = Math.floor(Math.random() * 3);

  while (boxes[row][col] != "") {
    col = Math.floor(Math.random() * 3);
    row = Math.floor(Math.random() * 3);
  }


  let rand = new Move();
  rand.row = row;
  rand.col = col;
  return rand;
}

//React Function
export default function Board(props) {


  // This is the minimax function. It
  // considers all the possible ways
  // the game can go and returns the
  // value of the board
  function minimax(board, depth, isMax) {
    let score = evaluate(board);

    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10) {
      if (props.mode == Hard)
        return score - depth;
      else
        return score;
    }

    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10) {
      if (props.mode == Hard)
        return score + depth;
      else
        return score;
    }


    // If there are no more moves and
    // no winner then it is a tie
    if (isMovesLeft(board) == false)
      return 0;

    // If this maximizer's move
    if (isMax) {
      let best = -1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

          // Check if cell is empty
          if (board[i][j] == '') {

            // Make the move
            board[i][j] = player;

            // Call minimax recursively
            // and choose the maximum value
            best = Math.max(best, minimax(board,
              depth + 1, !isMax));

            // Undo the move
            board[i][j] = '';
          }
        }
      }
      if (props.mode == Easy) { return best; }
      else { return best - depth; }
    }

    // If this minimizer's move
    else {
      let best = 1000;

      // Traverse all cells
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

          // Check if cell is empty
          if (board[i][j] == '') {

            // Make the move
            board[i][j] = opponent;

            // Call minimax recursively and
            // choose the minimum value
            best = Math.min(best, minimax(board,
              depth + 1, !isMax));

            // Undo the move
            board[i][j] = '';
          }
        }
      }
      if (props.mode == Easy) { return best; }
      else { return best + depth; }
    }
  }

  //-----------------------------------------------
  // This will return the best possible
  // move for the player
  function findBestMove(board) {
    let bestVal = -1000;
    let bestMove = new Move();
    bestMove.row = -1;
    bestMove.col = -1;

    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        // Check if cell is empty
        if (board[i][j] == '') {

          // Make the move
          board[i][j] = player;

          // compute evaluation function
          // for this move.
          let moveVal = minimax(board, 0, false);

          // Undo the move
          board[i][j] = '';

          // If the value of the current move
          // is more than the best value, then
          // update best
          if (moveVal > bestVal) {
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
          }
        }
      }
    }


    return bestMove;
  }


  //-----------------------------------------------
  function isMovesLeft(board) {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (board[i][j] == '')
          return true;

    return false;
  }


  //---------------------------------------------
  function evaluate(b) {

    // Checking for Rows for X or O victory.
    for (let row = 0; row < 3; row++) {
      if (b[row][0] == b[row][1] &&
        b[row][1] == b[row][2]) {
        if (b[row][0] == player)
          return +10;

        else if (b[row][0] == opponent)
          return -10;
      }
    }

    // Checking for Columns for X or O victory.
    for (let col = 0; col < 3; col++) {
      if (b[0][col] == b[1][col] &&
        b[1][col] == b[2][col]) {
        if (b[0][col] == player)
          return +10;

        else if (b[0][col] == opponent)
          return -10;
      }
    }

    // Checking for Diagonals for X or O victory.
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
      if (b[0][0] == player)
        return +10;

      else if (b[0][0] == opponent)
        return -10;
    }

    if (b[0][2] == b[1][1] &&
      b[1][1] == b[2][0]) {
      if (b[0][2] == player)
        return +10;

      else if (b[0][2] == opponent)
        return -10;
    }

    // Else if none of them have
    // won then return 0
    return 0;
  }

  //----------------------------------------------
  function reset() {
    props.setMode("none");
    boxes = [["", "", ""], ["", "", ""], ["", "", ""]];
    props.setTurn("O");
    easy = 0;

    let boxesEle = document.querySelectorAll(".box");

    for (let i = 0; i < boxesEle.length; i++) {
      boxesEle[i].classList.remove("boxHighlight");

    }
  }
  //----------------------------------------------


  function winDisplay(first, sec, third) {

    let boxesEle = document.querySelectorAll(".box");

    boxesEle[first].classList.add("boxHighlight");
    boxesEle[sec].classList.add("boxHighlight");
    boxesEle[third].classList.add("boxHighlight");

  }
  //----------------------------------------------



  //Win checker
  function winChecker(b) {

    // Checking for Rows for X or O victory.
    for (let row = 0; row < 3; row++) {
      if (b[row][0] == b[row][1] &&
        b[row][1] == b[row][2] && b[row][0] != "") {

        winDisplay(row * 3 + 0, row * 3 + 1, row * 3 + 2);
        return b[row][1];
      }
    }

    // Checking for Columns for X or O victory.
    for (let col = 0; col < 3; col++) {
      if (b[0][col] == b[1][col] &&
        b[1][col] == b[2][col] && b[0][col] != "") {

        winDisplay(0 * 3 + col, 1 * 3 + col, 2 * 3 + col);
        return b[0][col];

      }
    }

    // Checking for Diagonals for X or O victory.
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2] && b[0][0] != "") {

      winDisplay(0, 4, 8);
      return b[0][0];

    }

    if (b[0][2] == b[1][1] &&
      b[1][1] == b[2][0] && b[2][0] != "") {

      winDisplay(2, 4, 6);
      return b[0][2];


    }

    // Else if none of them have
    // won then return 0
    return "";
  }


  //----------------------------------------------
  //A simple Function to handle Clicks
  function clickHandle(r, c) {
    //Allow to click only if The box is Empty and Human turn
    if (props.turn == "O") {
      if (boxes[r][c] == "") {
        boxes[r][c] = "O";

        //Turn Changer
        props.setTurn("X");

        //Dispalying the Move that has been played
        displayBoard();


        let winPromise = new Promise((resolve, reject) => {

          let win = winChecker(boxes);
          setTimeout(() => {
            if (win == player || win == opponent) {
              reject(win);
            }

            else {
              resolve();
            }
          }, 200)

        })

        winPromise.then(() => {
          compTurn();
        })
          //For Reject or If game is over or won by someone and Reseting the game
          .catch((win) => {

            alert(`${win} Player Won hahahaha!`);
            reset();
          });




      }



    }

    easy++;
  }

  function compTurn() {
    //Computers turn

    //random Mode for easy 
    let compMove;
    if (easy == 2 && props.mode == Easy) {
      compMove = random();
    }

    //Find the Best Move and Play it 
    else { compMove = findBestMove(boxes); }

    //A 0.5s Delay to make it look like Computer is Thinking
    setTimeout(() => {

      if (compMove.row != -1 && compMove.col != -1) { boxes[compMove.row][compMove.col] = "X"; };
      displayBoard();



      //Checking Win over here
      let win = winChecker(boxes);
      if (win == player || win == opponent) {
        //Another Set TimeOut for delay in win Display
        setTimeout(() => {
          alert(`${win} Player Won hahahaha!`);
          reset();
        }, 500);



      }

      //Draw Condition
      else if (!isMovesLeft(boxes)) {
        //Draw delay
        setTimeout(() => {
          alert(`Ohhh Looks like its a draw !`);
          reset();
        }, 500);
      }

      //Turn Changer
      props.setTurn("O");
    }, 500)

  }
  //alert(findBestMove());

  return (
    <div className="Board">
      <div
        className="box"
        onClick={() => {
          clickHandle(0, 0);
        }}
      >
        {boxes[0][0]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(0, 1);
        }}
      >
        {boxes[0][1]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(0, 2);
        }}
      >
        {boxes[0][2]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(1, 0);
        }}
      >
        {boxes[1][0]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(1, 1);
        }}
      >
        {boxes[1][1]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(1, 2);
        }}
      >
        {boxes[1][2]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(2, 0);
        }}
      >
        {boxes[2][0]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(2, 1);
        }}
      >
        {boxes[2][1]}
      </div>
      <div
        className="box"
        onClick={() => {
          clickHandle(2, 2);
        }}
      >
        {boxes[2][2]}
      </div>
    </div>
  );
}
