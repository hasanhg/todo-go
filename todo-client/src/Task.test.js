import { render, screen } from '@testing-library/react';
import Task from './Task';


test('task component without task prop', () => {
  render(<Task />);
  const container = document.querySelector('div.task');
  expect(container).toBeInTheDocument();
  expect(container.textContent).toEqual("");
});

test('task component with empty task prop', () => {
  render(<Task task={{}} />);
  const container = document.querySelector('div.task');
  expect(container).toBeInTheDocument();
  expect(container.textContent).toEqual("");
});

test('task component with task prop', () => {
  render(<Task task={{ description: 'Lorem ipsum dolor sit amet' }} />);
  const container = document.querySelector('div.task');
  expect(container).toBeInTheDocument();
  expect(container).toHaveTextContent(/lorem ipsum dolor sit amet/i);
});

test('task component with adding prop', () => {
  render(<Task adding />);
  const container = document.querySelector('div#task_container');
  expect(container).toBeInTheDocument();

  const textArea = screen.queryByPlaceholderText(/type your task description/i);
  expect(textArea).toBeInTheDocument();

  const addButton = screen.queryByText(/add/i)
  expect(addButton).toBeInTheDocument();

  const cancelButton = screen.queryByText(/cancel/i)
  expect(cancelButton).toBeInTheDocument();
});

test('task component with adding and valid description props', () => {
  render(<Task task={{ description: 'Lorem ipsum dolor sit amet' }} adding />);
  const container = document.querySelector('div#task_container');
  expect(container).toBeInTheDocument();

  const textArea = screen.queryByPlaceholderText(/type your task description/i);
  expect(textArea).toHaveTextContent(/lorem ipsum dolor sit amet/i);
});