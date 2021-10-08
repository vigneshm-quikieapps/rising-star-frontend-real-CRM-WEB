import { Pagination } from "@mui/material";

const CustomPagination = ({ sx, variant, shape, ...otherProps }) => (
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
    variant="outlined"
    shape="rounded"
    {...otherProps}
  />
);

export default CustomPagination;
