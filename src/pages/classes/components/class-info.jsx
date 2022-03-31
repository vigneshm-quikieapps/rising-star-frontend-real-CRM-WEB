import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassById } from "../../../redux/action/class-actions";

import {
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../../../components/common";
import { Outputs } from "../../../components";
import toPascal from "../../../utils/to-pascal";

const ClassInfo = () => {
  const dispatch = useDispatch();
  const classObj = useSelector((state) => state.classes.class);
  const { id } = useParams();

  const {
    name,
    status,
    business: { city, postcode, name: businessName },
  } = classObj;
  const items = {
    "City / Town": toPascal(city),
    "Post Code": postcode,
    status: toPascal(status),
  };

  useEffect(() => {
    dispatch(getClassById(id));
  }, [dispatch, id]);

  return name ? (
    <Card>
      <CardRow>
        <HeadingText>{name}</HeadingText>
      </CardRow>
      <SubHeadingText>{businessName}</SubHeadingText>
      <CardRow>
        <Outputs items={items} columnCount={3} />
      </CardRow>
    </Card>
  ) : null;
};

export default ClassInfo;
