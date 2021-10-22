import React, { useState, useEffect } from "react";
import { Button, Card, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/material";
import GradientButton from "../../components/gradient-button";
import StyledPagination from "../../components/pagination";
import ImgIcon from "../../components/img-icon";
import IconButton from "../../components/icon-button";
import deleteIcon from "../../assets/icons/icon-delete.png";
import editIcon from "../../assets/icons/icon-edit.png";
import DatePicker from "../../components/date-picker";
import TextField from "../../components/textfield";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import addIcon from "../../assets/icons/icon-add.png";
import { useSelector, useDispatch } from "react-redux";
import { GetClassList } from "../../redux/action/classAction";
import {
  CreateTerm,
  EditTerm,
  GetTerm,
  RemoveTerm,
  UpdateTerm,
} from "../../redux/action/termAction";
import moment from "moment";

const Term = () => {
  const dispatch = useDispatch();
  const classlist = useSelector((state) => state.classes.classList);
  const Termlist = useSelector((state) => state.Term.getTerm);
  const EditTermlist = useSelector((state) => state.Term.editTermItem);
  const [page, setPage] = useState(3);
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));
  const [editable, setEditable] = useState(-1);
  const [newTermList, setNewTermList] = useState([]);
  const [label, setLabel] = useState("");
  const [startDate, setStartDate] = useState(new Date("2014-08-18T21:11:54"));
  const [endDate, setEndDate] = useState(new Date("2014-08-18T21:11:54"));
  const [dummy,setDummy] = useState(0);
  const Edit = (index) => {
    setEditable(index);
  };
  const save = (index) => {
    setEditable(-1);
    dispatch(UpdateTerm(Termlist[index]._id, EditTermlist));
  };
  const inc =()=>{
    setDummy(dummy+1);
  }
  useEffect(() => {
    dispatch(GetClassList());
   
  }, []);

  
  return (
    <Box>
      <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
        Terms
      </Typography>
      <Typography sx={{ fontSize: "12px", opacity: 0.5 }}>
        Manage all terms here
      </Typography>

      <Box sx={{ marginTop: "20px" }}>
        <TextField
          label="Business Name*"
          variant="filled"
          value={10}
          select
          sx={{ width: "410px" }}
        >
          {classlist.map(function (item, index) {
            return (
              <MenuItem
                onClick={() => dispatch(GetTerm(item.businessId))}
                value={10}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
      <Card sx={{ marginTop: "20px", width: "100%" }}>
        <Box
          sx={{
            marginTop: "10px",
            paddingLeft: "20px",
            paddingBottom: "10px",
            paddingRight: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Billing
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Button
              onClick={() => {
                newTermList.push("cccc");
              }}
            >
              <GradientButton sx={{ width: "52px" }}>
                <ImgIcon alt="more">{addIcon}</ImgIcon>
              </GradientButton>
            </Button>
            <Box sx={{ marginLeft: "10px" }}>
              <IconButton sx={{ width: "52px" }}>
                <KeyboardArrowUpIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            paddingTop: "15px",
            paddingBottom: "15px",
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          {Termlist.hasOwnProperty("termCode") && (
            <Box>
              <Typography
                sx={{ width: "109px", fontSize: 14, fontWeight: "bold" }}
              >
                Term Code
              </Typography>
            </Box>
          )}
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "233px", fontSize: 14, fontWeight: "bold" }}
            >
              Term Label
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "138px", fontSize: 14, fontWeight: "bold" }}
            >
              Start Date
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography
              sx={{ width: "138px", fontSize: 14, fontWeight: "bold" }}
            >
              End Date
            </Typography>
          </Box>
          {Termlist.hasOwnProperty("sessionSequence") && (
            <Box sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ width: "127px", fontSize: 14, fontWeight: "bold" }}
              >
                Session Sequence
              </Typography>
            </Box>
          )}
          <Box sx={{ marginLeft: "10px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
              Action
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "10px" }}>
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
              Edit
            </Typography>
          </Box>
        </Box>

        {Termlist !==""
          ? Termlist.map(function (item, index) {
              return (
                <Box
                  sx={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    display: "flex",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    alignItems: "center",
                  }}
                >
                  {item.hasOwnProperty("termCode") && (
                    <Box>
                      <TextField
                        variant="filled"
                        inputProps={{
                          readOnly: index === editable ? false : true,
                        }}
                        sx={{ width: "109px" }}
                        value={"2230"}
                      />
                    </Box>
                  )}
                  <Box sx={{ marginLeft: "10px" }}>
                    <TextField
                      variant="filled"
                      inputProps={{
                        readOnly: index == editable ? false : true,
                      }}
                      sx={{ width: "233px" }}
                      defaultValue={item.label}
                      onChange={(text) => {
                        dispatch(
                          EditTerm(text.target.value, index, Termlist, "label")
                        );
                      }}
                    />
                  </Box>
                  <Box sx={{ marginLeft: "10px" }}>
                    <DatePicker
                      inputProps={{
                        readOnly: index == editable ? false : true,
                      }}
                      label={null}
                      date={item.startDate}
                      defaultValue={item.startDate}
                      onChange={(newDate) => {
                        let dateFormat = moment(newDate).utc().format();
                        dispatch(
                          EditTerm(dateFormat, index, Termlist, "startDate")
                        );
                      }}
                      sx={{ width: "138px" }}
                    />
                  </Box>
                  <Box sx={{ marginLeft: "10px" }}>
                    <DatePicker
                      label={null}
                      date={item.endDate}
                      defaultValue={item.endDate}
                      onChange={(newDate) => {
                        let dateFormat = moment(newDate).utc().format();
                        dispatch(
                          EditTerm(dateFormat, index, Termlist, "endDate")
                        );
                      }}
                      sx={{ width: "138px" }}
                    />
                  </Box>
                  {item.hasOwnProperty("sessionSequence") && (
                    <Box sx={{ marginLeft: "10px" }}>
                      <TextField
                        variant="filled"
                        inputProps={{
                          readOnly: index == editable ? false : true,
                        }}
                        sx={{ width: "127px" }}
                        value={"1001"}
                      />
                    </Box>
                  )}
                  <Button onClick={() => dispatch(RemoveTerm(item._id,item.businessId))}>
                    <Box
                      sx={{
                        marginLeft: "10px",
                      }}
                    >
                      <ImgIcon>{deleteIcon}</ImgIcon>
                    </Box>
                  </Button>
                  {editable !== index && (
                    <Button
                      onClick={() => {
                        Edit(index);
                      }}
                    >
                      <Box
                        sx={{
                          marginLeft: "10px",
                        }}
                      >
                        <ImgIcon>{editIcon}</ImgIcon>
                      </Box>
                    </Button>
                  )}
                  {editable === index && (
                    <Button
                      onClick={() => {
                        save(index, item);
                      }}
                    >
                      <Box
                        sx={{
                          marginLeft: "10px",
                        }}
                      >
                        <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                          Save
                        </Typography>
                      </Box>
                    </Button>
                  )}
                </Box>
              );
            })
          : ""}
        {newTermList != ""
          ? newTermList.map(function (item, index) {
              return (
                <Box
                  sx={{
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    display: "flex",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    alignItems: "center",
                  }}
                >
                  {item.hasOwnProperty("termCode") && (
                    <Box>
                      <TextField
                        variant="filled"
                        // inputProps={{ readOnly: index==editable?false:true }}
                        sx={{ width: "109px" }}
                        value={""}
                      />
                    </Box>
                  )}
                  <Box sx={{ marginLeft: "10px" }}>
                    <TextField
                      variant="filled"
                      // inputProps={{ readOnly: index==editable?false:true }}
                      sx={{ width: "233px" }}
                      defaultValue={""}
                      onChange={(text) => {
                        setLabel(text.target.value);
                      }}
                    />
                  </Box>
                  <Box sx={{ marginLeft: "10px" }}>
                    <DatePicker
                      // inputProps={{ readOnly: index==editable?false:true }}
                      label={null}
                      date={startDate}
                      defaultValue={startDate}
                      onChange={(newDate) => {
                        let dateFormat = moment(newDate).utc().format('MM/DD/YYYY');
                        console.log(dateFormat)
                        setStartDate(dateFormat);
                      }}
                      sx={{ width: "138px" }}
                    />
                  </Box>
                  <Box sx={{ marginLeft: "10px" }}>
                    <DatePicker
                      label={null}
                      date={endDate}
                      defaultValue={endDate}
                      onChange={(newDate) => {
                        let dateFormat = moment(newDate).utc().format('MM/DD/YYYY');
                        console.log(dateFormat)
                        setEndDate(dateFormat);
                      }}
                      sx={{ width: "138px" }}
                    />
                  </Box>
                  {item.hasOwnProperty("sessionSequence") && (
                    <Box sx={{ marginLeft: "10px" }}>
                      <TextField
                        variant="filled"
                        inputProps={{
                          readOnly: index == editable ? false : true,
                        }}
                        sx={{ width: "127px" }}
                        value={"1001"}
                      />
                    </Box>
                  )}
                  <Button onClick={() => {newTermList.pop();dispatch(GetClassList());} }>
                    <Box
                      sx={{
                        marginLeft: "10px",
                      }}
                    >
                      <ImgIcon>{deleteIcon}</ImgIcon>
                    </Box>
                  </Button>

                  <Button
                    onClick={() => {
                      dispatch(
                        CreateTerm(
                          label,
                          startDate,
                          endDate,
                          classlist[0].businessId
                        )
                      );
                      newTermList.pop();
                     
 
                    }}
                  >
                    <Box
                      sx={{
                        marginLeft: "10px",
                      }}
                    >
                      <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
                        Create
                      </Typography>
                    </Box>
                  </Button>
                </Box>
              );
            })
          : ""}
      </Card>
      <Box
        sx={{
          marginTop: "20px",
          marginBottom: "53px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledPagination
          count={3}
          page={page}
          onChange={(event, value) => setPage(value)}
        />
      </Box>
    </Box>
  );
};
export default Term;
