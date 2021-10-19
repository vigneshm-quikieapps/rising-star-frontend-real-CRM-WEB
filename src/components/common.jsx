import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Card = styled(Box)({
  width: "100%",
  height: "148px",
  margin: "25px 150px 10px 0",
  padding: "10px 10px 20px 20px",
  borderRadius: "20px",
  border: "solid 2px #f2f1f6",
  backgroundColor: "#fff",
});

export const CardRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "15px 0",
});

export const CardCol4 = styled(Box)({
  width: "25%",
});

export const HeadingText = styled(Typography)({
  // width: "605px",
  height: "38px",
  flexGrow: 1,
  fontFamily: "Manrope",
  fontSize: "28px",
  fontWeight: "bold",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "0.2px",
  color: "#000",
});

export const SubHeadingText = styled(Typography)({
  //   width: "118px",
  height: "19px",
  margin: "6px 0px 10px 0",
  opacity: "0.5",
  fontFamily: "Manrope",
  fontSize: "14px",
  fontWeight: "bold",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  color: "#000",
});

export const Title = styled(Typography)({
  width: "94px",
  height: "16px",
  margin: "2px 0px 1px 0",
  opacity: 0.5,
  fontFamily: "Manrope",
  fontSize: "12px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: 1.33,
  letterSpacing: "normal",
  color: "#000",
});

export const Description = styled(Typography)({
  //   width: "108px",
  height: "19px",
  margin: "0 0 0 5px",
  fontFamily: "Manrope",
  fontSize: "14px",
  fontWeight: "normal",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "normal",
  color: "#000",
});

export const AccordionContainer = styled(Typography)({
  width: "100%",
  padding: "10px 0px",
  margin: "0",
});
