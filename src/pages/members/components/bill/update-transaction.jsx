import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TableRow, TableCell, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {updatePaymentDetailsOfMembers} from '../../../../redux/action/billingActions'


import { useSetError } from "../../../../contexts/error-context";

import {
  useAddTransaction,
  useDeleteTransaction,
} from "../../../../services/mutations";
import {
  Input,
  TextField,
  DatePicker,
  IconButton,
} from "../../../../components";

const RoundIconButton = styled(IconButton)({ borderRadius: "50%" });

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

const UpdateTransaction = ({ billId, deleteTrans, transaction }) => {
  const dispatch = useDispatch();

  let defaultValues = {
    billId,
    reference: "",
    type: "WRITE_OFF",
    amount: 0,
    paymentDate: new Date(),
    // .toISOString().split("T")[0],
    paymentMethod: "CASH",
  };
  defaultValues.reference = transaction && transaction.reference;
  defaultValues.type = transaction && transaction.transactionType;
  defaultValues.amount = transaction && transaction.amount;
  defaultValues.paymentDate = transaction && transaction.paidAt;
  defaultValues.paymentMethod = transaction && transaction.method;
  console.log("transaction", transaction);

  const setError = useSetError();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange,onBlur",
    defaultValues: defaultValues,
  });

  // const { mutate: addTransaction, isLoading } = useAddTransaction({
  //   onError: (error) => setError(error),
  // });

  const { mutate: deleteTransaction, isLoading } = useDeleteTransaction({
    onError: (error) => setError(error),
  });

  const date = getValues("paymentDate");

  const deleteOldTransaction = (transactionId) => {
    console.log("transactionId", billId);
    let body = {
      billId: billId,
      transactionId: transactionId,
    };
    deleteTransaction(body);
    deleteTrans();
  };

  const onSubmit = (data) => {
    console.log(data);
    // const updatedData = { ...data };
    // let { paymentDate } = updatedData;
    // updatedData.paymentDate = new Date(
    //   paymentDate.getTime() - new Date().getTimezoneOffset() * 60000,
    // )
    //   .toISOString()
    //   .split("T")[0];
    // console.log(updatedData);
    // addTransaction(updatedData);
  };

  const [reference, setReference] = useState(transaction.reference);
  const [type, setType] = useState(transaction.transactionType);
  const [amount, setAmount] = useState(transaction.amount);
  const [paymentDate, setPaymentDate] = useState(transaction.paidAt);
  const [paymentMethod, setPaymentMethod] = useState(transaction.method);
  const updateBillData = useSelector((state) => state.updateBilling);

  const onBlurReference = (e) => {
    console.log("event", e.target.value, billId);
    console.log("updateBillData116", updateBillData);
    // let index = updateBillData.billData.indexOf((bill)=> bill.billId==billId);
    // console.log("index", index);
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        console.log("index", i);
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        console.log("131", updateBillData.billData[index].transactions[i]._id);
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
      console.log("transIndex", transIndex);
      if (transIndex > -1) {
        let transObject =
          updateBillData.billData[index].transactions[transIndex];
        updateBillData.billData[index].transactions[transIndex] = {
          ...transObject,
          reference: e.target.value,
        };
      } else {
        updateBillData.billData[index].transactions.push({
          _id: transaction._id,
          reference: e.target.value,
        });
      }
    } else {
      updateBillData.billData.push({
        billId: billId,
        transactions: [
          {
            reference: e.target.value,
            _id: transaction._id,
          },
        ],
      });
    }
    dispatch(updatePaymentDetailsOfMembers(updateBillData.billData));
    console.log("updateBillData162", updateBillData);
  };

  const onBlurType = (e) => {
    console.log("event", e.target.value, billId);
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        console.log("index", i);
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        console.log("131", updateBillData.billData[index].transactions[i]._id);
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
      console.log("transIndex", transIndex);
      if (transIndex > -1) {
        let transObject =
          updateBillData.billData[index].transactions[transIndex];
        updateBillData.billData[index].transactions[transIndex] = {
          ...transObject,
          transactionType: e.target.value,
        };
      } else {
        updateBillData.billData[index].transactions.push({
          _id: transaction._id,
          transactionType: e.target.value,
        });
      }
    } else {
      updateBillData.billData.push({
        billId: billId,
        transactions: [
          {
            transactionType: e.target.value,
            _id: transaction._id,
          },
        ],
      });
    }
    dispatch(updatePaymentDetailsOfMembers(updateBillData.billData));
  }

  const onBlurAmount = (e) => {
    console.log("event", e.target.value, billId);
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        console.log("index", i);
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        console.log("131", updateBillData.billData[index].transactions[i]._id);
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
      console.log("transIndex", transIndex);
      if (transIndex > -1) {
        let transObject =
          updateBillData.billData[index].transactions[transIndex];
        updateBillData.billData[index].transactions[transIndex] = {
          ...transObject,
          amount: e.target.value,
        };
      } else {
        updateBillData.billData[index].transactions.push({
          _id: transaction._id,
          amount: e.target.value,
        });
      }
    } else {
      updateBillData.billData.push({
        billId: billId,
        transactions: [
          {
            amount: e.target.value,
            _id: transaction._id,
          },
        ],
      });
    }
    dispatch(updatePaymentDetailsOfMembers(updateBillData.billData));
  }

  const onBlurMethod = (e) => {
    console.log("event", e.target.value, billId);
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        console.log("index", i);
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        console.log("131", updateBillData.billData[index].transactions[i]._id);
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
      console.log("transIndex", transIndex);
      if (transIndex > -1) {
        let transObject =
          updateBillData.billData[index].transactions[transIndex];
        updateBillData.billData[index].transactions[transIndex] = {
          ...transObject,
          method: e.target.value,
        };
      } else {
        updateBillData.billData[index].transactions.push({
          _id: transaction._id,
          method: e.target.value,
        });
      }
    } else {
      updateBillData.billData.push({
        billId: billId,
        transactions: [
          {
            method: e.target.value,
            _id: transaction._id,
          },
        ],
      });
    }
    dispatch(updatePaymentDetailsOfMembers(updateBillData.billData));
  }

  const onChangePaidDate = (newDate) =>{
    console.log("event,",newDate)
    setValue("paymentDate", newDate)
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        console.log("index", i);
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        console.log("131", updateBillData.billData[index].transactions[i]._id);
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
      console.log("transIndex", transIndex);
      if (transIndex > -1) {
        let transObject =
          updateBillData.billData[index].transactions[transIndex];
        updateBillData.billData[index].transactions[transIndex] = {
          ...transObject,
          paidAt: newDate,
        };
      } else {
        updateBillData.billData[index].transactions.push({
          _id: transaction._id,
          paidAt: newDate,
        });
      }
    } else {
      updateBillData.billData.push({
        billId: billId,
        transactions: [
          {
            paidAt: newDate,
            _id: transaction._id,
          },
        ],
      });
    }
    dispatch(updatePaymentDetailsOfMembers(updateBillData.billData));
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          control={control}
          name="reference"
          // onChange={onChangeReference}
          onBlur={onBlurReference}
        />
      </TableCell>
      <TableCell>
        <Input control={control} name="type" select sx={{ width: "120px" }} onBlur={onBlurType}>
          <MenuItem value="WRITE_OFF">Write off</MenuItem>
          <MenuItem value="WAIVER">Waiver</MenuItem>
        </Input>
      </TableCell>
      <TableCell>
        <Input control={control} name="amount" sx={{ width: "120px" }} onBlur={onBlurAmount} />
      </TableCell>
      <TableCell>
        <Input
          control={control}
          name="paymentMethod"
          select
          sx={{ width: "120px" }}
          onBlur={onBlurMethod}
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
          onChange={(newDate) => onChangePaidDate(newDate)}
          textfieldProps={{ style: { width: "150px" } }}
        />
      </TableCell>
      <TableCell>
        <TextField
          select
          defaultValue="MANUAL"
          sx={{ width: "120px" }}
          //   InputProps={{ readOnly: true }}
          disabled
        >
          <MenuItem value="MANUAL">Manual</MenuItem>
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
          {/* <RoundIconButton
              onClick={handleSubmit(onSubmit)}
              sx={{ mr: "6px" }}
              gradient
            >
              <CheckIcon />
            </RoundIconButton> */}

          <RoundIconButton
            onClick={() => deleteOldTransaction(transaction._id)}
          >
            <CloseIcon />
          </RoundIconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
  console.log("43u", transaction);
};

export default UpdateTransaction;
