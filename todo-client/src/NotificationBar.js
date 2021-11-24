import React from 'react';
import { withStyles } from '@mui/styles';
import { CheckCircle as CheckCircleIcon, Close as CloseIcon, Error as ErrorIcon, Info as InfoIcon, Warning as WarningIcon } from '@mui/icons-material';
import { Snackbar, SnackbarContent } from '@mui/material';
import { amber, green, red, blue } from '@mui/material/colors';
import clsx from "clsx";
import { NotificationTypes } from './const';

const styles = (theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[700],
  },
  info: {
    backgroundColor: blue[600],
  },
  warning: {
    backgroundColor: amber[700],
  },
  message: {
    fontFamily: "'Roboto', sans-serif",
    textAlign: 'left',
    fontSize: 16,
    width: '100%',
    display: 'flex',
    padding: 4
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: 8
  },
});

const variantIcon = {
  [NotificationTypes.NOTIFY_SUCC]: CheckCircleIcon,
  [NotificationTypes.NOTIFY_WARN]: WarningIcon,
  [NotificationTypes.NOTIFY_ERR]: ErrorIcon,
  [NotificationTypes.NOTIFY_INFO]: InfoIcon,
};

class NotificationBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: Boolean(this.props.notification.message),
      notification: this.props.notification,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.notification !== this.props.notification) {
      const open = this.props.notification.message && this.props.notification.message !== '';
      this.setState({ notification: this.props.notification, open });
    }
  }

  getContentClass = () => {
    const { classes } = this.props;
    switch (this.props.notification.type) {
      case NotificationTypes.NOTIFY_SUCC: {
        return classes.success;
      }
      case NotificationTypes.NOTIFY_WARN: {
        return classes.warning;
      }
      case NotificationTypes.NOTIFY_ERR: {
        return classes.error;
      }
      case NotificationTypes.NOTIFY_INFO: {
        return classes.info;
      }
      default: {
        return "";
      }
    }
  }

  onClose = (e, reason) => {
    this.setState({ open: false });
  }

  render() {
    const { classes } = this.props;
    const Icon = this.state.notification.type ? variantIcon[this.state.notification.type] : CloseIcon;
    const contentClass = this.getContentClass();
    const message = this.state.notification.message ? this.state.notification.message : '';
    const duration = 5000;
    const iconClass = clsx(classes.icon, classes.iconVariant);

    return (
      <div>
        <Snackbar id="notification_bar"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          key={"123"}
          open={this.state.open}
          autoHideDuration={duration}
          onClose={(e) => this.onClose(e)}
        >
          <SnackbarContent
            classes={{ message: classes.snackContent }}
            className={clsx(contentClass)}
            aria-describedby="client-snackbar"
            message={
              <div className={classes.message}>
                <Icon size={18} className={iconClass} />
                {message}
              </div>
            }
          />
        </Snackbar>
      </div>
    );
  }
}

NotificationBar.defaultProps = {
  notification: {},
}

export default withStyles(styles)(NotificationBar);
