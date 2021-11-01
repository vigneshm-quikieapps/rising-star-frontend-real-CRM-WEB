import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassById } from "../../../redux/action/class-actions";

import {
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../../../components/common";
import { Outputs } from "../../../components";

const ClassInfo = ({ id }) => {
  const dispatch = useDispatch();
  const classObj = useSelector((state) => state.classes.class);
  const {
    name,
    status,
    business: { city, postcode, name: businessName },
  } = classObj;
  const items = { "City / Town": city, "Post Code": postcode, status };

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
        <Outputs items={items} />
      </CardRow>
    </Card>
  ) : null;
};

export default ClassInfo;
