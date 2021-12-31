import { Box, MenuItem } from "@mui/material";

import {
  TextField,
  DatePicker,
  GradientButton,
  Output,
} from "../../../../components";
import TransactionList from "./transaction-list";

const Bill = ({ billData = {} }) => {
  const {
    _id,
    name = "Bill",
    total = 0,
    subtotal = 0,
    discount = 0,
    dueDate = new Date(),
    paid = false,
    items = [],
  } = billData;

  const paidAmount = items.reduce((prev, { amount }) => prev + amount, 0);

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
        <Output title="Bill Name" description={name} />
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
        <TextField select sx={{ width: "150px" }} value={paid}>
          <MenuItem value={true}>Paid</MenuItem>
          <MenuItem value={false}>Not Paid</MenuItem>
        </TextField>
        <GradientButton>Enter a Transaction</GradientButton>
      </Box>
      <TransactionList />
    </>
  );
};

export default Bill;
