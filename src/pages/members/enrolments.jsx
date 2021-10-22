import { useParams } from "react-router";

const MemberEnrolment = () => {
  const { id } = useParams();
  return <>Member enrolment records for member id {id}</>;
};

export default MemberEnrolment;
