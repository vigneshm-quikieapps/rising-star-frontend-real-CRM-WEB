import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Box, TableRow, TableCell, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";

import { useSetError } from "../../../../contexts/error-context";
import { useAddTransaction } from "../../../../services/mutations";
import {
  Input,
  TextField,
  DatePicker,
  IconButton,
} from "../../../../components";

const RoundIconButton = styled(IconButton)({ borderRadius: "50%" });
const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};

const validationSchema = yup
  .object()
  .shape({
    billId: yup.string().required(),
    reference: yup.string(),
    type: yup.string().oneOf(["WRITE_OFF", "WAIVER"]),
    amount: yup.number().required(),
    paymentDate: yup.date().required(),
    paymentMethod: yup
      .string()
      .oneOf([
        "CASH",
        "REC_BANK",
        "TOTZ_BANK",
        "REC_CREDIT_CARD",
        "TOTZ_CREDIT_CARD",
        "MANUAL",
      ])
      .required(),
  })
  .required();

const NewTransaction = ({ billId, newTransaction, total }) => {
  const member = useSelector((state) => state.members.currentMember || {});

  const setError = useSetError();
  const [showCheckMark, setShowCheckMark] = useState(true);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      billId,
      reference: "",
      type: "",
      amount: Number(total).toFixed(2),
      paymentDate: new Date(),
      // .toISOString().split("T")[0],
      paymentMethod: "CASH",
    },
  });

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(true);
  const { mutateAsync: addTransaction, isLoading } = useAddTransaction({
    onSuccess: async (data) => {
      setMessage(data.data.message); // the response
      newTransaction(false);
    },
    onError: async (error) => setError(error),
  });

  const date = getValues("paymentDate");

  const onSubmit = (data) => {
    // if (status) {
    const updatedData = { ...data };
    let { paymentDate } = updatedData;
    updatedData.paymentDate = new Date(
      paymentDate.getTime() - new Date().getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split("T")[0];
    addTransaction(updatedData);
    newTransaction(false);
    // setStatus(false);
    // }
    // if (!status) {
    //   if (message === "transaction recorded") {
    //     setShowCheckMark(false);
    //   } else {
    //     setShowCheckMark(true);
    //   }
    // }
  };

  return (
    <TableRow>
      <TableCell>
        <Input control={control} name="reference" />
      </TableCell>
      <TableCell>
        <Input control={control} name="type" select sx={{ width: "120px" }}>
          <MenuItem value="WRITE_OFF">Write off</MenuItem>
          <MenuItem value="WAIVER">Waiver</MenuItem>
        </Input>
      </TableCell>
      <TableCell>
        <Input
          control={control}
          name="amount"
          sx={{ width: "120px" }}
          disabled
        />
      </TableCell>
      <TableCell>
        <Input
          control={control}
          name="paymentMethod"
          select
          sx={{ width: "120px" }}
        >
          <MenuItem value="CASH">Cash</MenuItem>
          <MenuItem value="REC_BANK">Rec Bank</MenuItem>
          <MenuItem value="TOTZ_BANK">Totz Bank</MenuItem>
          <MenuItem value="REC_CREDIT_CARD">Rec Credit Card</MenuItem>
          <MenuItem value="TOTZ_CREDIT_CARD">Totz Credit Card</MenuItem>
        </Input>
      </TableCell>
      <TableCell>
        <DatePicker
          date={date}
          onChange={(newDate) => setValue("paymentDate", newDate)}
          textfieldProps={{ style: { width: "150px" } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          select
          defaultValue="Manual"
          sx={{ width: "120px" }}
          //   InputProps={{ readOnly: true }}
          disabled
        >
          <MenuItem value="Manual">Manual</MenuItem>
        </TextField>
      </TableCell>
      <TableCell>
        <Typography>N/A</Typography>
      </TableCell>
      <TableCell>
        <Typography>N/A</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ width: "106px" }}>
          {showCheckMark && (
            <RoundIconButton
              onClick={handleSubmit(onSubmit)}
              sx={{ mr: "6px" }}
              gradient
            >
              <CheckIcon />
            </RoundIconButton>
          )}
          <RoundIconButton onClick={() => newTransaction(false)}>
            <CloseIcon />
          </RoundIconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default NewTransaction;
