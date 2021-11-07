import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  TextField,
  TableMui,
  Outputs,
  Accordion,
  Pagination,
  Status,
} from "../../components";

import { getTermsOfClass } from "../../redux/action/terms-actions";
import {
  getClassSessionsByTermId,
  getAttendanceOfSessionByDate,
} from "../../redux/action/sessionAction";

const Attendance = () => {
  const dispatch = useDispatch();
  const { id: classId } = useParams();
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState("");

  useEffect(() => {
    dispatch(getTermsOfClass(classId));
  }, [dispatch, classId]);

  useEffect(() => {
    selectedTerm && dispatch(getClassSessionsByTermId(selectedTerm));
  }, [dispatch, selectedTerm]);
  return <></>;
};

export default Attendance;
