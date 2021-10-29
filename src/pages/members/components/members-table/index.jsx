// It's just for demonstration purposes
// Do not use it in production
import { Box } from "@mui/material";

import { memberListHeaders } from "../../../../helper/constants";
import { Table } from "../../../../components";
import Heading from "./heading";

const ClassList = ({ list = [], pagination, onAdd }) => (
  <Box
    sx={{
      justifyContent: "center",
      margin: "auto",
    }}
  >
    <Table
      headers={memberListHeaders}
      rows={list}
      heading={<Heading title="Member List" />}
      pagination={pagination}
    />
  </Box>
);

export default ClassList;
