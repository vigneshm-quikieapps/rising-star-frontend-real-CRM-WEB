import { useParams } from "react-router";
import {
  MenuItem,
  styled,
  Box,
  Grid,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import Output from "../../components/output";
import Textfield from "../../components/textfield";
import Accordion from "../../components/accordion";
import Checkbox from "../../components/styled-checkbox";
import Button from "../../components/gradient-button";
import Status from "../../components/status";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMemberProgressRecord } from "../../redux/action/memberAction";

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
    fontWeight: 900,
    color: theme.palette.text.primary,
    opacity: 0.5,
    marginBottom: "1em",
    fontSize: "1rem",
  },
}));

const dummyJsonEvaluationData = [
  {
    skills: [
      {
        skillName: "Gymnastic",
      },
      {
        skillName: "swimming",
      },
    ],
  },
  {
    skills: [
      {
        skillName: "Gymnastic",
      },
      {
        skillName: "swimming",
      },
    ],
  },
  {
    skills: [
      {
        skillName: "Gymnastic",
      },
      {
        skillName: "swimming",
      },
    ],
  },
];

const MemberEvaluations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const progressRecord = useSelector((state) => state.members.progressRecord);

  // useEffect(() => {
  //   dispatch(getMemberProgressRecord());
  // }, []);
  return (
    <Box sx={{ width: "100%", paddingBottom: "20px" }}>
      <StyleBox>
        <Typography variant="h4" component="div">
          Ayman Mogal
        </Typography>
        <Typography variant="subtitle2" component="div">
          Student/Member
        </Typography>
        <Grid container>
          <Grid item xs={3}>
            <Output title="Full Name" description="Ayan Mogal" />
          </Grid>
          <Grid item xs={3}>
            <Output title="Member ID" description="000000" />
          </Grid>
          <Grid item xs={3}>
            <Output title="Club Membership Number" description="ZPGL0008" />
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "10px" }} spacing={2}>
          <Grid item xs={6}>
            <Textfield
              select
              variant="outlined"
              label="Business Name*"
              sx={{ width: "100%" }}
            >
              <MenuItem>1</MenuItem>
              <MenuItem>1</MenuItem>
            </Textfield>
          </Grid>
          <Grid item xs={6}>
            <Textfield
              select
              variant="outlined"
              label="Evaluation Scheme"
              sx={{ width: "100%" }}
            ></Textfield>
          </Grid>
        </Grid>
      </StyleBox>
      {dummyJsonEvaluationData.map((data, index) => (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Level {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0, paddingBottom: "10px" }}>
            <Box sx={{ padding: " 5px 17px" }}>
              <Output title="Status" />
              <Status status="green" title="Awarded" />
            </Box>
            <Box
              sx={{
                padding: " 10px 17px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `1px solid #e9e7f1`,
                borderBottom: `1px solid #e9e7f1`,
              }}
            >
              <Typography variant="subtitle2" component="div">
                Skills
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="subtitle2" component="div">
                  Attained
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="div"
                  sx={{ marginLeft: "10px" }}
                >
                  In Progress
                </Typography>
              </Box>
            </Box>
            {data.skills.map((li, liindex) => (
              <Box
                key={liindex}
                sx={{
                  padding: " 5px 17px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Textfield value={li.skillName} sx={{ width: "80%" }} />
                <Box>
                  <Checkbox
                    sx={{
                      margin: "0 1.3rem",
                    }}
                  />
                  <Checkbox
                    sx={{
                      margin: "0 1.3rem",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "20px 10px",
          paddingLeft: 0,
        }}
      >
        <Button sx={{ textTransform: "none" }}>Save</Button>
        <Button discard sx={{ marginLeft: "10px", textTransform: "none" }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default MemberEvaluations;
