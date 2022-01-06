import { useMemo } from "react";
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
            <NewTransaction billId={billId} />
          </TableBody>
        </TableMui>
      </TableContainer>
    </>
  );
};

export default TransactionList;
