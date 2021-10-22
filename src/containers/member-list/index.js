// It's just for demonstration purposes
// Do not use it in production
import { Box } from "@mui/material";

import { memberListHeaders } from "../../helper/constants";
import CustomTable from "../../components/table";
import CustomPagination from "../../components/pagination";
import Heading from "../class-list/heading";



const pagination = <CustomPagination count={3} page={2} variant="outlined" />;

const AdvanceSearchList = ({  row }) => (

  <Box
    sx={{
      justifyContent: "center",
      maxWidth: 880,
      margin: "auto",
    }}
  >
    <CustomTable
      headers={memberListHeaders}
      rows={row}
      heading={<Heading title="Class List" />}
      pagination={pagination}
    />
  </Box>
);

export default AdvanceSearchList;
