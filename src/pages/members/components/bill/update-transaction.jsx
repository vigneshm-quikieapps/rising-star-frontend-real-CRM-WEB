import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TableRow, TableCell, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentDetailsOfMembers } from "../../../../redux/action/billingActions";

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

const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};

const validationSchema = yup
  .object()
  .shape({
    billId: yup.string().required(),
    reference: yup.string(),
    type: yup.string(),
    // ["WRITE_OFF", "WAIVER"]
    amount: yup.number().required(),
    paymentDate: yup.string().required(),
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
    batchProcessId: yup.string(),
    processDate: yup.string(),
  })
  .required();

const UpdateTransaction = ({
  billId,
  deleteTrans,
  transaction,
  billStatus,
  subtotal,
  total,
  // showStatus,
}) => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.members.currentMember || {});
  let defaultValues = {
    billId,
    reference: "",
    type: "",
    amount: "",
    paymentDate: new Date(),
    // .toISOString().split("T")[0],
    paymentMethod: "",
    billStatus,
    batchProcessId: "",
    processDate: "",
  };
  defaultValues.reference = transaction && transaction.reference;
  defaultValues.type = transaction && transaction.transactionType;
  defaultValues.amount = Number(total).toFixed(2);
  defaultValues.paymentDate = transaction && transaction.paidAt;
  defaultValues.paymentMethod = transaction && transaction.method;
  defaultValues.batchProcessId = transaction && transaction.batchProcessId;
  defaultValues.processDate = transaction && transaction.processDate;

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
    let body = {
      billId: billId,
      transactionId: transactionId,
    };
    deleteTransaction(body);
    deleteTrans();
  };
  const [statusFlag, setStatusFlag] = useState(false);
  // const setSaveStatus = (flag) => {
  //   if (flag !== statusFlag) {
  //     setStatusFlag(true);
  //     // showStatus(true);
  //   }
  // };

  const onSubmit = (data) => {
    // const updatedData = { ...data };
    // let { paymentDate } = updatedData;
    // updatedData.paymentDate = new Date(
    //   paymentDate.getTime() - new Date().getTimezoneOffset() * 60000,
    // )
    //   .toISOString()
    //   .split("T")[0];
    // addTransaction(updatedData);
  };

  // const [reference, setReference] = useState(transaction.reference);
  // const [type, setType] = useState(transaction.transactionType);
  // const [amount, setAmount] = useState(transaction.amount);
  // const [paymentDate, setPaymentDate] = useState(transaction.paidAt);
  // const [paymentMethod, setPaymentMethod] = useState(transaction.method);
  const updateBillData = useSelector((state) => state.updateBilling);

  const onBlurReference = (e) => {
    // let index = updateBillData.billData.indexOf((bill)=> bill.billId==billId);
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
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
  };

  const onBlurType = (e) => {
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
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
  };

  const onBlurAmount = (e) => {
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
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
  };

  const onBlurMethod = (e) => {
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
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
  };

  const onChangePaidDate = (newDate) => {
    setValue("paymentDate", newDate);
    let index = -1;
    let transIndex = -1;
    for (let i = 0; i < updateBillData.billData.length; i++) {
      if (updateBillData.billData[i].billId == billId) {
        index = i;
      }
    }
    if (index > -1) {
      for (
        let i = 0;
        i < updateBillData.billData[index].transactions.length;
        i++
      ) {
        if (
          updateBillData.billData[index].transactions[i]._id == transaction._id
        ) {
          transIndex = i;
        }
      }
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
  };
  return (
    <TableRow>
      <TableCell>
        {/* <Typography>{member?.name}</Typography> */}
        <Input
          disabled={defaultValues.billStatus === "PAID"}
          control={control}
          defaultValue={member?.name}
          name="reference"
          onBlur={onBlurReference}
          onFocus={() => {
            // setSaveStatus(true);
          }}
        />
      </TableCell>
      <TableCell>
        {defaultValues.billStatus === "PAID" ? (
          <Input
            disabled={true}
            control={control}
            name="type"
            sx={{ width: "120px" }}
            onBlur={onBlurType}
            onFocus={() => {
              // setSaveStatus(true);
            }}
          ></Input>
        ) : (
          <Input
            control={control}
            name="type"
            select
            sx={{ width: "120px" }}
            onBlur={onBlurType}
            onFocus={() => {
              // setSaveStatus(true);
            }}
          >
            <MenuItem value="WRITE_OFF">Write off</MenuItem>
            <MenuItem value="WAIVER">Waiver</MenuItem>
            {defaultValues.billStatus === "PAID" && (
              <MenuItem value="PAYMENT">Payment</MenuItem>
            )}
          </Input>
        )}
      </TableCell>
      <TableCell>
        <Input
          disabled={defaultValues.billStatus === "PAID" || "SUSPENDED"}
          control={control}
          name="amount"
          sx={{ width: "120px" }}
          onBlur={onBlurAmount}
          onFocus={() => {
            // setSaveStatus(true);
          }}
        />
      </TableCell>
      <TableCell>
        <Input
          disabled={defaultValues.billStatus === "PAID" || "SUSPENDED"}
          control={control}
          name="paymentMethod"
          select
          sx={{ width: "120px" }}
          onBlur={onBlurMethod}
          onFocus={() => {
            // setSaveStatus(true);
          }}
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
          disabled={defaultValues.billStatus === "PAID"}
          date={date}
          onChange={(newDate) => onChangePaidDate(newDate)}
          textfieldProps={{ style: { width: "150px" } }}
          onFocus={() => {
            // setSaveStatus(true);
          }}
        />
      </TableCell>
      <TableCell>
        <TextField
          disabled={defaultValues.billStatus === "PAID" || "SUSPENDED"}
          defaultValue="Manual"
          sx={{ width: "120px" }}
          //   InputProps={{ readOnly: true }}
        >
          <MenuItem value="Manual">Manual</MenuItem>
        </TextField>
      </TableCell>
      <TableCell>
        {/* <TextField
          disabled={defaultValues.billStatus === "PAID" || "SUSPENDED"}
          control={control}
          name="batchProcessId"
          sx={{ width: "120px" }}
        ></TextField> */}
        <Typography>
          {(transaction && transaction.batchProcessId) || "N/A"}
        </Typography>
      </TableCell>
      <TableCell>
        {/* <TextField
          disabled={defaultValues.billStatus === "PAID" || "SUSPENDED"}
          control={control}
          name="processDate"
          sx={{ width: "120px" }}
        ></TextField> */}
        <Typography>
          {(transaction &&
            reformatDate(transaction.processDate.split("T")[0])) ||
            "N/A"}
        </Typography>
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
            disabled={defaultValues.billStatus === "PAID"}
            onClick={() => deleteOldTransaction(transaction._id)}
          >
            <CloseIcon />
          </RoundIconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default UpdateTransaction;
