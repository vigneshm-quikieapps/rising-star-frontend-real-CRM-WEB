import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ImgIcon from "./img-icon";
import warningIcon from "../assets/icons/icon-warning.png";

export default function DialogBox(props) {
  const { open, onNo, title, description, onYes } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onNo}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "380px",
            padding: "40px 30px",
            margin: "27px 300px 31px 200px",
            alignItems: "center",
            borderRadius: "20px",
          },
        }}
      >
        <ImgIcon>{warningIcon}</ImgIcon>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#ff2c60",
              border: "solid 1px #f2f1f6",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: "600px",
              borderRadius: "12px",
              width: "100px",
            }}
            onClick={onNo}
          >
            No
          </Button>
          <Button
            sx={{
              color: "#ff2c60",
              border: "solid 1px #f2f1f6",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: "600px",
              borderRadius: "12px",
              width: "100px",
            }}
            onClick={onYes}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
