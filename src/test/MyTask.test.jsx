import { render, screen } from "@testing-library/react";
import MyTasks from "../pages/MyTasks";
import { BrowserRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";

// Mock Auth
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { uid: "test-user" },
  }),
}));

// Mock Tasks
vi.mock("../context/TaskContext", () => ({
  useTasks: () => ({
    tasks: [
      {
        id: "1",
        title: "Sample Task",
        completed: false,
        favorite: false,
      },
    ],
    toggleTask: vi.fn(),
    toggleFavorite: vi.fn(),
    deleteTask: vi.fn(),
  }),
}));

test("renders tasks page", () => {
  render(
    <BrowserRouter>
      <MyTasks />
    </BrowserRouter>
  );

  // ✅ FIX: target heading specifically
  expect(
    screen.getByRole("heading", { name: /my tasks/i })
  ).toBeInTheDocument();
});