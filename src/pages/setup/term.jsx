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
  GradientButton,
  DatePicker,
  Actions,
  Pagination,
  ImgIcon,
} from "../../components";
import deleteIcon from "../../assets/icons/icon-delete.png";

const tableHeaders = ["Term Label", "Start Date", "End Date", "Actions"];

const Term = ({
  _id,
  businessId,
  label: initialLabel,
  startDate: initialStartDate,
  endDate: initialEndDate,
  onEdit,
  onDelete,
  add = false,
}) => {
  const [touched, setTouched] = useState(false);
  const [label, setLabel] = useState(initialLabel || "");
  const [startDate, setStartDate] = useState(new Date(initialStartDate));
  const [endDate, setEndDate] = useState(new Date(initialEndDate));
  const changeHandler = (e, field) => {
    setTouched(true);
    const value = field === "label" ? e.target.value : e;
    switch (field) {
      case "label": {
        return setLabel(value);
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
          onChange={(newDate) => changeHandler(newDate, "startDate")}
          label={null}
          inputProps={{
            sx: {
              height: "44px",
              "& .MuiFilledInput-input": { py: 0 },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <DatePicker
          date={endDate}
          onChange={(newDate) => changeHandler(newDate, "endDate")}
          label={null}
          inputProps={{
            sx: {
              height: "44px",
              "& .MuiFilledInput-input": { py: 0 },
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Box sx={{ width: "80px" }}>
          <IconButton onClick={() => onDelete(_id)}>
            {!add ? (
              <ImgIcon>{deleteIcon}</ImgIcon>
            ) : (
              <CancelIcon color="secondary" />
            )}
          </IconButton>
          {touched && (
            <IconButton
              onClick={() => {
                onEdit({
                  _id,
                  businessId,
                  label,
                  startDate: startDate.toISOString().split("T")[0],
                  endDate: endDate.toISOString().split("T")[0],
                });
                add && setLabel("");
                setTouched(false);
              }}
            >
              {add ? <AddIcon /> : <DoneIcon color="success" />}
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
    (state) => state.terms
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
    [dispatch]
  );

  const deleteTermHandler = useCallback(
    (id) => {
      dispatch(deleteTermAction(id));
    },
    [dispatch]
  );

  const editTermHandler = useCallback(
    (termData) => {
      dispatch(editTermAction(termData));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (_, value) => {
      if (value <= totalPages && value !== currentPage)
        dispatch(getTermsOfBusiness(selectedBusiness, { page: value }));
    },
    [dispatch, currentPage, totalPages, selectedBusiness]
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
              {termsOfBusiness.map(({ _id, label, startDate, endDate }) => (
                <Term
                  key={_id}
                  {...{ _id, label, startDate, endDate }}
                  onEdit={editTermHandler}
                  onDelete={deleteTermHandler}
                />
              ))}
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
    ]
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
        variant="filled"
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
            <GradientButton
              size="large"
              sx={{
                px: 0,
                minWidth: "52px",
                mr: "10px",
                borderRadius: (theme) => theme.shape.borderRadiuses.primary,
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowAddTerm((prevShow) => !prevShow);
              }}
            >
              +
            </GradientButton>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>{termList}</AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default memo(Terms);
