import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AddEditClassModal from "../../containers/modal/add-edit-class-modal";
import useQuery from "../../hooks/useQuery";
import { getClassById } from "../../redux/action/class-actions";

const ClassAddEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const query = useQuery();
  const classList = useSelector((state) => state.classes.classList);
  const classObj = useSelector((state) => state.classes.class);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    id && dispatch(getClassById(id));
  }, [dispatch, id]);

  useEffect(() => {
    const isEdit = query.get("edit") === "true" ? true : false;
    setIsEdit(isEdit);
  }, [classList, query]);

  return (
    <>
      <AddEditClassModal isEditMode={isEdit} classObj={classObj} />
    </>
  );
};

export default ClassAddEdit;
