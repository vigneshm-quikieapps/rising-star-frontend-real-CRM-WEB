import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  AccordionContainer,
  CardRow,
  Description,
  HeadingText,
} from "../../components/common";
import CloseIcon from "@mui/icons-material/Close";
import {
  IconButton,
  TextField,
  Accordion,
  GradientButton,
  ImgIcon,
  Pagination as StyledPagination,
  DatePicker,
  TableMui,
} from "../../components";
import {
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import plusIcon from "../../assets/icons/icon-add.png";
import { styled } from "@mui/material/styles";
import Session from "../class-list/session";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getBusinessListOfBusiness,
  getCategoriesOfBusiness,
  getCoachesOfBusiness,
} from "../../redux/action/businesses-actions";
import { getEvaluationSchemeList } from "../../redux/action/evaluationActions";
import Charge from "../class-list/charge";
import { getTermsOfBusiness } from "../../redux/action/terms-actions";
import { ShortWeekNames } from "../../helper/constants";
import { addClass } from "../../services/businesses-service";
import { Redirect } from "react-router";

const StyledTextField = styled(TextField)(({ theme }) => ({
  // applied to label of all variants
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

// const DeleteButton = () => (
//   <IconButton sx={{ borderRadius: "50%" }}>
//     <ImgIcon alt="delete">{deleteIcon}</ImgIcon>
//   </IconButton>
// );

// const classId = {
//   "Class ID": "DL39020458",
// };

// const sessionId = {
//   "Session ID": "00394827321",
// };

const genderArray = ["MALE", "FEMALE"];
const ageArray = Array(15)
  .fill(1)
  .map((_, index) => {
    return index + 1;
  });

const AddEditClassModal = (props) => {
  const { classObj, isEditMode } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [page, setPage] = useState(1);
  const [className, setClassName] = useState("");
  const [selectedBussinessId, setSelectedBussinessId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedConsentForm, setSelectedConsentForm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEvaluationScheme, setSelectedEvaluationScheme] = useState("");
  const [aboutClass, setAboutClass] = useState("");
  const [genders, setGenders] = useState([]);
  const [ages, setAges] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [classStartDate, setClassStartDate] = useState("");
  const [classEndDate, setClassEndDate] = useState("");
  const [classCharges, setClassCharges] = useState([
    {
      name: "",
      amount: "",
      isMandatory: false,
      payFrequency: "",
    },
  ]);
  const [classSessions, setClassSessions] = useState([
    {
      name: "",
      dayIndex: -1,
      facility: "",
      fullCapacity: "",
      waitlistCapacity: "",
      coachId: "",
    },
  ]);

  const currentUserBussinesses = useSelector(
    (state) => state.businesses.businessListOfBusiness
  );
  const categories = useSelector(
    (state) => state.businesses.categoriesOfBusiness
  );
  const evaluationSchemeList = useSelector(
    (state) => state.evaluation.evaluationList
  );

  const termsOfBusiness = useSelector((state) => state.terms.termsOfBusiness);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleAddClass = () => {
    let newClassObject = {
      name: className,
      status: selectedStatus,
      registrationform: selectedConsentForm,
      businessId: selectedBussinessId,
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

      charges: classCharges.map((item) => {
        return {
          name: item.name,
          amount: item.amount,
          mandatory: item.isMandatory,
          payFrequency: item.payFrequency,
        };
      }),

      sessions: classSessions.map((item) => {
        return {
          name: item.name,
          term: {
            _id: selectedTerm,
            startDate: classStartDate,
            endDate: classEndDate,
          },
          pattern: {
            day: ShortWeekNames[item.dayIndex],
            startTime: "",
            endTime: "",
          },
          coachId: item.coachId,
          fullcapacity: item.fullCapacity,
          waitcapacity: item.waitlistCapacity,
          facility: item.facility,
        };
      }),
    };
    addClass(newClassObject);
  };

  const addChargeRow = () => {
    let newCharges = [...classCharges];
    newCharges.push({
      name: "",
      amount: "",
      isMandatory: false,
      payFrequency: "",
    });

    setClassCharges(newCharges);
  };

  const addSessionRow = () => {
    let newSessions = [...classSessions];
    newSessions.push({
      name: "",
      dayIndex: -1,
      facility: "",
      fullCapacity: "",
      waitlistCapacity: "",
      coachId: "",
    });

    setClassSessions(newSessions);
  };

  const populateClassData = () => {
    setClassName(classObj.name);
    setSelectedBussinessId(classObj.businessId);
  };
  useEffect(() => {
    console.log("isedit", isEditMode);
    if (isEditMode) {
      populateClassData();
    }

    dispatch(getEvaluationSchemeList());
    dispatch(getBusinessListOfBusiness());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [currentUserBussinesses, evaluationSchemeList]);
  return (
    <Box>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            border: "solid 1px #f2f1f6",
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
            <CrossIconButton
              onClick={() => {
                <Redirect to="/classes" />;
              }}
            />
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
                  sx={{ width: "30%" }}
                  label="Class Name*"
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value);
                  }}
                />

                <StyledTextField
                  select
                  sx={{ width: "30%" }}
                  label="Bussiness Name*"
                  value={selectedBussinessId}
                  onChange={(e) => {
                    let businessId = e.target.value;
                    setSelectedBussinessId(businessId);
                    dispatch(getCategoriesOfBusiness(businessId));
                    dispatch(getTermsOfBusiness(businessId));
                    dispatch(getCoachesOfBusiness(businessId));
                  }}
                >
                  {currentUserBussinesses.length ? (
                    currentUserBussinesses.map((item, index) => {
                      return <MenuItem value={item._id}>{item.name}</MenuItem>;
                    })
                  ) : (
                    <MenuItem value="No options">No options</MenuItem>
                  )}
                </StyledTextField>

                <StyledTextField
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
                  sx={{ width: "30%" }}
                  label="Class Category*"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                  }}
                >
                  {categories.length ? (
                    categories.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="">No categories</MenuItem>
                  )}
                </StyledTextField>

                <StyledTextField
                  select
                  sx={{ width: "30%" }}
                  label="Evaluation Scheme*"
                  value={selectedEvaluationScheme}
                  onChange={(e) => {
                    setSelectedEvaluationScheme(e.target.value);
                  }}
                >
                  {evaluationSchemeList.length ? (
                    evaluationSchemeList.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
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
                          select
                          sx={{ width: "40%" }}
                          label="Age"
                          value={ages[0]}
                          onChange={(e) => {
                            setAges([e.target.value]);
                          }}
                        >
                          {ageArray.length ? (
                            ageArray.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item}>
                                  {item}
                                </MenuItem>
                              );
                            })
                          ) : (
                            <MenuItem value="">No options</MenuItem>
                          )}
                        </StyledTextField>
                        <StyledTextField
                          select
                          multiple
                          sx={{ width: "40%" }}
                          label="Gender"
                          value={genders[0]}
                          onChange={(e) => {
                            setGenders([e.target.value]);
                          }}
                        >
                          {genderArray.length ? (
                            genderArray.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item}>
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

              <CardRow>
                <AccordionContainer>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon id="collapse-button" />}
                      aria-controls="collapse-button"
                      id="panel1a-header"
                    >
                      <CardRow
                        sx={{
                          margin: "10px 0",
                          width: "100%",
                          padding: "0 10px 0 0",
                        }}
                        onClick={() => {}}
                      >
                        <Typography>Charges</Typography>
                        <GradientButton
                          onClick={(e) => {
                            e.stopPropagation();
                            addChargeRow();
                          }}
                        >
                          <ImgIcon alt="plus">{plusIcon}</ImgIcon>Add Charge
                        </GradientButton>
                      </CardRow>
                    </AccordionSummary>
                    {classCharges.length ? (
                      <AccordionDetails
                        sx={{
                          padding: 0,
                          backgroundColor: "rgba(219, 216, 227, 0.5)",
                        }}
                      >
                        <TableMui>
                          <TableHead>
                            <TableRow>
                              <TableCell>Charge Name</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Mandatory</TableCell>
                              <TableCell>Pay Frequency</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          {classCharges.map((item, index) => {
                            return (
                              <Charge
                                data={item}
                                key={index}
                                index={index}
                                setChargeData={setClassCharges}
                                charges={classCharges}
                              />
                            );
                          })}
                        </TableMui>
                        <CardRow
                          sx={{
                            justifyContent: "center",
                          }}
                        >
                          <StyledPagination
                            sx={{
                              "& ul": {
                                justifyContent: "center",
                                margin: "15px",
                                "& .MuiButtonBase-root": {
                                  width: 30,
                                  height: 30,
                                  backgroundColor: "#fff",
                                  borderRadius: (theme) =>
                                    theme.shape.borderRadiuses.primary,
                                },
                                "& .Mui-selected": {
                                  backgroundColor: (theme) =>
                                    theme.palette.darkIndigo.main,
                                  color: "#fff",
                                },
                              },
                            }}
                            count={5}
                            page={page}
                            onChange={handleChange}
                          />
                        </CardRow>
                      </AccordionDetails>
                    ) : null}
                  </Accordion>
                </AccordionContainer>
              </CardRow>

              <CardRow>
                <AccordionContainer>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <CardRow sx={{ width: "100%", padding: "0 10px 0 0" }}>
                        <Typography>Class Schedule</Typography>
                        <GradientButton
                          onClick={(e) => {
                            e.stopPropagation();
                            addSessionRow();
                          }}
                        >
                          <ImgIcon alt="plus">{plusIcon}</ImgIcon>Add Session
                        </GradientButton>
                      </CardRow>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        padding: 0,
                        backgroundColor: "rgba(219, 216, 227, 0.5)",
                      }}
                    >
                      <Box sx={{ padding: "15px" }}>
                        {/* <CardRow>
                          <Outputs arr={objectToArray(sessionId)} />
                        </CardRow> */}
                        <CardRow
                          sx={{
                            marginTop: "1%",
                            justifyContent: "space-between",
                          }}
                        >
                          <StyledTextField
                            select
                            label="term"
                            value={selectedTerm}
                            variant={"filled"}
                            onChange={(e) => {
                              setSelectedTerm(e.target.value);
                            }}
                            sx={{ width: "55%" }}
                          >
                            {termsOfBusiness.length ? (
                              termsOfBusiness.map((item, index) => {
                                return (
                                  <MenuItem value={item._id}>
                                    {item.label}
                                  </MenuItem>
                                );
                              })
                            ) : (
                              <MenuItem value="">No terms</MenuItem>
                            )}
                          </StyledTextField>

                          <DatePicker
                            label="Start Date"
                            date={classStartDate}
                            onChange={(date) => setClassStartDate(date)}
                          />

                          <DatePicker
                            label="End Date"
                            date={classEndDate}
                            onChange={(date) => setClassEndDate(date)}
                          />
                        </CardRow>
                      </Box>
                      {classSessions.length ? (
                        <>
                          <CardRow>
                            <Description
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                margin: "17px 0px 5px 15px",
                              }}
                            >
                              Sessions
                            </Description>
                          </CardRow>
                          {classSessions.map((session, index) => {
                            return (
                              <Session
                                key={index}
                                data={session}
                                index={index}
                                sessions={classSessions}
                                setSessionData={setClassSessions}
                              />
                            );
                          })}
                        </>
                      ) : null}
                    </AccordionDetails>
                  </Accordion>
                </AccordionContainer>
              </CardRow>

              <CardRow sx={{ justifyContent: "flex-start" }}>
                <GradientButton
                  size="large"
                  sx={{ marginRight: "1%" }}
                  onClick={handleAddClass}
                >
                  Save
                </GradientButton>
                <GradientButton size="large" discard>
                  Discard
                </GradientButton>
              </CardRow>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddEditClassModal;
