import { Box } from "@mui/material";

import { Table } from "../../components";
import { paymentListHeaders } from "../../helper/constants";
import PaymentListHeading from "./payment-heading";

const PaymentList = ({ list = [], pagination, Refresh }) => (
  <Box
    sx={{
      justifyContent: "center",
      margin: "auto",
    }}
  >
    <Table
      headers={paymentListHeaders}
      rows={list}
      heading={<PaymentListHeading action={Refresh} />}
      pagination={pagination}
    />
  </Box>
);

export default PaymentList;
