import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  Button,
  DatePicker,
  GradientButton,
  Grid,
  ImgIcon,
  Pagination,
  Status,
  TextField,
} from "../../components";
import informationIcon from "../../assets/icons/icon-delete.png";
import PaymentList from "./payment-index";
import { getClassList as getClassListAction } from "../../redux/action/class-actions";
import toPascal from "../../utils/to-pascal";
import PaymentFullList from "./payment-list";
import { useAddPayment } from "../../services/mutations";
import { useSetError } from "../../contexts/error-context";
import { paymentData } from "../../services/payment-services";
import { useGetXlsx, useGetXlsxFullList } from "../../services/queries";

const PaymentUpload = () => {
  const businessList = useSelector((state) => state.businesses.businessList);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  console.log("businessList", businessList);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [paymentListOpen, setPaymentListOpen] = useState(false);
  const [paymentUploadMessage, setPaymentUploadMessage] = useState(false);
  const setError = useSetError();

  const classesState = useSelector((state) => state.classes);
  const { classList, totalPages, currentPage } = classesState;
  console.log("classList", classList);
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetXlsx();

  useEffect(() => {
    businessList.length && setSelectedBusiness(businessList[0]._id);
  }, [businessList]);
  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);

  useEffect(() => {
    classList.length && setSelectedClass(classList[0]._id);
  }, [classList]);
  const classChangeHandler = (e) => setSelectedClass(e.target.value);
  //Pagination
  useEffect(() => {
    dispatch(getClassListAction({ page: 1 }));
  }, [dispatch]);

  const handlePageChange = (_, value) => {
    if (value <= totalPages && value !== currentPage)
      dispatch(
        getClassListAction({
          page: value,
        }),
      );
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  console.log("value", value);
  const pagination = (
    <Pagination
      sx={{ py: 2 }}
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
    />
  );
  //PaymentList

  //List

  const handleOpenPaymentList = useCallback((id) => {
    setPaymentListOpen(true);
    localStorage.setItem("MID", id);
  }, []);
  const tableRows = useMemo(
    () =>
      data?.docs?.map(
        ({ _id, batchProcessId, createdAt, updatedAt, status }) => ({
          items: [
            toPascal(batchProcessId),
            toPascal(createdAt),
            toPascal(updatedAt),
            toPascal(status),
            <Button onClick={() => handleOpenPaymentList(_id)}>View</Button>,
          ],
        }),
      ),
    [data, handleOpenPaymentList],
  );
  console.log("MDatata", data);
  const onChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("payment_file", e.target.files[0]);
  };
  const { mutateAsync: addPayment } = useAddPayment({
    onError: async (error) => setError(error),
  });
  const handlePaymentSubmit = async () => {
    const message = await paymentData(
      value,
      selectedClass,
      selectedBusiness,
      selectedFile,
    );
    console.log("message", message);
    setPaymentUploadMessage(true);
  };
  const handleDeleteFunction = () => {
    document.getElementById("file-upload").value = "";
    setValue("");
    console.log("value,file", value, selectedFile);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          PaymentUpload
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Manage all payment here
        </Typography>
      </Box>
      <Grid sx={{ mb: 3 }}>
        <TextField
          select
          variant="filled"
          label="Business Name"
          name="selectedBusiness"
          value={selectedBusiness}
          onChange={businessChangeHandler}
        >
          {businessList.map(({ _id, name }) => {
            return (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          select
          variant="filled"
          label="Class Name"
          name="selectedClass"
          value={selectedClass}
          onChange={classChangeHandler}
        >
          {classList.map(({ _id, name }) => {
            return (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            );
          })}
        </TextField>
        <GradientButton onClick={handlePaymentSubmit}> Submit</GradientButton>
      </Grid>
      <Box sx={{ mb: 3 }}>
        <DatePicker
          label="Month/Year"
          inputFormat="yyyy/MM/dd"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Grid sx={{ mb: 3 }}>
        <TextField
          id="file-upload"
          type="file"
          name="selectedFile"
          onChange={(e) => {
            onChangeFile(e);
          }}
        ></TextField>
        <GradientButton onClick={handleDeleteFunction}>Delete</GradientButton>
      </Grid>
      <PaymentList list={tableRows} pagination={pagination} />
      {paymentListOpen && (
        <PaymentFullList
          open={paymentListOpen}
          onClose={() => setPaymentListOpen(false)}
          businessId={selectedBusiness}
          classId={selectedClass}
        />
      )}
      <Dialog
        open={paymentUploadMessage}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "380px",
            padding: "40px 30px",
            margin: "27px 300px 31px 200px",
            alignItems: "center",
          },
        }}
      >
        <ImgIcon>{informationIcon}</ImgIcon>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>Successfully Uploaded</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setPaymentUploadMessage(false)}
            sx={{ color: "#ff2c60" }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentUpload;
