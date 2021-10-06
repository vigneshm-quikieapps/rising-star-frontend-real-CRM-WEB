import { Pagination } from "@mui/material";

const CustomPagination = ({ count, activePage, onChange }) => (
  <Pagination
    sx={{
      "& ul": {
        justifyContent: "center",
        "& .MuiButtonBase-root": {
          width: 48,
          height: 48,
          borderRadius: (theme) => theme.shape.borderRadius.primary,
        },
        "& .Mui-selected": {
          bgcolor: (theme) => theme.palette.darkIndigo.main,
          color: "#fff",
        },
      },
    }}
    count={count}
    variant="outlined"
    shape="rounded"
    page={activePage}
    onChange={onChange}
  />
);

export default CustomPagination;
