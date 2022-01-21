import { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
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
import { useGetSession } from "../../services/queries";
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
    Payment Upload Result
  </Typography>
);

const PaymentFullList = ({ open, onClose, businessId, classId }) => {
  const history = useHistory();
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [contentRef, setContentRef] = useState();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetSession(classId);

  //   const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const tableRows = useMemo(() => {
    return (
      data?.docs?.map(
        ({
          _id,
          name,
          categoryId,
          enrolmentControls: { name: Age, value: Gender },
        }) => ({
          onClick: () => {
            onClose();
          },
          items: [
            toPascal(name),
            toPascal(categoryId),
            toPascal(Gender),
            toPascal(Age),
          ],
        }),
      ) || []
    );
  }, [data, onClose]);
  console.log("paymentList", data);

  const pagination = data?.totalPages && data.totalPages > 1 && (
    <Pagination
      count={data.totalPages}
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
                PaymentUpload
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
            acceptButtonTitle="Discard"
            onAccept={() => setShowError(false)}
          />
        ) : (
          <Table
            heading={TableHeading}
            headers={[
              "Member Name",
              "Member ID",
              "Amount",
              "Type",
              "Payment Method",
              "Upload Status",
              "Discripency",
            ]}
            rows={tableRows}
            pagination={pagination}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
      </DialogContent>
      <DialogActions>
        <GradientButton onClick={onClose} autoFocus>
          Back to payment Upload page
        </GradientButton>
      </DialogActions>
    </PaymentModal>
  );
};

export default PaymentFullList;
