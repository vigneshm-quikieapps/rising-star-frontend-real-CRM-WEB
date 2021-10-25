import { useParams } from "react-router-dom";

import TabNav from "../../../components/tabular-navigation";

const TopNav = () => {
  const { id: classId } = useParams();
  const pathTo = (path) => "/classes/" + path + "/" + classId;

  const items = [
    {
      id: 1,
      title: "Definition",
      to: pathTo("definition"),
      exact: false,
    },
    {
      id: 2,
      title: "Enrolments",
      to: pathTo("enrolments"),
      exact: false,
    },
    {
      id: 3,
      title: "Attendance",
      to: pathTo("attendance"),
      exact: false,
    },
    {
      id: 4,
      title: "Payments",
      to: pathTo("payments"),
      exact: false,
    },
  ];
  return <TabNav items={items} />;
};

export default TopNav;
