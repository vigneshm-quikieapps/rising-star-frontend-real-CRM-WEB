import { useParams } from "react-router";
import { useState } from "react";
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
import DatePicker from "./../../components/date-picker";
import ImgIcon from "../../components/img-icon";
import IconButton from "../../components/icon-button";
import moreIcon from "../../assets/icons/icon-more.png";
import { objectToArray } from "../../utils";
import { Outputs, TitleDescription } from "../../containers/outputs";
import {
  attendanceRows,
  // attendanceHeaders,
  attendanceObject1,
  attendanceObject2,
} from "../../helper/constants";
import Pagination from "./../../components/pagination";

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

const ClassAttendance = () => {
  const { id } = useParams();
  console.log(id);
  const [date, setDate] = useState(new Date("2014-08-18T21:11:54"));
  const [page, setPage] = useState(1);
  const pagination = (
    <Pagination
      count={3}
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
      <HeadingText>Registered Members</HeadingText>
      <CardRow>
        <UpIconButton />
        <MoreIconButton />
      </CardRow>
    </CardRow>
  );

  const arr1 = objectToArray(attendanceObject1);
  const arr2 = objectToArray(attendanceObject2);

  return (
    <Box>
      <Card>
        <CardRow>
          <HeadingText>Pre-school gymnastics (Age: 1-3)</HeadingText>
          <MoreIconButton />
        </CardRow>

        <SubHeadingText>Zippy Totz Pre-school Gymnastics</SubHeadingText>

        <CardRow>
          <Outputs arr={arr1} />
        </CardRow>
      </Card>

      <Card sx={{ height: "194px" }}>
        <CardRow>
          <TextField
            select
            id="demo-simple-select"
            value={10}
            label="Term"
            onChange={() => {}}
            variant="filled"
            sx={{ width: "272px" }}
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

          <DatePicker
            label="Date"
            date={date}
            onChange={(newDate) => setDate(newDate)}
            sx={{ width: "272px" }}
          />
        </CardRow>

        <CardRow
          sx={{
            marginTop: "15px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <Outputs arr={arr2} />
        </CardRow>
      </Card>

      <CardRow sx={{ margin: "5px 0", justifyContent: "flex-start" }}>
        <TitleDescription
          title={"Last Updated by"}
          description={"Bethany Lafferty"}
        />
        <TitleDescription
          title={"Last Updated at"}
          description={"13/09/2021 9:32 am"}
        />
      </CardRow>
      <CustomTable
        heading={heading}
        // headers={attendanceHeaders}
        // rows={attendanceRows}
        pagination={pagination}
      />
    </Box>
  );
};

export default ClassAttendance;
