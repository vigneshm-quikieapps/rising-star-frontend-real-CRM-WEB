import { useParams } from "react-router";

const ClassEnrolments = () => {
  const { id } = useParams();
  return <>class enrollments for class id {id}</>;
};

export default ClassEnrolments;
