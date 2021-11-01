import { useState, useEffect } from "react";

import useQuery from "../../hooks/useQuery";

const AddEdit = () => {
  const query = useQuery();
  const [isEdit, setIsEdit] = useState();

  useEffect(() => {
    const isEdit = query.get("edit") === "true" ? true : false;
    setIsEdit(isEdit);
  }, [query]);
};

export default AddEdit;
