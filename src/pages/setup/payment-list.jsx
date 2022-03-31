import { useState, useMemo, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { getData, useGetXlsxFullList } from "../../services/queries";
import { toPascal, transformError } from "../../utils";
import {
  ElevationScroll,
  GradientButton,
  Pagination,
  Table,
  WarningDialog,
} from "../../components";

const PaymentModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

const TableHeading = (
  <Typography sx={{ fontSize: "20px", fontWeight: "bold", padding: "20px" }}>
    Payment Upload Results
  </Typography>
);

const PaymentFullList = ({ open, onClose, businessId, classId }) => {
  // const { id } = useParams();
  // console.log("id", id);
  const history = useHistory();
  const [showError, setShowError] = useState(false);
  const [payListData, setPayListData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [contentRef, setContentRef] = useState();
  // const [isLoading,setisLoading]=useState(true);
  // const [isError,setisError]=useState(false)
  // const [error,setError]=useState("")
  // const [isFetching,setisFetching]=useState(true)
  // const [isPreviousData,setisPreviousData]=useState(true)
  const [payData, setPayData] = useState({});
  const { isLoading, isError, error, _data, isFetching, isPreviousData } =
    useGetXlsxFullList(localStorage.getItem("MID"));

  useEffect(() => {
    async function data() {
      const data = await getData(localStorage.getItem("MID"));
      if (data) {
        // setisLoading(false)
        setPayData(data.data);
        setPayListData(data?.data?.xlsx?.uploadPaymentList.slice(0, 10));
        setTotalPage(
          Math.ceil(data?.data?.xlsx?.uploadPaymentList?.length / 10),
        );
      }
    }
    data();
    // console.log(data);
    // setisLoading(isLoading)
    // setisError(isError)
    // setError(error)
    // setisFetching(isFetching)
    // setisPreviousData(isPreviousData)
  }, []);
  // console.log("data121", useGetXlsxFullList(localStorage.getItem("MID")));
  // console.log("data234", data?.xlsx?.uploadPaymentList);

  //   const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const pageChangeHandler = (_, value) => {
    setPayListData(
      payData?.xlsx?.uploadPaymentList.slice((value - 1) * 10, value * 10),
    );
    setPage(value);
  };
  // console.log("data",payData)
  // console.log(payListData)
  const tableRows = useMemo(() => {
    // setPayListData((data?.xlsx?.uploadPaymentList.slice(0,data?.xlsx?.uploadPaymentList?.length)))
    // setTotalPage(Math.ceil(data?.xlsx?.uploadPaymentList?.length/10))
    return (
      payListData?.map(
        ({
          memberName,
          membershipNumber,
          amount,
          type,
          paymentMethod,
          uploadStatus,
          noDataFound,
        }) => ({
          onClick: () => {
            onClose();
          },
          items: [
            memberName,
            membershipNumber,
            amount,
            type,
            (paymentMethod),
            toPascal(uploadStatus),
            toPascal(noDataFound),
          ],
        }),
      ) || []

      // data?.xlsx?.uploadPaymentList?.map(
      //   (data
      //   //   {
      //   //   xlsx: {
      //   //     uploadPaymentList: [{ memberName }, { membershipNumber }],
      //   //   },
      //   // }
      //   ) => ({
      //     onClick: () => {
      //       onClose();
      //     },
      //     items: [
      //       toPascal(data?.memberName),
      //       toPascal(data?.membershipNumber),
      //       data?.amount,
      //       toPascal(data?.type),
      //       toPascal(data?.paymentMethod),
      //       toPascal(data?.uploadStatus),
      //       toPascal(data?.noDataFound),
      //     ],
      //   }),
      // ) || []
    );
  }, [payListData, onClose]);

  // console.log("paymentList", tableRows);

  const pagination = payData?.xlsx?.uploadPaymentList?.length > 1 && (
    <Pagination
      count={totalPage}
      page={page}
      disabled={isPreviousData}
      onChange={pageChangeHandler}
    />
  );

  return (
    <PaymentModal open={open} maxWidth="md">
      <ElevationScroll targetRef={contentRef}>
        <DialogTitle
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          <>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 2 }}>
              <Typography
                variant="h1"
                sx={{ fontSize: "28px", fontWeight: "bold" }}
              >
                Payment Upload
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                Manage all payment here
              </Typography>
            </Box>
          </>
        </DialogTitle>
      </ElevationScroll>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          bgcolor: "ternary.main",
          zIndex: 1,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        ref={(e) => setContentRef(e)}
        sx={{ minWidth: "400px", pt: 0 }}
      >
        {isError ? (
          <WarningDialog
            open={showError}
            title="Error"
            description={transformError(error)}
            acceptButtonTitle="OK"
            onAccept={() => setShowError(false)}
          />
        ) : (
          <Table
            heading={TableHeading}
            headers={[
              "Member Name",
              "Club Membership Number",
              "Amount",
              "Type",
              "Payment Method",
              "Upload Status",
              "Discrepancy",
            ]}
            rows={tableRows}
            pagination={pagination}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
      </DialogContent>
      <DialogActions>
        <GradientButton
          sx={{ fontSize: "18px", fontWeight: "bold" }}
          onClick={onClose}
          autoFocus
        >
          Back to Payment Upload page
        </GradientButton>
      </DialogActions>
    </PaymentModal>
  );
};

export default PaymentFullList;
