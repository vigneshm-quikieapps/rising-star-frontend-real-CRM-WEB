import { useParams } from "react-router";

const MemberConsent = () => {
  const { id } = useParams();
  return <>Member consent records for member id {id}</>;
};

export default MemberConsent;
