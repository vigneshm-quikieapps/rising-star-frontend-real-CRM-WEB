import { useParams } from "react-router";

const MemberInfo = () => {
  const { id } = useParams();
  return <>Member info for member id {id}</>;
};

export default MemberInfo;
