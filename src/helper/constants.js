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
    title: "Classes",
    urlPath: "/classes",
    icon: <ImgIcon>{classIcon}</ImgIcon>,
  },
  {
    id: "3",
    title: "Members",
    urlPath: "/members",
    icon: <ImgIcon>{membersIcon}</ImgIcon>,
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
export const ShortWeekNamesStartingWithSunday = [
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
