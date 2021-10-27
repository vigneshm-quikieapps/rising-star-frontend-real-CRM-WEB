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

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getMemberProgressRecord,
  getMemberById,
} from "../../redux/action/memberAction";
import { getBusinessList } from "../../redux/action/businesses-actions";
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

const checkStatusConverter = (data) => {
  if (data === "NOT_STARTED") {
    return false;
  } else if (data === "AWARDED") {
    return true;
  } else if (data === "IN_PROGRESS") {
    return true;
  }
};

const LevelsComponent = ({ skillData, skillIndex }) => {
  const [checkbox, setCheckboxes] = useState({
    attainedCheckBox: false,
    inprogressCheckbox: false,
  });

  useEffect(() => {
    setCheckboxes((previous) => ({
      ...previous,
      attainedCheckBox: checkStatusConverter(skillData.status),
      inprogressCheckbox: skillData.s,
    }));
  }, []);

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
      <Textfield value={skillData.name} sx={{ width: "80%" }} />
      <Box>
        <Checkbox
          sx={{
            margin: "0 1.3rem",
          }}
          checked={checkbox}
          // onChange={() => levelsOnChange(li._id, "attained")}
        />
        <Checkbox
          sx={{
            margin: "0 1.3rem",
          }}
          checked={checkbox}
          // onChange={() => levelsOnChange(li._id, "inprogress")}
        />
      </Box>
    </Box>
  );
};

const MemberEvaluations = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const progressRecord = useSelector((state) => state.members.progressRecord);
  const businessList = useSelector((state) => state.businesses.businessList);
  const currentMember = useSelector((state) => state.members.currentMember);
  const evalautionSchemeList = useSelector(
    (state) => state.evaluation.evaluationList
  );
  const [businessId, setBusinessId] = useState("");
  const [evaluationSchemeId, setEvaluationSchemeId] = useState("");
  const [levels, setLevels] = useState([]);
  const [updateLevels, setUpdateLevels] = useState({
    progressId: "",
    levels: [],
  });
  const [checkbox, setCheckbox] = useState();

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
    dispatch(getBusinessList());
    dispatch(getEvaluationSchemeList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMemberById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setBusinessId(businessList[0]?._id);
    setEvaluationSchemeId(evalautionSchemeList[0]?._id);
    setLevels(progressRecord.levels);
    // checkboxStatePopulate(progressRecord.levels);
    setUpdateLevels((previous) => ({
      ...previous,
      progressId: `${progressRecord._id}`,
      // levels: [

      // ]
    }));
  }, [businessList, evalautionSchemeList, progressRecord]);

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

  // console.log(levels);
  // console.log(businessId);

  const businessChangeHandler = (e) => {
    setBusinessId(e.target.value);
  };

  // const levelsOnChange = (id, progressName, checked) => {
  //   // console.log(id, progressName);
  //   setCheckbox(!checkbox);
  //   console.log(id, progressName, !checkbox);
  //   const perviousId = id;
  //   // const existId = updateLevels.levels.some(li => li._id === id)

  //   if (id === perviousId) {
  //     updateLevels.levels.find(li => li._id === id).status = !checkbox;
  //   }else{
  //     setUpdateLevels((previous) => ({
  //       ...previous,
  //       levels: [
  //         ...levels,
  //         {
  //           _id: id,
  //           // status: "",
  //         },
  //       ],
  //     }));
  //   }
  // };

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
              value={businessId}
              sx={{ width: "100%" }}
              onChange={businessChangeHandler}
            >
              {businessList.map((li, index) => (
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
            >
              {evalautionSchemeList.map((li, index) => (
                <MenuItem key={`EVA${index}`} value={`${li._id}`}>
                  {li._id}
                </MenuItem>
              ))}
            </Textfield>
          </Grid>
        </Grid>
      </StyleBox>
      {levels &&
        levels.map((data, index) => (
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
              {data.skills.map((skillData, skillIndex) => (
                <LevelsComponent
                  skillData={skillData}
                  skillIndex={skillIndex}
                />
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
