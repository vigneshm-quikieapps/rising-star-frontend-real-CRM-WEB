import { useMemo } from "react";
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
import Transaction from "./transaction";

const tableHeading = (
  <Typography component="h3" sx={{ fontSize: "20px", fontWeight: "bold" }}>
    Transaction Details
  </Typography>
);
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

const TransactionList = ({ billId, transactions = [] }) => {
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
              <TableCell>Reference</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Update Method</TableCell>
              <TableCell>Batch Process Id</TableCell>
              <TableCell>Process Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <NewTransaction billId={billId} />
          </TableBody>
        </TableMui>
      </TableContainer>
    </>
  );
};

export default TransactionList;
