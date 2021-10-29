import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddEditClassModal from "../../containers/modal/add-edit-class-modal";
import useQuery from "../../hooks/useQuery";

const ClassAddEdit = () => {
  const { id } = useParams();
  const query = useQuery();
  const classList = useSelector((state) => state.classes.classList);

  const [classObj, setClassObj] = useState({});

  useEffect(() => {
    let isEdit = query.get("edit") === "true" ? true : false;
    if (isEdit) {
      let classObj = classList.find((item) => item._id === id);
      setClassObj(classObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classList]);
  return (
    <>
      <AddEditClassModal
        isEditMode={query.get("edit") === "true" ? true : false}
        classObj={classObj}
      />
    </>
  );
};

export default ClassAddEdit;
