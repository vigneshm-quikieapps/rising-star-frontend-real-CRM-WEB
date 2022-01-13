import { useQuery } from "react-query";

import axios from "../utils/axios-instance";

const getEnrolmentsOfAMemberInABusiness = (
  memberId,
  businessId,
  page,
  filters,
) =>
  axios
    .post(
      "enrolments/of-a-member-in-a-business",
      { memberId, businessId },
      { params: { page, filters } },
    )
    .then(({ data }) => data);

export const useGetMemberEnrolments = (
  memberId,
  businessId,
  page,
  filters,
  options,
) =>
  useQuery(
    ["member-enrolments", page, filters],
    () =>
      getEnrolmentsOfAMemberInABusiness(memberId, businessId, page, filters),
    {
      keepPreviousData: true,
      enabled: !!(memberId && businessId),
      ...options,
    },
  );

const getEnrolment = (id) =>
  axios.get(`enrolments/${id}`).then(({ data }) => data);

export const useGetEnrolment = (enrolmentId, options) =>
  useQuery(["enrolment", enrolmentId], () => getEnrolment(enrolmentId), {
    enabled: !!enrolmentId,
    ...options,
  });

const getDiscountSchemes = (businessId) =>
  axios.get(`businesses/${businessId}/discounts`).then(({ data }) => data);

export const useGetDiscountSchemes = (businessId, options) =>
  useQuery(
    ["discountSchemes", businessId],
    () => getDiscountSchemes(businessId),
    {
      enabled: !!businessId,
      ...options,
    },
  );

const getEnrolmentBills = (classId, memberId) =>
  axios
    .post(
      "bills/of-a-member-in-a-class",
      { classId, memberId },
      { params: { limit: 100 } },
    )
    .then(({ data }) => data);

export const useGetEnrolmentBills = (classId, memberId, options) =>
  useQuery(
    ["bills", classId, memberId],
    () => getEnrolmentBills(classId, memberId),
    {
      enabled: !!(classId && memberId),
      ...options,
    },
  );

const getClasses = (memberId, businessId, page, filters) =>
  axios
    .get(
      `businesses/${businessId}/classes`,
      { memberId, businessId },
      { params: { page, filters } },
    )
    .then(({ data }) => data);

export const useGetClasses = (memberId, businessId, page, filters, options) =>
  useQuery(
    ["member-enrolments", page, filters],
    () => getClasses(memberId, businessId, page, filters),
    {
      keepPreviousData: true,
      enabled: !!(memberId && businessId),
      ...options,
    },
  );

const getSession = (classId) =>
  axios.get(`classes/${classId}/sessions`).then(({ data }) => data);

export const useGetSession = (classId, options) =>
  useQuery(["classes", classId], () => getSession(classId), {
    enabled: !!classId,
    ...options,
  });
