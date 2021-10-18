import { useParams } from "react-router";

const ClassDefinitions = () => {
  const { id } = useParams();
  return <>class definition for class id {id}</>;
};

export default ClassDefinitions;
