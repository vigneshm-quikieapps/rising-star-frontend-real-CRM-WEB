import React, { useState } from "react";
import Output from "../../components/output";
import { FormControl, Select } from "../components/drop-down";
import {
  InputLabel,
  MenuItem,
  styled,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import Accordion from "../../components/accordion";
import GradientButton from "../../components/gradient-button";
import SimpleButton from "../../components/simple-button";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import IconButton from "../../components/icon-button";
import { icons } from "../../helper/constants";
import TextField from "../components/text-field";

const StyleBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  marginBottom: "15px",
  border: `1px solid ${theme.palette.ternary.main}`,
  borderRadius: theme.shape.borderRadius.secondary,
  "& .MuiTypography-h4": {
    fontWeight: 700,
    marginBottom: "0.1em",
  },
  "& .MuiTypography-subtitle2": {
    fontWeight: 700,
    color: theme.palette.text.primary,
    opacity: 0.5,
    marginBottom: "1em",
    fontSize: "1rem",
  },
}));

const MemberEnrollment = () => {
  const [age, setAge] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));

  const datehandleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <StyleBox>
        <Typography variant="h4" component="div">
          Ayman Mogal
        </Typography>
        <Typography variant="subtitle2" component="div">
          Student/Member
        </Typography>
        <Grid container sx={{ textAlign: "center" }}>
          <Grid item xs={4}>
            <FormControl variant="filled">
              <InputLabel>Business Name</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                value={age}
                onChange={handleChange}
                sx={{
                  height: "50px",
                }}
              >
                {/* {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            awesome
                        </MenuItem>
                        ))} */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Output title="Member" description="KK000" />
          </Grid>
          <Grid item xs={4}>
            <Output title="Club Membership Number" description="ZPGL0008" />
          </Grid>
        </Grid>
      </StyleBox>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            "& .MuiAccordionSummary-content": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <Typography>Enrolment Details</Typography>
          <div>
            <GradientButton
              sx={{ textTransform: "none", fontSize: "1rem" }}
              onClick={(e) => {
                e.stopPropagation();
                console.log("i got clicked");
              }}
            >
              Add a new enrolment
            </GradientButton>
            <IconButton
              sx={{
                margin: "0 10px",
              }}
            >
              <img src={icons.more} alt="user" height="20px" width="20px" />
            </IconButton>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Output title="Enrolment Id" description="ZPGL0008" />
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="filled">
                <InputLabel>Class Name*</InputLabel>
                <Select
                  value={age}
                  onChange={handleChange}
                  sx={{
                    height: "50px",
                  }}
                >
                  {/* {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            awesome
                        </MenuItem>
                        ))} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <Output title="Term" description="2022 Summer" />
            </Grid>
            <Grid item xs={3}>
              <Output title="Session" description="Mon, 9:30 am to 10:30 am" />
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="filled">
                <InputLabel>Enrol status</InputLabel>
                <Select
                  value={age}
                  onChange={handleChange}
                  sx={{
                    height: "50px",
                  }}
                >
                  {/* {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            awesome
                        </MenuItem>
                        ))} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl variant="filled">
                <InputLabel>Drop/Cancel Reason</InputLabel>
                <Select
                  value={age}
                  onChange={handleChange}
                  sx={{
                    height: "50px",
                  }}
                >
                  {/* {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            awesome
                        </MenuItem>
                        ))} */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Output title="Timmings" description="Mon, 9:30 am to 10:30 am" />
            </Grid>
            <Grid item xs={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={datehandleChange}
                  renderInput={(params) => (
                    <TextField variant="filled" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={3}>
              <Output title="Enroled Datetime" description="1/10/2021 9:30" />
            </Grid>
            <Grid item xs={3}>
              <Output title="Drop Datetime" description="- - -" />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ marginTop: "15px" }}>
        <GradientButton
          sx={{ textTransform: "none", fontSize: "1rem", marginRight: "10px" }}
        >
          Save
        </GradientButton>
        <GradientButton
          sx={{ textTransform: "none", fontSize: "1rem" }}
          discard
        >
          Cancel
        </GradientButton>
      </Box>
    </Box>
  );
};

export default MemberEnrollment;
