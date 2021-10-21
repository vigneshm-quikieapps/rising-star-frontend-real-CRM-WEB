import { useParams } from "react-router";
import {
  Card,
  CardRow,
  HeadingText,
  SubHeadingText,
} from "../../components/common";
import { Box, MenuItem } from "@mui/material";
import TextField from "../../components/textfield";
import CustomTable from "../../components/table";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ImgIcon from "../../components/img-icon";
import IconButton from "../../components/icon-button";
import moreIcon from "../../assets/icons/icon-more.png";
import { objectToArray } from "../../utils";
import {
  attendanceObject1,
  enrollmentHeaders,
  enrollmentObject2,
} from "../../helper/constants";
import { Outputs } from "../../containers/outputs";
import Pagination from "./../../components/pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMembersEnrolledInASession } from "../../redux/action/sessionAction";
import verfiedIcon from "../../assets/icons/icon-allergy.png";
import BasicModal from "../../containers/modal/modal";
const MoreIconButton = () => (
  <IconButton>
    <ImgIcon alt="more">{moreIcon}</ImgIcon>
  </IconButton>
);

const UpIconButton = () => (
  <IconButton sx={{ marginRight: "10px" }}>
    <KeyboardArrowUpIcon />
  </IconButton>
);

const ClassEnrolments = () => {
  const allMembers = useSelector((state) => state.sessions.allMembersEnrolled);
  const { id } = useParams();
  const [page, setPage] = useState(allMembers.page);
  const [pages] = useState(allMembers.totalPages);
  const [tableRowData, setTableRowData] = useState([]);
  const dispatch = useDispatch();

  const pagination = (
    <Pagination
      count={pages}
      page={page}
      onChange={(event, value) => setPage(value)}
    />
  );
  const heading = (
    <CardRow
      sx={{
        margin: "10px 20px",
      }}
    >
      <HeadingText>Members</HeadingText>
      <CardRow>
        <UpIconButton />
        <MoreIconButton />
      </CardRow>
    </CardRow>
  );

  const arr1 = objectToArray(attendanceObject1);
  const arr2 = objectToArray(enrollmentObject2);

  const setTableRows = () => {
    let sessionMembersDetailsArray = allMembers.docs.map((item) => {
      return {
        name: item.member.name,
        allergies: item.memberConsent.consent.allergies,
        conditions: item.memberConsent.consent.condition,
        startDate: item.startDate ? item.startDate : "N/A",
        enrolledDate: item.registeredDate ? item.registeredDate : "N/A",
        enrolledStatus: item.enrolledStatus,
        discontinuationReason: item.discontinuationReason,
        droppedDate: item.droppedDate ? item.droppedDate : "N/A",
      };
    });
    let finalRowDataArray = sessionMembersDetailsArray.map((item, index) => {
      let itemArray = objectToArray(item);
      return {
        id: index,
        items: itemArray.map((i) => {
          if (i[0] === "allergies" || i[0] === "conditions") {
            return <ImgIcon alt="verify">{verfiedIcon}</ImgIcon>;
          }
          return i[1];
        }),
      };
    });
    setTableRowData(finalRowDataArray);
  };

  useEffect(() => {
    dispatch(getAllMembersEnrolledInASession(id));
  }, [dispatch, id]);

  useEffect(() => {
    allMembers && allMembers.docs && setTableRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMembers]);

  return (
    <Box>
      <BasicModal />
      <Card>
        <CardRow>
          <HeadingText>Pre-school gymnastics (Age: 1-3)</HeadingText>
        </CardRow>

        <SubHeadingText>Zippy Totz Pre-school Gymnastics</SubHeadingText>

        <CardRow>
          <Outputs arr={arr1} />
        </CardRow>
      </Card>

      <Card sx={{ height: "249px" }}>
        <CardRow sx={{ justifyContent: "flex-start" }}>
          <TextField
            select
            id="demo-simple-select"
            value={10}
            label="Term"
            onChange={() => {}}
            variant="filled"
            sx={{ width: "272px", marginRight: "15px" }}
          >
            <MenuItem value={10}>2022 Summer</MenuItem>
            <MenuItem value={20}>Mon, 9:30 am to 11:30 am</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>

          <TextField
            select
            label="Session"
            id="demo-simple-select"
            value={20}
            onChange={() => {}}
            variant="filled"
            sx={{ width: "272px" }}
          >
            <MenuItem value={10}>2022 Summer</MenuItem>
            <MenuItem value={20}>Mon, 9:30 am to 11:30 am</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
        </CardRow>

        <CardRow
          sx={{
            marginTop: "15px",
            justifyContent: "flex-start",
          }}
        >
          <Outputs arr={arr2} />
        </CardRow>
      </Card>

      <CustomTable
        heading={heading}
        headers={enrollmentHeaders}
        rows={tableRowData}
        pagination={pagination}
      />
    </Box>
  );
};

export default ClassEnrolments;
