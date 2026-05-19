import { render, screen } from "@testing-library/react";

import Navbar from "../components/Navbar";

import { BrowserRouter } from "react-router-dom";

import { vi, test, expect } from "vitest";


vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    logout: vi.fn(),
  }),
}));

test("renders login button", () => {

  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/login/i)
  ).toBeInTheDocument();
});