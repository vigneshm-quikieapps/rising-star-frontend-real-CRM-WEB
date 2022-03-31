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

import { useGetSession } from "../../../services/queries";
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

const reformatDate = (dateStr) => {
  let dArr = dateStr.split("-"); // ex input "2010-01-18"
  return dArr[2] + "-" + dArr[1] + "-" + dArr[0]; //ex out: "18/01/10"
};

const SessionList = ({
  open,
  classId,
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
    useGetSession(classId);

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const timings = (pattern) => {
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
  };

  const tableRows = useMemo(() => {
    return (
      (data?.docs &&
        data?.docs?.map(
          ({
            _id,
            name,
            pattern,
            startDate,
            endDate,
            term,
            // term: {
            //   label: termName,
            //   startDate: termStateDate,
            //   endDate: termEndDate,
            // },
            status,
            // session: {
            //   name: sessionName,
            //   term: { label: termName },
            // },
          }) => ({
            onClick: () => {
              onSelect(
                _id,
                name,
                term?.startDate,
                term?.endDate,
                term?.label,
                // termStateDate,
                // termEndDate,
                // termName,
                timings(pattern),
              );
              onClose();
            },
            items: [
              (name),
              timings(pattern),
              // reformatDate(startDate.split("T")[0]),
              // reformatDate(endDate.split("T")[0]),
              // toPascal(termName),
              reformatDate(term?.startDate.split("T")[0]),
              reformatDate(term?.endDate.split("T")[0]),
              (term?.label),
              toPascal(status).replaceAll("_", " "),

              // toPascal(termName),
              // toPascal(sessionName),
            ],
          }),
        )) ||
      []
    );
  }, [data, onSelect, onClose]);
  // console.log("session", data);

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
            <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
              {localStorage.getItem("BusinessName")}
            </Typography>
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
              "Session Name",
              "Timing",
              "Start Date",
              "End Date",
              "Term Name",
              "Session Status",
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

export default SessionList;
