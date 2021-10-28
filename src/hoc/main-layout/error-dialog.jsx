import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { removeError } from "../../redux/action/shared-actions";

const ErrorDialog = ({ children }) => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.shared.errors);
  if (!errors.length) return children;
  const removeErrorHandler = () => {
    dispatch(removeError());
  };
  return (
    <>
      <Dialog open={!!errors.length} onClose={removeErrorHandler}>
        <DialogTitle>The following error occurred</DialogTitle>
        <DialogContent>
          <DialogContentText>{errors[0]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={removeErrorHandler}>Discard</Button>
        </DialogActions>
      </Dialog>
      {children}
    </>
  );
};

export default ErrorDialog;
