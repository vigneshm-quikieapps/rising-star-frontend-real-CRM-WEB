import { useState, useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { enrolmentStatusMap } from "../../../helper/constants";
import { useGetMemberEnrolments } from "../../../services/queries";
import { toPascal, transformError } from "../../../utils";
import {
  ElevationScroll,
  Output,
  Pagination,
  Table,
  WarningDialog,
} from "../../../components";

const EnrolmentsModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

const TableHeading = (
  <Typography sx={{ fontSize: "20px", fontWeight: "bold", padding: "20px" }}>
    Enrolment Details
  </Typography>
);

const EnrolmentList = ({
  open,
  onSelect,
  onClose,
  memberId,
  businessId,
  memberName,
}) => {
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [contentRef, setContentRef] = useState();

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetMemberEnrolments(memberId, businessId, page);

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const tableRows = useMemo(() => {
    if (data?.docs) {
      return (
        data?.docs?.map(
          (
            data,
            //   {
            //   _id,
            //   class: { name: className },
            //   enrolledStatus,
            //   session: {
            //     name: sessionName,
            //     term: { label: termName },
            //   },
            // }
          ) => ({
            onClick: () => {
              onSelect(data?._id, data?.class?.name);
              onClose();
            },
            items: [
              // toPascal(className),
              // toPascal(enrolmentStatusMap[enrolledStatus]),
              // toPascal(termName),
              // toPascal(sessionName),
              data?.class?.name || "",
              toPascal(enrolmentStatusMap[data?.enrolledStatus]),
              (data?.session?.term?.label),
              data?.session?.name,
            ],
          }),
        ) || []
      );
    }
  }, [data, onSelect, onClose]);

  const pagination = data?.totalPages && data.totalPages > 1 && (
    <Pagination
      count={data.totalPages}
      disabled={isPreviousData}
      onChange={pageChangeHandler}
    />
  );

  return (
    <EnrolmentsModal open={open} maxWidth="md">
      <ElevationScroll targetRef={contentRef}>
        <DialogTitle
          sx={{
            fontSize: "28px",
            fontWeight: "bold",
            zIndex: 1,
          }}
        >
          <>
            Select an Enrolment
            <Output
              title="Student Name"
              description={memberName}
              sx={{ mb: "10px", mt: "10px" }}
            />
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
              "Class Name",
              "Enrol Status",
              "Term Name",
              "Session Name",
            ]}
            rows={tableRows}
            pagination={pagination}
            isLoading={isLoading}
            isFetching={isFetching}
          />
        )}
      </DialogContent>
    </EnrolmentsModal>
  );
};

export default EnrolmentList;
