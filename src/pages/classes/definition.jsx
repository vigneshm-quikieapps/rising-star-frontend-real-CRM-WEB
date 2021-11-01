import { useParams } from "react-router";

const ClassDefinition = () => {
  const { id } = useParams();
  return <>class definition for class id {id}</>;
};

export default ClassDefinition;
