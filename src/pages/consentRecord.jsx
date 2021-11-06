import React from "react";
import Accordion from "./../components/accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Box, MenuItem, Grid, styled } from "@mui/material";
import moreIcon from "../assets/icons/icon-more.png";
import IconButton from "../components/icon-button";
import ImgIcon from "../components/img-icon";
import GradientButton from "../components/gradient-button";
import TextField from "../components/textfield";
import Switch from "@mui/material/Switch";
// import allergy from "../assets/icons/icon-allergy.png";
import {
  AccordionContainer,
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../components/common";
import Output from "../components/output";

const MoreIconButton = () => (
  <IconButton>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);
// const AllergyIcon = () => <ImgIcon alt="allergy">{allergy}</ImgIcon>;
const label = { inputProps: { "aria-label": "Switch demo" } };

const StyleBox = styled(Box,TextField)(({ theme }) => ({
  padding: "20px",
  marginBottom: "15px",
  border: `1px solid ${theme.palette.ternary.main}`,
  borderRadius: theme.shape.borderRadiuses.secondary,
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

const ConsentRecord = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <StyleBox>
        <CardRow>
          <HeadingText>Ayman Mogal</HeadingText>
          <MoreIconButton />
        </CardRow>
        <SubHeadingText>Student/Member</SubHeadingText>

        <Grid container sx={{ textAlign: "center" }}>
          <Grid item xs={4}>
            <TextField
              select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              label="Business Name"
              // onChange={() => {}}
              variant="filled"
              sx={{ width: "272px" }}
            >
              <MenuItem value={1}>Zippy Totz Pre-school Gymnastics</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <Output title="Member" description="KK000" />
          </Grid>
          <Grid item xs={4}>
            <Output title="Club Membership Number" description="ZPGL0008" />
          </Grid>
        </Grid>
      </StyleBox>
      <AccordionContainer>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Consent Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardRow sx={{ justifyContent: "flex-start" }}>
              <Typography>
                Does your child have any allergies we should be aware of
              </Typography>
              <Switch {...label} defaultChecked sx={{ marginLeft: "auto" }} />
            </CardRow>
            <TextField
            style={{width:"840px"}}
              label="Further details.."
            />
            <CardRow sx={{ justifyContent: "flex-start" }}>
              <Typography>
                Does your child have any conditions we should be aware of
              </Typography>
              <Switch {...label} defaultChecked sx={{ marginLeft: "auto" }} />
            </CardRow>
            <TextField
              sx={{
                width: "840px",
              }}
              label="Further details.."
            />

            {/* <AllergyIcon /> */}
            <SubHeadingText>
              Zippy’s occasionally takes videos and photographs for promotional
              and training purposes and during displays
            </SubHeadingText>

            <CardRow sx={{ justifyContent: "flex-start" }}>
              <Typography>
                Does your child have any conditions we should be aware of
              </Typography>
              <Switch {...label} defaultChecked sx={{ marginLeft: "auto" }} />
            </CardRow>
            <CardRow sx={{ justifyContent: "flex-start" }}>
              <Typography>
                Signed by First Name Last Name (Parent / Carer)
              </Typography>
              <Switch {...label} defaultChecked sx={{ marginLeft: "auto" }} />
            </CardRow>
            <GradientButton
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                marginTop: "20px",
              }}
              discard
            >
              Okay
            </GradientButton>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
    </Box>
  );
};

export default ConsentRecord;
