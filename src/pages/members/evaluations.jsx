import { useParams } from "react-router";

const MemberEvaluations = () => {
  const { id } = useParams();
  return <>Member evaluations for member id {id}</>;
};

export default MemberEvaluations;
