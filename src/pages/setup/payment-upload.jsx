import React, { useEffect, useState, useMemo } from "react";
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

const PaymentUpload = () => {
  const businessList = useSelector((state) => state.businesses.businessList);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  console.log("businessList", businessList);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [paymentListOpen, setPaymentListOpen] = useState(false);

  const classesState = useSelector((state) => state.classes);
  const { classList, totalPages, currentPage } = classesState;
  console.log("classList", classList);

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

  const items = useMemo(() => {
    const statusColors = { ACTIVE: "green", INACTIVE: "red" };
    const statusText = {
      ACTIVE: "Active",
      INACTIVE: "Inactive",
    };
    return classList.map((singleClass) => {
      const id = singleClass._id;
      const { status, name } = singleClass;
      return {
        items: [
          toPascal(name),
          "example",
          "example2",
          <Status status={statusColors[status]} title={statusText[status]} />,
          <Button onClick={() => setPaymentListOpen(true)}>View</Button>,
        ],
      };
    });
  }, [classList]);

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
          value={selectedClass}
          onChange={classChangeHandler}
        >
          {businessList.map(({ _id, name }) => {
            return (
              <MenuItem key={_id} value={_id}>
                {_id}
              </MenuItem>
            );
          })}
        </TextField>
        <GradientButton> Submit</GradientButton>
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
        <TextField variant="filled" label="File Name"></TextField>
        <GradientButton>Delete</GradientButton>
      </Grid>
      <PaymentList list={items} pagination={pagination} />
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
