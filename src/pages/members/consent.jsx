import React, { useState, useEffect } from "react";
import { MenuItem, styled, Box, Grid, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";

import { Accordion, TextField, Output } from "../../components/index";
import { allergyIcon } from "../../assets/icons";

import { getMemberConsentRecord } from "../../redux/action/memberAction";
import { setPageTitle } from "../../redux/action/shared-actions";

const StyleBox = styled(Box)(({ theme }) => ({
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

const MemberConsent = () => {
  const dispatch = useDispatch();

  const currentMember = useSelector((state) => state.members.currentMember);
  const consentRecord = useSelector((state) => state.members.consentRecord);
  const businessList = useSelector((state) => state.businesses.businessList);

  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [expanded, setExpanded] = useState("panel1");

  useEffect(() => dispatch(setPageTitle("Consent Record")), [dispatch]);

  useEffect(() => {
    setSelectedBusiness(businessList[0]?._id || "");
  }, [businessList]);

  useEffect(() => {
    if (currentMember) {
      dispatch(
        getMemberConsentRecord(currentMember.membership[0].clubMembershipId),
      );
    }
  }, [dispatch, currentMember]);

  const businessChangeHandler = (e) => {
    setSelectedBusiness(e.target.value);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <StyleBox>
        <Typography variant="h4" component="div">
          {currentMember ? currentMember.name : "- - -"}
        </Typography>
        <Typography variant="subtitle2" component="div">
          Student/Member
        </Typography>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <TextField
              select
              label="Business Name"
              variant="filled"
              sx={{ width: "100%" }}
              value={selectedBusiness}
              onChange={businessChangeHandler}
            >
              {businessList.map((li, index) => (
                <MenuItem key={`B${index}`} value={`${li._id}`}>
                  {li.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <Output
              title="Club Membership Number"
              description={
                currentMember
                  ? currentMember.membership[0].clubMembershipId
                  : "- - -"
              }
              sx={{ marginLeft: "20px" }}
            />
          </Grid>
        </Grid>
      </StyleBox>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consent Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ConsentDisplayComponent
            questionText="Does your child have any allergies we should be aware of ?"
            field={true}
            text={consentRecord[0]?.consent.allergies}
            flexDirection="column"
          />
          <ConsentDisplayComponent
            questionText="Does your child have any conditions we should be aware of ?"
            field={true}
            text={consentRecord[0]?.consent.condition}
            flexDirection="column"
          />
          <Box
            sx={{
              padding: "0 10px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <img
              src={allergyIcon}
              alt="allergy"
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
                objectFit: "contain",
                opacity: "0.5",
              }}
            />

            <Typography
              variant="caption"
              display="block"
              sx={{
                letterSpacing: "0.5px",
                fontWeight: "bold",
                opacity: "0.5",
              }}
            >
              Zippy’s occasionally takes videos and photographs for promotional
              and training purposes and during displays
            </Typography>
          </Box>
          <ConsentDisplayComponent
            questionText="Does your child have any conditions we should be aware of ?"
            field={false}
            flexDirection="row"
            text={consentRecord[0]?.consent.photographConsent}
          />
          <ConsentDisplayComponent
            questionText={`Signed by (Parent / Carer) ?`}
            field={false}
            flexDirection="row"
            text={consentRecord[0]?.consent.signedByParent}
          />
        </AccordionDetails>
      </Accordion>
      {/* <GradientButton
        sx={{ textTransform: "none", marginTop: "15px" }}
        invert
        size="large"
      >
        Okay
      </GradientButton> */}
    </Box>
  );
};

export default MemberConsent;

const ConsentDisplayComponent = ({
  questionText,
  field,
  text,
  flexDirection,
}) => {
  return (
    <Box
      sx={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: `${
          flexDirection === "column" ? "flex-start" : "space-between"
        }`,
        flexDirection: `${flexDirection}`,
      }}
    >
      <Typography
        variant="subtitle2"
        component="div"
        sx={{
          fontSize: "1rem",
          margin: "15px",
          marginLeft: 0,
        }}
      >
        {questionText}
      </Typography>

      {field ? (
        <TextField
          variant="filled"
          multiline
          disabled
          placeholder="Further details..."
          value={text}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              height: "115px",
              paddingTop: "10px",
            },
          }}
          rows={4}
        />
      ) : (
        <Typography
          variant="subtitle2"
          component="div"
          sx={{
            fontSize: "1rem",
            marginTop: "15px",
          }}
        >
          {text ? "Yes" : "No"}
        </Typography>
      )}
    </Box>
  );
};
