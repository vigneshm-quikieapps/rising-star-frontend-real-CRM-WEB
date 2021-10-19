import { useParams } from "react-router";
import useQuery from "../../hooks/useQuery";

const ClassAddEdit = () => {
  const { id } = useParams();
  const query = useQuery();
  return (
    <>
      id: {id}
      <br /> edit:{query.get("edit") === "true" ? "true" : "false"}
    </>
  );
};

export default ClassAddEdit;
