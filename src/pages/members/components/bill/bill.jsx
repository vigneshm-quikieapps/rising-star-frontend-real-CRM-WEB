import { Box, MenuItem } from "@mui/material";
import { borderRadius } from "@mui/system";
import { useState, useEffect, useMemo, useCallback } from "react";

import {
  TextField,
  DatePicker,
  GradientButton,
  Output,
} from "../../../../components";
import TransactionList from "./transaction-list";

const Bill = ({
  billData = {},
  isTerm = false,
  termName = "",
  //  showStatus
}) => {
  const {
    _id,
    name = "Bill",
    billStatus = "",
    total = 0,
    subtotal = 0,
    discount = 0,
    dueDate = new Date(),
    paid = false,
    items = [],
    partialTransactions,
  } = billData;

  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const paidAmount = items.reduce((prev, { amount }) => prev + amount, 0);

  // const paidAmount = partialTransactions.reduce((prev, { amount }) => prev + amount, 0);

  const enterNewTransaction = () => {
    setShowNewTransaction(true);
  };
  const hideNewTransaction = () => {
    setShowNewTransaction(false);
  };
  let duemonth = new Date(dueDate);
  let month = duemonth.getMonth();
  let year = duemonth.getFullYear();
  let monthObj = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "June",
    6: "July",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const statusEnum = {
    PAID: "Paid",
    NOT_PAID: "Not Paid",
    SUSPENDED: "Suspended",
  };
  let billName = "Fee " + monthObj[month] + " " + year;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          p: "20px",
          bgcolor: "#ecebf0",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {isTerm == true ? (
          <Output title="Term Name" description={termName} />
        ) : (
          <Output title="Bill Name" description={billName} />
        )}
        <Output title="Fee" description={`\u00A3${total}`} />
        <Output title="Discount" description={`\u00A3${discount}`} />
        <Output title="Due" description={`\u00A3${subtotal}`} />
        <Box sx={{ width: "200px" }}>
          <DatePicker date={dueDate} />
        </Box>
        <Output
          title="Applied Amount"
          description={`\u00A3${subtotal - paidAmount}`}
        />

        <TextField
          disabled
          sx={{
            width: "150px",
          }}
          value={statusEnum[billStatus]}
        >
          {/* <MenuItem value={"PAID"}>Paid</MenuItem>S
          <MenuItem value={"NOT_PAID"}>Not Paid</MenuItem>
          <MenuItem value={"SUSPENDED"}>Suspended</MenuItem> */}
        </TextField>
        {billStatus !== "PAID" && billStatus !== "SUSPENDED" && (
          <GradientButton
            sx={{
              width: "170px",
              color: "#fff",
              height: "48px",
              padding: "0px 0px",
              fontSize: "16px",
              fontWeight: "normal",
              border: "1px solid",
            }}
            // disabled={billStatus === "PAID"}
            onClick={enterNewTransaction}
          >
            Enter a Transaction
          </GradientButton>
        )}
      </Box>
      {showNewTransaction && (
        <TransactionList
          billId={_id}
          hideNewTransaction={hideNewTransaction}
          newTransaction={true}
          billStatus={billStatus}
          subtotal={subtotal}
          // showStatus={showStatus}
        />
      )}
      {partialTransactions.map((transaction) => (
        <TransactionList
          billId={_id}
          transaction={transaction}
          update={true}
          billStatus={billStatus}
          subtotal={subtotal}
          // showStatus={showStatus}
        />
      ))}
    </>
  );
};

export default Bill;
