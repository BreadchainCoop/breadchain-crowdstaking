import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../Button";

test("Header contains correct text", () => {
  render(<Button onClick={() => {}}>Connect Wallet</Button>);
  const text = screen.getByText("Connect Wallet");
  expect(text).toBeInTheDocument();
});
