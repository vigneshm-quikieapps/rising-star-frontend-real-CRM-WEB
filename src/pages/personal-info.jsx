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

const MoreIconButton = () => (
  <IconButton>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

const PersonalInfo = () => {
  const arr1 = objectToArray(personalInfoObject1);
  const arr2 = objectToArray(personalInfoObject2);
  const arr3 = objectToArray(personalInfoObject3);
  const arr4 = objectToArray(personalInfoObject4);
  return (
    <Box>
      <Card>
        <CardRow>
          <HeadingText>Ayman Mogal</HeadingText>
          <MoreIconButton />
        </CardRow>
        <SubHeadingText>Student/Member</SubHeadingText>
        <CardRow sx={{ justifyContent: "flex-start" }}>
          <Outputs arr={arr1} />
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
              <Outputs arr={arr3} />
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
              <Outputs arr={arr4} />
            </CardRow>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
    </Box>
  );
};

export default PersonalInfo;
