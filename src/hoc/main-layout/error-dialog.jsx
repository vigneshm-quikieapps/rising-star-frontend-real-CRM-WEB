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
import { ImgIcon } from "../../components";
import ErrorIcon from "../../assets/icons/icon-error.png";

const ErrorDialog = () => {
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.shared.errors);
  if (!errors.length) return null;
  const removeErrorHandler = () => {
    dispatch(removeError());
  };
  return (
    <Dialog
      open={!!errors.length}
      onClose={removeErrorHandler}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
        "& .MuiDialog-paper": {
          minWidth: "380px",
          padding: "40px 30px",
          margin: "27px 300px 31px 200px",
          alignItems: "center",
        },
      }}
    >
      <ImgIcon>{ErrorIcon}</ImgIcon>

      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText component="pre">{errors[0]}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={removeErrorHandler}
          sx={{
            color: "#ff2c60",
            border: "solid 1px #f2f1f6",
            textTransform: "none",
            fontSize: "20px",
          }}
          autoFocus
        >
          Discard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
