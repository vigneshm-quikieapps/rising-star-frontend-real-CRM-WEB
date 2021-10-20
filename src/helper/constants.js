import ImgIcon from "../components/img-icon";

import dashboardIcon from "../assets/icons/icon-dashboard-dark.png";
import classIcon from "../assets/icons/icon-class.png";
import membersIcon from "../assets/icons/icon-member.png";
import setupIcon from "../assets/icons/icon-setup and processes.png";

import arrowDownDark from "../assets/icons/icon- arrw down-dark.png";
import arrowDown from "../assets/icons/icon- arrw down.png";
import back from "../assets/icons/icon- back.png";
import calendar from "../assets/icons/icon- calendar.png";
import copy from "../assets/icons/icon- copy 3.png";
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
import notification from "../assets/icons/icon-notificaton.png";
import payment from "../assets/icons/icon-payment.png";
import phone from "../assets/icons/icon-phone.png";
import setupAndProcess from "../assets/icons/icon-setup and processes.png";
import term from "../assets/icons/icon-term.png";
import user from "../assets/icons/icon-user.png";
import loginPageImage from "../assets/images/illustration-login.png";

export const classListHeaders = [
  "Class Name",
  "Business Name",
  // "City/Town",
  // "Post Code",
  "Status",
  "Action",
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
        title: "Definitions",
        urlPath: "/classes/definitions",
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
