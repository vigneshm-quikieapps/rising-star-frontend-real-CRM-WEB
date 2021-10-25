import React, { useState, useEffect } from "react";
import { Button, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTable from "../../components/table";
import Pagination from "../../components/pagination";
import TextField from "../../components/textfield";
import DatePicker from "../../components/date-picker";
import ImgIcon from "../../components/img-icon";
import deleteIcon from "../../assets/icons/icon-delete.png";
import editIcon from "../../assets/icons/icon-edit.png";
import GradientButton from "../../components/gradient-button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "../../components/icon-button";
import addIcon from "../../assets/icons/icon-add.png";
import { useSelector, useDispatch } from "react-redux";
import { GetClassList } from "../../redux/action/classAction";
import {
  GetTerm,
  RemoveTerm,
  UpdateTerm,
  EditTerm,
  CreateTerm,
  DeleteEditTerm,
} from "../../redux/action/termAction";
import saveIcon from "../../assets/icons/icon-tick.png";
import moment from "moment";
import Accordion from "../../components/accordion";

const Term = () => {
  const [date, setDate] = useState(new Date(""));
  const dispatch = useDispatch();
  const classlist = useSelector((state) => state.classes.classList);
  const [classes, setClasses] = useState([]);
  const Termlist = useSelector((state) => state.Term.getTerm);
  const TermlistResponse = useSelector((state) => state.Term.getTermResponse);
  const [page, setPage] = useState(TermlistResponse.page);
  const [pages] = useState(TermlistResponse.totalPages);
  const [Terms, setTerms] = useState([]);
  const [editable, setEditable] = useState(-1);
  const EditTermlist = useSelector((state) => state.Term.editTermItem);
  const currentBusinessId = useSelector(
    (state) => state.Term.currentBusinessId
  );
  const [a, setA] = useState(editIcon);
  const [ss, setSS] = useState(0);
  const heading = (
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
        <GradientButton
          onClick={() => {
            Termlist.push(addNewTerm);
            console.log(Termlist);
            setSS(ss + 1);
          }}
          sx={{ width: "52px", height: "48px" }}
        >
          <ImgIcon alt="more">{addIcon}</ImgIcon>
        </GradientButton>

        <Box sx={{ marginLeft: "10px" }}>
          <IconButton onClick={() => {}} sx={{ width: "52px" }}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  const addNewTerm = {
    label: "",
    startdate: "",
    enddate: "",
  };

  const popItem = (index) => {
    console.log("popItem", index);
    dispatch(DeleteEditTerm(index, Termlist));
    console.log("cccccc", Termlist);
    setSS(ss + 1);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  const headers = ["Term Label", "Start Date", "End Date", "Action", "Edit"];
  const pagination = (
    <Pagination count={pages} page={page} onChange={handleChange} />
  );
  const renderTermList = () => {
    let term_list = Termlist.map((item, index) => {
      console.log("fromMap", editable, index, item.label);
      return {
        id: index + 1,
        items: [
          <TextField
            inputProps={{
              readOnly: index != editable && item.hasOwnProperty("_id"),
            }}
            variant="filled"
            sx={{ width: "233px" }}
            defaultValue={item.label}
            onChange={(text) => {
              dispatch(EditTerm(text.target.value, index, Termlist, "label"));
            }}
          />,
          <DatePicker
            label={null}
            date={item.startdate}
            inputProps={{
              disabled: true,
            }}
            readOnly={index != editable && item.hasOwnProperty("_id")}
            onChange={(newDate) => {
              let dateFormat = !item.hasOwnProperty("_id")
                ? moment(newDate).utc().format("MM/DD/YYYY")
                : moment(newDate).utc().format();
              dispatch(EditTerm(dateFormat, index, Termlist, "startdate"));
              setSS(ss + 1);
            }}
          />,
          <DatePicker
            label={null}
            date={item.enddate}
            inputProps={{
              disabled: true,
            }}
            readOnly={index != editable && item.hasOwnProperty("_id")}
            onChange={(newDate) => {
              let dateFormat = !item.hasOwnProperty("_id")
                ? moment(newDate).utc().format("MM/DD/YYYY")
                : moment(newDate).utc().format();
              dispatch(EditTerm(dateFormat, index, Termlist, "enddate"));
              setSS(ss + 1);
            }}
          />,
          <Button
            onClick={() =>
              item.hasOwnProperty("_id")
                ? dispatch(RemoveTerm(item._id, item.businessId))
                : popItem(index)
            }
          >
            <ImgIcon alt="more">{deleteIcon}</ImgIcon>
          </Button>,

          <Button
            onClick={() => {
              console.log("fromOnCliCK", editable, index, item);
              console.log("aa", currentBusinessId);

              if (!item.hasOwnProperty("_id")) {
                dispatch(
                  EditTerm(currentBusinessId, index, Termlist, "businessId")
                );
                console.log("ccssaa", Termlist);
                dispatch(
                  CreateTerm(
                    item.label,
                    item.startdate,
                    item.enddate,
                    currentBusinessId
                  )
                );
                Termlist.splice(index, 1);
                setSS(ss + 1);
              } else {
                if (editable != index) {
                  setEditable(index);
                } else {
                  setEditable(-1);
                  dispatch(UpdateTerm(Termlist[index]._id, EditTermlist));
                }
              }
            }}
          >
            <ImgIcon>
              {!item.hasOwnProperty("_id")
                ? saveIcon
                : editable == index
                ? saveIcon
                : editIcon}
            </ImgIcon>
          </Button>,
        ],
      };
    });
    setTerms(term_list);
  };
  useEffect(() => {
    dispatch(GetClassList());
  }, [dispatch]);
  useEffect(() => {
    let class_List =
      classlist &&
      classlist.map((item) => {
        return {
          id: item.businessId,
          name: item.name,
        };
      });
    setClasses(class_List);
    Termlist && renderTermList();
  }, [Termlist]);
  useEffect(() => {
    renderTermList();
  }, [editable, ss]);

  return (
    <div>
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
          {classes.map(function (item, index) {
            return (
              <MenuItem
                onClick={() => {
                  dispatch(GetTerm(currentBusinessId));
                  setSS(0);
                }}
                value={10}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </TextField>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <CustomTable
          heading={heading}
          headers={headers}
          rows={Terms}
          pagination={pagination}
        />
      </Box>
    </div>
  );
};
export default Term;
