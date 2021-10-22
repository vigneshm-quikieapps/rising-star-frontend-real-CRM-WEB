// It's just for demonstration purposes
// Do not use it in production
import { Box } from "@mui/material";

import { classListHeaders } from "../../helper/constants";
import CustomTable from "../../components/table";
import Heading from "./heading";

// const rows = Array(10)
//   .fill(1)
//   .map((_, index) => ({
//     id: index,
//     onClick: () => console.log("row clicked"),
//     items: [
//       "Pre-school gymnastics",
//       "Zippy Totz Pre-school Gymnastics",
//       "Glasgow",
//       "G46 7TL",
//       <Status status="green" title="Active" />,
//       <Actions />,
//     ],
//   }));

const ClassList = ({ list = [], pagination, onAdd }) => (
  <Box
    sx={{
      justifyContent: "center",
      margin: "auto",
    }}
  >
    <CustomTable
      headers={classListHeaders}
      rows={list}
      heading={<Heading title="Class List" action={onAdd} />}
      pagination={pagination}
    />
  </Box>
);

export default ClassList;
