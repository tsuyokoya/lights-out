import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "./Board";

// // smoke test
it("renders without crashing", () => {
  render(<Board nrows={5} ncols={5} chanceLightStartsOn={0.5} />);
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <Board nrows={5} ncols={5} chanceLightStartsOn={0.5} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should be lit or unlit after click", () => {
  const board = render(<Board nrows={5} ncols={5} chanceLightStartsOn={0.5} />);
  const td = board.container.querySelector(".Cell-lit");

  fireEvent.click(td);
  expect(td).not.toHaveClass("Cell-lit");

  fireEvent.click(td);
  expect(td).toHaveClass("Cell-lit");
});
