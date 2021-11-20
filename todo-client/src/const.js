export const NotificationTypes = {
  NOTIFY_SUCC: "succ",
  NOTIFY_WARN: "warn",
  NOTIFY_ERR: "err",
  NOTIFY_INFO: "info",
};

if (!window.env) {
  window.env = {
    API_URL: process.env.REACT_APP_API_URL,
  }
}