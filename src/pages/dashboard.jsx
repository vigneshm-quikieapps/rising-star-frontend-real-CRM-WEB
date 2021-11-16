import { AccordionSummary, Box, MenuItem, Typography } from "@mui/material";
import {
  Accordion,
  AccordionContainer,
  Card,
  CardRow,
  DashboardCard,
  TextField,
} from "../components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    dv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    dv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    dv: 9800,
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
  return (
    <Box>
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
          <AccordionSummary
            expandIcon={<ExpandMoreIcon id="collapse-button" />}
            aria-controls="collapse-button"
            id="panel1a-header"
          >
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
            <Typography sx={{ fontSize: "14px" }}>January</Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              600
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
              1000
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
            <Typography sx={{ fontSize: "14px" }}>January</Typography>
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Typography
              variant="h2"
              sx={{ fontSize: "28px", fontWeight: "bold" }}
            >
              £10,000
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
              £2,000
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

            <Box>
              <TextField
                select
                value={"Jan-mar"}
                onChange={() => {}}
                sx={{ width: "116px" }}
              >
                <MenuItem value="Jan-mar">Jan-mar</MenuItem>
              </TextField>
            </Box>
          </CardRow>
          <LineChart
            width={500}
            height={300}
            data={data}
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
              dataKey="dv"
              stroke="#f1383c"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#beb8d8" />
          </LineChart>
        </Card>
        <Card sx={{ width: "auto" }}>
          <CardRow sx={{ marginBottom: "15px" }}>
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

            <Box>
              <TextField
                select
                value={"Jan-mar"}
                onChange={() => {}}
                sx={{ width: "116px" }}
              >
                <MenuItem value="Jan-mar">Jan-mar</MenuItem>
              </TextField>
            </Box>
          </CardRow>
          <LineChart
            width={500}
            height={300}
            data={data}
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
              dataKey="dv"
              stroke="#f1383c"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#beb8d8" />
          </LineChart>
        </Card>
      </CardRow>
    </Box>
  );
};

export default Dashboard;
