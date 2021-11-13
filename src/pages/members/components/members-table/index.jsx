import { Box } from "@mui/material";

import { memberListHeaders } from "../../../../helper/constants";
import { Table } from "../../../../components";
import Heading from "./heading";

const MemberList = ({ list = [], pagination, onAdd }) => (
  <Box
    sx={{
      justifyContent: "center",
      margin: "auto",
    }}
  >
    <Table
      headers={memberListHeaders}
      rows={list}
      heading={<Heading title="Member List" action={onAdd} />}
      pagination={pagination}
    />
  </Box>
);

export default MemberList;
