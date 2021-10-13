import * as React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { typography } from "@mui/system";
// import { typography } from "@mui/system";
// import Box from "@mui/material/Box";
// import { typography } from '@mui/system';

// const StyledBox = styled(Typography)(({ theme }) => ({
//   width: 880,
//   height: 200,
//   // bgcolor: "#f2f1f6",
//   borderRadius: "20px",
//   border: "solid 1px #f2f1f6",
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-around",
//   alignItems: "flex-end",
//   "& .textstyle": {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-around",
//     fontSize: "12px",
//     opacity: "0.5",
//   },
//   "& .desciptionStyle ": {
//     fontSize: "14px",
//   },
// }));

// const OutputBox = ({ title, description }) => {
//   return (
//     <StyledBox>
//       <Typography variant="h4">Pre-school gymnastics (Age: 1-3)</Typography>

//       <typography>
//         <Box className="textstyle">Class ID</Box>
//         <Box className="desciptionStyle">12345566</Box>
//       </typography>

//       <typography>
//         <Box className="textstyle">postcode</Box>
//         <Box className="desciptionStyle">342678</Box>
//       </typography>

//       <typography>
//         <Box className="textstyle">city/town</Box>
//         <Box className="desciptionStyle">london</Box>
//       </typography>

//       <typography>
//         <Box className="textstyle">Status</Box>
//         <Box className="desciptionStyle">Active</Box>
//       </typography>
//     </StyledBox>
//   );
// };

const StyledBox = styled(Box)(({ theme, varient }) => ({
  display: "inline-flex",
  flexDirection: "column",
}));

const Output = ({ title, description, variant = "default" }) => {
  return (
    <StyledBox>
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        {title}
      </Typography>

      {typeof description === "string" ? (
        <Typography
          sx={{
            fontSize: variant === "title" ? "16px" : "12px",
            color: (theme) => theme.palette.text.primary,
          }}
        >
          {description}
        </Typography>
      ) : (
        { description }
      )}
    </StyledBox>
  );
};

export default Output;
