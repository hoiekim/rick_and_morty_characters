import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("./pages/Main", () => ({
  __esModule: true,
  default: () => <div>Main Page Testing Value</div>,
}));

import App from "./App";

test("renders main page in '/' path", () => {
  window.history.pushState({}, "Test page", "/");
  render(<App />);
  const mockElement = screen.getByText(/Main Page Testing Value/i);
  expect(mockElement).toBeInTheDocument();
});
