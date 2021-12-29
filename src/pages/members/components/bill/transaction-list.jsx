import { useMemo } from "react";
import { Typography } from "@mui/material";

import { Table } from "../../../../components";
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

const TransactionList = ({ transactions = [] }) => {
  const tableRows = useMemo(
    () =>
      transactions.map((transactionData) => (
        <Transaction data={transactionData} />
      )),
    [transactions],
  );
  return <Table heading={tableHeading} headers={tableHeaders} />;
};

export default TransactionList;
