// It's just for demonstration purposes
// Do not use it in production

import { classListHeaders } from "../../helper/constants";
import CustomTable from "../../components/table";
import CustomPagination from "../../components/pagination";
import Actions from "../../components/actions";
import Status from "../../components/status";
import Heading from "./heading";

const rows = Array(10)
  .fill(1)
  .map((_, index) => ({
    id: index,
    items: [
      "Pre-school gymnastics",
      "Zippy Totz Pre-school Gymnastics",
      "Glasgow",
      "G46 7TL",
      <Status status="green" title="Active" />,
      <Actions />,
    ],
  }));

const pagination = (
  <CustomPagination count={3} activePage={2} variant="outlined" />
);

const ClassList = ({ list = rows }) => (
  <CustomTable
    headers={classListHeaders}
    rows={list}
    heading={<Heading title="Class List" />}
    pagination={pagination}
  />
);

export default ClassList;