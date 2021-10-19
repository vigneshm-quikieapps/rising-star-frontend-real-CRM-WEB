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
import { personalInfoObject2 } from "../helper/constants";
import { Outputs } from "../containers/outputs";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getAllMembersList, getMemberById } from "../redux/action/memberAction";

const MoreIconButton = () => (
  <IconButton>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

const PersonalInfo = () => {
  const [currentMemberId, setCurrentMemberId] = useState();
  const [basicInfoArr, setBasicInfoArr] = useState([]);
  const [parentInfoArr, setParentInfoArr] = useState([]);
  const [primaryContactInfoArr, setPrimaryContactInfoArr] = useState([]);
  const [secondaryContactInfoArr, setSecondaryContactInfoArr] = useState([]);

  const dispatch = useDispatch();
  const allMembers = useSelector((state) => state.members.allMembers);
  const currentMember = useSelector(
    (state) => state.members.currentMember && state.members.currentMember.member
  );

  const getMemberInfo = () => {
    const { name, gender, dob, contacts, userId } = currentMember;
    const { email, name: pName, mobileNo } = userId;

    let info = {};
    let parentInfo = {};

    // setting basic info object
    info["Full Name"] = name;
    info["Gender*"] = gender;
    info["Date of Birth*"] = dob;
    setBasicInfoArr(objectToArray(info));

    // setting parent info
    parentInfo["Parent User ID*"] = "Driving Licence";
    parentInfo["Full Name*"] = pName;
    parentInfo.Email = email;
    parentInfo["Contact Number"] = mobileNo;
    setParentInfoArr(objectToArray(parentInfo));

    // setting primary and secondary contact info arrays
    contacts.forEach((item) => {
      let obj = {
        Name: item.name,
        Relationship: item.relationship,
        "Contact Number*": item.contact,
      };
      let arr = objectToArray(obj);
      item.type === "PRIMARY"
        ? setPrimaryContactInfoArr(arr)
        : setSecondaryContactInfoArr(arr);
    });
  };

  useEffect(() => {
    dispatch(getAllMembersList());

    return () => {
      setBasicInfoArr([]);
      setParentInfoArr([]);
      setPrimaryContactInfoArr([]);
      setSecondaryContactInfoArr([]);
    };
  }, []);

  useEffect(() => {
    let id = allMembers.docs && allMembers.docs[0]._id;
    setCurrentMemberId(id);
    id && dispatch(getMemberById(id));
  }, [allMembers]);

  useEffect(() => {
    currentMember && getMemberInfo();
  }, [currentMember]);

  return (
    <Box>
      <Card>
        <CardRow>
          <HeadingText>{currentMember && currentMember.name}</HeadingText>
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
              <Outputs arr={parentInfoArr} />
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

const mapStateToProps = (state) => {
  console.log("state: ", state);
  return {
    allMembers: state.members.allMembers,
    currentMember: state.members.currentMember,
  };
};

export default connect(mapStateToProps, null)(PersonalInfo);
