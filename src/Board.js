import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const htmlBoard = document.querySelector(".Board");
  const htmlApp = document.querySelector(".App");

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      initialBoard.push([]);
      for (let j = 0; j < ncols; j++) {
        if (Math.random() <= chanceLightStartsOn) {
          initialBoard[i].push(true);
        } else {
          initialBoard[i].push(false);
        }
        //CHECK IF LIT # IN ROWS AND COLUMNS ARE EVEN
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    let won = true;
    for (const row of board) {
      for (const cell of row) {
        if (cell === true) {
          won = false;
        }
      }
    }

    if (won) {
      htmlBoard.remove();
      htmlApp.append("You Won!");
    }
  }

  // check if game is won
  hasWon();

  function flipCellsAroundMe(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
          // flip clicked cell
          boardCopy[y][x] = !boardCopy[y][x];
          // flip cell above, if any
          if (y - 1 >= 0) {
            boardCopy[y - 1][x] = !boardCopy[y - 1][x];
          }
          // flip cell below, if any
          if (y + 1 < ncols) {
            boardCopy[y + 1][x] = !boardCopy[y + 1][x];
          }
          // flip cell to the left, if any
          if (x - 1 >= 0) {
            boardCopy[y][x - 1] = !boardCopy[y][x - 1];
          }
          // flip cell to the right, if any
          if (x + 1 < nrows) {
            boardCopy[y][x + 1] = !boardCopy[y][x + 1];
          }
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  function createHtmlBoardRows(board) {
    return board.map((row, rowIdx) => {
      return (
        <tr key={rowIdx}>
          {row.map((cell, colIdx) => (
            <Cell
              key={colIdx + rowIdx}
              yCoord={rowIdx}
              xCoord={colIdx}
              flipCellsAroundMe={flipCellsAroundMe}
              isLit={cell ? true : false}
            />
          ))}
        </tr>
      );
    });
  }

  // render html board
  return (
    <table className="Board">
      <tbody>{createHtmlBoardRows(board)}</tbody>
    </table>
  );
}

export default Board;

// App
//     As often, this is a very simple component. It just renders the Board component.
// Board
//     The most sophisticated component. It will hold the state that represents the in-memory grid of true/false for lights-on/off. Since the state for the board lives here, this is also were the setState() calls will need to go — and therefore, the functions that call setState().
// Cell
//     A simpler component. This will simply render a <div>, where the CSS classes will indicate whether this cell is lit or unlit. This is what the user clicks on — but it will need to call a function it receives from the Board, since that will need to update the state.
