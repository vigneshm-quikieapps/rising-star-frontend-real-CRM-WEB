import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import { Accordion, ImgIcon, Outputs } from "../../components";
import arrowDownIcon from "../../assets/icons/icon-arrow-down.png";
import toPascal from "../../utils/to-pascal";
import { setPageTitle } from "../../redux/action/shared-actions";

const ExpandIcon = () => <ImgIcon>{arrowDownIcon}</ImgIcon>;

const Details = ({ title, details }) => (
  <Accordion defaultExpanded>
    <AccordionSummary expandIcon={<ExpandIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Outputs items={details} columnCount={3} />
    </AccordionDetails>
  </Accordion>
);
const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};

const extractContactInfo = (
  contact = { name: "", relationship: "", contact: "" },
) => {
  const { name, relationship, contact: mobileNo } = contact;
  return {
    Name: (name),
    Relationship: toPascal(relationship),
    "Contact Number": mobileNo,
  };
};

const MemberInfo = () => {
  const dispatch = useDispatch();
  const currentMember = useSelector((state) => state.members.currentMember);

  useEffect(() => dispatch(setPageTitle("Personal Info")), [dispatch]);

  const basicInfo = useMemo(() => {
    if (!currentMember) return {};
    const { name, gender, dob } = currentMember;
    const dateOfBirth = reformatDate(new Date(dob).toISOString().split("T")[0]);
    return {
      "Full Name": (name),
      Gender: toPascal(gender),
      "Date of Birth": dateOfBirth,
    };
  }, [currentMember]);

  const parentInfo = useMemo(() => {
    if (!currentMember) return {};
    const { email, name: parentName, mobileNo } = currentMember.userId;
    return {
      "Full Name": (parentName),
      Email: email,
      "Contact Number": mobileNo,
    };
  }, [currentMember]);

  const primaryContactInfo = useMemo(() => {
    if (!currentMember) return {};
    const { contacts } = currentMember;
    const primaryContact = contacts.find(
      ({ addressType }) => addressType === "PRIMARY",
    );
    return extractContactInfo(primaryContact);
  }, [currentMember]);

  const secondaryContactInfo = useMemo(() => {
    if (!currentMember) return {};
    const { contacts } = currentMember;
    const secondaryContact = contacts.find(
      ({ addressType }) => addressType !== "PRIMARY",
    );
    return extractContactInfo(secondaryContact);
  }, [currentMember]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          border: (theme) => `1px solid ${theme.palette.highlight.main}`,
          borderRadius: (theme) => theme.shape.borderRadiuses.secondary,
          p: "20px",
        }}
      >
        <Typography
          sx={{ fontSize: "28px", fontWeight: "bold", lineHeight: "normal" }}
          component="div"
        >
          {basicInfo["Full Name"]}
        </Typography>
        <Typography
          sx={{
            color: "#0008",
            margin: "6px 0px 10px 0",
            fontSize: "14px",
            fontWeight: "bold",
            lineHeight: "normal",
          }}
          component="div"
        >
          Student/Member
        </Typography>
        {/* <Typography variant="h2" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          {basicInfo["Full Name"]}
        </Typography>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontWeight: "bold",
            mb: "10px",
          }}
        >
          Student / Member
        </Typography> */}
        <Outputs items={basicInfo} columnCount={3} />
      </Box>
      <Details title="Parent / Carer Details" details={parentInfo} />
      <Details
        title="Emergency Contact (Primary)"
        details={primaryContactInfo}
      />
      <Details
        title="Emergency Contact (Secondary)"
        details={secondaryContactInfo}
      />
    </>
  );
};

export default MemberInfo;
