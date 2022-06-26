import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Board:
 * - Holds the state that represents the in-memory grid of true/false for lights-on/off
 *
 * Properties:
 *
 * - rows: number of rows of board
 * - cols: number of cols of board
 * - cellLitProbability: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *  Renders an HTML table of individual <Cell /> components.
 *  Doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ rows, cols, cellLitProbability }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board rows high/cols wide, each cell randomly lit or unlit */
  // array-of-arrays of true/false values
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < rows; i++) {
      initialBoard.push([]);
      for (let j = 0; j < cols; j++) {
        if (Math.random() <= cellLitProbability) {
          initialBoard[i].push(true);
        } else {
          initialBoard[i].push(false);
        }
      }
    }
    return initialBoard;
  }

  // check the board in state to determine whether the player has won.
  // if the game is won, show a winning msg & render nothing else
  function hasWon() {
    let won = true;
    for (const row of board) {
      for (const cell of row) {
        if (cell === true) {
          won = false;
        }
      }
    }
    return won;
  }

  // check if game is won
  if (hasWon()) {
    return <div className="win-msg">"Congratulations, You Won!"</div>;
  }

  function flipCellsAroundMe(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < rows && y >= 0 && y < cols) {
          // flip clicked cell
          boardCopy[y][x] = !boardCopy[y][x];

          // flip cell above, if any
          if (y - 1 >= 0) {
            boardCopy[y - 1][x] = !boardCopy[y - 1][x];
          }
          // flip cell below, if any
          if (y + 1 < cols) {
            boardCopy[y + 1][x] = !boardCopy[y + 1][x];
          }
          // flip cell to the left, if any
          if (x - 1 >= 0) {
            boardCopy[y][x - 1] = !boardCopy[y][x - 1];
          }
          // flip cell to the right, if any
          if (x + 1 < rows) {
            boardCopy[y][x + 1] = !boardCopy[y][x + 1];
          }
        }
      };

      // make a deep copy of the oldBoard
      let newBoard = JSON.parse(JSON.stringify(oldBoard));

      // flip this cell and the cells around it in the deep copy
      flipCell(y, x, newBoard);

      // return the copy
      return newBoard;
    });
  }

  // create html board
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
