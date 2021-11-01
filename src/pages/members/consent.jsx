import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MenuItem, styled, Box, Grid, Typography } from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";

import GradientButton from "../../components/gradient-button";
import Accordion from "../../components/accordion";
import TextField from "../../components/textfield";
import Output from "../../components/output";
import TopNav from "./components/top-nav";

import {
  getMemberById,
  getMemberConsentRecord,
} from "../../redux/action/memberAction";
import { getBusinessListOfBusiness } from "../../redux/action/businesses-actions";

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
  const { id } = useParams();

  const currentMember = useSelector((state) => state.members.currentMember);
  const consentRecord = useSelector((state) => state.members.consentRecord);
  const businessListofLoggedInUser = useSelector(
    (state) => state.businesses.businessListOfBusiness
  );

  const [selectedBusiness, setselectedBusiness] = useState("");
  const [expanded, setExpanded] = useState("panel1");

  // const consentParams = () => {
  //   return new Promise((resolve, reject) => {
  //     const data = {
  //       clubMembershipId: currentMember.clubMembershipId,
  //     }
  //     resolve(data);
  //   });

  // }

  useEffect(() => {
    dispatch(getBusinessListOfBusiness());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMemberById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setselectedBusiness(businessListofLoggedInUser[0]?._id);
  }, [businessListofLoggedInUser]);

  useEffect(() => {
    if (currentMember) {
      dispatch(
        getMemberConsentRecord(
          currentMember.member.membership[0].clubMembershipId
        )
      );
    }
  }, [dispatch, currentMember]);

  console.log(consentRecord);

  const businessChangeHandler = (e) => {
    setselectedBusiness(e.target.value);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box>
      <TopNav />
      <StyleBox>
        <Typography variant="h4" component="div">
          {currentMember ? currentMember.member.name : "- - -"}
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
              {businessListofLoggedInUser.map((li, index) => (
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
                  ? currentMember.member.membership[0].clubMembershipId
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
          <QandAcomponent
            questionText="Does your child have any allergies we should be aware of"
            needTextfield={true}
            textForTextfield={
              consentRecord.memberConsent[0] &&
              consentRecord.memberConsent[0].consent.allergies
            }
          />
          <QandAcomponent
            questionText="Does your child have any conditions we should be aware of"
            needTextfield={true}
            textForTextfield={
              consentRecord.memberConsent[0] &&
              consentRecord.memberConsent[0].consent.condition
            }
          />
          <QandAcomponent
            questionText="Does your child have any conditions we should be aware of"
            needTextfield={false}
          />
          <QandAcomponent
            questionText={`Signed by (Parent / Carer)`}
            needTextfield={false}
          />
        </AccordionDetails>
      </Accordion>
      <GradientButton
        sx={{ textTransform: "none", marginTop: "15px" }}
        discard
        size="large"
      >
        Okay
      </GradientButton>
    </Box>
  );
};

export default MemberConsent;

const QandAcomponent = ({ questionText, needTextfield, textForTextfield }) => {
  return (
    <Box sx={{ marginBottom: "20px" }}>
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
      {needTextfield && (
        <TextField
          variant="filled"
          multiline
          disabled
          placeholder="Further details..."
          value={textForTextfield}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              height: "115px",
              paddingTop: "10px",
            },
          }}
          rows={4}
        />
      )}
    </Box>
  );
};
