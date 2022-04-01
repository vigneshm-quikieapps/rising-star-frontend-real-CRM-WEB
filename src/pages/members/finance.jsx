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
  LinearProgress,
} from "@mui/material";

import { enrolmentStatusMap } from "../../helper/constants";
import { useGetMemberEnrolments } from "../../services/queries";
import { toPascal } from "../../utils";
import {
  Grid,
  TextField,
  Output,
  GradientButton,
  Accordion,
  ImgIcon,
  Table,
  Pagination,
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
import { useAddDiscount } from "../../services/mutations";
import { billMemberOfClass } from "../../services/enrolmentServices";
import { DataSaverOn } from "@mui/icons-material";

const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthPickerStyles = {
  spanStyle: {
    width: "75px",
    height: "15px",
    margin: " 2px 295px 0 0",
    opacity: "0.5",
    fontFamily: "Manrope",
    fontSize: "15px",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.18",
    letterSpacing: "normal",
    color: "#000",
  },
  divStyle: {
    width: "205px",
    height: "20px",
    fontFamily: "Manrope",
    fontSize: "16px",
    marginBottom: "8px",
    fontWeight: "bold",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "normal",
    color: "#000",
  },
};

const MemberFinance = () => {
  const dispatch = useDispatch();
  const member = useSelector((state) => state.members.currentMember || {});
  const updateBillData = useSelector((state) => state.updateBilling);
  const businessList = useSelector((state) => state.businesses.businessList);
  const [selectedBusiness, setSelectedBusiness] = useState("");

  const [showEnrolmentList, setShowEnrolmentList] = useState(false);
  const [selectedDiscountScheme, setSelectedDiscountScheme] = useState("");
  // const [selectedDiscountName, setSelectedDiscountName] = useState("");
  const setError = useSetError();
  const [monthFlag, setMonthFlag] = useState("");
  const [timeStamp, setTimeStamp] = useState({ year: null, month: null });
  const [page, setPage] = useState(1);
  const [filteredData, setFilteredData] = useState();
  const [showSave, setShowSave] = useState(false);

  const [selectedEnrolment, setSelectedEnrolment] = useState("");
  // const [billsData, setBillsData] = useState();

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

  const {
    data: initialLoadData,
    isLoading: initialDataIsLoading,
    isFetching,
  } = useGetMemberEnrolments(member?._id, selectedBusiness, 1);

  // useEffect(() => {
  //   setSelectedEnrolment(initialLoadData?.docs[0]?._id);
  // }, []);

  const { data, isLoading } = useGetEnrolment(
    selectedEnrolment || initialLoadData?.docs[0]?._id,
    {
      refetchOnWindowFocus: false,
      onError: (error) => {
        setError(error);
      },
    },
  );

  const { data: discountSchemesData, isLoading: isDiscountSchemesLoading } =
    useGetDiscountSchemes(selectedBusiness, {
      onError: (error) => setError(error),
    });
  const { mutate: addDiscount } = useAddDiscount({
    onError: (error) => setError(error),
  });

  const applyDiscount = async () => {
    let body = {
      discountId: selectedDiscountScheme,
      enrolmentId: selectedEnrolment,
    };
    await addDiscount(body);
    // console.log("discpunt", body);
  };

  const discountSchemeChangeHandler = (e) => {
    // console.log(e.target.value);
    setSelectedDiscountScheme(e.target.value);
  };

  const discountPercentage = useMemo(() => {
    if (!discountSchemesData) return 0;
    const currentDiscountScheme = discountSchemesData.discounts.find(
      ({ _id }) => _id === selectedDiscountScheme,
    );
    return currentDiscountScheme ? +currentDiscountScheme.value : 0;
  }, [discountSchemesData, selectedDiscountScheme]);

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
    discountDetail,
  } = currentEnrolment;
  const discountSchemeItems = useMemo(() => {
    return (
      discountSchemesData?.discounts
        ?.map(
          ({ _id, name, status }) =>
            status === "ACTIVE" && (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            ),
        )
        ?.filter((val) => val) || []
    );
  }, [discountSchemesData]);
  useEffect(() => {
    let temp = "";
    // console.log(discountSchemesData);
    temp = discountSchemesData?.discounts?.find(
      (data) => currentEnrolment?.discountDetail?.name === data.name,
    );
    if (temp) {
      setSelectedDiscountScheme(temp?._id);
    }
  }, [currentEnrolment, discountSchemesData]);
  // useEffect(() => {
  //   if (currentEnrolment?._id && member?._id) {
  //     billMemberOfClass(currentEnrolment?._id, member?._id).then((data) =>
  //       // setBillsData(data.data),
  //     );
  //   }
  // }, [currentEnrolment?._id, member?._id]);

  const { data: billsData, isLoading: billsLoading } = useGetEnrolmentBills(
    currentEnrolment?._id,
    member?._id,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
      onError: (error) => setError(error),
    },
  );
  // useEffect(() => {
  //   setBillsData(billData);
  // }, [billData]);

  const billOfClass = (selectedEnrolment, memId) => {
    billMemberOfClass(selectedEnrolment, memId);
    // console.log("bill", billsData);
  };
  const reloadPage = () => {};
  const [onSelectBillData, setOnSelectBillData] = useState();

  const timings = useMemo(() => {
    if (!pattern.length) return " - - - ";
    const days = pattern.map(({ day }) => day).join(", ");
    const startTime = new Date(pattern[0].startTime).toLocaleTimeString(
      navigator.language,
      { hour: "2-digit", minute: "2-digit" },
    );
    const endTime = new Date(pattern[0].endTime).toLocaleTimeString(
      navigator.language,
      { hour: "2-digit", minute: "2-digit" },
    );
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
    var makeDate = new Date();
    var prev = new Date(makeDate.getFullYear(), makeDate.getMonth() - 1, 1);
    filterBillsByMonths(prev.getFullYear(), prev.getMonth());
  }, [billsData]);

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
        items: [name, `\u00A3${amount}`, toPascal(payFrequency)],
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
            sx={{
              display: "block",
              ml: "auto",
              fontSize: "16px",
              fontWeight: "bold",
            }}
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

  const setSaveStatus = (flag) => {
    setShowSave(true);
  };

  let updateReduxState = false;
  const { mutateAsync: updateTransaction, isLoading: billsUpdating } =
    useUpdateTransaction({
      onSuccess: async (data) => {
        updateReduxState = true;
      },
      onError: async (error) => setError(error),
    });

  const updateBillTransactions = async () => {
    let body = updateBillData;
    await updateTransaction(body);
    if (updateReduxState) dispatch(updatePaymentDetailsOfMembers([]));
  };

  const setCurrentBillPage = (page = 1) => {
    let pageStartIndex = page * 2 - 2;
    let pageLastIndex = pageStartIndex + 1;

    let temp = [];
    for (let index = pageStartIndex; index <= pageLastIndex; index++) {
      if (data && data[index]) {
        temp.push(data[index]);
      }
    }
    setOnSelectBillData(temp);
  };
  const setBillPage = (page = 1) => {
    let pageStartIndex = page * 2 - 2;
    let pageLastIndex = pageStartIndex + 1;
    let temp = [];
    let data = filteredData;
    for (let index = pageStartIndex; index <= pageLastIndex; index++) {
      if (data && data[index]) {
        temp.push(data[index]);
      }
    }
    setOnSelectBillData(temp);
    setPage(page);
  };

  const filterBillsByMonths = (year, month) => {
    let inputString = "View by month " + months[month] + " " + year;
    let data = billsData?.docs?.filter((bill) => {
      let date = new Date(bill.dueDate);
      if (date.getMonth() == month && date.getFullYear() == year) {
        return bill;
      }
    });
    let newData = data?.length > 0 ? [data[0]] : [];
    data?.length > 1 && newData.push(data[1]);
    setOnSelectBillData(newData);
    setFilteredData(data);
    setMonthFlag(inputString);
    setTimeStamp((timeStamp) => ({
      ...timeStamp,
      year: year,
      month: month,
    }));
  };

  const [anchorElPayment, setAnchorElPayment] = useState(null);

  const closePaymentDateRange = () => {
    setAnchorElPayment(null);
  };

  const openPaymentDateRange = (event) => {
    setAnchorElPayment(event.currentTarget);
    event.stopPropagation();
  };

  return (
    <>
      {isDiscountSchemesLoading ||
        (isFetching && (
          <LinearProgress
            sx={{ position: "absolute", top: 0, right: 0, width: "100%" }}
          />
        ))}

      <Card>
        <HeadingText>{member?.name}</HeadingText>
        <SubHeadingText sx={{ marginBottom: "20px" }}>
          Student/Member
        </SubHeadingText>
        <Grid>
          <TextField
            select
            variant="outlined"
            InputLabelProps={{ style: { background: "#fff" } }}
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

          <Output
            title="Club Membership Number"
            description={clubMembershipId}
          />
          <Box />
          <GradientButton
            sx={{
              maxWidth: "fit-content",
              fontSize: "16px",
              fontWeight: "bold",
            }}
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
              startDate ? reformatDate(startDate.split("T")[0]) : " - - - "
            }
          />
        </Grid>
      </Card>
      {showEnrolmentList && (
        <EnrolmentList
          open={showEnrolmentList}
          onClose={() => setShowEnrolmentList(false)}
          onSelect={enrolmentSelectHandler}
          memberId={member?._id}
          businessId={selectedBusiness}
          memberName={member?.name}
        />
      )}
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

      <DateRange
        onChange={(startDate) => {
          setShowSave(false);
          closePaymentDateRange();
          filterBillsByMonths(startDate.getFullYear(), startDate.getMonth());
        }}
        title={"View By month"}
        anchorEl={anchorElPayment}
        handleClose={closePaymentDateRange}
        year={"2021"}
        isRangeRequired={false}
      />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Typography>Class Billing</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box
            onClick={openPaymentDateRange}
            style={{ margin: "16px 0 16px 16px", width: "950px" }}
          >
            <TextField
              select
              value={"Jan-mar"}
              style={{ height: "32px" }}
              onChange={() => {}}
              disabled
              sx={{ width: "320px" }}
            >
              <MenuItem value="Jan-mar">
                <div style={monthPickerStyles.divStyle}>{monthFlag}</div>
              </MenuItem>
            </TextField>
          </Box>
          {onSelectBillData?.map(({ _id, termId, ...data }) => {
            if (!termId) {
              return (
                <Bill
                  key={_id}
                  billData={{ _id, ...data }}
                  showStatus={setSaveStatus}
                />
              );
            }
          })}
        </AccordionDetails>
        {onSelectBillData?.length > 0 && (
          <Pagination
            count={Math.round(filteredData?.length / 2)}
            sx={{ mt: 2 }}
            page={page}
            onChange={(_, page) => {
              setBillPage(page);
            }}
          />
        )}
      </Accordion>

      <GradientButton
        sx={{ maxWidth: "fit-content", mb: "3px" }}
        size="large"
        onClick={() => {
          setShowSave(false);
          updateBillTransactions();
        }}
      >
        Save
      </GradientButton>
    </>
  );
};

export default MemberFinance;
