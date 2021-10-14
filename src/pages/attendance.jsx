import Output from "../components/output";
import Status from "../components/status";
import Card from "./../containers/card";
import { Typography, Box, MenuItem, Pagination, Button } from "@mui/material";
import { Select, FormControl } from "../components/drop-down";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { InputLabel } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StyledTexField from "../components/text-field";
import { useState } from "react";
import CustomTable from "../components/table";
import { Phone } from "@mui/icons-material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TitleDescription = ({ title, description }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", marginRight: "20px" }}>
      <Typography
        sx={{
          width: "94px",
          height: "16px",
          margin: "2px 0px 1px 0",
          opacity: 0.5,
          fontFamily: "Manrope",
          fontSize: "12px",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.33,
          letterSpacing: "normal",
          color: "#000",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          //   width: "108px",
          height: "19px",
          margin: "0 0 0 5px",
          fontFamily: "Manrope",
          fontSize: "14px",
          fontWeight: "normal",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "normal",
          letterSpacing: "normal",
          color: "#000",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

const Attendance = () => {
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const rows = [
    {
      id: 1,
      items: [
        "Ayman Mogal",
        <Phone>+911234567890</Phone>,
        <Phone>+911234567890</Phone>,
        <VerifiedUserIcon />,
        <VerifiedUserIcon />,
        <Status status="green" title="Paid" />,
        "09/08/2021",
        "Yes",
        "No",
        "Took a day off yester…",
      ],
    },
    {
      id: 2,
      items: [
        "Ayman Mogal",
        <Phone>+911234567890</Phone>,
        <Phone>+911234567890</Phone>,
        <VerifiedUserIcon />,
        <VerifiedUserIcon />,
        <Status status="green" title="Paid" />,
        "09/08/2021",
        "Yes",
        "No",
        "Took a day off yester…",
      ],
    },
    {
      id: 3,
      items: [
        "Ayman Mogal",
        <Phone>+911234567890</Phone>,
        <Phone>+911234567890</Phone>,
        <VerifiedUserIcon />,
        <VerifiedUserIcon />,
        <Status status="green" title="Paid" />,
        "09/08/2021",
        "Yes",
        "No",
        "Took a day off yester…",
      ],
    },
    {
      id: 4,
      items: [
        "Ayman Mogal",
        <Phone>+911234567890</Phone>,
        <Phone>+911234567890</Phone>,
        <VerifiedUserIcon />,
        <VerifiedUserIcon />,
        <Status status="green" title="Paid" />,
        "09/08/2021",
        "Yes",
        "No",
        "Took a day off yester…",
      ],
    },
  ];
  const pagination = <Pagination count={5} page={2} onChange={() => {}} />;
  const heading = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 20px",
      }}
    >
      <div>
        <Typography
          sx={{
            // width: "605px",
            height: "38px",
            margin: "10px 193px 6px 0",
            fontFamily: "Manrope",
            fontSize: "28px",
            fontWeight: "bold",
            fontStretch: "normal",
            fontStyle: "normal",
            lineHeight: "normal",
            letterSpacing: "0.2px",
            color: "#000",
          }}
        >
          Registered Members
        </Typography>
      </div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            width: "52px",
            height: "48px",
            margin: "1px 10px 0 68px",
            padding: " 21px 20px",
            borderRadius: "12px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0)",
            border: "solid 1px #e9e7f1",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <KeyboardArrowUpIcon />
        </Box>
        <Box
          sx={{
            width: "52px",
            height: "48px",
            //   margin: "1px 0 0 10px",
            padding: "22px 15px",
            borderRadius: "12px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0)",
            border: "solid 1px #e9e7f1",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MoreHorizIcon />
        </Box>
      </Box>
    </Box>
  );
  const headers = [
    "Name",
    "Parent Contact",
    "EC Contact",
    "Allergies",
    "Conditions",
    "Payment Status",
    "Start Date",
    "Attended",
    "No Show",
    "Comments",
  ];
  return (
    <Box>
      <Card
        heading={"Pre-school gymnastics (Age: 1-3)"}
        subHeading={"Zippy Totz Pre-school Gymnastics"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="Class ID" description="DL39020458" variant="title" />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="City / Town" description="Glasgow" variant="title" />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="Post Code" description="G46 7TL" variant="title" />
          </Box>

          <Box
            sx={{
              width: "25%",
            }}
          >
            <Box>
              <Typography
                sx={{
                  width: "195px",
                  height: "16px",
                  opacity: 0.5,
                  fontFamily: "Manrope",
                  fontSize: "12px",
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: 1.33,
                  letterSpacing: "normal",
                  color: "#000",
                }}
              >
                Status
              </Typography>
              <Status status="green" title="Active" />
            </Box>
          </Box>
        </Box>
      </Card>

      <Card height={"194px"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box width={"90%"} sx={{ marginRight: "20px" }}>
            <FormControl variant="filled">
              <InputLabel>Session</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={10}
                label="Session"
                onChange={() => {}}
                variant="filled"
              >
                <MenuItem value={10}>2022 Summer</MenuItem>
                <MenuItem value={20}>Mon, 9:30 am to 11:30 am</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width={"90%"} sx={{ marginRight: "20px" }}>
            <FormControl variant="filled">
              <InputLabel>Term</InputLabel>
              <Select
                id="demo-simple-select"
                value={20}
                onChange={() => {}}
                variant="filled"
              >
                <MenuItem value={10}>2022 Summer</MenuItem>
                <MenuItem value={20}>Mon, 9:30 am to 11:30 am</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box width={"90%"} sx={{ marginRight: "20px" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <StyledTexField variant="filled" {...params} />
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "15px",
          }}
        >
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="Start Time" description="9:30 am" variant="title" />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="End Time" description="11:30 am" variant="title" />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="Facility" description="Gym Hall" variant="title" />
          </Box>

          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output
              title="Coach Name"
              description="Bethany Lafferty"
              variant="title"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: "15px",
          }}
        >
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="Pattern" description="Mon" variant="title" />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output
              title="Full class capacity"
              description="20"
              variant="title"
            />
          </Box>
          <Box
            sx={{
              width: "25%",
            }}
          >
            <Output title="Enrolled" description="15" variant="title" />
          </Box>

          <Box
            sx={{
              width: "25%",
            }}
          ></Box>
        </Box>
      </Card>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "5px 0" }}>
        <TitleDescription
          title={"Last Updated by"}
          description={"Bethany Lafferty"}
        />
        <TitleDescription
          title={"Last Updated at"}
          description={"13/09/2021 9:32 am"}
        />
      </Box>
      <CustomTable
        heading={heading}
        headers={headers}
        rows={rows}
        pagination={pagination}
      />
    </Box>
  );
};

export default Attendance;
