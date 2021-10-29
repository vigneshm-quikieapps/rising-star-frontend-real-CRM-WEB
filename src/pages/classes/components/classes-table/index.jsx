// It's just for demonstration purposes
// Do not use it in production
import { Box } from "@mui/material";

import { classListHeaders } from "../../../../helper/constants";
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
      headers={classListHeaders}
      rows={list}
      heading={<Heading title="Class List" action={onAdd} />}
      pagination={pagination}
    />
  </Box>
);

export default ClassList;
