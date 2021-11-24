import { render, screen } from '@testing-library/react';
import { NotificationTypes } from './const';
import NotificationBar from './NotificationBar';


test('notification bar without notification', () => {
  render(<NotificationBar />);
  const bar = document.getElementById('notification_bar');
  expect(bar).toBeNull();
});

test('notification bar with empty notification', () => {
  render(<NotificationBar notification={{}} />);
  const bar = document.getElementById('notification_bar');
  expect(bar).toBeNull();
});

test('notification bar with notification', () => {
  render(<NotificationBar notification={{ message: 'Lorem ipsum dolor sit amet' }} />);
  const bar = document.getElementById('notification_bar');
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveTextContent(/lorem ipsum dolor sit amet/i);

  const svg = bar.querySelector('div.MuiSnackbar-root div.MuiPaper-root div.MuiSnackbarContent-message div svg.MuiSvgIcon-root');
  expect(svg).toHaveAttribute('data-testid', 'CloseIcon');
});

test('notification bar with success notification', () => {
  render(<NotificationBar notification={{ message: 'Lorem ipsum dolor sit amet', type: NotificationTypes.NOTIFY_SUCC }} />);
  const bar = document.getElementById('notification_bar');
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveTextContent(/lorem ipsum dolor sit amet/i);

  const svg = bar.querySelector('div.MuiSnackbar-root div.MuiPaper-root div.MuiSnackbarContent-message div svg.MuiSvgIcon-root');
  expect(svg).toHaveAttribute('data-testid', 'CheckCircleIcon');
});

test('notification bar with warning notification', () => {
  render(<NotificationBar notification={{ message: 'Lorem ipsum dolor sit amet', type: NotificationTypes.NOTIFY_WARN }} />);
  const bar = document.getElementById('notification_bar');
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveTextContent(/lorem ipsum dolor sit amet/i);

  const svg = bar.querySelector('div.MuiSnackbar-root div.MuiPaper-root div.MuiSnackbarContent-message div svg.MuiSvgIcon-root');
  expect(svg).toHaveAttribute('data-testid', 'WarningIcon');
});

test('notification bar with error notification', () => {
  render(<NotificationBar notification={{ message: 'Lorem ipsum dolor sit amet', type: NotificationTypes.NOTIFY_ERR }} />);
  const bar = document.getElementById('notification_bar');
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveTextContent(/lorem ipsum dolor sit amet/i);

  const svg = bar.querySelector('div.MuiSnackbar-root div.MuiPaper-root div.MuiSnackbarContent-message div svg.MuiSvgIcon-root');
  expect(svg).toHaveAttribute('data-testid', 'ErrorIcon');
});

test('notification bar with info notification', () => {
  render(<NotificationBar notification={{ message: 'Lorem ipsum dolor sit amet', type: NotificationTypes.NOTIFY_INFO }} />);
  const bar = document.getElementById('notification_bar');
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveTextContent(/lorem ipsum dolor sit amet/i);

  const svg = bar.querySelector('div.MuiSnackbar-root div.MuiPaper-root div.MuiSnackbarContent-message div svg.MuiSvgIcon-root');
  expect(svg).toHaveAttribute('data-testid', 'InfoIcon');
});