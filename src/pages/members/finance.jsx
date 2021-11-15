import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "@mui/material";

import { Grid, TextField, Output, Button } from "../../components";
import { Card, HeadingText, SubHeadingText } from "../../components/common";
import ClassList from "./components/class-list";

import { getClassList } from "../../redux/action/class-actions";

const MemberFinance = () => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.members.currentMember || {});
  const businessList = useSelector((state) => state.businesses.businessList);
  const classList = useSelector((state) => state.classes.classList);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showClassList, setShowClassList] = useState(false);

  const classSelectHandler = (id) => {
    setShowClassList(false);
    setSelectedClass(id);
  };

  const clubMembershipId = useMemo(() => {
    const list = member?.membership;
    const membership = list?.find(
      (mShip) => mShip.businessId === selectedBusiness
    );
    return membership?.clubMembershipId || "";
  }, [member, selectedBusiness]);

  const currentClass = useMemo(() => {
    const classObj = classList.find(({ _id }) => _id === selectedClass);
    return classObj || {};
  }, [classList, selectedClass]);

  useEffect(() => {
    businessList.length && setSelectedBusiness(businessList[0]._id);
    dispatch(getClassList());
  }, [dispatch, businessList]);

  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);

  return (
    <>
      <Card>
        <HeadingText>{member.name}</HeadingText>
        <SubHeadingText>Student/Member</SubHeadingText>
        <Grid>
          <Output
            title="Club Membership Number"
            description={clubMembershipId}
          />
          <TextField
            select
            variant="filled"
            label="Business Name"
            value={selectedBusiness}
            onChange={businessChangeHandler}
            sx={{ gridColumn: "1" }}
          >
            {businessList.map(({ _id, name }) => {
              return (
                <MenuItem key={_id} value={_id}>
                  {name}
                </MenuItem>
              );
            })}
          </TextField>
          <Button onClick={() => setShowClassList(true)}>
            {selectedClass ? "Select Another Class" : "Select a Class"}
          </Button>
          <Output title="Class Name" description={currentClass.name} />
        </Grid>
      </Card>
      <ClassList
        open={showClassList}
        list={classList || []}
        onSelect={classSelectHandler}
      />
    </>
  );
};

export default MemberFinance;
