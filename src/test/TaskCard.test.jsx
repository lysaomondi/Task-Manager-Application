import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../components/TaskCard";
import { vi, test, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";

// Mock Auth
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { uid: "test-user" },
  }),
}));

test("delete button is clickable", () => {
  const mockDelete = vi.fn();

  const task = {
    id: "1",
    title: "Sample Task",
    completed: false,
    favorite: false,
  };

  render(
    <BrowserRouter>
      <TaskCard
        task={task}
        toggleTask={() => {}}
        toggleFavorite={() => {}}
        deleteTask={mockDelete}
      />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/delete/i));

  expect(mockDelete).toHaveBeenCalledTimes(1);
});