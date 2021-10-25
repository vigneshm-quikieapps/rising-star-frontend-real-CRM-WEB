import { useParams } from "react-router-dom";

import TabNav from "../../../components/tabular-navigation";

const TopNav = () => {
  const { id: memberId } = useParams();
  const pathTo = (path) => "/members/" + path + "/" + memberId;

  const items = [
    {
      id: 1,
      title: "Personal Info",
      to: pathTo("info"),
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
      title: "Consent Record",
      to: pathTo("consent"),
      exact: false,
    },
    {
      id: 4,
      title: "Evaluations",
      to: pathTo("evaluations"),
      exact: false,
    },
    {
      id: 5,
      title: "Finance Record",
      to: pathTo("finance"),
      exact: false,
    },
  ];
  return <TabNav items={items} />;
};

export default TopNav;
