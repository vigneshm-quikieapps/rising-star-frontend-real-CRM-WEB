import { useMemo, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Toolbar,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import { TableMui } from "../../../../components";
import NewTransaction from "./new-transaction";
import UpdateTransaction from "./update-transaction";
import Transaction from "./transaction";

const tableHeading = (
  <Typography component="h3" sx={{ fontSize: "20px", fontWeight: "bold" }}>
    Transaction Details
  </Typography>
);

const StyledTableCell = styled(TableCell)({ padding: "0 20px", lineHeight: 1 });
const tableHeaders = [
  "Reference",
  "Type",
  "Amount",
  "Method",
  "Date",
  "Update Method",
  "Batch Process ID",
  "Process Date",
  "Action",
];

const TransactionList = ({
  billId,
  transactions = [],
  transaction,
  update,
  hideNewTransaction,
  newTransaction,
}) => {
  // showUpdate
  const [showOldTransaction, setShowOldTransaction] = useState(update);
  const [showNewTransaction, setShowNewTransaction] = useState(newTransaction);

  const cancelNewTransaction = (value) => {
    setShowNewTransaction(value);
    hideNewTransaction();
  };

  const deleteOldTransaction=()=>{
    setShowOldTransaction(false)
  }

  const tableRows = useMemo(
    () =>
      transactions.map((transactionData) => (
        <Transaction data={transactionData} />
      )),
    [transactions],
  );
  return (
    <>
      <Toolbar>
        <Typography
          component="h3"
          sx={{ fontSize: "20px", fontWeight: "bold" }}
        >
          Transaction Details
        </Typography>
      </Toolbar>
      <TableContainer>
        <TableMui>
          <TableHead>
            <TableRow>
              <StyledTableCell>Reference</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Method</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Update Method</StyledTableCell>
              <StyledTableCell>Batch Process Id</StyledTableCell>
              <StyledTableCell>Process Date</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showOldTransaction && (
              <UpdateTransaction billId={billId} transaction={transaction} deleteTrans={deleteOldTransaction}/>
            )}
            {showNewTransaction && (
              <NewTransaction
                billId={billId}
                newTransaction={cancelNewTransaction}
              />
            )}
            {/* {showNewTransaction == true ? (
              <UpdateTransaction billId={billId} transaction={transaction} />
            ) : (
              <NewTransaction
                billId={billId}
                newTransaction={cancelNewTransaction}
              />
            )} */}
          </TableBody>
        </TableMui>
      </TableContainer>
    </>
  );
};

export default TransactionList;
