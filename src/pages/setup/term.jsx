import { useEffect, useMemo, useCallback, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  MenuItem,
  AccordionSummary,
  AccordionDetails,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Done as DoneIcon,
  Save as AddIcon,
  Undo as RestoreDefaultsIcon,
  ClearRounded as CancelIcon,
} from "@mui/icons-material";

import {
  getTermsOfBusiness,
  addTerm as addTermAction,
  deleteTerm as deleteTermAction,
  editTerm as editTermAction,
} from "../../redux/action/terms-actions";
import {
  TextField,
  Accordion,
  TableMui as Table,
  DatePicker,
  Pagination,
  ImgIcon,
  AddButton,
} from "../../components";
import deleteIcon from "../../assets/icons/icon-delete.png";

const tableHeaders = [
  "Term Label",
  "Start Date",
  "End Date",
  "Term Fee",
  "Actions",
];

const Term = ({
  _id,
  businessId,
  label: initialLabel,
  startDate: initialStartDate,
  endDate: initialEndDate,
  termFee: initialFee,
  onEdit,
  onDelete,
  add = false,
}) => {
  const [touched, setTouched] = useState(false);
  const [label, setLabel] = useState(initialLabel || "");
  const [startDate, setStartDate] = useState(new Date(initialStartDate));
  const [endDate, setEndDate] = useState(new Date(initialEndDate));
  const [termFee, setTermFee] = useState(initialFee || "");

  const changeHandler = (e, field) => {
    setTouched(true);
    const value = ["label", "termFee"].indexOf(field) > -1 ? e.target.value : e;
    switch (field) {
      case "label": {
        return setLabel(value);
      }
      case "termFee": {
        return setTermFee(value);
      }
      case "startDate": {
        return setStartDate(value);
      }
      case "endDate": {
        return setEndDate(value);
      }
      default: {
        return;
      }
    }
  };

  const restoreDefaults = () => {
    setLabel(initialLabel);
    setTermFee(initialFee);
    setStartDate(new Date(initialStartDate));
    setEndDate(new Date(initialEndDate));
    setTouched(false);
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          value={label}
          onChange={(e) => changeHandler(e, "label")}
          variant="filled"
          sx={{ height: "44px", "& .MuiFilledInput-input": { py: 0 } }}
        />
      </TableCell>
      <TableCell>
        <DatePicker
          date={startDate}
          variant="filled"
          onChange={(newDate) => changeHandler(newDate, "startDate")}
          // label={null}
          inputFormat="dd/MM/yyyy"
          textfieldProps={{
            sx: {
              height: "44px",
              "& .MuiFilledInput-input": { py: 0 },
              verticalAlign: "middle",
            },
          }}
        />
      </TableCell>
      <TableCell>
        <DatePicker
          date={endDate}
          variant="filled"
          onChange={(newDate) => changeHandler(newDate, "endDate")}
          inputFormat="dd/MM/yyyy"
          // label={null}
          textfieldProps={{
            sx: {
              height: "44px",
              "& .MuiFilledInput-input": { py: 0 },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={termFee}
          onChange={(e) => changeHandler(e, "termFee")}
          variant="filled"
          sx={{ height: "44px", "& .MuiFilledInput-input": { py: 0 } }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ width: "80px" }}>
          {add && (
            <IconButton onClick={() => onDelete(_id)}>
              <CancelIcon color="secondary" />
            </IconButton>
          )}
          {!touched && !add && (
            <IconButton onClick={() => onDelete(_id)}>
              <ImgIcon>{deleteIcon}</ImgIcon>
            </IconButton>
          )}
          {touched && (
            <IconButton
              onClick={() => {
                onEdit({
                  _id,
                  businessId,
                  label,
                  termFee,
                  startDate: startDate.toISOString().split("T")[0],
                  endDate: endDate.toISOString().split("T")[0],
                });
                setTouched(false);
              }}
            >
              {add ? <AddIcon /> : <DoneIcon color="success" />}
            </IconButton>
          )}
          {!add && touched && (
            <IconButton onClick={restoreDefaults}>
              <RestoreDefaultsIcon />
            </IconButton>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

const Terms = () => {
  const [showAddTerm, setShowAddTerm] = useState(false);
  const dispatch = useDispatch();
  const businessList = useSelector((state) => state.businesses.businessList);
  const { termsOfBusiness, currentPage, totalPages } = useSelector(
    (state) => state.terms,
  );
  const [selectedBusiness, setSelectedBusiness] = useState("");

  useEffect(() => {
    setSelectedBusiness(businessList[0]?._id || "");
  }, [businessList]);

  useEffect(() => {
    selectedBusiness && dispatch(getTermsOfBusiness(selectedBusiness));
  }, [dispatch, selectedBusiness]);

  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);

  const addTermHandler = useCallback(
    (termData) => {
      dispatch(addTermAction(termData));
      setShowAddTerm(false);
    },
    [dispatch],
  );

  const deleteTermHandler = useCallback(
    (id) => {
      dispatch(deleteTermAction(id));
    },
    [dispatch],
  );

  const editTermHandler = useCallback(
    (termData) => {
      dispatch(editTermAction(termData));
    },
    [dispatch],
  );

  const handlePageChange = useCallback(
    (_, value) => {
      if (value <= totalPages && value !== currentPage)
        dispatch(getTermsOfBusiness(selectedBusiness, { page: value }));
    },
    [dispatch, currentPage, totalPages, selectedBusiness],
  );

  const termList = useMemo(
    () => (
      <>
        <TableContainer component={"div"}>
          <Table>
            <TableHead>
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell key={index} component="th">
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {showAddTerm && (
                <Term
                  add
                  businessId={selectedBusiness}
                  onEdit={addTermHandler}
                  onDelete={() => setShowAddTerm(false)}
                  startDate={new Date().toISOString()}
                  endDate={new Date().toISOString()}
                />
              )}
              {termsOfBusiness.map(
                ({ _id, label, startDate, endDate, termFee = "" }) => (
                  <Term
                    key={_id}
                    {...{ _id, label, startDate, endDate, termFee }}
                    onEdit={editTermHandler}
                    onDelete={deleteTermHandler}
                  />
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          page={currentPage}
          count={totalPages}
          sx={{ my: 2 }}
          onChange={handlePageChange}
        />
      </>
    ),
    [
      selectedBusiness,
      currentPage,
      totalPages,
      showAddTerm,
      termsOfBusiness,
      addTermHandler,
      deleteTermHandler,
      editTermHandler,
      handlePageChange,
    ],
  );

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          Terms
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Manage all terms here
        </Typography>
      </Box>
      <TextField
        select
        variant="outlined"
        InputLabelProps={{ style: { background: "#fff" } }}
        sx={{ minWidth: "40%" }}
        label="Business Name*"
        value={selectedBusiness}
        onChange={businessChangeHandler}
      >
        {businessList.map(({ name, _id }) => {
          return (
            <MenuItem key={_id} value={_id}>
              {name}
            </MenuItem>
          );
        })}
      </TextField>
      <Accordion defaultExpanded={true} sx={{ mt: "20px !important" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
            <Typography variant="h2" sx={{ fontSize: "20px", flex: 1 }}>
              Term List
            </Typography>
            <AddButton
              sx={{ mr: "10px" }}
              onClick={(e) => {
                e.stopPropagation();
                setShowAddTerm((prevShow) => !prevShow);
              }}
            />
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>{termList}</AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default memo(Terms);
