import { useEffect } from "react";
import { useSelector } from "react-redux";
import AddEditClassModal from "../../containers/modal/add-edit-class";
import useQuery from "../../hooks/useQuery";

const ClassAddEdit = () => {
  const query = useQuery();
  const classList = useSelector((state) => state.classes.classList);
  const classObj = useSelector((state) => state.classes.class);

  const isEdit = query.get("edit") === "true" ? true : false;

  useEffect(() => {}, [classList]);

  return (
    <>
      <AddEditClassModal isEditMode={isEdit} classObj={classObj} />
    </>
  );
};

export default ClassAddEdit;
