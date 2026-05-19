import { render, screen, fireEvent } from "@testing-library/react";

import TaskCard from "../components/TaskCard";

import { vi, test, expect } from "vitest";

import { BrowserRouter } from "react-router-dom";

const mockDelete = vi.fn();

vi.mock("../context/TaskContext", () => ({
  useTasks: () => ({
    updateStatus: vi.fn(),
    deleteTask: mockDelete,
    toggleFavorite: vi.fn(),
  }),
}));

test("delete button is clickable", () => {

  const task = {
    id: "1",
    title: "Sample Task",
    status: "pending",
    favorite: false,
  };

  render(
    <BrowserRouter>
      <TaskCard task={task} />
    </BrowserRouter>
  );

  fireEvent.click(screen.getByText(/delete/i));

  expect(mockDelete).toHaveBeenCalledTimes(1);
});