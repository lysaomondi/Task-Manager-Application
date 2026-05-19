import { render, screen } from "@testing-library/react";

import MyTasks from "../pages/MyTasks";

import { BrowserRouter } from "react-router-dom";

import { vi, test, expect } from "vitest";

// MOCK AUTH
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { uid: "123" },
  }),
}));

// MOCK TASK CONTEXT
vi.mock("../context/TaskContext", () => ({
  useTasks: () => ({
    subscribeToTasks: (uid, cb) => {
      cb([]);
      return vi.fn();
    },
    updateStatus: vi.fn(),
    toggleFavorite: vi.fn(),
    deleteTask: vi.fn(),
  }),
}));

test("renders my tasks page", () => {

  render(
    <BrowserRouter>
      <MyTasks />
    </BrowserRouter>
  );

  expect(
    screen.getByRole("heading", {
      name: /my tasks/i,
    })
  ).toBeInTheDocument();
});