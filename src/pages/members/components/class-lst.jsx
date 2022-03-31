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
import { useGetClasses } from "../../../services/queries";
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
    Class List
  </Typography>
);

const ClassList = ({
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
    useGetClasses(memberId, businessId, page);

  //   const searchChangeHandler = (e) => setSearchValue(e.target.value);

  const pageChangeHandler = (_, value) => {
    setPage(value);
  };
  // console.log("data", data);
  const tableRows = useMemo(() => {
    if (!data?.docs) return [];
    if (data?.docs) {
      return data?.docs?.map(
        (
          data,
          // {
          //   _id,
          //   name,
          //   categoryId: { name: catName },
          //   enrolmentControls: [
          //     { name: Age, values: AgeData },
          //     { name: Gender, values: GenderData },
          //   ],
          // },
        ) => ({
          onClick: () => {
            onSelect(data?._id, data?.name);
            onClose();
          },

          items: [
            data?.name || "",
            // toPascal(catName),
            // AgeData.toString(),
            // toPascal(GenderData.toString()),
            data?.categoryId?.name || "",
            data?.enrolmentControls
              ? data?.enrolmentControls[0]?.values
                  ?.toString()
                  .replaceAll(",", ", ")
              : "",
            toPascal(
              data?.enrolmentControls
                ? data?.enrolmentControls[1]?.values
                    ?.toString()
                    .replaceAll(",", ", ")
                : "",
            ),
          ],
        }),
      );
    } else {
      return [];
    }
  }, [data, onSelect, onClose]);
  // console.log("data", data);
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
          <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
            {localStorage.getItem("BusinessName")}
          </Typography>
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
            headers={["Class Name", "Class Category", "Age", "Gender"]}
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

export default ClassList;
