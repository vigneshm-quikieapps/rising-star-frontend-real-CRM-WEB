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
  billStatus,
  subtotal,
  total,
  // showStatus,
}) => {
  // showUpdate
  const [showOldTransaction, setShowOldTransaction] = useState(update);
  const [showNewTransaction, setShowNewTransaction] = useState(newTransaction);
  const [showHeaders, setShowHeaders] = useState(update || newTransaction);
  const cancelNewTransaction = (value) => {
    setShowNewTransaction(value);
    setShowHeaders(value);
    hideNewTransaction();
  };

  const deleteOldTransaction = () => {
    setShowOldTransaction(false);
    setShowHeaders(false);
  };

  const tableRows = useMemo(
    () =>
      transactions.map((transactionData) => (
        <Transaction data={transactionData} />
      )),
    [transactions],
  );
  return (
    <>
      {showHeaders && (
        <Toolbar>
          <Typography
            component="h3"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            Transaction Details
          </Typography>
        </Toolbar>
      )}
      <TableContainer>
        <TableMui>
          {showHeaders && (
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
          )}
          <TableBody>
            {showOldTransaction && (
              <UpdateTransaction
                billId={billId}
                transaction={transaction}
                deleteTrans={deleteOldTransaction}
                billStatus={billStatus}
                subtotal={subtotal}
                total={total}

                // showStatus={showStatus}
              />
            )}
            {showNewTransaction && (
              <NewTransaction
                billId={billId}
                newTransaction={cancelNewTransaction}
                subtotal={subtotal}
                total={total}
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
