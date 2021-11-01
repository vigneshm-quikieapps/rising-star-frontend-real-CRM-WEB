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
import React, { useState, useCallback } from "react";
import Output from "../../components/output";
import Textfield from "../../components/textfield";
import Accordion from "../../components/accordion";
import Checkbox from "../../components/styled-checkbox";
import Button from "../../components/gradient-button";
import Status from "../../components/status";
import TopNav from "./components/top-nav";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getMemberProgressRecord,
  getMemberById,
  updateMultipleStatusOnMemberProgressRecord,
} from "../../redux/action/memberAction";
import { getEvaluationSchemeList } from "../../redux/action/evaluationActions";

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

const convertStatusToArray = (statusObject) => {
  const statusArray = Object.keys(statusObject).map((id) => ({
    // _id: id,
    // status: statusObject[id],
    skillId: id,
    levelId: statusObject[id].levelId,
    status: statusObject[id].status,
  }));
  return statusArray;
};

const SkillsComponent = ({
  skillId,
  levelId,
  name,
  status,
  skillIndex,
  setNewSkills,
}) => {
  const [checkbox, setCheckboxes] = useState({
    attainedCheckBox: false,
    inprogressCheckbox: false,
    checkboxId: "",
  });

  useEffect(() => {
    setNewSkills((previous) => ({
      ...previous,
      // [skillId]: statusConverter(
      //   checkbox.attainedCheckBox,
      //   checkbox.inprogressCheckbox
      // ),
      [skillId]: {
        levelId: levelId,
        status: statusConverter(
          checkbox.attainedCheckBox,
          checkbox.inprogressCheckbox
        ),
      },
    }));
  }, [checkbox, setNewSkills, skillId, levelId]);

  const checkStatusConverter = useCallback((data) => {
    if (data === "NOT_STARTED") {
      return {
        attained: false,
        progress: false,
      };
    } else if (data === "AWARDED") {
      return {
        attained: true,
        progress: false,
      };
    } else if (data === "IN_PROGRESS") {
      return {
        attained: false,
        progress: true,
      };
    }
  }, []);

  const statusConverter = (attained, progress) => {
    if (attained && !progress) return "AWARDED";
    if (!attained && progress) return "IN_PROGRESS";
    if (!attained && !progress) return "NOT_STARTED";
  };

  useEffect(() => {
    const { attained, progress } = checkStatusConverter(status);
    setCheckboxes((previous) => ({
      ...previous,
      attainedCheckBox: attained,
      inprogressCheckbox: progress,
      checkboxId: skillId,
    }));
  }, [checkStatusConverter, status, skillId]);

  const checkboxHandler = (name, skillId, e) => {
    console.log(e.target.checked);
    if (name === "attained") {
      setCheckboxes({
        ...checkbox,
        attainedCheckBox: e.target.checked, //true
        inprogressCheckbox: false,
      });
    } else {
      setCheckboxes({
        ...checkbox,
        attainedCheckBox: false, //false
        inprogressCheckbox: e.target.checked, //true
      });
    }
  };

  // console.log(checkbox);
  return (
    <Box
      key={skillIndex}
      sx={{
        padding: " 5px 17px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Textfield value={name} sx={{ width: "80%" }} />
      <Box>
        <Checkbox
          sx={{
            margin: "0 1.3rem",
          }}
          checked={checkbox.attainedCheckBox}
          onChange={(e) => checkboxHandler("attained", skillId, e)}
        />
        <Checkbox
          sx={{
            margin: "0 1.3rem",
          }}
          checked={checkbox.inprogressCheckbox}
          onChange={(e) => checkboxHandler("progress", skillId, e)}
        />
      </Box>
    </Box>
  );
};

const MemberEvaluations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const progressRecord = useSelector((state) => state.members.progressRecord);
  const currentMember = useSelector((state) => state.members.currentMember);
  const evalautionSchemeList = useSelector(
    (state) => state.evaluation.evaluationList
  );
  const businessListofLoggedInUser = useSelector(
    (state) => state.businesses.businessList
  );
  const [businessId, setBusinessId] = useState("");
  const [evaluationSchemeId, setEvaluationSchemeId] = useState("");
  const [levels, setLevels] = useState([]);
  const [newSkills, setNewSkills] = useState({});
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    // console.log(newExpanded);
    setExpanded(newExpanded ? panel : true);
  };

  const params = useCallback(
    (id, currentMember, businessList, evalautionSchemeList) => {
      return new Promise((resolve, reject) => {
        const data = {
          memberId: id,
          clubMembershipId:
            currentMember?.member.membership[0].clubMembershipId,
          businessId: businessList,
          evaluationSchemeId: evalautionSchemeList,
        };
        resolve(data);
      });
    },
    []
  );

  useEffect(() => {
    dispatch(getEvaluationSchemeList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMemberById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setBusinessId(businessListofLoggedInUser[0]?._id);
    setEvaluationSchemeId(evalautionSchemeList[0]?._id);
    setLevels(progressRecord.levels);
  }, [businessListofLoggedInUser, evalautionSchemeList, progressRecord]);

  useEffect(() => {
    params(id, currentMember, businessId, evaluationSchemeId).then((res) => {
      if (
        res.memberId &&
        res.clubMembershipId &&
        res.businessId &&
        res.evaluationSchemeId
      ) {
        dispatch(getMemberProgressRecord(res));
      }
    });
  }, [currentMember, dispatch, businessId, evaluationSchemeId, id, params]);

  const businessChangeHandler = (e) => {
    setBusinessId(e.target.value);
  };

  const evaluationChangeHandler = (e) => {
    setBusinessId(e.target.value);
  };

  const saveHandler = () => {
    const data = {
      progressId: progressRecord._id,
      skills: convertStatusToArray(newSkills),
    };

    console.log(data);
    dispatch(updateMultipleStatusOnMemberProgressRecord(data));
  };

  const levelStatusIndicator = (status) => {
    if (status === "AWARDED") {
      return {
        color: "green",
        status: "Awarded",
      };
    } else if (status === "IN_PROGRESS") {
      return {
        color: "yellow",
        status: "In Progress",
      };
    } else if (status === "NOT_STARTED") {
      return {
        color: "red",
        status: "Not Started",
      };
    }
  };

  return (
    <Box sx={{ width: "100%", paddingBottom: "20px" }}>
      <TopNav />
      <StyleBox>
        <Typography variant="h4" component="div">
          {currentMember ? currentMember.member.name : "- - -"}
        </Typography>
        <Typography variant="subtitle2" component="div">
          Student/Member
        </Typography>
        <Grid container>
          <Grid item xs={3}>
            <Output
              title="Full Name"
              description={currentMember ? currentMember.member.name : "- - -"}
            />
          </Grid>
          {/* <Grid item xs={3}>
            <Output title="Member ID" description="000000" />
          </Grid> */}
          <Grid item xs={3}>
            <Output
              title="Club Membership Number"
              description={
                currentMember
                  ? currentMember.member.membership[0].clubMembershipId
                  : "- - -"
              }
            />
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: "10px" }} spacing={2}>
          <Grid item xs={6}>
            <Textfield
              select
              variant="outlined"
              label="Business Name*"
              value={businessId}
              sx={{ width: "100%" }}
              onChange={businessChangeHandler}
            >
              {businessListofLoggedInUser.map((li, index) => (
                <MenuItem key={`B${index}`} value={`${li._id}`}>
                  {li.name}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>
          <Grid item xs={6}>
            <Textfield
              select
              variant="outlined"
              label="Evaluation Scheme"
              sx={{ width: "100%" }}
              value={evaluationSchemeId}
              onChange={evaluationChangeHandler}
            >
              {evalautionSchemeList.map((li, index) => (
                <MenuItem key={`EVA${index}`} value={`${li._id}`}>
                  {li.name}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>
        </Grid>
      </StyleBox>
      {levels &&
        levels.map((data, index) => {
          const status = levelStatusIndicator(data.status);
          return (
            <Accordion
              key={`LS${index}`}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
              sx={{ marginBottom: "16px" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Level {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, paddingBottom: "10px" }}>
                <Box sx={{ padding: " 5px 17px" }}>
                  <Output title="Status" />
                  <Status status={status.color} title={status.status} />
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
                {data.skills.map((skillData, skillIndex) => (
                  <SkillsComponent
                    key={`SR${skillIndex}`}
                    skillId={skillData._id}
                    levelId={data._id}
                    name={skillData.name}
                    status={skillData.status}
                    skillIndex={skillIndex}
                    setNewSkills={setNewSkills}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "20px 10px",
          paddingLeft: 0,
        }}
      >
        <Button sx={{ textTransform: "none" }} onClick={saveHandler}>
          Save
        </Button>
        <Button discard sx={{ marginLeft: "10px", textTransform: "none" }}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default MemberEvaluations;
