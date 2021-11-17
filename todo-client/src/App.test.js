import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import App from './App';

const tasks = [
  { description: 'task1' },
  { description: 'task2' },
  { description: 'task3' },
];

test('check to do header', () => {
  render(<App />);
  const todoHeader = screen.getByText(/to do/i);
  expect(todoHeader).toBeInTheDocument();
});

test('add new button state', () => {
  render(<App />);
  const addNewTaskButton = screen.getByText(/add new task/i);
  expect(addNewTaskButton).not.toBeDisabled();
});

test('add new button state after click', () => {
  render(<App />);
  const addNewTaskButton = screen.getByText(/add new task/i);
  addNewTaskButton.click();
  expect(addNewTaskButton).toBeDisabled();
});

test('presence of task input before new button clicked', () => {
  render(<App />);
  const input = screen.queryByPlaceholderText(/type your task description/i);
  expect(input).toBeNull();
});

test('presence of cancel button before new button clicked', () => {
  render(<App />);
  const cancelButton = screen.queryByText(/cancel/i);
  expect(cancelButton).toBeNull();
});

test('presence of add button before new button clicked', () => {
  render(<App />);
  const addButton = screen.queryByText(/^add$/i);
  expect(addButton).toBeNull();
});

test('presence of task input after new button clicked', () => {
  render(<App />);
  const addNewTaskButton = screen.getByText(/add new task/i);
  addNewTaskButton.click();

  const input = screen.queryByPlaceholderText(/type your task description/i);
  expect(input).toBeInTheDocument();
  expect(input).toHaveFocus()
});

test('presence of cancel button after new button clicked', () => {
  render(<App />);
  const addNewTaskButton = screen.getByText(/add new task/i);
  addNewTaskButton.click();

  const cancelButton = screen.queryByText(/cancel/i);
  expect(cancelButton).toBeInTheDocument();
  expect(cancelButton).not.toBeDisabled();
});

test('presence of add button after new button clicked', () => {
  render(<App />);
  const addNewTaskButton = screen.getByText(/add new task/i);
  addNewTaskButton.click();

  const addButton = screen.queryByText(/^add$/i);
  expect(addButton).toBeInTheDocument();
  expect(addButton).not.toBeDisabled();
});

test('presence of task input after cancel button clicked', () => {
  render(<App />);
  const addNewTaskButton = screen.getByText(/add new task/i);
  addNewTaskButton.click();

  const cancelButton = screen.getByText(/cancel/i);
  cancelButton.click();

  const input = screen.queryByPlaceholderText(/type your task description/i);
  expect(input).toBeNull();
});

test('presence of notification bar before add button clicked', () => {
  render(<App />);
  const notificationBarContainer = document.querySelector("#notification_bar");
  expect(notificationBarContainer).not.toBeInTheDocument(notificationBarContainer);
});

test('presence of notification bar after add button clicked with invalid description', async () => {
  render(<App />);
  const addNewTaskButton = screen.getByText(/add new task/i);
  addNewTaskButton.click();

  const addButton = screen.getByText(/^add$/i);
  addButton.click();

  await waitFor(() => {
    expect(document.querySelector("#notification_bar")).toBeInTheDocument();
  }, { timeout: 5000 });
});

test('check task elements', () => {
  render(<App tasks={tasks} />);
  const taskElements = document.querySelectorAll(".task");
  taskElements.forEach((taskEl, i) => {
    expect(taskEl).toHaveTextContent(tasks[i].description);
  });
});