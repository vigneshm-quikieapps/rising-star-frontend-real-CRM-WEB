import { useState, useEffect } from "react";
import {
  getPaymentChartData,
  getEnrolmentStatus,
  getMembersChartData,
} from "../services/billingServices";
import { useSelector } from "react-redux";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  AccordionSummary,
  AccordionDetails,
  Box,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionContainer,
  Card,
  CardRow,
  DashboardCard,
  TextField,
  WarningDialog,
} from "../components";
import DateRange from "../containers/popovers/date-range-selector";
const monthLiterals = Object.freeze({
  JAN: "January",
  FEB: "February",
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
  const [membersChartData, setMembersChartData] = useState([]);

  const [paymentDateSelection, setPaymentDateSelection] = useState({
    startDate: "",
    endDate: "",
  });
  const [paymentMonthRange, setPaymentMonthRange] = useState({
    startMonth: "",
    endMonth: "",
  });

  const [membersDateSelection, setMembersDateSelection] = useState({
    startDate: "",
    endDate: "",
  });

  const [membersMonthRange, setMembersMonthRange] = useState({
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
  const [enrolmentData, setEnrolmentData] = useState();

  const [activeBusiness, setActiveBusiness] = useState({});
  const [businessId, setActiveBusinessId] = useState();

  const [dateError, setDateError] = useState(false);
  const setLastMonthPaymentData = (payList) => {
    let monthData = payList[payList.length - 1];
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
  // const businessId = activeBusiness._id;
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
      : new Date(today.getFullYear(), today.getMonth(), 0);
    var temp = startDate.toLocaleDateString().split("/");
    startDate = [temp[2], temp[0], temp[1]].join("-");
    return startDate;
  };

  const updateMonthRange = (startDate, endDate, type) => {
    let startMonth = new Date(startDate).toLocaleString("default", {
      month: "short",
    });
    let endMonth = new Date(endDate).toLocaleString("default", {
      month: "short",
    });
    if (type === "FOR_PAYMENT") {
      setPaymentMonthRange((paymentMonthRange) => ({
        ...paymentMonthRange,
        startMonth,
        endMonth,
      }));
    } else if (type === "FOR_MEMBER") {
      setMembersMonthRange((membersMonthRange) => ({
        ...membersMonthRange,
        startMonth,
        endMonth,
      }));
    }
  };
  useEffect(() => {
    setActiveBusiness(businessesList.length > 0 ? businessesList[0] : "");
    setActiveBusinessId(businessesList.length > 0 ? businessesList[0]._id : "");
  }, [businessesList]);

  useEffect(() => {
    if (businessId) {
      let endDate = paymentDateSelection?.endDate || getEndDate();
      let startDate = paymentDateSelection?.startDate || getStartDate();
      const type = "FOR_PAYMENT";
      updateMonthRange(startDate, endDate, type);
      getEnrolmentStatus({
        businessId: businessId,
      }).then((data) => {
        setEnrolmentData(data);
      });

      getPaymentChartData({
        startDate: startDate,
        endDate: endDate,
        businessId: businessId,
      }).then((data) => {
        if (data.length) {
          setPaymentChartData(data);
          if (
            paymentDateSelection?.startDate === "" ||
            paymentDateSelection?.endDate === ""
          ) {
            setLastMonthPaymentData(data);
          }
        }
      });
    }
  }, [businessId, paymentDateSelection]);

  useEffect(() => {
    if (businessId) {
      let endDate = membersDateSelection?.endDate || getEndDate();
      let startDate = membersDateSelection?.startDate || getStartDate();
      const type = "FOR_MEMBER";
      updateMonthRange(startDate, endDate, type);
      getMembersChartData({
        startDate: startDate,
        endDate: endDate,
        businessId: businessId,
      }).then((data) => {
        if (data.length) {
          setMembersChartData(data);
        }
      });
    }
  }, [businessId, membersDateSelection]);

  return (
    <>
      <Box sx={{ marginBottom: "100px" }}>
        <Box>
          <Typography
            variant="h2"
            sx={{ fontSize: "28px", fontWeight: "bold" }}
          >
            Dashboard
          </Typography>
          <Typography sx={{ opacity: 0.5, fontSize: "12px" }}>
            Manage your business here
          </Typography>
        </Box>
        <AccordionContainer>
          <Accordion defaultExpanded={false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography>{activeBusiness.name}</Typography>
                <Typography sx={{ opacity: 0.5, fontSize: "14px !important" }}>
                  {activeBusiness.city}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{ display: "flex", width: "auto", flexDirection: "row" }}
              >
                {businessesList.map((data) => (
                  <DashboardCard
                    style={{
                      display: "inline-block",
                      marginRight: "35px",
                      cursor: "pointer",
                      height: "auto",
                    }}
                    onClick={() => {
                      setActiveBusiness(data);
                      setActiveBusinessId(data._id);
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
                        {data.name}
                      </Typography>
                    </Box>

                    <Box sx={{ marginTop: "20px" }}>
                      <Typography variant="h2" sx={{ fontSize: "20px" }}>
                        {data.city}
                      </Typography>
                    </Box>
                  </DashboardCard>
                ))}
              </Box>
            </AccordionDetails>
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
                £{Number(paymentData.totalPaidAmount).toFixed(2)}
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
                £{Number(paymentData.totalUnPaidAmount).toFixed(2)}
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
                {enrolmentData?.activeMembers}
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
              <Typography sx={{ fontSize: "14px" }}>
                In-active Members
              </Typography>
            </Box>

            <Box sx={{ marginTop: "20px" }}>
              <Typography
                variant="h2"
                sx={{ fontSize: "28px", fontWeight: "bold" }}
              >
                {enrolmentData?.inActiveMembers}
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
                    {paymentMonthRange.startMonth}-{paymentMonthRange.endMonth}
                  </MenuItem>
                </TextField>
              </Box>
            </CardRow>
            <ResponsiveContainer width={500} height={300}>
              <LineChart
                width={500}
                height={270}
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

                <Line
                  // style={{ bottom: "-5px" }}
                  name="Received"
                  type="monotone"
                  dataKey="received"
                  stroke="#f1383c"
                  activeDot={{ r: 8 }}
                />
                <Line
                  // style={{ bottom: "-5px" }}
                  name="Not Received"
                  type="monotone"
                  dataKey="notReceived"
                  stroke="#beb8d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* member section */}

          <Card sx={{ width: "auto" }}>
            <CardRow sx={{ marginBottom: "15px", width: "100%" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                  MEMBER
                </Typography>
                <CardRow sx={{ justifyContent: "flex-start" }}>
                  <Status color={"#beb8d8"} />
                  <Typography sx={{ opacity: 0.5, fontSize: "14px" }}>
                    Active
                  </Typography>
                </CardRow>
                <CardRow sx={{ justifyContent: "flex-start" }}>
                  <Status color={"#f1383c"} />
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
                  <MenuItem value="Jan-mar">
                    {membersMonthRange.startMonth}-{membersMonthRange.endMonth}
                  </MenuItem>
                </TextField>
              </Box>
            </CardRow>
            <ResponsiveContainer width={500} height={300}>
              <LineChart
                width={500}
                height={270}
                data={membersChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  name="Drop"
                  type="monotone"
                  dataKey="newDropEnrolments"
                  stroke="#f1383c"
                  activeDot={{ r: 8 }}
                />
                <Line
                  name="Active"
                  type="monotone"
                  dataKey="newActiveEnrolments"
                  stroke="#beb8d8"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </CardRow>

        <DateRange
          onChange={(fromDate, toDate) => {
            if (new Date(fromDate).getTime() < new Date(toDate).getTime()) {
              closePaymentDateRange();
              console.log("from,to", fromDate, toDate);
              setPaymentDateSelection((paymentDateSelection) => ({
                ...paymentDateSelection,
                startDate: getStartDate(fromDate),
                endDate: getEndDate(toDate),
              }));
            } else {
              setDateError(true);
            }
          }}
          title={"PAYMENT"}
          anchorEl={anchorElPayment}
          handleClose={closePaymentDateRange}
          year={new Date().getFullYear()}
        />

        <DateRange
          onChange={(fromDate, toDate) => {
            if (new Date(fromDate).getTime() < new Date(toDate).getTime()) {
              closeMemberDateRange();
              setMembersDateSelection((memberDateSelection) => ({
                ...memberDateSelection,
                startDate: getStartDate(fromDate),
                endDate: getEndDate(toDate),
              }));
            } else {
              setDateError(true);
            }
          }}
          title={"MEMBER"}
          anchorEl={anchorElMember}
          handleClose={closeMemberDateRange}
          year={new Date().getFullYear()}
        />
      </Box>
      {
        <WarningDialog
          open={dateError}
          sx={{ borderRadius: "20px" }}
          title="Error"
          description={
            "Please check that start date should be lower the end date"
          }
          acceptButtonTitle="OK"
          onAccept={() => setDateError(false)}
        />
      }
    </>
  );
};

export default Dashboard;
