import { useParams } from "react-router";

const ClassPayments = () => {
  const { id } = useParams();
  return <>class payments for class id {id}</>;
};

export default ClassPayments;
