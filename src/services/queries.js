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

const getEnrolmentBills = (enrolmentId, memberId) =>
  axios
    .post(
      "bills/of-a-member-in-a-class",
      { enrolmentId, memberId },
      { params: { limit: 100 } },
    )
    .then(({ data }) => data);

export const useGetEnrolmentBills = (enrolmentId, memberId, options) =>
  useQuery(
    ["bills", enrolmentId, memberId],
    () => getEnrolmentBills(enrolmentId, memberId),
    {
      enabled: !!(enrolmentId && memberId),
      ...options,
    },
  );
