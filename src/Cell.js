import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * Cell:
 * - Renders a <td>, where the CSS classes will indicate whether this cell is lit or unlit.
 * - This is what the user clicks on — calls a function it receives from the Board, since that will need to update the state.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ yCoord, xCoord, flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  const coord = yCoord + "-" + xCoord;
  return <td className={classes} onClick={() => flipCellsAroundMe(coord)}></td>;
}

export default Cell;
