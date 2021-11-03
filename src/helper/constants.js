import ImgIcon from "../components/img-icon";

import dashboardIcon from "../assets/icons/icon-dashboard-dark.png";
import classIcon from "../assets/icons/icon-class.png";
import membersIcon from "../assets/icons/icon-member.png";
import setupIcon from "../assets/icons/icon-setup-and-processes.png";
import verifiedIcon from "../assets/icons/icon-allergy.png";
import phoneIcon from "../assets/icons/icon-phone.png";
import Status from "../components/status";
import arrowDownDark from "../assets/icons/icon-arrow-down-dark.png";
import arrowDown from "../assets/icons/icon-arrow-down.png";
import back from "../assets/icons/icon-back.png";
import calendar from "../assets/icons/icon-calendar.png";
import copy from "../assets/icons/icon-copy-3.png";
import add from "../assets/icons/icon-add.png";
import allergy from "../assets/icons/icon-allergy.png";
import iconClass from "../assets/icons/icon-class.png";
import dashboardDark from "../assets/icons/icon-dashboard-dark.png";
import iconDelete from "../assets/icons/icon-delete.png";
import edit from "../assets/icons/icon-edit.png";
import home from "../assets/icons/icon-home.png";
import member from "../assets/icons/icon-member.png";
import menu from "../assets/icons/icon-menu.png";
import more from "../assets/icons/icon-more.png";
import notification from "../assets/icons/icon-notification.png";
import payment from "../assets/icons/icon-payment.png";
import phone from "../assets/icons/icon-phone.png";
import setupAndProcess from "../assets/icons/icon-setup-and-processes.png";
import term from "../assets/icons/icon-term.png";
import user from "../assets/icons/icon-user.png";
import loginPageImage from "../assets/images/illustration-login.png";
import { CheckBox, TextField } from "../components";

export const classListHeaders = [
  "Class Name",
  "Business Name",
  // "City/Town",
  // "Post Code",
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
    title: "Class",
    urlPath: "/classes",
    icon: <ImgIcon>{classIcon}</ImgIcon>,
    items: [
      {
        id: "2-1",
        title: "Definition",
        urlPath: "/classes/definition",
        disabled: true,
      },
      {
        id: "2-2",
        title: "Enrolments",
        urlPath: "/classes/enrolments",
        disabled: true,
      },
      {
        id: "2-3",
        title: "Attendance",
        urlPath: "/classes/attendance",
        disabled: true,
      },
      {
        id: "2-4",
        title: "Payments",
        urlPath: "/classes/payments",
        disabled: true,
      },
    ],
  },
  {
    id: "3",
    title: "Members",
    urlPath: "/members",
    icon: <ImgIcon>{membersIcon}</ImgIcon>,
    items: [
      {
        id: "3-1",
        title: "Personal Info",
        urlPath: "/members/info",
        disabled: true,
      },
      {
        id: "3-2",
        title: "Enrolments",
        urlPath: "/members/enrolments",
        disabled: true,
      },
      {
        id: "3-3",
        title: "Consent Record",
        urlPath: "/members/consent",
        disabled: true,
      },
      {
        id: "3-4",
        title: "Evaluations",
        urlPath: "/members/evaluations",
        disabled: true,
      },
      {
        id: "3-5",
        title: "Finance Record",
        urlPath: "/members/finance",
        disabled: true,
      },
    ],
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

export const attendanceRows = Array(10)
  .fill(1)
  .map((_, index) => ({
    id: index,
    items: [
      "Ayman Mogal",
      <ImgIcon alt="phone">{phoneIcon}</ImgIcon>,
      <ImgIcon alt="phone">{phoneIcon}</ImgIcon>,
      <ImgIcon alt="phone">{verifiedIcon}</ImgIcon>,
      <ImgIcon alt="phone">{verifiedIcon}</ImgIcon>,
      <Status status="green" title="Paid" />,
      "09/08/2021",
      <CheckBox />,
      <TextField value="Took a day off yester…" />,
    ],
  }));

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

export const attendanceObject1 = {
  "Class ID": "DL39020458",
  "City / Town": "Glasgow",
  "Post Code": "G46 7TL",
  Status: "Active",
};

export const attendanceObject2 = {
  "Start Time": "9:30 am",
  "End Time": "11:30 am",
  Facility: "Gym Hall",
  "Coach Name": "Bethany Lafferty",
  Pattern: "Mon",
  "Full class capacity": "20",
  Enrolled: "15",
};

export const enrollmentObject2 = {
  "Start Date": "9:30 am",
  "End Date": "11:30 am",
  "Start Time": "9:30 am",
  "End Time": "11:30 am",
  Pattern: "Mon",
  Facility: "Gym Hall",
  "Session Enrolment Status": "Open for Enrolment",
  "Coach Name": "Bethany Lafferty",
  "Full class capacity": "20",
  Enrolled: "15",
  "Waitlist capacity": "10",
  "Waitlist Enrolled": "0",
};

export const enrollmentRows = Array(10)
  .fill(1)
  .map((_, index) => ({
    id: index,
    items: [
      "Ayman Mogal",
      <ImgIcon alt="verify">{verifiedIcon}</ImgIcon>,
      <ImgIcon alt="verify">{verifiedIcon}</ImgIcon>,
      "02/08/2021",
      "01/08/2021 9:00",
      "Dropped",
      "Class transfer",
      "06/08/2021 10:00",
    ],
  }));

export const enrollmentHeaders = [
  "Name",
  "Allergies",
  "Conditions",
  "Start Date",
  "Enroled Date/Time",
  "Enrol Status",
  "Drop/Cancel Reason",
  "Dropped Date/Time",
];

export const personalInfoObject1 = {
  "Full Name": "Ayman Mogal",
  "Gender*": "Boy",
  "Date of Birth*": "5th January, 1992",
};

export const personalInfoObject2 = {
  "Parent User ID*": "Driving Licence",
  "Full Name*": "Nizam Mogal",
  Email: "ni@gmail.com",
  "Contact Number": "0757576757",
};

export const personalInfoObject3 = {
  Name: "Marama Petera",
  Relationship: "Uncle",
  "Contact Number*": "0757576757",
};

export const personalInfoObject4 = {
  Name: "Marama Petera",
  Relationship: "Friend",
  "Contact Number*": "0757576757",
};

export const icons = {
  arrowDownDark,
  arrowDown,
  back,
  calendar,
  add,
  copy,
  allergy,
  iconClass,
  dashboardDark,
  iconDelete,
  edit,
  home,
  member,
  menu,
  more,
  payment,
  notification,
  setupAndProcess,
  phone,
  term,
  user,
  loginPageImage,
};

export const ShortWeekNames = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
