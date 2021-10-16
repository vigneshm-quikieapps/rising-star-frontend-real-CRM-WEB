import ImgIcon from "../components/img-icon";

import dashboardIcon from "../assets/icons/icon-dashboard-dark.png";
import classIcon from "../assets/icons/icon-class.png";
import membersIcon from "../assets/icons/icon-member.png";
import setupIcon from "../assets/icons/icon-setup and processes.png";

export const classListHeaders = [
  "Class Name",
  "Business Name",
  "City/Town",
  "Post Code",
  "Status",
  "Action",
];

export const navItems = [
  {
    id: "1",
    title: "Dash Board",
    urlPath: "/",
    icon: <ImgIcon>{dashboardIcon}</ImgIcon>,
  },
  {
    id: "2",
    title: "Class",
    urlPath: "/classes",
    icon: <ImgIcon>{classIcon}</ImgIcon>,
    items: [
      { id: "2-1", title: "Definitions", urlPath: "/classes/definitions" },
      { id: "2-2", title: "Enrollments", urlPath: "/classes/enrollments" },
      { id: "2-3", title: "Attendance", urlPath: "/classes/attendance" },
      { id: "2-4", title: "Payments", urlPath: "/classes/payments" },
    ],
  },
  {
    id: "3",
    title: "Members",
    urlPath: "/members",
    icon: <ImgIcon>{membersIcon}</ImgIcon>,
    items: [
      { id: "3-1", title: "Personal Info", urlPath: "/members/info" },
      { id: "3-2", title: "Enrollments", urlPath: "/members/enrollments" },
      { id: "3-3", title: "Consent Record", urlPath: "/members/consent" },
      { id: "3-4", title: "Evaluations", urlPath: "/members/evaluations" },
      { id: "3-5", title: "Finance Record", urlPath: "/members/finance" },
    ],
  },
  {
    id: "4",
    title: "Setup and Processes",
    urlPath: "/setup",
    icon: <ImgIcon>{setupIcon}</ImgIcon>,
    items: [
      { id: "4-1", title: "Term", urlPath: "/setup/term" },
      { id: "4-2", title: "Payment Upload", urlPath: "/setup/payment" },
    ],
  },
];
