import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Box,
  Typography,
  Modal,
} from "@mui/material";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import {
  AccordionContainer,
  CardRow,
  Description,
  HeadingText,
  IconButton,
  TextField,
  Accordion,
  GradientButton,
  menuSX,
  Loader,
  Warning,
} from "../../../components";
import Charges from "./charges";
import Sessions from "./sessions";
import { getEvaluationSchemeList } from "../../../redux/action/evaluationActions";
import { getTermsOfBusiness } from "../../../redux/action/terms-actions";
import {
  getCategoriesOfBusiness,
  getCoachesOfBusiness,
} from "../../../redux/action/businesses-actions";
import {
  addClass,
  editClass,
  getSessionsOfClass,
} from "../../../redux/action/class-actions";
import { ShortWeekNames } from "../../../helper/constants";
import { useDefaultDate } from "../../../hooks";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
    backgroundColor: "#f4f4f4",
    "&::after ,::before": { display: "none" },
    "& .MuiFilledInput-input": {
      "&:focus": { backgroundColor: "transparent" },
    },
  },
}));

const CrossIconButton = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <CloseIcon />
  </IconButton>
);

const genderArray = ["MALE", "FEMALE"];
const ageArray = Array(15)
  .fill(1)
  .map((_, index) => index + 1);

const AddEditClassModal = ({ classObj, isEditMode }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultDate = useDefaultDate();
  const [update, setUpdate] = useState(false);
  const [isWarnOpen, setIsWarnOpen] = useState(false);
  const [className, setClassName] = useState("");
  const [selectedBusinessId, setSelectedBusinessId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedConsentForm, setSelectedConsentForm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEvaluationScheme, setSelectedEvaluationScheme] = useState("");
  const [aboutClass, setAboutClass] = useState("");
  const [genders, setGenders] = useState([]);
  const [ages, setAges] = useState([1]);
  const [classCharges, setClassCharges] = useState([
    {
      name: "",
      amount: "",
      isMandatory: false,
      payFrequency: "",
    },
  ]);

  const currentUserBusinesses = useSelector(
    (state) => state.businesses.businessList
  );
  const categories = useSelector(
    (state) => state.businesses.categoriesOfBusiness
  );
  const evaluationSchemeList = useSelector(
    (state) => state.evaluation.evaluationList
  );
  const isLoading = useSelector((state) => state.shared.loading);
  const sessionsOfClass = useSelector((state) => state.classes.classSessions);

  const isSaving = useRef(false);
  const areSessionsTouched = useRef([]);
  const classSessionsRef = useRef([
    {
      id: "",
      name: "",
      dayIndex: [],
      facility: "",
      fullCapacity: "",
      waitlistCapacity: "",
      coachId: "",
      selectedTerm: { _id: "" },
      startDate: defaultDate,
      endDate: defaultDate,
      startTime: defaultDate,
      endTime: defaultDate,
    },
  ]);

  const setClassSessions = (data) => {
    classSessionsRef.current = data;
    setUpdate((prev) => !prev);
  };

  const handleAgeSelect = (e) => {
    const value = e.target.value;
    setAges(typeof value === "string" ? value.split(",") : value);
  };

  const handleGenderSelect = (e) => {
    const value = e.target.value;
    setGenders(typeof value === "string" ? value.split(",") : value);
  };

  const redirectToClassList = () => history.push("/classes");

  const handleAddClass = (isEdit) => {
    isSaving.current = true;
    let newClassObject = {
      name: className,
      status: selectedStatus,
      registrationform: selectedConsentForm,
      businessId: selectedBusinessId,
      evaluationSchemeId: selectedEvaluationScheme,
      categoryId: selectedCategory,
      about: aboutClass,
      enrolmentControls: [
        {
          type: "SELECT",
          values: ages,
          name: "AGE",
        },
        {
          type: "SELECT",
          values: genders,
          name: "GENDER",
        },
      ],
      charges: classCharges.map(
        ({ name, amount, isMandatory, payFrequency }) => {
          return {
            name,
            amount,
            mandatory: isMandatory,
            payFrequency,
          };
        }
      ),
      sessions: classSessionsRef.current.map((item) => {
        const {
          name,
          coachId,
          fullCapacity,
          waitlistCapacity,
          facility,
          dayIndex,
          startTime,
          endTime,
          startDate,
          endDate,
          selectedTerm,
        } = item;
        return {
          name,
          term: {
            _id: selectedTerm._id,
            label: selectedTerm.label,
            startDate: selectedTerm?.startDate?.split("T")[0],
            endDate: selectedTerm?.endDate?.split("T")[0],
          },
          startDate,
          endDate,
          startTime,
          endTime,
          pattern: dayIndex.map((day) => ShortWeekNames[day]),
          coachId,
          fullcapacity: fullCapacity,
          waitcapacity: waitlistCapacity,
          facility,
        };
      }),
    };

    if (!isEdit) {
      dispatch(
        addClass({ data: newClassObject, callback: redirectToClassList })
      );
    } else {
      if (areSessionsTouched.current.includes(true)) {
        return setIsWarnOpen(true);
      }
      dispatch(
        editClass({
          data: newClassObject,
          id: classObj._id,
          callback: redirectToClassList,
        })
      );
    }
  };

  const initialSessions = useMemo(() => {
    return sessionsOfClass?.map(
      ({
        _id,
        name,
        facility,
        fullcapacity,
        waitcapacity,
        coachId,
        pattern,
        termData: term,
        startDate,
        endDate,
      }) => ({
        id: _id,
        name,
        dayIndex: pattern.map((item) => {
          return ShortWeekNames.indexOf(item.day.toLowerCase());
        }),
        facility: facility,
        fullCapacity: fullcapacity,
        waitlistCapacity: waitcapacity,
        coachId: coachId,
        startDate,
        endDate,
        selectedTerm: term,
        startTime: pattern[0].startTime,
        endTime: pattern[0].endTime,
      })
    );
  }, [sessionsOfClass]);

  const populateClassData = useCallback(() => {
    const {
      name,
      businessId,
      status,
      registrationform,
      categoryId,
      evaluationSchemeId,
      about,
      charges,
      enrolmentControls,
    } = classObj;
    let existingCharges = charges?.map(
      ({ name, amount, mandatory, payFrequency }) => ({
        name,
        amount,
        isMandatory: mandatory,
        payFrequency,
      })
    );
    setClassName(name);
    setSelectedBusinessId(businessId);
    setSelectedStatus(status);
    setSelectedConsentForm(registrationform);
    setSelectedCategory(categoryId);
    setSelectedEvaluationScheme(evaluationSchemeId);
    setAboutClass(about);
    setClassCharges(existingCharges);
    setAges(enrolmentControls[0].values);
    setGenders(enrolmentControls[1].values);
    setClassSessions(initialSessions);
  }, [classObj, initialSessions]);

  const handleYes = () => {
    setIsWarnOpen(false);
    if (isSaving.current) {
      areSessionsTouched.current = [];
      return handleAddClass(true);
    }
    history.push("/classes");
  };

  const handleNo = () => {
    isSaving.current = false;
    setIsWarnOpen(false);
  };
  const handleWarn = () => {
    isSaving.current = false;
    setIsWarnOpen(true);
  };

  useEffect(() => {
    if (isEditMode && classObj._id) {
      dispatch(getSessionsOfClass(classObj._id));
    }
  }, [classObj, isEditMode, dispatch]);

  useEffect(() => {
    if (isEditMode) {
      classObj._id && populateClassData();
    }
  }, [dispatch, isEditMode, classObj, populateClassData, sessionsOfClass]);

  useEffect(() => {
    dispatch(getEvaluationSchemeList());
  }, [dispatch]);

  useEffect(() => {
    if (selectedBusinessId) {
      dispatch(getCategoriesOfBusiness(selectedBusinessId));
      dispatch(getTermsOfBusiness(selectedBusinessId));
      dispatch(getCoachesOfBusiness(selectedBusinessId));
    }
  }, [selectedBusinessId, dispatch]);
  
  return (
    <Box>
      <Modal
        open={true}
        onClose={handleWarn}
        sx={{ overflow: "hidden" }}
        BackdropProps={{
          onClick: () => {},
          style: { backgroundColor: "#000000d5" },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            width: "80%",
            height: "90%",
            margin: "2.5% 10%",
            borderRadius: "20px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: (theme) => theme.palette.highlight,
            backgroundColor: "#fff",
            "&:focus-visible": {
              outline: "none",
            },
          }}
        >
          <CardRow
            sx={{
              width: "100%",
              backgroundColor: "#fff",
              marginTop: 0,
              padding: "5px 10px",
              boxShadow: "0 3px 6px #8888",
            }}
          >
            <HeadingText id="modal-modal-title" variant="h6" component="h2">
              Class Definition and Schedule
            </HeadingText>
            <CrossIconButton onClick={handleWarn} />
          </CardRow>
          <Box
            sx={{
              overflow: "scroll",
              width: "100%",
              height: "100%",
              padding: "0 0 5%",
            }}
          >
            <Box
              sx={{
                padding: "5px 15px",
              }}
            >
              <CardRow>
                <Description
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    margin: "17px 0px 30px 0px",
                  }}
                >
                  Basic Information
                </Description>
              </CardRow>
              <CardRow sx={{ marginBottom: "20px" }}>
                <StyledTextField
                  variant="filled"
                  sx={{ width: "30%" }}
                  label="Class Name*"
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                  }}
                />

                <StyledTextField
                  variant="filled"
                  select
                  sx={{ width: "30%" }}
                  label="Business Name*"
                  value={currentUserBusinesses.length ? selectedBusinessId : ""}
                  onChange={(e) => {
                    let businessId = e.target.value;
                    setSelectedBusinessId(businessId);
                  }}
                >
                  {currentUserBusinesses.length ? (
                    currentUserBusinesses.map(({ _id, name }) => {
                      return (
                        <MenuItem value={_id} key={_id}>
                          {name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="">No options</MenuItem>
                  )}
                </StyledTextField>

                <StyledTextField
                  variant="filled"
                  select
                  sx={{ width: "30%" }}
                  label="Class Status"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                  }}
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                </StyledTextField>
              </CardRow>

              <CardRow sx={{ marginBottom: "20px" }}>
                <StyledTextField
                  variant="filled"
                  select
                  sx={{ width: "30%" }}
                  label="Registration Consent Form"
                  value={selectedConsentForm}
                  onChange={(e) => {
                    setSelectedConsentForm(e.target.value);
                  }}
                >
                  <MenuItem value="STANDARD">STANDARD</MenuItem>
                </StyledTextField>

                <StyledTextField
                  select
                  variant="filled"
                  sx={{ width: "30%" }}
                  label="Class Category*"
                  value={categories.length ? selectedCategory : ""}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                >
                  {categories.length ? (
                    categories.map(({ _id, name }) => {
                      return (
                        <MenuItem key={_id} value={_id}>
                          {name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="">No categories</MenuItem>
                  )}
                </StyledTextField>

                <StyledTextField
                  select
                  variant="filled"
                  sx={{ width: "30%" }}
                  label="Evaluation Scheme*"
                  value={
                    evaluationSchemeList.length ? selectedEvaluationScheme : ""
                  }
                  onChange={(e) => {
                    setSelectedEvaluationScheme(e.target.value);
                  }}
                >
                  {evaluationSchemeList.length ? (
                    evaluationSchemeList.map(({ _id, name }) => {
                      return (
                        <MenuItem key={_id} value={_id}>
                          {name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="">No evaluations</MenuItem>
                  )}
                </StyledTextField>
              </CardRow>

              <CardRow>
                <StyledTextField
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: "auto",
                    },
                  }}
                  variant="filled"
                  multiline
                  rows={4}
                  placeholder={"About this class"}
                  value={aboutClass}
                  onChange={(e) => {
                    setAboutClass(e.target.value);
                  }}
                ></StyledTextField>
              </CardRow>

              <CardRow>
                <AccordionContainer>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Enrolment Controls</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <CardRow sx={{ marginTop: "10px" }}>
                        <StyledTextField
                          variant="filled"
                          select
                          SelectProps={{
                            multiple: true,
                            MenuProps: {
                              sx: menuSX,
                            },
                          }}
                          sx={{ width: "40%" }}
                          label="Age"
                          value={ages}
                          onChange={handleAgeSelect}
                        >
                          {ageArray.length ? (
                            ageArray.map((item) => {
                              return (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem value="">No options</MenuItem>
                          )}
                        </StyledTextField>
                        <StyledTextField
                          variant="filled"
                          select
                          SelectProps={{
                            multiple: true,
                            MenuProps: {
                              sx: menuSX,
                            },
                          }}
                          sx={{ width: "40%" }}
                          label="Gender"
                          value={genders}
                          onChange={handleGenderSelect}
                        >
                          {genderArray.length ? (
                            genderArray.map((item) => {
                              return (
                                <MenuItem key={item} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem value="">No options</MenuItem>
                          )}
                        </StyledTextField>
                      </CardRow>
                    </AccordionDetails>
                  </Accordion>
                </AccordionContainer>
              </CardRow>

              <Charges
                classCharges={classCharges}
                setClassCharges={setClassCharges}
              />

              <Sessions
                touched={areSessionsTouched}
                classId={classObj?._id}
                isEdit={isEditMode}
                setClassSessions={setClassSessions}
                classSessionsRef={classSessionsRef.current}
                initialSessions={initialSessions}
              />

              <CardRow sx={{ justifyContent: "flex-start" }}>
                <GradientButton
                  size="large"
                  sx={{ marginRight: "1%" }}
                  onClick={() => {
                    handleAddClass(isEditMode);
                  }}
                >
                  {isEditMode ? "Edit" : "Save"}
                </GradientButton>
                <GradientButton size="large" invert onClick={handleWarn}>
                  Discard
                </GradientButton>
              </CardRow>

              <Warning
                open={isWarnOpen}
                title="Warning"
                description={
                  !isEditMode
                    ? "Are you sure, you want to close? Data will be lost!"
                    : isSaving.current
                    ? areSessionsTouched.current.includes(true) &&
                      "Are you sure, you want to save? There are unsaved data/sessions!"
                    : "Are you sure, you want to close? Data will be lost!"
                }
                onNo={handleNo}
                onYes={handleYes}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
      {isLoading ? <Loader /> : null}
    </Box>
  );
};

export default AddEditClassModal;
