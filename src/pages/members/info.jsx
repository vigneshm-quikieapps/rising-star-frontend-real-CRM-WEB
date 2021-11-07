import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import { Accordion, IconButton, ImgIcon, Outputs } from "../../components";
import moreIcon from "../../assets/icons/icon-more.png";
import arrowDownIcon from "../../assets/icons/icon-arrow-down.png";

const MoreIconButton = () => (
  <IconButton sx={{ position: "absolute", top: "10px", right: "10px" }}>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

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

const extractContactInfo = (contact) => {
  const { name: Name, relationship: Relationship, contact: mobileNo } = contact;
  return { Name, Relationship, "Contact Number*": mobileNo };
};

const MemberInfo = () => {
  const currentMember = useSelector((state) => state.members.currentMember);

  const basicInfo = useMemo(() => {
    if (!currentMember) return {};
    const { name, gender, dob } = currentMember;
    const dateOfBirth = new Date(dob.split("T")[0]).toDateString();
    return {
      "Full Name": name,
      "Gender*": gender,
      "Date of Birth*": dateOfBirth,
    };
  }, [currentMember]);

  const parentInfo = useMemo(() => {
    if (!currentMember) return {};
    const { email, name: parentName, mobileNo } = currentMember.userId;
    return {
      "Full Name*": parentName,
      Email: email,
      "Contact Number": mobileNo,
    };
  }, [currentMember]);

  const primaryContactInfo = useMemo(() => {
    if (!currentMember) return {};
    const { contacts } = currentMember;
    const primaryContact = contacts.find(({ type }) => type === "PRIMARY");
    return extractContactInfo(primaryContact);
  }, [currentMember]);

  const secondaryContactInfo = useMemo(() => {
    if (!currentMember) return {};
    const { contacts } = currentMember;
    const secondaryContact = contacts.find(({ type }) => type !== "PRIMARY");
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
        <MoreIconButton />
        <Typography variant="h2" sx={{ fontSize: "28px", fontWeight: "bold" }}>
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
        </Typography>
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
