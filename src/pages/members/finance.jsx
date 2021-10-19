import { useParams } from "react-router";

const MemberFinance = () => {
  const { id } = useParams();
  return <>Member finance records for member id {id}</>;
};

export default MemberFinance;
