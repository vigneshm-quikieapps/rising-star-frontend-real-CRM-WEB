import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  MenuItem,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import { enrolmentStatusMap } from "../../helper/constants";
import { toPascal } from "../../utils";
import {
  Grid,
  TextField,
  Output,
  GradientButton,
  Accordion,
  ImgIcon,
  Table,
} from "../../components";
import { Card, HeadingText, SubHeadingText } from "../../components/common";
import { arrowDownIcon } from "../../assets/icons";
import EnrolmentList from "./components/enrolment-list";
import { setPageTitle } from "../../redux/action/shared-actions";
import {
  useGetDiscountSchemes,
  useGetEnrolment,
  useGetEnrolmentBills,
} from "../../services/queries";
import { useUpdateTransaction } from "../../services/mutations";
import { useSetError } from "../../contexts/error-context";
import { updatePaymentDetailsOfMembers } from "../../redux/action/billingActions";
import Bill from "./components/bill/bill";
import UpdateTransaction from "./components/bill/update-transaction";
import DateRange from "../../containers/popovers/date-range-selector";

const validationSchema = Yup.object()
  .shape({
    billData: Yup.array()
      .of(
        Yup.object().shape({
          billId: Yup.string().required(),
          transactions: Yup.array().of(
            Yup.object().shape({
              _id: Yup.string().required(),
              reference: Yup.string(),
              amount: Yup.number().required(),
              type: Yup.string().oneOf(["WRITE_OFF", "WAIVER"]),
            }),
          ),
        }),
      )
      .required(),
  })
  .required();

