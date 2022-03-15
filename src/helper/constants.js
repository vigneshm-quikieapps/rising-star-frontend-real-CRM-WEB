import ImgIcon from "../components/img-icon";
import {
  dashboardIcon,
  classIcon,
  memberIcon,
  setupIcon,
} from "../assets/icons";

export const enrolmentStatusMap = {
  ENROLLED: "Enrolled",
  DROPPED: "Dropped",
  SUSPEND: "Suspended",
  // RETURN_FROM_SUSPENSION: "Return From Suspension",
  WAITLISTED: "In Waitlist",
};

export const classListHeaders = [
  "Class Name",
  "Business Name",
  "Status",
  "Action",
];

export const memberListHeaders = [
  "Member Name",
  "Gender",
  "Parent/Carer Name",
  "Parent/Carer Email",
  "Phone",
];

export const navItems = [
  {
    id: "1",
    title: "Dash Board",
    urlPath: "/",
    exact: true,
    icon: <ImgIcon>{dashboardIcon}</ImgIcon>,
  },
  {
    id: "2",
    title: "Classes",
    urlPath: "/classes",
    icon: <ImgIcon>{classIcon}</ImgIcon>,
  },
  {
    id: "3",
    title: "Members",
    urlPath: "/members",
    icon: <ImgIcon>{memberIcon}</ImgIcon>,
  },
  {
    id: "4",
    title: "Setup and Processes",
    urlPath: "/setup",
    icon: <ImgIcon>{setupIcon}</ImgIcon>,
    items: [
      { id: "4-1", title: "Term", urlPath: "/setup/term" },
      { id: "4-2", title: "Payment Upload", urlPath: "/setup/paymentUpload" },
    ],
  },
];

export const attendanceHeaders = [
  "Name",
  "Parent Contact",
  "EC Contact",
  "Allergies",
  "Conditions",
  "Payment Status",
  "Start Date",
  "Attended",
  "Comments",
];

export const enrollmentHeaders = [
  "Name",
  "Allergies",
  "Conditions",
  "Start Date",
  "Enroled Date/Time",
  "Enrol Status",
  "Drop/Cancel Reason",
  "Dropped Date",
];
export const shortWeekNames = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export const shortWeekNamesStartingWithSunday = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

export const ShortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const paymentListHeaders = [
  "Process ID",
  "Start Date/Time",
  "End Date/Time",
  "Status",
  "Results",
];
