import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { TaskProvider } from "../context/TaskContext";
import { BrowserRouter } from "react-router-dom";
import { vi, test, expect } from "vitest";

// ✅ MOCK AUTH CONTEXT (CRITICAL FIX)
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { uid: "test-user" },
  }),
}));

test("user can add a task", async () => {
  render(
    <BrowserRouter>
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </BrowserRouter>
  );

  const input = screen.getByPlaceholderText("Enter task");
  const button = screen.getByText(/add task/i);

  fireEvent.change(input, { target: { value: "Test Task" } });
  fireEvent.click(button);

  const addedTask = await screen.findByText("Test Task");

  expect(addedTask).toBeInTheDocument();
});