import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  CircularProgress,
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
  TextField,
} from "../../components";
import informationIcon from "../../assets/icons/icon-information.png";
import errorIcon from "../../assets/icons/icon-error.png";
import PaymentList from "./payment-index";
import { getClassList as getClassListAction } from "../../redux/action/class-actions";
import toPascal from "../../utils/to-pascal";
import PaymentFullList from "./payment-list";
import { useAddPayment } from "../../services/mutations";
import { useSetError } from "../../contexts/error-context";
import { getXlsx, paymentData } from "../../services/payment-services";
import { useGetXlsx } from "../../services/queries";
import { transformError } from "../../utils";

const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};

const PaymentUpload = () => {
  const businessList = useSelector((state) => state.businesses.businessList);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [paymentListOpen, setPaymentListOpen] = useState(false);
  const [paymentUploadMessage, setPaymentUploadMessage] = useState(false);
  const [uploadXlsxMessage, setUploadXlsxMessage] = useState("");
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState();
  const setError = useSetError();

  const classesState = useSelector((state) => state.classes);
  const { classList, totalPages, currentPage } = classesState;
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
    setValue(newValue.toISOString().split("T")[0]);
  };
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
            reformatDate(createdAt.split("T")[0]),
            reformatDate(updatedAt.split("T")[0]),
            toPascal(status),
            <Button onClick={() => handleOpenPaymentList(_id)}>View</Button>,
          ],
        }),
      ),
    [data, handleOpenPaymentList],
  );
  const onChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
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
    if (message.data.message) {
      setUploadXlsxMessage(message.data.message);
      setTitle("Information");
      setIcon(informationIcon);
    } else {
      if (message.data.errors.length > 1) {
        setUploadXlsxMessage("BillDate or Payment File is missing");
        setTitle("Error");
        setIcon(errorIcon);
      } else {
        setUploadXlsxMessage(`${message.data.errors[0].Payment}`);
        setTitle("Error");
        setIcon(errorIcon);
      }
    }

    setPaymentUploadMessage(true);
  };
  const handleDeleteFunction = () => {
    document.getElementById("file-upload").value = "";
    setValue("");
  };
  const handleOk = () => {
    setPaymentUploadMessage(false);
    document.getElementById("file-upload").value = "";
    setValue("");
  };
  const refreshHandle = getXlsx();

  console.log("refreshHandle", refreshHandle);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          Payment Upload
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Manage upload of bank payments here
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
          inputFormat="MM/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Grid sx={{ mb: 3 }}>
        <label
          for="file-upload"
          style={{
            background:
              "linear-gradient(90deg, rgb(283, 14, 116) 20%, rgb(253, 127, 76) 90%)",
            border: 0,
            borderRadius: 10,
            color: "white",
            height: "47px",
            textAlign: "center",
            paddingTop: "10px",
          }}
        >
          Upload File
        </label>

        <input
          id="file-upload"
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            onChangeFile(e);
          }}
        />
        {/* <TextField
          id="file-upload"
          type="file"
          name="selectedFile"

          onChange={(e) => {
            onChangeFile(e);
          }}
        >
          <GradientButton onClick={handleDeleteFunction}>
            Select File
          </GradientButton>
        </TextField> */}
        <GradientButton onClick={handleDeleteFunction}>Delete</GradientButton>
      </Grid>
      {isError ? (
        <Typography color="error" component="pre">
          {"Something went wrong: " + transformError(error)}
        </Typography>
      ) : isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <PaymentList
          list={tableRows}
          pagination={pagination}
          Refresh={refreshHandle}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
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
        <ImgIcon>{icon}</ImgIcon>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{uploadXlsxMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleOk} sx={{ color: "#ff2c60" }} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentUpload;
