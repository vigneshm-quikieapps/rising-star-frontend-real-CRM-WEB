import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  AccordionContainer,
  CardRow,
  Description,
  HeadingText,
  ModalContainer,
} from "../../components/common";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "../../components/icon-button";
import { Outputs } from "../outputs";
import { objectToArray } from "../../utils";
import StyledTextField from "../../components/textfield";
import { AccordionDetails, AccordionSummary, MenuItem } from "@mui/material";
import Accordion from "../../components/accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CrossIconButton = () => (
  <IconButton>
    <CloseIcon />
  </IconButton>
);

const classId = {
  "Class ID": "DL39020458",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <CardRow>
            <HeadingText id="modal-modal-title" variant="h6" component="h2">
              Class Definition and Schedule
            </HeadingText>
            <CrossIconButton />
          </CardRow>
          <CardRow>
            <Outputs arr={objectToArray(classId)} />
          </CardRow>
          <CardRow>
            <Description
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                margin: "17px 0px 30px 0px",
              }}
            >
              Basic Information
            </Description>
          </CardRow>
          <CardRow sx={{ marginBottom: "20px" }}>
            <StyledTextField
              select
              sx={{ width: "30%" }}
              label="Class Name*"
              value={"select "}
              onChange={() => {}}
            >
              <MenuItem value="EQUALS">option 1</MenuItem>
              <MenuItem value="NO_EQUALS">option 2</MenuItem>
            </StyledTextField>

            <StyledTextField
              select
              sx={{ width: "30%" }}
              label="Bussiness Name*"
              value={"select "}
              onChange={() => {}}
            >
              <MenuItem value="EQUALS">Equals to</MenuItem>
              <MenuItem value="NO_EQUALS">Not equals to</MenuItem>
            </StyledTextField>

            <StyledTextField
              select
              sx={{ width: "30%" }}
              label="Class Status"
              value={"select "}
              onChange={() => {}}
            >
              <MenuItem value="EQUALS">Equals to</MenuItem>
              <MenuItem value="NO_EQUALS">Not equals to</MenuItem>
            </StyledTextField>
          </CardRow>

          <CardRow sx={{ marginBottom: "20px" }}>
            <StyledTextField
              select
              sx={{ width: "30%" }}
              label="Registration Consent Form"
              value={"select "}
              onChange={() => {}}
            >
              <MenuItem value="EQUALS">option 1</MenuItem>
              <MenuItem value="NO_EQUALS">option 2</MenuItem>
            </StyledTextField>

            <StyledTextField
              select
              sx={{ width: "30%" }}
              label="Class Category*"
              value={"select "}
              onChange={() => {}}
            >
              <MenuItem value="EQUALS">Equals to</MenuItem>
              <MenuItem value="NO_EQUALS">Not equals to</MenuItem>
            </StyledTextField>

            <StyledTextField
              select
              sx={{ width: "30%" }}
              label="Evaluation Scheme*"
              value={"select "}
              onChange={() => {}}
            >
              <MenuItem value="EQUALS">Equals to</MenuItem>
              <MenuItem value="NO_EQUALS">Not equals to</MenuItem>
            </StyledTextField>
          </CardRow>

          <CardRow>
            <StyledTextField
              sx={{ width: "100%" }}
              value={""}
              placeholder={"About this class"}
              onChange={(e) => {}}
            ></StyledTextField>
          </CardRow>

          <CardRow>
            <AccordionContainer>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Enrolment Controls</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CardRow sx={{ marginTop: "10px" }}>
                    <StyledTextField
                      select
                      sx={{ width: "40%" }}
                      label="Age"
                      value={"select "}
                      onChange={() => {}}
                    >
                      <MenuItem value="EQUALS">option 1</MenuItem>
                      <MenuItem value="NO_EQUALS">option 2</MenuItem>
                    </StyledTextField>
                    <StyledTextField
                      select
                      sx={{ width: "40%" }}
                      label="Gender"
                      value={"select "}
                      onChange={() => {}}
                    >
                      <MenuItem value="EQUALS">option 1</MenuItem>
                      <MenuItem value="NO_EQUALS">option 2</MenuItem>
                    </StyledTextField>
                  </CardRow>
                </AccordionDetails>
              </Accordion>
            </AccordionContainer>
          </CardRow>

          <CardRow>
            <AccordionContainer>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Charges</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CardRow sx={{ marginTop: "10px" }}>
                    <StyledTextField
                      select
                      sx={{ width: "40%" }}
                      label="Age"
                      value={"select "}
                      onChange={() => {}}
                    >
                      <MenuItem value="EQUALS">option 1</MenuItem>
                      <MenuItem value="NO_EQUALS">option 2</MenuItem>
                    </StyledTextField>
                    <StyledTextField
                      select
                      sx={{ width: "40%" }}
                      label="Gender"
                      value={"select "}
                      onChange={() => {}}
                    >
                      <MenuItem value="EQUALS">option 1</MenuItem>
                      <MenuItem value="NO_EQUALS">option 2</MenuItem>
                    </StyledTextField>
                  </CardRow>
                </AccordionDetails>
              </Accordion>
            </AccordionContainer>
          </CardRow>
        </ModalContainer>
      </Modal>
    </Box>
  );
}
