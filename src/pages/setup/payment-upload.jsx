import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Box, MenuItem, Typography } from "@mui/material";
import {
  Button,
  DatePicker,
  GradientButton,
  Grid,
  Pagination,
  Status,
  TextField,
} from "../../components";
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
  const [readerFile, setReaderFile] = useState("");
  const [paymentListOpen, setPaymentListOpen] = useState(false);
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

  // const items = useMemo(() => {
  //   console.log("data111", data);
  //   return data?.xlxs?.map(
  //     ({ batchProcessId, createdAt, updatedAt, status }) => {
  //       return {
  //         items: [
  //           toPascal(batchProcessId),
  //           toPascal(createdAt),
  //           toPascal(updatedAt),
  //           toPascal(status),
  //           <Button onClick={() => setPaymentListOpen(true)}>View</Button>,
  //         ],
  //       };
  //     },
  //   );
  // }, [data]);
  // const handleOpenPaymentList = (id) => {
  //   setPaymentListOpen(true);
  //   localStorage.setItem("MID", id);
  // };
  const handleOpenPaymentList = useCallback((id) => {
    setPaymentListOpen(true);
    localStorage.setItem("MID", id);
  }, []);
  const tableRows = useMemo(
    () =>
      data?.xlsx?.map(
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
  console.log(tableRows);
  const onChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("payment_file", e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    // reader.onload = (e) => {
    //   console.log("new", e.target.result);
    //   setReaderFile(e.target.result);
    // };
  };
  const { mutateAsync: addPayment } = useAddPayment({
    onError: async (error) => setError(error),
  });
  const handlePaymentSubmit = async () => {
    // let formData = new FormData();
    // formData.append("classId", selectedClass);
    // formData.append("billDate", "2021 - 11 - 01");
    // formData.append("payment", readerFile);
    // let body = {
    //   classId: selectedClass,
    //   billDate: "2021-11-01",
    //   payment: readerFile,
    // };
    // await addPayment(selectedBusiness, body);
    // console.log("selectedBusiness, body", selectedBusiness, body);
    paymentData(selectedBusiness, selectedClass, "2021-11-01", selectedFile);
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
                {_id}
              </MenuItem>
            );
          })}
        </TextField>
        <GradientButton onClick={handlePaymentSubmit}> Submit</GradientButton>
      </Grid>
      <Box sx={{ mb: 3 }}>
        <DatePicker
          inputFormat="MM-yyyy"
          views={["year", "month"]}
          label="Month/Year"
          minDate={new Date("2012-03-01")}
          maxDate={new Date("2023-06-01")}
          value={value}
          onChange={setValue}
          renderInput={(params) => <TextField {...params} helperText={null} />}
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
        <GradientButton>Delete</GradientButton>
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
    </>
  );
};

export default PaymentUpload;
