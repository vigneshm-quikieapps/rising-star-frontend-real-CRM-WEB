import Accordion from "./../components/accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionContainer,
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../components/common";
import { Typography, Box } from "@mui/material";
import moreIcon from "../assets/icons/icon-more.png";
import IconButton from "../components/icon-button";
import ImgIcon from "../components/img-icon";
import { objectToArray } from "../utils";
import {
  personalInfoObject1,
  personalInfoObject2,
  personalInfoObject3,
  personalInfoObject4,
} from "../helper/constants";
import { Outputs } from "../containers/outputs";
import { useEffect, useState } from "react";
import { getAllMembers, getMemberById } from "../services/membersServices";

const MoreIconButton = () => (
  <IconButton>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

const PersonalInfo = () => {
  const [allMembers, setAllMembers] = useState([]);
  const [curMemberInfo, setCurMemberInfo] = useState();
  const [basicInfoArr, setBasicInfoArr] = useState([]);
  const [parentInfoArr, setParentInfoArr] = useState([]);
  const [primaryContactInfoArr, setPrimaryContactInfoArr] = useState([]);
  const [secondaryContactInfoArr, setSecondaryContactInfoArr] = useState([]);

  const arr2 = objectToArray(personalInfoObject2);

  const getMemberInfo = (member) => {
    const { name, gender, dob, contacts } = member;
    let info = {},
      parentInfo = {};

    // setting basic info object
    info["Full Name"] = name;
    info["Gender*"] = gender;
    info["Date of Birth*"] = dob;
    setBasicInfoArr(objectToArray(info));

    // setting primary and secondary contact info arrays
    contacts.forEach((item) => {
      let obj = {
        Name: item.name,
        Relationship: item.relationship,
        "Contact Number*": item.contact,
      };
      let arr = objectToArray(obj);
      item.type == "PRIMARY"
        ? setPrimaryContactInfoArr(arr)
        : setSecondaryContactInfoArr(arr);
    });
  };

  useEffect(() => {
    // checking API -> getting all members
    getAllMembers((allMembersData) => {
      setAllMembers(allMembersData.docs);
      let curUId = allMembersData.docs[0]._id;

      // getting particular member
      getMemberById(curUId, (curMember) => {
        setCurMemberInfo(curMember.member);
        getMemberInfo(curMember.member);
      });
    });

    return () => {
      setAllMembers([]);
      setCurMemberInfo();
      setBasicInfoArr([]);
      setParentInfoArr([]);
      setPrimaryContactInfoArr([]);
      setSecondaryContactInfoArr([]);
    };
  }, []);

  return (
    <Box>
      <Card>
        <CardRow>
          <HeadingText>{curMemberInfo && curMemberInfo.name}</HeadingText>
          <MoreIconButton />
        </CardRow>
        <SubHeadingText>Student/Member</SubHeadingText>
        <CardRow sx={{ justifyContent: "flex-start" }}>
          <Outputs arr={basicInfoArr} />
        </CardRow>
      </Card>
      <AccordionContainer>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Parent / Carer Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardRow sx={{ justifyContent: "flex-start" }}>
              <Outputs arr={arr2} />
            </CardRow>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>

      <AccordionContainer>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Emergency Contact (Primary)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardRow sx={{ justifyContent: "flex-start" }}>
              <Outputs arr={primaryContactInfoArr} />
            </CardRow>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>

      <AccordionContainer>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Emergency Contact (Secondary)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardRow sx={{ justifyContent: "flex-start" }}>
              <Outputs arr={secondaryContactInfoArr} />
            </CardRow>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
    </Box>
  );
};

export default PersonalInfo;
