import { useState, useMemo, useRef } from "react";
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
import { useGetSession } from "../../../services/queries";
import { toPascal, transformError } from "../../../utils";
import {
  ElevationScroll,
  Output,
  Pagination,
  Table,
  Warning,
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

const ChangeSessionList = ({
  open,
  classId,
  onSelect,
  onClose,
  memberId,
  businessId,
  memberName,
  sessionId,
}) => {
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [contentRef, setContentRef] = useState();
  const isSaving = useRef(false);
  const [isWarnOpen, setIsWarnOpen] = useState(false);

  //   console.log(open, onSelect, onClose, memberId, businessId, memberName);

  let { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetSession(classId);

  // filter out the already enrolled session
    let data1 = [];
  data1 = data?.docs?.filter(({ _id }) => _id != sessionId);
  if (data1 != undefined && data1.length > 0) {
    data.docs = data1;
  }
  //   const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };

  const tableRows = useMemo(() => {
    console.log("session", data);
    return (
      data?.docs?.map(
        ({
          _id,
          name,
          facility,
          startDate,
          endDate,
          term: {
            label: termName,
            startDate: termStateDate,
            endDate: termEndDate,
          },
          status,
          // session: {
          //   name: sessionName,
          //   term: { label: termName },
          // },
        }) => ({
          onClick: () => {
            onSelect(_id, name, termStateDate, termEndDate, termName);
            onClose();
          },
          items: [
            toPascal(name),
            toPascal(facility),
            toPascal(startDate),
            toPascal(endDate),
            toPascal(termName),
            toPascal(status),

            // toPascal(termName),
            // toPascal(sessionName),
          ],
        }),
      ) || []
    );
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
            Select an Session
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
            acceptButtonTitle="Discard"
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

export default ChangeSessionList;
