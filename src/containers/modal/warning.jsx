import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { CardRow, HeadingText } from "../../components/common";
import CloseIcon from "@mui/icons-material/Close";
import { GradientButton, IconButton } from "../../components";
import { Typography } from "@mui/material";

const CrossIconButton = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <CloseIcon />
  </IconButton>
);
const Warning = (props) => {
  return (
    <Box>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "hidden", zIndex: 10001 }}
        BackdropProps={{
          onClick: () => {},
          style: { backgroundColor: "#000000d5" },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            width: "40%",
            height: "30%",
            margin: "17% 30%",
            borderRadius: "20px",
            border: "solid 1px #f2f1f6",
            backgroundColor: "#fff",
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <CardRow
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              marginTop: 0,
              padding: "5px 10px",
            }}
          >
            <HeadingText
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: 20 }}
            >
              {props.title}
            </HeadingText>
            <CrossIconButton onClick={props.handleClose} />
          </CardRow>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              padding: "0 0 5%",
            }}
          >
            <Box
              sx={{
                margin: "auto",
                padding: "10px",
              }}
            >
              <Typography>{props.description}</Typography>
            </Box>
            <Box sx={{ position: "relative", width: "100%", height: "50%" }}>
              <CardRow
                sx={{
                  justifyContent: "flex-start",
                  position: "absolute",
                  right: "5%",
                  bottom: 0,
                  flexWrap: "nowrap",
                }}
              >
                <GradientButton
                  sx={{ marginRight: "5%", minWidth: "80px", maxWidth: "25%" }}
                  onClick={props.accept}
                >
                  Yes
                </GradientButton>
                <GradientButton
                  sx={{ marginRight: "3%", minWidth: "80px", maxWidth: "25%" }}
                  onClick={props.handleClose}
                >
                  No
                </GradientButton>
              </CardRow>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Warning;
