import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cell from "./Cell";

// smoke test
it("renders without crashing", () => {
  render(
    <table>
      <tbody>
        <tr>
          <Cell yCoord={0} xCoord={0} isLit={true} />
        </tr>
      </tbody>
    </table>
  );
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(
    <table>
      <tbody>
        <tr>
          <Cell yCoord={0} xCoord={0} isLit={true} />
        </tr>
      </tbody>
    </table>
  );
  expect(asFragment()).toMatchSnapshot();
});

describe("Cell is lit or unlit", () => {
  it("should be lit", () => {
    const cell = render(
      <table>
        <tbody>
          <tr>
            <Cell yCoord={0} xCoord={0} isLit={true} />
          </tr>
        </tbody>
      </table>
    );
    const td = cell.container.querySelector("td");
    expect(td).toHaveClass("Cell-lit");
  });

  it("should not be lit", () => {
    const cell = render(
      <table>
        <tbody>
          <tr>
            <Cell yCoord={0} xCoord={0} isLit={false} />
          </tr>
        </tbody>
      </table>
    );
    const td = cell.container.querySelector("td");
    expect(td).toHaveClass("Cell");
  });
});
