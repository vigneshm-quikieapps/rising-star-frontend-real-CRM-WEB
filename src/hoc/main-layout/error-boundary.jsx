import { Component as ReactComponent } from "react";
import {  withRouter } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

class ErrorBoundary extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ error, errorInfo });
    console.log(error, errorInfo);
  }

  errorHandler = () => {
    this.props.history.replace("/");
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    // You can render any custom fallback UI
    return this.state.errorInfo ? (
      <Dialog
        open
        onClose={this.removeErrorHandler}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 2 }}
      >
        <DialogTitle>
          {this.state.error && this.state.error.toString()}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.errorInfo.componentStack}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.errorHandler}>Go to home Page</Button>
        </DialogActions>
      </Dialog>
    ) : (
      this.props.children
    );
  }
}

export default withRouter(ErrorBoundary);