const MemberFinance = () => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.members.currentMember || {});
  const updateBillData = useSelector((state) => state.updateBilling);
  // console.log("updatedBillData",updateBillData)
  // console.log("state.members", member);
  const businessList = useSelector((state) => state.businesses.businessList);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedEnrolment, setSelectedEnrolment] = useState("");
  const [showEnrolmentList, setShowEnrolmentList] = useState(false);
  const [selectedDiscountScheme, setSelectedDiscountScheme] = useState("");
  // const [onSelectBillData, setOnSelectBillData] = useState("");
  const setError = useSetError();

  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    // for setting default values from back-end
    reset: resetFormData,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  useEffect(() => dispatch(setPageTitle("Finance Record")), [dispatch]);

  const { data, isLoading } = useGetEnrolment(selectedEnrolment, {
    refetchOnWindowFocus: false,
    onError: (error) => {
      setError(error);
    },
  });

  const { data: discountSchemesData, isLoading: isDiscountSchemesLoading } =
    useGetDiscountSchemes(selectedBusiness, {
      onError: (error) => setError(error),
    });

  const applyDiscount = () => {};

  const discountSchemeChangeHandler = (e) =>
    setSelectedDiscountScheme(e.target.value);

  const discountPercentage = useMemo(() => {
    if (!discountSchemesData) return 0;
    const currentDiscountScheme = discountSchemesData.discounts.find(
      ({ _id }) => _id === selectedDiscountScheme,
    );
    return currentDiscountScheme ? +currentDiscountScheme.value : 0;
  }, [discountSchemesData, selectedDiscountScheme]);

  const discountSchemeItems = useMemo(
    () =>
      discountSchemesData?.discounts
        ?.map(
          ({ _id, name, status }) =>
            status === "ACTIVE" && (
              <MenuItem key={_id} value={_id}>
                {toPascal(name)}
              </MenuItem>
            ),
        )
        ?.filter((val) => val) || [],
    [discountSchemesData],
  );

  const currentEnrolment = useMemo(
    () =>
      data?.enrolment || {
        class: { name: "", charges: [] },
        session: { name: "", pattern: [], term: { label: "" } },
      },
    [data],
  );

  const {
    class: { name: className, charges: classCharges },
    session: {
      name: sessionName,
      pattern,
      term: { label: termName },
    },
    enrolledStatus: status,
    startDate,
  } = currentEnrolment;
  console.log("currentEnrolment", currentEnrolment);

  const { data: billsData, isLoading: billsLoading } = useGetEnrolmentBills(
    currentEnrolment?._id,
    member?._id,
    { refetchOnWindowFocus: false, onError: (error) => setError(error) },
  );
  console.log("billsData", billsData);

  const [onSelectBillData, setOnSelectBillData] = useState(billsData);
  console.log("billsData", onSelectBillData);

  const timings = useMemo(() => {
    if (!pattern.length) return " - - - ";
    const days = pattern.map(({ day }) => day).join(", ");
    const startTime = new Date(pattern[0].startTime).toLocaleTimeString();
    const endTime = new Date(pattern[0].endTime).toLocaleTimeString();
    return `${toPascal(days)}, ${startTime} to ${endTime}`.replace(
      /:00 /g,
      " ",
    );
  }, [pattern]);

  const enrolmentSelectHandler = (id) => {
    setShowEnrolmentList(false);
    setSelectedEnrolment(id);
  };

  const clubMembershipId = useMemo(() => {
    const list = member?.membership;
    const membership = list?.find(
      (mShip) => mShip.businessId === selectedBusiness,
    );
    return membership?.clubMembershipId || "";
  }, [member, selectedBusiness]);

  useEffect(() => {
    businessList.length && setSelectedBusiness(businessList[0]._id);
  }, [dispatch, businessList]);

  const businessChangeHandler = (e) => setSelectedBusiness(e.target.value);

  const applyDiscountHandler = useCallback(() => {
    applyDiscount(selectedDiscountScheme, selectedEnrolment);
  }, [selectedDiscountScheme, selectedEnrolment]);

  const chargeRows = useMemo(
    () =>
      classCharges.map(({ name, amount, payFrequency }) => ({
        items: [toPascal(name), `\u00A3${amount}`, toPascal(payFrequency)],
      })),
    [classCharges],
  );

  const discountRow = useMemo(
    () => [
      {
        items: [
          <TextField
            select
            sx={{ width: "100%" }}
            value={selectedDiscountScheme}
            onChange={discountSchemeChangeHandler}
          >
            {discountSchemeItems}
          </TextField>,
          <Typography>{discountPercentage + "%"}</Typography>,
          <GradientButton
            sx={{ display: "block", ml: "auto" }}
            onClick={applyDiscountHandler}
          >
            Apply
          </GradientButton>,
        ],
      },
    ],
    [
      discountSchemeItems,
      selectedDiscountScheme,
      discountPercentage,
      applyDiscountHandler,
    ],
  );

  const { mutate: updateTransaction, isLoading: billsUpdating } =
    useUpdateTransaction({
      onError: (error) => setError(error),
    });

  const updateBillTransactions = () => {
    console.log("updatedBillData", updateBillData);
    let body = updateBillData;
    console.log("body", body);
    updateTransaction(body);
  };

  const filterBillsByMonths = (year, month) => {
    let data = billsData?.docs?.filter((bill) => {
      let date = new Date(bill.dueDate);
      if (date.getMonth() == month && date.getFullYear() == year) {
        return bill;
      }
    });
    setOnSelectBillData(data);
    // billsData.docs = data;
  };
  const [anchorElPayment, setAnchorElPayment] = useState(null);

  const closePaymentDateRange = () => {
    console.log("closed")
    setAnchorElPayment(null);
  };

  const openPaymentDateRange = (event) => {
    setAnchorElPayment(event.currentTarget);
  };

  return (
    <>
      <Card>
        <HeadingText>{member?.name}</HeadingText>
        <SubHeadingText>Student/Member</SubHeadingText>
        <Grid>
          <TextField
            select
            variant="filled"
            label="Business Name"
            value={selectedBusiness}
            onChange={businessChangeHandler}
            sx={{ gridColumn: "1" }}
          >
            {businessList
              .filter(({ _id }) =>
                member?.membership?.some(
                  ({ businessId }) => businessId === _id,
                ),
              )
              .map(({ _id, name }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {name}
                  </MenuItem>
                );
              })}
          </TextField>
          <Box />
          <Output
            title="Club Membership Number"
            description={clubMembershipId}
          />
          <GradientButton
            sx={{ maxWidth: "fit-content" }}
            onClick={() => setShowEnrolmentList(true)}
          >
            Member Enrolments
          </GradientButton>
          <Output title="Class Name" description={className} />
          <Output
            title="Enrol Status"
            description={enrolmentStatusMap[status]}
          />
          <Box />
          <Output title="Session Name" description={sessionName} />
          <Output title="Timings" description={timings} />
          <Box />
          <Output title="Term" description={termName} />
          <Output
            title="Member Start Date"
            description={
              startDate ? new Date(startDate).toLocaleDateString() : " - - - "
            }
          />
        </Grid>
      </Card>
      <EnrolmentList
        open={showEnrolmentList}
        onClose={() => setShowEnrolmentList(false)}
        onSelect={enrolmentSelectHandler}
        memberId={member?._id}
        businessId={selectedBusiness}
        memberName={member?.name}
      />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography>Charges</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Table
            headers={["Name", "Amount", "Pay Frequency"]}
            rows={chargeRows}
            containerProps={{ sx: { borderRadius: "0 0 20px 20px" } }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography>Discounts</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {discountSchemeItems.length ? (
            <Table
              headers={["Discount Scheme", "Percentage", " "]}
              rows={discountRow}
              containerProps={{ sx: { borderRadius: "0 0 20px 20px" } }}
            />
          ) : (
            <Typography sx={{ p: "20px" }}>
              Currently, this business has no discount schemes
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography>Term Billing</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {billsData?.docs?.map(({ _id, termId, ...data }) => {
            if (termId) {
              return (
                <Bill
                  key={_id}
                  billData={{ _id, ...data }}
                  isTerm={true}
                  termName={termName}
                />
              );
            }
          })}
        </AccordionDetails>
      </Accordion>
      <Box onClick={openPaymentDateRange}>
        Payment
      </Box>
      <DateRange
          onChange={(startDate, endDate) => {
            console.log(startDate, endDate);
          }}
          title={"View By month"}
          anchorEl={anchorElPayment}
          handleClose={closePaymentDateRange}
          year={"2021"}
        />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography>Class Billing</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          {onSelectBillData?.map(({ _id, ...data }) => (
            <Bill key={_id} billData={{ _id, ...data }} />
          ))}
        </AccordionDetails>
      </Accordion>
      <GradientButton
        sx={{ maxWidth: "fit-content" }}
        onClick={() => updateBillTransactions()}
      >
        Save
      </GradientButton>
    </>
  );
};

export default MemberFinance;
