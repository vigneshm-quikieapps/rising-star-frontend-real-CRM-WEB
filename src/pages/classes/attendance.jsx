import { useParams } from "react-router";

const ClassAttendance = () => {
  const { id } = useParams();
  return <>class attendance for class id {id}</>;
};

export default ClassAttendance;
