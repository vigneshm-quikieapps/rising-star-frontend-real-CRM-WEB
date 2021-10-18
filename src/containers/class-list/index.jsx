// It's just for demonstration purposes
// Do not use it in production
import { Box } from "@mui/material";

import { classListHeaders } from "../../helper/constants";
import CustomTable from "../../components/table";
import CustomPagination from "../../components/pagination";
import Heading from "./heading";

const rows = Array(10)
  .fill(1)
  .map((_, index) => ({
    id: index,
    items: [
      "Jannifer Reid",
      "Boy",
      "Afonso Pinto",
      "ni@gmail.com",
      "075757532",
    ],
  }));

const pagination = <CustomPagination count={3} page={2} variant="outlined" />;

const ClassList = ({ list = rows }) => (
  <Box
    sx={{
      justifyContent: "center",
      maxWidth: 880,
      margin: "auto",
    }}
  >
    <CustomTable
      headers={classListHeaders}
      rows={list}
      heading={<Heading title="Class List" />}
      pagination={pagination}
    />
  </Box>
);

export default ClassList;
