import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import AddEditClassModal from "../../containers/modal/add-edit-class-modal";
import useQuery from "../../hooks/useQuery";

const ClassAddEdit = () => {
  const { id } = useParams();
  const query = useQuery();
  const [isEditMode, setIsEditMode] = useState("false");

  useEffect(() => {
    setIsEditMode(query.get("edit") === "true" ? "true" : "false");

    return () => {
      setIsEditMode("");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <AddEditClassModal isEditMode={isEditMode} classId={id} />
    </>
  );
};

export default ClassAddEdit;
