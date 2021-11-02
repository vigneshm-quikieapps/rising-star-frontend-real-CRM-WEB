import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddEditClassModal from "../../containers/modal/add-edit-class-modal";
import useQuery from "../../hooks/useQuery";

const ClassAddEdit = () => {
  const query = useQuery();
  const classList = useSelector((state) => state.classes.classList);
  const classObj = useSelector((state) => state.classes.class);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const isEdit = query.get("edit") === "true" ? true : false;
    setIsEditMode(isEdit);
  }, [classList, query]);

  return (
    <>
      <AddEditClassModal isEditMode={isEditMode} classObj={classObj} />
    </>
  );
};

export default ClassAddEdit;
