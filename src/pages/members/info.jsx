import { useParams } from "react-router";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  AccordionContainer,
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../../components/common";
import { Typography, Box } from "@mui/material";
import moreIcon from "../../assets/icons/icon-more.png";
import IconButton from "../../components/icon-button";
import ImgIcon from "../../components/img-icon";
import { objectToArray } from "../../utils";
import { Outputs } from "../../containers/outputs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMembersList,
  getMemberById,
} from "../../redux/action/memberAction";
import Accordion from "../../components/accordion";

const MoreIconButton = () => (
  <IconButton>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

const MemberInfo = () => {
  const { id } = useParams();
  const [currentMemberId, setCurrentMemberId] = useState();
  const [basicInfoArr, setBasicInfoArr] = useState([]);
  const [parentInfoArr, setParentInfoArr] = useState([]);
  const [primaryContactInfoArr, setPrimaryContactInfoArr] = useState([]);
  const [secondaryContactInfoArr, setSecondaryContactInfoArr] = useState([]);

  const dispatch = useDispatch();
  const allMembers = useSelector((state) => state.members.memberList);
  const currentMember = useSelector(
    (state) => state.members.currentMember && state.members.currentMember.member
  );

  const getMemberInfo = () => {
    const { name, gender, dob, contacts, userId } = currentMember;
    const { email, name: pName, mobileNo } = userId;

    // setting basic info object
    let date = new Date(dob.split("T")[0]);
    let info = {
      "Full Name": name,
      "Gender*": gender,
      "Date of Birth*": date.toDateString(),
    };
    setBasicInfoArr(objectToArray(info));

    // setting parent info
    let parentInfo = {
      "Full Name*": pName,
      Email: email,
      "Contact Number": mobileNo,
    };
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
  }, [id, currentMemberId, dispatch]);

  useEffect(() => {
    let tempId = allMembers.docs && allMembers.docs[0]._id;
    setCurrentMemberId(tempId);
    tempId && dispatch(getMemberById(tempId));
  }, [allMembers, dispatch]);

  useEffect(() => {
    currentMember && getMemberInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Accordion defaultExpanded>
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
        <Accordion defaultExpanded>
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
        <Accordion defaultExpanded>
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

export default MemberInfo;
