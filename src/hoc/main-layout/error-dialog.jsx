import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
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
      <Dialog
        open={!!errors.length}
        onClose={removeErrorHandler}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <DialogTitle>The following error occurred</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="pre">{errors[0]}</Typography>
          </DialogContentText>
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
