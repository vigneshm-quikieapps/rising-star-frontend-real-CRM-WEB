import { useState, useEffect } from "react";
import { getDateForDashBoard } from "../services/billingServices";
import { useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { AccordionSummary, Box, MenuItem, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionContainer,
  Card,
  CardRow,
  DashboardCard,
  TextField,
} from "../components";
import DateRange from "../containers/popovers/date-range-selector";
const monthLiterals = Object.freeze({
  JAN: "January",
  FEB: "Feburary",
  MAR: "March",
  APR: "April",
  MAY: "May",
  JUN: "June",
  JUL: "July",
  AUG: "August",
  SEP: "September",
  OCT: "October",
  NOV: "November",
  DEC: "December",
});
const memberData = [
  {
    name: "Jan",
    active: 4000,
    drops: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    active: 3000,
    drops: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    active: 2000,
    drops: 9800,
    amt: 2290,
  },
];

const Status = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: props.color,
        width: "8px",
        height: "8px",
        margin: "0px 7px 0px 0",
        borderRadius: "2px",
      }}
    ></Box>
  );
};

const Dashboard = () => {
  const [anchorElPayment, setAnchorElPayment] = useState(null);
  const [anchorElMember, setAnchorElMember] = useState(null);
  const [paymentChartData, setPaymentChartData] = useState([]);

  const [dateSelection, setDateSelection] = useState({
    startDate: "",
    endDate: "",
  });

  const [monthRange, setMonthRange] = useState({
    startMonth: "",
    endMonth: "",
  });

  const [paymentData, setPaymentData] = useState({
    month: "",
    paidBills: "",
    unPaidBills: "",
    totalPaidAmount: "",
    totalUnPaidAmount: "",
  });

  const setLastMonthData = (payList) => {
    var monthData = payList[payList.length - 1];
    setPaymentData((paymentData) => ({
      ...paymentData,
      month: monthLiterals[monthData.name],
      paidBills: monthData.paidBills,
      unPaidBills: monthData.unPaidBills,
      totalPaidAmount: monthData.received,
      totalUnPaidAmount: monthData.notReceived,
    }));
  };

  const businessesList = useSelector((state) => state.businesses.businessList);
  const businessId = businessesList.length > 0 ? businessesList[0]._id : "";
  const closePaymentDateRange = () => {
    setAnchorElPayment(null);
  };

  const openPaymentDateRange = (event) => {
    setAnchorElPayment(event.currentTarget);
  };

  const closeMemberDateRange = () => {
    setAnchorElMember(null);
  };

  const openMemberDateRange = (event) => {
    setAnchorElMember(event.currentTarget);
  };
  const getEndDate = (date) => {
    let today = new Date();
    let endDate = date
      ? new Date(date.getFullYear(), date.getMonth() + 1, 0)
      : new Date(today.getFullYear(), today.getMonth(), 0);
    var temp = endDate.toLocaleDateString().split("/");
    endDate = [temp[2], temp[0], temp[1]].join("-");
    return endDate;
  };

  const getStartDate = (date) => {
    let today = new Date();
    let startDate = date
      ? new Date(date.getFullYear(), date.getMonth())
      : new Date(today.getFullYear(), today.getMonth() - 2);
    var temp = startDate.toLocaleDateString().split("/");
    startDate = [temp[2], temp[0], temp[1]].join("-");
    return startDate;
  };

  useEffect(() => {
    if (businessId) {
      let endDate = dateSelection?.endDate || getEndDate();
      let startDate = dateSelection?.startDate || getStartDate();
      setMonthRange((monthRange) => ({
        ...monthRange,
        startMonth: new Date(startDate).toLocaleString("default", {
          month: "short",
        }),
        endMonth: new Date(endDate).toLocaleString("default", {
          month: "short",
        }),
      }));

      getDateForDashBoard({
        startDate: startDate,
        endDate: endDate,
        businessId: businessId,
      }).then(function (data) {
        if (data.length) {
          setPaymentChartData(data);
          setLastMonthData(data);
        }
      });
    }
  }, [businessId, dateSelection]);

  return (
    <Box sx={{ marginBottom: "100px" }}>
      <Box>
        <Typography variant="h2" sx={{ fontSize: "28px", fontWeight: "bold" }}>
          Dashboard
        </Typography>
        <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
          Manage your business here
        </Typography>
      </Box>
      <AccordionContainer>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Zippy Totz</Typography>
              <Typography sx={{ opacity: 0.5, fontSize: "14px !important" }}>
                Glasgow
              </Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
      </AccordionContainer>
      <CardRow sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
        <DashboardCard>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              PAYERS
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {paymentData.month}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              {paymentData.paidBills}
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
              Paid Members
            </Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              {paymentData.unPaidBills}
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
              Not Paid Members
            </Typography>
          </Box>
        </DashboardCard>
        <DashboardCard>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              PAYMENT
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              {paymentData.month}
            </Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              £{paymentData.totalPaidAmount}
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
              Paid
            </Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              £{paymentData.totalUnPaidAmount}
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
              Not Paid
            </Typography>
          </Box>
        </DashboardCard>

        <DashboardCard>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              ENROLMENT
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>Active Members</Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              700
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
              Members Active
            </Typography>
          </Box>
        </DashboardCard>

        <DashboardCard>
          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              ENROLMENT
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>In-active Members</Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              100
            </Typography>
            <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
              Members In-active
            </Typography>
          </Box>
        </DashboardCard>
      </CardRow>

      <CardRow sx={{ marginTop: "10px" }}>
        {/* payment section */}
        <Card sx={{ width: "auto" }}>
          <CardRow sx={{ marginBottom: "15px" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                PAYMENT
              </Typography>
              <CardRow sx={{ justifyContent: "flex-start" }}>
                <Status color={"#f1383c"} />
                <Typography sx={{ opacity: 0.5, fontSize: "14px" }}>
                  Received payments
                </Typography>
              </CardRow>
              <CardRow sx={{ justifyContent: "flex-start" }}>
                <Status color={"#beb8d8"} />
                <Typography sx={{ opacity: 0.5, fontSize: "14px" }}>
                  Not Received payments
                </Typography>
              </CardRow>
            </Box>

            <Box onClick={openPaymentDateRange}>
              <TextField
                select
                value={"jan-mar"}
                onChange={() => {}}
                sx={{ width: "116px" }}
                disabled
              >
                <MenuItem value="jan-mar">
                  {monthRange.startMonth}-{monthRange.endMonth}
                </MenuItem>
              </TextField>
            </Box>
          </CardRow>

          <LineChart
            width={500}
            height={300}
            data={paymentChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              name="Received"
              type="monotone"
              dataKey="received"
              stroke="#f1383c"
              activeDot={{ r: 8 }}
            />
            <Line
              name="Not Received"
              type="monotone"
              dataKey="notReceived"
              stroke="#beb8d8"
            />
          </LineChart>
        </Card>

        {/* member section */}

        <Card sx={{ width: "auto" }}>
          <CardRow sx={{ marginBottom: "15px", width: "100%" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                MEMBER
              </Typography>
              <CardRow sx={{ justifyContent: "flex-start" }}>
                <Status color={"#f1383c"} />
                <Typography sx={{ opacity: 0.5, fontSize: "14px" }}>
                  Active
                </Typography>
              </CardRow>
              <CardRow sx={{ justifyContent: "flex-start" }}>
                <Status color={"#beb8d8"} />
                <Typography sx={{ opacity: 0.5, fontSize: "14px" }}>
                  Drops
                </Typography>
              </CardRow>
            </Box>

            <Box onClick={openMemberDateRange}>
              <TextField
                select
                value={"Jan-mar"}
                onChange={() => {}}
                disabled
                sx={{ width: "116px" }}
              >
                <MenuItem value="Jan-mar">Jan-mar</MenuItem>
              </TextField>
            </Box>
          </CardRow>
          <LineChart
            width={500}
            height={300}
            data={memberData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="drops"
              stroke="#f1383c"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="active" stroke="#beb8d8" />
          </LineChart>
        </Card>
      </CardRow>

      <DateRange
        onChange={(fromDate, toDate) => {
          closePaymentDateRange();
          setDateSelection((dateSelection) => ({
            ...dateSelection,
            startDate: getStartDate(fromDate),
            endDate: getEndDate(toDate),
          }));
        }}
        title={"PAYMENT"}
        anchorEl={anchorElPayment}
        handleClose={closePaymentDateRange}
        year={"2021"}
      />

      <DateRange
        onChange={(startDate, endDate) => {
          console.log(startDate, endDate);
        }}
        title={"MEMBER"}
        anchorEl={anchorElMember}
        handleClose={closeMemberDateRange}
        year={"2021"}
      />
    </Box>
  );
};

export default Dashboard;
